"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, ShieldCheck, Users2, Workflow } from "lucide-react";

type CommandMode = "build" | "hire";

interface ProofChip {
    icon: typeof Workflow;
    value: string;
    label: string;
}

interface CommandMetric {
    value: string;
    label: string;
}

interface CommandPanel {
    tabLabel: string;
    panelLabel: string;
    title: string;
    description: string;
    bullets: string[];
    metrics: CommandMetric[];
    bestFit: string;
    href: string;
    cta: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const PROOF_CHIPS: ProofChip[] = [
    {
        icon: Workflow,
        value: "50+",
        label: "Systems in Production",
    },
    {
        icon: Clock3,
        value: "48 hrs",
        label: "Senior Placement Window",
    },
    {
        icon: ShieldCheck,
        value: "US-led",
        label: "Architecture Oversight",
    },
    {
        icon: Users2,
        value: "Direct",
        label: "Slack + Repo Collaboration",
    },
];

const PANELS: Record<CommandMode, CommandPanel> = {
    build: {
        tabLabel: "Build a System",
        panelLabel: "Product + Engineering Strike Team",
        title:
            "Ship custom software, AI systems, and premium launch surfaces without stitching together disconnected teams.",
        description:
            "We run architecture, product thinking, design, and senior execution as one lane so the build moves like a focused internal team instead of a bloated agency relay.",
        bullets: [
            "Sprint-zero architecture in the first week",
            "Senior ICs writing production code from day one",
            "Milestones, QA, and launch ownership in one delivery rhythm",
        ],
        metrics: [
            { value: "5 days", label: "To architecture and execution map" },
            { value: "1 lane", label: "Strategy, design, build, and launch" },
            { value: "Senior", label: "Execution from the first commit" },
        ],
        bestFit:
            "Founders replacing fragmented freelancers, slow agencies, or scattered internal ownership.",
        href: "/contact",
        cta: "Start a Project",
    },
    hire: {
        tabLabel: "Hire Engineers",
        panelLabel: "Embedded Talent",
        title:
            "Add vetted senior engineers to your Slack, standups, and repos without the recruiting drag or management vacuum.",
        description:
            "You keep direct communication and shipping velocity. We handle vetting, management support, and replacement risk behind the scenes so capacity arrives without chaos.",
        bullets: [
            "Senior only across AI, full-stack, mobile, and QA",
            "48-hour shortlist with replacement coverage if the fit is off",
            "TechBridge-managed global office model with US architecture oversight",
        ],
        metrics: [
            { value: "Senior only", label: "Talent lane" },
            { value: "48 hrs", label: "Placement window" },
            { value: "Global office", label: "Management model" },
        ],
        bestFit:
            "CTOs and operators who need senior capacity now without paying US-market hiring overhead.",
        href: "/staff-augmentation",
        cta: "See the talent model",
    },
};

const panelVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: EASE },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: EASE },
    },
};

export default function CommandSurfaceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const prefersReducedMotion = useReducedMotion();
    const [activeMode, setActiveMode] = useState<CommandMode>("build");
    const activePanel = useMemo(() => PANELS[activeMode], [activeMode]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            return;
        }

        event.preventDefault();
        setActiveMode((current) => (current === "build" ? "hire" : "build"));
    };

    return (
        <section
            ref={sectionRef}
            aria-label="Choose your engagement model"
            className="relative overflow-hidden py-20 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 14% 24%, rgba(var(--brand-accent-rgb), 0.1), transparent 24%), radial-gradient(circle at 86% 74%, rgba(var(--brand-accent-light-rgb), 0.1), transparent 24%)",
                }}
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE }}
                    className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
                >
                    <h2 className="text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]">
                        One premium team, two clear ways to engage.
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                        Choose the lane that matches the immediate constraint: a full system that
                        needs unified ownership, or senior capacity that plugs directly into your
                        team without recruiting drag.
                    </p>
                </motion.div>

                <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: EASE, delay: 0.08 }}
                    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-80"
                        style={{
                            background:
                                "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 32%)",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                            backgroundSize: "34px 34px",
                            maskImage:
                                "linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.5) 60%, transparent 100%)",
                        }}
                    />

                    <div className="relative rounded-[1.7rem] border border-white/8 bg-[#04070d]/86 p-5 sm:p-6 lg:p-7">
                        <div className="grid grid-cols-1 gap-2.5 border-b border-white/8 pb-6 sm:grid-cols-2 xl:grid-cols-4">
                            {PROOF_CHIPS.map((chip) => {
                                const Icon = chip.icon;

                                return (
                                    <div
                                        key={chip.label}
                                        className="flex items-center gap-3 rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-sm text-zinc-200 backdrop-blur-sm"
                                    >
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[0.9rem] border border-white/10 bg-black/20 text-brand-accent-light">
                                            <Icon size={15} />
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold leading-none tracking-[-0.03em] text-white">
                                                {chip.value}
                                            </p>
                                            <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                                                {chip.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            role="tablist"
                            aria-label="Engagement models"
                            onKeyDown={handleKeyDown}
                            className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1"
                        >
                            {(Object.keys(PANELS) as CommandMode[]).map((mode) => {
                                const panel = PANELS[mode];
                                const isActive = activeMode === mode;

                                return (
                                    <motion.button
                                        key={mode}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`command-panel-${mode}`}
                                        id={`command-tab-${mode}`}
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => setActiveMode(mode)}
                                        className={`relative min-h-11 rounded-[1rem] px-4 py-3 text-left text-sm font-semibold transition-colors ${
                                            isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                                        }`}
                                    >
                                        {isActive ? (
                                            <motion.span
                                                layoutId="command-mode-pill"
                                                className="absolute inset-0 rounded-[1rem] border border-brand-accent/30 bg-brand-accent/[0.16] shadow-[0_8px_24px_rgba(var(--brand-accent-rgb),0.18)]"
                                                transition={{ type: "spring", bounce: 0.22, duration: 0.45 }}
                                            />
                                        ) : null}
                                        <span className="relative z-10">{panel.tabLabel}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeMode}
                                id={`command-panel-${activeMode}`}
                                role="tabpanel"
                                aria-labelledby={`command-tab-${activeMode}`}
                                variants={panelVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="mt-6"
                            >
                                <div className="grid gap-6 lg:grid-cols-[1.14fr_0.86fr]">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent-light">
                                            {activePanel.panelLabel}
                                        </p>
                                        <h3 className="mt-3 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.8rem]">
                                            {activePanel.title}
                                        </h3>
                                        <p className="mt-4 max-w-[42rem] text-sm leading-7 text-zinc-400 sm:text-base">
                                            {activePanel.description}
                                        </p>

                                        <ul className="mt-5 space-y-3">
                                            {activePanel.bullets.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                                                >
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-accent-light shadow-[0_0_12px_rgba(var(--brand-accent-light-rgb),0.75)]" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid gap-3">
                                        {activePanel.metrics.map((metric) => (
                                            <div
                                                key={metric.label}
                                                className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4"
                                            >
                                                <p className="text-[1.7rem] font-semibold tracking-[-0.04em] text-white">
                                                    {metric.value}
                                                </p>
                                                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                                                    {metric.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                                    <p className="max-w-xl text-sm leading-6 text-zinc-400">
                                        <span className="font-semibold text-zinc-200">Best fit:</span>{" "}
                                        {activePanel.bestFit}
                                    </p>

                                    <Link
                                        href={activePanel.href}
                                        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-brand-accent/50 hover:bg-brand-accent/[0.12]"
                                    >
                                        {activePanel.cta}
                                        <ArrowRight
                                            size={15}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.article>
            </div>
        </section>
    );
}
