"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Data ─────────────────────────────────────────────── */

const STEPS = [
    {
        number: "01",
        title: "Map the Problem",
        description: "We identify bottlenecks and define one clear scope before touching a build.",
    },
    {
        number: "02",
        title: "Design the Architecture",
        description: "Integration maps, data boundaries, and failure paths — all defined up front.",
    },
    {
        number: "03",
        title: "Ship in Loops",
        description: "Short delivery cycles so you see real progress every week, not one giant reveal.",
    },
    {
        number: "04",
        title: "Launch & Monitor",
        description: "Go-live with monitoring, rollback paths, and next-iteration hooks built in.",
    },
];

const THRESHOLDS = [0.15, 0.40, 0.65, 0.85];

/* ─── Desktop Horizontal Stepper (scroll-driven) ───────── */

function DesktopStepper() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001,
    });

    const lineProgress = useTransform(smoothProgress, [0.08, 0.9], [0, 1]);

    useMotionValueEvent(smoothProgress, "change", (v) => {
        let step = 0;
        for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
            if (v >= THRESHOLDS[i]) {
                step = i;
                break;
            }
        }
        setActiveStep(step);
    });

    return (
        <div ref={sectionRef} className="hidden min-h-[250vh] w-full lg:block">
            <div className="sticky top-0 flex h-screen w-full flex-col justify-center">
                <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-10">
                    {/* Header */}
                    <div ref={headerRef} className="mb-16">
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
                                {splitWords("How the").map((word, i) => (
                                    <motion.span key={`w1-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={slideFromLeftItem}
                                    className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                                >
                                    delivery
                                </motion.span>
                                {splitWords("system works.").map((word, i) => (
                                    <motion.span key={`w2-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
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
                                <span className="font-mono text-sm font-bold text-brand-accent-light">3×</span>
                                <span className="ml-1.5 text-xs text-zinc-500">Faster Than In-House</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="relative">
                        {/* Background line */}
                        <div
                            aria-hidden="true"
                            className="absolute left-[1.5rem] right-[1.5rem] top-6 h-px bg-zinc-800"
                        />
                        {/* Active line fill */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute left-[1.5rem] top-6 h-px bg-gradient-to-r from-brand-accent to-brand-accent-light"
                            style={{
                                width: "calc(100% - 3rem)",
                                scaleX: lineProgress,
                                originX: 0,
                            }}
                        />

                        <div className="grid grid-cols-4 gap-4">
                            {STEPS.map((step, i) => {
                                const isActive = i <= activeStep;
                                const isFirst = i === 0;
                                const isLast = i === STEPS.length - 1;
                                return (
                                    <div key={step.number} className="relative pt-0">
                                        {/* Circle */}
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1 : 0.85,
                                                borderColor: isActive
                                                    ? "var(--brand-accent-light)"
                                                    : "rgb(63 63 70)",
                                                backgroundColor: isActive
                                                    ? "rgba(var(--brand-accent-rgb), 0.15)"
                                                    : "transparent",
                                            }}
                                            transition={{ duration: 0.4, ease: EASE }}
                                            className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[var(--surface-0)] ${isFirst ? "ml-0" : isLast ? "ml-auto" : "mx-auto"}`}
                                        >
                                            <span
                                                className={`font-mono text-xs font-bold transition-colors duration-300 ${isActive ? "text-brand-accent-light" : "text-zinc-600"
                                                    }`}
                                            >
                                                {step.number}
                                            </span>
                                        </motion.div>

                                        {/* Text */}
                                        <motion.div
                                            animate={{
                                                opacity: isActive ? 1 : 0.2,
                                                y: isActive ? 0 : 8,
                                            }}
                                            transition={{ duration: 0.5, ease: EASE }}
                                            className={`mt-6 ${isFirst ? "text-left" : isLast ? "text-right" : "text-center"}`}
                                        >
                                            <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                                            <p className={`max-w-[18rem] text-sm leading-relaxed text-zinc-500 ${isFirst ? "mr-auto" : isLast ? "ml-auto" : "mx-auto"}`}>
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12">
                        <Link
                            href="/services"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-brand-accent-light"
                        >
                            See the full process
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Mobile Vertical Stepper ──────────────────────────── */

function MobileStepper() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="w-full lg:hidden">
            <div className="mx-auto w-full max-w-[100rem] px-6">
                {/* Header */}
                <div className="mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        <span className="h-px w-4 bg-brand-accent/40" />
                        the delivery system
                    </motion.span>

                    <h2 className="w-full text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        How the{" "}
                        <span className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                            delivery
                        </span>{" "}
                        system works.
                    </h2>
                </div>

                {/* Vertical steps */}
                <div className="relative pl-8">
                    {/* Vertical line */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[11px] top-0 h-full w-px bg-zinc-800"
                    />

                    <div className="space-y-10">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                                    <span className="font-mono text-[9px] font-bold text-brand-accent-light">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mb-1 text-base font-bold text-white">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-10">
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-brand-accent-light"
                    >
                        See the full process
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Export ──────────────────────────────────────── */

export default function ProcessSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <section aria-label="Our process" className="relative py-24 lg:py-0">
            <DesktopStepper />
            <MobileStepper />
        </section>
    );
}
