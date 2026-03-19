"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUp } from "@/components/shared/headingAnimations";

/* ─── Animation helpers ──────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Comparison data ────────────────────────────────────────── */
const COMPARISON_ROWS = [
    {
        feature: "Monthly Cost",
        usEurope: "$10,000–$15,000",
        freelancer: "$4,000–$8,000",
        techbridge: "$4,000–$6,000",
    },
    {
        feature: "Vetting",
        usEurope: "You do it",
        freelancer: "Platform reviews",
        techbridge: "We vet & manage",
    },
    {
        feature: "Accountability",
        usEurope: "Direct",
        freelancer: "None",
        techbridge: "Full replacement guarantee",
    },
    {
        feature: "Architecture Oversight",
        usEurope: "You provide",
        freelancer: "None",
        techbridge: "Included (US-based)",
    },
    {
        feature: "Communication",
        usEurope: "Direct",
        freelancer: "Variable",
        techbridge: "Dedicated Slack + weekly reports",
    },
    {
        feature: "Ramp-up Time",
        usEurope: "2–4 weeks",
        freelancer: "1–2 weeks",
        techbridge: "48 hours",
    },
];

const BULLET_POINTS = [
    "Senior engineers vetted and managed by our US-based architecture team",
    "If an engineer underperforms, we replace them — no questions, no delays",
    "Full transparency: weekly reports, direct Slack access, shared repos",
];

/* ─── Main component ─────────────────────────────────────────── */
export default function CostAdvantage() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32"
        >
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 0% 50%, rgba(var(--brand-accent-rgb), 0.04) 0%, transparent 60%)",
                }}
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">

                    {/* LEFT — Copy */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex flex-col justify-center"
                    >
                        <motion.span
                            variants={childFade}
                            className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            the real advantage
                        </motion.span>

                        <motion.h2
                            variants={childFade}
                            className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            Same Engineers.{" "}
                            <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                                Half the Price.
                            </span>{" "}
                            Zero Compromise.
                        </motion.h2>

                        <motion.p variants={childFade} className="mt-5 text-base leading-relaxed text-zinc-400">
                            US and European companies pay $10,000–$15,000/month for a senior AI or full-stack engineer.
                            Our Pakistan-based team delivers the same caliber of work — same code reviews, same
                            architecture standards, same Slack availability — starting at $4,000–$6,000/month. The
                            savings are real. The quality is audited by our West Virginia leadership.
                        </motion.p>

                        <motion.ul variants={childFade} className="mt-8 space-y-3">
                            {BULLET_POINTS.map((point) => (
                                <li key={point} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/10">
                                        <Check size={11} className="text-brand-accent-light" />
                                    </span>
                                    <span className="text-sm leading-relaxed text-zinc-400">{point}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div variants={childFade} className="mt-10">
                            <Link
                                href="/staff-augmentation"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-accent-light transition-colors duration-200 hover:text-white"
                            >
                                See How It Works
                                <ArrowRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Comparison table */}
                    <motion.div
                        variants={fadeUp(0.15)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="overflow-x-auto rounded-2xl border border-white/8"
                    >
                        <table className="w-full min-w-[480px] text-sm">
                            <thead>
                                <tr className="border-b border-white/8 bg-white/[0.02]">
                                    <th className="py-3.5 pl-5 pr-3 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        Feature
                                    </th>
                                    <th className="px-3 py-3.5 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        US / Europe
                                    </th>
                                    <th className="px-3 py-3.5 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        Freelancer
                                    </th>
                                    <th className="px-3 py-3.5 pr-5 text-left font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent">
                                        TechBridge ✓
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={row.feature} className={i === 0 ? "bg-brand-accent/[0.04]" : ""}>
                                        <td className="py-3.5 pl-5 pr-3 font-medium text-zinc-300 text-xs">
                                            {row.feature}
                                        </td>
                                        <td className="px-3 py-3.5 text-xs text-zinc-500">{row.usEurope}</td>
                                        <td className="px-3 py-3.5 text-xs text-zinc-500">{row.freelancer}</td>
                                        <td className="px-3 py-3.5 pr-5 text-xs font-semibold text-brand-accent-light">
                                            {row.techbridge}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
