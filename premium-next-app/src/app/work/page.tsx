"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CASE_STUDIES, CATEGORIES } from "@/data/case-studies";

/* ─── Keyframes ──────────────────────────────────────────── */
const CSS = `
  @keyframes scan-down   { 0%{transform:translateY(-100%)} 100%{transform:translateY(500%)} }
  @keyframes dash-flow   { to { stroke-dashoffset: -48; } }
  @keyframes node-ping   { 0%,100%{opacity:.45;r:2.5} 50%{opacity:1;r:4.5} }
  @keyframes ping-ring   { 0%,100%{opacity:.15;r:10} 50%{opacity:.45;r:16} }
  @keyframes globe-spin  { from{stroke-dashoffset:0} to{stroke-dashoffset:-200} }
  @keyframes grid-pulse  { 0%,100%{opacity:.25} 50%{opacity:.5} }

  .scan-bar   { animation: scan-down  5s linear infinite; }
  .dash-arc   { animation: dash-flow  3s linear infinite; }
  .dot-ping   { animation: node-ping  2.6s ease-in-out infinite; }
  .ring-ping  { animation: ping-ring  2.6s ease-in-out infinite; }
  .globe-arc  { animation: globe-spin 8s linear infinite; }
  .grid-lay   { animation: grid-pulse 4s ease-in-out infinite; }
`;

/* ─── Animation variants ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
};

/* ─── Animated SVG Patterns ──────────────────────────────── */

/** Dot-scan grid (NextLex) */
function PatternDotScan() {
    return (
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="wdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.1" />
                </pattern>
                <linearGradient id="wscan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="45%" stopColor="white" stopOpacity="0.03" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.1" />
                    <stop offset="55%" stopColor="white" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#wdots)" className="grid-lay" />
            {[0.25, 0.5, 0.75].map((x, i) => (
                <line key={i} x1={`${x * 100}%`} y1="0" x2={`${x * 100}%`} y2="100%"
                    stroke="white" strokeOpacity="0.05" strokeWidth="1" />
            ))}
            {[0.33, 0.66].map((y, i) => (
                <line key={i} x1="0" y1={`${y * 100}%`} x2="100%" y2={`${y * 100}%`}
                    stroke="white" strokeOpacity="0.04" strokeWidth="1" />
            ))}
            <rect className="scan-bar" x="0" y="0" width="100%" height="18%"
                fill="url(#wscan)" />
            <rect x="0" y="0" width="3" height="100%" fill="#7c3aed" fillOpacity="0.5" />
        </svg>
    );
}

