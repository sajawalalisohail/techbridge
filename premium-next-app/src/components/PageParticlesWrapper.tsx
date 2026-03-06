"use client";

import dynamic from "next/dynamic";

const PageParticles = dynamic(
  () => import("@/3d").then((mod) => mod.PageParticles),
  { ssr: false }
);

export function PageParticlesWrapper() {
  return (
    <div className="w-full h-full">
      <PageParticles />
    </div>
  );
}
