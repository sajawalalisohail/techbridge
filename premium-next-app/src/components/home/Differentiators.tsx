"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, UserCheck, Zap, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DIFFERENTIATORS = [
    { icon: Cpu, label: "AI From Line One" },
    { icon: UserCheck, label: "No Middlemen. No Juniors." },
    { icon: Zap, label: "We Ship Fast Because We're Good" },
    { icon: ShieldCheck, label: "Code That Survives Your Series B" },
];

export default function Differentiators() {
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
                    why we&apos;re different
                </motion.span>

                {/* 4-column strip */}
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
                    {DIFFERENTIATORS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4"
                            >
                                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-light" />
                                <span className="text-sm font-semibold leading-snug text-white">
                                    {item.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
