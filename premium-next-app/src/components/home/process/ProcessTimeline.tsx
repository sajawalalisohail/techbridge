"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
} from "framer-motion";
import { PHASES, EASE, SECTION_HEADER } from "./processData";
import type { Phase } from "./processData";

/* ─── Sub-components ─────────────────────────────────────── */

function PhaseTextCard({
    phase,
    isActive,
    cardRef,
}: {
    phase: Phase;
    isActive: boolean;
    cardRef?: (el: HTMLDivElement | null) => void;
}) {
    const Icon = phase.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.75, ease: EASE }}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 p-7 backdrop-blur-sm lg:p-8 ${isActive
                ? "border-lime-500/50 bg-lime-500/10 shadow-[0_0_40px_rgba(132,204,22,0.15)] scale-[1.01]"
                : "border-white/8 bg-neutral-900/40 hover:border-lime-500/40"
                }`}
        >
            {/* Active glow gradient */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: "radial-gradient(ellipse at 0% 50%, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0) 100%)",
                }}
            />

            {/* Phase number + icon */}
            <div className="relative z-10 mb-5 flex items-center justify-between">
                <span
                    className={`font-mono text-5xl font-bold leading-none tracking-tighter select-none transition-all duration-700 ${isActive
                        ? "text-white drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]"
                        : "text-white/[0.06]"
                        }`}
                >
                    {phase.number}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 ${isActive
                    ? "border-lime-500/40 bg-lime-950/50 text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.3)]"
                    : "border-white/10 bg-white/5 text-zinc-400 group-hover:border-lime-500/40 group-hover:bg-lime-500/5 group-hover:text-lime-300"
                    }`}>
                    <Icon size={18} strokeWidth={1.5} />
                </div>
            </div>

            {/* Title */}
            <h3 className={`relative z-10 mb-3 text-xl font-semibold leading-snug lg:text-2xl transition-colors duration-500 ${isActive ? "text-white" : "text-white/90 group-hover:text-lime-300"}`}>
                {phase.label}
            </h3>

            {/* Description */}
            <p className={`relative z-10 text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-zinc-300" : "text-zinc-500 group-hover:text-lime-300"}`}>
                {phase.description}
            </p>

            {/* Tags */}
            <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {phase.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors duration-500 ${isActive
                            ? "border-lime-500/30 bg-lime-500/10 text-lime-300"
                            : "border-white/8 bg-white/[0.04] text-zinc-500"
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

function TimelineDot({
    isActive,
    dotRef,
}: {
    isActive: boolean;
    dotRef?: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <div className="relative flex justify-center">
            <motion.div
                ref={dotRef}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                className="relative flex h-5 w-5 items-center justify-center"
            >
                <span className={`absolute inset-0 rounded-full blur-sm transition-all duration-700 ${isActive ? "bg-lime-500/60 scale-150" : "bg-lime-500/30"}`} />
                <span className={`relative h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-black transition-all duration-700 ${isActive ? "bg-white ring-lime-400" : "bg-lime-400 ring-lime-400/30"}`} />
            </motion.div>
        </div>
    );
}

function PhaseRow({
    phase,
    index,
    isActive,
    dotRef,
    cardRef,
}: {
    phase: Phase;
    index: number;
    isActive: boolean;
    dotRef?: React.RefObject<HTMLDivElement | null>;
    cardRef?: (el: HTMLDivElement | null) => void;
}) {
    const isEven = index % 2 === 0;
    const { Mockup } = phase;

    return (
        <div className={`relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 ${isEven ? "" : "lg:flex-row-reverse"}`}>
            <div className="flex-1 w-full">
                <PhaseTextCard phase={phase} isActive={isActive} cardRef={cardRef} />
            </div>
            <div className="hidden shrink-0 lg:flex lg:w-[3rem] lg:justify-center">
                <TimelineDot isActive={isActive} dotRef={dotRef} />
            </div>
            <div className="flex-1 w-full">
                <Mockup />
            </div>
        </div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function ProcessTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    /* ── Single-active-card logic ── */
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const updateActiveCard = useCallback(() => {
        const viewportCenter = window.innerHeight / 2;
        const threshold = window.innerHeight * 0.4;
        let closestIdx: number | null = null;
        let closestDist = Infinity;

        cardRefs.current.forEach((el, i) => {
            if (!el || el.getBoundingClientRect().height === 0) return;
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
        restDelta: 0.001,
    });

    const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24"
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
                style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(101,163,13,0.03) 0%, rgba(101,163,13,0) 50%)" }}
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-16 max-w-3xl lg:mb-20"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                        {SECTION_HEADER.eyebrow}
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {SECTION_HEADER.heading}{" "}
                        <span className="bg-gradient-to-br from-lime-400 to-yellow-400 bg-clip-text text-transparent">
                            {SECTION_HEADER.headingAccent}
                        </span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl">
                        {SECTION_HEADER.subtitle}
                    </p>
                </motion.div>

                {/* ── Timeline ── */}
                <div
                    ref={timelineRef}
                    className="relative flex flex-col gap-y-16 lg:gap-y-24"
                >
                    {/* Center vertical rail line (desktop only) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/5 lg:block"
                    />
                    {/* Glow line */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            scaleY: lineHeight ? lineScaleY : 0,
                            originY: 0,
                            top: lineStart || 0,
                            height: lineHeight || 0,
                        }}
                        className="pointer-events-none absolute left-1/2 hidden w-px -translate-x-1/2 lg:block"
                    >
                        <div className="h-full w-full bg-gradient-to-b from-lime-500 via-yellow-500 to-lime-500/10" />
                        <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/60 blur-md" />
                    </motion.div>

                    {/* Phase rows */}
                    {PHASES.map((phase, index) => (
                        <PhaseRow
                            key={phase.number}
                            phase={phase}
                            index={index}
                            isActive={activeIndex === index}
                            dotRef={
                                index === 0
                                    ? firstDotRef
                                    : index === PHASES.length - 1
                                        ? lastDotRef
                                        : undefined
                            }
                            cardRef={(el) => {
                                cardRefs.current[index] = el;
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
