"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
/* ─── Keyframes for the SVG placeholder patterns ─────────── */
const patternStyles = `
  @keyframes scan-down {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(400%); }
  }
  @keyframes grid-pulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.6; }
  }
  @keyframes node-ping {
    0%, 100% { r: 2.5; opacity: 0.5; }
    50%       { r: 4;   opacity: 1;   }
  }
  @keyframes dash-flow {
    to { stroke-dashoffset: -40; }
  }
  .scan-line  { animation: scan-down 4s linear infinite; }
  .grid-layer { animation: grid-pulse 3s ease-in-out infinite; }
  .node-a     { animation: node-ping 2.4s ease-in-out infinite; }
  .node-b     { animation: node-ping 2.4s ease-in-out 0.8s infinite; }
  .node-c     { animation: node-ping 2.4s ease-in-out 1.6s infinite; }
  .dash-path  { animation: dash-flow 2s linear infinite; }
`;

/* ─── SVG Pattern Components ─────────────────────────────── */

/** Dot-grid with a slow horizontal scan — "Legal SaaS / Document System" */
function PatternDotScan() {
    return (
        <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.12" />
                </pattern>
                {/* Scan-line gradient */}
                <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.04" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Dot grid */}
            <rect width="100%" height="100%" fill="url(#dots)" className="grid-layer" />

            {/* Horizontal rule lines */}
            {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
                <line
                    key={i}
                    x1="0" y1={`${y * 100}%`} x2="100%" y2={`${y * 100}%`}
                    stroke="white" strokeOpacity="0.05" strokeWidth="1"
                />
            ))}
            {[0.25, 0.5, 0.75].map((x, i) => (
                <line
                    key={i}
                    x1={`${x * 100}%`} y1="0" x2={`${x * 100}%`} y2="100%"
                    stroke="white" strokeOpacity="0.05" strokeWidth="1"
                />
            ))}

            {/* Scanning bar */}
            <rect
                className="scan-line"
                x="0" y="0"
                width="100%" height="20%"
                fill="url(#scan-grad)"
            />

            {/* Violet corner accent */}
            <rect x="0" y="0" width="3" height="100%" fill="#7c3aed" fillOpacity="0.4" />
        </svg>
    );
}

/** Diagonal flowing grid — "Supply Chain / Manufacturing" */
function PatternFlowGrid() {
    return (
        <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                        d="M0 40L40 0M-10 10L10-10M30 50L50 30"
                        stroke="white" strokeOpacity="0.06" strokeWidth="1"
                        fill="none"
                    />
                </pattern>
                <pattern id="diag2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path
                        d="M0 80L80 0"
                        stroke="white" strokeOpacity="0.04" strokeWidth="1"
                        strokeDasharray="6 14"
                        fill="none"
                        className="dash-path"
                        style={{ strokeDashoffset: 0 }}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)" />
            <rect width="100%" height="100%" fill="url(#diag2)" />

            {/* Subtle horizontal gradient tint */}
            <rect width="100%" height="100%"
                fill="url(#diag-fade)"
            />
            <defs>
                <linearGradient id="diag-fade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Data-flow arrow lines */}
            {[0.25, 0.5, 0.75].map((y, i) => (
                <g key={i}>
                    <line
                        x1="5%" y1={`${y * 100}%`} x2="95%" y2={`${y * 100}%`}
                        stroke="#6366f1" strokeOpacity="0.18" strokeWidth="1"
                        strokeDasharray="4 8"
                        className="dash-path"
                    />
                </g>
            ))}
        </svg>
    );
}

