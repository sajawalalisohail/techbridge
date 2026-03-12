"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "@/components/shared/CountUp";

/* ─── Data ───────────────────────────────────────────────── */
const BARS = [
    { label: "Q1", height: "60%", value: 24 },
    { label: "Q2", height: "85%", value: 38 },
    { label: "Q3", height: "45%", value: 18 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Main Export ────────────────────────────────────────── */
export default function DashboardMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/5 bg-black/30"
        >
            {/* Top bar */}
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-[10px] text-zinc-600">dashboard.tsx</span>
            </div>

            {/* Chart area */}
            <div className="flex items-end justify-center gap-4 px-6 pb-4 pt-6 lg:gap-6 lg:px-8">
                {BARS.map((bar, i) => (
                    <div key={bar.label} className="flex flex-col items-center gap-2">
                        {/* Value */}
                        <span className="font-mono text-xs font-medium text-zinc-400">
                            <CountUp value={bar.value} suffix="K" duration={1} className="" />
                        </span>
                        {/* Bar container */}
                        <div className="relative h-20 w-8 overflow-hidden rounded-t-sm lg:h-28 lg:w-10">
                            <motion.div
                                className="absolute inset-x-0 bottom-0 rounded-t-sm bg-gradient-to-t from-violet-600 to-indigo-500"
                                style={{ height: bar.height, transformOrigin: "bottom" }}
                                initial={{ scaleY: 0 }}
                                animate={isInView ? { scaleY: 1 } : {}}
                                transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
                            />
                        </div>
                        {/* Label */}
                        <span className="text-[10px] font-medium text-zinc-600">{bar.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
