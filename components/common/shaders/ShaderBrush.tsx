'use client';

/**
 * ShaderBrush
 * -----------------------------------------------------------------------------
 * A WebGL component that reveals + refracts an image through a velocity-driven
 * brush stroke that follows the pointer. The stroke is rendered as a procedural
 * signed-distance-field (SDF) capsule polyline (NOT a stack of soft circles),
 * so the edge is crisp and the brush naturally elongates with cursor speed.
 *
 * Renderer: OGL (chosen over three.js here). For a single full-screen fragment
 * pass we need exactly one geometry (a full-screen triangle) and one program.
 * OGL gives us that with a tiny footprint and zero scene-graph overhead, which
 * is the lightest path to a stable 60fps on mobile. three.js would pull in a
 * scene/camera/material stack we don't use.
 *
 * Performance contract:
 *  - No React state on the hot path. Pointer + trail live in refs / typed arrays.
 *  - One requestAnimationFrame loop. One render call per frame.
 *  - Fixed-size trail pool (Float32Array). No per-frame allocations -> no GC spikes.
 *  - DPR capped so retina phones don't shade 9x the pixels.
 *  - Full teardown on unmount: listeners, RAF, texture, geometry, program, context.
 *
 * Install: npm i ogl   (OGL ships its own TypeScript types.)
 * Next.js App Router: this file is a client component ('use client'); all WebGL
 * work happens inside useEffect, so it is SSR-safe (never touches window on the
 * server).
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react';
import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  Texture,
  type OGLRenderingContext,
} from 'ogl';

export interface ShaderBrushProps {
  imageSrc: string;
  width?: number | string;
  height?: number | string;
  /** Optional fine-tuning. All have sensible defaults. */
  className?: string;
  /** Magnification factor inside the stroke (1 = none, 1.18 = subtle zoom). */
  zoom?: number;
  /** Base stroke radius as a fraction of component height (0..1). */
  brushSize?: number;
  /** How long a trail point lives, in seconds. Larger = longer trail. */
  trailLifetime?: number;
}

/**
 * Conceptual trail point (per the spec):
 *   interface TrailPoint { x; y; velocity; angle; life; }
 *
 * In practice we DON'T allocate objects. We pack each point into 4 floats in a
 * pre-allocated Float32Array ring buffer, which is what the GPU consumes anyway:
 *   [ x, y, life, radius ]
 *   - x, y    : pointer position in 0..1 UV space (origin bottom-left)
 *   - life    : 1 -> 0 as the point ages (drives both fade and taper)
 *   - radius  : derived from velocity + life (angle is implicit in the polyline)
 * This satisfies "object pooling / recycle points / never grow arrays".
 */
const FLOATS_PER_POINT = 4;

/**
 * Fixed maximum trail length. Each point becomes one `vec4` fragment uniform.
 * 64 keeps us comfortably inside the per-shader uniform-vector budget of even
 * low-end mobile GPUs while still producing a long, smooth stroke. You can push
 * this to 128 for desktop-only deployments — just be aware it both costs more
 * fragment uniforms and adds inner-loop work per pixel.
 */
const MAX_POINTS = 64;

/* ----------------------------- Vertex shader ----------------------------- */
/* Full-screen triangle. OGL's Triangle provides `position` (clip space) and a
 * `uv` that spans 0..1 over the visible area. Nothing to transform. */
