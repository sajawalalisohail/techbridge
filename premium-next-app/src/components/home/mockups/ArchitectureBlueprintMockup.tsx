"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const GRID_SIZE = 5;
const NODES = [
    { id: "client", x: 1, y: 3, label: "Client Apps" },
    { id: "api", x: 3, y: 1, label: "API Gateway" },
    { id: "db", x: 5, y: 3, label: "Core Database" },
    { id: "auth", x: 3, y: 5, label: "Auth Service" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ArchitectureBlueprintMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    // Helper to calculate percentage positions based on grid
    const getPos = (val: number) => `${((val - 1) / (GRID_SIZE - 1)) * 100}%`;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative h-64 w-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] p-4 lg:h-72"
        >
            {/* Background grid lines */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: "25% 25%",
                    backgroundPosition: "center center",
                }}
            />

            {/* Scanning Laser Effect */}
            <motion.div
                className="absolute inset-y-0 left-0 z-10 w-px bg-brand-accent shadow-[0_0_15px_2px_rgba(var(--brand-accent-rgb), 0.6)]"
                initial={{ x: "-100%", opacity: 0 }}
                animate={isInView ? { x: ["-100%", "500%"], opacity: [0, 1, 1, 0] } : {}}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 1.5,
                }}
            />

            <div className="relative z-20 h-full w-full">
                {/* SVG Connections drawing in */}
                <svg className="absolute inset-0 h-full w-full overflow-visible">
                    <defs>
                        <linearGradient id="blueprint-line" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgb(var(--brand-accent-rgb))" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="rgb(var(--brand-accent-light-rgb))" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    {/* Path from Client to API */}
                    <motion.path
                        d={`M25% 50% L50% 12.5%`}
                        stroke="url(#blueprint-line)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                    />

                    {/* Path from API to DB */}
                    <motion.path
                        d={`M50% 12.5% L75% 50%`}
                        stroke="url(#blueprint-line)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: EASE, delay: 0.8 }}
                    />

                    {/* Path from API to Auth */}
                    <motion.path
                        d={`M50% 12.5% L50% 87.5%`}
                        stroke="url(#blueprint-line)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
                    />
                </svg>

                {/* Nodes appearing */}
                {NODES.map((node, i) => (
                    <motion.div
                        key={node.id}
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                            left: getPos(node.x),
                            top: getPos(node.y),
                            transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, ease: "backOut", delay: i * 0.2 + 0.3 }}
                    >
                        {/* Node circle */}
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-brand-accent/50 bg-brand-accent-deep/50 shadow-[0_0_10px_rgba(var(--brand-accent-rgb), 0.3)] backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-brand-accent-light" />
                            {/* Pulse ring */}
                            <motion.div
                                className="absolute inset-0 rounded-lg border border-brand-accent-light/50"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeOut",
                                }}
                            />
                        </div>
                        {/* Label */}
                        <div className="mt-2 text-center text-[10px] font-medium text-zinc-400">
                            {node.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