/** Global node-map — container shipping routes (Ali Wali) */
function PatternGlobalNodeMap() {
    const nodes = [
        { id: "us", cx: "12%", cy: "38%", label: "New York" },
        { id: "uk", cx: "40%", cy: "22%", label: "London" },
        { id: "uae", cx: "60%", cy: "40%", label: "Dubai" },
        { id: "pk", cx: "72%", cy: "38%", label: "Karachi" },
        { id: "cn", cx: "85%", cy: "28%", label: "Shanghai" },
        { id: "m1", cx: "30%", cy: "62%", label: "Mine" },
        { id: "m2", cx: "55%", cy: "70%", label: "Quarry" },
        { id: "m3", cx: "78%", cy: "65%", label: "Cement" },
    ];
    const arcs = [
        { d: "M 12% 38%  Q 26% 10% 40% 22%" },
        { d: "M 40% 22%  Q 50% 15% 60% 40%" },
        { d: "M 60% 40%  Q 66% 36% 72% 38%" },
        { d: "M 72% 38%  Q 78% 24% 85% 28%" },
        { d: "M 12% 38%  Q 20% 52% 30% 62%" },
        { d: "M 60% 40%  Q 57% 56% 55% 70%" },
        { d: "M 72% 38%  Q 75% 52% 78% 65%" },
    ];
    const pingDelays = ["0s", "0.8s", "1.6s", "0.4s", "1.2s", "2s", "0.6s", "1.4s"];

    return (
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id="gfine" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                    <circle cx="0.5" cy="0.5" r="0.4" fill="white" fillOpacity="0.06" />
                </pattern>
                <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#gfine)" />
            <rect width="100" height="100" fill="url(#glow-center)" />
            {[20, 35, 50, 65, 80].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="100" y2={y}
                    stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
            ))}
            {[20, 35, 50, 65, 80].map((x, i) => (
                <line key={`v${i}`} x1={x} y1="0" x2={x} y2="100"
                    stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
            ))}
            {arcs.map((arc, i) => (
                <path key={`ghost-${i}`} d={arc.d}
                    fill="none" stroke="#7c3aed" strokeOpacity="0.15" strokeWidth="0.3" />
            ))}
            {arcs.map((arc, i) => (
                <path key={`dash-${i}`} d={arc.d}
                    fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="0.5"
                    strokeDasharray="2 4" className="dash-arc"
                    style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
            {nodes.map((n, i) => (
                <circle key={`ring-${i}`}
                    cx={n.cx} cy={n.cy}
                    fill="none" stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="0.3"
                    className="ring-ping"
                    style={{ animationDelay: pingDelays[i] }} />
            ))}
            {nodes.map((n, i) => (
                <circle key={`dot-${i}`}
                    cx={n.cx} cy={n.cy}
                    fill="#a78bfa" fillOpacity="0.75"
                    className="dot-ping"
                    style={{ animationDelay: pingDelays[i] }} />
            ))}
            {["us", "pk", "uae"].map((id) => {
                const n = nodes.find(x => x.id === id)!;
                return (
                    <circle key={`hub-${id}`}
                        cx={n.cx} cy={n.cy} r="2.5"
                        fill="none" stroke="#c4b5fd" strokeOpacity="0.5" strokeWidth="0.4" />
                );
            })}
        </svg>
    );
}

/** Diagonal flowing grid (PrimeMark) */
function PatternDiagFlow() {
    return (
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="wdiag" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M0 48L48 0M-8 8L8-8M40 56L56 40"
                        stroke="white" strokeOpacity="0.06" strokeWidth="1" fill="none" />
                </pattern>
                <linearGradient id="diag-tint" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#wdiag)" className="grid-lay" />
            <rect width="100%" height="100%" fill="url(#diag-tint)" />
            {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
                <line key={i} x1="0" y1={`${y * 100}%`} x2="100%" y2={`${y * 100}%`}
                    stroke="#6366f1" strokeOpacity="0.12" strokeWidth="1"
                    strokeDasharray="6 12" className="dash-arc"
                    style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
            <rect x="0" y="0" width="100%" height="3" fill="#4f46e5" fillOpacity="0.3" />
        </svg>
    );
}

/* ─── Pattern mapping for work page cards ─────────────── */
const PATTERNS = [<PatternDotScan key="dot" />, <PatternGlobalNodeMap key="globe" />, <PatternDiagFlow key="diag" />];

function getPattern(index: number) {
    return PATTERNS[index % PATTERNS.length];
}

/* ─── Category label helper ───────────────────────────── */
function getCategoryLabel(key: string) {
    return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

/* ─── Parallax Visual Block ──────────────────────────────── */
function ProjectVisual({
    project,
    pattern,
}: {
    project: (typeof CASE_STUDIES)[number];
    pattern: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const patternY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <div
            ref={containerRef}
            className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-neutral-950 lg:h-[70vh]"
        >
            <motion.div
                style={{ y: patternY }}
                className="absolute inset-[-10%] h-[120%] w-[120%]"
            >
                {pattern}
            </motion.div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent"
            />
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
                {project.sector}
            </div>
            {project.liveUrl && (
                <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-950/40 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Live</span>
                </div>
            )}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                    background: `radial-gradient(ellipse at 30% 50%, rgba(${project.accentColor},0.15) 0%, rgba(${project.accentColor},0) 100%)`,
                }}
            />
        </div>
    );
}

/* ─── Featured Project Card (Parallax) ───────────────────── */
function FeaturedCard({ project, index }: { project: (typeof CASE_STUDIES)[number]; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.article
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            exit="exit"
            layout
        >
            <ProjectVisual project={project} pattern={getPattern(index)} />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-16">
                <div>
                    <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        {project.client}
                    </h2>
                    <div>
                        <span className="block font-mono text-7xl font-extrabold leading-none tracking-tight text-white lg:text-8xl">
                            {project.metric}
                        </span>
                        <span className="mt-2 block text-sm font-medium uppercase tracking-widest text-zinc-500">
                            {project.metricLabel}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                        {project.heroDescription}
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:shadow-[0_0_20px_rgba(109,40,217,0.18)]"
                                >
                                    View Live Platform
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </a>
                            )}
                            <Link
                                href={`/work/${project.slug}`}
                                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-violet-400"
                            >
                                Case Study
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent lg:mt-28" />
        </motion.article>
    );
}

