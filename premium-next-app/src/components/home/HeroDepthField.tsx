"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import { DarkMatterField } from "@/3d/components/DarkMatterField";
import { MOTION_TRANSITIONS } from "@/lib/motion";

export type HeroMode = "build" | "hire";

interface HeroDepthFieldProps {
  mode: HeroMode;
}

export default function HeroDepthField({ mode }: HeroDepthFieldProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      animate={
        mode === "build"
          ? { x: 0, scale: 1, rotate: 0, opacity: 1 }
          : { x: 28, scale: 1.035, rotate: -1.25, opacity: 0.94 }
      }
      className="absolute inset-0"
      transition={MOTION_TRANSITIONS.emphasis}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 28%, rgba(var(--brand-accent-light-rgb), 0.14) 0%, rgba(var(--brand-accent-rgb), 0.09) 24%, rgba(var(--brand-accent-dark-rgb), 0.04) 42%, transparent 68%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 54 }}
        dpr={prefersReducedMotion ? 1 : [1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <DarkMatterField variant="hero" />
      </Canvas>

      <motion.div
        animate={
          mode === "build"
            ? {
                opacity: 0.72,
                background:
                  "radial-gradient(circle at 78% 24%, rgba(var(--brand-accent-light-rgb), 0.22) 0%, rgba(var(--brand-accent-rgb), 0.12) 24%, transparent 58%)",
              }
            : {
                opacity: 0.76,
                background:
                  "radial-gradient(circle at 64% 38%, rgba(var(--brand-accent-light-rgb), 0.18) 0%, rgba(var(--brand-accent-rgb), 0.1) 26%, transparent 58%)",
              }
        }
        className="absolute inset-0"
        transition={MOTION_TRANSITIONS.emphasis}
      />
    </motion.div>
  );
}
