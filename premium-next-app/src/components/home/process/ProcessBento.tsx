"use client";

import React, { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { PHASES, EASE, SECTION_HEADER } from "./processData";
import type { Phase } from "./processData";

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ─── Tilt Card ──────────────────────────────────────────── */
function BentoCard({ phase, index }: { phase: Phase; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = phase.icon;
    const { Mockup } = phase;

    // Phase 0 and 1 span 2 columns each on large screens
    const isWide = index < 2;

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }, []);

    return (
        <motion.div
            variants={cardVariants}
            className={`${isWide ? "md:col-span-2" : ""}`}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-[transform,border-color] duration-300 ease-out hover:border-violet-500/40"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Border gradient pseudo-effect */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, transparent 50%, rgba(99,102,241,0.1) 100%)",
                    }}
                />

                <div className="relative z-10 p-7 lg:p-8">
                    {/* Phase number + icon */}
                    <div className="mb-5 flex items-center justify-between">
                        <span className="font-mono text-4xl font-bold leading-none tracking-tighter text-white/[0.08] select-none group-hover:text-violet-300 transition-colors duration-500">
                            {phase.number}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-500 group-hover:border-violet-500/40 group-hover:bg-violet-500/5 group-hover:text-violet-300">
                            <Icon size={18} strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-semibold leading-snug text-white/90 group-hover:text-violet-300 transition-colors duration-500 lg:text-2xl">
                        {phase.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-violet-300 transition-colors duration-500">
                        {phase.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {phase.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500 transition-colors duration-500 group-hover:border-violet-500/40 group-hover:text-violet-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Mockup */}
                    <div className="mt-6">
                        <Mockup />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function ProcessBento() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
    const gridRef = useRef<HTMLDivElement>(null);
    const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

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
                style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(79,70,229,0.03) 0%, rgba(79,70,229,0) 50%)" }}
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
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                        {SECTION_HEADER.eyebrow}
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {SECTION_HEADER.heading}{" "}
                        <span className="bg-gradient-to-br from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            {SECTION_HEADER.headingAccent}
                        </span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-xl">
                        {SECTION_HEADER.subtitle}
                    </p>
                </motion.div>

                {/* ── Bento Grid ── */}
                <motion.div
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isGridInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-5"
                >
                    {PHASES.map((phase, index) => (
                        <BentoCard key={phase.number} phase={phase} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
