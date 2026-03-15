"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const NODES = [
    { label: "Source", x: 15, y: 50 },
    { label: "API", x: 50, y: 50 },
    { label: "Client", x: 85, y: 50 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function DataFlowMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-xl border border-white/5 bg-black/30 px-4 py-6"
        >
            <svg viewBox="0 0 200 80" className="h-auto w-full">
                <defs>
                    <linearGradient id="flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(var(--brand-accent-rgb))" stopOpacity="0.15" />
                        <stop offset="50%" stopColor="rgb(var(--brand-accent-rgb))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(var(--brand-accent-light-rgb))" stopOpacity="0.15" />
                    </linearGradient>
                </defs>

                {/* Connecting lines */}
                <motion.line
                    x1="38" y1="40" x2="82" y2="40"
                    stroke="url(#flow-line)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                />
                <motion.line
                    x1="118" y1="40" x2="152" y2="40"
                    stroke="url(#flow-line)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
                />

                {/* Nodes */}
                {NODES.map((node, i) => (
                    <g key={node.label}>
                        {/* Glow */}
                        <motion.circle
                            cx={node.x / 100 * 200} cy="40" r="18"
                            fill="rgba(var(--brand-accent-rgb), 0.08)"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, ease: EASE, delay: i * 0.2 }}
                        />
                        {/* Core circle */}
                        <motion.circle
                            cx={node.x / 100 * 200} cy="40" r="12"
                            fill="rgba(23,23,23,0.8)"
                            stroke="rgba(var(--brand-accent-rgb), 0.3)"
                            strokeWidth="1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, ease: EASE, delay: i * 0.2 }}
                        />
                        {/* Label */}
                        <motion.text
                            x={node.x / 100 * 200} y="68"
                            textAnchor="middle"
                            className="fill-zinc-500 font-mono text-[7px]"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                        >
                            {node.label}
                        </motion.text>
                        {/* Inner icon letter */}
                        <motion.text
                            x={node.x / 100 * 200} y="44"
                            textAnchor="middle"
                            className="fill-brand-accent-light font-mono text-[8px] font-bold"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                        >
                            {node.label[0]}
                        </motion.text>
                    </g>
                ))}

                {/* Animated data packets */}
                {[0, 1].map((line) => (
                    <motion.circle
                        key={`packet-${line}`}
                        r="2"
                        fill="rgb(var(--brand-accent-light-rgb))"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                            cx: line === 0 ? [38, 82] : [118, 152],
                            cy: [40, 40],
                            opacity: [0, 1, 1, 0],
                        } : {}}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 1.2 + line * 0.8,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    );
}

