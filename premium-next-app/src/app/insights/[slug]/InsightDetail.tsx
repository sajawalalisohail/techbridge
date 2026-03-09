"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { InsightPost } from "@/data/insights";

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

/* ─── Format Date ────────────────────────────────────────── */
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/* ─── Main Client Component ──────────────────────────────── */
export default function InsightDetail({ post }: { post: InsightPost }) {
    const heroRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isBodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

    return (
        <div className="relative min-h-screen text-white">
            <div className="relative z-10 overflow-hidden">

                {/* ── Hero ── */}
                <section
                    ref={heroRef}
                    className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-white/5 pb-16 pt-32 lg:pt-40"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%)",
                        }}
                    />
                    <div className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-12">
                        {/* Back link */}
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                        >
                            <Link
                                href="/insights"
                                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
                            >
                                <ArrowLeft size={14} />
                                All Insights
                            </Link>
                        </motion.div>

                        {/* Meta */}
                        <motion.div
                            variants={fadeUp(0.05)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                            className="mb-6 flex flex-wrap items-center gap-3"
                        >
                            <span className="rounded-full border border-violet-500/20 bg-violet-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <Clock size={12} />
                                {post.readTime}
                            </span>
                            <span className="text-xs text-zinc-600">
                                {formatDate(post.publishedAt)}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUp(0.12)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                            className="text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Excerpt */}
                        <motion.p
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate={isHeroInView ? "show" : "hidden"}
                            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
                        >
                            {post.excerpt}
                        </motion.p>
                    </div>
                </section>

                {/* ── Body ── */}
                <section ref={bodyRef} className="py-16 lg:py-24">
                    <motion.div
                        variants={fadeUp(0)}
                        initial="hidden"
                        animate={isBodyInView ? "show" : "hidden"}
                        className="mx-auto max-w-3xl px-6 lg:px-12"
                    >
                        <article className="prose-tb">
                            <ReactMarkdown
                                components={{
                                    h2: ({ children }) => (
                                        <h2 className="mt-12 mb-5 text-2xl font-bold tracking-tight text-white first:mt-0">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="mt-8 mb-4 text-xl font-semibold tracking-tight text-white">
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-5 text-base leading-relaxed text-zinc-400 lg:text-lg lg:leading-relaxed">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="mb-6 space-y-2.5 pl-1">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="mb-6 space-y-2.5 pl-1 list-decimal list-inside">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="flex items-start gap-3 text-base leading-relaxed text-zinc-400 lg:text-lg">
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500/60" />
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-zinc-200">{children}</strong>
                                    ),
                                    code: ({ children }) => (
                                        <code className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-sm text-violet-300">
                                            {children}
                                        </code>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="my-6 border-l-2 border-violet-500/60 pl-6 italic text-zinc-300">
                                            {children}
                                        </blockquote>
                                    ),
                                    hr: () => (
                                        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                                    ),
                                }}
                            >
                                {post.body}
                            </ReactMarkdown>
                        </article>
                    </motion.div>
                </section>

                {/* ── Back to Insights CTA ── */}
                <div className="border-t border-white/5">
                    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
                        <Link
                            href="/insights"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                        >
                            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            Back to All Insights
                        </Link>
                    </div>
                </div>

                {/* Bottom glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 70%, rgba(139,92,246,0) 100%)',
                        boxShadow: '0 0 20px 4px rgba(109,40,217,0.25)',
                    }}
                />
            </div>
        </div>
    );
}
