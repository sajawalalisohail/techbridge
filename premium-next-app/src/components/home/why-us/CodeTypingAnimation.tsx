"use client";

import { motion } from "framer-motion";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

const CODE_LINES = [
  [
    { text: "const", cls: "text-brand-accent-light" },
    { text: " orchestration", cls: "text-white" },
    { text: " = ", cls: "text-zinc-500" },
    { text: "buildSystem", cls: "text-sky-300" },
    { text: "({", cls: "text-zinc-500" },
  ],
  [
    { text: "  machineReadable", cls: "text-zinc-300" },
    { text: ": ", cls: "text-zinc-500" },
    { text: "true", cls: "text-brand-accent-light" },
    { text: ",", cls: "text-zinc-500" },
  ],
  [
    { text: "  automationHooks", cls: "text-zinc-300" },
    { text: ": ", cls: "text-zinc-500" },
    { text: "\"from-day-one\"", cls: "text-sky-300" },
    { text: ",", cls: "text-zinc-500" },
  ],
  [{ text: "});", cls: "text-zinc-500" }],
];

export default function CodeTypingAnimation({ isInView }: { isInView: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/30 p-4 font-mono text-sm"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-white/8 pb-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-brand-accent/35" />
        <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-zinc-500">system.ts</span>
      </div>

      <div className="space-y-2">
        {CODE_LINES.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...MOTION_TRANSITIONS.ui,
              delay: lineIndex * MOTION_STAGGER.tight,
            }}
            className="whitespace-pre"
          >
            {line.map((token) => (
              <span key={`${lineIndex}-${token.text}`} className={token.cls}>
                {token.text}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
