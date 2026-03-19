"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
    {
        number: "01",
        title: "Map the Problem",
        description:
            "We identify bottlenecks and define one clear scope before touching a build.",
    },
    {
        number: "02",
        title: "Design the Architecture",
        description:
            "Integration maps, data boundaries, and failure paths — all defined up front.",
    },
    {
        number: "03",
        title: "Ship in Loops",
        description:
            "Short delivery cycles so you see real progress every week, not one giant reveal.",
    },
    {
        number: "04",
        title: "Launch & Monitor",
        description:
            "Go-live with monitoring, rollback paths, and next-iteration hooks built in.",
    },
];

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ProcessShowcase() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 100%, rgba(var(--brand-accent-rgb), 0.04) 0%, transparent 60%)",
                }}
            />

            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-14">
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

                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <motion.h2
                            variants={slideFromLeftContainer}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
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

                        {/* Inline stat badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                            className="flex-shrink-0 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-2"
                        >
                            <span className="font-mono text-sm font-bold text-brand-accent-light">3×</span>
                            <span className="ml-1.5 text-xs text-zinc-500">Faster Than In-House</span>
                        </motion.div>
                    </div>
                </div>

                {/* Horizontal steps */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.number}
                            variants={childFade}
                            className="relative"
                        >
                            {/* Connector line (desktop only, not on last item) */}
                            {i < STEPS.length - 1 && (
                                <div
                                    aria-hidden="true"
                                    className="absolute right-0 top-5 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-white/10 to-transparent lg:block"
                                    style={{ width: "calc(100% - 2.5rem)" }}
                                />
                            )}

                            <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6 backdrop-blur-sm h-full">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/5 font-mono text-xs font-bold text-brand-accent">
                                        {step.number}
                                    </span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                    className="mt-10"
                >
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-brand-accent-light"
                    >
                        See the full process
                        <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
