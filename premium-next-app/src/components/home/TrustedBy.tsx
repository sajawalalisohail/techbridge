"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

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
        <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
            {/* Top hairline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* Content */}
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Eyebrow */}
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    <span className="h-px w-4 bg-brand-accent/40" />
                    currently running our code
                </motion.span>

                {/* Heading */}
                <motion.h2
                    variants={slideFromLeftContainer}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-12 max-w-7xl text-left text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]"
                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "0 0.3em" }}
                >
                    {splitWords("Trusted by teams building").map((word, index) => (
                        <motion.span
                            key={`w1-${index}`}
                            variants={slideFromLeftItem}
                            style={{ display: "inline-block" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                    <motion.span
                        variants={slideFromLeftItem}
                        className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                    >
                        real
                    </motion.span>
                    {splitWords("products.").map((word, index) => (
                        <motion.span
                            key={`w2-${index}`}
                            variants={slideFromLeftItem}
                            style={{ display: "inline-block" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h2>
            </div>

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
                                className="mx-3 flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
                            >
                                {/* Logo placeholder */}
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                    <span className="text-[10px] font-bold uppercase text-white/40">
                                        {name.charAt(0)}
                                    </span>
                                </div>
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
                                className="mx-3 flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
                            >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                    <span className="text-[10px] font-bold uppercase text-white/40">
                                        {name.charAt(0)}
                                    </span>
                                </div>
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
