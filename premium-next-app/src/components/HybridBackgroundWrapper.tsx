"use client";

import dynamic from "next/dynamic";

const HybridBackground = dynamic(
  () => import("@/3d").then((mod) => mod.HybridBackground),
  { ssr: false }
);

export function HybridBackgroundWrapper() {
  return (
    <div 
      className="fixed inset-0 bg-black" 
      style={{ 
        backgroundColor: '#000000',
        zIndex: 0 
      }}
    >
      <HybridBackground />
    </div>
  );
}
