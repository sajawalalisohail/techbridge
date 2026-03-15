"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
    ClipReveal,
    fadeUp,
    slideFromLeftContainer,
    slideFromLeftItem,
    slideFromRightContainer,
    slideFromRightItem,
    splitWords,
    wordContainerVariants,
    wordVariants,
} from "@/components/shared/headingAnimations";
import {
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

const WORK_SECTION_ANIMATIONS = [
    { container: slideFromLeftContainer, item: slideFromLeftItem },
    { container: slideFromRightContainer, item: slideFromRightItem },
    { container: wordContainerVariants, item: wordVariants },
    { container: slideFromLeftContainer, item: slideFromLeftItem },
] as const;

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
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(109,40,217,0.25)] transition-all duration-300 hover:shadow-violet-500/10"
                        >
                            Read Case Study
                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/5"
                            >
                                Visit Live Site
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
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
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/40 hover:bg-violet-500/5">
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
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-violet-300"
                    >
                        View Case Study
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-violet-300"
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
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const headingAnimation = WORK_SECTION_ANIMATIONS[index];

    if (!lead) return null;

    return (
        <section ref={sectionRef} id={section} className={index > 0 ? "mt-24 lg:mt-32" : ""}>
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <SectionEyebrow>{meta.title}</SectionEyebrow>
                    <motion.h2
                        variants={headingAnimation.container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                    >
                        {splitWords(meta.title).map((word, wordIndex) => (
                            <motion.span
                                key={`${word}-${wordIndex}`}
                                variants={headingAnimation.item}
                                style={{ display: "inline-block" }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp(0.12)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mt-4 text-base leading-relaxed text-zinc-400"
                    >
                        {meta.description}
                    </motion.p>
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
    const ctaRef = useRef<HTMLDivElement>(null);
    const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });

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
                            <SectionEyebrow>the work</SectionEyebrow>
                            <motion.h1
                                variants={wordContainerVariants}
                                initial="hidden"
                                animate={isHeroInView ? "show" : "hidden"}
                                className="max-w-5xl text-5xl font-bold tracking-tight text-white lg:text-7xl xl:text-8xl"
                                style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                            >
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>Real</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>projects.</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>Real</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>clients.</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>Shipped</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>and</motion.span>
                                <motion.span variants={wordVariants} style={{ display: "inline-block" }}>running.</motion.span>
                            </motion.h1>
                            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-zinc-400">
                                Platforms, internal tools, mobile apps, and rapid websites.
                                Organized by what they actually are, not buzzword categories.
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
                                className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-violet-300"
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
                        <div ref={ctaRef} className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    your turn
                                </p>
                                <motion.div
                                    initial="hidden"
                                    animate={isCtaInView ? "show" : "hidden"}
                                    variants={fadeUp()}
                                >
                                    <ClipReveal>
                                    <h2 className="text-3xl font-bold text-white lg:text-4xl">
                                        Got a project that needs to actually ship?
                                    </h2>
                                    </ClipReveal>
                                </motion.div>
                            </div>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-violet-500/10"
                            >
                                Talk to an Engineer
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
