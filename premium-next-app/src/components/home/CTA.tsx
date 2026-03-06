"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

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
                className="relative z-10 overflow-hidden bg-neutral-950 py-36 lg:py-48"
            >
                {/* ── Radial glow anchor ── */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                    <div
                        className="cta-glow h-[560px] w-[560px] rounded-full blur-[120px]"
                        style={{
                            background:
                                "radial-gradient(ellipse, rgba(109,40,217,0.35) 0%, rgba(79,70,229,0.15) 50%, transparent 75%)",
                        }}
                    />
                </div>

                {/* Top separator hairline */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* ── Content ── */}
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Eyebrow */}
                        <span className="mb-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            <span className="h-px w-6 bg-zinc-700" />
                            Start Your Project
                            <span className="h-px w-6 bg-zinc-700" />
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                    >
                        Ready to Build{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
                            Leverage?
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400"
                    >
                        Partner with our engineers to build scalable custom software, or
                        launch a premium web presence in 24 hours.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        {/* Primary — gradient fill */}
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(109,40,217,0.35)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(109,40,217,0.55)]"
                        >
                            <span className="relative z-10">Book a Discovery Call</span>
                            <ArrowRight
                                size={16}
                                className="relative z-10 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                            {/* Shimmer sweep */}
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </Link>

                        {/* Secondary — ghost with violet glow */}
                        <Link
                            href="/websites"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:text-white hover:shadow-[0_0_24px_rgba(109,40,217,0.2)]"
                        >
                            <Zap size={14} strokeWidth={1.8} className="text-violet-400" />
                            Explore 24-Hour Websites
                        </Link>
                    </motion.div>

                    {/* Reassurance text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-8 text-xs text-zinc-600"
                    >
                        No retainers. No bloat. Just senior engineers and results.
                    </motion.p>
                </div>
            </section>
        </>
    );
}
