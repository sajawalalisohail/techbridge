# Claude Implementation Prompt: Hybrid 3D Background

## 🎯 Goal
Implement a hybrid 3D background combining:
- **V1-style**: Soft radial gradient blobs (smooth, ethereal)
- **V4-style**: 3D interactivity (mouse parallax, particles, bloom)

---

## 📦 Step 1: Install Dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```

---

## 📁 Step 2: Create Folder Structure

Create this folder structure in your project:

```
src/3d/
├── index.ts                    # Barrel export
├── HybridBackground.tsx        # Main Canvas wrapper
├── components/
│   ├── SoftGradientBlob.tsx    # V1-style gradient blob
│   ├── Particles.tsx           # 3D floating particles
│   ├── InteractiveCamera.tsx   # Mouse-following camera
│   └── DarkBackground.tsx      # Base dark gradient
└── scenes/
    └── MainScene.tsx           # Combines all elements
```

---

## 💻 Step 3: Copy All Component Code

### File 1: `src/3d/index.ts`

```typescript
export { HybridBackground } from './HybridBackground';
```

---

### File 2: `src/3d/components/InteractiveCamera.tsx`

```typescript
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function InteractiveCamera() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.03;
    
    camera.position.x = mouseRef.current.x * 1.2;
    camera.position.y = mouseRef.current.y * 0.6;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
```

---

### File 3: `src/3d/components/DarkBackground.tsx`

```typescript
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function DarkBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 400);
    gradient.addColorStop(0, '#1a1a2e');   // Center - lighter
    gradient.addColorStop(0.5, '#16213e'); // Middle
    gradient.addColorStop(1, '#0f0f23');   // Edge - darker
    
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
```

---

### File 4: `src/3d/components/SoftGradientBlob.tsx`

```typescript
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
```

---

### File 5: `src/3d/components/Particles.tsx`

```typescript
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 200 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    
    return [positions, velocities];
  }, [count]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#e879f9'),
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
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

---

### File 6: `src/3d/scenes/MainScene.tsx`

```typescript
import { InteractiveCamera } from '../components/InteractiveCamera';
import { DarkBackground } from '../components/DarkBackground';
import { SoftGradientBlob } from '../components/SoftGradientBlob';
import { Particles } from '../components/Particles';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function MainScene() {
  return (
    <>
      <InteractiveCamera />
      <ambientLight intensity={0.3} />
      
      {/* Dark base background */}
      <DarkBackground />
      
      {/* Blob 3: Deep purple - largest, most diffuse (back) */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(88, 28, 135, 0.4)', opacity: 0.4 },
          { offset: 0.3, color: 'rgba(67, 20, 102, 0.25)', opacity: 0.25 },
          { offset: 0.6, color: 'rgba(45, 15, 70, 0.1)', opacity: 0.1 },
          { offset: 1, color: 'rgba(45, 15, 70, 0)', opacity: 0 },
        ]}
        position={[0, -1, -12]}
        scale={1.6}
        speed={0.4}
        phase={4}
      />
      
      {/* Blob 1: Cyan/blue */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(6, 182, 212, 0.5)', opacity: 0.5 },
          { offset: 0.3, color: 'rgba(8, 145, 178, 0.3)', opacity: 0.3 },
          { offset: 0.6, color: 'rgba(14, 116, 144, 0.15)', opacity: 0.15 },
          { offset: 1, color: 'rgba(14, 116, 144, 0)', opacity: 0 },
        ]}
        position={[-2, 0.5, -10]}
        scale={1.3}
        speed={0.8}
        phase={0}
      />
      
      {/* Blob 2: Purple/pink */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(168, 85, 247, 0.45)', opacity: 0.45 },
          { offset: 0.3, color: 'rgba(147, 51, 234, 0.28)', opacity: 0.28 },
          { offset: 0.6, color: 'rgba(126, 34, 206, 0.12)', opacity: 0.12 },
          { offset: 1, color: 'rgba(126, 34, 206, 0)', opacity: 0 },
        ]}
        position={[2.5, -0.5, -11]}
        scale={1.2}
        speed={0.6}
        phase={2}
      />
      
      {/* Floating particles */}
      <Particles count={200} />
      
      {/* Bloom post-processing */}
      <EffectComposer>
        <Bloom 
          intensity={0.8}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
```

---

### File 7: `src/3d/HybridBackground.tsx`

```typescript
import { Canvas } from '@react-three/fiber';
import { MainScene } from './scenes/MainScene';

export function HybridBackground() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#0f0f23']} />
        <fog attach="fog" args={['#0f0f23', 10, 30]} />
        <MainScene />
      </Canvas>
    </div>
  );
}
```

---

## 🎨 Color Customization

To change colors, modify the `colorStops` in `MainScene.tsx`:

```typescript
// Example: Red/Orange theme
<SoftGradientBlob 
  colorStops={[
    { offset: 0, color: 'rgba(239, 68, 68, 0.5)', opacity: 0.5 },    // Red center
    { offset: 0.3, color: 'rgba(220, 38, 38, 0.3)', opacity: 0.3 },  // Red mid
    { offset: 0.6, color: 'rgba(153, 27, 27, 0.15)', opacity: 0.15 },// Dark red
    { offset: 1, color: 'rgba(153, 27, 27, 0)', opacity: 0 },        // Transparent
  ]}
/>
```

---

## 🔧 Usage in App

```tsx
// src/App.tsx
import { HybridBackground } from './3d';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <HybridBackground />
      
      {/* Your content - must have z-10 or higher */}
      <main className="relative z-10">
        <h1>Your Content Here</h1>
      </main>
    </div>
  );
}
```

---

## ✅ Verification Checklist

After implementation, verify:

- [ ] Background is dark (`#0f0f23`)
- [ ] 3 soft gradient blobs visible
- [ ] Blobs move in circular motion
- [ ] Mouse moves camera (parallax)
- [ ] Blobs drift toward mouse
- [ ] 200 particles floating
- [ ] Particles move away from mouse
- [ ] Bloom glow effect visible
- [ ] Text content is readable over background

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Background not visible | Check `zIndex: -1` on container |
| Text hidden behind | Add `z-10` or higher to content |
| Too bright/obscuring | Reduce blob opacity values |
| Performance lag | Reduce particle count to 100 |
| No mouse interaction | Ensure `InteractiveCamera` is in scene |
