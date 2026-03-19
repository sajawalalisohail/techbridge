"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, BrainCircuit, Rocket, Users, type LucideIcon } from "lucide-react";
import { fadeUp, slideFromLeftContainer, slideFromLeftItem, splitWords } from "@/components/shared/headingAnimations";
import {
    AINativeIllustration,
    ZeroBloatIllustration,
    VelocityIllustration,
    ResilienceIllustration
} from "./illustrations";

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface Advantage {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    detail: string; // Bold pull-quote / differentiator
    accentA: string; // Orb A color
    accentB: string; // Orb B color
    Illustration: React.ComponentType;
}

const ADVANTAGES: Advantage[] = [
    {
        icon: BrainCircuit,
        eyebrow: "how we build",
        title: "AI From Line One",
        description:
            "We don't bolt AI on at the end. Every system we build ships with machine-readable APIs and automation hooks from day one. So you're not paying us again in six months to retrofit it.",
        detail: "Not bolted on later.",
        accentA: "rgba(var(--brand-accent-rgb), 0.18)",
        accentB: "rgba(var(--brand-accent-light-rgb), 0.12)",
        Illustration: AINativeIllustration,
    },
    {
        icon: Users,
        eyebrow: "who you work with",
        title: "No Middlemen. No Juniors.",
        description:
            "You talk to the person writing your code. Not a project manager who translates your requirements wrong, not a junior dev learning on your dime. And because our engineering team operates from Pakistan, you get senior-level talent at a fraction of US agency rates.",
        detail: "Slack the person writing your code.",
        accentA: "rgba(var(--brand-accent-light-rgb), 0.15)",
        accentB: "rgba(var(--brand-accent-light-rgb), 0.10)",
        Illustration: ZeroBloatIllustration,
    },
    {
        icon: Rocket,
        eyebrow: "speed",
        title: "We Ship Fast Because We're Good",
        description:
            "MVPs in weeks, websites in 24 hours. Not because we skip testing or write sloppy code. We've done this enough to know exactly where time gets wasted.",
        detail: "Weeks, not quarters.",
        accentA: "rgba(var(--brand-accent-light-rgb), 0.16)",
        accentB: "rgba(var(--brand-accent-light-rgb), 0.12)",
        Illustration: VelocityIllustration,
    },
    {
        icon: BadgeCheck,
        eyebrow: "accountability",
        title: "Replacement Guarantee",
        description:
            "If an engineer on your team isn't performing or isn't the right fit, we replace them — fast, free, no drama. We take full responsibility for the talent we place. That's not a policy footnote. That's how we operate.",
        detail: "Your risk, eliminated.",
        accentA: "rgba(var(--brand-accent-dark-rgb), 0.15)",
        accentB: "rgba(var(--brand-accent-rgb), 0.10)",
        Illustration: ResilienceIllustration,
    },
];

/* â”€â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
};

/* ─── Advantage Card ─────────────────────────────────── */
function AdvantageCard({ item, index }: { item: Advantage; index: number }) {
    const Icon = item.icon;
    const offset = index % 2 === 0 ? { x: -60, y: 0 } : { x: 60, y: 0 };
    const variants: import("framer-motion").Variants = {
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/40 hover:bg-brand-accent/5 lg:p-10"
        >
            {/* â”€â”€ Gradient mesh - always mounted, fades in on hover â”€â”€ */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            >
                {/* Orb A */}
                <div
                    className="mesh-orb-a absolute -left-16 -top-16 h-64 w-64 rounded-full blur-[80px]"
                    style={{ background: item.accentA }}
                />
                {/* Orb B */}
                <div
                    className="mesh-orb-b absolute -bottom-16 -right-16 h-56 w-56 rounded-full blur-[70px]"
                    style={{ background: item.accentB }}
                />
            </div>

            {/* Edge accent line - top */}
            <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-brand-accent/60 to-transparent transition-all duration-700 group-hover:w-full"
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-brand-accent/40 group-hover:bg-brand-accent/5 group-hover:text-brand-accent-light">
                    <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Eyebrow */}
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-brand-accent-light">
                    {item.eyebrow}
                </p>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-brand-accent-light lg:text-base">
                    {item.description}
                </p>

                {/* Illustration Block */}
                <div className="mt-6 mb-2">
                    <item.Illustration />
                </div>

                {/* Pull-quote differentiator */}
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-6">
                    <span className="h-px w-5 flex-shrink-0 bg-brand-accent/60" />
                    <p className="text-sm font-semibold text-zinc-300 transition-colors duration-300 group-hover:text-brand-accent-light">
                        {item.detail}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function WhyChooseUs() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <>

            <section
                id="why-choose-us"
                ref={ref}
                className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24"
            >
                {/* Top separator */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* Ambient center glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(circle at 100% 50%, rgba(var(--brand-accent-rgb), 0.04) 0%, rgba(var(--brand-accent-rgb), 0) 50%)" }}
                />

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                    {/* â”€â”€ Section Header â”€â”€ */}
                    <div
                        ref={headerRef}
                        className="mb-16 flex flex-col items-start text-left lg:mb-20"
                    >
                        <motion.span
                            variants={fadeUp()}
                            initial="hidden"
                            animate={isHeaderInView ? "show" : "hidden"}
                            className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                            why us, honestly
                        </motion.span>
                        <div className="flex flex-col items-start gap-5">
                            <div className="flex flex-wrap items-end gap-5">
                                <motion.h2
                                    variants={slideFromLeftContainer}
                                    initial="hidden"
                                    animate={isHeaderInView ? "show" : "hidden"}
                                    className="max-w-7xl text-left text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]"
                                    style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "0 0.3em" }}
                                >
                                    {splitWords("Four reasons we're different. Judge for").map((word, index) => (
                                        <motion.span
                                            key={`w1-${index}`}
                                            variants={slideFromLeftItem}
                                            style={{ display: "inline-block" }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                    <motion.span
                                        variants={slideFromLeftItem}
                                        className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                                    >
                                        yourself.
                                    </motion.span>
                                </motion.h2>
                                {/* Inline stat badge */}
                                <motion.div
                                    variants={fadeUp()}
                                    initial="hidden"
                                    animate={isHeaderInView ? "show" : "hidden"}
                                    className="mb-1 flex-shrink-0 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-2"
                                >
                                    <span className="font-mono text-sm font-bold text-brand-accent-light">98%</span>
                                    <span className="ml-1.5 text-xs text-zinc-500">Client Retention</span>
                                </motion.div>
                            </div>
                            <motion.p
                                variants={fadeUp()}
                                initial="hidden"
                                animate={isHeaderInView ? "show" : "hidden"}
                                className="max-w-2xl text-left text-base leading-relaxed text-zinc-400"
                            >
                                Every agency claims to be different. Here&apos;s what we actually do that most won&apos;t.
                            </motion.p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                        {ADVANTAGES.map((item, i) => (
                            <AdvantageCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

