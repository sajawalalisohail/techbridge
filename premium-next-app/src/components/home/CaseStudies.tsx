"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const CASE_STUDIES = [
    {
        id: 1,
        slug: "nextlex",
        client: "NextLex",
        sector: "Legal SaaS Marketing",
        metric: "14 Days",
        metricLabel: "From Concept to Live",
        description:
            "A premium marketing website for a legal document automation SaaS. Designed and deployed rapidly to support their high-growth acquisition strategy.",
        accentColor: "139,92,246", // violet
    },
    {
        id: 2,
        slug: "primemark",
        client: "PrimeMark Apparel",
        sector: "B2B Manufacturing",
        metric: "12×",
        metricLabel: "Increase in Lead Quality",
        description:
            "High-performance digital storefront streamlining global supply chain operations. A premium web presence built to capture enterprise leads.",
        accentColor: "99,102,241", // indigo
    },
    {
        id: 3,
        slug: "ali-wali",
        client: "AliWali Trading Co.",
        sector: "Global Logistics",
        metric: "35+",
        metricLabel: "Years of Trade Legacy",
        description:
            "A fast, modern digital presence for a direct buyer of industrial plied rubber conveyor belts. Replacing an outdated platform with zero downtime.",
        accentColor: "109,40,217", // violet-700
    },
];

/* ─── Animation variants ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Teaser Card ────────────────────────────────────────── */
function TeaserCard({ study }: { study: (typeof CASE_STUDIES)[number] }) {
    return (
        <motion.div
            variants={cardVariants}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
        >
            {/* Hover glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, rgba(${study.accentColor},0.15) 0%, rgba(${study.accentColor},0) 100%)`,
                }}
            />

            <div className="relative z-10 flex h-full flex-col">
                {/* Sector label */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        {study.sector}
                    </p>
                </div>

                {/* Key metric */}
                <div className="mb-4">
                    <span className="block font-mono text-5xl font-extrabold leading-none tracking-tight text-white mb-2">
                        {study.metric}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-zinc-400">
                        {study.metricLabel}
                    </span>
                </div>

                {/* Client name */}
                <h3 className="mb-2 text-xl font-semibold text-white">
                    {study.client}
                </h3>

                {/* Description (truncated to first sentence) */}
                <p className="text-sm leading-relaxed text-zinc-500 flex-1">
                    {study.description.split(". ")[0]}.
                </p>

                {/* CTA */}
                <div className="mt-8">
                    <Link
                        href={`/work/${study.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 group-hover:text-violet-400"
                    >
                        View Case Study
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function CaseStudies() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section
            id="case-studies"
            ref={ref}
            className="relative overflow-hidden py-28 lg:py-36"
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
                style={{
                    background:
                        "radial-gradient(ellipse at 0% 50%, rgba(79,70,229,0.03) 0%, rgba(79,70,229,0) 50%)",
                }}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-px w-6 bg-zinc-700" />
                            Proven Impact
                        </span>
                        <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                            Engineered for Scale.{" "}
                            <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                                Built for Results.
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/work"
                        className="group hidden lg:inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                    >
                        See All Work
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* ── 3-Column Grid ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {CASE_STUDIES.map((study) => (
                        <TeaserCard key={study.id} study={study} />
                    ))}
                </motion.div>

                {/* Mobile "See All Work" Link */}
                <div className="mt-10 lg:hidden">
                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                    >
                        See All Work
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
