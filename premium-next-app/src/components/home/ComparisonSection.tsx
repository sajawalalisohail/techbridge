"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ComparisonRow {
    feature: string;
    values: [string, string, string];
}

const ROWS: ComparisonRow[] = [
    { feature: "Monthly Cost", values: ["$10,000-$15,000", "$4,000-$8,000", "$4,000-$6,000"] },
    { feature: "Vetting", values: ["You do it", "Platform reviews", "We vet and manage"] },
    { feature: "Accountability", values: ["Direct", "None", "Full replacement guarantee"] },
    { feature: "Architecture Oversight", values: ["You provide", "None", "Included (US-based)"] },
    { feature: "Communication", values: ["Direct", "Variable", "Dedicated Slack + weekly reports"] },
    { feature: "Ramp-up Time", values: ["2-4 weeks", "1-2 weeks", "48 hours"] },
];

const COLUMN_HEADERS = ["US / Europe", "Freelancer", "TechBridge"];

const BULLET_POINTS = [
    "Senior engineers working inside a TechBridge-managed global engineering office",
    "Replacement coverage if the fit slips, without restarting the whole search",
    "Direct repo and Slack access so execution stays transparent and fast",
];

const PROOF_POINTS = [
    { label: "Talent lane", value: "Senior only" },
    { label: "Placement window", value: "48 hrs" },
    { label: "Management model", value: "Global office" },
];

const ENGINEER_COUNTS = [1, 2, 3, 5, 10] as const;
const COST_PER_TB = 5000;
const COST_PER_US = 12500;

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const rowFadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SavingsCalculator() {
    const [count, setCount] = useState<number>(2);
    const tbCost = count * COST_PER_TB;
    const usCost = count * COST_PER_US;
    const savings = usCost - tbCost;

    return (
        <div className="mt-10 rounded-2xl border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm lg:p-8">
            <p className="mb-5 text-sm font-semibold text-white">How many engineers do you need?</p>

            <div role="radiogroup" aria-label="Number of engineers" className="mb-6 flex flex-wrap gap-2">
                {ENGINEER_COUNTS.map((value) => (
                    <button
                        key={value}
                        role="radio"
                        aria-checked={value === count}
                        onClick={() => setCount(value)}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                            value === count
                                ? "bg-white text-black"
                                : "border border-zinc-700 text-zinc-400 hover:text-zinc-300"
                        }`}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <div aria-live="polite" className="text-sm leading-relaxed text-zinc-400">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="block"
                    >
                        With TechBridge:{" "}
                        <span className="font-semibold text-white">${tbCost.toLocaleString()}/mo</span>
                        {" "}vs. US hiring:{" "}
                        <span className="font-semibold text-white">${usCost.toLocaleString()}/mo</span>
                        {" - "}
                        <span className="font-bold text-brand-accent-light">
                            You save ${savings.toLocaleString()}/mo
                        </span>
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function ComparisonSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
    const isGridInView = useInView(sectionRef, { once: true, margin: "-40px" });

    return (
        <section
            ref={sectionRef}
            aria-label="Cost comparison"
            className="relative overflow-hidden py-24 lg:py-32"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[40%_1fr] lg:gap-16">
                    <div ref={headerRef} className="lg:self-center lg:-translate-y-6">
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                        >
                            <motion.span
                                variants={fadeUp}
                                className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                                <span className="h-px w-4 bg-brand-accent/40" />
                                the real advantage
                            </motion.span>

                            <motion.h2
                                variants={slideFromLeftContainer}
                                initial="hidden"
                                animate={isHeaderInView ? "show" : "hidden"}
                                className="mb-4 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                                style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                            >
                                {splitWords("Same Engineers.").map((word, index) => (
                                    <motion.span key={`w1-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={slideFromLeftItem}
                                    className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                                >
                                    Half the Price.
                                </motion.span>
                                {splitWords("Zero Compromise.").map((word, index) => (
                                    <motion.span key={`w2-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h2>

                            <motion.p variants={fadeUp} className="mb-8 max-w-lg text-sm leading-relaxed text-zinc-400 lg:text-base">
                                US and European teams often pay top-market rates without getting a
                                tighter execution lane. TechBridge pairs a global engineering office
                                with US-led architecture oversight so the buying model stays lean
                                without ever feeling like a handoff.
                            </motion.p>

                            <motion.ul variants={stagger} className="mb-8 space-y-3">
                                {BULLET_POINTS.map((point) => (
                                    <motion.li
                                        key={point}
                                        variants={fadeUp}
                                        className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400"
                                    >
                                        <Check
                                            size={16}
                                            strokeWidth={2.5}
                                            className="mt-0.5 flex-shrink-0 text-brand-accent-light"
                                        />
                                        <span>{point}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div variants={stagger} className="mb-8 grid gap-3 sm:grid-cols-3">
                                {PROOF_POINTS.map((point) => (
                                    <motion.div
                                        key={point.label}
                                        variants={fadeUp}
                                        className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                                    >
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                                            {point.label}
                                        </p>
                                        <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">
                                            {point.value}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div variants={fadeUp}>
                                <Link
                                    href="/staff-augmentation"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-brand-accent-light transition-colors duration-200 hover:text-white"
                                >
                                    See the talent model
                                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div>
                        <div className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="min-w-[640px]">
                                <div className="mb-3 grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2">
                                    <div />
                                    {COLUMN_HEADERS.map((header, index) => (
                                        <div
                                            key={header}
                                            className={`rounded-xl px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest ${
                                                index === 2
                                                    ? "border border-brand-accent/30 bg-brand-accent/[0.06] text-brand-accent-light"
                                                    : "text-zinc-500"
                                            }`}
                                        >
                                            {header}
                                        </div>
                                    ))}
                                </div>

                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    animate={isGridInView ? "show" : "hidden"}
                                    className="space-y-2"
                                >
                                    {ROWS.map((row) => (
                                        <motion.div
                                            key={row.feature}
                                            variants={rowFadeUp}
                                            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2"
                                        >
                                            <div className="flex items-center rounded-xl bg-white/[0.02] px-4 py-3.5 text-sm font-medium text-zinc-300">
                                                {row.feature}
                                            </div>
                                            {row.values.map((value, index) => (
                                                <div
                                                    key={`${row.feature}-${index}`}
                                                    className={`flex items-center justify-center rounded-xl px-3 py-3.5 text-center text-sm ${
                                                        index === 2
                                                            ? "border border-brand-accent/20 bg-brand-accent/[0.04] font-medium text-white"
                                                            : "bg-white/[0.02] text-zinc-500"
                                                    }`}
                                                >
                                                    {value}
                                                </div>
                                            ))}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        <SavingsCalculator />
                    </div>
                </div>
            </div>
        </section>
    );
}
