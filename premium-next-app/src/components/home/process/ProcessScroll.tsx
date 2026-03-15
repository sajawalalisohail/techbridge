"use client";

import { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    useInView,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { PHASES, SECTION_HEADER } from "./processData";
import type { Phase } from "./processData";
import { fadeUp, slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

/* â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const TOTAL_HEIGHT = "650vh";
const HEADER_END = 0.08;
const PHASE_DURATION = (1 - HEADER_END) / PHASES.length;

/* â”€â”€â”€ Scroll Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function getPhaseRange(index: number) {
    const start = HEADER_END + index * PHASE_DURATION;
    const end = start + PHASE_DURATION;
    return { start, end };
}

function usePhaseAnimation(progress: MotionValue<number>, index: number) {
    const { start, end } = getPhaseRange(index);
    const dur = end - start;

    const enterStart = start;
    const enterEnd = start + dur * 0.3;
    const exitStart = end - dur * 0.3;
    const exitEnd = end;

    const opacity = useTransform(
        progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [40, 0, 0, -40]
    );

    return { opacity, y };
}

function useMockupAnimation(progress: MotionValue<number>, index: number) {
    const { start, end } = getPhaseRange(index);
    const dur = end - start;
    const stagger = dur * 0.05;

    const enterStart = start + stagger;
    const enterEnd = start + dur * 0.3 + stagger;
    const exitStart = end - dur * 0.3;
    const exitEnd = end;

    const opacity = useTransform(
        progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        progress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [60, 0, 0, -30]
    );

    return { opacity, y };
}

/* â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function ProgressDots({ activePhase }: { activePhase: number }) {
    return (
        <div className="absolute top-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {PHASES.map((phase, i) => (
                <div key={phase.number} className="flex items-center gap-2">
                    <span
                        className={`block h-2 w-2 rounded-full transition-all duration-500 ${i === activePhase
                            ? "bg-brand-accent scale-125 shadow-[0_0_10px_rgba(var(--brand-accent-rgb), 0.6)]"
                            : i < activePhase
                                ? "bg-brand-accent/50"
                                : "bg-white/10"
                            }`}
                    />
                    {i < PHASES.length - 1 && (
                        <span
                            className={`block h-px w-6 transition-colors duration-500 ${i < activePhase ? "bg-brand-accent/40" : "bg-white/5"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

function StepCounter({ activePhase }: { activePhase: number }) {
    const display = activePhase >= 0 ? activePhase + 1 : 1;
    return (
        <span className="absolute top-8 right-8 z-20 font-mono text-xs tabular-nums text-zinc-600">
            {String(display).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")}
        </span>
    );
}

function StickyHeader({ progress, isInView }: { progress: MotionValue<number>; isInView: boolean }) {
    const opacity = useTransform(progress, [0, 0.02, 0.06, 0.08], [0, 1, 1, 0]);
    const y = useTransform(progress, [0, 0.02, 0.06, 0.08], [30, 0, 0, -20]);

    return (
        <motion.div
            style={{ opacity, y, willChange: "transform" }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
            <div className="mx-auto max-w-[90rem] px-6 lg:px-16 w-full">
                <div className="max-w-3xl">
                    <motion.span
                        variants={fadeUp()}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        {SECTION_HEADER.eyebrow}
                    </motion.span>
                    <motion.h2
                        variants={slideFromLeftContainer}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl"
                        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                    >
                        {splitWords(SECTION_HEADER.heading).map((word, index) => (
                            <motion.span
                                key={`${word}-${index}`}
                                variants={slideFromLeftItem}
                                style={{ display: "inline-block" }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            variants={slideFromLeftItem}
                            className="bg-gradient-to-br from-brand-accent-light to-brand-accent-light bg-clip-text text-transparent"
                            style={{ display: "inline-block" }}
                        >
                            {SECTION_HEADER.headingAccent}
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp(0.12)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl"
                    >
                        {SECTION_HEADER.subtitle}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}

function PhaseSlide({
    phase,
    index,
    progress,
}: {
    phase: Phase;
    index: number;
    progress: MotionValue<number>;
}) {
    const Icon = phase.icon;
    const { Mockup } = phase;

    const text = usePhaseAnimation(progress, index);
    const mockup = useMockupAnimation(progress, index);

    /* Pointer events only when phase is visible */
    const pointerEvents = useTransform(text.opacity, (v) =>
        v > 0.1 ? "auto" : "none"
    );

    return (
        <motion.div
            style={{ pointerEvents, willChange: "transform" }}
            className="absolute inset-0 z-10 flex items-center"
        >
            <div className="mx-auto max-w-[90rem] px-6 lg:px-16 w-full">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* â”€â”€ Text side â”€â”€ */}
                    <motion.div
                        style={{ opacity: text.opacity, y: text.y, willChange: "transform" }}
                        className="relative"
                    >
                        {/* Giant faded number */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-12 -left-4 select-none font-mono text-[10rem] font-black leading-none tracking-tighter text-white/[0.03]"
                        >
                            {phase.number}
                        </span>

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-accent/40 bg-brand-accent-deep/50 text-brand-accent-light shadow-[0_0_20px_rgba(var(--brand-accent-rgb), 0.15)]">
                                <Icon size={22} strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
                                {phase.label}
                            </h3>

                            {/* Description */}
                            <p className="mb-6 max-w-lg text-base leading-relaxed text-zinc-400">
                                {phase.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {phase.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* â”€â”€ Mockup side â”€â”€ */}
                    <motion.div
                        style={{ opacity: mockup.opacity, y: mockup.y, willChange: "transform" }}
                        className="max-h-[50vh] overflow-hidden"
                    >
                        <Mockup />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ProcessScroll() {
    const sectionRef = useRef<HTMLElement>(null);
    const isHeadingInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    /* â”€â”€ Active phase tracking â”€â”€ */
    const [activePhase, setActivePhase] = useState(-1);

    useMotionValueEvent(smoothProgress, "change", (v) => {
        if (v < HEADER_END) {
            setActivePhase(-1);
        } else {
            setActivePhase(
                Math.min(
                    Math.floor((v - HEADER_END) / PHASE_DURATION),
                    PHASES.length - 1
                )
            );
        }
    });

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative"
            style={{ height: TOTAL_HEIGHT }}
        >
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* â”€â”€ Sticky viewport â”€â”€ */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 40%, rgba(var(--brand-accent-dark-rgb), 0.04) 0%, rgba(var(--brand-accent-dark-rgb), 0) 55%), radial-gradient(ellipse at 80% 60%, rgba(var(--brand-accent-rgb), 0.03) 0%, rgba(var(--brand-accent-rgb), 0) 50%)",
                    }}
                />

                {/* Progress dots + step counter */}
                <ProgressDots activePhase={activePhase} />
                <StepCounter activePhase={activePhase} />

                {/* Section header (fades out before phases) */}
                <StickyHeader progress={smoothProgress} isInView={isHeadingInView} />

                {/* Phase slides */}
                {PHASES.map((phase, i) => (
                    <PhaseSlide
                        key={phase.number}
                        phase={phase}
                        index={i}
                        progress={smoothProgress}
                    />
                ))}
            </div>
        </section>
    );
}

