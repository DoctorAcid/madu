"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { shaderMaterial, useTrailTexture, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PixelTrailProps {
  image: string;
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: any;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<{ id?: string; strength?: number }> = ({
  id = "goo-filter",
  strength = 20,
}) => (
  <svg className="absolute overflow-hidden z-1">
    <defs>
      <filter id={id}>
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation={strength}
          result="blur"
        />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

const GrainTrailMaterial = shaderMaterial(
  {
    mouseTrail: null,
    uTexture: null,
    uMouse: new THREE.Vector2(),
    pixelColor: new THREE.Color("#ffffff"),
    uTime: 0,
    uAspect: new THREE.Vector2(1, 1),
  },
  /* vertex shader */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
  `,
  /* fragment shader */ `
  uniform sampler2D mouseTrail;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec3 pixelColor;
  uniform float uTime;
  uniform vec2 uAspect;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
  }

  vec2 curl(vec2 p) {
    float e = 0.002;
    float n1 = noise(p + vec2(0.1, e));
    float n2 = noise(p - vec2(0.1, e));
    float n3 = noise(p + vec2(e, 0.1));
    float n4 = noise(p - vec2(e, 0.1));
    return normalize(vec2(n1 - n2, n3 - n4));
  }

  // Cover-mode UV: maps viewport UV to image UV preserving aspect ratio.
  // uAspect.x = viewport w/h, uAspect.y = image w/h
  vec2 coverUV(vec2 uv) {
    vec2 st = uv - 0.5;
    if (uAspect.x > uAspect.y) {
      st.y *= uAspect.y / uAspect.x;
    } else {
      st.x *= uAspect.x / uAspect.y;
    }
    return st + 0.5;
  }

  void main() {
    vec4 trail = texture2D(mouseTrail, vUv);

    float impulse = trail.r;
    float mask = smoothstep(0.1, 0.0, impulse);
    mask = pow(mask, 1.0);

    float d = distance(vUv, uMouse);
    float distMask = smoothstep(1.0, 0.0, d);

    float g = hash(vUv * 10.2 + uTime * 1.15);
    float grain = (g - 0.5) * mask * 1.0;

    vec2 flow1 = curl(vUv * 0.8 + uTime * 0.008);
    vec2 flow2 = curl(vUv * 1.6 + uTime * 0.005) * 0.05;
    vec2 flow3 = curl(vUv * 3.0 + uTime * 0.003) * 0.025;
    vec2 flow = normalize(flow1 + flow2 + flow3);
    float strength = impulse * distMask;

    float zoomFactor = 0.3;
    vec2 toCenter = vUv - uMouse;
    float distFromCenter = length(toCenter);

    float lensDistortion = 1.0 + distFromCenter * distFromCenter * 0.3;
    vec2 lensUV = uMouse + (toCenter / zoomFactor) * lensDistortion;

    vec2 magnifiedUV = mix(uMouse + toCenter / zoomFactor, lensUV, strength);
    vec2 finalUV = mix(vUv, magnifiedUV, strength * 0.15);

    vec2 liquidDistortion = flow * strength * 0.01;
    vec2 refractedUV = finalUV + liquidDistortion;

    float edge = 1.6 - smoothstep(0.0, 0.2, impulse);
    float fresnel = pow(edge, 4.0) * strength;

    float aberration = strength * 0.1;
    vec2 offset1 = liquidDistortion + vec2(aberration, 0.0);
    vec2 offset2 = liquidDistortion;
    vec2 offset3 = liquidDistortion - vec2(aberration, 0.0);

    float r     = texture2D(uTexture, coverUV(finalUV + offset1)).r;
    float g_tex = texture2D(uTexture, coverUV(finalUV + offset2)).g;
    float b     = texture2D(uTexture, coverUV(finalUV + offset3)).b;

    vec3 chromaticColor = vec3(r, g_tex, b);
    vec3 grainColor = grain * vec3(0.02);
    vec3 color = chromaticColor + grainColor + vec3(fresnel * 0.1);
    color += vec3(strength * 0.01);

    float a = texture2D(uTexture, coverUV(refractedUV)).a;

    gl_FragColor = vec4(color, a);
  }
`,
);

function Scene({
  image,
  trailSize = 10.0,
  maxAge = 2500,
  interpolate = 0.05,
  easingFunction = (x: number) => x,
  color = "#ffffff",
  onReady,
}: {
  image: string;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  color: string;
  onReady: () => void;
}) {
  const viewport = useThree((s) => s.viewport);
  const gl = useThree((s) => s.gl);
  const matRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseUV = useRef(new THREE.Vector2(0.5, 0.5));

  const texture = useTexture(image);

  // Fires once on mount — which only happens after useTexture's Suspense resolves.
  useEffect(() => { onReady(); }, []);

  const [trail, onMove] = useTrailTexture({
    size: 1920,
    radius: trailSize,
    maxAge,
    interpolate,
    ease: easingFunction,
  }) as [THREE.Texture | null, (e: { uv?: THREE.Vector2 }) => void];

  if (trail) {
    trail.minFilter = THREE.LinearFilter;
    trail.magFilter = THREE.LinearFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  // Global listener so the effect works even when the cursor is over text/DOM
  // elements that sit above the canvas. UV is computed directly from screen coords.
  useEffect(() => {
    const canvas = gl.domElement;
    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const u = (e.clientX - rect.left) / rect.width;
      const v = 1 - (e.clientY - rect.top) / rect.height;
      mouseUV.current.set(u, v);
      onMove({ uv: new THREE.Vector2(u, v) });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [gl.domElement, onMove]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uMouse.value.copy(mouseUV.current);
    }
  });

  // Non-uniform scale so the mesh exactly fills the viewport in both axes.
  // This makes raycasting/UV coordinates match the visible screen at any size.
  const scaleX = viewport.width / 2;
  const scaleY = viewport.height / 2;

  const img = texture.image as HTMLImageElement | null;
  const imageAspect = img?.width && img?.height ? img.width / img.height : 1;
  const viewAspect = viewport.width / viewport.height;

  const material = useMemo(() => new GrainTrailMaterial(), []);

  if (material) {
    material.uniforms.pixelColor.value = new THREE.Color(color);
    material.uniforms.mouseTrail.value = trail;
    material.uniforms.uTexture.value = texture;
    material.uniforms.uMouse.value.copy(mouseUV.current);
    material.uniforms.uAspect.value.set(viewAspect, imageAspect);
    material.transparent = true;
  }

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}

export default function PixelTrail({
  image,
  trailSize = 0.1,
  maxAge = 1080,
  interpolate = 0.1,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
  },
  gooeyFilter,
  color = "#ffffff",
  className = "",
}: PixelTrailProps) {
  const [loaded, setLoaded] = useState(false);
  const handleReady = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* Placeholder shown while WebGL + texture are initialising */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.6s ease" }}
      />

      {gooeyFilter && (
        <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />
      )}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`absolute z-1 ${className}`}
        style={{
          pointerEvents: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
        }}
      >
        <Suspense fallback={null}>
          <Scene
            image={image}
            trailSize={trailSize}
            maxAge={maxAge}
            interpolate={interpolate}
            easingFunction={easingFunction}
            color={color}
            onReady={handleReady}
          />
        </Suspense>
      </Canvas>
    </>
  );
}
