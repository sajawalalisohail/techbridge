"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrainCircuit, Users, Rocket, Shield, type LucideIcon } from "lucide-react";
import { blurFocusIn, fadeUp } from "@/components/shared/headingAnimations";
import {
    AINativeIllustration,
    ZeroBloatIllustration,
    VelocityIllustration,
    ResilienceIllustration
} from "./illustrations";

/* ─── Data ───────────────────────────────────────────────── */
interface Advantage {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    detail: string; // Bold pull-quote / differentiator
    accentA: string; // Orb A color
    accentB: string; // Orb B color
    Illustration: React.ComponentType;
}

const ADVANTAGES: Advantage[] = [
    {
        icon: BrainCircuit,
        eyebrow: "how we build",
        title: "AI From Line One",
        description:
            "We don't bolt AI on at the end. Every system we build ships with machine-readable APIs and automation hooks from day one. So you're not paying us again in six months to retrofit it.",
        detail: "Not bolted on later.",
        accentA: "rgba(139,92,246,0.18)",
        accentB: "rgba(99,102,241,0.12)",
        Illustration: AINativeIllustration,
    },
    {
        icon: Users,
        eyebrow: "who you work with",
        title: "No Middlemen. No Juniors.",
        description:
            "You talk to the person writing your code. Not a project manager who translates your requirements wrong, not a junior dev learning on your dime.",
        detail: "Slack the person writing your code.",
        accentA: "rgba(99,102,241,0.15)",
        accentB: "rgba(167,139,250,0.10)",
        Illustration: ZeroBloatIllustration,
    },
    {
        icon: Rocket,
        eyebrow: "speed",
        title: "We Ship Fast Because We're Good",
        description:
            "MVPs in weeks, websites in 24 hours. Not because we skip testing or write sloppy code. We've done this enough to know exactly where time gets wasted.",
        detail: "Weeks, not quarters.",
        accentA: "rgba(167,139,250,0.16)",
        accentB: "rgba(99,102,241,0.12)",
        Illustration: VelocityIllustration,
    },
    {
        icon: Shield,
        eyebrow: "longevity",
        title: "Code That Survives Your Series B",
        description:
            "Every system gets proper auth, monitoring, and test coverage from sprint one. We've seen too many startups hit growth then spend six months rewriting everything.",
        detail: "No rewrites in 18 months.",
        accentA: "rgba(109,40,217,0.15)",
        accentB: "rgba(139,92,246,0.10)",
        Illustration: ResilienceIllustration,
    },
];

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ─── Advantage Card ─────────────────────────────────────── */
function AdvantageCard({ item }: { item: Advantage }) {
    const Icon = item.icon;

    return (
        <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/40 hover:bg-violet-500/5 lg:p-10"
        >
            {/* ── Gradient mesh - always mounted, fades in on hover ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            >
                {/* Orb A */}
                <div
                    className="mesh-orb-a absolute -left-16 -top-16 h-64 w-64 rounded-full blur-[80px]"
                    style={{ background: item.accentA }}
                />
                {/* Orb B */}
                <div
                    className="mesh-orb-b absolute -bottom-16 -right-16 h-56 w-56 rounded-full blur-[70px]"
                    style={{ background: item.accentB }}
                />
            </div>

            {/* Edge accent line - top */}
            <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-violet-500/60 to-transparent transition-all duration-700 group-hover:w-full"
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-violet-500/5 group-hover:text-violet-300">
                    <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-violet-300">
                    {item.eyebrow}
                </p>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-violet-300 lg:text-base">
                    {item.description}
                </p>

                {/* Illustration Block */}
                <div className="mt-6 mb-2">
                    <item.Illustration />
                </div>

                {/* Pull-quote differentiator */}
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-6">
                    <span className="h-px w-5 flex-shrink-0 bg-violet-500/60" />
                    <p className="text-sm font-semibold text-zinc-300 transition-colors duration-300 group-hover:text-violet-300">
                        {item.detail}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function WhyChooseUs() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <>

            <section
                id="why-choose-us"
                ref={ref}
                className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24"
            >
                {/* Top separator */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* Ambient center glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(circle at 100% 50%, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0) 50%)" }}
                />

                <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                    {/* ── Section Header ── */}
                    <div
                        ref={headerRef}
                        className="mb-16 lg:mb-20"
                    >
                        <motion.span
                            variants={fadeUp()}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                            why us, honestly
                        </motion.span>
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <motion.h2
                                variants={blurFocusIn()}
                                initial="hidden"
                                animate={isHeaderInView ? "show" : "hidden"}
                                className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl"
                            >
                                Four reasons we&apos;re different.{" "}
                                <span className="bg-gradient-to-br from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                    Judge for yourself.
                                </span>
                            </motion.h2>
                            <motion.p
                            variants={fadeUp()}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="max-w-sm text-base leading-relaxed text-zinc-500 lg:text-right"
                            >
                                Every agency claims to be different. Here&apos;s what we actually do that most won&apos;t.
                            </motion.p>
                        </div>
                    </div>

                    {/* ── 2×2 Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
                    >
                        {ADVANTAGES.map((item) => (
                            <AdvantageCard key={item.title} item={item} />
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
