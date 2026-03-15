"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AINativeIllustration() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const nodes = [
        { cx: 50, cy: 30, r: 4 },
        { cx: 20, cy: 70, r: 6 },
        { cx: 80, cy: 60, r: 5 },
        { cx: 40, cy: 90, r: 3 },
    ];

    return (
        <div ref={ref} className="relative h-32 w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 my-4 flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/10 via-transparent to-transparent" />

            <svg viewBox="0 0 100 120" className="w-full h-full max-w-[150px]">
                {/* Connecting Lines */}
                <motion.line
                    x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[1].cx} y2={nodes[1].cy}
                    stroke="rgba(var(--brand-accent-rgb), 0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.line
                    x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[2].cx} y2={nodes[2].cy}
                    stroke="rgba(var(--brand-accent-rgb), 0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.line
                    x1={nodes[1].cx} y1={nodes[1].cy} x2={nodes[3].cx} y2={nodes[3].cy}
                    stroke="rgba(var(--brand-accent-rgb), 0.2)" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                />
                <motion.line
                    x1={nodes[2].cx} y1={nodes[2].cy} x2={nodes[3].cx} y2={nodes[3].cy}
                    stroke="rgba(var(--brand-accent-rgb), 0.2)" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
                />

                {/* Animated Data Pulses along lines */}
                {isInView && (
                    <>
                        <motion.circle r="1.5" fill="var(--brand-accent-light)"
                            animate={{
                                cx: [nodes[0].cx, nodes[1].cx],
                                cy: [nodes[0].cy, nodes[1].cy],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                        <motion.circle r="1.5" fill="var(--brand-accent-light)"
                            animate={{
                                cx: [nodes[0].cx, nodes[2].cx],
                                cy: [nodes[0].cy, nodes[2].cy],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                    </>
                )}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.g key={i}>
                        {/* Outer glow pulse */}
                        <motion.circle
                            cx={node.cx} cy={node.cy} r={node.r * 2.5}
                            fill="rgba(var(--brand-accent-rgb), 0.2)"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={isInView ? {
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.7, 0.3]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        {/* Solid core */}
                        <motion.circle
                            cx={node.cx} cy={node.cy} r={node.r}
                            fill="var(--brand-accent)"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ duration: 0.5, type: "spring", delay: 0.2 + (i * 0.1) }}
                        />
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}

