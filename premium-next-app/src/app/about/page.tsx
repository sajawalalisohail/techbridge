"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Users, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Ease constant (fixes TS Variants type error) ────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ─── Core Values ─────────────────────────────────────────── */
const VALUES = [
    {
        icon: Layers,
        title: "Architected for Scale",
        description:
            "No fragile code. Every system we deliver is built on enterprise-ready foundations — designed to be extended, audited, and scaled without a painful rewrite.",
    },
    {
        icon: Users,
        title: "Direct Access",
        description:
            "No layers of account managers. No offshore handoffs. You work directly with the senior engineers building your product, every step of the way.",
    },
    {
        icon: Zap,
        title: "Relentless Execution",
        description:
            "Speed is a competitive feature, not a luxury. We ship complex, production-ready systems faster than other agencies run their discovery calls.",
    },
];

/* ─── Decorative Glass Card (left column) ─────────────────── */
function FounderCard() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm h-full min-h-[480px] lg:min-h-[560px]">
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-violet-900/25 blur-[80px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-900/20 blur-[80px]" />
            <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.12" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-dots)" />
            </svg>
            <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-8 w-8 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80 blur-sm" />
                        <span className="relative h-4 w-4 rounded-full bg-white" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">TechBridge</span>
                </div>
                <div className="text-center">
                    <span className="block font-mono text-[120px] font-extrabold leading-none tracking-tighter text-white/[0.06] select-none">
                        TB
                    </span>
                    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-600">Engineering Firm</p>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                    {[
                        { value: "WV", label: "Headquarters" },
                        { value: "CS", label: "Discipline" },
                        { value: "B2B", label: "Focus" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span className="block font-mono text-2xl font-bold text-white/80">{stat.value}</span>
                            <span className="mt-1 block text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Leadership / Engineering Foundation section ─────────── */
function LeadershipSection({ isInView }: { isInView: boolean }) {
    return (
        <section className="py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                {/* Section label */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-14"
                >
                    <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-px w-6 bg-zinc-700" />
                        The Engineering Foundation
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        Who builds your systems.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left & Right - Hybrid Partnership Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Morgantown Founder Card */}
                        <motion.div
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 text-xs font-bold uppercase tracking-widest text-zinc-400 select-none">
                                    WV
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold tracking-tight text-white">Founder & Lead Designer</h3>
                            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                                WVU Computer Science alumnus leading business strategy, UI/UX architecture, and project orchestration from Morgantown, WV.
                            </p>
                            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-violet-500/10 blur-[40px] transition-all duration-500 group-hover:bg-violet-500/20" />
                        </motion.div>

                        {/* Pakistan Engineering Card */}
                        <motion.div
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 text-xs font-bold uppercase tracking-widest text-zinc-400 select-none">
                                    PK
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold tracking-tight text-white">Lead Engineering Cell (Pakistan)</h3>
                            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                                Specialized senior backend and full-stack developers handling large-scale enterprise builds under our direct architectural oversight.
                            </p>
                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-500/10 blur-[40px] transition-all duration-500 group-hover:bg-indigo-500/20" />
                        </motion.div>
                    </div>

                    {/* Bottom Bio / Intro */}
                    <motion.div
                        variants={fadeUp(0.3)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12"
                    >
                        <div className="flex-1">
                            <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                TechBridge operates as a hybrid engineering firm. Headquartered in Morgantown, WV, and powered by elite distributed engineering cells in Pakistan. This allows us to scale development output massively while maintaining pure computer science quality standards and rigorous US-based architecture oversight.
                            </p>
                        </div>
                        <div className="grid flex-1 grid-cols-2 gap-4">
                            {[
                                { label: "Discipline", value: "Computer Science" },
                                { label: "Scale", value: "Distributed Teams" },
                                { label: "Oversight", value: "WV Headquarters" },
                                { label: "Model", value: "Hybrid Precision" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{item.label}</p>
                                    <p className="mt-1 text-sm font-medium text-zinc-300">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);
    const storyRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const leaderRef = useRef<HTMLElement>(null);

    const isHeroInView = useInView(heroRef, { once: true });
    const isStoryInView = useInView(storyRef, { once: true, margin: "-80px" });
    const isValuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
    const isLeaderInView = useInView(leaderRef, { once: true, margin: "-80px" });

    return (
        <div className="bg-black">
            <div className="relative z-10">
                <Navbar />

                {/* ── Hero ── */}
                <section ref={heroRef} className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/5">
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-900/18 blur-[120px]" />
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
                        <motion.span variants={fadeUp(0)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-px w-6 bg-zinc-700" />
                            The TechBridge Ethos
                        </motion.span>
                        <motion.h1 variants={fadeUp(0.1)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                            Engineering as a discipline.{" "}
                            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Not an afterthought.
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp(0.22)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                            We believe in un-bloated architecture, rigorous computer science
                            fundamentals, and building systems that scale seamlessly — without
                            requiring a rewrite every 18 months.
                        </motion.p>
                    </div>
                </section>

                {/* ── Story ── */}
                <section ref={storyRef} className="relative py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                            <motion.div variants={fadeUp(0)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}>
                                <FounderCard />
                            </motion.div>
                            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}
                                className="flex flex-col justify-center">
                                <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Our Story</span>
                                <h2 className="mb-7 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
                                    Built from first principles.
                                </h2>
                                <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    Headquartered in Morgantown, West Virginia, TechBridge was
                                    founded on a pure computer science background to solve a
                                    critical gap in the B2B market: too many agencies focus on
                                    surface-level design while ignoring scalable architecture.
                                </p>
                                <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    We bring deep, rigorous software engineering to businesses that
                                    need their technology to be a lever — not a bottleneck. Every
                                    system we build is designed from the ground up for performance,
                                    security, and long-term maintainability.
                                </p>
                                <div className="mt-10 border-l-2 border-violet-500/60 pl-6">
                                    <p className="text-base font-medium italic text-zinc-300 lg:text-lg">
                                        "Technology should compound your advantage over time —
                                        not create technical debt that slows you down."
                                    </p>
                                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        — TechBridge Founding Principle
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── Leadership ── */}
                <section ref={leaderRef}>
                    <LeadershipSection isInView={isLeaderInView} />
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── Core Values ── */}
                <section ref={valuesRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="mb-16">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-px w-6 bg-zinc-700" />
                                Core Values
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                The principles we don&apos;t compromise on.
                            </h2>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isValuesInView ? "show" : "hidden"}
                            className="grid grid-cols-1 gap-5 md:grid-cols-3"
                        >
                            {VALUES.map((v) => {
                                const Icon = v.icon;
                                return (
                                    <motion.div key={v.title} variants={childFade}
                                        className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/60">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{v.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{v.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
