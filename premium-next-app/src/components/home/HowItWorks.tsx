"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring
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
            "MVPs and premium web presences launched in record time to establish immediate ROI and create a feedback loop with real users - not assumptions.",
        tags: ["MVP Launch", "Performance Budgets", "Conversion Architecture"],
    },
    {
        number: "03",
        icon: Code2,
        label: "Core Engineering",
        description:
            "Building your custom software, SaaS platform, or internal tools using modern, scalable stacks. Clean code, proper abstractions, and thorough documentation - always.",
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
}: {
    phase: (typeof PHASES)[number];
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-15% 0px -15% 0px" });
    const isCenterInView = useInView(cardRef, { margin: "-35% 0px -35% 0px" });
    const Icon = phase.icon;

    const itemVariants = {
        hidden: { opacity: 0, x: 32 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.05,
            },
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="contents"
        >
            {/* Left rail - dot (col 1) */}
            <div className="relative flex justify-center pt-8">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                    className="relative flex h-5 w-5 items-center justify-center"
                >
                    <span className={`absolute inset-0 rounded-full transition-all duration-500 ${isCenterInView ? "bg-violet-500/60 blur-md scale-150" : "bg-violet-500/30 blur-sm scale-100"}`} />
                    <span className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isCenterInView ? "bg-violet-300 ring-2 ring-violet-400/50 ring-offset-2 ring-offset-black" : "bg-violet-400 ring-2 ring-violet-400/30 ring-offset-2 ring-offset-black"}`} />
                </motion.div>
            </div>

            {/* Glass card (col 2) */}
            <div ref={cardRef} className={`group relative overflow-hidden rounded-2xl border p-7 backdrop-blur-sm transition-all duration-500 lg:p-8 ${isCenterInView ? "border-violet-500/25 bg-neutral-900/60 shadow-[0_0_30px_rgba(139,92,246,0.08)]" : "border-white/8 bg-neutral-900/40 hover:border-white/15"}`}>
                {/* Hover + Active glow */}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-all duration-700 group-hover:opacity-100 ${isCenterInView ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background:
                            "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.06) 50%, rgba(139,92,246,0) 100%)",
                    }}
                />

                {/* Phase number + icon */}
                <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-5xl font-bold leading-none tracking-tighter text-white/[0.06] select-none">
                        {phase.number}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400 ${isCenterInView ? "border-violet-500/30 bg-violet-950/50 text-violet-400" : "border-white/10 bg-white/5 text-zinc-400"}`}>
                        <Icon size={18} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h3 className={`mb-3 text-xl font-semibold leading-snug lg:text-2xl transition-colors duration-500 ${isCenterInView ? "text-white" : "text-zinc-200"}`}>
                    {phase.label}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-500 group-hover:text-zinc-400 ${isCenterInView ? "text-zinc-400" : "text-zinc-500"}`}>
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
    const timelineRef = useRef<HTMLDivElement>(null);

    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    /* Scroll-driven line draw */
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 50%", "end 50%"], // Perfect 1:1 timeline sync based entirely on the grid height
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70, // Slightly softer spring for more elegance 
        damping: 30,
        restDelta: 0.001
    });

    const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative overflow-hidden py-28 lg:py-36"
        >
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            {/* Ambient left glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(79,70,229,0.03) 0%, rgba(79,70,229,0) 50%)" }}
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
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
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
                        A four-phase methodology that turns ambiguity into precision-engineered systems - on time, every time.
                    </p>
                </motion.div>

                {/* ── Timeline (2-column grid: rail | cards) ── */}
                <div ref={timelineRef} className="relative grid grid-cols-[2rem_1fr] gap-x-4 gap-y-10 lg:grid-cols-[3rem_1fr] lg:gap-x-6 lg:gap-y-12">
                    {/* Vertical rail line (spans all rows, behind dots) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[1rem] top-0 h-full w-px bg-white/5 lg:left-[1.5rem]"
                    />
                    {/* Glow line: scroll-driven scaleY */}
                    <motion.div
                        aria-hidden="true"
                        style={{ scaleY: lineScaleY, originY: 0 }}
                        className="pointer-events-none absolute left-[1rem] top-0 h-full w-px lg:left-[1.5rem]"
                    >
                        <div className="h-full w-full bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500/10" />
                        <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-violet-500/60 blur-md" />
                    </motion.div>

                    {/* Phase cards (each renders into both columns via `contents`) */}
                    {PHASES.map((phase) => (
                        <PhaseCard key={phase.number} phase={phase} />
                    ))}
                </div>
            </div>
        </section>
    );
}
