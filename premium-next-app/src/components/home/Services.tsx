"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    BrainCircuit,
    Code2,
    Palette,
    Smartphone,
    Users,
    Wrench,
    Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

/* ─── Types ──────────────────────────────────────────────────── */
interface ServiceCard {
    id: number;
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    highlight?: boolean;
    accentColor: string;
    href?: string;
}

/* ─── Data ────────────────────────────────────────────────────── */
const SERVICES: ServiceCard[] = [
    {
        id: 1,
        icon: Code2,
        eyebrow: "core work",
        title: "Custom Software & SaaS",
        description:
            "Multi-tenant platforms, internal tools, and SaaS products. Architected so your next hire can actually understand the codebase.",
        accentColor: "radial-gradient(ellipse at 20% 50%, rgba(var(--brand-accent-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
        href: "/services#custom-software",
    },
    {
        id: 2,
        icon: Users,
        eyebrow: "your team, extended",
        title: "Dedicated Engineers",
        description:
            "Senior developers and AI engineers embedded in your team. Full-time, part-time, or project-based. Managed by us, accountable to you. If someone isn't performing, we replace them.",
        accentColor: "radial-gradient(ellipse at 80% 50%, rgba(var(--brand-accent-light-rgb), 0.09) 0%, rgba(var(--brand-accent-light-rgb), 0) 100%)",
        href: "/staff-augmentation",
    },
    {
        id: 3,
        icon: BrainCircuit,
        eyebrow: "growth engine",
        title: "AI Powered Lead Generation",
        description:
            "We build AI systems that find, qualify, and book sales calls on autopilot — so your team closes instead of chases.",
        accentColor: "radial-gradient(ellipse at 50% 0%, rgba(var(--brand-accent-rgb), 0.07) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
        href: "/services#ai-lead-generation",
    },
    {
        id: 4,
        icon: Zap,
        eyebrow: "fast lane",
        title: "24-Hour Websites",
        description:
            "A real website. Custom code, not a template. Deployed and live before you wake up tomorrow.",
        highlight: true,
        accentColor: "radial-gradient(ellipse at 50% 50%, rgba(var(--brand-accent-light-rgb), 0.11) 0%, rgba(var(--brand-accent-light-rgb), 0) 100%)",
        href: "/websites",
    },
    {
        id: 5,
        icon: Smartphone,
        eyebrow: "mobile",
        title: "Mobile Apps",
        description:
            "iOS and Android apps that don't crash, don't lag, and don't get uninstalled after the first session.",
        accentColor: "radial-gradient(ellipse at 20% 80%, rgba(var(--brand-accent-light-rgb), 0.08) 0%, rgba(var(--brand-accent-light-rgb), 0) 100%)",
        href: "/services#mobile-apps",
    },
    {
        id: 6,
        icon: Wrench,
        eyebrow: "internal tools",
        title: "Internal Tools & Integrations",
        description:
            "The admin panel, the reporting dashboard, the thing your team duct-taped together in Sheets. We build the real version.",
        accentColor: "radial-gradient(ellipse at 80% 80%, rgba(var(--brand-accent-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
        href: "/services#internal-tools",
    },
    {
        id: 7,
        icon: Palette,
        eyebrow: "design",
        title: "UI/UX & Brand Identity",
        description:
            "Design systems and brand work grounded in actual user research, not a mood board from Pinterest.",
        accentColor: "radial-gradient(ellipse at 50% 100%, rgba(var(--brand-accent-rgb), 0.07) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
        href: "/services#design-branding",
    },
];

/* ─── Animation variants ─────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Card component ─────────────────────────────────────────── */
function ServiceCardItem({ card }: { card: ServiceCard }) {
    const Icon = card.icon;

    return (
        <motion.div
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl border bg-[#06060c]/60 p-6 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:p-7 ${
                card.highlight
                    ? "border-brand-accent/40 shadow-[0_0_30px_rgba(var(--brand-accent-rgb),0.15)]"
                    : "border-white/10 hover:border-brand-accent/40 hover:shadow-[0_8px_32px_rgba(var(--brand-accent-rgb),0.08)]"
            }`}
        >
            {/* Radial glow on hover */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: card.accentColor }}
            />
            {/* Highlight card permanent glow */}
            {card.highlight && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{ background: card.accentColor }}
                />
            )}
            {card.highlight && (
                <div className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-brand-accent-light/60 to-transparent" />
            )}

            <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 ${
                        card.highlight
                            ? "border-brand-accent/40 bg-brand-accent-deep/60 text-brand-accent-light"
                            : "border-white/10 bg-white/5 text-zinc-400 group-hover:border-brand-accent/40 group-hover:text-brand-accent-light"
                    }`}
                >
                    <Icon size={18} strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p
                    className={`mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest ${
                        card.highlight ? "text-brand-accent-light" : "text-zinc-600"
                    }`}
                >
                    {card.eyebrow}
                </p>

                {/* Title */}
                <h3 className="mb-2.5 text-base font-semibold leading-snug text-white lg:text-lg">
                    {card.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                    {card.description}
                </p>

                {/* Learn more link */}
                {card.href && (
                    <Link
                        href={card.href}
                        aria-label={`Learn more about ${card.title}`}
                        className={`relative z-20 mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 before:absolute before:inset-0 ${
                            card.highlight
                                ? "text-brand-accent-light"
                                : "text-zinc-600 group-hover:text-brand-accent-light"
                        }`}
                    >
                        <span>Learn more</span>
                        <svg
                            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function Services() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="services"
            ref={ref}
            className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24"
        >
            {/* Section ambient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 100% 30%, rgba(var(--brand-accent-rgb), 0.03) 0%, rgba(var(--brand-accent-rgb), 0) 50%)" }}
            />

            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Section Header */}
                <div className="mb-14 lg:mb-18">
                    <motion.span
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        variants={fadeUp()}
                        className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        what we actually do
                    </motion.span>
                    <motion.h2
                        variants={slideFromLeftContainer}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl"
                        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                    >
                        {splitWords("Seven ways we").map((word, i) => (
                            <motion.span key={`w1-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            variants={slideFromLeftItem}
                            className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                        >
                            ship
                        </motion.span>
                        <motion.span variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                            for you.
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        variants={headerVariants}
                        className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-500 lg:text-lg"
                    >
                        No buzzword bingo. These are the seven ways we help startups and companies ship — whether you
                        need a full build or a senior engineer on your team tomorrow.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
                >
                    {SERVICES.map((card) => (
                        <ServiceCardItem key={card.id} card={card} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