const vertexShader = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/* ---------------------------- Fragment shader ----------------------------- */
/*
 * Pipeline per pixel:
 *  1. Walk the trail polyline, accumulating the signed distance to a
 *     variable-radius capsule (rounded cone) chain -> `bestSD`. Track the
 *     nearest stroke center -> used for the lens/zoom origin.
 *  2. Build a CRISP mask by thresholding `bestSD` with a resolution-derived AA
 *     width (≈1.5px). No feathering, no soft glow.
 *  3. Inside the mask: magnify (zoom UV toward nearest stroke center) + bend UV
 *     near the edge (lens refraction) + add very subtle animated fbm refraction
 *     and shimmer ("enchanted glass"). Outside the mask the image is untouched.
 *
 * GLSL ES 1.00 (works on WebGL1 and WebGL2 contexts). We avoid `fwidth` so no
 * derivative extension is required — AA width comes from uResolution instead.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2  uResolution;   // drawing-buffer size in device pixels
  uniform vec2  uImageSize;    // natural image size, for cover() math
  uniform float uTime;
  uniform float uHasImage;

  uniform vec4  uTrail[${MAX_POINTS}]; // [x, y, life, radius] in UV space
  uniform float uCount;                // number of active points

  uniform float uZoom;         // magnification inside the stroke
  uniform float uRefract;      // edge lens-bend strength
  uniform float uNoiseRefract; // animated noise refraction strength
  uniform float uShimmer;      // additive sparkle strength (kept tiny)

  /* ---- value noise + fbm (smooth, cheap, no texture lookups) ---- */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  /* Distance from point p to segment a-b; outputs the projection param h. */
  float segDist(vec2 p, vec2 a, vec2 b, out float h) {
    vec2 pa = p - a, ba = b - a;
    h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * h);
  }

  /* background-size: cover, preserving aspect ratio. */
  vec2 coverUV(vec2 st, vec2 res, vec2 img) {
    float rScr = res.x / res.y;
    float rImg = img.x / img.y;
    vec2 s = rScr > rImg ? vec2(1.0, rImg / rScr) : vec2(rScr / rImg, 1.0);
    return (st - 0.5) * s + 0.5;
  }

  void main() {
    vec2 st = vUv;
    float aspect = uResolution.x / uResolution.y;

    // Work in an aspect-corrected space so the brush stays round and distances
    // aren't horizontally squashed.
    vec2 p = vec2(st.x * aspect, st.y);

    // --- 1. nearest signed distance over the trail polyline ---
    float bestSD = 1e9;     // signed distance to the variable-radius capsule chain
    vec2  bestCenter = p;   // nearest point ON the stroke spine (UV space)
    float bestRadius = 1.0;

    for (int i = 0; i < ${MAX_POINTS} - 1; i++) {
      if (float(i) >= uCount - 1.0) break;

      vec4 P0 = uTrail[i];
      vec4 P1 = uTrail[i + 1];

      vec2 a = vec2(P0.x * aspect, P0.y);
      vec2 b = vec2(P1.x * aspect, P1.y);

      // Radius tapers with life so the tail thins like a real brush.
      float r0 = P0.w * P0.z;
      float r1 = P1.w * P1.z;

      float h;
      float d  = segDist(p, a, b, h);
      float r  = mix(r0, r1, h);
      float sd = d - r; // <0 inside the stroke

      if (sd < bestSD) {
        bestSD = sd;
        bestCenter = mix(P0.xy, P1.xy, h); // store in plain UV space
        bestRadius = max(r, 1e-4);
      }
    }

    // --- 2. crisp mask (resolution-based AA ≈ 1.5px, no feathering) ---
    float aa = 1.5 / uResolution.y;
    float mask = 1.0 - smoothstep(-aa, aa, bestSD);

    // Base (undistorted) image sample.
    vec2 baseUV = coverUV(st, uResolution, uImageSize);
    vec3 baseCol = texture2D(uTexture, baseUV).rgb;

    if (mask <= 0.0001 || uHasImage < 0.5) {
      gl_FragColor = vec4(baseCol, 1.0);
      return;
    }

    // depthN: 1 at stroke spine -> 0 at the edge.
    float depthN = clamp(-bestSD / bestRadius, 0.0, 1.0);

    // --- 3a. magnify: pull UV toward the nearest spine point ---
    vec2 zoomCenter = bestCenter;
    vec2 zoomedSt = zoomCenter + (st - zoomCenter) / uZoom;

    // --- 3b. lens edge refraction: outward normal, strongest near the edge ---
    vec2 nrm = normalize((p - vec2(bestCenter.x * aspect, bestCenter.y)) + 1e-5);
    vec2 nrmSt = vec2(nrm.x / aspect, nrm.y);
    float edge = 1.0 - depthN; // 0 center -> 1 edge
    vec2 lensOffset = nrmSt * uRefract * edge * edge;

    // --- 3c. magical animated noise: tiny UV refraction + shimmer ---
    float t = uTime * 0.15;
    float n1 = fbm(p * 6.0 + t);
    float n2 = fbm(p * 6.0 + vec2(37.2, 11.7) - t);
    vec2 noiseOffset = (vec2(n1, n2) - 0.5) * uNoiseRefract;

    // Compose final sample coordinate; all distortion is gated by mask.
    vec2 distortedSt = zoomedSt + (lensOffset + noiseOffset) * mask;
    vec2 distortedUV = coverUV(distortedSt, uResolution, uImageSize);
    vec3 distortedCol = texture2D(uTexture, distortedUV).rgb;

    vec3 col = mix(baseCol, distortedCol, mask);

    // Subtle premium shimmer — additive, never tints the image.
    float sparkle = pow(fbm(p * 9.0 - t * 1.7), 4.0);
    col += sparkle * uShimmer * mask;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBrush({
  imageSrc,
  width = '100%',
  height = '100%',
  className,
  zoom = 1.18,
  brushSize = 0.07,
  trailLifetime = 0.9,
}: ShaderBrushProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Latest props kept in refs so the WebGL effect can read them without
  // re-running (the effect intentionally has an empty dependency array).
  const propsRef = useRef({ imageSrc, zoom, brushSize, trailLifetime });
  propsRef.current = { imageSrc, zoom, brushSize, trailLifetime };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* --------------------------- bootstrap WebGL --------------------------- */
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap retina cost
    const renderer = new Renderer({ dpr, alpha: false, antialias: false });
    const gl: OGLRenderingContext = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    /* ------------------------------ texture ------------------------------- */
    const texture = new Texture(gl, {
      generateMipmaps: false,
      flipY: true, // match DOM/cover math (origin handling)
    });

    let disposed = false;
    const image = new Image();
    image.crossOrigin = 'anonymous'; // allow remote images without tainting
    image.onload = () => {
      if (disposed) return;
      texture.image = image;
      program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight];
      program.uniforms.uHasImage.value = 1;
    };
    image.src = propsRef.current.imageSrc;

    /* --------------------- geometry + program (uniforms) ------------------- */
    const geometry = new Triangle(gl);

    // Reused every frame; NEVER reallocated -> no GC churn.
    const trailUniform = new Float32Array(MAX_POINTS * FLOATS_PER_POINT);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uResolution: { value: [1, 1] },
        uImageSize: { value: [1, 1] },
        uTime: { value: 0 },
        uHasImage: { value: 0 },
        'uTrail[0]': { value: trailUniform },
        uCount: { value: 0 },
        uZoom: { value: propsRef.current.zoom },
        uRefract: { value: 0.02 },
        uNoiseRefract: { value: 0.012 },
        uShimmer: { value: 0.06 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    /* ----------------------------- trail pool ----------------------------- */
    // Ring buffer of packed points: [x, y, life, radius] * MAX_POINTS.
    const pool = new Float32Array(MAX_POINTS * FLOATS_PER_POINT);
    let head = -1; // index of the most-recently-written point
    let count = 0; // number of live points

    // Pointer state (all in refs/locals — zero React state on this path).
    let targetX = 0.5;
    let targetY = 0.5; // UV space, origin bottom-left
    let smoothX = 0.5;
    let smoothY = 0.5;
    let lastSpawnX = 0.5;
    let lastSpawnY = 0.5;
    let smoothVel = 0;
    let pointerActive = false;

    const spawn = (x: number, y: number, radius: number) => {
      head = (head + 1) % MAX_POINTS;
      const o = head * FLOATS_PER_POINT;
      pool[o] = x;
      pool[o + 1] = y;
      pool[o + 2] = 1.0; // life
      pool[o + 3] = radius;
      count = Math.min(count + 1, MAX_POINTS);
    };

    /* --------------------------- pointer events ---------------------------- */
    const setTargetFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      targetX = (clientX - rect.left) / rect.width;
      targetY = 1.0 - (clientY - rect.top) / rect.height; // flip Y to UV space
      pointerActive = true;
    };

    const onPointerMove = (e: PointerEvent) =>
      setTargetFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTargetFromClient(t.clientX, t.clientY);
    };
    const onPointerLeave = () => {
      pointerActive = false; // stop spawning; existing trail ages out
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    /* ------------------------------- resize -------------------------------- */
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h); // OGL multiplies by dpr internally
      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* ------------------------------ RAF loop ------------------------------- */
    let raf = 0;
    let prev = performance.now();

    const SMOOTHING = 0.35; // pointer easing (lower = more lag/inertia)
    const SPACING = 0.006; // min UV distance between spawned points

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      let dt = (now - prev) / 1000;
      prev = now;
      dt = Math.min(dt, 0.05); // clamp after tab-switches to avoid jumps

      const { brushSize, trailLifetime, zoom } = propsRef.current;
      program.uniforms.uZoom.value = zoom;

      // Ease the pointer toward its target for a fluid stroke.
      const px = smoothX;
      const py = smoothY;
      smoothX += (targetX - smoothX) * SMOOTHING;
      smoothY += (targetY - smoothY) * SMOOTHING;

      // Velocity (UV units / second), smoothed.
      const dx = smoothX - px;
      const dy = smoothY - py;
      const inst = Math.hypot(dx, dy) / dt;
      smoothVel += (inst - smoothVel) * 0.25;

      // Spawn points along the path so fast moves stay CONNECTED (no gaps).
      // Faster cursor -> thinner stroke -> calligraphic, velocity-based feel.
      if (pointerActive) {
        const moved = Math.hypot(smoothX - lastSpawnX, smoothY - lastSpawnY);
        if (moved > SPACING || count === 0) {
          const steps = Math.min(Math.floor(moved / SPACING) + 1, 8);
          const velNorm = Math.min(smoothVel * 0.25, 1.0);
          const radius = brushSize * (1.0 - 0.45 * velNorm); // taper when fast
          for (let s = 1; s <= steps; s++) {
            const f = s / steps;
            spawn(
              lastSpawnX + (smoothX - lastSpawnX) * f,
              lastSpawnY + (smoothY - lastSpawnY) * f,
              radius,
            );
          }
          lastSpawnX = smoothX;
          lastSpawnY = smoothY;
        }
      }

      // Age all points; drop the oldest once it dies (advance the tail).
      const decay = dt / trailLifetime;
      for (let i = 0; i < MAX_POINTS; i++) {
        const o = i * FLOATS_PER_POINT;
        if (pool[o + 2] > 0) pool[o + 2] = Math.max(pool[o + 2] - decay, 0);
      }

      // Build the uniform array in temporal order (oldest -> newest) so that
      // consecutive entries form connected segments. Reuses trailUniform.
      let active = 0;
      const start = (head - count + 1 + MAX_POINTS) % MAX_POINTS;
      for (let k = 0; k < count; k++) {
        const src = ((start + k) % MAX_POINTS) * FLOATS_PER_POINT;
        if (pool[src + 2] <= 0) continue; // skip fully-dead points
        const dst = active * FLOATS_PER_POINT;
        trailUniform[dst] = pool[src];
        trailUniform[dst + 1] = pool[src + 1];
        trailUniform[dst + 2] = pool[src + 2];
        trailUniform[dst + 3] = pool[src + 3];
        active++;
      }
      program.uniforms.uCount.value = active;
      program.uniforms.uTime.value = now / 1000;

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(frame);

    /* ------------------------------ cleanup -------------------------------- */
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      image.onload = null;

      // Dispose GPU resources.
      if (texture.texture) gl.deleteTexture(texture.texture);
      geometry.remove(); // deletes VAO + attribute buffers
      program.remove(); // deletes the linked program + shaders

      // Drop the WebGL context and detach the canvas.
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
    // Empty deps: WebGL is set up once. Live values are read through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, position: 'relative', overflow: 'hidden' }}
    />
  );
}
