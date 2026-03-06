"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesFieldProps {
  count?: number;
}

function ParticlesField({ count = 150 }: ParticlesFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

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
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    return [positions, velocities];
  }, [count]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return colors;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    return geo;
  }, [positions, particleColors]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.03;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];

      const dx = positionArray[i * 3] - mouseRef.current.x * 15;
      const dy = positionArray[i * 3 + 1] - mouseRef.current.y * 10;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4) {
        const force = (4 - dist) * 0.0005;
        positionArray[i * 3] += dx * force;
        positionArray[i * 3 + 1] += dy * force;
      }

      if (positionArray[i * 3] > 20) positionArray[i * 3] = -20;
      if (positionArray[i * 3] < -20) positionArray[i * 3] = 20;
      if (positionArray[i * 3 + 1] > 40) positionArray[i * 3 + 1] = -40;
      if (positionArray[i * 3 + 1] < -40) positionArray[i * 3 + 1] = 40;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.x = mouseRef.current.y * 0.02;
    meshRef.current.rotation.y = mouseRef.current.x * 0.02;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.07}
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

export function PageParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      style={{
        background: 'transparent',
        width: '100%',
        height: '100%'
      }}
    >
      <ParticlesField count={150} />
    </Canvas>
  );
}
