"use client";

import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { blurFocusIn } from "@/components/shared/headingAnimations";
import {
    ArrowUpRight,
    Bot,
    Boxes,
    Gauge,
    MessagesSquare,
    Radar,
    Rocket,
    Route,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Types ───────────────────────────────────────────────── */

interface ProcessStep {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    outcome: string;
}

/* ─── Visuals (copied from ServicesProcessShowcase) ───────── */

function ProcessVisualFrame({
    icon,
    label,
    children,
}: {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900/55 p-5 backdrop-blur-sm">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 80% 0%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 42%), radial-gradient(circle at 0% 100%, rgba(var(--brand-accent-dark-rgb), 0.08) 0%, rgba(var(--brand-accent-dark-rgb), 0) 38%)",
                }}
            />
            <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    <span>{label}</span>
                    <span className="text-brand-accent-light">{icon}</span>
                </div>
                {children}
            </div>
        </div>
    );
}

function DiscoveryVisual() {
    return (
        <ProcessVisualFrame icon={<Radar className="h-4 w-4" />} label="signal map">
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
                <div className="relative min-h-[12rem] rounded-[1.35rem] border border-white/10 bg-black/20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.08]" />
                    {[
                        "left-[16%] top-[22%]",
                        "left-[36%] top-[68%]",
                        "left-[72%] top-[32%]",
                        "left-[80%] top-[72%]",
                        "left-[56%] top-[48%]",
                    ].map((position, index) => (
                        <div key={position} className={`absolute ${position}`}>
                            <div className="absolute inset-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/25 blur-xl" />
                            <div className="relative h-3 w-3 rounded-full border border-brand-accent-light/60 bg-brand-accent" />
                            {index < 4 && (
                                <div className="absolute left-2 top-2 h-px w-12 rotate-[18deg] bg-gradient-to-r from-brand-accent/45 to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    {["Revenue leak", "Manual ops handoff", "Quote-to-cash delay"].map((item) => (
                        <div
                            key={item}
                            className="rounded-[0.75rem] border border-white/8 bg-black/20 px-3 py-2.5 text-xs text-zinc-300"
                        >
                            {item}
                        </div>
                    ))}
                    <div className="rounded-[0.75rem] border border-brand-accent/20 bg-brand-accent-deep/30 px-3 py-3 text-xs text-zinc-200">
                        One system map. One delivery path.
                    </div>
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

function ArchitectureVisual() {
    return (
        <ProcessVisualFrame icon={<Boxes className="h-4 w-4" />} label="architecture board">
            <div className="grid gap-3 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="space-y-2">
                    {[
                        { label: "Scope", width: "78%" },
                        { label: "Integrations", width: "64%" },
                        { label: "Failure modes", width: "88%" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[0.75rem] border border-white/8 bg-black/20 p-3"
                        >
                            <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                                {item.label}
                            </div>
                            <div className="mt-2 h-1.5 rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light"
                                    style={{ width: item.width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {["Product", "Automation", "Billing", "Ops Console"].map((node) => (
                        <div
                            key={node}
                            className="rounded-[0.75rem] border border-white/10 bg-white/[0.03] px-3 py-3.5 text-xs font-medium text-white"
                        >
                            {node}
                        </div>
                    ))}
                    <div className="col-span-2 rounded-[0.75rem] border border-brand-accent/20 bg-brand-accent-deep/25 px-3 py-3.5 text-xs text-zinc-300">
                        Boundaries and contracts defined before build.
                    </div>
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

function DeliveryVisual() {
    return (
        <ProcessVisualFrame icon={<Route className="h-4 w-4" />} label="delivery loops">
            <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-3">
                    {[
                        { label: "Build", width: "74%" },
                        { label: "Review", width: "56%" },
                        { label: "QA", width: "68%" },
                        { label: "Ship", width: "44%" },
                    ].map((item) => (
                        <div key={item.label}>
                            <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-300">
                                <span>{item.label}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                    live
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light"
                                    style={{ width: item.width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {["Spec", "Build", "Feedback", "Fix", "Deploy", "Observe"].map((item) => (
                        <div
                            key={item}
                            className="rounded-[0.75rem] border border-white/8 bg-black/20 px-3 py-3 text-center text-xs text-zinc-300"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

function LaunchVisual() {
    return (
        <ProcessVisualFrame icon={<Rocket className="h-4 w-4" />} label="launch console">
            <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="space-y-2">
                    {["Deploy pipeline", "Rollback path", "Alerting"].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between rounded-[0.75rem] border border-white/8 bg-black/20 px-3 py-3"
                        >
                            <span className="text-xs text-zinc-300">{item}</span>
                            <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-brand-accent-light">
                                Ready
                            </span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { icon: <Gauge className="h-3.5 w-3.5" />, label: "Response", value: "248ms" },
                        { icon: <Bot className="h-3.5 w-3.5" />, label: "Health", value: "99.98%" },
                        { icon: <MessagesSquare className="h-3.5 w-3.5" />, label: "Queue", value: "Clear" },
                        { icon: <ArrowUpRight className="h-3.5 w-3.5" />, label: "Sessions", value: "Live" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[0.75rem] border border-white/8 bg-white/[0.03] p-3"
                        >
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                <span>{item.label}</span>
                                <span className="text-brand-accent-light">{item.icon}</span>
                            </div>
                            <div className="mt-2 text-xl font-semibold text-white">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

const VISUALS: ReactNode[] = [
    <DiscoveryVisual key="discovery" />,
    <ArchitectureVisual key="architecture" />,
    <DeliveryVisual key="delivery" />,
    <LaunchVisual key="launch" />,
];

/* ─── Steps data ──────────────────────────────────────────── */

const STEPS: ProcessStep[] = [
    {
        number: "01",
        eyebrow: "framing the real problem",
        title: "Map the bottlenecks before we touch a build.",
        description:
            "We turn vague requests, broken handoffs, and disconnected tools into one visible operating picture so we know exactly what deserves code.",
        bullets: ["Stakeholder signal capture", "Workflow inventory", "Highest-cost friction map"],
        outcome: "Clear scope, clear business target, no fake urgency theater.",
    },
    {
        number: "02",
        eyebrow: "system design",
        title: "Design the architecture and failure paths up front.",
        description:
            "Before implementation, we define the integration map, data boundaries, fallback behavior, and what the team will actually own after handoff.",
        bullets: ["System boundaries", "Integration contracts", "Failure-mode planning"],
        outcome: "A plan senior engineers can execute without guesswork.",
    },
    {
        number: "03",
        eyebrow: "tight delivery loops",
        title: "Ship in visible increments, not one giant reveal.",
        description:
            "We work in short delivery loops so your team can react early, approve real progress, and avoid discovering misalignment after the expensive part.",
        bullets: ["Working milestones", "Feedback checkpoints", "Operational QA"],
        outcome: "Momentum stays high and risk stays small.",
    },
    {
        number: "04",
        eyebrow: "launch and iteration",
        title: "Launch with observability, then keep the system honest.",
        description:
            "Go-live is not the finish line. We ship monitoring, support paths, and next-iteration hooks so the system survives real usage.",
        bullets: ["Deployment readiness", "Runtime metrics", "Next-iteration roadmap"],
        outcome: "A production system with real post-launch footing.",
    },
];

/* ─── Main Component ──────────────────────────────────────── */

export default function ProcessShowcase() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mql.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || !triggerRef.current) return;

        const trigger = triggerRef.current;

        const handleScroll = () => {
            const rect = trigger.getBoundingClientRect();
            const scrollableDistance = trigger.offsetHeight - window.innerHeight;
            if (scrollableDistance <= 0) return;

            // progress 0 → 1 as trigger scrolls from top-of-viewport to bottom-of-viewport
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            setScrollProgress(progress);
            setActiveStep(Math.min(3, Math.floor(progress * 4)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial calc

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prefersReducedMotion]);

    const step = STEPS[activeStep];

    /* ── Reduced motion fallback: stacked grid ── */
    if (prefersReducedMotion) {
        return (
            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-[90rem] px-6 lg:px-10">
                    <div className="mb-14">
                        <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            our process
                        </span>
                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
                            How the delivery system works.
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {STEPS.map((s, i) => (
                            <div
                                key={s.number}
                                className="rounded-[2rem] border border-white/8 bg-neutral-900/45 p-6"
                            >
                                <span className="font-mono text-4xl font-black text-white/[0.08]">
                                    {s.number}
                                </span>
                                <h3 className="mt-3 text-xl font-bold text-white">{s.title}</h3>
                                <p className="mt-3 text-sm text-zinc-400">{s.description}</p>
                                <div className="mt-4">{VISUALS[i]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    /* ── Main: pinned kinetic scroll ── */
    return (
        <div ref={triggerRef} className="relative" style={{ height: "400vh" }}>
            <div ref={pinRef} className="sticky top-0 flex h-screen w-full items-center justify-center">
                {/* Full-screen section background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 14% 18%, rgba(var(--brand-accent-rgb), 0.06), transparent 24%), radial-gradient(circle at 86% 82%, rgba(var(--brand-accent-dark-rgb), 0.08), transparent 28%)",
                    }}
                />

                <div className="relative z-10 mx-auto w-full max-w-[82rem] px-4 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            our process
                        </span>
                        <motion.h2
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            variants={blurFocusIn()}
                            className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl"
                        >
                            How the delivery system works.
                        </motion.h2>
                    </div>

                    {/* Glassmorphic container */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 shadow-[0_24px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
                        {/* Scan-line overlay */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"
                            style={{ top: `${scrollProgress * 100}%` }}
                        />

                        {/* Grid overlay */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                            style={{ opacity: 0.03 + scrollProgress * 0.05 }}
                        />

                        {/* Two-column layout */}
                        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr]">
                            {/* Left: Visual panel */}
                            <div className="relative min-h-[28rem] border-b border-white/8 p-6 lg:min-h-[32rem] lg:border-b-0 lg:border-r lg:p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                        className="flex h-full items-center"
                                    >
                                        <div className="w-full">{VISUALS[activeStep]}</div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right: Content panel */}
                            <div className="flex flex-col justify-between p-6 lg:p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                        transition={{ duration: 0.45, ease: EASE }}
                                    >
                                        {/* Step number */}
                                        <div className="mb-4 flex items-center gap-4">
                                            <span className="font-mono text-6xl font-black leading-none tracking-[-0.08em] text-white/[0.08]">
                                                {step.number}
                                            </span>
                                            <div className="h-px flex-1 bg-gradient-to-r from-brand-accent/50 to-transparent" />
                                        </div>

                                        {/* Eyebrow */}
                                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent-deep/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-brand-accent-light">
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                            {step.eyebrow}
                                        </div>

                                        {/* Title */}
                                        <h3 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white lg:text-3xl">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 lg:text-base">
                                            {step.description}
                                        </p>

                                        {/* Bullet tags */}
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {step.bullets.map((bullet) => (
                                                <span
                                                    key={bullet}
                                                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400"
                                                >
                                                    {bullet}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Outcome */}
                                        <div className="mt-6 rounded-[1.2rem] border border-brand-accent/15 bg-brand-accent-deep/15 p-4 text-sm leading-relaxed text-zinc-300">
                                            {step.outcome}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Progress bar */}
                                <div className="mt-8 flex items-center gap-3">
                                    {STEPS.map((s, i) => (
                                        <button
                                            type="button"
                                            key={s.number}
                                            onClick={() => setActiveStep(i)}
                                            className="group flex items-center gap-2"
                                        >
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-300 ${
                                                    i === activeStep
                                                        ? "border-brand-accent/50 bg-brand-accent/15 text-brand-accent-light shadow-[0_0_12px_rgba(var(--brand-accent-rgb),0.25)]"
                                                        : i < activeStep
                                                          ? "border-brand-accent/20 bg-brand-accent/5 text-brand-accent-light/60"
                                                          : "border-white/10 bg-white/[0.03] text-zinc-600"
                                                }`}
                                            >
                                                {s.number}
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div className="hidden h-px w-6 lg:block">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-brand-accent/40 to-brand-accent/10 transition-opacity duration-300"
                                                        style={{ opacity: i < activeStep ? 1 : 0.2 }}
                                                    />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