/* ─── Compact Grid Card ──────────────────────────────────── */
function CompactCard({ project }: { project: (typeof CASE_STUDIES)[number] }) {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
        >
            {/* Hover glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, rgba(${project.accentColor},0.15) 0%, rgba(${project.accentColor},0) 100%)`,
                }}
            />

            <div className="relative z-10 flex h-full flex-col">
                {/* Top row: sector + category badge */}
                <div className="mb-5 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        {project.sector}
                    </p>
                    <span className="rounded-full border border-violet-500/20 bg-violet-950/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                        {getCategoryLabel(project.category)}
                    </span>
                </div>

                {/* Key metric */}
                <div className="mb-4">
                    <span className="block font-mono text-4xl font-extrabold leading-none tracking-tight bg-gradient-to-br from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-1.5">
                        {project.metric}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                        {project.metricLabel}
                    </span>
                </div>

                {/* Client name */}
                <h3 className="mb-2 text-xl font-semibold leading-snug text-white">
                    {project.client}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-zinc-500 flex-1">
                    {project.heroDescription.split(". ")[0]}.
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-zinc-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                    <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 group-hover:text-violet-400"
                    >
                        View Case Study
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Filter Pill Bar ────────────────────────────────────── */
function FilterBar({
    active,
    onChange,
}: {
    active: string;
    onChange: (key: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map((cat) => {
                const isActive = cat.key === active;
                return (
                    <button
                        key={cat.key}
                        onClick={() => onChange(cat.key)}
                        className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                            isActive
                                ? "text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="filter-pill"
                                className="absolute inset-0 rounded-full border border-violet-500/40 bg-violet-950/40"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

/* ─── Section Divider ────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {children}
            </span>
            <div className="h-px flex-1 bg-white/5" />
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function WorkPage() {
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = useMemo(
        () =>
            activeCategory === "all"
                ? CASE_STUDIES
                : CASE_STUDIES.filter((p) => p.category === activeCategory),
        [activeCategory]
    );

    const featured = filtered.filter((p) => p.featured && p.assets.length > 0);
    const grid = filtered.filter((p) => !p.featured || p.assets.length === 0);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <div className="relative text-white min-h-screen">
                <div className="relative z-10 overflow-hidden min-h-screen">

                    {/* ── Work Hero ── */}
                    <section
                        ref={heroRef}
                        className="relative flex min-h-[50vh] items-center overflow-hidden border-b border-white/5"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 70%)" }}
                        />

                        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, ease: EASE }}
                            >
                                <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                    Our Portfolio
                                </span>

                                <h1 className="text-6xl font-bold tracking-tight text-white lg:text-8xl xl:text-9xl">
                                    Proof of{" "}
                                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                        Concept.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
                                    {CASE_STUDIES.length}+ projects across mobile, web, AI, and branding —
                                    engineered for scale and built for results.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* ── Filter Pills ── */}
                    <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-12">
                        <FilterBar active={activeCategory} onChange={setActiveCategory} />
                    </div>

                    {/* ── Project Stack ── */}
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
                        <AnimatePresence mode="popLayout">
                            {/* Featured Projects */}
                            {featured.length > 0 && (
                                <motion.div key="featured-section" layout>
                                    <SectionLabel>Featured Projects</SectionLabel>
                                    <div className="space-y-0">
                                        {featured.map((project, index) => (
                                            <div key={project.slug} className={index > 0 ? "mt-28 lg:mt-36" : ""}>
                                                <FeaturedCard project={project} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Grid Projects */}
                            {grid.length > 0 && (
                                <motion.div
                                    key="grid-section"
                                    layout
                                    className={featured.length > 0 ? "mt-20 lg:mt-28" : ""}
                                >
                                    <SectionLabel>More Work</SectionLabel>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {grid.map((project) => (
                                            <CompactCard key={project.slug} project={project} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Empty state */}
                            {filtered.length === 0 && (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-24 text-center"
                                >
                                    <p className="text-lg text-zinc-500">No projects in this category yet.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Inline CTA ── */}
                    <div className="border-t border-white/5">
                        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">
                                        Next Engagement
                                    </p>
                                    <h2 className="text-3xl font-bold text-white lg:text-4xl">
                                        Ready to be our next case study?
                                    </h2>
                                </div>
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(109,40,217,0.5)] whitespace-nowrap"
                                >
                                    Book a Discovery Call
                                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Subtle violet border glow separating the scrolling content from the reveal footer */}
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
        </>
    );
}
