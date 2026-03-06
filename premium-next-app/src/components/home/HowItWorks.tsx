"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import { Search, Rocket, Code2, BrainCircuit } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const PHASES = [
    {
        number: "01",
        icon: Search,
        label: "Discovery & Blueprinting",
        description:
            "We map your architecture, business logic, and success metrics before writing a single line of code. This phase eliminates costly re-work and ensures every engineering decision is deliberate.",
        tags: ["Stakeholder Workshops", "Technical Scoping", "Architecture Design"],
    },
    {
        number: "02",
        icon: Rocket,
        label: "Rapid Deployment",
        description:
            "MVPs and premium web presences launched in record time to establish immediate ROI and create a feedback loop with real users — not assumptions.",
        tags: ["MVP Launch", "Performance Budgets", "Conversion Architecture"],
    },
    {
        number: "03",
        icon: Code2,
        label: "Core Engineering",
        description:
            "Building your custom software, SaaS platform, or internal tools using modern, scalable stacks. Clean code, proper abstractions, and thorough documentation — always.",
        tags: ["Full-Stack Development", "API Design", "QA & Testing"],
    },
    {
        number: "04",
        icon: BrainCircuit,
        label: "AI & Automation Integration",
        description:
            "Implementing intelligent workflows that reduce overhead and scale operations. We identify the highest-leverage automation opportunities and execute with precision.",
        tags: ["AI Workflow Design", "LLM Integration", "Process Automation"],
    },
];

/* ─── Individual Step ────────────────────────────────────── */
function PhaseCard({
    phase,
    index,
}: {
    phase: (typeof PHASES)[number];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
    const Icon = phase.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
            }}
            className="group relative ml-10 flex flex-col gap-4 lg:ml-16"
        >
            {/* Timeline dot — sits on the vertical line */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                className="absolute -left-[2.85rem] top-8 flex h-5 w-5 items-center justify-center lg:-left-[4.1rem]"
            >
                <span className="absolute inset-0 rounded-full bg-violet-500/30 blur-sm" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-violet-400 ring-2 ring-violet-400/30 ring-offset-2 ring-offset-black" />
            </motion.div>

            {/* Glass card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15 lg:p-8">
                {/* Hover glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.10) 0%, transparent 70%)",
                    }}
                />

                {/* Phase number + icon */}
                <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-5xl font-bold leading-none tracking-tighter text-white/[0.06] select-none">
                        {phase.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-colors duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400">
                        <Icon size={18} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold leading-snug text-white lg:text-2xl">
                    {phase.label}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                    {phase.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {phase.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    /* Scroll-driven line draw */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 75%", "end 60%"],
    });

    /* The glowing fill line scaleY: 0 → 1 as we scroll through the section */
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative overflow-hidden bg-black py-28 lg:py-36"
        >
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            {/* Ambient left glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-indigo-900/10 blur-[130px]"
            />

            <div className="mx-auto max-w-5xl px-6 lg:px-12">
                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20 lg:mb-24"
                >
                    <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-px w-6 bg-zinc-700" />
                        Our Process
                    </span>
                    <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                        From Concept to{" "}
                        <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                            Scalable Architecture
                        </span>
                    </h2>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-500 lg:text-lg">
                        A four-phase methodology that turns ambiguity into precision-engineered systems — on time, every time.
                    </p>
                </motion.div>

                {/* ── Timeline ── */}
                <div className="relative">
                    {/* Track: the ghost line */}
                    <div className="absolute left-0 top-0 h-full w-px bg-white/5 lg:left-0" />

                    {/* Glow line: scroll-driven scaleY */}
                    <motion.div
                        style={{ scaleY: lineScaleY, originY: 0 }}
                        className="absolute left-0 top-0 h-full w-px lg:left-0"
                    >
                        {/* The glowing line itself */}
                        <div className="h-full w-full bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500/10" />
                        {/* Bloom at the leading edge of the line */}
                        <div
                            className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-violet-500/60 blur-md"
                        />
                    </motion.div>

                    {/* Phase cards */}
                    <div className="flex flex-col gap-10 lg:gap-12">
                        {PHASES.map((phase, index) => (
                            <PhaseCard key={phase.number} phase={phase} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
