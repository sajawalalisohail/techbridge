"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useJellyMorphScrollProgress } from "@/lib/jelly-morph-context";

const JellyMorphCanvas = dynamic(
  () => import("@/3d/components/JellyMorphParticles").then((mod) => mod.JellyMorphCanvas),
  { ssr: false }
);
const PageParticles = dynamic(
  () => import("@/3d/components/PageParticles").then((mod) => mod.PageParticles),
  { ssr: false }
);

export function PageParticlesWrapper() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const scrollProgressRef = useJellyMorphScrollProgress();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHomepage) {
      return;
    }

    let frameId = 0;

    const tick = () => {
      const progress = scrollProgressRef.current ?? 0;
      const exitStart = 0.9;
      const exitEnd = 0.94;
      let opacity = 0;

      if (progress > 0 && progress < 0.1) {
        opacity = progress / 0.1;
      } else if (progress >= 0.1 && progress <= 0.9) {
        opacity = 1;
      } else if (progress > exitStart && progress < exitEnd) {
        opacity = 1 - (progress - exitStart) / (exitEnd - exitStart);
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = String(opacity * 0.95);
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isHomepage, scrollProgressRef]);

  if (isHomepage) {
    return (
      <div className="relative h-full w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(var(--brand-accent-light-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0.05) 24%, rgba(var(--brand-accent-deep), 0) 62%)",
            filter: "blur(28px)",
            transform: "scale(1.02)",
          }}
        />
        <PageParticles />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 58% 42%, rgba(var(--brand-accent-light-rgb), 0.14) 0%, rgba(var(--brand-accent-rgb), 0.12) 20%, rgba(var(--brand-accent-dark-rgb), 0.1) 38%, rgba(var(--brand-accent-deep), 0) 68%)",
          filter: "blur(34px)",
          transform: "scale(1.05)",
        }}
      />
      <JellyMorphCanvas scrollProgressRef={scrollProgressRef} />
    </div>
  );
}
