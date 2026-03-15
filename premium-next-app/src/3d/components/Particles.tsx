"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getBrandColors } from "@/lib/brand-colors";

function seededUnit(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123;
  return value - Math.floor(value);
}

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 40 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const brandColors = useMemo(() => getBrandColors(), []);

  // Create circular particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    // Draw a soft circle
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededUnit(i + count * 1.1) - 0.5) * 30;
      positions[i * 3 + 1] = (seededUnit(i + count * 2.7) - 0.5) * 20;
      positions[i * 3 + 2] = (seededUnit(i + count * 3.9) - 0.5) * 15 - 3;

      velocities[i * 3] = (seededUnit(i + count * 4.3) - 0.5) * 0.008;
      velocities[i * 3 + 1] = (seededUnit(i + count * 5.1) - 0.5) * 0.008;
      velocities[i * 3 + 2] = (seededUnit(i + count * 6.5) - 0.5) * 0.004;
    }

    return [positions, velocities];
  }, [count]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color(brandColors.accent),
      new THREE.Color(brandColors.accentLight),
      new THREE.Color(brandColors.accentDark),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(seededUnit(i + count * 7.7) * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return colors;
  }, [brandColors, count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    return geo;
  }, [positions, particleColors]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.05;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];

      const dx = positionArray[i * 3] - mouseRef.current.x * 10;
      const dy = positionArray[i * 3 + 1] - mouseRef.current.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.001;
        positionArray[i * 3] += dx * force;
        positionArray[i * 3 + 1] += dy * force;
      }

      if (positionArray[i * 3] > 15) positionArray[i * 3] = -15;
      if (positionArray[i * 3] < -15) positionArray[i * 3] = 15;
      if (positionArray[i * 3 + 1] > 10) positionArray[i * 3 + 1] = -10;
      if (positionArray[i * 3 + 1] < -10) positionArray[i * 3 + 1] = 10;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.x = mouseRef.current.y * 0.03;
    meshRef.current.rotation.y = mouseRef.current.x * 0.03;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        map={particleTexture}
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  );
}
