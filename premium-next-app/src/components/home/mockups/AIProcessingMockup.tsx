"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrainCircuit, Cpu, Zap, Merge } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AIProcessingMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-neutral-900/60 p-6 lg:h-72"
        >
            {/* Connection Lines to Core */}
            <svg className="absolute inset-0 h-full w-full">
                <motion.line
                    x1="20%" y1="50%" x2="45%" y2="50%"
                    stroke="rgba(167,139,250,0.3)" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                />
                <motion.line
                    x1="55%" y1="50%" x2="80%" y2="25%"
                    stroke="rgba(167,139,250,0.3)" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                />
                <motion.line
                    x1="55%" y1="50%" x2="80%" y2="75%"
                    stroke="rgba(167,139,250,0.3)" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                />
            </svg>

            {/* Incoming Data Packets */}
            <motion.div
                className="absolute left-[20%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.8)]"
                initial={{ opacity: 0, x: "-50%" }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: ["-50%", "250%"],
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Central AI Core */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/40 bg-violet-950/80 shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-md">
                <BrainCircuit className="text-violet-400" size={28} />

                {/* Core Pulse */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border border-violet-400"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            </div>

            {/* Output Packets (Transforming to Violet) */}
            <motion.div
                className="absolute left-[55%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, 60],
                    y: [0, -40],
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1, // Start after input packet hits core
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute left-[55%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, 60],
                    y: [0, 40],
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5,
                    ease: "linear",
                }}
            />

            {/* Output Nodes */}
            <motion.div
                className="absolute right-[15%] top-[15%] flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
            >
                <Cpu size={14} className="text-violet-400" />
                <span className="text-[9px] font-medium text-zinc-300">LLM Engine</span>
            </motion.div>

            <motion.div
                className="absolute bottom-[15%] right-[15%] flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1, duration: 0.5, ease: EASE }}
            >
                <Merge size={14} className="text-indigo-400" />
                <span className="text-[9px] font-medium text-zinc-300">Auto-Routing</span>
            </motion.div>

        </motion.div>
    );
}
