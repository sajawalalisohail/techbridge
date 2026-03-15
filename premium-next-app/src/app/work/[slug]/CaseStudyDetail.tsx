"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CountUp } from "@/components/shared/CountUp";
import type { CaseStudy } from "@/data/case-studies";

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── Parse numeric value from stat string ───────────────── */
function parseStatValue(stat: string): { numeric: number; prefix: string; suffix: string } | null {
    const match = stat.match(/^([^0-9]*)(\d[\d,.]*)(.*)$/);
    if (!match) return null;
    const numeric = parseFloat(match[2].replace(/,/g, ""));
    if (isNaN(numeric)) return null;
    return { prefix: match[1], numeric, suffix: match[3] };
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({
    images,
    initialIndex,
    onClose,
}: {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goNext = useCallback(() => {
        setCurrentIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, goNext, goPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10"
                aria-label="Close lightbox"
            >
                <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-zinc-500">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-white transition-colors hover:bg-white/10 sm:left-8"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-white transition-colors hover:bg-white/10 sm:right-8"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Image */}
            <div
                className="relative mx-12 max-h-[85vh] max-w-[90vw] sm:mx-20"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Screenshot ${currentIndex + 1}`}
                            width={1400}
                            height={900}
                            className="rounded-2xl border border-white/10 object-contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ─── Main Client Component ──────────────────────────────── */
export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
    const heroRef = useRef<HTMLElement>(null);
    const problemRef = useRef<HTMLElement>(null);
    const solutionRef = useRef<HTMLElement>(null);
    const resultsRef = useRef<HTMLElement>(null);
    const screenshotsRef = useRef<HTMLElement>(null);

    const isHeroInView = useInView(heroRef, { once: true });
    const isProblemInView = useInView(problemRef, { once: true, margin: "-80px" });
    const isSolutionInView = useInView(solutionRef, { once: true, margin: "-80px" });
    const isResultsInView = useInView(resultsRef, { once: true, margin: "-80px" });
    const isScreenshotsInView = useInView(screenshotsRef, { once: true, margin: "-80px" });

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="relative min-h-screen text-white">
            <div className="relative z-10 overflow-hidden">
                {/* ── 1. Hero ── */}
                <section
                    ref={heroRef}
                    className="relative flex min-h-[50vh] items-end overflow-hidden border-b border-white/5 pb-16 pt-32 lg:pt-40"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse at 30% 50%, rgba(${study.accentColor},0.08) 0%, rgba(${study.accentColor},0) 60%)`,
                        }}
                    />
                    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
                        {/* Back link */}
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                        >
                            <Link
                                href="/work"
                                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
                            >
                                <ArrowLeft size={14} />
                                Back to Work
                            </Link>
                        </motion.div>

                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                {/* Industry tag */}
                                <motion.div
                                    variants={fadeUp(0.05)}
                                    initial="hidden"
                                    animate={isHeroInView ? "show" : "hidden"}
                                >
                                    <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
                                        {study.sector}
                                    </span>
                                </motion.div>

                                {/* Title */}
                                <motion.h1
                                    variants={fadeUp(0.1)}
                                    initial="hidden"
                                    animate={isHeroInView ? "show" : "hidden"}
                                    className="mb-4 text-5xl font-bold tracking-tight text-white lg:text-6xl xl:text-7xl"
                                >
                                    {study.client}
                                </motion.h1>

                                {/* Description */}
                                <motion.p
                                    variants={fadeUp(0.18)}
                                    initial="hidden"
                                    animate={isHeroInView ? "show" : "hidden"}
                                    className="max-w-2xl text-lg leading-relaxed text-zinc-400"
                                >
                                    {study.heroDescription}
                                </motion.p>
                            </div>

                            {/* Big metric */}
                            <motion.div
                                variants={fadeUp(0.22)}
                                initial="hidden"
                                animate={isHeroInView ? "show" : "hidden"}
                                className="text-left lg:text-right"
                            >
                                <span className="block font-mono text-6xl font-extrabold leading-none tracking-tight text-white lg:text-7xl">
                                    {study.metric}
                                </span>
                                <span className="mt-2 block text-sm font-medium uppercase tracking-widest text-zinc-500">
                                    {study.metricLabel}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── 2. The Challenge ── */}
                <section ref={problemRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isProblemInView ? "show" : "hidden"}
                        >
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                                The Challenge
                            </span>
                            <div className="max-w-3xl space-y-6">
                                {study.problem.split("\n\n").map((paragraph, i) => (
                                    <p
                                        key={i}
                                        className="text-base leading-relaxed text-zinc-400 lg:text-lg"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Separator */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 3. Our Approach ── */}
                <section ref={solutionRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isSolutionInView ? "show" : "hidden"}
                        >
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                                Our Approach
                            </span>
                            <div className="max-w-3xl space-y-6">
                                {study.solution.split("\n\n").map((paragraph, i) => (
                                    <p
                                        key={i}
                                        className="text-base leading-relaxed text-zinc-400 lg:text-lg"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Separator */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 4. The Impact ── */}
                <section ref={resultsRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isResultsInView ? "show" : "hidden"}
                            className="mb-14"
                        >
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                                The Impact
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                Results that speak for themselves.
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isResultsInView ? "show" : "hidden"}
                            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            {study.results.map((result) => {
                                const parsed = parseStatValue(result.stat);
                                return (
                                    <motion.div
                                        key={result.label}
                                        variants={childFade}
                                        className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm"
                                    >
                                        <div className="mb-3 font-mono text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                                            {parsed ? (
                                                <CountUp
                                                    value={parsed.numeric}
                                                    prefix={parsed.prefix}
                                                    suffix={parsed.suffix}
                                                    className=""
                                                />
                                            ) : (
                                                result.stat
                                            )}
                                        </div>
                                        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                            {result.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ── 5. Tech Stack ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>
                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                            Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                            {study.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-400"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 6. Screenshots ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>
                {study.assets.length > 0 ? (
                    <section ref={screenshotsRef} className="py-24 lg:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <motion.div
                                variants={fadeUp(0)}
                                initial="hidden"
                                animate={isScreenshotsInView ? "show" : "hidden"}
                                className="mb-10"
                            >
                                <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" /><span className="h-px w-4 bg-lime-500/40" />
                                    Screenshots
                                </span>
                                <p className="text-sm text-zinc-500">
                                    Click any screenshot to expand.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate={isScreenshotsInView ? "show" : "hidden"}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {study.assets.map((asset, i) => (
                                    <motion.button
                                        key={asset}
                                        variants={childFade}
                                        onClick={() => openLightbox(i)}
                                        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-950 transition-all duration-300 hover:border-white/15"
                                    >
                                        <Image
                                            src={asset}
                                            alt={`${study.client} screenshot ${i + 1}`}
                                            width={800}
                                            height={500}
                                            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </motion.button>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                ) : (
                    <section className="py-24 lg:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/30 p-12 text-center backdrop-blur-sm">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        background: `radial-gradient(ellipse at 50% 50%, rgba(${study.accentColor},0.06) 0%, rgba(${study.accentColor},0) 70%)`,
                                    }}
                                />
                                <p className="relative z-10 text-sm font-medium text-zinc-600">
                                    Screenshots coming soon.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── 7. CTA ── */}
                <div className="border-t border-white/5">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                    Ready to build something{" "}
                                    <span className="bg-gradient-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent">
                                        like this?
                                    </span>
                                </h2>
                                <p className="mt-3 max-w-lg text-base text-zinc-400">
                                    Book a discovery call and let&apos;s talk about what
                                    TechBridge can engineer for your team.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-lime-600 to-lime-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(101,163,13,0.3)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(101,163,13,0.5)]"
                                >
                                    Book a Discovery Call
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </Link>
                                {study.liveUrl && (
                                    <a
                                        href={study.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-lime-500/40 hover:bg-lime-950/30"
                                    >
                                        View Live Site
                                        <ArrowUpRight
                                            size={14}
                                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(132,204,22,0) 0%, rgba(132,204,22,0.4) 30%, rgba(163,230,53,0.6) 50%, rgba(132,204,22,0.4) 70%, rgba(132,204,22,0) 100%)",
                        boxShadow: "0 0 20px 4px rgba(101,163,13,0.25)",
                    }}
                />
            </div>

            {/* ── Lightbox Overlay ── */}
            <AnimatePresence>
                {lightboxOpen && study.assets.length > 0 && (
                    <Lightbox
                        images={study.assets}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
