"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
    CASE_STUDIES,
    getCaseStudy,
    getWorkSectionStudies,
    WORK_SECTION_META,
    type CaseStudy,
    type CaseStudyWorkSection,
} from "@/data/case-studies";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORK_SECTIONS: CaseStudyWorkSection[] = [
    "flagship-platforms",
    "systems-tools",
    "mobile-products",
    "rapid-websites",
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span className="h-px w-4 bg-violet-500/40" />
            {children}
        </span>
    );
}

function LeadProject({ project }: { project: CaseStudy }) {
    return (
        <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 backdrop-blur-sm lg:p-10">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 15% 20%, rgba(${project.accentColor},0.22) 0%, rgba(${project.accentColor},0) 55%)`,
                }}
            />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                            {project.sector}
                        </span>
                        {project.liveUrl && (
                            <span className="rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                                Live Project
                            </span>
                        )}
                    </div>
                    <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white lg:text-5xl">
                        {project.client}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 lg:text-lg">
                        {project.heroDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
                            Signature Outcome
                        </p>
                        <p className="mt-3 font-mono text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
                            {project.metric}
                        </p>
                        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
                            {project.metricLabel}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <Link
                            href={`/work/${project.slug}`}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(109,40,217,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(109,40,217,0.4)]"
                        >
                            Read Case Study
                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                            >
                                Visit Live Site
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

function ProjectCard({ project }: { project: CaseStudy }) {
    return (
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/55">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at 100% 0%, rgba(${project.accentColor},0.16) 0%, rgba(${project.accentColor},0) 55%)`,
                }}
            />
            <div className="relative z-10">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                            {project.sector}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                            {project.client}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-3xl font-extrabold tracking-tight text-white">
                            {project.metric}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                            {project.metricLabel}
                        </p>
                    </div>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400">
                    {project.heroDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Link
                        href={`/work/${project.slug}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-violet-400"
                    >
                        View Case Study
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-white"
                        >
                            Live
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

function WorkSection({ section, index }: { section: CaseStudyWorkSection; index: number }) {
    const meta = WORK_SECTION_META[section];
    const studies = getWorkSectionStudies(section);
    const lead = meta.highlightSlug ? getCaseStudy(meta.highlightSlug) : studies[0];
    const rest = studies.filter((study) => study.slug !== lead?.slug);

    if (!lead) return null;

    return (
        <section id={section} className={index > 0 ? "mt-24 lg:mt-32" : ""}>
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <SectionEyebrow>{meta.title}</SectionEyebrow>
                    <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        {meta.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                        {meta.description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {studies.map((study) => (
                        <span
                            key={study.slug}
                            className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-500"
                        >
                            {study.client}
                        </span>
                    ))}
                </div>
            </div>

            <LeadProject project={lead} />

            {rest.length > 0 && (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {rest.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default function WorkPage() {
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <div className="relative min-h-screen text-white">
            <div className="relative z-10 overflow-hidden min-h-screen">
                <section
                    ref={heroRef}
                    className="relative flex min-h-[52vh] items-center overflow-hidden border-b border-white/5"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at 72% 28%, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0) 55%), radial-gradient(circle at 0% 100%, rgba(79,70,229,0.08) 0%, rgba(79,70,229,0) 40%)",
                        }}
                    />
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE }}
                        >
                            <SectionEyebrow>Selected Work</SectionEyebrow>
                            <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-white lg:text-7xl xl:text-8xl">
                                Products, systems, and rapid websites arranged by what they actually are.
                            </h1>
                            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-zinc-400">
                                {CASE_STUDIES.length}+ projects across platforms, internal systems, mobile products,
                                and premium websites. The rapid website work is still here, just no longer framed as
                                flagship software platforms.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
                    <div className="flex flex-wrap gap-3">
                        {WORK_SECTIONS.map((section) => (
                            <a
                                key={section}
                                href={`#${section}`}
                                className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                            >
                                {WORK_SECTION_META[section].title}
                            </a>
                        ))}
                    </div>

                    <div className="mt-14">
                        {WORK_SECTIONS.map((section, index) => (
                            <WorkSection key={section} section={section} index={index} />
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/5">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    Next Engagement
                                </p>
                                <h2 className="text-3xl font-bold text-white lg:text-4xl">
                                    Ready to be our next case study?
                                </h2>
                            </div>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(109,40,217,0.5)]"
                            >
                                Book a Discovery Call
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
