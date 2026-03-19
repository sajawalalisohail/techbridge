"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 6000;

/* ─── Data ─────────────────────────────────────────────── */

interface CaseStudy {
    tag: string;
    name: string;
    description: string;
    metric: string;
    metricLabel: string;
    slug: string;
}

const STUDIES: CaseStudy[] = [
    {
        tag: "Revenue Operations Platform",
        name: "SignalOps Control Center",
        description:
            "A unified revenue operations platform that consolidated fragmented sales data into a single source of truth — cutting weekly reporting time by more than half.",
        metric: "62%",
        metricLabel: "Faster Weekly Reporting",
        slug: "signalops-control-center",
    },
    {
        tag: "Supply Chain Intelligence",
        name: "StockPulse AI",
        description:
            "An AI-driven supply chain intelligence system generating millions of demand predictions monthly, keeping inventory lean and fulfillment fast.",
        metric: "3.2M+",
        metricLabel: "Predictions Generated Monthly",
        slug: "stockpulse-ai",
    },
    {
        tag: "Fitness & Wellness",
        name: "Buff Dudes",
        description:
            "A cross-platform fitness app for one of YouTube's largest fitness channels — workout programs, nutrition tracking, and community, all in one place.",
        metric: "50k+",
        metricLabel: "App Downloads",
        slug: "buff-dudes",
    },
    {
        tag: "Enterprise Internal Tools",
        name: "Internal Ops Dashboard",
        description:
            "A custom operations dashboard that replaced four separate spreadsheets and two manual processes, reducing ops overhead by 40%.",
        metric: "40%",
        metricLabel: "Reduction in Ops Overhead",
        slug: "internal-ops-dashboard",
    },
    {
        tag: "B2B Apparel Website",
        name: "PrimeMark Apparel",
        description:
            "A high-performance digital storefront that transformed global supply chain operations and dramatically improved inbound lead quality.",
        metric: "12x",
        metricLabel: "Lead Quality Improvement",
        slug: "primemark",
    },
];

/* ─── Slide animation variants ─────────────────────────── */

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "60%" : "-60%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.45, ease: EASE },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-60%" : "60%",
        opacity: 0,
        transition: { duration: 0.3, ease: EASE },
    }),
};

/* ─── Main Component ───────────────────────────────────── */

export default function CaseStudiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const study = STUDIES[activeIndex];

    const navigate = useCallback(
        (dir: 1 | -1) => {
            setDirection(dir);
            setActiveIndex((prev) => (prev + dir + STUDIES.length) % STUDIES.length);
        },
        []
    );

    const goTo = useCallback((index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    }, [activeIndex]);

    /* Auto-advance */
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % STUDIES.length);
        }, AUTO_ADVANCE_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeIndex]);

    /* Swipe handler for mobile */
    const handleDragEnd = useCallback(
        (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
            if (info.offset.x > 50 || info.velocity.x > 200) {
                navigate(-1);
            } else if (info.offset.x < -50 || info.velocity.x < -200) {
                navigate(1);
            }
        },
        [navigate]
    );

    return (
        <section
            ref={sectionRef}
            aria-label="Case studies"
            aria-roledescription="carousel"
            className="relative overflow-hidden py-24 lg:py-32"
        >
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 100% 50%, rgba(var(--brand-accent-dark-rgb), 0.05) 0%, transparent 50%)",
                }}
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Header */}
                <div ref={headerRef} className="mb-14 flex flex-col gap-6">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        proof, not promises
                    </motion.span>

                    <div className="flex flex-wrap items-end gap-5">
                        <motion.h2
                            variants={slideFromLeftContainer}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                        >
                            {splitWords("Real clients. Real").map((word, i) => (
                                <motion.span key={`w-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            ))}
                            <motion.span
                                variants={slideFromLeftItem}
                                className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                            >
                                numbers.
                            </motion.span>
                        </motion.h2>

                        {/* Inline stat badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-1 flex-shrink-0 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-2"
                        >
                            <span className="font-mono text-sm font-bold text-brand-accent-light">50+</span>
                            <span className="ml-1.5 text-xs text-zinc-500">Systems in Production</span>
                        </motion.div>
                    </div>

                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-brand-accent-light"
                    >
                        See All Projects
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Spotlight area */}
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 backdrop-blur-sm">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={study.slug}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragDirectionLock
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.12}
                                onDragEnd={handleDragEnd}
                                aria-label={`Case study ${activeIndex + 1} of ${STUDIES.length}: ${study.name}`}
                                className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
                            >
                                {/* Left — text */}
                                <div className="flex flex-col justify-center">
                                    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        {study.tag}
                                    </p>
                                    <h3 className="mb-4 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
                                        {study.name}
                                    </h3>
                                    <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
                                        {study.description}
                                    </p>
                                    <Link
                                        href={`/work/${study.slug}`}
                                        className="group inline-flex items-center gap-2 text-sm font-medium text-brand-accent-light transition-colors duration-200 hover:text-white"
                                    >
                                        View Case Study
                                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>

                                {/* Right — metric */}
                                <div className="flex flex-col items-start justify-center lg:items-center">
                                    <span className="text-5xl font-bold tracking-tight text-white lg:text-6xl xl:text-7xl">
                                        {study.metric}
                                    </span>
                                    <span className="mt-2 text-sm uppercase tracking-widest text-zinc-500">
                                        {study.metricLabel}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Desktop arrows */}
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Previous case study"
                        className="absolute -left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 p-2.5 text-zinc-400 backdrop-blur-sm transition-colors duration-200 hover:border-brand-accent/40 hover:text-white lg:flex"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        aria-label="Next case study"
                        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 p-2.5 text-zinc-400 backdrop-blur-sm transition-colors duration-200 hover:border-brand-accent/40 hover:text-white lg:flex"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Progress dots */}
                <div
                    role="tablist"
                    aria-label="Case study navigation"
                    className="mt-8 flex items-center justify-center gap-2"
                >
                    {STUDIES.map((s, i) => (
                        <button
                            key={s.slug}
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Go to ${s.name}`}
                            onClick={() => goTo(i)}
                            className="relative h-1.5 w-8 overflow-hidden rounded-full bg-zinc-800 transition-colors duration-300"
                        >
                            {i === activeIndex && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-brand-accent-light"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        duration: AUTO_ADVANCE_MS / 1000,
                                        ease: "linear",
                                    }}
                                    style={{ originX: 0 }}
                                />
                            )}
                            {i !== activeIndex && i < activeIndex && (
                                <div className="absolute inset-0 rounded-full bg-zinc-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Visually hidden live region */}
                <div aria-live="polite" className="sr-only">
                    Showing case study {activeIndex + 1} of {STUDIES.length}: {study.name}
                </div>
            </div>
        </section>
    );
}
