"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const CLIENTS = [
    { name: "NextLex" },
    { name: "PrimeMark Apparel" },
    { name: "AliWali Trading Co." },
];

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── Component ──────────────────────────────────────────── */
export default function TrustedBy() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative overflow-hidden py-14 lg:py-20">
            {/* Top hairline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent"
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Leading text */}
                    <motion.p
                        variants={childVariants}
                        className="text-xs uppercase tracking-widest text-zinc-600"
                    >
                        currently running our code
                    </motion.p>

                    {/* Logo bar */}
                    <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                        {CLIENTS.map((client) => (
                            <motion.div
                                key={client.name}
                                variants={childVariants}
                                className="rounded-xl border border-white/8 bg-white/[0.03] px-6 py-3.5 backdrop-blur-sm"
                            >
                                <span className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                                    {client.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
