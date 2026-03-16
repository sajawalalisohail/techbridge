"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { InteriorHeroBlob } from "@/components/shared/InteriorHeroBlob";
import { PageFooterGlow } from "@/components/shared/PageFooterGlow";
import { INSIGHTS } from "@/data/insights";

/* â”€â”€â”€ Animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* â”€â”€â”€ Format Date â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/* â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function InsightsPage() {
    const heroRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-hidden min-h-screen">

                {/* â”€â”€ Hero â”€â”€ */}
                <section
                    ref={heroRef}
                    className="relative flex min-h-[45vh] items-center overflow-hidden border-b border-white/5"
                >
                    <InteriorHeroBlob preset="insights" />

                    <div className="relative z-10 mx-auto max-w-[100rem] px-6 py-28 lg:px-10">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                        >
                            <span className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                                Engineering Insights
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                            className="text-5xl font-bold tracking-tight text-white lg:text-6xl xl:text-7xl"
                        >
                            Insights{" "}
                            <span className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                                from the Build.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
                        >
                            Architecture decisions, engineering lessons, and hard-won patterns
                            from shipping production systems for B2B enterprises.
                        </motion.p>
                    </div>
                </section>

                {/* â”€â”€ Article Grid â”€â”€ */}
                <section ref={gridRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isGridInView ? "show" : "hidden"}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {INSIGHTS.map((post) => (
                                <motion.article key={post.slug} variants={childFade}>
                                    <Link
                                        href={`/insights/${post.slug}`}
                                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                                    >
                                        {/* Hover glow */}
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                                            style={{
                                                background: "radial-gradient(ellipse at 50% 0%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 100%)",
                                            }}
                                        />

                                        <div className="relative z-10 flex h-full flex-col">
                                            {/* Meta */}
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="rounded-full border border-brand-accent/20 bg-brand-accent-deep/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                                                    {post.category}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-zinc-600">
                                                    <Clock size={12} />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-brand-accent-light">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-500">
                                                {post.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between border-t border-white/5 pt-5">
                                                <span className="text-xs text-zinc-600">
                                                    {formatDate(post.publishedAt)}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 group-hover:text-brand-accent-light">
                                                    Read
                                                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <PageFooterGlow />
            </div>
        </div>
    );
}

