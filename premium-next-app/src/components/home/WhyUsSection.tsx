"use client";

import { useRef, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import CodeTypingAnimation from "./why-us/CodeTypingAnimation";
import OrgChartAnimation from "./why-us/OrgChartAnimation";
import TimelineBarsAnimation from "./why-us/TimelineBarsAnimation";
import GuaranteeBadgeAnimation from "./why-us/GuaranteeBadgeAnimation";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Data ─────────────────────────────────────────────── */

interface Reason {
    tag: string;
    headline: string;
    description: string;
    tagline: string;
    Animation: ComponentType<{ isInView: boolean }>;
}

const REASONS: Reason[] = [
    {
        tag: "how we build",
        headline: "AI From Line One",
        description:
            "We don't bolt AI on at the end. Every system we build ships with machine-readable APIs and automation hooks from day one.",
        tagline: "Not bolted on later.",
        Animation: CodeTypingAnimation,
    },
    {
        tag: "who you work with",
        headline: "No Middlemen. No Juniors.",
        description:
            "You talk to the person writing your code. Not a project manager who translates your requirements wrong.",
        tagline: "Direct access. Always.",
        Animation: OrgChartAnimation,
    },
    {
        tag: "speed",
        headline: "We Ship Fast Because We're Good",
        description:
            "MVPs in weeks, websites in 24 hours. Not because we skip testing or write sloppy code. We've done this so many times the process is tight.",
        tagline: "Weeks, not quarters.",
        Animation: TimelineBarsAnimation,
    },
    {
        tag: "accountability",
        headline: "Replacement Guarantee",
        description:
            "If an engineer on your team isn't performing or isn't the right fit, we replace them — fast, free, no drama.",
        tagline: "Your risk, eliminated.",
        Animation: GuaranteeBadgeAnimation,
    },
];

/* ─── Reason Card ──────────────────────────────────────── */

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    // Center-of-viewport detection for opacity transitions
    const isCenterView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    // One-time trigger for animations
    const hasEntered = useInView(ref, { once: true, margin: "-15%" });

    const { Animation } = reason;

    return (
        <motion.div
            ref={ref}
            animate={{ opacity: isCenterView ? 1 : 0.15 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[80vh] flex-col justify-center py-16 lg:min-h-[80vh]"
        >
            {/* Tag */}
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {reason.tag}
            </p>

            {/* Headline */}
            <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                {reason.headline}
            </h3>

            {/* Description */}
            <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
                {reason.description}
            </p>

            {/* Unique micro-animation */}
            <div className="mb-6 max-w-sm">
                <Animation isInView={hasEntered} />
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3">
                <span className="h-px w-5 flex-shrink-0 bg-brand-accent/60" />
                <p className="text-sm font-semibold text-zinc-300">{reason.tagline}</p>
            </div>
        </motion.div>
    );
}

/* ─── Main Component ───────────────────────────────────── */

export default function WhyUsSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section aria-label="Why choose us" className="relative py-24 lg:py-32">
            {/* Top hairline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_1fr] lg:gap-24">
                    {/* ─── Left column (sticky on desktop) ─── */}
                    <div ref={headerRef} className="lg:sticky lg:top-[50vh] lg:-translate-y-1/2 lg:self-start">
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            why us, honestly
                        </motion.span>

                        <motion.h2
                            variants={slideFromLeftContainer}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="mb-2 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                        >
                            {splitWords("Four reasons we're different.").map((word, i) => (
                                <motion.span key={`w-${i}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                            className="mb-8 text-lg text-zinc-500"
                        >
                            Judge for yourself.
                        </motion.p>

                        {/* Stat badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-2"
                        >
                            <span className="font-mono text-sm font-bold text-brand-accent-light">98%</span>
                            <span className="ml-1.5 text-xs text-zinc-500">Client Retention</span>
                        </motion.div>
                    </div>

                    {/* ─── Right column (scrolling reasons) ─── */}
                    <div>
                        {REASONS.map((reason, i) => (
                            <ReasonCard key={reason.headline} reason={reason} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
