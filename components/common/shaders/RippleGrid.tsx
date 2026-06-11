"use client";

import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber";
import { useTexture, useFBO } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { HalfFloatType } from "three";

type RippleGridProps = {
  images: string[];
  className?: string;
};

// Simulation shader (Buffer A in ShaderToy)
const simulationVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simulationFragmentShader = `
  uniform sampler2D uBuffer;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform bool uMousePressed;
  uniform float uFrame;
  varying vec2 vUv;
  
  const float delta = 0.6;
  
  void main() {
    if (uFrame < 1.0) {
      gl_FragColor = vec4(0.0);
      return;
    }
    
    vec2 fragCoord = vUv * uResolution;
    
    float pressure = texture2D(uBuffer, vUv).x;
    float pVel = texture2D(uBuffer, vUv).y;
    
    vec2 pixelSize = 2.0 / uResolution;
    
    float p_right = texture2D(uBuffer, vUv + vec2(pixelSize.x, 0.0)).x;
    float p_left = texture2D(uBuffer, vUv - vec2(pixelSize.x, 0.0)).x;
    float p_up = texture2D(uBuffer, vUv + vec2(0.0, pixelSize.y)).x;
    float p_down = texture2D(uBuffer, vUv - vec2(0.0, pixelSize.y)).x;
    
    // Boundary conditions
    if (vUv.x < pixelSize.x) p_left = p_right;
    if (vUv.x > 4.0 - pixelSize.x) p_right = p_left;
    if (vUv.y < pixelSize.y) p_down = p_up;
    if (vUv.y > 4.0 - pixelSize.y) p_up = p_down;
    
    // Apply wave function
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
    
    // Update pressure
    pressure += delta * pVel;
    
    // Spring motion for water-like waves
    pVel -= 0.005 * delta * pressure;
    
    // Damping
    pVel *= 1.0 - 0.002 * delta;
    pressure *= 0.999;
    
    // Calculate gradients
    float gradX = (p_right - p_left) / 4.0;
    float gradY = (p_up - p_down) / 4.0;
    
    gl_FragColor = vec4(pressure, pVel, gradX, gradY);
    
    // Mouse interaction
    if (uMousePressed) {
      float dist = distance(fragCoord, uMouse * uResolution);
      if (dist <= 20.0) {
        gl_FragColor.x += 1.0 - dist / 20.0;
      }
    }
  }
`;

// Render shader (Image in ShaderToy)
const renderVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const renderFragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uSimulation;
  varying vec2 vUv;
  
  void main() {
    vec4 simData = texture2D(uSimulation, vUv);
    
    // Apply distortion based on gradients
    vec2 distortion = simData.zw * 0.8;
    vec4 color = texture2D(uTexture, vUv + distortion);
    
    // Add sunlight glint
    vec3 normal = normalize(vec3(-simData.z, 0.2, -simData.w));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float glint = pow(max(0.0, dot(normal, lightDir)), 60.0);
    
    gl_FragColor = color + vec4(vec3(glint), 1.0);
  }
`;

type WaterPlaneProps = {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
};

function WaterPlane({ texture, position, scale }: WaterPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, gl, pointer, raycaster, camera } = useThree();

  // Create ping-pong buffers for simulation
  const simTarget1 = useFBO(512, 512, {
    type: HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });

  const simTarget2 = useFBO(512, 512, {
    type: HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });

  const frameCount = useRef(0);
  const currentBufferRef = useRef(0);
  const mousePressed = useRef(false);
  const mouseUV = useRef(new THREE.Vector2(0.5, 0.5));

  // Simulation material
  const simMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
      uniforms: {
        uBuffer: { value: null },
        uResolution: { value: new THREE.Vector2(512, 512) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMousePressed: { value: false },
        uFrame: { value: 0 },
      },
    });
  }, []);

  // Render material
  const renderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uSimulation: { value: null },
      },
    });
  }, [texture]);

  // Simulation scene
  const simScene = useMemo(() => new THREE.Scene(), []);
  const simCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );
  const simQuad = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2);
    return new THREE.Mesh(geo, simMaterial);
  }, [simMaterial]);

  useMemo(() => {
    simScene.add(simQuad);
  }, [simScene, simQuad]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Check if mouse is hovering
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0 && intersects[0].uv) {
      mousePressed.current = true;
      mouseUV.current.copy(intersects[0].uv);
    } else {
      mousePressed.current = false;
    }

    // Update simulation
    const currentBuffer =
      currentBufferRef.current === 0 ? simTarget1 : simTarget2;
    const nextBuffer = currentBufferRef.current === 0 ? simTarget2 : simTarget1;

    simMaterial.uniforms.uBuffer.value = currentBuffer.texture;
    simMaterial.uniforms.uMouse.value.copy(mouseUV.current);
    simMaterial.uniforms.uMousePressed.value = mousePressed.current;
    simMaterial.uniforms.uFrame.value = frameCount.current;

    // Render simulation to next buffer
    gl.setRenderTarget(nextBuffer);
    gl.render(simScene, simCamera);
    gl.setRenderTarget(null);

    // Update render material
    renderMaterial.uniforms.uSimulation.value = nextBuffer.texture;

    // Swap buffers
    currentBufferRef.current = 1 - currentBufferRef.current;
    frameCount.current++;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={renderMaterial}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
}

function Scene({ images }: { images: string[] }) {
  const textures = useTexture(images);
  const { viewport } = useThree();

  // Calculate grid layout
  const cols = 4;
  const spacing = 0.04;
  const planeWidth = viewport.width / cols - spacing;
  const planeHeight = viewport.height / 2;

  const positions: [number, number, number][] = useMemo(() => {
    const startX = -viewport.width / 2 + planeWidth / 2;
    const yOffsets = [0.2, 0.8, 0, 0.4];

    return images.map((_, i) => [
      startX + i * (planeWidth + spacing),
      yOffsets[i] || 0,
      0,
    ]);
  }, [viewport.width, planeWidth, images.length]);

  return (
    <>
      {Array.isArray(textures)
        ? textures.map((texture, i) => (
            <WaterPlane
              key={i}
              texture={texture}
              position={positions[i]}
              scale={[planeWidth, planeHeight, 1]}
            />
          ))
        : null}
    </>
  );
}

export default function RippleGrid({
  images,
  className = "",
}: RippleGridProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Scene images={images} />
      </Canvas>
    </div>
  );
}
