"use client";

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function DarkBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Dark TechBridge theme gradient - from neutral-950 center to black edge
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 400);
    gradient.addColorStop(0, '#0a0a0a');   // Center - neutral-950
    gradient.addColorStop(0.5, '#050505'); // Middle - darker
    gradient.addColorStop(1, '#000000');   // Edge - pure black
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial map={gradientTexture} />
    </mesh>
  );
}
