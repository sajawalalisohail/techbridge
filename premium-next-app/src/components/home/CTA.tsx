"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { fadeUp, slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";

const ctaGlow = `
  @keyframes cta-pulse {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%       { opacity: 0.85; transform: scale(1.06); }
  }
  .cta-glow { animation: cta-pulse 5s ease-in-out infinite; }
`;

export default function CTA() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: ctaGlow }} />

            <section
                id="cta"
                ref={ref}
                /* z-10 + solid bg: covers the footer behind it until scroll reveals it */
                className="relative z-10 mt-10 overflow-hidden py-20 lg:mt-16 lg:py-28"
            >
                {/* â”€â”€ Subtle Grain Texture Overlay â”€â”€ */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "128px 128px",
                    }}
                />

                {/* â”€â”€ Subtle Gradient Mesh Background â”€â”€ */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at 20% 80%, rgba(var(--brand-accent-dark-rgb), 0.05) 0%, rgba(var(--brand-accent-dark-rgb), 0) 100%),
                            radial-gradient(ellipse at 80% 20%, rgba(var(--brand-accent-rgb), 0.04) 0%, rgba(var(--brand-accent-rgb), 0) 100%)
                        `,
                    }}
                />

                {/* â”€â”€ Radial glow anchor â”€â”€ */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 cta-glow"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(var(--brand-accent-dark-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0.04) 40%, rgba(var(--brand-accent-rgb), 0) 70%)",
                    }}
                />

                {/* Top separator hairline */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 z-[2] h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* â”€â”€ Content â”€â”€ */}
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
                    <motion.div
                        variants={fadeUp()}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {/* Eyebrow */}
                        <span className="mb-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                            next step
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={slideFromLeftContainer}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}
                    >
                        {splitWords("Stop Evaluating.").map((word, index) => (
                            <motion.span
                                key={`${word}-${index}`}
                                variants={slideFromLeftItem}
                                style={{ display: "inline-block" }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            variants={slideFromLeftItem}
                            className="bg-gradient-to-r from-brand-accent-light via-brand-accent-light to-brand-accent-light bg-clip-text text-transparent"
                            style={{ display: "inline-block" }}
                        >
                            Start Building.
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.2)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400"
                    >
                        Book a 30-minute call with the engineer who&apos;ll actually build your system.
                        No sales team. No discovery deck.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeUp(0.32)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        {/* Primary â€” gradient fill */}
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent-dark to-brand-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(var(--brand-accent-dark-rgb), 0.35)] transition-all duration-300 hover:shadow-brand-accent/10"
                        >
                            <span className="relative z-10">Book a Call, Free</span>
                            <ArrowRight
                                size={16}
                                className="relative z-10 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                            />
                            {/* Shimmer sweep */}
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </Link>

                        {/* Secondary â€” ghost with lime glow */}
                        <Link
                            href="/websites"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light hover:shadow-brand-accent/10"
                        >
                            <Zap size={14} strokeWidth={1.8} className="text-brand-accent-light" />
                            Or Get a Website in 24hrs
                        </Link>
                    </motion.div>

                    {/* Reassurance text */}
                    <motion.p
                        variants={fadeUp(0.5, 0)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="mt-8 text-xs text-zinc-600"
                    >
                        No retainers. No account managers. Just the people who write the code.
                    </motion.p>
                </div>
            </section>
        </>
    );
}