/** Network node graph — "Logistics / Data Pipeline / AI" */
function PatternNodeGraph() {
    const nodes = [
        { cx: "15%", cy: "25%" },
        { cx: "50%", cy: "15%" },
        { cx: "80%", cy: "35%" },
        { cx: "30%", cy: "65%" },
        { cx: "65%", cy: "70%" },
        { cx: "88%", cy: "80%" },
    ];
    const edges = [
        [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [4, 5],
    ];
    const pingClasses = ["node-a", "node-b", "node-c", "node-a", "node-b", "node-c"];

    return (
        <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="fine-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.75" fill="white" fillOpacity="0.07" />
                </pattern>
            </defs>
            {/* Background fine dot grid */}
            <rect width="100%" height="100%" fill="url(#fine-dots)" />

            {/* Edge lines */}
            {edges.map(([a, b], i) => (
                <line
                    key={i}
                    x1={nodes[a].cx} y1={nodes[a].cy}
                    x2={nodes[b].cx} y2={nodes[b].cy}
                    stroke="#7c3aed" strokeOpacity="0.25" strokeWidth="1"
                    strokeDasharray="4 6"
                    className="dash-path"
                />
            ))}

            {/* Halo rings */}
            {nodes.map((n, i) => (
                <circle
                    key={`halo-${i}`}
                    cx={n.cx} cy={n.cy} r="10"
                    fill="none" stroke="#7c3aed" strokeOpacity="0.12" strokeWidth="1"
                    className={pingClasses[i]}
                />
            ))}

            {/* Node dots */}
            {nodes.map((n, i) => (
                <circle
                    key={`node-${i}`}
                    cx={n.cx} cy={n.cy}
                    fill="#a78bfa"
                    fillOpacity="0.6"
                    className={pingClasses[i]}
                />
            ))}
        </svg>
    );
}

/* ─── Data ───────────────────────────────────────────────── */
const CASE_STUDIES = [
    {
        id: 1,
        client: "NextLex",
        sector: "Legal SaaS Platform",
        metric: "10k+",
        metricLabel: "Active Users Scaled To",
        description:
            "Complete architectural redesign and AI-driven document workflow automation - transforming a fragile monolith into a resilient, multi-tenant SaaS powering law firms across three continents.",
        tags: ["Next.js", "AI Automation", "Dashboard"],
        liveUrl: "https://nextlex.com",
        pattern: <PatternDotScan />,
        accentColor: "rgba(139,92,246,0.15)",
        isLarge: true,
    },
    {
        id: 2,
        client: "PrimeMark Apparel",
        sector: "B2B Manufacturing Portal",
        metric: "300%",
        metricLabel: "Faster Order Routing",
        description:
            "High-performance digital storefront streamlining global supply chain operations - from quote to shipment in a single, unified platform.",
        tags: ["E-Commerce", "API Integration", "Supply Chain"],
        liveUrl: "https://primemarkapparel.com",
        pattern: <PatternFlowGrid />,
        accentColor: "rgba(99,102,241,0.12)",
        isLarge: false,
    },
    {
        id: 3,
        client: "Aura Logistics",
        sector: "Enterprise Data Pipeline",
        metric: "85%",
        metricLabel: "Reduction in Latency",
        description:
            "Custom internal tools and predictive AI models for fleet management - delivering real-time visibility across a 500-vehicle operation.",
        tags: ["Machine Learning", "React", "Python"],
        pattern: <PatternNodeGraph />,
        accentColor: "rgba(109,40,217,0.13)",
        isLarge: false,
    },
];

/* ─── Animation variants ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE },
    },
};

/* ─── Large Card (full-width, horizontal layout) ─────────── */
function LargeCard({ study }: { study: (typeof CASE_STUDIES)[number] }) {
    return (
        <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 backdrop-blur-sm transition-all duration-500 hover:border-white/15 lg:grid lg:grid-cols-5"
        >
            {/* Hover ambient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: study.accentColor ? `radial-gradient(ellipse at 0% 50%, ${study.accentColor} 0%, transparent 100%)` : undefined }}
            />

            {/* Visual area — left 2 cols */}
            <div className="relative h-56 overflow-hidden border-b border-white/5 bg-neutral-950 lg:col-span-2 lg:h-full lg:border-b-0 lg:border-r">
                {study.pattern}
                {/* Client badge */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-400 backdrop-blur-sm uppercase">
                    {study.client}
                </div>
            </div>

            {/* Text area — right 3 cols */}
            <div className="relative z-10 flex flex-col justify-between p-8 lg:col-span-3 lg:p-10">
                {/* Top: sector + metric */}
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        {study.sector}
                    </p>

                    <div className="mb-5">
                        <span className="block font-mono text-7xl font-extrabold leading-none tracking-tight text-white lg:text-8xl">
                            {study.metric}
                        </span>
                        <span className="mt-1 block text-sm text-zinc-500 uppercase tracking-wider">
                            {study.metricLabel}
                        </span>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-zinc-400 lg:text-base">
                        {study.description}
                    </p>
                </div>

                {/* Bottom: tags + live link */}
                <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {study.liveUrl && (
                        <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:shadow-[0_0_20px_rgba(109,40,217,0.18)]"
                        >
                            View Live Platform
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Small Card (half-width, vertical layout) ───────────── */
function SmallCard({ study }: { study: (typeof CASE_STUDIES)[number] }) {
    return (
        <motion.div
            variants={cardVariants}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
        >
            {/* Hover ambient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: study.accentColor ? `radial-gradient(ellipse at 50% 0%, ${study.accentColor} 0%, transparent 100%)` : undefined }}
            />

            {/* Visual area — top */}
            <div className="relative h-48 overflow-hidden border-b border-white/5 bg-neutral-950">
                {study.pattern}
                {/* Client badge */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-400 backdrop-blur-sm uppercase">
                    {study.client}
                </div>
            </div>

            {/* Text area */}
            <div className="relative z-10 flex flex-1 flex-col justify-between p-7 lg:p-8">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        {study.sector}
                    </p>

                    <div className="mb-4">
                        <span className="block font-mono text-5xl font-extrabold leading-none tracking-tight text-white lg:text-6xl">
                            {study.metric}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-500 uppercase tracking-wider">
                            {study.metricLabel}
                        </span>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-400">
                        {study.description}
                    </p>
                </div>

                <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {study.liveUrl && (
                        <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:shadow-[0_0_20px_rgba(109,40,217,0.18)]"
                        >
                            View Live Platform
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function CaseStudies() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const [large, ...smalls] = CASE_STUDIES;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: patternStyles }} />

            <section
                id="case-studies"
                ref={ref}
                className="relative overflow-hidden py-28 lg:py-36"
            >
                {/* Top separator */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-indigo-950/20 blur-[130px]"
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    {/* ── Section Header ── */}
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 flex flex-col gap-5 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div>
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-px w-6 bg-zinc-700" />
                                Proven Impact
                            </span>
                            <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
                                Engineered for Scale.{" "}
                                <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                                    Built for Results.
                                </span>
                            </h2>
                        </div>
                        <p className="max-w-xs text-base leading-relaxed text-zinc-500 lg:text-right">
                            Real-world outcomes from our recent engagements across industries.
                        </p>
                    </motion.div>

                    {/* ── Card Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex flex-col gap-4 lg:gap-5"
                    >
                        {/* Row 1: Full-width large card */}
                        <LargeCard study={large} />

                        {/* Row 2: Two equal cards */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                            {smalls.map((study) => (
                                <SmallCard key={study.id} study={study} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
