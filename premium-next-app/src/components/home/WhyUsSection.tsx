"use client";

import { type ComponentType, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import CodeTypingAnimation from "./why-us/CodeTypingAnimation";
import OrgChartAnimation from "./why-us/OrgChartAnimation";
import TimelineBarsAnimation from "./why-us/TimelineBarsAnimation";
import GuaranteeBadgeAnimation from "./why-us/GuaranteeBadgeAnimation";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Reason {
    tag: string;
    headline: string;
    description: string;
    proof: string;
    tagline: string;
    Animation: ComponentType<{ isInView: boolean }>;
}

const REASONS: Reason[] = [
    {
        tag: "how we build",
        headline: "AI from line one",
        description:
            "We do not bolt AI on at the end. Every system we build ships with machine-readable APIs and automation hooks from day one.",
        proof: "Machine-ready interfaces and automation hooks are part of the first version, not the retrofit plan.",
        tagline: "Not bolted on later.",
        Animation: CodeTypingAnimation,
    },
    {
        tag: "who you work with",
        headline: "No middlemen. No juniors.",
        description:
            "You talk to the person writing your code, not a project manager who translates the requirement twice and still gets it wrong.",
        proof: "Slack, repos, standups, and direct conversation with the people shipping the work.",
        tagline: "Direct access. Always.",
        Animation: OrgChartAnimation,
    },
    {
        tag: "speed",
        headline: "Fast because the lane is sharp",
        description:
            "We ship quickly because the operating rhythm is tight, not because we skip structure. The process is tuned so quality and pace reinforce each other.",
        proof: "MVPs in weeks, websites in 24 hours, and working software showing up every week instead of one giant reveal.",
        tagline: "Weeks, not quarters.",
        Animation: TimelineBarsAnimation,
    },
    {
        tag: "accountability",
        headline: "Replacement guarantee",
        description:
            "If an engineer on your team is not performing or is not the right fit, we replace them fast, free, and without pushing the risk back onto your timeline.",
        proof: "The model absorbs the fit risk instead of making your team restart hiring from zero.",
        tagline: "Your risk, eliminated.",
        Animation: GuaranteeBadgeAnimation,
    },
];

function ReasonCard({ reason }: { reason: Reason }) {
    const ref = useRef<HTMLDivElement>(null);
    const isCenterView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    const hasEntered = useInView(ref, { once: true, margin: "-15%" });
    const { Animation } = reason;

    return (
        <motion.div
            ref={ref}
            animate={{ opacity: isCenterView ? 1 : 0.15 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[80vh] flex-col justify-center py-16 lg:min-h-[80vh]"
        >
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {reason.tag}
            </p>

            <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                {reason.headline}
            </h3>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
                {reason.description}
            </p>

            <div className="mb-6 max-w-sm">
                <Animation isInView={hasEntered} />
            </div>

            <div className="max-w-md rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Why it matters
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{reason.proof}</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-5 flex-shrink-0 bg-brand-accent/60" />
                <p className="text-sm font-semibold text-zinc-300">{reason.tagline}</p>
            </div>
        </motion.div>
    );
}

export default function WhyUsSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section aria-label="Why choose us" className="relative py-24 lg:py-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_1fr] lg:gap-24">
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
                            {splitWords("Four reasons we're different.").map((word, index) => (
                                <motion.span key={`w-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
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

                    <div>
                        {REASONS.map((reason) => (
                            <ReasonCard key={reason.headline} reason={reason} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
