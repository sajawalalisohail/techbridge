"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PHASES, EASE, SECTION_HEADER } from "./processData";

/* â”€â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.12, ease: EASE },
    }),
};

const contentVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE } },
};

/* â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ProcessStepper() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
    const stepsRef = useRef<HTMLDivElement>(null);
    const isStepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNodeClick = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const activePhase = PHASES[activeIndex];
    const Mockup = activePhase.Mockup;
    const Icon = activePhase.icon;

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
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(var(--brand-accent-dark-rgb), 0.03) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%)" }}
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* â”€â”€ Section Header â”€â”€ */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-16 max-w-3xl lg:mb-20"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                        {SECTION_HEADER.eyebrow}
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {SECTION_HEADER.heading}{" "}
                        <span className="bg-gradient-to-br from-brand-accent-light to-brand-accent-light bg-clip-text text-transparent">
                            {SECTION_HEADER.headingAccent}
                        </span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl">
                        {SECTION_HEADER.subtitle}
                    </p>
                </motion.div>

                {/* â”€â”€ Horizontal Stepper â”€â”€ */}
                <div ref={stepsRef}>
                    {/* Node bar */}
                    <div className="relative mb-12 flex items-center justify-between lg:mb-16">
                        {/* Background track line */}
                        <div aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/8" />

                        {/* Active progress line */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-brand-accent to-brand-accent-light"
                            initial={{ width: "0%" }}
                            animate={{
                                width: `${(activeIndex / (PHASES.length - 1)) * 100}%`,
                            }}
                            transition={{ duration: 0.6, ease: EASE }}
                        />

                        {/* Nodes */}
                        {PHASES.map((phase, i) => {
                            const NodeIcon = phase.icon;
                            const isActive = i === activeIndex;
                            const isPast = i < activeIndex;

                            return (
                                <motion.button
                                    key={phase.number}
                                    custom={i}
                                    variants={nodeVariants}
                                    initial="hidden"
                                    animate={isStepsInView ? "show" : "hidden"}
                                    onClick={() => handleNodeClick(i)}
                                    className={`relative z-10 flex flex-col items-center gap-3 cursor-pointer group`}
                                >
                                    {/* Circle node */}
                                    <div
                                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 lg:h-14 lg:w-14 ${isActive
                                            ? "border-brand-accent bg-brand-accent-deep shadow-[0_0_24px_rgba(var(--brand-accent-rgb), 0.5)]"
                                            : isPast
                                                ? "border-brand-accent/50 bg-brand-accent-deep/50"
                                                : "border-white/15 bg-neutral-900/60 group-hover:border-brand-accent/40"
                                            }`}
                                    >
                                        {/* Pulse ring on active */}
                                        {isActive && (
                                            <span className="absolute inset-0 rounded-full animate-ping bg-brand-accent/20" style={{ animationDuration: "2s" }} />
                                        )}
                                        <NodeIcon
                                            size={20}
                                            strokeWidth={1.5}
                                            className={`relative z-10 transition-colors duration-300 ${isActive
                                                ? "text-brand-accent-light"
                                                : isPast
                                                    ? "text-brand-accent-light/60"
                                                    : "text-zinc-500 group-hover:text-brand-accent-light"
                                                }`}
                                        />
                                    </div>

                                    {/* Label below */}
                                    <div className="text-center">
                                        <span className={`block font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-brand-accent-light" : "text-zinc-600"}`}>
                                            {phase.number}
                                        </span>
                                        <span className={`mt-0.5 block text-xs font-medium transition-colors duration-300 lg:text-sm ${isActive ? "text-white" : "text-zinc-500"}`}>
                                            {phase.label}
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* â”€â”€ Expanded Content Panel â”€â”€ */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={contentVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 backdrop-blur-sm"
                        >
                            {/* Active glow */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background: "radial-gradient(ellipse at 0% 50%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
                                }}
                            />

                            <div className="relative z-10 grid grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
                                {/* Text content */}
                                <div className="flex flex-col justify-center">
                                    <div className="mb-5 flex items-center gap-4">
                                        <span className="font-mono text-5xl font-bold leading-none tracking-tighter text-white drop-shadow-[0_0_20px_rgba(var(--brand-accent-rgb), 0.6)]">
                                            {activePhase.number}
                                        </span>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/40 bg-brand-accent-deep/50 text-brand-accent-light shadow-[0_0_15px_rgba(var(--brand-accent-rgb), 0.3)]">
                                            <Icon size={18} strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <h3 className="mb-3 text-2xl font-semibold leading-snug text-white lg:text-3xl">
                                        {activePhase.label}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-zinc-300 lg:text-base">
                                        {activePhase.description}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {activePhase.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs text-brand-accent-light"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Mockup */}
                                <div className="flex items-center justify-center">
                                    <Mockup />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

