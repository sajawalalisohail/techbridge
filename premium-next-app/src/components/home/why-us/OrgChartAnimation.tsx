"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_TRANSITIONS } from "@/lib/motion";

interface Node {
  label: string;
  x: number;
}

const FULL_CHAIN: Node[] = [
  { label: "YOU", x: 34 },
  { label: "PM", x: 114 },
  { label: "LEAD", x: 194 },
  { label: "DEV", x: 274 },
];

const DIRECT_CHAIN: Node[] = [
  { label: "YOU", x: 78 },
  { label: "DEV", x: 230 },
];

export default function OrgChartAnimation({ isInView }: { isInView: boolean }) {
  const [directMode, setDirectMode] = useState(false);

  useEffect(() => {
    if (!isInView || directMode) {
      return;
    }

    const timer = window.setTimeout(() => setDirectMode(true), 900);
    return () => window.clearTimeout(timer);
  }, [directMode, isInView]);

  const nodes = directMode ? DIRECT_CHAIN : FULL_CHAIN;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/30 p-4"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        Communication lane
      </p>

      <svg viewBox="0 0 310 72" className="mt-4 w-full">
        <motion.line
          x1={nodes[0].x}
          y1={36}
          x2={nodes[nodes.length - 1].x}
          y2={36}
          stroke="url(#org-line)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...MOTION_TRANSITIONS.reveal, duration: 0.56 }}
        />

        <defs>
          <linearGradient id="org-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-accent-light)" />
          </linearGradient>
        </defs>

        <AnimatePresence mode="popLayout">
          {nodes.map((node) => (
            <motion.g
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: node.x }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ ...MOTION_TRANSITIONS.ui }}
            >
              <circle
                cx={0}
                cy={36}
                r={17}
                fill="rgba(var(--brand-accent-rgb), 0.12)"
                stroke="rgba(var(--brand-accent-light-rgb), 0.72)"
                strokeWidth={1.5}
              />
              <text
                x={0}
                y={40}
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="700"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      <p className="mt-4 text-sm leading-6 text-zinc-400">
        The chain compresses down to the person actually writing the code.
      </p>
    </div>
  );
}
