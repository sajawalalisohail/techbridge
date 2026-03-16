"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── All project companies ─────────────────────────────── */
const CLIENTS = [
    "NextLex",
    "PrimeMark Apparel",
    "AliWali Trading Co.",
    "SignalOps",
    "SaaS Analytics Platform",
    "Buff Dudes",
    "Truck Adda",
    "StockPulse AI",
    "Tree Tracker Pro",
    "Muraqaba",
    "SwapFans",
    "FaceBloom",
    "Win the Day",
    "CoolingOnDemand",
    "TableTapp",
    "MallBuddy",
    "Aggadoo",
    "New Leaf",
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Component ──────────────────────────────────────────── */
export default function TrustedBy() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative overflow-hidden py-14 lg:py-20">
            {/* Top hairline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* Label */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-8 text-center font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
            >
                currently running our code
            </motion.p>

            {/* Marquee — edge-to-edge, no max-w constraint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="relative"
                style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                <div className="flex overflow-hidden">
                    <div className="tb-marquee-track flex shrink-0">
                        {[...CLIENTS, ...CLIENTS].map((name, i) => (
                            <div
                                key={`a-${i}`}
                                className="mx-3 shrink-0 rounded-xl border border-white/8 bg-white/[0.03] px-6 py-3.5 backdrop-blur-sm"
                            >
                                <span className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest text-white">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="tb-marquee-track flex shrink-0" aria-hidden="true">
                        {[...CLIENTS, ...CLIENTS].map((name, i) => (
                            <div
                                key={`b-${i}`}
                                className="mx-3 shrink-0 rounded-xl border border-white/8 bg-white/[0.03] px-6 py-3.5 backdrop-blur-sm"
                            >
                                <span className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest text-white">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
