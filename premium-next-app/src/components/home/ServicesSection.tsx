"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Data ─────────────────────────────────────────────── */

interface ServiceTab {
    id: string;
    label: string;
    tag: string;
    headline: string;
    description: string;
    stats: string[];
    cta: { label: string; href: string };
}

const TABS: ServiceTab[] = [
    {
        id: "engineers",
        label: "Dedicated Engineers",
        tag: "your team, extended",
        headline: "Senior developers and AI engineers embedded in your team",
        description:
            "Full-time, part-time, or project-based. Managed by our US architecture team. If they underperform, we replace them — no questions asked.",
        stats: ["48-hr placement", "$4,500/mo avg", "Monthly billing, cancel anytime"],
        cta: { label: "See how it works →", href: "/staff-augmentation" },
    },
    {
        id: "development",
        label: "Custom Development",
        tag: "core work",
        headline: "Software, SaaS, Mobile, and Internal Tools",
        description:
            "Multi-tenant platforms, mobile apps, admin panels, and the systems your team duct-taped together in Sheets. Architected so your next hire can actually understand the codebase.",
        stats: ["50+ systems shipped", "MVPs in weeks", "Full-stack delivery"],
        cta: { label: "View our services →", href: "/services" },
    },
    {
        id: "websites",
        label: "24-Hour Websites",
        tag: "fast lane",
        headline: "A real website. Custom code. Live tomorrow.",
        description:
            "Not a template. Not WordPress. Custom Next.js, deployed to Vercel's edge network, starting at $997. Deployed and live before you wake up.",
        stats: ["From $997", "Custom code", "100 Lighthouse score"],
        cta: { label: "See pricing →", href: "/websites" },
    },
    {
        id: "ai-leads",
        label: "AI & Machine Learning",
        tag: "growth engine",
        headline: "Intelligent automation and AI systems that work for you",
        description:
            "From automated lead generation pipelines to custom machine learning models, we build smart systems so your team works smarter instead of harder.",
        stats: ["Autopilot outreach", "Process automation", "Custom ML models"],
        cta: { label: "Learn more →", href: "/services#ai-ml-business-systems" },
    },
];

/* ─── Animation variants ───────────────────────────────── */

const panelVariants = {
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Tab Content Panel ────────────────────────────────── */

function TabContent({ tab }: { tab: ServiceTab }) {
    return (
        <motion.div
            key={tab.id}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm lg:p-10"
        >
            {/* Tag */}
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {tab.tag}
            </p>

            {/* Headline */}
            <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white">
                {tab.headline}
            </h3>

            {/* Description */}
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-zinc-400 lg:text-base">
                {tab.description}
            </p>

            {/* Stats */}
            <div className="mb-8 flex flex-wrap gap-3">
                {tab.stats.map((stat) => (
                    <span
                        key={stat}
                        className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-400"
                    >
                        {stat}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <Link
                href={tab.cta.href}
                className="group inline-flex items-center gap-2 text-sm font-medium text-brand-accent-light transition-colors duration-200 hover:text-white"
            >
                {tab.cta.label}
                <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </Link>
        </motion.div>
    );
}

/* ─── Main Component ───────────────────────────────────── */

export default function ServicesSection() {
    const [activeId, setActiveId] = useState(TABS[0].id);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const activeTab = TABS.find((t) => t.id === activeId) ?? TABS[0];

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const currentIndex = TABS.findIndex((t) => t.id === activeId);
            let nextIndex = currentIndex;

            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                nextIndex = (currentIndex + 1) % TABS.length;
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
            }

            if (nextIndex !== currentIndex) {
                setActiveId(TABS[nextIndex].id);
            }
        },
        [activeId]
    );

    return (
        <section
            ref={sectionRef}
            aria-label="Our services"
            className="relative overflow-hidden py-24 lg:py-32"
        >
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 0% 50%, rgba(var(--brand-accent-dark-rgb), 0.05) 0%, transparent 50%)",
                }}
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        what we actually do
                    </motion.span>

                    <motion.h2
                        variants={slideFromLeftContainer}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mb-6 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                    >
                        {splitWords("Four ways we ship for").map((word, i) => (
                            <motion.span key={`w-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            variants={slideFromLeftItem}
                            className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                        >
                            you.
                        </motion.span>
                    </motion.h2>
                </div>

                {/* Two-column layout */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-[35%_1fr] lg:gap-10 lg:items-center"
                >
                    {/* ─── Desktop vertical tabs ─── */}
                    <div
                        role="tablist"
                        aria-label="Service categories"
                        onKeyDown={handleKeyDown}
                        className="hidden space-y-1 lg:block"
                    >
                        {TABS.map((tab) => {
                            const isActive = tab.id === activeId;
                            return (
                                <button
                                    key={tab.id}
                                    id={`tab-${tab.id}`}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${tab.id}`}
                                    tabIndex={isActive ? 0 : -1}
                                    onClick={() => setActiveId(tab.id)}
                                    className={`relative w-full rounded-xl px-5 py-4 text-left text-sm font-medium transition-colors duration-300 ${isActive
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-zinc-300"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="service-tab-indicator"
                                            className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.05]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    {/* Left accent bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="service-tab-accent"
                                            className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-brand-accent-light"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ─── Mobile pill tabs ─── */}
                    <div
                        role="tablist"
                        aria-label="Service categories"
                        onKeyDown={handleKeyDown}
                        className="flex gap-2 overflow-x-auto pb-2 lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {TABS.map((tab) => {
                            const isActive = tab.id === activeId;
                            return (
                                <button
                                    key={tab.id}
                                    id={`tab-m-${tab.id}`}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${tab.id}`}
                                    tabIndex={isActive ? 0 : -1}
                                    onClick={() => setActiveId(tab.id)}
                                    className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${isActive
                                        ? "bg-white text-black"
                                        : "border border-zinc-700 text-zinc-400 hover:text-zinc-300"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* ─── Content panel ─── */}
                    <div className="min-h-[320px]">
                        <AnimatePresence mode="wait">
                            <TabContent tab={activeTab} />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
