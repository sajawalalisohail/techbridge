"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
    { number: "01", title: "Map", description: "Turn vague requests into one visible operating picture" },
    { number: "02", title: "Design", description: "Define architecture and failure paths up front" },
    { number: "03", title: "Build", description: "Ship in visible increments, not one giant reveal" },
    { number: "04", title: "Launch", description: "Go live with observability and iteration hooks" },
];

export default function ProcessTimeline() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative py-16 lg:py-20">
            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* Eyebrow */}
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    <span className="h-px w-4 bg-brand-accent/40" />
                    how we work
                </motion.span>

                {/* Timeline row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                            className="relative lg:pr-8"
                        >
                            {/* Connecting line (desktop only, not on last item) */}
                            {index < STEPS.length - 1 && (
                                <div className="absolute right-0 top-5 hidden h-px w-8 bg-gradient-to-r from-brand-accent/40 to-brand-accent/10 lg:block" />
                            )}

                            <span className="mb-3 block font-mono text-3xl font-black tracking-tight text-white/[0.08]">
                                {step.number}
                            </span>
                            <h3 className="mb-2 text-base font-semibold text-white">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
