"use client";

import dynamic from "next/dynamic";
import { useJellyMorphScrollProgress } from "@/lib/jelly-morph-context";

const JellyMorphCanvas = dynamic(
  () => import("@/3d/components/JellyMorphParticles").then((mod) => mod.JellyMorphCanvas),
  { ssr: false }
);

export function PageParticlesWrapper() {
  const scrollProgressRef = useJellyMorphScrollProgress();

  return (
    <div className="w-full h-full">
      <JellyMorphCanvas scrollProgressRef={scrollProgressRef} />
    </div>
  );
}
