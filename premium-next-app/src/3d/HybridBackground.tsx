"use client";

import { Canvas } from '@react-three/fiber';
import { MainScene } from './scenes/MainScene';

export function HybridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <MainScene />
      </Canvas>
    </div>
  );
}
