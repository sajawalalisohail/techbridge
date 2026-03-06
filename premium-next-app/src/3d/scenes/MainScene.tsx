"use client";

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
      
      {/* Blob 3: Deep violet - largest, most diffuse (back) */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(109, 40, 217, 0.35)', opacity: 0.35 },   // violet-700
          { offset: 0.3, color: 'rgba(91, 33, 182, 0.22)', opacity: 0.22 },  // violet-800
          { offset: 0.6, color: 'rgba(76, 29, 149, 0.08)', opacity: 0.08 },  // violet-900
          { offset: 1, color: 'rgba(76, 29, 149, 0)', opacity: 0 },          // transparent
        ]}
        position={[0, -1, -12]}
        scale={1.6}
        speed={0.4}
        phase={4}
      />
      
      {/* Blob 1: Indigo/violet mix */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(99, 102, 241, 0.4)', opacity: 0.4 },     // indigo-500
          { offset: 0.3, color: 'rgba(79, 70, 229, 0.24)', opacity: 0.24 },  // indigo-600
          { offset: 0.6, color: 'rgba(67, 56, 202, 0.1)', opacity: 0.1 },   // indigo-700
          { offset: 1, color: 'rgba(67, 56, 202, 0)', opacity: 0 },         // transparent
        ]}
        position={[-2, 0.5, -10]}
        scale={1.3}
        speed={0.8}
        phase={0}
      />
      
      {/* Blob 2: Purple/pink */}
      <SoftGradientBlob 
        colorStops={[
          { offset: 0, color: 'rgba(168, 85, 247, 0.35)', opacity: 0.35 },   // purple-500
          { offset: 0.3, color: 'rgba(147, 51, 234, 0.22)', opacity: 0.22 }, // purple-600
          { offset: 0.6, color: 'rgba(126, 34, 206, 0.08)', opacity: 0.08 }, // purple-700
          { offset: 1, color: 'rgba(126, 34, 206, 0)', opacity: 0 },         // transparent
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
          intensity={0.6}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
