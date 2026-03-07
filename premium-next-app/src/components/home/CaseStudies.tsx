"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyReel } from "@/components/remotion/CaseStudyReel";
import { PlayerRef } from "@remotion/player";

/* ─── Data ───────────────────────────────────────────────── */
const CASE_STUDIES = [
    {
        id: 1,
        client: "NextLex",
        sector: "Legal SaaS Marketing",
        metric: "14 Days",
        metricLabel: "From Concept to Live",
        description:
            "A premium marketing website for a legal document automation SaaS. Designed and deployed rapidly to support their high-growth acquisition strategy.",
        tags: ["Next.js", "Marketing Site", "SEO"],
        liveUrl: "https://nextlex.com",
        assets: ["/proofs/NextLex/1.png", "/proofs/NextLex/2.png", "/proofs/NextLex/3.png", "/proofs/NextLex/4.png"],
        accentColor: "rgb(139,92,246)", // violet
        accentOpacity: 0.15,
    },
    {
        id: 2,
        client: "PrimeMark Apparel",
        sector: "B2B Manufacturing",
        metric: "12x",
        metricLabel: "Increase in Lead Quality",
        description:
            "High-performance digital storefront streamlining global supply chain operations. A premium web presence built to capture enterprise leads.",
        tags: ["Corporate Site", "Lead Gen", "Performance"],
        liveUrl: "https://primemarkapparel.com",
        assets: ["/proofs/PrimeMark/1.png", "/proofs/PrimeMark/2.png", "/proofs/PrimeMark/3.png", "/proofs/PrimeMark/4.png"],
        accentColor: "rgb(99,102,241)", // indigo
        accentOpacity: 0.12,
    },
    {
        id: 3,
        client: "AliWali Trading Co.",
        sector: "Global Logistics",
        metric: "35+",
        metricLabel: "Years of Trade Legacy",
        description:
            "A fast, modern digital presence for a direct buyer of industrial plied rubber conveyor belts. Replacing an outdated platform with zero downtime.",
        tags: ["Next.js", "Global Reach", "B2B Portal"],
        liveUrl: "https://aliwalitradingco.com",
        assets: ["/proofs/AliWali/1.png", "/proofs/AliWali/2.png", "/proofs/AliWali/3.png", "/proofs/AliWali/4.png"],
        accentColor: "rgb(109,40,217)", // violet-700
        accentOpacity: 0.13,
    },
];

/* ─── Pinned Scroll Component ────────────────────────────── */
function PinnedCaseStudy({ study, index }: { study: (typeof CASE_STUDIES)[number], index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<PlayerRef>(null);

    // Track scroll over a 400vh container. The sticky part stays for 300vh.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"] // start entering view -> completely passed
    });

    // For kinetic text, we reveal on enter.
    const textOpacity = useTransform(scrollYProgress, [0.15, 0.22, 0.78, 0.85], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.15, 0.22, 0.78, 0.85], [40, 0, 0, -40]);

    // Scrub the video
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (playerRef.current) {
            const duration = 600; // Updated duration from the mapped reel
            // map a portion of scroll to the 600 frames. 0.22 to 0.78 matches the pinned duration
            const scrubVal = Math.max(0, Math.min(1, (latest - 0.22) / 0.56));
            const frameToSeek = Math.floor(scrubVal * duration);
            playerRef.current.seekTo(frameToSeek);
        }
    });

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full">
            <div className="sticky top-0 left-0 flex h-screen w-full flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-24 gap-12 overflow-hidden">

                {/* ── Left side: Kinetic Typography / Data ── */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="relative z-10 flex w-full flex-col justify-center lg:w-5/12"
                >
                    <div className="mb-8">
                        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-px w-6" style={{ backgroundColor: study.accentColor }} />
                            {study.sector}
                        </span>

                        {/* Kinetic Number */}
                        <div className="flex flex-col">
                            <motion.span
                                className="font-mono text-[5rem] font-extrabold leading-none tracking-tight lg:text-[7rem]"
                                style={{
                                    background: `linear-gradient(to bottom right, #fff, ${study.accentColor})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {study.metric}
                            </motion.span>
                            <span className="mt-2 text-sm font-medium tracking-widest text-zinc-400 uppercase">
                                {study.metricLabel}
                            </span>
                        </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                        {study.client}
                    </h3>

                    <p className="mb-8 max-w-md text-base leading-relaxed text-zinc-500">
                        {study.description}
                    </p>

                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        {study.liveUrl && (
                            <a
                                href={study.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-neutral-900/50 px-6 py-3 text-xs font-bold tracking-wide text-white transition-all duration-300 hover:border-white/20 hover:bg-neutral-800"
                            >
                                <span className="relative z-10 uppercase">Access Live Site</span>
                                <ArrowUpRight size={14} className="relative z-10 text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                                <div
                                    className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${study.accentColor.replace('rgb', 'rgba').replace(')', ', 0.1)')}, transparent)` }}
                                />
                            </a>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                                <span key={tag} className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    {"//"} {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Right side: Remotion Walkthrough ── */}
                <motion.div
                    style={{ opacity: textOpacity, scale: useTransform(textOpacity, [0, 1], [0.95, 1]) }}
                    className="relative w-full h-[50vh] lg:w-7/12 lg:h-[75vh]"
                >
                    <CaseStudyReel playerRef={playerRef} brand={study.client} assets={study.assets} theme={study.accentColor} />
                </motion.div>

            </div>
        </div>
    );
}


/* ─── Main Export ────────────────────────────────────────── */
export default function CaseStudies() {
    return (
        <section
            id="case-studies"
            className="relative bg-black"
        >
            {/* Ambient Background Grid for context */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none' }} />

            <div className="mx-auto max-w-7xl px-6 pt-32 lg:px-12">
                <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
                    <div>
                        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            <span className="h-px w-6 bg-zinc-700" />
                            Engineered for Scale
                        </span>
                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                            Proven <span className="bg-gradient-to-br from-zinc-300 to-zinc-600 bg-clip-text text-transparent">Impact.</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-zinc-500 lg:text-right font-mono">
                        {"//"} DATA-DRIVEN DIGITAL ARCHITECTURE
                        <br />
                        {"//"} REAL-WORLD OUTCOMES ACROSS INDUSTRIES
                    </p>
                </div>
            </div>

            {/* Scrolling Pinned Case Studies */}
            <div className="relative w-full">
                {CASE_STUDIES.map((study, index) => (
                    <PinnedCaseStudy key={study.id} study={study} index={index} />
                ))}
            </div>
        </section>
    );
}
