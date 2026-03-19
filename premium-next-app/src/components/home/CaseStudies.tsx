"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import { getHomepageCaseStudies, type CaseStudy } from "@/data/case-studies";

const HOMEPAGE_STUDIES = getHomepageCaseStudies();

/* ——— Single Card ——— */
function StudyCard({ study, isActive }: { study: CaseStudy; isActive: boolean }) {
    return (
        <article
            className={`case-card group relative flex h-[28rem] w-[85vw] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 sm:w-[22rem] md:w-[26rem] lg:w-[28rem] ${isActive
                ? "border-brand-accent/30 scale-[1.02]"
                : "border-white/8 lg:opacity-70 hover:-translate-y-1 hover:border-brand-accent/40 hover:bg-brand-accent/5"
                }`}
            style={{
                opacity: 0,
                transform: "translateY(40px)",
                boxShadow: isActive
                    ? "0 0 40px rgba(var(--brand-accent-rgb), 0.25), 0 0 80px rgba(var(--brand-accent-rgb), 0.08)"
                    : "none",
            }}
        >
            {/* Accent glow on hover */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
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

/* ——— Main Section ——— */
export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [shouldInitAnimation, setShouldInitAnimation] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(Math.floor(HOMEPAGE_STUDIES.length / 2));
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const updateActiveCard = useCallback((track: HTMLDivElement) => {
        const cards = Array.from(track.querySelectorAll<HTMLElement>(".case-card"));
        if (!cards.length) return;

        const viewportCenter = window.innerWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = i;
            }
        });

        setActiveCardIndex(closestIdx);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section) return;

        // Mobile native scroll active card tracking
        let removeScrollListener = () => { };
        if (track) {
            const handleNativeScroll = () => {
                if (window.innerWidth < 900) {
                    updateActiveCard(track);
                }
            };
            track.addEventListener("scroll", handleNativeScroll, { passive: true });

            // Initial check for mobile on mount
            const timeoutId = setTimeout(() => {
                if (window.innerWidth < 900) {
                    updateActiveCard(track);
                }
            }, 100);

            removeScrollListener = () => {
                track.removeEventListener("scroll", handleNativeScroll);
                clearTimeout(timeoutId);
            };
        }

        if (shouldInitAnimation) {
            return removeScrollListener;
        }

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
        return () => {
            observer.disconnect();
            removeScrollListener();
        };
    }, [shouldInitAnimation, updateActiveCard]);

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

                // Start: first card centered in viewport
                const firstCard = cards[0];
                const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
                const startX = viewportCenter - firstCardCenter;

                // End: last card centered in viewport
                const lastCard = cards[cards.length - 1];
                const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
                const endX = viewportCenter - lastCardCenter;

                const travel = Math.abs(endX - startX);
                const holdDistance = Math.max(window.innerWidth * 0.08, Math.min(140, travel * 0.15));

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

                            // Update active card based on center position
                            updateActiveCard(track);
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
    }, [shouldInitAnimation, updateActiveCard]);

    return (
        <section
            id="case-studies"
            ref={sectionRef}
            className="relative z-20 overflow-hidden"
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
                    <div>
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
                            {splitWords("Real clients. Real").map((word, index) => (
                                <motion.span
                                    key={`w1-${index}`}
                                    variants={slideFromLeftItem}
                                    style={{ display: "inline-block" }}
                                >
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
                className="flex flex-nowrap overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 px-6 pb-20 md:pb-28 lg:px-10 lg:pb-28 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ willChange: "transform", WebkitOverflowScrolling: "touch" }}
            >
                {HOMEPAGE_STUDIES.map((study, index) => (
                    <div key={study.slug} className="snap-center shrink-0 first:pl-2 lg:first:pl-0 last:pr-6 lg:last:pr-0">
                        <StudyCard study={study} isActive={index === activeCardIndex} />
                    </div>
                ))}
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
