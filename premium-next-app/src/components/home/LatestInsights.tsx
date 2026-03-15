"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { slideFromLeft } from "@/components/shared/headingAnimations";
import { INSIGHTS } from "@/data/insights";

/* â”€â”€â”€ Animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function LatestInsights() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    // Show only the 2 most recent
    const latest = INSIGHTS.slice(0, 2);

    return (
        <section ref={ref} className="relative overflow-hidden py-28 lg:py-36">
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="mx-auto max-w-[90rem] px-6 lg:px-16">
                {/* â”€â”€ Header â”€â”€ */}
                <div
                    ref={headerRef}
                    className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                            from the blog
                        </motion.span>
                        <motion.h2
                            variants={slideFromLeft}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl"
                        >
                            What we&apos;re thinking about.
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <Link
                            href="/insights"
                            className="group hidden lg:inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-brand-accent-light"
                        >
                            Read More
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* â”€â”€ Cards â”€â”€ */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                    {latest.map((post) => (
                        <motion.article key={post.slug} variants={childFade}>
                            <Link
                                href={`/insights/${post.slug}`}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-brand-accent/40 hover:bg-brand-accent/5"
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
                                    <h3 className="mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-brand-accent-light">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-500">
                                        {post.excerpt}
                                    </p>

                                    {/* CTA */}
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 group-hover:text-brand-accent-light">
                                        Read Insight
                                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Mobile "All Insights" */}
                <div className="mt-10 lg:hidden">
                    <Link
                        href="/insights"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-brand-accent-light"
                    >
                        Read More
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

