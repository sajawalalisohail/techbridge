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

  // Create gradient texture from canvas (V1-style)
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
    
    const time = state.clock.elapsedTime * speed + phase;
    
    // V1-style circular motion
    const blobRadius = 2;
    const targetX = position[0] + Math.cos(time) * blobRadius * 0.4;
    const targetY = position[1] + Math.sin(time * 0.8) * blobRadius * 0.3;
    
    // Mouse influence
    const mouseX = state.pointer.x * 1.5;
    const mouseY = state.pointer.y * 0.8;
    
    meshRef.current.position.x += (targetX + mouseX * 0.3 - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (targetY + mouseY * 0.3 - meshRef.current.position.y) * 0.02;
    meshRef.current.position.z = position[2];
    
    // Subtle pulsing
    const pulse = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale * pulse);
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
