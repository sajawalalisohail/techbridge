"use client";

import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
    motion,
    useInView,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
    ArrowUpRight,
    Bot,
    Boxes,
    Gauge,
    MessagesSquare,
    Radar,
    Rocket,
    Route,
    Sparkles,
} from "lucide-react";

type ProcessMediaRenderer = (args: { isActive: boolean; reducedMotion: boolean }) => ReactNode;

interface ProcessStep {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    outcome: string;
    renderMedia: ProcessMediaRenderer;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const DESKTOP_HEIGHT = "500vh";
const STEP_PROGRESS_WINDOWS = [
    { start: 0.02, fadeIn: 0.08, holdEnd: 0.22, end: 0.3 },
    { start: 0.24, fadeIn: 0.3, holdEnd: 0.46, end: 0.54 },
    { start: 0.48, fadeIn: 0.54, holdEnd: 0.7, end: 0.78 },
    { start: 0.72, fadeIn: 0.78, holdEnd: 0.94, end: 1 },
] as const;

function DiscoverySignalBoard({ isActive, reducedMotion }: { isActive: boolean; reducedMotion: boolean }) {
    const pulse = reducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.35, 0.8, 0.35] };
    return (
        <div className="relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-accent-rgb),0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-6 shadow-[0_0_60px_rgba(var(--brand-accent-rgb),0.08)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-[0.08]" />
            <div className="relative grid h-full grid-cols-[1.1fr_0.9fr] gap-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
                        <Radar className="h-3.5 w-3.5 text-brand-accent-light" />
                        signal map
                    </div>
                    <div className="relative mt-6 h-[15rem]">
                        {[["18%", "22%"], ["38%", "70%"], ["72%", "32%"], ["82%", "72%"], ["58%", "50%"]].map(
                            ([left, top], index) => (
                                <motion.div
                                    key={`${left}-${top}`}
                                    className="absolute"
                                    style={{ left, top }}
                                    animate={isActive ? pulse : { opacity: 0.45 }}
                                    transition={{
                                        duration: 2.4,
                                        repeat: Infinity,
                                        delay: index * 0.25,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-full bg-brand-accent/25 blur-xl" />
                                    <div className="relative h-3.5 w-3.5 rounded-full border border-brand-accent-light/60 bg-brand-accent" />
                                </motion.div>
                            )
                        )}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 220" fill="none">
                            <path d="M42 42 C92 90, 120 90, 170 112 S240 84, 258 160" stroke="rgba(223,76,143,0.35)" strokeWidth="1.5" strokeDasharray="7 7" />
                            <path d="M42 42 C60 135, 118 170, 250 158" stroke="rgba(193,36,104,0.3)" strokeWidth="1.5" strokeDasharray="10 8" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
                            <span>intake</span>
                            <MessagesSquare className="h-4 w-4 text-brand-accent-light" />
                        </div>
                        <div className="mt-4 space-y-3">
                            {["Revenue leak", "Manual ops handoff", "Quote-to-cash delay"].map((label, index) => (
                                <motion.div
                                    key={label}
                                    className="rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-zinc-300"
                                    animate={isActive && !reducedMotion ? { x: [0, 6, 0] } : {}}
                                    transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.2 }}
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-brand-accent/20 bg-brand-accent-deep/30 p-5">
                        <div className="text-xs uppercase tracking-[0.2em] text-brand-accent-light">outcome</div>
                        <div className="mt-3 text-2xl font-semibold text-white">One system map. One delivery path.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArchitectureBoard({ isActive, reducedMotion }: { isActive: boolean; reducedMotion: boolean }) {
    return (
        <div className="relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_70%_18%,rgba(var(--brand-accent-light-rgb),0.16),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-[0_0_60px_rgba(var(--brand-accent-rgb),0.07)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(var(--brand-accent-dark-rgb),0.24),transparent_28%)]" />
            <div className="relative flex h-full flex-col gap-5">
                <div className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 text-xs uppercase tracking-[0.24em] text-zinc-500">
                    <span>architecture board</span>
                    <Boxes className="h-4 w-4 text-brand-accent-light" />
                </div>
                <div className="grid flex-1 grid-cols-[1fr_1.2fr] gap-4">
                    <div className="space-y-4">
                        {["Scope", "Integration Plan", "Failure Modes"].map((label, index) => (
                            <motion.div
                                key={label}
                                className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4"
                                animate={isActive && !reducedMotion ? { opacity: [0.72, 1, 0.72] } : {}}
                                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.25 }}
                            >
                                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{label}</div>
                                <div className="mt-3 h-2 rounded-full bg-white/8">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light"
                                        animate={isActive && !reducedMotion ? { width: ["32%", "84%", "62%"] } : { width: "62%" }}
                                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="relative rounded-[1.6rem] border border-white/10 bg-black/25 p-4">
                        <svg className="h-full w-full" viewBox="0 0 420 260" fill="none">
                            {[
                                { x: 32, y: 24, w: 110, h: 52, label: "Product" },
                                { x: 160, y: 24, w: 110, h: 52, label: "Automation" },
                                { x: 288, y: 24, w: 100, h: 52, label: "Billing" },
                                { x: 92, y: 150, w: 120, h: 60, label: "Data Layer" },
                                { x: 242, y: 150, w: 120, h: 60, label: "Ops Console" },
                            ].map((node) => (
                                <g key={node.label}>
                                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(223,76,143,0.3)" />
                                    <text x={node.x + 18} y={node.y + 31} fill="rgba(250,244,247,0.92)" fontSize="15">{node.label}</text>
                                </g>
                            ))}
                            {[
                                "M142 50 C152 50, 156 50, 160 50",
                                "M270 50 C278 50, 282 50, 288 50",
                                "M216 76 C216 114, 170 118, 152 150",
                                "M320 76 C320 120, 308 132, 302 150",
                                "M212 180 C226 180, 232 180, 242 180",
                            ].map((path, index) => (
                                <motion.path
                                    key={path}
                                    d={path}
                                    stroke="rgba(193,36,104,0.58)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="9 10"
                                    animate={isActive && !reducedMotion ? { strokeDashoffset: [0, -32] } : { strokeDashoffset: 0 }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DeliveryBoard({ isActive, reducedMotion }: { isActive: boolean; reducedMotion: boolean }) {
    return (
        <div className="relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_82%_14%,rgba(var(--brand-accent-rgb),0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-[0_0_60px_rgba(var(--brand-accent-rgb),0.08)]">
            <div className="grid h-full grid-cols-[0.92fr_1.08fr] gap-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
                        <span>sprint rail</span>
                        <Route className="h-4 w-4 text-brand-accent-light" />
                    </div>
                    <div className="mt-5 space-y-4">
                        {[
                            { label: "Build", width: "74%" },
                            { label: "Review", width: "52%" },
                            { label: "QA", width: "68%" },
                            { label: "Ship", width: "46%" },
                        ].map((item, index) => (
                            <div key={item.label}>
                                <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                                    <span>{item.label}</span>
                                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">live</span>
                                </div>
                                <div className="h-2.5 rounded-full bg-white/8">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light"
                                        animate={isActive && !reducedMotion ? { width: ["20%", item.width, "85%", item.width] } : { width: item.width }}
                                        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.16 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-rows-[0.95fr_1.05fr] gap-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
                            <span>delivery loops</span>
                            <Bot className="h-4 w-4 text-brand-accent-light" />
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            {["Spec", "Build", "Feedback", "Fix", "Deploy", "Observe"].map((label, index) => (
                                <motion.div
                                    key={label}
                                    className="rounded-xl border border-white/8 bg-black/20 px-3 py-4 text-center text-sm text-zinc-300"
                                    animate={isActive && !reducedMotion ? { y: [0, -8, 0], borderColor: ["rgba(255,255,255,0.08)", "rgba(223,76,143,0.35)", "rgba(255,255,255,0.08)"] } : {}}
                                    transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.14 }}
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-brand-accent/20 bg-brand-accent-deep/30 p-5">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-brand-accent-light">
                            <span>status feed</span>
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="mt-4 space-y-3">
                            {["Checkpoint approved", "Monitoring wired", "Stakeholder review sent"].map((label, index) => (
                                <motion.div
                                    key={label}
                                    className="rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-zinc-200"
                                    animate={isActive && !reducedMotion ? { x: [0, 8, 0] } : {}}
                                    transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.18 }}
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LaunchBoard({ isActive, reducedMotion }: { isActive: boolean; reducedMotion: boolean }) {
    return (
        <div className="relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(var(--brand-accent-light-rgb),0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] p-6 shadow-[0_0_60px_rgba(var(--brand-accent-rgb),0.08)]">
            <div className="grid h-full grid-cols-[1fr_1fr] gap-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
                        <span>launch console</span>
                        <Rocket className="h-4 w-4 text-brand-accent-light" />
                    </div>
                    <div className="mt-6 space-y-4">
                        {[
                            { label: "Deploy pipeline", value: "Green" },
                            { label: "Rollback path", value: "Ready" },
                            { label: "Alerting", value: "Active" },
                        ].map((item, index) => (
                            <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
                                <span className="text-sm text-zinc-300">{item.label}</span>
                                <motion.span
                                    className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-accent-light"
                                    animate={isActive && !reducedMotion ? { opacity: [0.6, 1, 0.6] } : {}}
                                    transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18 }}
                                >
                                    {item.value}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-rows-[1fr_auto] gap-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
                            <span>runtime metrics</span>
                            <Gauge className="h-4 w-4 text-brand-accent-light" />
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-4">
                            {[
                                { label: "Response", value: "248ms" },
                                { label: "Health", value: "99.98%" },
                                { label: "Queue", value: "Clear" },
                                { label: "Sessions", value: "Live" },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    className="rounded-xl border border-white/8 bg-black/20 p-4"
                                    animate={isActive && !reducedMotion ? { y: [0, -6, 0] } : {}}
                                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.14 }}
                                >
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</div>
                                    <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-brand-accent/20 bg-gradient-to-r from-brand-accent-deep/35 to-black/20 px-5 py-4 text-sm text-zinc-200">
                        Handover includes observability, launch-day support, and the next set of iteration hooks already mapped.
                    </div>
                </div>
            </div>
        </div>
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
        renderMedia: DiscoverySignalBoard,
    },
    {
        number: "02",
        eyebrow: "system design",
        title: "Design the architecture and failure paths up front.",
        description:
            "Before implementation, we define the integration map, data boundaries, fallback behavior, and what the team will actually own after handoff.",
        bullets: ["System boundaries", "Integration contracts", "Failure-mode planning"],
        outcome: "A plan senior engineers can execute without guesswork.",
        renderMedia: ArchitectureBoard,
    },
    {
        number: "03",
        eyebrow: "tight delivery loops",
        title: "Ship in visible increments, not one giant reveal.",
        description:
            "We work in short delivery loops so your team can react early, approve real progress, and avoid discovering misalignment after the expensive part.",
        bullets: ["Working milestones", "Feedback checkpoints", "Operational QA"],
        outcome: "Momentum stays high and risk stays small.",
        renderMedia: DeliveryBoard,
    },
    {
        number: "04",
        eyebrow: "launch and iteration",
        title: "Launch with observability, then keep the system honest.",
        description:
            "Go-live is not the finish line. We ship monitoring, support paths, and next-iteration hooks so the system survives real usage instead of demo-day conditions.",
        bullets: ["Deployment readiness", "Runtime metrics", "Next-iteration roadmap"],
        outcome: "A production system with real post-launch footing.",
        renderMedia: LaunchBoard,
    },
];

function DesktopProcessSlide({
    step,
    index,
    activeIndex,
    progress,
    reducedMotion,
}: {
    step: ProcessStep;
    index: number;
    activeIndex: number;
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const window = STEP_PROGRESS_WINDOWS[index];
    const opacity = useTransform(progress, [window.start, window.fadeIn, window.holdEnd, window.end], [0, 1, 1, 0]);
    const y = useTransform(progress, [window.start, window.fadeIn, window.holdEnd, window.end], [44, 0, 0, -30]);
    const isActive = activeIndex === index;
    const Media = step.renderMedia;

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 grid grid-cols-[0.78fr_1.22fr] items-center gap-12"
        >
            <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-[5rem] font-black leading-none tracking-[-0.08em] text-white/[0.08]">
                        {step.number}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-accent/50 to-transparent" />
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent-deep/25 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-brand-accent-light">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {step.eyebrow}
                </div>
                <h3 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white">
                    {step.title}
                </h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-400">
                    {step.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                    {step.bullets.map((bullet) => (
                        <span key={bullet} className="rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-400">
                            {bullet}
                        </span>
                    ))}
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-brand-accent/15 bg-brand-accent-deep/20 p-5 text-sm leading-relaxed text-zinc-300">
                    {step.outcome}
                </div>
            </div>
            <Media isActive={isActive} reducedMotion={reducedMotion} />
        </motion.div>
    );
}

export default function ServicesProcessShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion() ?? false;
    const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLg, setIsLg] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        setIsLg(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 88,
        damping: 28,
        mass: 0.5,
        restDelta: 0.001,
    });

    useMotionValueEvent(smoothProgress, "change", (value) => {
        const nextIndex = STEP_PROGRESS_WINDOWS.findIndex(
            (window) => value >= window.start && value < window.end
        );
        setActiveIndex(nextIndex === -1 ? STEPS.length - 1 : nextIndex);
    });

    return (
        <section
            id="our-process"
            ref={sectionRef}
            className="relative border-y border-white/6 bg-[radial-gradient(circle_at_15%_25%,rgba(var(--brand-accent-rgb),0.08),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(var(--brand-accent-dark-rgb),0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]"
            style={{ height: reducedMotion || !isLg ? "auto" : DESKTOP_HEIGHT }}
        >
            <div className="mx-auto max-w-[90rem] px-6 pb-10 pt-24 lg:hidden lg:px-12 lg:pb-12 lg:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="max-w-2xl"
                >
                    <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        our process
                    </span>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                        How the delivery system works.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 lg:text-base">
                        Four stages, one pinned system view. Each stage gets enough dwell time to read before the page advances.
                    </p>
                </motion.div>
            </div>

            <div className="hidden h-full lg:block">
                <div className="sticky top-12 h-[calc(100vh-3rem)] overflow-hidden xl:top-24 xl:h-[calc(100vh-6rem)]">
                    <div className="mx-auto flex h-full max-w-[90rem] -translate-y-3 flex-col px-6 pb-12 pt-4 lg:px-12 xl:translate-y-0 xl:pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-6 max-w-2xl xl:mb-8"
                        >
                            <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                                <span className="h-px w-4 bg-brand-accent/40" />
                                our process
                            </span>
                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                                How the delivery system works.
                            </h2>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 lg:text-base">
                                Four stages, one pinned system view. Each stage gets enough dwell time to read before the page advances.
                            </p>
                        </motion.div>
                        <div className="mb-6 flex items-center justify-between xl:mb-8">
                            <div className="flex items-center gap-3">
                                {STEPS.map((step, index) => (
                                    <div key={step.number} className="flex items-center gap-3">
                                        <motion.span
                                            className="block h-2.5 w-2.5 rounded-full"
                                            animate={{
                                                backgroundColor: index <= activeIndex ? "rgba(var(--brand-accent-rgb), 1)" : "rgba(255,255,255,0.12)",
                                                scale: index === activeIndex ? 1.18 : 1,
                                                boxShadow: index === activeIndex ? "0 0 18px rgba(var(--brand-accent-rgb), 0.45)" : "0 0 0 rgba(0,0,0,0)",
                                            }}
                                            transition={{ duration: 0.35 }}
                                        />
                                        {index < STEPS.length - 1 && (
                                            <motion.span
                                                className="block h-px w-16"
                                                animate={{
                                                    backgroundColor: index < activeIndex ? "rgba(var(--brand-accent-rgb), 0.42)" : "rgba(255,255,255,0.08)",
                                                }}
                                                transition={{ duration: 0.35 }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-600">
                                {STEPS[activeIndex]?.number} / {STEPS.length.toString().padStart(2, "0")}
                            </div>
                        </div>
                        <div className="relative min-h-0 flex-1">
                            {STEPS.map((step, index) => (
                                <DesktopProcessSlide
                                    key={step.number}
                                    step={step}
                                    index={index}
                                    activeIndex={activeIndex}
                                    progress={smoothProgress}
                                    reducedMotion={reducedMotion}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-[90rem] gap-6 px-6 pb-24 lg:hidden">
                {STEPS.map((step) => {
                    const Media = step.renderMedia;
                    return (
                        <motion.article
                            key={step.number}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.65, ease: EASE }}
                            className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-5"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <span className="font-mono text-4xl font-black tracking-[-0.08em] text-white/[0.08]">{step.number}</span>
                                <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent-deep/25 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-brand-accent-light">
                                    {step.eyebrow}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold leading-tight text-white">{step.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                            <div className="mt-5">
                                <Media isActive reducedMotion />
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {step.bullets.map((bullet) => (
                                    <span key={bullet} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400">
                                        {bullet}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
