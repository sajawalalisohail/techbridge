"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { WebsitePlayer } from "@/components/remotion/WebsiteShowcase";


/* ─── Global ease constant ───────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Reusable animation helpers ─────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

const stagger = (delay = 0.1) => ({
    hidden: {},
    show: { transition: { staggerChildren: delay } },
});

const childFade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Section wrapper ────────────────────────────────────── */
function Section({
    id,
    children,
    className = "",
}: {
    id?: string;
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <section id={id} ref={ref} className={`relative ${className}`}>
            <motion.div
                variants={fadeUp()}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                {children}
            </motion.div>
        </section>
    );
}

/* ─── Eyebrow ────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
            {children}
        </span>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 1 — HERO
══════════════════════════════════════════════════════════ */
function Hero() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            ref={ref}
            className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-white/5"
        >
            {/* Background glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%),
                        radial-gradient(circle at 100% 0%, rgba(79,70,229,0.05) 0%, rgba(79,70,229,0) 50%),
                        radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 70%),
                        radial-gradient(ellipse at 100% 50%, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 70%)
                    `,
                }}
            />

            {/* Subtle dot grid */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-dots)" />
            </svg>

            <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-12">
                {/* Eyebrow badge */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 backdrop-blur-sm"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        TechBridge 24-Hour Studio
                    </span>
                </motion.div>

                <motion.h1
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                >
                    A Premium Website for Your Business.{" "}
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                        Live in 24 Hours.
                    </span>
                </motion.h1>

                <motion.p
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-zinc-400"
                >
                    Starting from{" "}
                    <span className="font-semibold text-white">$997.</span>{" "}
                    No templates. No bloated agency timelines. No waiting.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <a
                        href="#pricing"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_48px_rgba(109,40,217,0.55)]"
                    >
                        <span className="relative z-10">View Pricing</span>
                        <ChevronDown size={15} className="relative z-10" />
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </a>
                    <a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                    >
                        Book a Call
                        <ExternalLink size={13} className="text-zinc-500" />
                    </a>
                </motion.div>

                {/* Trust micro-signals */}
                <motion.div
                    variants={fadeUp(0.45)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mt-14 flex flex-wrap items-center justify-center gap-8"
                >
                    {["Custom-coded - not Wix", "100% satisfaction guarantee", "Built by CS engineers"].map((t) => (
                        <span key={t} className="flex items-center gap-2 text-xs text-zinc-600">
                            <Check size={12} className="text-violet-500" />
                            {t}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 2 — COMPARISON TABLE
══════════════════════════════════════════════════════════ */
const COMPARISON_ROWS = [
    { label: "Price", freelancer: "$300-$800", agency: "$8k-$20k", tb: "$997-$4,997" },
    { label: "Design", freelancer: "Template", agency: "Custom", tb: "Custom" },
    { label: "Timeline", freelancer: "2-6 weeks", agency: "8-12 weeks", tb: "24 hours" },
    { label: "Support", freelancer: "None", agency: "Account mgr", tb: "Direct engineer" },
    { label: "Performance", freelancer: "Generic", agency: "Variable", tb: "Core Web Vitals opt." },
];

function ComparisonTable() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-12">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>The Credibility Gap</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    Not all web studios are equal.
                </h2>
            </motion.div>

            <motion.div
                variants={stagger(0.08)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="overflow-hidden rounded-2xl border border-white/8"
            >
                {/* Header row */}
                <div className="grid grid-cols-4 border-b border-white/8 bg-white/[0.03]">
                    <div className="px-6 py-4" />
                    {[
                        { label: "Freelancer", sub: "Budget tier" },
                        { label: "Traditional Agency", sub: "Enterprise tier" },
                        { label: "TechBridge 24-Hour", sub: "Speed arbitrage", highlight: true },
                    ].map((col) => (
                        <div
                            key={col.label}
                            className={`relative px-6 py-5 ${col.highlight ? "bg-violet-950/30" : ""}`}
                        >
                            {col.highlight && (
                                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/80 to-violet-500/0" />
                            )}
                            <p className={`text-sm font-bold ${col.highlight ? "text-white" : "text-zinc-300"}`}>
                                {col.label}
                            </p>
                            <p className="mt-0.5 text-xs text-zinc-600">{col.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Data rows */}
                {COMPARISON_ROWS.map((row, i) => (
                    <motion.div
                        key={row.label}
                        variants={childFade}
                        className={`grid grid-cols-4 border-b border-white/5 last:border-0 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                    >
                        <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                            {row.label}
                        </div>
                        <div className="px-6 py-4 text-sm text-zinc-500">{row.freelancer}</div>
                        <div className="px-6 py-4 text-sm text-zinc-500">{row.agency}</div>
                        <div className="relative bg-violet-950/20 px-6 py-4 text-sm font-semibold text-white">
                            {row.tb}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 2.5 — THE ARSENAL (TECH STACK)
══════════════════════════════════════════════════════════ */
const STACK_MARQUEE_ROW_1 = [
    { name: "Next.js", label: "React Framework" },
    { name: "React", label: "UI Architecture" },
    { name: "Vercel", label: "Edge Deployment" },
    { name: "Tailwind CSS", label: "Precision Styling" },
    { name: "Framer Motion", label: "Fluid Animations" },
    { name: "Cloudflare", label: "DNS & Security" },
    { name: "Stripe", label: "Payment Integration" },
    { name: "Custom Domains", label: "Fully Managed Setup" },
];

// Row 2 scrolls opposite direction — same pills, different order
const STACK_MARQUEE_ROW_2 = [
    { name: "Vercel", label: "Global CDN" },
    { name: "Custom Domains", label: "DNS Config" },
    { name: "Stripe", label: "Payments" },
    { name: "Next.js", label: "App Router" },
    { name: "Cloudflare", label: "DDoS Protection" },
    { name: "Framer Motion", label: "60fps Animations" },
    { name: "React", label: "Component System" },
    { name: "Tailwind CSS", label: "Zero Runtime CSS" },
];

/* Inline keyframes injected once at the top of the section */
const marqueeCSS = `
  @keyframes marquee-left  { from { transform: translateX(0) }          to { transform: translateX(-50%) } }
  @keyframes marquee-right { from { transform: translateX(-50%) }       to { transform: translateX(0) } }
  .marquee-left  { animation: marquee-left  28s linear infinite; }
  .marquee-right { animation: marquee-right 22s linear infinite; }
  .marquee-left:hover,
  .marquee-right:hover { animation-play-state: paused; }
`;

/* Individual pill */
function StackPill({ name, label }: { name: string; label: string }) {
    return (
        <div className="group mx-3 flex-shrink-0 flex items-center gap-3 rounded-xl border border-white/8 bg-neutral-900/60 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-950/25 hover:shadow-[0_0_20px_rgba(109,40,217,0.15)]">
            {/* Glow dot */}
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500/60 shadow-[0_0_6px_rgba(167,139,250,0.6)] group-hover:bg-violet-400" />
            <div>
                <p className="whitespace-nowrap text-sm font-semibold text-white">{name}</p>
                <p className="whitespace-nowrap text-xs text-zinc-600 group-hover:text-zinc-500">{label}</p>
            </div>
        </div>
    );
}

function TechStack() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: marqueeCSS }} />

            {/* Header */}
            <div className="mx-auto mb-16 max-w-5xl px-6 text-center lg:px-12">
                <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"}>
                    <Eyebrow>The Arsenal</Eyebrow>
                    <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                        Silicon Valley Infrastructure.{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            Zero WordPress Bloat.
                        </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-500">
                        We don&apos;t use cheap drag-and-drop builders. Your site is engineered on
                        the exact same modern tech stack used by the world&apos;s fastest tech
                        companies, deployed globally to the edge.
                    </p>
                </motion.div>
            </div>

            {/* ── Marquee rows ─────────────────────────────── */}
            <motion.div
                variants={fadeUp(0.2)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="relative"
            >
                {/* Left fade mask — subtle so it doesn't break global side glow */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-neutral-950/80 to-transparent" />
                {/* Right fade mask */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-neutral-950/80 to-transparent" />

                {/* Row 1 — scrolls left */}
                <div className="flex overflow-hidden py-3">
                    <div className="marquee-left flex">
                        {[...STACK_MARQUEE_ROW_1, ...STACK_MARQUEE_ROW_1].map((item, i) => (
                            <StackPill key={`r1-${i}`} name={item.name} label={item.label} />
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls right */}
                <div className="flex overflow-hidden py-3">
                    <div className="marquee-right flex">
                        {[...STACK_MARQUEE_ROW_2, ...STACK_MARQUEE_ROW_2].map((item, i) => (
                            <StackPill key={`r2-${i}`} name={item.name} label={item.label} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Performance stat strip ───────────────────── */}
            <motion.div
                variants={fadeUp(0.3)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="mx-auto mt-14 max-w-5xl px-6 lg:px-12"
            >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { stat: "<1s", label: "Global load time", sub: "via Vercel Edge" },
                        { stat: "100", label: "Lighthouse score", sub: "Core Web Vitals" },
                        { stat: "99.99%", label: "Uptime SLA", sub: "Cloudflare infra" },
                        { stat: "A+", label: "SSL security grade", sub: "HSTS + TLS 1.3" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="group relative overflow-hidden rounded-xl border border-white/8 bg-neutral-900/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/15"
                        >
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.1) 0%, rgba(109,40,217,0) 100%)" }} />
                            <p className="font-mono text-3xl font-extrabold text-white">{item.stat}</p>
                            <p className="mt-1 text-xs font-semibold text-zinc-400">{item.label}</p>
                            <p className="mt-0.5 text-xs text-zinc-700">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 3 — 24-HOUR PROCESS TIMELINE
══════════════════════════════════════════════════════════ */
const TIMELINE = [
    {
        time: "Day 0  ·  30 min",
        title: "Scope Confirmed",
        desc: "We lock in your goals, branding, and sitemap in a focused 30-minute kickoff call. 50% deposit collected.",
        tag: "Kickoff",
    },
    {
        time: "9:00 AM",
        title: "Design & Architecture Begin",
        desc: "Our engineer starts your custom layout - no theme files, no page builders. Built precisely for your brand.",
    },
    {
        time: "5:00 PM",
        title: "Staging Site Live",
        desc: "Your complete site is deployed to a private staging URL for your review. We walk you through it live.",
    },
    {
        time: "8:00 PM",
        title: "Revisions Applied. You're Live.",
        desc: "After your approval, we apply all revisions, point your DNS, and your site goes live before you sleep.",
    },
];

function TimelineStep({
    step,
    dotRef,
    index
}: {
    step: typeof TIMELINE[number];
    dotRef?: React.RefObject<HTMLDivElement | null>;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isCenterInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

    return (
        <div className="contents">
            {/* Left rail - dot (col 1) */}
            <div className="relative flex justify-center pt-8">
                <motion.div
                    ref={dotRef}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
                    className="relative flex h-11 w-11 items-center justify-center"
                >
                    <span className={`absolute inset-0 rounded-full blur-md transition-all duration-700 ${isCenterInView ? "bg-violet-500/60 scale-[1.2]" : "bg-violet-500/10"}`} />
                    <span className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-700 ${isCenterInView ? "border-violet-500/40 bg-violet-950/60 shadow-[0_0_20px_rgba(109,40,217,0.4)]" : "border-violet-500/10 bg-violet-950/20 shadow-none"}`}>
                        <span className={`font-mono text-xs font-bold transition-colors duration-700 ${isCenterInView ? "text-violet-300" : "text-violet-500/50"}`}>{String(index + 1).padStart(2, "0")}</span>
                    </span>
                </motion.div>
            </div>

            {/* Glass card (col 2) */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-700 p-6 backdrop-blur-sm ${isCenterInView
                    ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] scale-[1.01]"
                    : "border-white/8 bg-neutral-900/50 hover:border-white/15"
                    }`}
            >
                {/* Active glow gradient */}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${isCenterInView ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background:
                            "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 100%)",
                    }}
                />
                <div className="mb-2 relative z-10 flex flex-wrap items-center gap-3">
                    {step.tag && (
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-700 ${isCenterInView ? "border-violet-500/30 bg-violet-950/60 text-violet-400" : "border-violet-500/10 bg-violet-950/20 text-violet-500/60"
                            }`}>
                            {step.tag}
                        </span>
                    )}
                    <span className={`font-mono text-xs transition-colors duration-700 ${isCenterInView ? "text-violet-300" : "text-zinc-600"}`}>
                        {step.time}
                    </span>
                </div>
                <h3 className={`relative z-10 mb-2 border-none text-base font-bold transition-colors duration-700 ${isCenterInView ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                    {step.title}
                </h3>
                <p className={`relative z-10 text-sm leading-relaxed transition-colors duration-700 ${isCenterInView ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"}`}>
                    {step.desc}
                </p>
            </motion.div>
        </div>
    );
}

function Timeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 50%", "end 50%"],
    });

    const [lineHeight, setLineHeight] = useState(0);
    const lastDotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (timelineRef.current && lastDotRef.current) {
                const timelineRect = timelineRef.current.getBoundingClientRect();
                const lastDotRect = lastDotRef.current.getBoundingClientRect();
                const centerPos = lastDotRect.top - timelineRect.top + (lastDotRect.height / 2);
                setLineHeight(centerPos);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <div ref={sectionRef} className="mx-auto max-w-3xl px-6 lg:px-12">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isHeaderInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>The 24-Hour Process</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    From kickoff to live - in a single day.
                </h2>
            </motion.div>

            <div
                ref={timelineRef}
                className="relative grid grid-cols-[3rem_1fr] gap-x-5 gap-y-10"
            >
                {/* Vertical rail line Background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[1.375rem] top-0 h-full w-px bg-white/5"
                />

                {/* Glow line: scroll-driven scaleY from center of dot 1 to center of dot 4 */}
                <motion.div
                    aria-hidden="true"
                    style={{
                        scaleY: lineHeight ? lineScaleY : 0,
                        originY: 0,
                        // Start at center of first dot (pt-8 = 32px + h-11/2 = 22px => 54px)
                        height: lineHeight ? (lineHeight - 54) : "100%"
                    }}
                    className="pointer-events-none absolute left-[1.375rem] top-[54px] w-px"
                >
                    <div className="h-full w-[2px] -ml-[0.5px] bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500/10" />
                    <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/60 blur-md" />
                </motion.div>

                {TIMELINE.map((step, i) => (
                    <TimelineStep
                        key={i}
                        index={i}
                        step={step}
                        dotRef={i === TIMELINE.length - 1 ? lastDotRef : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 4 — SOCIAL PROOF / LIVE EXAMPLE
══════════════════════════════════════════════════════════ */
const SOCIAL_PROOF_PROJECTS = [
    {
        client: "NextLex",
        metrics: "14 Days",
        metricSubtitle: "From Idea To Live",
        engagementType: "Extended Engagement",
        desc: "A premium marketing website for a legal document automation SaaS. Designed and deployed rapidly to support their high-growth acquisition strategy.",
        link: "https://nextlex.com",
        tags: ["Next.js", "Marketing Site", "SEO"],
        assets: ["/proofs/NextLex/1.png", "/proofs/NextLex/2.png", "/proofs/NextLex/3.png", "/proofs/NextLex/4.png"],
        accentColor: "rgb(139,92,246)", // violet
    },
    {
        client: "PrimeMark Apparel",
        metrics: "12x",
        metricSubtitle: "Lead Quality",
        engagementType: "Extended Engagement",
        desc: "High-performance digital storefront streamlining global supply chain operations. A premium web presence built to capture enterprise leads.",
        link: "https://primemarkapparel.com",
        tags: ["Corporate Site", "Lead Gen", "Performance"],
        assets: ["/proofs/PrimeMark/1.png", "/proofs/PrimeMark/2.png", "/proofs/PrimeMark/3.png", "/proofs/PrimeMark/4.png"],
        accentColor: "rgb(99,102,241)", // indigo
    },
    {
        client: "AliWali Trading Co.",
        metrics: "35+",
        metricSubtitle: "Years of Legacy",
        engagementType: "24-Hour Build",
        desc: "A fast, modern digital presence for a direct buyer of industrial plied rubber conveyor belts. Replacing an outdated platform with zero downtime.",
        link: "https://aliwalitradingco.com",
        tags: ["Next.js", "Global Reach", "B2B Portal"],
        assets: ["/proofs/AliWali/1.png", "/proofs/AliWali/2.png", "/proofs/AliWali/3.png", "/proofs/AliWali/4.png"],
        accentColor: "rgb(109,40,217)", // violet-700
    },
];

import { CaseStudyReel } from "@/components/remotion/CaseStudyReel";
import { PlayerRef } from "@remotion/player";

function AccordionRow({ project, index, expanded, setExpanded, onSelect }: { project: typeof SOCIAL_PROOF_PROJECTS[number], index: number, expanded: number, setExpanded: (idx: number) => void, onSelect: (p: typeof SOCIAL_PROOF_PROJECTS[number]) => void }) {
    const isExpanded = expanded === index;
    const playerRef = useRef<PlayerRef>(null);

    // Refined VERY slow, heavily weighted scrub on hover simulation
    const springProgress = useSpring(0, { damping: 60, stiffness: 20, mass: 3 });

    useEffect(() => {
        if (isExpanded) {
            springProgress.set(1);
        } else {
            springProgress.set(0);
        }
    }, [isExpanded, springProgress]);

    useMotionValueEvent(springProgress, "change", (latest) => {
        if (playerRef.current) {
            const frame = Math.floor(latest * 600); // 600 frames mapped to sequence
            playerRef.current.seekTo(frame);
        }
    });

    return (
        <motion.div
            layout
            onHoverStart={() => setExpanded(index)}
            onClick={() => isExpanded ? onSelect(project) : setExpanded(index)}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${isExpanded ? 'border-white/20 bg-neutral-900/60' : 'border-white/5 bg-neutral-900/20 hover:bg-neutral-900/40'}`}
        >
            <div className={`p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>

                {/* Text Data */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2 flex-wrap">
                        <span className="font-mono text-3xl font-extrabold text-white">{project.metrics}</span>
                        <div className="h-4 w-px bg-white/20" />
                        <h4 className="text-xl font-bold tracking-tight text-white">{project.client}</h4>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${project.engagementType === "24-Hour Build" ? "border border-green-500/30 bg-green-950/40 text-green-400" : "border border-white/10 bg-white/[0.04] text-zinc-500"}`}>
                            {project.engagementType}
                        </span>
                    </div>

                    {isExpanded && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                            <p className="text-sm text-zinc-400 max-w-lg mb-6">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(t => (
                                    <span key={t} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500">{t}</span>
                                ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white tracking-widest uppercase hover:text-violet-400 transition-colors">
                                View Live Site <ExternalLink size={14} />
                            </a>
                        </motion.div>
                    )}
                </div>

                {/* Video Player */}
                <motion.div
                    layout
                    className={`relative overflow-hidden rounded-xl bg-black border border-white/10 transition-all duration-700 ${isExpanded ? 'w-full md:w-1/2 aspect-video scale-[1.02]' : 'w-full md:w-1/4 h-24 scale-100 hover:border-white/20'}`}
                    style={{
                        boxShadow: `0 0 20px ${project.accentColor.replace("rgb", "rgba").replace(")", ", 0.15)")}`
                    }}
                >
                    <CaseStudyReel playerRef={playerRef} brand={project.client} assets={project.assets} theme={project.accentColor} />
                </motion.div>

            </div>
        </motion.div>
    );
}

function SocialProof() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [expanded, setExpanded] = useState(0);
    const [selectedProject, setSelectedProject] = useState<typeof SOCIAL_PROOF_PROJECTS[number] | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset image index when project changes
    useEffect(() => { setCurrentImageIndex(0); }, [selectedProject]);

    // Escape listener and Navbar occlusion / body lock
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };

        if (selectedProject) {
            document.body.style.overflow = "hidden";
            window.dispatchEvent(new CustomEvent("force-hide-navbar", { detail: { hide: true } }));
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
            window.dispatchEvent(new CustomEvent("force-hide-navbar", { detail: { hide: false } }));
        }

        return () => {
            // cleanup safely in case of dismount
            document.body.style.overflow = "unset";
            window.dispatchEvent(new CustomEvent("force-hide-navbar", { detail: { hide: false } }));
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProject]);

    const currentProjectIndex = SOCIAL_PROOF_PROJECTS.findIndex((p) => p.client === selectedProject?.client);

    const handlePrevProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentProjectIndex < 0) return;
        const prev = currentProjectIndex > 0 ? currentProjectIndex - 1 : SOCIAL_PROOF_PROJECTS.length - 1;
        setSelectedProject(SOCIAL_PROOF_PROJECTS[prev]);
    };

    const handleNextProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentProjectIndex < 0) return;
        const next = currentProjectIndex < SOCIAL_PROOF_PROJECTS.length - 1 ? currentProjectIndex + 1 : 0;
        setSelectedProject(SOCIAL_PROOF_PROJECTS[next]);
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : (selectedProject?.assets.length || 1) - 1));
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev < (selectedProject?.assets.length || 1) - 1 ? prev + 1 : 0));
    };

    return (
        <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-12 py-10">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>Live Examples</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    Built by us. Already live.
                </h2>
                <p className="mt-4 text-sm text-zinc-500 font-mono tracking-widest uppercase">{"//"} INTERACTIVE WALKTHROUGH</p>
            </motion.div>

            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={isInView ? "show" : "hidden"} className="flex flex-col gap-4">
                {SOCIAL_PROOF_PROJECTS.map((project, i) => (
                    <AccordionRow key={project.client} project={project} index={i} expanded={expanded} setExpanded={setExpanded} onSelect={setSelectedProject} />
                ))}
            </motion.div>

            {/* CLICK INTERACTION MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Level 1 Nav: Project Switchers */}
                        <button onClick={handlePrevProject} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-black/60 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={handleNextProject} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-black/60 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                            <ChevronRight size={24} />
                        </button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden rounded-3xl border border-white/10 bg-neutral-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute right-4 md:right-6 top-4 md:top-6 z-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-3xl md:text-4xl font-extrabold text-white">{selectedProject.metrics}</span>
                                <div className="h-6 w-px bg-white/20" />
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{selectedProject.client}</h3>
                                    <p className="text-xs md:text-sm font-mono tracking-widest text-zinc-500 uppercase">{selectedProject.metricSubtitle}</p>
                                </div>
                            </div>

                            {/* Image Carousel (Level 2 Nav) */}
                            <div className="relative mb-8 w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group/carousel">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedProject.assets[currentImageIndex]}
                                    alt={`${selectedProject.client} screenshot`}
                                    className="w-full h-full object-cover object-top"
                                />

                                {/* Floating Slide Counter */}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white/80 font-mono text-[10px] uppercase tracking-widest z-10">
                                    IMG {currentImageIndex + 1} / {selectedProject.assets.length}
                                </div>

                                {/* Inner Image Nav Buttons */}
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/70 opacity-0 group-hover/carousel:opacity-100 hover:text-white hover:bg-white/15 transition-all"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/70 opacity-0 group-hover/carousel:opacity-100 hover:text-white hover:bg-white/15 transition-all"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                <div className="md:col-span-2">
                                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                                        {selectedProject.desc}
                                    </p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Tech Stack & Features</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map((t: string) => (
                                            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-900/20"
                            >
                                <span className="relative z-10 tracking-widest uppercase">Explore Live Platform</span>
                                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                <div
                                    className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${selectedProject.accentColor.replace('rgb', 'rgba').replace(')', ', 0.1)')}, transparent)` }}
                                />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 5 — PRICING TIERS
══════════════════════════════════════════════════════════ */
const TIERS = [
    {
        name: "Starter",
        price: "$997",
        description: "Perfect for early-stage ventures and local businesses.",
        highlight: false,
        features: [
            "Single-page custom site",
            "Live within 24 hours",
            "Mobile-responsive design",
            "Contact form integration",
            "Basic SEO metadata",
            "7 days of post-launch support",
        ],
    },
    {
        name: "Standard",
        price: "$2,497",
        description: "Multi-page site with animation and CMS. The most popular choice.",
        highlight: true,
        badge: "Most Popular",
        features: [
            "Up to 5 custom pages",
            "Framer Motion animations",
            "CMS integration (headless)",
            "Core Web Vitals optimized",
            "Google Analytics setup",
            "14 days of post-launch support",
        ],
    },
    {
        name: "Premium",
        price: "$4,997",
        description: "Full-service launch - copywriting, SEO, and 30-day partnership.",
        highlight: false,
        features: [
            "Everything in Standard",
            "Conversion copywriting",
            "Full SEO setup & sitemap",
            "Custom domain & DNS config",
            "Performance audit report",
            "30 days of post-launch support",
        ],
    },
];

function Pricing() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} id="pricing" className="mx-auto max-w-6xl px-6 lg:px-12">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>Transparent Pricing</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    Pick your launch tier.
                </h2>
                <p className="mt-4 text-zinc-500">All tiers delivered in 24 hours. No hidden fees.</p>
            </motion.div>

            <motion.div
                variants={stagger(0.1)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="grid grid-cols-1 gap-5 md:grid-cols-3"
            >
                {TIERS.map((tier) => (
                    <motion.div
                        key={tier.name}
                        variants={childFade}
                        className={`relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:border-white/20
              ${tier.highlight
                                ? "border-violet-500/40 bg-violet-950/30 shadow-[0_0_40px_rgba(109,40,217,0.2)]"
                                : "border-white/8 bg-neutral-900/40 hover:bg-neutral-900/60"
                            }`}
                    >
                        {/* Top glow for highlight */}
                        {tier.highlight && (
                            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                        )}

                        {/* Badge */}
                        {tier.badge && (
                            <div className="absolute right-5 top-5">
                                <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                                    {tier.badge}
                                </span>
                            </div>
                        )}

                        <div className="p-8">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-600">{tier.name}</p>
                            <div className="mb-3 flex items-baseline gap-1">
                                <span className="font-mono text-5xl font-extrabold text-white">{tier.price}</span>
                                <span className="text-sm text-zinc-600">one-time</span>
                            </div>
                            <p className="mb-8 text-sm leading-relaxed text-zinc-500">{tier.description}</p>

                            <ul className="mb-8 flex flex-col gap-3">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                                        <Check size={14} className="mt-0.5 flex-shrink-0 text-violet-400" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto px-8 pb-8">
                            <a
                                href="/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative w-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300
                  ${tier.highlight
                                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_24px_rgba(109,40,217,0.3)] hover:shadow-[0_0_36px_rgba(109,40,217,0.5)] hover:scale-[1.02]"
                                        : "border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]"
                                    }`}
                            >
                                <span className="relative z-10">Book This Plan</span>
                                <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                                {tier.highlight && (
                                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                )}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 6 — CARE PLANS
══════════════════════════════════════════════════════════ */
const CARE_PLANS = [
    {
        name: "Site Care Plan",
        price: "$197",
        period: "/mo",
        description: "Everything you need to keep your site healthy, updated, and protected - hands-free.",
        features: [
            "Managed hosting & SSL",
            "Security & plugin updates",
            "Uptime monitoring (24/7)",
            "1 round of content edits/mo",
            "Monthly performance report",
        ],
    },
    {
        name: "Growth Plan",
        price: "$497",
        period: "/mo",
        description: "Care Plan plus active conversion rate optimization and monthly growth deliverables.",
        highlight: true,
        features: [
            "Everything in Care Plan",
            "2 new landing pages/mo",
            "A/B testing setup",
            "CRO analysis & tweaks",
            "Priority engineer access",
        ],
    },
];

function CarePlans() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-12">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>Post-Launch Protection</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    Keep it live. Keep it growing.
                </h2>
                <p className="mt-4 text-zinc-500">Retain us monthly. Cancel anytime.</p>
            </motion.div>

            <motion.div
                variants={stagger(0.12)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
                {CARE_PLANS.map((plan) => (
                    <motion.div
                        key={plan.name}
                        variants={childFade}
                        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm
              ${plan.highlight
                                ? "border-violet-500/40 bg-violet-950/25 shadow-[0_0_30px_rgba(109,40,217,0.15)]"
                                : "border-white/8 bg-neutral-900/40"
                            }`}
                    >
                        {plan.highlight && (
                            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                        )}
                        <div className="p-8">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-600">{plan.name}</p>
                            <div className="mb-3 flex items-baseline gap-0.5">
                                <span className="font-mono text-4xl font-extrabold text-white">{plan.price}</span>
                                <span className="text-sm text-zinc-600">{plan.period}</span>
                            </div>
                            <p className="mb-7 text-sm leading-relaxed text-zinc-500">{plan.description}</p>
                            <ul className="mb-8 flex flex-col gap-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                                        <Check size={13} className="mt-0.5 flex-shrink-0 text-violet-400" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300
                  ${plan.highlight
                                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
                                        : "border border-white/10 bg-white/[0.04] text-white hover:border-white/20"
                                    }`}
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP 7 — FAQ
══════════════════════════════════════════════════════════ */
const FAQS = [
    {
        q: "Is it built on a template?",
        a: "No. Every site we build is custom-designed and custom-coded from scratch for your brand. We never use Wix, Webflow templates, or WordPress themes - it's all Next.js, Tailwind, and precision engineering.",
    },
    {
        q: "What about changes after launch?",
        a: "Minor revisions are included in all tiers. For ongoing edits, content additions, or growing your site over time, our Site Care and Growth Plans cover you with monthly edit rounds and new landing pages.",
    },
    {
        q: "What do I need to provide?",
        a: "We need your logo (or brand guidelines), the copy/text for each page, and your primary brand colors. If you don't have copy ready, our Premium tier includes professional conversion copywriting.",
    },
    {
        q: "Is 24 hours actually realistic?",
        a: "Yes - for single and multi-page sites. The 24-hour window starts after your kickoff call and deposit. We've delivered this multiple times for real clients. The Ali Wali Trading Company platform above is a live example.",
    },
    {
        q: "What technology do you use?",
        a: "Next.js App Router, Tailwind CSS, Framer Motion, and headless CMS (Sanity or Contentful) for content-heavy sites. All sites are deployed to Vercel with a global CDN for sub-second load times.",
    },
];

function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className="mx-auto max-w-3xl px-6 lg:px-12">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="mb-14 text-center">
                <Eyebrow>Common Questions</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    Everything you need to know.
                </h2>
            </motion.div>

            <motion.div
                variants={stagger(0.07)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="flex flex-col gap-3"
            >
                {FAQS.map((faq, i) => {
                    const open = openIdx === i;
                    return (
                        <motion.div
                            key={i}
                            variants={childFade}
                            className={`overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300
                ${open ? "border-violet-500/30 bg-violet-950/20" : "border-white/8 bg-neutral-900/40 hover:border-white/15"}`}
                        >
                            <button
                                onClick={() => setOpenIdx(open ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="text-sm font-semibold text-white">{faq.q}</span>
                                <ChevronDown
                                    size={16}
                                    className={`flex-shrink-0 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180 text-violet-400" : ""}`}
                                />
                            </button>
                            {open && (
                                <div className="border-t border-white/5 px-6 pb-5 pt-4">
                                    <p className="text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   FINAL CTA SECTION
══════════════════════════════════════════════════════════ */
function FinalCTA() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative overflow-hidden py-28 lg:py-36">
            {/* Ambient blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%)"
                }}
            />

            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-12">
                <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? "show" : "hidden"}>
                    <Eyebrow>Start Your Project</Eyebrow>
                </motion.div>

                <motion.h2
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-5 text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl"
                >
                    Ready to launch{" "}
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                        tomorrow?
                    </span>
                </motion.h2>

                <motion.p
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-10 text-lg text-zinc-400"
                >
                    Book your slot now. We have limited capacity. Once your spot is
                    confirmed, we start the clock.
                </motion.p>

                <motion.div
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_52px_rgba(109,40,217,0.55)]"
                    >
                        <span className="relative z-10">Book Your Slot</span>
                        <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                        Or send us a message first →
                    </Link>
                </motion.div>

                {/* Small trust notes */}
                <motion.p
                    variants={fadeUp(0.4)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mt-8 text-xs text-zinc-700"
                >
                    50% deposit on booking · Balance due on delivery · Slots are first-come, first-served
                </motion.p>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════════════════ */
export default function WebsitesPage() {
    return (
        <div
            className="relative z-10 overflow-hidden min-h-screen border border-violet-500/20 rounded-none"
            style={{ animation: "violet-pulse 4s ease-in-out infinite" }}
        >
            {/* Full-bleed side, top, and bottom ambient glows — high z-index to stay on top of section masks */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-50 h-64 bg-gradient-to-b from-violet-600/5 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-64 bg-gradient-to-t from-violet-600/5 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-50 w-[30px] bg-gradient-to-r from-violet-600/10 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-50 w-[30px] bg-gradient-to-l from-violet-600/10 to-transparent" />
            <Hero />

            {/* Separator */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 2 — Comparison */}
            <section className="py-24 lg:py-32">
                <ComparisonTable />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 2.5 — Tech Stack */}
            <section className="py-24 lg:py-32">
                <TechStack />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 3 — Timeline */}
            <section className="py-24 lg:py-32">
                <Timeline />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 4 — Social Proof */}
            <section className="py-24 lg:py-32">
                <SocialProof />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 5 — Pricing */}
            <section className="py-24 lg:py-32">
                <Pricing />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 6 — Care Plans */}
            <section className="py-24 lg:py-28">
                <CarePlans />
            </section>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* Step 7 — FAQ */}
            <section className="py-24 lg:py-32">
                <FAQ />
            </section>

            {/* Final CTA */}
            <FinalCTA />

        </div>
    );
}
