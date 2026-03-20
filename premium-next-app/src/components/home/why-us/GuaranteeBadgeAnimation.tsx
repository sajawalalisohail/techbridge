"use client";

import { motion } from "framer-motion";
import { MOTION_TRANSITIONS } from "@/lib/motion";

export default function GuaranteeBadgeAnimation({ isInView }: { isInView: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/30 p-5"
    >
      <svg viewBox="0 0 88 92" className="h-24 w-24" fill="none">
        <motion.path
          d="M44 6 L74 20 V50 C74 66 58 81 44 86 C30 81 14 66 14 50 V20 Z"
          stroke="var(--brand-accent-light)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(var(--brand-accent-rgb), 0.08)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...MOTION_TRANSITIONS.reveal, duration: 0.72 }}
        />

        <motion.path
          d="M30 47 L40 57 L58 37"
          stroke="var(--brand-accent-light)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ ...MOTION_TRANSITIONS.ui, delay: 0.24 }}
        />
      </svg>

      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
        Replacement coverage
      </p>
      <p className="mt-3 max-w-[15rem] text-center text-sm leading-6 text-zinc-400">
        If the fit is off, the model absorbs the replacement burden instead of your timeline.
      </p>
    </div>
  );
}
