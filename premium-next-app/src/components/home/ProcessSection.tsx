"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import StepOneProblem from "./process-v2/StepOneProblem";
import StepTwoArchitecture from "./process-v2/StepTwoArchitecture";
import StepThreeShip from "./process-v2/StepThreeShip";
import StepFourLaunch from "./process-v2/StepFourLaunch";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001,
    });

    const mobileLineHeight = useTransform(pathLength, [0, 1], ["0%", "100%"]);

    return (
        <section aria-label="Our delivery process" className="relative overflow-hidden py-24 lg:py-32">
            <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-10">
                <div ref={headerRef} className="mb-20 lg:mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        the delivery system
                    </motion.span>

                    <div className="flex flex-wrap items-end gap-5">
                        <motion.h2
                            variants={slideFromLeftContainer}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="w-full text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                        >
                            {splitWords("How the").map((word, index) => (
                                <motion.span key={`w1-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            ))}
                            <motion.span
                                variants={slideFromLeftItem}
                                className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                            >
                                delivery
                            </motion.span>
                            {splitWords("system works.").map((word, index) => (
                                <motion.span key={`w2-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-1 flex-shrink-0 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-2"
                        >
                            <span className="font-mono text-sm font-bold text-brand-accent-light">4 steps</span>
                            <span className="ml-1.5 text-xs text-zinc-500">One Operating Lane</span>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                        className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base"
                    >
                        The workflow keeps discovery, architecture, execution, and launch in one
                        lane. Each step produces a concrete output so the team always knows what was
                        decided, what shipped, and what happens next.
                    </motion.p>
                </div>

                <div ref={containerRef} className="relative flex w-full flex-col gap-24 lg:gap-40">
                    <div className="absolute inset-0 z-0 hidden pointer-events-none lg:block">
                        <svg className="h-full w-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 1200" fill="none">
                            <path
                                d="M 250 50 C 250 250, 750 150, 750 400 C 750 650, 250 550, 250 800 C 250 1050, 750 950, 750 1150"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="8 8"
                            />
                            <motion.path
                                d="M 250 50 C 250 250, 750 150, 750 400 C 750 650, 250 550, 250 800 C 250 1050, 750 950, 750 1150"
                                stroke="url(#gradientPulse)"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                            <defs>
                                <linearGradient id="gradientPulse" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--brand-accent)" />
                                    <stop offset="50%" stopColor="var(--brand-accent-light)" />
                                    <stop offset="100%" stopColor="#10B981" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="absolute inset-y-0 left-0 z-0 pl-[40px] pointer-events-none lg:hidden">
                        <div className="relative h-full w-px bg-white/10">
                            <motion.div
                                className="absolute left-0 top-0 w-full bg-gradient-to-b from-brand-accent via-brand-accent-light to-emerald-500 shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.8)]"
                                style={{ height: mobileLineHeight }}
                            />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <StepOneProblem />
                    </div>
                    <div className="relative z-10">
                        <StepTwoArchitecture />
                    </div>
                    <div className="relative z-10">
                        <StepThreeShip />
                    </div>
                    <div className="relative z-10">
                        <StepFourLaunch />
                    </div>
                </div>
            </div>
        </section>
    );
}
