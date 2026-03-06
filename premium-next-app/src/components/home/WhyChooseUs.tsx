"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrainCircuit, Users, Rocket, Shield } from "lucide-react";

/* ─── Keyframe for the shifting gradient mesh ───────────── */
const gradientStyle = `
  @keyframes mesh-drift {
    0%   { transform: translate(0%, 0%)    scale(1); }
    33%  { transform: translate(6%, -8%)   scale(1.08); }
    66%  { transform: translate(-5%, 5%)   scale(0.96); }
    100% { transform: translate(0%, 0%)    scale(1); }
  }
  @keyframes mesh-drift-b {
    0%   { transform: translate(0%, 0%)    scale(1); }
    33%  { transform: translate(-7%, 5%)   scale(1.06); }
    66%  { transform: translate(4%, -6%)   scale(0.97); }
    100% { transform: translate(0%, 0%)    scale(1); }
  }
  .mesh-orb-a { animation: mesh-drift   9s ease-in-out infinite; }
  .mesh-orb-b { animation: mesh-drift-b 11s ease-in-out infinite; }
`;

/* ─── Data ───────────────────────────────────────────────── */
interface Advantage {
    icon: React.ElementType;
    eyebrow: string;
    title: string;
    description: string;
    detail: string; // Bold pull-quote / differentiator
    accentA: string; // Orb A color
    accentB: string; // Orb B color
}

const ADVANTAGES: Advantage[] = [
    {
        icon: BrainCircuit,
        eyebrow: "Modern Stack",
        title: "AI-Native Engineering",
        description:
            "We don't bolt AI on at the end. Every system we build is designed from the ground up with modern AI stacks, intelligent automation, and machine-readable APIs — so your business can compound its advantage over time.",
        detail: "Built with AI from line one.",
        accentA: "rgba(139,92,246,0.18)",
        accentB: "rgba(99,102,241,0.12)",
    },
    {
        icon: Users,
        eyebrow: "Direct Access",
        title: "Zero Bloat. Senior Engineers Only.",
        description:
            "No layers of account managers, no offshore handoffs, no junior devs flying blind. You work directly with senior engineers who own the outcome — meaning faster decisions and zero information loss.",
        detail: "You talk to the builder.",
        accentA: "rgba(99,102,241,0.15)",
        accentB: "rgba(167,139,250,0.10)",
    },
    {
        icon: Rocket,
        eyebrow: "Velocity",
        title: "Rapid Execution",
        description:
            "Speed is a competitive moat, not a luxury. We ship MVPs in weeks, premium web presences in 24 hours, and maintain that velocity through every phase — without sacrificing engineering quality.",
        detail: "Production-ready in days.",
        accentA: "rgba(167,139,250,0.16)",
        accentB: "rgba(99,102,241,0.12)",
    },
    {
        icon: Shield,
        eyebrow: "Resilience",
        title: "Enterprise-Grade Foundations",
        description:
            "Every system is architected for scale, security, and observability from the start. We write the kind of code that survives your Series B — not a re-write every 18 months.",
        detail: "Built to handle your growth.",
        accentA: "rgba(109,40,217,0.15)",
        accentB: "rgba(139,92,246,0.10)",
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
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ─── Advantage Card ─────────────────────────────────────── */
function AdvantageCard({ item }: { item: Advantage }) {
    const Icon = item.icon;

    return (
        <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15 lg:p-10"
        >
            {/* ── Gradient mesh — always mounted, fades in on hover ── */}
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

            {/* Edge accent line — top */}
            <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-violet-500/60 to-transparent transition-all duration-700 group-hover:w-full"
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400">
                    <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">
                    {item.eyebrow}
                </p>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400 lg:text-base">
                    {item.description}
                </p>

                {/* Pull-quote differentiator */}
                <div className="mt-8 flex items-center gap-3 border-t border-white/5 pt-6">
                    <span className="h-px w-5 flex-shrink-0 bg-violet-500/60" />
                    <p className="text-sm font-semibold text-zinc-300 transition-colors duration-300 group-hover:text-white">
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
            {/* Inject keyframe CSS */}
            <style dangerouslySetInnerHTML={{ __html: gradientStyle }} />

            <section
                id="why-choose-us"
                ref={ref}
                className="relative overflow-hidden bg-black py-28 lg:py-36"
            >
                {/* Top separator */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* Ambient center glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-violet-950/20 blur-[140px]"
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    {/* ── Section Header ── */}
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 lg:mb-20"
                    >
                        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-px w-6 bg-zinc-700" />
                            The TechBridge Advantage
                        </span>
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                                We don&apos;t just write code.{" "}
                                <span className="bg-gradient-to-br from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                    We build leverage.
                                </span>
                            </h2>
                            <p className="max-w-sm text-base leading-relaxed text-zinc-500 lg:text-right">
                                Four principles that separate precision engineering
                                from expensive mediocrity.
                            </p>
                        </div>
                    </motion.div>

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
