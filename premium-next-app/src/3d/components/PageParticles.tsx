"use client";

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getBrandColors, type BrandColors } from "@/lib/brand-colors";

function seededUnit(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123;
  return value - Math.floor(value);
}

/* ─── Connection Lines ────────────────────────────────────── */

interface ConnectionLinesProps {
  positionsRef: React.RefObject<Float32Array | null>;
  count: number;
  brandColors: BrandColors;
  maxDistance?: number;
}

function ConnectionLines({ positionsRef, count, brandColors, maxDistance = 3.0 }: ConnectionLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const MAX_LINES = 500;

  useEffect(() => {
    if (!linesRef.current) return;

    const geometry = linesRef.current.geometry;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 6);

    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    geometry.setDrawRange(0, 0);

    return () => {
      geometry.dispose();
    };
  }, []);

  useFrame(() => {
    if (!linesRef.current || !positionsRef.current) return;
    const positions = positionsRef.current;
    const liveGeometry = linesRef.current.geometry;
    const positionAttribute = liveGeometry.getAttribute('position') as THREE.BufferAttribute | undefined;
    const colorAttribute = liveGeometry.getAttribute('color') as THREE.BufferAttribute | undefined;
    if (!positionAttribute || !colorAttribute) return;

    const linePositions = positionAttribute.array as Float32Array;
    const lineColors = colorAttribute.array as Float32Array;
    let lineCount = 0;

    for (let i = 0; i < count && lineCount < MAX_LINES; i++) {
      for (let j = i + 1; j < count && lineCount < MAX_LINES; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          const idx = lineCount * 6;

          linePositions[idx] = positions[i * 3];
          linePositions[idx + 1] = positions[i * 3 + 1];
          linePositions[idx + 2] = positions[i * 3 + 2];
          linePositions[idx + 3] = positions[j * 3];
          linePositions[idx + 4] = positions[j * 3 + 1];
          linePositions[idx + 5] = positions[j * 3 + 2];

          // Brand accent tint with distance-based fade
          lineColors[idx] = brandColors.accentVec3[0] * alpha;
          lineColors[idx + 1] = brandColors.accentVec3[1] * alpha;
          lineColors[idx + 2] = brandColors.accentVec3[2] * alpha;
          lineColors[idx + 3] = brandColors.accentVec3[0] * alpha;
          lineColors[idx + 4] = brandColors.accentVec3[1] * alpha;
          lineColors[idx + 5] = brandColors.accentVec3[2] * alpha;

          lineCount++;
        }
      }
    }

    liveGeometry.setDrawRange(0, lineCount * 2);
    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} frustumCulled={false}>
      <bufferGeometry />
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ─── Particles Field ─────────────────────────────────────── */

interface ParticlesFieldProps {
  count?: number;
  positionsRef: React.MutableRefObject<Float32Array | null>;
  brandColors: BrandColors;
}

function ParticlesField({ count = 80, positionsRef, brandColors }: ParticlesFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const [positions, velocities, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededUnit(i + count * 1.1) - 0.5) * 40;
      positions[i * 3 + 1] = (seededUnit(i + count * 2.3) - 0.5) * 80;
      positions[i * 3 + 2] = (seededUnit(i + count * 3.7) - 0.5) * 12; // Wider z-spread for depth

      // Faster, more dynamic drift
      velocities[i * 3] = (seededUnit(i + count * 4.9) - 0.5) * 0.008;
      velocities[i * 3 + 1] = (seededUnit(i + count * 5.7) - 0.5) * 0.008;
      velocities[i * 3 + 2] = (seededUnit(i + count * 6.1) - 0.5) * 0.004;

      // Per-particle size variation (0.10 - 0.25)
      sizes[i] = 0.10 + seededUnit(i + count * 7.9) * 0.15;
    }

    return [positions, velocities, sizes];
  }, [count]);

  // Expose positions for ConnectionLines
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions, positionsRef]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color(brandColors.accent),
      new THREE.Color(brandColors.accentLight),
      new THREE.Color(brandColors.accentDark),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(seededUnit(i + count * 8.7) * colorPalette.length)];
      // Dim particles further from camera for depth effect
      const zDepth = Math.abs(positions[i * 3 + 2]) / 6;
      const depthFade = Math.max(0.3, 1 - zDepth * 0.5);
      colors[i * 3] = color.r * depthFade;
      colors[i * 3 + 1] = color.g * depthFade;
      colors[i * 3 + 2] = color.b * depthFade;
    }

    return colors;
  }, [brandColors, count, positions]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, particleColors, sizes]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.03;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse repel
      const dx = positionArray[i * 3] - mouseRef.current.x * 15;
      const dy = positionArray[i * 3 + 1] - mouseRef.current.y * 10;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4) {
        const force = (4 - dist) * 0.0005;
        positionArray[i * 3] += dx * force;
        positionArray[i * 3 + 1] += dy * force;
      }

      // Wrap around bounds
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
        size={0.18}
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

/* ─── Main Export ──────────────────────────────────────────── */

export function PageParticles() {
  const positionsRef = useRef<Float32Array | null>(null);
  const [count, setCount] = useState(80);
  const [showConnections, setShowConnections] = useState(true);
  const brandColors = useMemo(() => getBrandColors(), []);

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqMobile = window.matchMedia('(max-width: 768px)');

    const update = () => {
      if (mqMobile.matches) {
        setCount(80);
        setShowConnections(false);
      } else if (mqDesktop.matches) {
        setCount(200);
        setShowConnections(true);
      } else {
        setCount(140);
        setShowConnections(true);
      }
    };

    update();
    mqDesktop.addEventListener('change', update);
    mqMobile.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqMobile.removeEventListener('change', update);
    };
  }, []);

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
      <ParticlesField brandColors={brandColors} count={count} positionsRef={positionsRef} />
      {/* 
      {showConnections && (
        <ConnectionLines brandColors={brandColors} positionsRef={positionsRef} count={count} maxDistance={3.0} />
      )}
      */}
    </Canvas>
  );
}
