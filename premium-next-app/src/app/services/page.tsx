"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { InteriorHeroBlob } from "@/components/shared/InteriorHeroBlob";
import StudioEyebrow from "@/components/shared/StudioEyebrow";
import { wordContainerVariants, wordVariants, splitWords } from "@/components/shared/headingAnimations";
import dynamic from "next/dynamic";
import { SERVICE_SECTIONS } from "@/data/site-navigation";
import SpecSheetSection from "@/components/shared/SpecSheetSection";
import { STUDIO_TYPE } from "@/lib/type-system";

const ServicesProcessShowcase = dynamic(
    () => import("@/components/services/ServicesProcessShowcase"),
    { ssr: false }
);

/* â”€â”€â”€ Fade-up variant â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

/* â”€â”€â”€ Section Block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ServiceSection({
    section,
    onEnter,
}: {
    section: (typeof SERVICE_SECTIONS)[number];
    onEnter: (id: string) => void;
}) {
    const ref = useRef<HTMLElement>(null);
    // Pinpoint center of screen
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
    const isVisible = useInView(ref, { once: true, margin: "-80px" });
    const Icon = section.icon;

    // Notify parent which section is active via effect to avoid render-time state updates
    useEffect(() => {
        if (isInView) onEnter(section.id);
    }, [isInView, onEnter, section.id]);

    return (
        <motion.section
            ref={ref}
            id={section.id}
            variants={fadeUp}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            className="scroll-mt-32 overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm"
        >
            {/* Section top bar */}
            <div className="flex items-center gap-4 border-b border-white/8 px-8 py-5">
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-600">
                    {section.number}
                </span>
                <div className="h-px flex-1 bg-white/5" />
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                    <Icon size={12} strokeWidth={1.5} className="text-brand-accent-light" />
                    <span className="text-xs font-medium text-zinc-400">{section.category}</span>
                </div>
            </div>

            <div className="p-8 lg:p-10">
                {/* Sub-headline */}
                <motion.h3
                    variants={wordContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className={`mb-5 ${STUDIO_TYPE.sectionTight} leading-snug`}
                    style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                >
                    {splitWords(section.subHeadline).map((word, i, arr) => {
                        const isLast = i === arr.length - 1;
                        return (
                            <motion.span
                                key={i}
                                variants={wordVariants}
                                className={isLast ? "bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent" : ""}
                                style={{ display: "inline-block" }}
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </motion.h3>

                {/* Description */}
                <p className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400">
                    {section.description}
                </p>

                {/* Capabilities grid */}
                <div className="mb-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        Core Capabilities
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {section.capabilities.map((cap) => (
                            <div key={cap} className="flex items-start gap-2.5">
                                <CheckCircle2
                                    size={14}
                                    className="mt-0.5 flex-shrink-0 text-brand-accent"
                                    strokeWidth={2}
                                />
                                <span className="text-sm text-zinc-400">{cap}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stack tags */}
                <div className="mb-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        Primary Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {section.stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Callout */}
                <div className="border-l-2 border-brand-accent/60 bg-brand-accent-deep/10 rounded-r-xl p-5 pl-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-accent-light">
                        {section.callout.label}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400 italic">
                        &quot;{section.callout.text}&quot;
                    </p>
                    {section.callout.attribution && (
                        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            â€” {section.callout.attribution}
                        </p>
                    )}
                </div>
            </div>
        </motion.section>
    );
}

/* â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ServicesPage() {
    const [activeId, setActiveId] = useState(SERVICE_SECTIONS[0].id);
    const activeSection = SERVICE_SECTIONS.find((s) => s.id === activeId) ?? SERVICE_SECTIONS[0];
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-clip min-h-screen">

                {/* â”€â”€ Services Hero â”€â”€ */}
                <section ref={heroRef} className="relative flex min-h-[52vh] items-center overflow-hidden border-b border-white/5 lg:min-h-[56vh]">
                    <InteriorHeroBlob preset="services" />

                    <div className="relative z-10 mx-auto max-w-[100rem] px-6 pb-20 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <StudioEyebrow className="mb-5">services</StudioEyebrow>
                            <motion.h1
                                variants={wordContainerVariants}
                                initial="hidden"
                                animate={isHeroInView ? "show" : "hidden"}
                                className={`max-w-7xl text-left ${STUDIO_TYPE.display}`}
                                style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "0 0.3em" }}
                            >
                                {splitWords("What we build, who we place, and what it costs you to").map((word, i) => (
                                    <motion.span key={`${word}-${i}`} variants={wordVariants} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={wordVariants}
                                    className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                                    style={{ display: "inline-block" }}
                                >
                                    wait.
                                </motion.span>
                            </motion.h1>
                            <p className={`mt-6 max-w-3xl ${STUDIO_TYPE.lead}`}>
                                Seven service lines, one delivery standard, and a process built to move like an engineering system instead of an agency brochure. Pick the line that matches your problem — or the engineer that matches your team.
                            </p>

                            {/* Jump links */}
                            <div className="mt-10 flex flex-wrap gap-3">
                                {SERVICE_SECTIONS.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light"
                                    >
                                        <span className="font-mono text-xs text-zinc-600">{s.number}</span>
                                        {s.category}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <ServicesProcessShowcase />

                {/* â”€â”€ Sticky Sidebar Layout â”€â”€ */}
                <div className="mx-auto max-w-[100rem] px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">

                        {/* LEFT â€” Sticky sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                {/* Current section indicator */}
                                <motion.div
                                    key={activeId}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span className="font-mono text-[80px] font-extrabold leading-none tracking-tighter text-white/[0.07] select-none block">
                                        {activeSection.number}
                                    </span>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        Currently viewing
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold leading-snug text-white lg:text-2xl">
                                        {activeSection.category}
                                    </h2>
                                </motion.div>

                                {/* Section nav dots */}
                                <nav className="space-y-3">
                                    {SERVICE_SECTIONS.map((s) => {
                                        const isActive = s.id === activeId;
                                        return (
                                            <a
                                                key={s.id}
                                                href={`#${s.id}`}
                                                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${isActive
                                                    ? "text-white"
                                                    : "text-zinc-600 hover:text-brand-accent-light"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-tab-highlight"
                                                        className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.05]"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span
                                                    className={`relative z-10 h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-brand-accent-light" : "bg-zinc-700"
                                                        }`}
                                                />
                                                <span className="relative z-10 font-mono text-xs mr-1 opacity-40">{s.number}</span>
                                                <span className="relative z-10">{s.category}</span>
                                            </a>
                                        );
                                    })}
                                </nav>

                                {/* CTA */}
                                <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6">
                                    <p className="mb-1 text-sm font-semibold text-white">
                                        Have a project?
                                    </p>
                                    <p className="mb-5 text-xs leading-relaxed text-zinc-500">
                                        30 minutes with an engineer. No sales pitch.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 text-sm font-medium text-brand-accent-light transition-colors duration-200 hover:text-brand-accent-light"
                                    >
                                        Book a Call
                                        <ArrowRight
                                            size={14}
                                            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT â€” Scrollable content blocks */}
                        <div className="space-y-6 lg:col-span-2">
                            {SERVICE_SECTIONS.map((section) => (
                                <ServiceSection
                                    key={section.id}
                                    section={section}
                                    onEnter={setActiveId}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <SpecSheetSection
                    eyebrow="Spec sheet"
                    title="The technical baseline behind the service catalog."
                    description="The same engineering posture powers custom systems, mobile builds, design-system delivery, and embedded senior execution."
                />

                {/* Subtle lime border glow separating the scrolling content from the reveal footer */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.4) 30%, rgba(var(--brand-accent-light-rgb), 0.6) 50%, rgba(var(--brand-accent-rgb), 0.4) 70%, rgba(var(--brand-accent-rgb), 0) 100%)',
                        boxShadow: '0 0 20px 4px rgba(var(--brand-accent-dark-rgb), 0.25)',
                    }}
                />
            </div>
        </div>
    );
}

