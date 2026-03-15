"use client";

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Connection Lines ────────────────────────────────────── */

interface ConnectionLinesProps {
  positionsRef: React.RefObject<Float32Array | null>;
  count: number;
  maxDistance?: number;
}

function ConnectionLines({ positionsRef, count, maxDistance = 3.0 }: ConnectionLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const MAX_LINES = 500;

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), []);
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 6), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  useFrame(() => {
    if (!linesRef.current || !positionsRef.current) return;
    const positions = positionsRef.current;
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

          // Lime tint with distance-based fade
          lineColors[idx] = 0.52 * alpha;
          lineColors[idx + 1] = 0.80 * alpha;
          lineColors[idx + 2] = 0.09 * alpha;
          lineColors[idx + 3] = 0.52 * alpha;
          lineColors[idx + 4] = 0.80 * alpha;
          lineColors[idx + 5] = 0.09 * alpha;

          lineCount++;
        }
      }
    }

    geometry.setDrawRange(0, lineCount * 2);
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} frustumCulled={false}>
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
}

function ParticlesField({ count = 80, positionsRef }: ParticlesFieldProps) {
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
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12; // Wider z-spread for depth

      // Slower, more elegant drift
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      // Per-particle size variation (0.10 - 0.25)
      sizes[i] = 0.10 + Math.random() * 0.15;
    }

    return [positions, velocities, sizes];
  }, [count]);

  // Expose positions for ConnectionLines
  useMemo(() => {
    positionsRef.current = positions;
  }, [positions, positionsRef]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#84cc16'),
      new THREE.Color('#a3e635'),
      new THREE.Color('#65a30d'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Dim particles further from camera for depth effect
      const zDepth = Math.abs(positions[i * 3 + 2]) / 6;
      const depthFade = Math.max(0.3, 1 - zDepth * 0.5);
      colors[i * 3] = color.r * depthFade;
      colors[i * 3 + 1] = color.g * depthFade;
      colors[i * 3 + 2] = color.b * depthFade;
    }

    return colors;
  }, [count, positions]);

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

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqMobile = window.matchMedia('(max-width: 768px)');

    const update = () => {
      if (mqMobile.matches) {
        setCount(50);
        setShowConnections(false);
      } else if (mqDesktop.matches) {
        setCount(120);
        setShowConnections(true);
      } else {
        setCount(80);
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
      <ParticlesField count={count} positionsRef={positionsRef} />
      {showConnections && (
        <ConnectionLines positionsRef={positionsRef} count={count} maxDistance={3.0} />
      )}
    </Canvas>
  );
}
