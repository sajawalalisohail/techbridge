"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring
} from "framer-motion";
import { Search, Rocket, Code2, BrainCircuit } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const PHASES = [
    {
        number: "01",
        icon: Search,
        label: "Discovery & Blueprinting",
        description:
            "We map your architecture, business logic, and success metrics before writing a single line of code. This phase eliminates costly re-work and ensures every engineering decision is deliberate.",
        tags: ["Stakeholder Workshops", "Technical Scoping", "Architecture Design"],
    },
    {
        number: "02",
        icon: Rocket,
        label: "Rapid Deployment",
        description:
            "MVPs and premium web presences launched in record time to establish immediate ROI and create a feedback loop with real users - not assumptions.",
        tags: ["MVP Launch", "Performance Budgets", "Conversion Architecture"],
    },
    {
        number: "03",
        icon: Code2,
        label: "Core Engineering",
        description:
            "Building your custom software, SaaS platform, or internal tools using modern, scalable stacks. Clean code, proper abstractions, and thorough documentation - always.",
        tags: ["Full-Stack Development", "API Design", "QA & Testing"],
    },
    {
        number: "04",
        icon: BrainCircuit,
        label: "AI & Automation Integration",
        description:
            "Implementing intelligent workflows that reduce overhead and scale operations. We identify the highest-leverage automation opportunities and execute with precision.",
        tags: ["AI Workflow Design", "LLM Integration", "Process Automation"],
    },
];

/* ─── Individual Step ────────────────────────────────────── */
function PhaseCard({
    phase,
    dotRef,
    cardRef,
    isActive,
}: {
    phase: (typeof PHASES)[number];
    dotRef?: React.RefObject<HTMLDivElement | null>;
    cardRef?: (el: HTMLDivElement | null) => void;
    isActive: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const Icon = phase.icon;

    return (
        <>
            {/* Left rail - dot (col 1) */}
            <div className="relative flex justify-center pt-8">
                <motion.div
                    ref={dotRef}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                    className="relative flex h-5 w-5 items-center justify-center"
                >
                    <span className={`absolute inset-0 rounded-full blur-sm transition-all duration-700 ${isActive ? "bg-violet-500/60 scale-150" : "bg-violet-500/30"}`} />
                    <span className={`relative h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-black transition-all duration-700 ${isActive ? "bg-white ring-violet-400" : "bg-violet-400 ring-violet-400/30"}`} />
                </motion.div>
            </div>

            {/* Glass card (col 2) */}
            <motion.div
                ref={(el) => {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                    cardRef?.(el);
                }}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 p-7 backdrop-blur-sm lg:p-8 ${isActive
                    ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_40px_rgba(139,92,246,0.15)] scale-[1.01]"
                    : "border-white/8 bg-neutral-900/40 hover:border-white/15"
                    }`}
            >
                {/* Active glow gradient */}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background:
                            "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 100%)",
                    }}
                />

                {/* Phase number + icon */}
                <div className="relative z-10 mb-5 flex items-center justify-between">
                    <span
                        className={`font-mono text-5xl font-bold leading-none tracking-tighter select-none transition-all duration-700 ${isActive
                            ? "text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.6)]"
                            : "text-white/[0.06]"
                            }`}
                    >
                        {phase.number}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 ${isActive
                        ? "border-violet-500/40 bg-violet-950/50 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        : "border-white/10 bg-white/5 text-zinc-400 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400"
                        }`}>
                        <Icon size={18} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h3 className={`relative z-10 mb-3 text-xl font-semibold leading-snug lg:text-2xl transition-colors duration-500 ${isActive ? "text-white" : "text-white/90 group-hover:text-white"
                    }`}>
                    {phase.label}
                </h3>

                {/* Description */}
                <p className={`relative z-10 text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"
                    }`}>
                    {phase.description}
                </p>

                {/* Tags */}
                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    {phase.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors duration-500 ${isActive
                                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                : "border-white/8 bg-white/[0.04] text-zinc-500"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    /* ── Single-active-card logic ── */
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const cardEls = useRef<(HTMLDivElement | null)[]>([]);

    const updateActiveCard = useCallback(() => {
        const viewportCenter = window.innerHeight / 2;
        const threshold = window.innerHeight * 0.4;
        let closestIdx: number | null = null;
        let closestDist = Infinity;

        cardEls.current.forEach((el, i) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < threshold && dist < closestDist) {
                closestDist = dist;
                closestIdx = i;
            }
        });

        setActiveIndex(closestIdx);
    }, []);

    useEffect(() => {
        updateActiveCard();
        window.addEventListener("scroll", updateActiveCard, { passive: true });
        window.addEventListener("resize", updateActiveCard);
        return () => {
            window.removeEventListener("scroll", updateActiveCard);
            window.removeEventListener("resize", updateActiveCard);
        };
    }, [updateActiveCard]);

    /* Scroll-driven line draw */
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 50%", "end 50%"],
    });

    const [lineStart, setLineStart] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);
    const firstDotRef = useRef<HTMLDivElement>(null);
    const lastDotRef = useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        const updateHeight = () => {
            if (timelineRef.current && firstDotRef.current && lastDotRef.current) {
                const timelineRect = timelineRef.current.getBoundingClientRect();
                const firstDotRect = firstDotRef.current.getBoundingClientRect();
                const lastDotRect = lastDotRef.current.getBoundingClientRect();
                const firstCenter = firstDotRect.top - timelineRect.top + firstDotRect.height / 2;
                const lastCenter = lastDotRect.top - timelineRect.top + lastDotRect.height / 2;
                setLineStart(firstCenter);
                setLineHeight(lastCenter - firstCenter);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative overflow-hidden py-32 lg:py-44"
        >
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            {/* Ambient left glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(79,70,229,0.03) 0%, rgba(79,70,229,0) 50%)" }}
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 max-w-3xl lg:mb-20"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-px w-6 bg-zinc-700" />
                        Our Process
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                        From Concept to{" "}
                        <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                            Scalable Architecture
                        </span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl">
                        A four-phase methodology that turns ambiguity into precision-engineered systems - on time, every time.
                    </p>
                </motion.div>

                {/* ── Timeline (2-column grid: rail | cards) ── */}
                <div ref={timelineRef} className="relative grid grid-cols-[2rem_1fr] gap-x-4 gap-y-10 lg:grid-cols-[3rem_1fr] lg:gap-x-6 lg:gap-y-12">
                    {/* Vertical rail line (spans all rows, behind dots) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[1rem] top-0 h-full w-px bg-white/5 lg:left-[1.5rem]"
                    />
                    {/* Glow line: scroll-driven scaleY from center of dot 1 to center of dot 4 */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            scaleY: lineHeight ? lineScaleY : 0,
                            originY: 0,
                            top: lineStart || 0,
                            height: lineHeight || 0,
                        }}
                        className="pointer-events-none absolute left-[1rem] w-px lg:left-[1.5rem]"
                    >
                        <div className="h-full w-full bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500/10" />
                        <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/60 blur-md" />
                    </motion.div>

                    {/* Phase cards (each renders into both columns via `contents`) */}
                    {PHASES.map((phase, index) => (
                        <PhaseCard
                            key={phase.number}
                            phase={phase}
                            isActive={activeIndex === index}
                            dotRef={
                                index === 0
                                    ? firstDotRef
                                    : index === PHASES.length - 1
                                        ? lastDotRef
                                        : undefined
                            }
                            cardRef={(el) => { cardEls.current[index] = el; }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
