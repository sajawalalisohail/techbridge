"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const NODES = [
    { label: "Design", sub: "Figma" },
    { label: "Build", sub: "Next.js" },
    { label: "Ship", sub: "Vercel" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: EASE, delay: i * 0.2 },
    }),
};

/* ─── Main Export ────────────────────────────────────────── */
export default function WorkflowDiagramMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-black/30 px-4 py-6 lg:gap-5 lg:px-6"
        >
            {NODES.map((node, i) => (
                <div key={node.label} className="flex items-center gap-3 lg:gap-5">
                    {/* Node */}
                    <motion.div
                        custom={i}
                        variants={nodeVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-800/60 px-3 py-2.5"
                    >
                        <span className="text-xs font-semibold text-white">{node.label}</span>
                        <span className="text-[10px] text-zinc-500">{node.sub}</span>
                    </motion.div>

                    {/* Arrow connector */}
                    {i < NODES.length - 1 && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                            transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.25 }}
                            className="flex items-center"
                            style={{ transformOrigin: "left" }}
                        >
                            <div className="h-px w-6 bg-gradient-to-r from-lime-500/50 to-yellow-500/50 lg:w-10" />
                            <div className="h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-yellow-500/50" />
                        </motion.div>
                    )}
                </div>
            ))}

            {/* Animated data dot traveling along the path */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-[15%] h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(132,204,22,0.6)]"
                initial={{ opacity: 0 }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, 80, 160, 240],
                } : {}}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1.5,
                    ease: "linear",
                }}
            />
        </motion.div>
    );
}
