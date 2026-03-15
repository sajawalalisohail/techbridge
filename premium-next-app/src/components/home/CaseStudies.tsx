"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getHomepageCaseStudies, type CaseStudy } from "@/data/case-studies";

const HOMEPAGE_STUDIES = getHomepageCaseStudies();

/* ─── Single Card ────── */
function StudyCard({ study, index }: { study: CaseStudy; index: number }) {
    return (
        <article
            className="case-card group relative flex h-[28rem] w-[22rem] flex-shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-lime-500/40 hover:bg-lime-500/5 sm:w-[26rem] lg:w-[28rem]"
            style={{ opacity: 0, transform: "translateY(40px)" }}
        >
            {/* Accent glow on hover */}
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
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {study.heroDescription}
                </p>
            </div>

            <div className="relative z-10">
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
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-lime-300"
                >
                    View Case Study
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
}

/* ─── Main Section ────── */
export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;
        if (!section || !track || !progress) return;

        const ctx = gsap.context(() => {
            // Calculate scroll distance
            const getScrollAmount = () => {
                return -(track.scrollWidth - window.innerWidth);
            };

            // Mobile: vertical stacked (no pin)
            const mm = ScrollTrigger.matchMedia({
                // Desktop: horizontal scroll
                "(min-width: 768px)": function () {
                    const tween = gsap.to(track, {
                        x: getScrollAmount,
                        ease: "none",
                    });

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: () => `+=${Math.abs(getScrollAmount())}`,
                        pin: true,
                        pinType: "transform",
                        scrub: 1,
                        animation: tween,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            gsap.set(progress, { scaleX: self.progress });
                        },
                    });

                    // Stagger card entrance
                    gsap.fromTo(
                        ".case-card",
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.08,
                            duration: 0.6,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                            },
                        }
                    );
                },
                // Mobile: simple scroll reveal
                "(max-width: 767px)": function () {
                    gsap.fromTo(
                        ".case-card",
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                            },
                        }
                    );
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="case-studies"
            ref={sectionRef}
            className="relative overflow-hidden"
        >
            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 0% 50%, rgba(101,163,13,0.05) 0%, rgba(101,163,13,0) 50%)",
                }}
            />

            {/* Header */}
            <div className="mx-auto max-w-[90rem] px-6 pt-28 lg:px-16 lg:pt-36">
                <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                            <span className="h-px w-4 bg-lime-500/40" />
                            proof, not promises
                        </span>
                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl">
                            Real clients. Real numbers.
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                            Platforms we architected, systems we built, and rapid websites to show we can move fast without cutting corners.
                        </p>
                    </div>
                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-lime-300"
                    >
                        See All Projects
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div
                ref={trackRef}
                className="flex gap-6 px-6 pb-28 md:flex-nowrap md:pb-12 flex-wrap lg:px-16"
                style={{ willChange: "transform" }}
            >
                {HOMEPAGE_STUDIES.map((study, i) => (
                    <StudyCard key={study.slug} study={study} index={i} />
                ))}
            </div>

            {/* Progress bar (desktop only) */}
            <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full w-full origin-left bg-lime-500/60 rounded-full"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </section>
    );
}
