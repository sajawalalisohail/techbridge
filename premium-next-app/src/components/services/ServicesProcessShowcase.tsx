"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
    ArrowUpRight,
    Boxes,
    Gauge,
    MessagesSquare,
    Radar,
    Rocket,
    Route,
    Workflow,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProcessStep {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    outcome: string;
    visual: ReactNode;
}

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
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900/55 p-6 backdrop-blur-sm">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 80% 0%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 42%), radial-gradient(circle at 0% 100%, rgba(var(--brand-accent-dark-rgb), 0.08) 0%, rgba(var(--brand-accent-dark-rgb), 0) 38%)",
                }}
            />
            <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
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
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
                <div className="relative min-h-[15rem] rounded-[1.35rem] border border-white/10 bg-black/20">
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
                            <div className="relative h-3.5 w-3.5 rounded-full border border-brand-accent-light/60 bg-brand-accent" />
                            {index < 4 && (
                                <div className="absolute left-2 top-2 h-px w-16 rotate-[18deg] bg-gradient-to-r from-brand-accent/45 to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="space-y-3">
                    {[
                        "Revenue leak",
                        "Manual ops handoff",
                        "Quote-to-cash delay",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-3 text-sm text-zinc-300"
                        >
                            {item}
                        </div>
                    ))}
                    <div className="rounded-[1rem] border border-brand-accent/20 bg-brand-accent-deep/30 px-4 py-4 text-sm text-zinc-200">
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
            <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="space-y-3">
                    {[
                        { label: "Scope", width: "78%" },
                        { label: "Integrations", width: "64%" },
                        { label: "Failure modes", width: "88%" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[1rem] border border-white/8 bg-black/20 p-4"
                        >
                            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                                {item.label}
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light"
                                    style={{ width: item.width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {[
                        "Product",
                        "Automation",
                        "Billing",
                        "Ops Console",
                    ].map((node) => (
                        <div
                            key={node}
                            className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-5 text-sm font-medium text-white"
                        >
                            {node}
                        </div>
                    ))}
                    <div className="sm:col-span-2 rounded-[1rem] border border-brand-accent/20 bg-brand-accent-deep/25 px-4 py-5 text-sm text-zinc-300">
                        Boundaries, contracts, and fallback behavior are defined before build starts.
                    </div>
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

function DeliveryVisual() {
    return (
        <ProcessVisualFrame icon={<Route className="h-4 w-4" />} label="delivery loops">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4">
                    {[
                        { label: "Build", width: "74%" },
                        { label: "Review", width: "56%" },
                        { label: "QA", width: "68%" },
                        { label: "Ship", width: "44%" },
                    ].map((item) => (
                        <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                                <span>{item.label}</span>
                                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                                    live
                                </span>
                            </div>
                            <div className="h-2.5 rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light"
                                    style={{ width: item.width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        "Spec",
                        "Build",
                        "Feedback",
                        "Fix",
                        "Deploy",
                        "Observe",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-4 text-center text-sm text-zinc-300"
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
            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="space-y-3">
                    {[
                        "Deploy pipeline",
                        "Rollback path",
                        "Alerting",
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-black/20 px-4 py-4"
                        >
                            <span className="text-sm text-zinc-300">{item}</span>
                            <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-accent-light">
                                Ready
                            </span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: <Gauge className="h-4 w-4" />, label: "Response", value: "248ms" },
                        { icon: <Workflow className="h-4 w-4" />, label: "Health", value: "99.98%" },
                        { icon: <MessagesSquare className="h-4 w-4" />, label: "Queue", value: "Clear" },
                        { icon: <ArrowUpRight className="h-4 w-4" />, label: "Sessions", value: "Live" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4"
                        >
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                                <span>{item.label}</span>
                                <span className="text-brand-accent-light">{item.icon}</span>
                            </div>
                            <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ProcessVisualFrame>
    );
}

const STEPS: ProcessStep[] = [
    {
        number: "01",
        eyebrow: "framing the real problem",
        title: "Map the bottlenecks before we touch a build.",
        description:
            "We turn vague requests, broken handoffs, and disconnected tools into one visible operating picture so we know exactly what deserves code.",
        bullets: ["Stakeholder signal capture", "Workflow inventory", "Highest-cost friction map"],
        outcome: "Clear scope, clear business target, no fake urgency theater.",
        visual: <DiscoveryVisual />,
    },
    {
        number: "02",
        eyebrow: "system design",
        title: "Design the architecture and failure paths up front.",
        description:
            "Before implementation, we define the integration map, data boundaries, fallback behavior, and what the team will actually own after handoff.",
        bullets: ["System boundaries", "Integration contracts", "Failure-mode planning"],
        outcome: "A plan senior engineers can execute without guesswork.",
        visual: <ArchitectureVisual />,
    },
    {
        number: "03",
        eyebrow: "tight delivery loops",
        title: "Ship in visible increments, not one giant reveal.",
        description:
            "We work in short delivery loops so your team can react early, approve real progress, and avoid discovering misalignment after the expensive part.",
        bullets: ["Working milestones", "Feedback checkpoints", "Operational QA"],
        outcome: "Momentum stays high and risk stays small.",
        visual: <DeliveryVisual />,
    },
    {
        number: "04",
        eyebrow: "launch and iteration",
        title: "Launch with observability, then keep the system honest.",
        description:
            "Go-live is not the finish line. We ship monitoring, support paths, and next-iteration hooks so the system survives real usage instead of demo-day conditions.",
        bullets: ["Deployment readiness", "Runtime metrics", "Next-iteration roadmap"],
        outcome: "A production system with real post-launch footing.",
        visual: <LaunchVisual />,
    },
];

function EditorialProcessStep({
    step,
    index,
}: {
    step: ProcessStep;
    index: number;
}) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isReverse = index % 2 === 1;

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-neutral-900/45 p-6 backdrop-blur-sm lg:p-8"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 0% 0%, rgba(var(--brand-accent-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0) 34%), radial-gradient(circle at 100% 100%, rgba(var(--brand-accent-dark-rgb), 0.08) 0%, rgba(var(--brand-accent-dark-rgb), 0) 32%)",
                }}
            />
            <div
                className={`relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-10 ${
                    isReverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
            >
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <span className="font-mono text-[4.5rem] font-black leading-none tracking-[-0.08em] text-white/[0.08]">
                            {step.number}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-accent/50 to-transparent" />
                    </div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent-deep/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-brand-accent-light">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {step.eyebrow}
                    </div>
                    <h3 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                        {step.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 lg:text-lg">
                        {step.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                        {step.bullets.map((bullet) => (
                            <span
                                key={bullet}
                                className="rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-400"
                            >
                                {bullet}
                            </span>
                        ))}
                    </div>
                    <div className="mt-8 rounded-[1.4rem] border border-brand-accent/15 bg-brand-accent-deep/15 p-5 text-sm leading-relaxed text-zinc-300">
                        {step.outcome}
                    </div>
                </div>
                {step.visual}
            </div>
        </motion.article>
    );
}

export default function ServicesProcessShowcase() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section
            id="our-process"
            className="relative border-y border-white/6 bg-[radial-gradient(circle_at_14%_18%,rgba(var(--brand-accent-rgb),0.08),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(var(--brand-accent-dark-rgb),0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] py-24 lg:py-32"
        >
            <div className="mx-auto max-w-[90rem] px-6 lg:px-10">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-14 max-w-3xl lg:mb-18"
                >
                    <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        our process
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
                        How the delivery system works.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 lg:text-lg">
                        Four stages. One readable path. Everything is designed to keep momentum high and ambiguity low without trapping the page in a complicated reveal.
                    </p>
                </motion.div>

                <div className="space-y-8 lg:space-y-10">
                    {STEPS.map((step, index) => (
                        <EditorialProcessStep key={step.number} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
