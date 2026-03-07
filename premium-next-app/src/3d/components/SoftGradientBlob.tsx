"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ColorStop {
  offset: number;
  color: string;
  opacity: number;
}

interface SoftGradientBlobProps {
  colorStops: ColorStop[];
  position: [number, number, number];
  scale?: number;
  speed?: number;
  phase?: number;
}

export function SoftGradientBlob({
  colorStops,
  position,
  scale = 1,
  speed = 1,
  phase = 0
}: SoftGradientBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    colorStops.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [colorStops]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: gradientTexture },
  }), [gradientTexture]);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      gl_FragColor = color;
    }
  `;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Clockwise orbit: cos drives X, -sin drives Y (negative = clockwise in screen space)
    const time = state.clock.elapsedTime * speed + phase;
    const orbitRadius = 1.0;

    meshRef.current.position.x = position[0] + Math.cos(time * 0.35) * orbitRadius;
    meshRef.current.position.y = position[1] + Math.sin(-time * 0.35) * orbitRadius * 0.5;
    meshRef.current.position.z = position[2];

    // Subtle scale breathe while orbiting
    const pulse = 1 + Math.sin(time * 0.6) * 0.06;
    meshRef.current.scale.setScalar(scale * pulse);

    // Very subtle rotation on the blob itself
    meshRef.current.rotation.z = -time * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
