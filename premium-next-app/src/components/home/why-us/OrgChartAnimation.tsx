"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Node {
    label: string;
    x: number;
}

const FULL_CHAIN: Node[] = [
    { label: "YOU", x: 30 },
    { label: "PM", x: 110 },
    { label: "LEAD", x: 190 },
    { label: "DEV", x: 270 },
];

const SIMPLIFIED: Node[] = [
    { label: "YOU", x: 70 },
    { label: "DEV", x: 230 },
];

export default function OrgChartAnimation({ isInView }: { isInView: boolean }) {
    const [simplified, setSimplified] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        const timer = setTimeout(() => setSimplified(true), 1600);
        return () => clearTimeout(timer);
    }, [isInView]);

    const nodes = simplified ? SIMPLIFIED : FULL_CHAIN;

    return (
        <div aria-hidden="true" className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <svg viewBox="0 0 300 60" className="w-full" style={{ maxWidth: 320 }}>
                {/* Connecting line */}
                <motion.line
                    x1={nodes[0].x}
                    y1={30}
                    x2={nodes[nodes.length - 1].x}
                    y2={30}
                    stroke="url(#orgGrad)"
                    strokeWidth={2}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                />

                <defs>
                    <linearGradient id="orgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand-accent)" />
                        <stop offset="100%" stopColor="var(--brand-accent-light)" />
                    </linearGradient>
                </defs>

                {/* Nodes */}
                <AnimatePresence mode="popLayout">
                    {nodes.map((node) => (
                        <motion.g
                            key={node.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, x: node.x }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                        >
                            <circle
                                cx={0}
                                cy={30}
                                r={16}
                                fill="rgba(var(--brand-accent-rgb), 0.1)"
                                stroke="var(--brand-accent-light)"
                                strokeWidth={1.5}
                            />
                            <text
                                x={0}
                                y={34}
                                textAnchor="middle"
                                className="fill-white text-[9px] font-bold"
                            >
                                {node.label}
                            </text>
                        </motion.g>
                    ))}
                </AnimatePresence>
            </svg>

            {/* Supporting text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: simplified ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-3 text-center text-xs font-medium text-zinc-500"
            >
                Slack the person writing your code.
            </motion.p>
        </div>
    );
}
