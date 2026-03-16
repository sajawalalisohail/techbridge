"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/shared/CountUp";

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Main Export ────────────────────────────────────────── */
export default function MetricCounterMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/5 bg-black/30 px-6 py-8"
        >
            <CountUp
                value={15}
                prefix="+"
                suffix="%"
                duration={1.5}
                className="font-mono text-4xl font-bold text-white lg:text-5xl"
            />
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Monthly Growth
            </span>

            {/* Sparkline */}
            <svg viewBox="0 0 120 40" className="mt-2 h-8 w-24 lg:h-10 lg:w-32">
                <defs>
                    <linearGradient id="sparkline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(var(--brand-accent-dark-rgb))" stopOpacity="0.28" />
                        <stop offset="55%" stopColor="rgb(var(--brand-accent-rgb))" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="rgb(var(--brand-accent-light-rgb))" stopOpacity="0.95" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 0 35 Q 20 30, 30 28 T 50 22 T 70 18 T 90 10 T 120 5"
                    fill="none"
                    stroke="url(#sparkline-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
                />
            </svg>
        </motion.div>
    );
}
