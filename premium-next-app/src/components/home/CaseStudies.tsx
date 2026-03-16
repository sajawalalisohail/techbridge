"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import { getHomepageCaseStudies, type CaseStudy } from "@/data/case-studies";

const HOMEPAGE_STUDIES = getHomepageCaseStudies();

/* â”€â”€â”€ Single Card â”€â”€â”€â”€â”€â”€ */
function StudyCard({ study }: { study: CaseStudy }) {
    return (
        <article
            className="case-card group relative flex h-[28rem] w-full flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-brand-accent/40 hover:bg-brand-accent/5 sm:w-[22rem] md:w-[26rem] lg:w-[28rem]"
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
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-brand-accent-light"
                >
                    View Case Study
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
}

/* â”€â”€â”€ Main Section â”€â”€â”€â”€â”€â”€ */
export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [shouldInitAnimation, setShouldInitAnimation] = useState(false);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || shouldInitAnimation) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldInitAnimation(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "400px 0px",
                threshold: 0,
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [shouldInitAnimation]);

    // useLayoutEffect ensures GSAP pin cleanup runs synchronously before React
    // removes DOM nodes during client-side navigation (prevents removeChild error)
    useLayoutEffect(() => {
        if (!shouldInitAnimation) return;

        const section = sectionRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;
        if (!section || !track || !progress) return;

        const localTriggers: ScrollTrigger[] = [];
        const localTweens: gsap.core.Tween[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let matchMediaCleanup: any = null;

        const ctx = gsap.context(() => {
            const getDesktopLayout = () => {
                const cards = Array.from(track.querySelectorAll<HTMLElement>(".case-card"));
                const gap = parseFloat(window.getComputedStyle(track).gap || "24");

                if (!cards.length) {
                    return {
                        startX: 0,
                        endX: 0,
                        travel: 0,
                        holdDistance: window.innerWidth * 0.18,
                    };
                }

                const viewportCenter = window.innerWidth / 2;
                const lastCard = cards[cards.length - 1];
                const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
                const naturalEndX = viewportCenter - lastCenter;
                const endNudge = Math.max(72, Math.min(160, window.innerWidth * 0.12));
                const maxLeftTravel = -(track.scrollWidth - window.innerWidth + gap + endNudge);
                const startX = 0;
                const endX = Math.max(naturalEndX, maxLeftTravel);
                const travel = Math.abs(endX - startX);
                const holdDistance = Math.max(window.innerWidth * 0.16, Math.min(220, travel * 0.32));

                return { startX, endX, travel, holdDistance };
            };

            // Mobile: vertical stacked (no pin)
            matchMediaCleanup = ScrollTrigger.matchMedia({
                // Desktop: horizontal scroll
                "(min-width: 900px)": function () {
                    gsap.set(track, { x: () => getDesktopLayout().startX });

                    const pinTrigger = ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: () => {
                            const layout = getDesktopLayout();
                            return `+=${Math.max(layout.travel + layout.holdDistance * 2, window.innerWidth * 0.9)}`;
                        },
                        pin: true,
                        pinType: "transform",
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const layout = getDesktopLayout();
                            const baseX = gsap.utils.interpolate(layout.startX, layout.endX, self.progress);
                            const settleOffset =
                                self.direction < 0 && self.progress < 0.085
                                    ? Math.sin((self.progress / 0.085) * Math.PI) * Math.min(42, window.innerWidth * 0.032)
                                    : 0;

                            gsap.set(track, { x: baseX + settleOffset });
                            gsap.set(progress, { scaleX: self.progress });
                        },
                        onRefresh: () => {
                            gsap.set(track, { x: getDesktopLayout().startX });
                        },
                    });
                    localTriggers.push(pinTrigger);

                    // Stagger card entrance
                    const cardsTween = gsap.fromTo(
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
                    localTweens.push(cardsTween);
                },
                // Mobile: simple scroll reveal
                "(max-width: 899px)": function () {
                    gsap.set(track, { clearProps: "x" });
                    const cardsTween = gsap.fromTo(
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
                    localTweens.push(cardsTween);
                },
            });
        }, section);

        return () => {
            localTriggers.forEach((trigger) => trigger.kill());
            localTweens.forEach((tween) => tween.kill());
            matchMediaCleanup?.revert();
            ctx.revert();
        };
    }, [shouldInitAnimation]);

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
                        "radial-gradient(ellipse at 0% 50%, rgba(var(--brand-accent-dark-rgb), 0.05) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%)",
                }}
            />

            {/* Header */}
            <div className="mx-auto max-w-[100rem] px-6 pt-20 lg:px-10 lg:pt-24">
                <div ref={headerRef} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            proof, not promises
                        </span>
                        <motion.h2
                            variants={slideFromLeftContainer}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl"
                            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                        >
                            {splitWords("Real clients. Real numbers.").map((word, index) => (
                                <motion.span
                                    key={`${word}-${index}`}
                                    variants={slideFromLeftItem}
                                    style={{ display: "inline-block" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>
                        <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                            Platforms we architected, systems we built, and rapid websites to show we can move fast without cutting corners.
                        </p>
                    </div>
                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-brand-accent-light"
                    >
                        See All Projects
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div
                ref={trackRef}
                className="flex flex-wrap gap-6 px-6 pb-36 md:pb-28 lg:flex-nowrap lg:px-10 lg:pb-28"
                style={{ willChange: "transform" }}
            >
                {HOMEPAGE_STUDIES.map((study) => (
                    <StudyCard key={study.slug} study={study} />
                ))}
            </div>

            {/* View all link */}
            <div className="mx-auto max-w-[100rem] px-6 pb-8 text-center lg:px-10">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-brand-accent-light"
                >
                    View all projects
                    <ArrowRight size={14} />
                </Link>
            </div>

            {/* Progress bar (desktop only) */}
            <div className="absolute bottom-8 left-1/2 hidden h-0.5 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-white/10 md:block lg:bottom-8">
                <div
                    ref={progressRef}
                    className="h-full w-full origin-left bg-brand-accent/60 rounded-full"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </section>
    );
}
