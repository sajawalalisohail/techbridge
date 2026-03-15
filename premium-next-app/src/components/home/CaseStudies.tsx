"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, slideFromRightContainer, slideFromRightItem, splitWords } from "@/components/shared/headingAnimations";
import { getHomepageCaseStudies, type CaseStudy } from "@/data/case-studies";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOMEPAGE_STUDIES = getHomepageCaseStudies();

function StandardCard({ study }: { study: CaseStudy }) {
    return (
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/40 hover:bg-violet-500/5">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at 100% 0%, rgba(${study.accentColor},0.18) 0%, rgba(${study.accentColor},0) 55%)`,
                }}
            />
            <div className="relative z-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
                    {study.sector}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {study.client}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {study.heroDescription}
                </p>
                <div className="mt-5">
                    <p className="font-mono text-4xl font-extrabold tracking-tight text-white">
                        {study.metric}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                        {study.metricLabel}
                    </p>
                </div>
                <Link
                    href={`/work/${study.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-violet-300"
                >
                    View Case Study
                    <ArrowRight size={14} />
                </Link>
            </div>
        </article>
    );
}

function RapidWebsiteFeature({ study }: { study: CaseStudy }) {
    return (
        <article className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-neutral-950/70 p-7 shadow-[0_0_40px_rgba(109,40,217,0.12)] backdrop-blur-sm lg:col-span-2 lg:p-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 10% 20%, rgba(${study.accentColor},0.24) 0%, rgba(${study.accentColor},0) 50%)`,
                }}
            />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                <div>
                    <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                        24-hour build
                    </span>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        {study.client}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                        {study.heroDescription}
                    </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-600">
                        why this is different
                    </p>
                    <p className="mt-3 font-mono text-5xl font-extrabold tracking-tight text-white">
                        {study.metric}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                        {study.metricLabel}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                        A real custom website shipped in 24 hours. Not a template. Not a WordPress install. Actual code.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={`/work/${study.slug}`}
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                        >
                            See the Breakdown
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        {study.liveUrl && (
                            <a
                                href={study.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white"
                            >
                                Visit Live Site
                            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function CaseStudies() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const rapidWebsite = HOMEPAGE_STUDIES.find(
        (study) => study.homepageHighlight === "rapid-website"
    );
    const standardStudies = HOMEPAGE_STUDIES.filter(
        (study) => study.homepageHighlight !== "rapid-website"
    );

    return (
        <section id="case-studies" ref={ref} className="relative overflow-hidden py-28 lg:py-36">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 0% 50%, rgba(79,70,229,0.05) 0%, rgba(79,70,229,0) 50%)",
                }}
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <motion.span
                            variants={fadeUp()}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                            <span className="h-px w-4 bg-violet-500/40" />
                            proof, not promises
                        </motion.span>
                        <motion.h2
                            variants={slideFromRightContainer}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl"
                            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                        >
                            {splitWords("Real clients. Real numbers.").map((word, index) => (
                                <motion.span
                                    key={`${word}-${index}`}
                                    variants={slideFromRightItem}
                                    style={{ display: "inline-block" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>
                        <motion.p
                            variants={fadeUp()}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg"
                        >
                            Platforms we architected, systems we built, and a rapid website to show we can move fast without cutting corners.
                        </motion.p>
                    </div>
                    <motion.div
                        variants={fadeUp()}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-violet-300"
                        >
                            See All Projects
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                    className="grid gap-6 lg:grid-cols-2"
                >
                    {standardStudies.map((study) => (
                        <StandardCard key={study.slug} study={study} />
                    ))}
                    {rapidWebsite && <RapidWebsiteFeature study={rapidWebsite} />}
                </motion.div>
            </div>
        </section>
    );
}
