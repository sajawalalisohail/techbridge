"use client";

import { useMemo } from "react";
import { InteractiveCamera } from '../components/InteractiveCamera';
import { SoftGradientBlob } from '../components/SoftGradientBlob';
import { CenterBlob } from '../components/CenterBlob';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { getBrandColors } from "@/lib/brand-colors";

export function MainScene() {
  const brandColors = useMemo(() => getBrandColors(), []);

  return (
    <>
      <InteractiveCamera />
      <ambientLight intensity={0.3} />

      {/* Center Blob: Higher up */}
      <CenterBlob
        colorStops={[
          { offset: 0, color: `rgba(${brandColors.accentDarkRgb}, 0.28)`, opacity: 0.28 },
          { offset: 0.3, color: `rgba(${brandColors.accentDarkRgb}, 0.16)`, opacity: 0.16 },
          { offset: 0.6, color: `rgba(${brandColors.accentDarkRgb}, 0.05)`, opacity: 0.05 },
          { offset: 1, color: `rgba(${brandColors.accentDarkRgb}, 0)`, opacity: 0 },
        ]}
        position={[0, 4, -18]}
        scale={1.3}
        speed={0.4}
      />

      {/* Blob 1: Left blob - much higher */}
      <SoftGradientBlob
        colorStops={[
          { offset: 0, color: `rgba(${brandColors.accentLightRgb}, 0.32)`, opacity: 0.32 },
          { offset: 0.3, color: `rgba(${brandColors.accentDarkRgb}, 0.18)`, opacity: 0.18 },
          { offset: 0.6, color: `rgba(${brandColors.accentDarkRgb}, 0.06)`, opacity: 0.06 },
          { offset: 1, color: `rgba(${brandColors.accentDarkRgb}, 0)`, opacity: 0 },
        ]}
        position={[-1, 4.5, -15]}
        scale={1.1}
        speed={0.7}
        phase={0}
      />

      {/* Blob 2: Right blob - much higher */}
      <SoftGradientBlob
        colorStops={[
          { offset: 0, color: `rgba(${brandColors.accentRgb}, 0.28)`, opacity: 0.28 },
          { offset: 0.3, color: `rgba(${brandColors.accentDarkRgb}, 0.16)`, opacity: 0.16 },
          { offset: 0.6, color: `rgba(${brandColors.accentDarkRgb}, 0.05)`, opacity: 0.05 },
          { offset: 1, color: `rgba(${brandColors.accentDarkRgb}, 0)`, opacity: 0 },
        ]}
        position={[1, 4.2, -16]}
        scale={1.0}
        speed={0.7}
        phase={Math.PI}
      />

      {/* Bloom post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
