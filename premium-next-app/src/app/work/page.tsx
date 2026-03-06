"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    // Key locations: US East Coast, UK, UAE, Pakistan, Mine sites
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
                {/* Globe-like latitude lines */}
                <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background fine dots */}
            <rect width="100" height="100" fill="url(#gfine)" />
            {/* Center ambient */}
            <rect width="100" height="100" fill="url(#glow-center)" />

            {/* Latitude grid lines */}
            {[20, 35, 50, 65, 80].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="100" y2={y}
                    stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
            ))}
            {[20, 35, 50, 65, 80].map((x, i) => (
                <line key={i} x1={x} y1="0" x2={x} y2="100"
                    stroke="white" strokeOpacity="0.04" strokeWidth="0.15" />
            ))}

            {/* Shipping arcs — ghost */}
            {arcs.map((arc, i) => (
                <path key={`ghost-${i}`} d={arc.d}
                    fill="none" stroke="#7c3aed" strokeOpacity="0.15" strokeWidth="0.3" />
            ))}

            {/* Shipping arcs — animated dashes */}
            {arcs.map((arc, i) => (
                <path key={`dash-${i}`} d={arc.d}
                    fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="0.5"
                    strokeDasharray="2 4" className="dash-arc"
                    style={{ animationDelay: `${i * 0.4}s` }} />
            ))}

            {/* Node rings (ping) */}
            {nodes.map((n, i) => (
                <circle key={`ring-${i}`}
                    cx={n.cx} cy={n.cy}
                    fill="none" stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="0.3"
                    className="ring-ping"
                    style={{ animationDelay: pingDelays[i] }} />
            ))}

            {/* Node dots */}
            {nodes.map((n, i) => (
                <circle key={`dot-${i}`}
                    cx={n.cx} cy={n.cy}
                    fill="#a78bfa" fillOpacity="0.75"
                    className="dot-ping"
                    style={{ animationDelay: pingDelays[i] }} />
            ))}

            {/* Main hubs — slightly larger glow */}
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

/* ─── Project data ───────────────────────────────────────── */
interface Project {
    slug: string;
    sector: string;
    title: string;
    metric: string;
    metricLabel: string;
    description: string;
    tags: string[];
    liveUrl?: string;
    liveLabel?: string;
    pattern: React.ReactNode;
    accentGlow: string;
}

const PROJECTS: Project[] = [
    {
        slug: "nextlex",
        sector: "Legal SaaS Platform",
        title: "NextLex",
        metric: "10k+",
        metricLabel: "Active Users Scaled To",
        description:
            "Complete architectural redesign of a fragile monolith into a resilient, multi-tenant SaaS platform powering law firms across three continents. We integrated AI-driven document workflow automation — classifying, summarising, and routing legal documents at scale — reducing manual review time by over 70% and eliminating the bottlenecks that were blocking growth.",
        tags: ["Next.js", "AI Automation", "Dashboard", "Multi-tenant SaaS"],
        liveUrl: "https://nextlex.com",
        liveLabel: "View Live Platform",
        pattern: <PatternDotScan />,
        accentGlow: "rgba(109,40,217,0.18)",
    },
    {
        slug: "ali-wali",
        sector: "Global Industrial Trade & Logistics",
        title: "Ali Wali Trading Company",
        metric: "35+",
        metricLabel: "Years of Global Trade",
        description:
            "Digitized the global presence for a direct buyer of industrial plied rubber conveyor belts. Architected a streamlined, professional platform to coordinate international pickups, container shipping, and evaluations for mines, quarries, and cement plants worldwide. We focus exclusively on reliability and speed for complex international transactions.",
        tags: ["Global Logistics", "Next.js", "B2B Portal"],
        liveUrl: "https://aliwalitrading.com",
        liveLabel: "View Live Platform",
        pattern: <PatternGlobalNodeMap />,
        accentGlow: "rgba(79,70,229,0.15)",
    },
    {
        slug: "primemark",
        sector: "B2B Manufacturing Portal",
        title: "PrimeMark Apparel",
        metric: "300%",
        metricLabel: "Faster Order Routing",
        description:
            "Engineered a high-performance digital storefront to streamline global B2B supply chain operations for a large-scale apparel manufacturer. The platform unified order management, supplier coordination, and logistics tracking into a single, real-time interface — cutting order routing time by 300% and eliminating the manual email chains that were slowing international fulfillment.",
        tags: ["E-Commerce", "API Integration", "Supply Chain", "B2B"],
        liveUrl: "https://primemarkapparel.com",
        liveLabel: "View Live Platform",
        pattern: <PatternDiagFlow />,
        accentGlow: "rgba(99,102,241,0.14)",
    },
];

/* ─── Parallax Visual Block ──────────────────────────────── */
function ProjectVisual({
    project,
}: {
    project: Project;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Pattern moves opposite to scroll — creates depth/parallax
    const patternY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <div
            ref={containerRef}
            className="relative h-[55vh] w-full overflow-hidden rounded-2xl bg-neutral-950 lg:h-[60vh]"
        >
            {/* Parallax inner */}
            <motion.div
                style={{ y: patternY }}
                className="absolute inset-[-10%] h-[120%] w-[120%]"
            >
                {project.pattern}
            </motion.div>

            {/* Gradient fade at bottom */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent"
            />

            {/* Sector badge */}
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
                {project.sector}
            </div>

            {/* Live badge if applicable */}
            {project.liveUrl && (
                <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-950/40 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Live</span>
                </div>
            )}

            {/* Ambient hover glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${project.accentGlow} 0%, transparent 65%)`,
                }}
            />
        </div>
    );
}

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Visual */}
            <ProjectVisual project={project} />

            {/* Content — 2-column below visual */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-16">
                {/* LEFT — Title + Big metric */}
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                    </p>
                    <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        {project.title}
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

                {/* RIGHT — Description + tags + CTA */}
                <div className="flex flex-col justify-between">
                    <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                        {project.description}
                    </p>

                    <div className="mt-8 space-y-4">
                        {/* Stack pills */}
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

                        {/* Live link (Ali Wali only) */}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:shadow-[0_0_20px_rgba(109,40,217,0.18)]"
                            >
                                {project.liveLabel ?? "View Live Platform"}
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent lg:mt-28" />
        </motion.article>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function WorkPage() {
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <div className="bg-black">
                <div className="relative z-10">
                    <Navbar />

                    {/* ── Work Hero ── */}
                    <section
                        ref={heroRef}
                        className="relative flex min-h-[50vh] items-center overflow-hidden border-b border-white/5"
                    >
                        {/* Ambient glow */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-1/4 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-violet-900/18 blur-[120px]"
                        />

                        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    <span className="h-px w-6 bg-zinc-700" />
                                    Our Portfolio
                                </span>

                                <h1 className="text-6xl font-bold tracking-tight text-white lg:text-8xl xl:text-9xl">
                                    Proof of{" "}
                                    <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                                        Concept.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
                                    Explore how we engineer scalable systems, automate complex
                                    workflows, and deploy premium web presences for global B2B
                                    enterprises.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* ── Project Stack ── */}
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
                        <div className="space-y-0">
                            {PROJECTS.map((project, index) => (
                                <div key={project.slug} className={index > 0 ? "mt-28 lg:mt-36" : ""}>
                                    <ProjectCard project={project} index={index} />
                                </div>
                            ))}
                        </div>
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

                    <Footer />
                </div>
            </div>
        </>
    );
}
