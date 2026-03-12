"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const PLANS = [
    {
        name: "Basic",
        price: "$2,499",
        features: ["Landing page", "CMS integration", "SEO setup"],
    },
    {
        name: "Pro",
        price: "$7,999",
        features: ["Full web app", "Auth & payments", "API layer"],
    },
    {
        name: "Custom",
        price: "Custom",
        features: ["Enterprise arch", "AI workflows", "Dedicated team"],
    },
];

const TICKER_ITEMS = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "AWS", "Vercel", "PostgreSQL", "OpenAI", "Tailwind",
    "Docker", "Redis", "GraphQL", "Prisma",
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Main Export ────────────────────────────────────────── */
export default function PricingToggleMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [activeTab, setActiveTab] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    /* Auto-rotate tabs */
    const nextTab = useCallback(() => {
        setActiveTab((prev) => (prev + 1) % PLANS.length);
    }, []);

    useEffect(() => {
        if (!isInView || isHovered) return;
        const interval = setInterval(nextTab, 3000);
        return () => clearInterval(interval);
    }, [isInView, isHovered, nextTab]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/5 bg-black/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tab bar */}
            <div className="flex border-b border-white/5">
                {PLANS.map((plan, i) => (
                    <button
                        key={plan.name}
                        onClick={() => setActiveTab(i)}
                        className={`relative flex-1 px-3 py-2.5 text-[11px] font-medium transition-colors duration-300 ${activeTab === i ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                            }`}
                    >
                        {plan.name}
                        {activeTab === i && (
                            <motion.div
                                layoutId="pricing-tab"
                                className="absolute inset-x-0 bottom-0 h-px bg-violet-500"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="px-4 py-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, ease: EASE }}
                    >
                        <p className="mb-3 font-mono text-xl font-bold text-white">
                            {PLANS[activeTab].price}
                        </p>
                        <ul className="space-y-1.5">
                            {PLANS[activeTab].features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-[11px] text-zinc-500">
                                    <span className="h-1 w-1 rounded-full bg-violet-500/60" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Marquee ticker */}
            <div className="relative overflow-hidden border-t border-white/5 py-2">
                {/* Fade masks */}
                <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-black/80 to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-black/80 to-transparent" />

                <div className="flex animate-[tb-marquee-scroll_20s_linear_infinite] gap-4 whitespace-nowrap">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span
                            key={`${item}-${i}`}
                            className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-zinc-600"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
