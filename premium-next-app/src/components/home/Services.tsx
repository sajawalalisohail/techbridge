"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    Code2,
    BrainCircuit,
    LayoutDashboard,
    Layers,
    GitMerge,
    Zap,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
import type { LucideIcon } from "lucide-react";

interface ServiceCard {
    id: number;
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    colSpan?: string; // Tailwind col-span class
    highlight?: boolean; // special accent treatment
    accentColor: string; // radial glow color on hover
    href?: string; // target link for the whole card
}

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES: ServiceCard[] = [
    {
        id: 1,
        icon: Code2,
        eyebrow: "Foundation",
        title: "Custom Software Development",
        description:
            "Scalable, enterprise-grade architectures built to evolve with your business. From distributed systems to elegant monoliths - engineered right the first time.",
        colSpan: "md:col-span-2",
        accentColor: "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 100%)",
        href: "/services#custom-software",
    },
    {
        id: 2,
        icon: BrainCircuit,
        eyebrow: "Intelligence",
        title: "AI Workflow Automation",
        description:
            "Intelligent systems that identify, replace, and continuously improve manual processes - freeing your team to focus on what only humans can do.",
        colSpan: "md:col-span-2",
        accentColor: "radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.09) 0%, rgba(99,102,241,0) 100%)",
        href: "/services#ai-automation",
    },
    {
        id: 3,
        icon: LayoutDashboard,
        eyebrow: "Operations",
        title: "Internal Business Tools",
        description:
            "Custom dashboards, CRMs, and operational platforms that give your team real-time visibility and control.",
        accentColor: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0) 100%)",
        href: "/services#internal-tools",
    },
    {
        id: 4,
        icon: Layers,
        eyebrow: "Products",
        title: "SaaS Platform Development",
        description:
            "End-to-end product development - from architecture and auth to billing and beyond. Built to scale from day one.",
        accentColor: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0) 100%)",
        href: "/services#saas-platforms",
    },
    {
        id: 5,
        icon: GitMerge,
        eyebrow: "Integration",
        title: "API Integrations & Data Pipelines",
        description:
            "Connect your existing tools and data sources into a unified, reliable ecosystem that flows without friction.",
        accentColor: "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0) 100%)",
        href: "/services#api-integrations",
    },
    {
        id: 6,
        icon: Zap,
        eyebrow: "Speed",
        title: "24-Hour Rapid Deploy Websites",
        description:
            "Premium web presence, delivered in a day. Performance-first, conversion-optimized, and polished to perfection - without the wait.",
        highlight: true,
        accentColor: "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.11) 0%, rgba(167,139,250,0) 100%)",
        href: "/websites",
    },
];

/* ─── Animation variants ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

/* ─── Sub-components ─────────────────────────────────────── */
function ServiceCardItem({ card }: { card: ServiceCard }) {
    const Icon = card.icon;

    return (
        <motion.div
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl border bg-neutral-900/50 p-7 backdrop-blur-sm transition-all duration-500 lg:p-8 ${card.colSpan ?? ""} ${card.highlight
                ? "border-violet-500/30 shadow-[0_0_0_1px_rgba(139,92,246,0.15)]"
                : "border-white/8 hover:border-white/15"
                }`}
        >

            {/* Radial glow — appears on hover */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: card.accentColor }}
            />

            {/* Highlight card: permanent subtle glow */}
            {card.highlight && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{ background: card.accentColor }}
                />
            )}

            {/* Top-right corner accent line for highlight card */}
            {card.highlight && (
                <div className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-violet-400/60 to-transparent" />
            )}

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${card.highlight
                        ? "border-violet-500/40 bg-violet-950/60 text-violet-400"
                        : "border-white/10 bg-white/5 text-zinc-400 group-hover:border-white/20 group-hover:text-white"
                        }`}
                >
                    <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p
                    className={`mb-2 font-mono text-xs font-semibold uppercase tracking-widest ${card.highlight ? "text-violet-400" : "text-zinc-600"
                        }`}
                >
                    {card.eyebrow}
                </p>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold leading-snug text-white lg:text-xl">
                    {card.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                    {card.description}
                </p>

                {card.href ? (
                    <Link
                        href={card.href}
                        aria-label={`Learn more about ${card.title}`}
                        className={`mt-6 inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-sm before:absolute before:inset-0 before:z-20 ${card.highlight ? "text-violet-400" : "text-zinc-600 group-hover:text-white"
                            }`}
                    >
                        <span>Learn more</span>
                        <svg
                            className="h-3 w-3 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                ) : (
                    <div
                        className={`mt-6 flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 ${card.highlight
                            ? "text-violet-400"
                            : "text-zinc-600 group-hover:text-white"
                            }`}
                    >
                        <span>Learn more</span>
                        <svg
                            className="h-3 w-3 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Main export ────────────────────────────────────────── */
export default function Services() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="services"
            ref={ref}
            className="relative overflow-hidden py-32 lg:py-44"
        >
            {/* Section ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 100% 30%, rgba(139,92,246,0.03) 0%, rgba(139,92,246,0) 50%)" }}
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* ── Section Header ── */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    variants={headerVariants}
                    className="mb-16 max-w-3xl lg:mb-20"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-px w-6 bg-zinc-700" />
                        Our Capabilities
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                        Engineering the{" "}
                        <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                            Future
                        </span>{" "}
                        of Your Business
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl">
                        From intelligent automation to enterprise platforms - we build the systems that give your business an unfair competitive advantage.
                    </p>
                </motion.div>

                {/* ── Bento Grid ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
                >
                    {/* Row 1: two large cards spanning 2 cols each */}
                    {SERVICES.slice(0, 2).map((card) => (
                        <ServiceCardItem key={card.id} card={card} />
                    ))}

                    {/* Row 2: four standard cards */}
                    {SERVICES.slice(2).map((card) => (
                        <ServiceCardItem key={card.id} card={card} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
