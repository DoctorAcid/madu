"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, useFBO } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { HalfFloatType } from "three";

type GrainLiquidImageProps = {
  image: string;
  className?: string;
};

/* =======================
   SIM SHADERS
======================= */

const simVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const simFragment = `
uniform sampler2D uPrev;
uniform vec2 uMouse;
uniform vec2 uDir;
uniform float uEnergy;
uniform float uTime;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}

vec2 curl(vec2 p) {
  float e = 0.002;
  float n1 = noise(p + vec2(0.0, e));
  float n2 = noise(p - vec2(0.0, e));
  float n3 = noise(p + vec2(e, 0.0));
  float n4 = noise(p - vec2(e, 0.0));
  return normalize(vec2(n1 - n2, n3 - n4));
}

void main() {
  float prev = texture2D(uPrev, vUv).r;
  float strength = prev * 0.78;

  vec2 flow = curl(vUv * 6.0 + uTime * 0.5);
  vec2 curvedDir = normalize(mix(uDir, flow, 0.4));

  vec2 toPixel = vUv - uMouse;

  // head (cursor)
  float head = smoothstep(0.05, 0.0, length(toPixel));

  // tail: sample previous frame in the flow direction for smooth fading trail
  vec2 trailUv = vUv + curvedDir * 0.0002; // adjust 0.02 for length
  float tail = texture2D(uPrev, trailUv).r * 0.5;

  // combine head + tail
  float impulse = max(head, tail);

  // apply energy
  strength += impulse * uEnergy * 1.2;

  // grain noise
  float g = noise(vUv * 120.0 + flow * 2.0 + uTime);
  strength += (g - 0.5) * impulse * 0.35;

  // smooth circular mask effect
  float mask = smoothstep(0.0, 0.1, impulse);

  gl_FragColor = vec4(clamp(strength, 0.0, 1.0) * mask, 0.0, 0.0, mask);
}
`;

/* =======================
   RENDER SHADERS
======================= */

const renderVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const renderFragment = `
uniform sampler2D uTexture;
uniform sampler2D uSim;
uniform vec2 uMouse;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float s = texture2D(uSim, vUv).r;

  float d = distance(vUv, uMouse);
  float mask = smoothstep(0.25, 0.0, d);

  float angle = hash(vUv) * 6.28318;
  vec2 offset = vec2(cos(angle), sin(angle)) * s * mask * 0.05;

  vec4 color = texture2D(uTexture, vUv + offset);
  gl_FragColor = color;
}
`;

/* =======================
   PLANE
======================= */

function GrainPlane({ texture }: { texture: THREE.Texture }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { gl, pointer, raycaster, camera, viewport } = useThree();

  const mouseUV = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const prevVelocity = useRef(new THREE.Vector2());
  const dir = useRef(new THREE.Vector2(1, 0));
  const energy = useRef(0);

  const fboA = useFBO(512, 512, { type: HalfFloatType });
  const fboB = useFBO(512, 512, { type: HalfFloatType });
  const swap = useRef(false);

  const simMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: simVertex,
        fragmentShader: simFragment,
        uniforms: {
          uPrev: { value: null },
          uMouse: { value: new THREE.Vector2() },
          uDir: { value: new THREE.Vector2(1, 0) },
          uEnergy: { value: 0 },
          uTime: { value: 0 },
        },
      }),
    []
  );

  const renderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: renderVertex,
        fragmentShader: renderFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTexture: { value: texture },
          uSim: { value: null },
          uMouse: { value: new THREE.Vector2() },
        },
      }),
    [texture]
  );

  const simScene = useMemo(() => {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat));
    return s;
  }, [simMat]);

  const simCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObject(mesh.current);

    if (hit[0]?.uv) {
      mouseUV.current.copy(hit[0].uv);

      const velocity = mouseUV.current.clone().sub(prevMouse.current);

      if (velocity.length() > 0.00001) {
        const targetDir = velocity.clone().normalize();
        dir.current.lerp(targetDir, 0.12);
      }

      const accel = velocity.clone().sub(prevVelocity.current);
      energy.current += accel.length() * 180.0;

      prevVelocity.current.copy(velocity);
      prevMouse.current.copy(mouseUV.current);
    }

    energy.current = THREE.MathUtils.clamp(energy.current * 0.7, 0, 1);

    const read = swap.current ? fboB : fboA;
    const write = swap.current ? fboA : fboB;

    simMat.uniforms.uPrev.value = read.texture;
    simMat.uniforms.uMouse.value.copy(mouseUV.current);
    simMat.uniforms.uDir.value.copy(dir.current);
    simMat.uniforms.uEnergy.value = energy.current;
    simMat.uniforms.uTime.value = state.clock.elapsedTime;

    gl.setRenderTarget(write);
    gl.render(simScene, simCam);
    gl.setRenderTarget(null);

    renderMat.uniforms.uSim.value = write.texture;
    renderMat.uniforms.uMouse.value.copy(mouseUV.current);

    swap.current = !swap.current;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive object={renderMat} attach="material" />
    </mesh>
  );
}

/* =======================
   SCENE
======================= */

function Scene({ image }: { image: string }) {
  const texture = useTexture(image);
  return <GrainPlane texture={texture} />;
}

export default function GrainLiquidImage({
  image,
  className = "",
}: GrainLiquidImageProps) {
  return (
    <div className={className}>
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Scene image={image} />
      </Canvas>
    </div>
  );
}
