"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const STAGES = [
    { label: "Build", icon: "B" },
    { label: "Test", icon: "T" },
    { label: "Deploy", icon: "D" },
    { label: "Monitor", icon: "M" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const nodeVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: EASE, delay: i * 0.2 },
    }),
};

/* ─── Main Export ────────────────────────────────────────── */
export default function DeploymentPipelineMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex flex-col items-center rounded-xl border border-white/5 bg-black/30 px-4 py-6 lg:px-6"
        >
            {/* Pipeline nodes + connecting SVG */}
            <div className="relative flex w-full items-center justify-between">
                {/* SVG connector lines */}
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                >
                    {STAGES.slice(0, -1).map((_, i) => {
                        const x1 = `${(i + 0.5) / STAGES.length * 100 + 5}%`;
                        const x2 = `${((i + 1) + 0.5) / STAGES.length * 100 - 5}%`;
                        return (
                            <motion.line
                                key={i}
                                x1={x1} y1="50%" x2={x2} y2="50%"
                                stroke="rgba(139,92,246,0.3)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.25 }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {STAGES.map((stage, i) => (
                    <motion.div
                        key={stage.label}
                        custom={i}
                        variants={nodeVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="relative z-10 flex flex-col items-center gap-2"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-950/60">
                            <span className="font-mono text-xs font-bold text-violet-400">
                                {stage.icon}
                            </span>
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500">
                            {stage.label}
                        </span>

                        {/* Active pulse on node */}
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-1 rounded-full bg-violet-500/20 blur-sm"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: [0, 0.6, 0] } : {}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1.2 + i * 0.4,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
