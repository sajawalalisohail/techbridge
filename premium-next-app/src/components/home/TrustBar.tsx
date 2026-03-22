"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface MarqueeClient {
    name: string;
    metric?: string;
}

const CLIENTS: MarqueeClient[] = [
    { name: "NextLex", metric: "14 Days" },
    { name: "AliWali Trading Co.", metric: "24 Hours" },
    { name: "PrimeMark Apparel", metric: "12x" },
    { name: "Internal Ops", metric: "40%" },
    { name: "SaaS Analytics", metric: "5M+" },
    { name: "SignalOps", metric: "62%" },
    { name: "Buff Dudes" },
    { name: "Truck Adda" },
    { name: "StockPulse AI" },
    { name: "Muraqaba" },
    { name: "CoolingOnDemand" },
    { name: "TableTapp" },
];

export default function TrustBar() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <section
            ref={ref}
            aria-label="Trusted clients"
            className="relative overflow-hidden border-y border-white/5 py-12 lg:py-16"
        >
            {/* Centered eyebrow */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-8 text-center font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
            >
                currently running our code
            </motion.p>

            {/* Marquee */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="relative"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                <div className="flex overflow-hidden">
                    <div className="tb-marquee-track flex shrink-0 items-center gap-12 lg:gap-16">
                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                            <div
                                key={`a-${i}`}
                                className="whitespace-nowrap text-base font-semibold text-zinc-600 sm:text-lg"
                            >
                                <span>{client.name}</span>
                                {client.metric ? (
                                    <span className="text-zinc-500"> {"\u00b7"} {client.metric}</span>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div
                        className="tb-marquee-track flex shrink-0 items-center gap-12 lg:gap-16"
                        aria-hidden="true"
                    >
                        {[...CLIENTS, ...CLIENTS].map((client, i) => (
                            <div
                                key={`b-${i}`}
                                className="whitespace-nowrap text-base font-semibold text-zinc-600 sm:text-lg"
                            >
                                <span>{client.name}</span>
                                {client.metric ? (
                                    <span className="text-zinc-500"> {"\u00b7"} {client.metric}</span>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Footer trust line */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="mt-8 text-center text-sm text-zinc-500"
            >
                Trusted by 50+ teams across SaaS, logistics, fitness, and legal tech.
            </motion.p>
        </section>
    );
}
