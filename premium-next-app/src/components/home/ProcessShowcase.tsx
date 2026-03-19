"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    const ref = useRef<HTMLElement>(null);
    const isHeaderInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24 border-y border-white/5 bg-[#030303]">
            {/* Ambient center glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(circle at 10% 50%, rgba(var(--brand-accent-rgb), 0.04) 0%, rgba(var(--brand-accent-rgb), 0) 60%)" }}
            />

            <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-10">
                <div className="mb-14">
                    <span className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        our process
                    </span>
                    <motion.h2
                        variants={blurFocusIn()}
                        initial="hidden"
                        animate={isHeaderInView ? "show" : "hidden"}
                        className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl"
                    >
                        How the <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">delivery</span> system works.
                    </motion.h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {STEPS.map((s, i) => (
                        <div
                            key={s.number}
                            className="group rounded-[2rem] border border-white/8 bg-neutral-900/30 p-8 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/30 hover:bg-brand-accent/5 lg:p-10"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-5xl font-black leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-brand-accent/20">
                                    {s.number}
                                </span>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-zinc-400 font-semibold transition-colors duration-500 group-hover:border-brand-accent/30 group-hover:bg-brand-accent/10 group-hover:text-brand-accent-light">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                    {s.eyebrow}
                                </div>
                            </div>

                            <h3 className="mt-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">{s.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-400 group-hover:text-brand-accent-light lg:text-base transition-colors duration-300">{s.description}</p>

                            <div className="mt-8 mb-6 relative">
                                {/* subtle background highlight for graphic */}
                                <div className="absolute -inset-4 z-0 rounded-3xl bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <div className="relative z-10">{VISUALS[i]}</div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm font-medium leading-relaxed text-zinc-300 border-l-2 border-l-brand-accent transition-colors duration-500 group-hover:border-brand-accent/20 group-hover:bg-brand-accent/10">
                                {s.outcome}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
