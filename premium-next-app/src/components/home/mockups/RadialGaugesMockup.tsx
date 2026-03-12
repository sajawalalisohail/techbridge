"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "@/components/shared/CountUp";

/* ─── Data ───────────────────────────────────────────────── */
const GAUGES = [
    { label: "Speed", value: 95, color: "from-violet-500 to-indigo-500" },
    { label: "Security", value: 99, color: "from-indigo-500 to-violet-500" },
    { label: "Accuracy", value: 97, color: "from-violet-400 to-indigo-400" },
];

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Sub-components ─────────────────────────────────────── */
function Gauge({ label, value, delay }: { label: string; value: number; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const target = CIRCUMFERENCE * (1 - value / 100);

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 120 120" className="h-20 w-20 lg:h-24 lg:w-24">
                <defs>
                    <linearGradient id={`gauge-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(139,92,246)" />
                        <stop offset="100%" stopColor="rgb(99,102,241)" />
                    </linearGradient>
                </defs>
                {/* Background track */}
                <circle
                    cx="60" cy="60" r={RADIUS}
                    strokeWidth="6"
                    stroke="rgba(255,255,255,0.06)"
                    fill="none"
                />
                {/* Progress arc */}
                <motion.circle
                    cx="60" cy="60" r={RADIUS}
                    strokeWidth="6"
                    stroke={`url(#gauge-${label})`}
                    fill="none"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    strokeDasharray={CIRCUMFERENCE}
                    initial={{ strokeDashoffset: CIRCUMFERENCE }}
                    animate={isInView ? { strokeDashoffset: target } : {}}
                    transition={{ duration: 1.2, ease: EASE, delay }}
                />
                {/* Center number */}
                <foreignObject x="20" y="38" width="80" height="44">
                    <div className="flex h-full items-center justify-center">
                        <CountUp
                            value={value}
                            suffix="%"
                            duration={1.2}
                            className="font-mono text-base font-bold text-white lg:text-lg"
                        />
                    </div>
                </foreignObject>
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                {label}
            </span>
        </div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function RadialGaugesMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center justify-center gap-6 rounded-xl border border-white/5 bg-black/30 px-5 py-6 lg:gap-8 lg:px-8 lg:py-8"
        >
            {GAUGES.map((g, i) => (
                <Gauge key={g.label} label={g.label} value={g.value} delay={i * 0.15} />
            ))}
        </motion.div>
    );
}
