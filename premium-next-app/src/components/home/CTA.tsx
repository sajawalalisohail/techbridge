"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { fadeUp } from "@/components/shared/headingAnimations";

export default function CTA() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="relative z-10 px-6 py-24 lg:px-10 lg:py-32">
            <motion.div
                ref={ref}
                variants={fadeUp()}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 px-8 py-10 backdrop-blur-sm sm:px-12 sm:py-12 lg:rounded-[2rem]"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 30% 50%, rgba(var(--brand-accent-dark-rgb), 0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(var(--brand-accent-rgb), 0.06) 0%, transparent 55%)",
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
                    {/* Text */}
                    <div className="flex-1">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            next step
                        </span>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Stop Evaluating. Start{" "}
                            <span className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                                Building.
                            </span>
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 lg:text-base">
                            Book a 30-minute call with the engineer who&apos;ll actually build your system. No sales team. No discovery deck.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent-dark to-brand-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(var(--brand-accent-dark-rgb),0.3)] transition-all duration-300 hover:shadow-brand-accent/10"
                        >
                            <span className="relative z-10">Book a Call, Free</span>
                            <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </Link>
                        <Link
                            href="/websites"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light"
                        >
                            <Zap size={14} strokeWidth={1.8} className="text-brand-accent-light" />
                            24hr Website
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
