"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ColorStop {
  offset: number;
  color: string;
  opacity: number;
}

interface CenterBlobProps {
  colorStops: ColorStop[];
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

export function CenterBlob({ 
  colorStops, 
  position, 
  scale = 1,
  speed = 1,
}: CenterBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);

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
    
    const time = state.clock.elapsedTime * speed;
    
    // More dynamic floating
    const floatY = Math.sin(time * 0.4) * 0.2 + Math.sin(time * 0.25) * 0.1;
    meshRef.current.position.y = position[1] + floatY;
    meshRef.current.position.x = position[0];
    meshRef.current.position.z = position[2];
    
    // Gentle pulsing
    const pulse = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale * pulse);
    
    // Very subtle rotation
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
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
