"use client";

import { motion } from "framer-motion";
import { MOTION_TRANSITIONS } from "@/lib/motion";

export default function TimelineBarsAnimation({ isInView }: { isInView: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="space-y-5 overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/30 p-5"
    >
      <div>
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <span>Typical agency</span>
          <span>12 weeks</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="h-full rounded-full bg-white/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 0.86 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, duration: 0.84 }}
            style={{ originX: 0 }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <span className="text-brand-accent-light">TechBridge rhythm</span>
          <span className="text-brand-accent-light">4 weeks</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light shadow-[0_0_14px_rgba(var(--brand-accent-rgb),0.35)]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 0.32 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, duration: 0.7, delay: 0.12 }}
            style={{ originX: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
