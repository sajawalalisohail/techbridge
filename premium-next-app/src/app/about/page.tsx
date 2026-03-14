"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    Layers, Users, Zap, Shield, Clock, Code2, ArrowUpRight,
    CheckCircle2, XCircle, Lock, FileCheck, Globe,
} from "lucide-react";
import WhyChooseUs from "@/components/home/WhyChooseUs";

/* ─── Ease constant ───────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: EASE },
    },
});

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ─── Core Values ─────────────────────────────────────────── */
const VALUES = [
    {
        icon: Code2,
        title: "First-Principles Thinking",
        description:
            "We don't copy-paste boilerplate. Every architecture decision is traced back to the actual constraint — not a blog post or a trend.",
    },
    {
        icon: Shield,
        title: "Ownership Over Output",
        description:
            "We don't hand off and disappear. Every system we ship, we stand behind. We monitor, we iterate, we answer the phone at 2 AM if something breaks.",
    },
    {
        icon: Clock,
        title: "Velocity Without Shortcuts",
        description:
            "Fast doesn't mean hacky. We ship production-ready code at a pace that surprises agencies twice our size — without accruing technical debt.",
    },
    {
        icon: Globe,
        title: "Global Architecture, Local Precision",
        description:
            "US-based architecture and strategy paired with a dedicated engineering team — scaling execution without compromising quality or oversight.",
    },
];

/* ─── Timeline ────────────────────────────────────────────── */
const TIMELINE = [
    {
        year: "2022",
        title: "Founded in Morgantown, WV",
        description:
            "TechBridge was founded by Sajawal Ali Sohail at West Virginia University, combining a pure computer science background with a vision for B2B enterprise engineering.",
    },
    {
        year: "2023",
        title: "First Enterprise Clients",
        description:
            "Shipped production systems for NextLex, PrimeMark Apparel, and AliWali Trading Co. — establishing our reputation for rapid, high-quality delivery.",
    },
    {
        year: "2024",
        title: "Hybrid Model & Scale",
        description:
            "Expanded to a hybrid engineering model with distributed cells, enabling parallel execution on multiple enterprise projects without sacrificing oversight.",
    },
    {
        year: "2025",
        title: "AI Integration & SaaS",
        description:
            "Launched AI workflow automation capabilities and began building custom SaaS platforms, processing millions of events for B2B analytics clients.",
    },
];

/* ─── Team Data ───────────────────────────────────────────── */
interface TeamMember {
    name: string;
    role: string;
    location: string;
    bio: string;
    /** @internal Never rendered in DOM */
    partnerCompany?: string;
    /** @internal Never rendered in DOM */
    partnerRole?: string;
}

const TEAM: TeamMember[] = [
    {
        name: "Sajawal Ali Sohail",
        role: "Founder & Lead Architect",
        location: "WV",
        bio: "WVU Computer Science alumnus. Leads business strategy, system architecture, UI/UX design, and end-to-end project orchestration. The single point of accountability for every TechBridge engagement.",
    },
    // Hamza Majeed — Co-Founder & CTO
    // Also founder/owner of SydStack — TechBridge's strategic engineering partner
    // SydStack manages the Pakistan-based dev teams for TechBridge client engagements
    // This partnership is internal and not displayed publicly on the website
    {
        name: "Hamza Majeed",
        role: "Co-Founder & CTO",
        location: "PK",
        bio: "Leads technical operations, engineering team management, and delivery execution. Brings deep full-stack expertise and a track record of scaling distributed engineering teams across complex enterprise projects.",
        partnerCompany: "SydStack",
        partnerRole: "owner",
    },
];

/* ─── Comparison Table ────────────────────────────────────── */
const COMPARISON = [
    { feature: "Code review by senior architects", us: true, them: false },
    { feature: "Direct access to the builders", us: true, them: false },
    { feature: "Custom architecture per project", us: true, them: false },
    { feature: "Sub-24hr response time", us: true, them: false },
    { feature: "Post-launch monitoring included", us: true, them: false },
    { feature: "AI/ML integration capability", us: true, them: false },
    { feature: "Fixed-price estimates up front", us: true, them: true },
];

/* ─── Security Badges ─────────────────────────────────────── */
const SECURITY_ITEMS = [
    {
        icon: Lock,
        title: "End-to-End Encryption",
        description: "All data in transit and at rest is encrypted using industry-standard protocols.",
    },
    {
        icon: FileCheck,
        title: "Code Audit Trail",
        description: "Every commit is reviewed, every deployment is logged, every change is traceable.",
    },
    {
        icon: Shield,
        title: "OWASP Compliance",
        description: "All systems are built against the OWASP Top 10, with automated vulnerability scanning.",
    },
    {
        icon: Globe,
        title: "Data Residency Control",
        description: "Choose where your data lives. We deploy to the regions your compliance team requires.",
    },
];

/* ─── Decorative Glass Card (left column) ─────────────────── */
function FounderCard() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm h-full min-h-[480px] lg:min-h-[560px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 50%)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 100% 100%, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0) 50%)" }} />
            <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.12" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-dots)" />
            </svg>
            <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-8 w-8 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80 blur-sm" />
                        <span className="relative h-4 w-4 rounded-full bg-white" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">TechBridge</span>
                </div>
                <div className="text-center">
                    <span className="block font-mono text-[120px] font-extrabold leading-none tracking-tighter text-white/[0.06] select-none">
                        TB
                    </span>
                    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-600">Engineering Firm</p>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                    {[
                        { value: "WV", label: "Headquarters" },
                        { value: "CS", label: "Discipline" },
                        { value: "B2B", label: "Focus" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span className="block font-mono text-2xl font-bold text-white/80">{stat.value}</span>
                            <span className="mt-1 block text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);
    const storyRef = useRef<HTMLElement>(null);
    const teamRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const diffRef = useRef<HTMLElement>(null);
    const securityRef = useRef<HTMLElement>(null);

    const isHeroInView = useInView(heroRef, { once: true });
    const isStoryInView = useInView(storyRef, { once: true, margin: "-80px" });
    const isTeamInView = useInView(teamRef, { once: true, margin: "-80px" });
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
    const isValuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
    const isDiffInView = useInView(diffRef, { once: true, margin: "-80px" });
    const isSecurityInView = useInView(securityRef, { once: true, margin: "-80px" });

    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-hidden min-h-screen">

                {/* ── 1. Hero ── */}
                <section ref={heroRef} className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/5">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%)" }} />
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
                        <motion.span variants={fadeUp(0)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                            The TechBridge Ethos
                        </motion.span>
                        <motion.h1 variants={fadeUp(0.1)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                            Engineering as a discipline.{" "}
                            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Not an afterthought.
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp(0.22)} initial="hidden" animate={isHeroInView ? "show" : "hidden"}
                            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                            We believe in un-bloated architecture, rigorous computer science
                            fundamentals, and building systems that scale seamlessly — without
                            requiring a rewrite every 18 months.
                        </motion.p>
                    </div>
                </section>

                {/* ── 2. Founder Story ── */}
                <section ref={storyRef} className="relative py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                            <motion.div variants={fadeUp(0)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}>
                                <FounderCard />
                            </motion.div>
                            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}
                                className="flex flex-col justify-center">
                                <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Our Story</span>
                                <h2 className="mb-7 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
                                    Built from first principles.
                                </h2>
                                <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    Headquartered in Morgantown, West Virginia, TechBridge was
                                    founded by Sajawal Ali Sohail — a WVU Computer Science alumnus — to solve a
                                    critical gap in the B2B market: too many agencies focus on
                                    surface-level design while ignoring scalable architecture.
                                </p>
                                <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    We bring deep, rigorous software engineering to businesses that
                                    need their technology to be a lever — not a bottleneck. Every
                                    system we build is designed from the ground up for performance,
                                    security, and long-term maintainability.
                                </p>
                                <div className="mt-10 border-l-2 border-violet-500/60 pl-6">
                                    <p className="text-base font-medium italic text-zinc-300 lg:text-lg">
                                        &quot;Technology should compound your advantage over time —
                                        not create technical debt that slows you down.&quot;
                                    </p>
                                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        — Sajawal Ali Sohail, Founder
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 3. Team ── */}
                <section ref={teamRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                The Engineering Foundation
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                Who builds your systems.
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isTeamInView ? "show" : "hidden"}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                        >
                            {TEAM.map((member) => (
                                <motion.div
                                    key={member.name}
                                    variants={childFade}
                                    className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                                >
                                    <div className="mb-6 flex items-center justify-between">
                                        <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 text-xs font-bold uppercase tracking-widest text-zinc-400 select-none">
                                            {member.location}
                                        </span>
                                    </div>
                                    <h3 className="mb-1 text-xl font-bold tracking-tight text-white">
                                        {member.name}
                                    </h3>
                                    <p className="mb-4 text-sm font-medium text-violet-400/70">
                                        {member.role}
                                    </p>
                                    <p className="text-sm leading-relaxed text-zinc-400">
                                        {member.bio}
                                    </p>
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{ background: "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 60%)" }}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Hybrid model summary */}
                        <motion.div
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isTeamInView ? "show" : "hidden"}
                            className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12"
                        >
                            <div className="flex-1">
                                <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    TechBridge operates as a hybrid engineering firm headquartered in Morgantown, WV, with a dedicated engineering team in Lahore. This model lets us scale execution without compromising on quality standards or architectural oversight.
                                </p>
                            </div>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                                {[
                                    { label: "Discipline", value: "Computer Science" },
                                    { label: "Scale", value: "Distributed Teams" },
                                    { label: "Oversight", value: "WV Headquarters" },
                                    { label: "Model", value: "Hybrid Precision" },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{item.label}</p>
                                        <p className="mt-1 text-sm font-medium text-zinc-300">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 4. Timeline ── */}
                <section ref={timelineRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTimelineInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                Milestones
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                How we got here.
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isTimelineInView ? "show" : "hidden"}
                            className="relative"
                        >
                            {/* Vertical line */}
                            <div
                                aria-hidden="true"
                                className="absolute left-[27px] top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/40 via-white/8 to-transparent lg:block"
                            />

                            <div className="space-y-12 lg:space-y-16">
                                {TIMELINE.map((event, i) => (
                                    <motion.div
                                        key={event.year}
                                        variants={childFade}
                                        className="flex flex-col gap-4 lg:flex-row lg:gap-12"
                                    >
                                        {/* Year marker */}
                                        <div className="flex items-center gap-4 lg:w-32 lg:flex-shrink-0">
                                            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/80 font-mono text-lg font-bold text-white backdrop-blur-sm">
                                                {event.year.slice(-2)}
                                            </div>
                                            <span className="font-mono text-sm font-semibold text-zinc-500 lg:hidden">
                                                {event.year}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 rounded-2xl border border-white/8 bg-neutral-900/30 p-6 backdrop-blur-sm lg:p-8">
                                            <p className="mb-1 hidden font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600 lg:block">
                                                {event.year}
                                            </p>
                                            <h3 className="mb-3 text-lg font-bold tracking-tight text-white">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-zinc-400">
                                                {event.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── The TechBridge Advantage ── */}
                <WhyChooseUs />

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 5. Core Values ── */}
                <section ref={valuesRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="mb-16">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                Core Values
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                The principles we don&apos;t compromise on.
                            </h2>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isValuesInView ? "show" : "hidden"}
                            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {VALUES.map((v) => {
                                const Icon = v.icon;
                                return (
                                    <motion.div key={v.title} variants={childFade}
                                        className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/60">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{v.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{v.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 6. How We're Different ── */}
                <section ref={diffRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isDiffInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                The Difference
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                TechBridge vs. the typical agency.
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            animate={isDiffInView ? "show" : "hidden"}
                            className="overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/30 backdrop-blur-sm"
                        >
                            {/* Table header */}
                            <div className="grid grid-cols-[1fr_80px_80px] items-center border-b border-white/8 px-6 py-4 sm:grid-cols-[1fr_120px_120px] sm:px-8">
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Feature</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-violet-400">Us</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">Them</span>
                            </div>

                            {/* Rows */}
                            {COMPARISON.map((row, i) => (
                                <div
                                    key={row.feature}
                                    className={`grid grid-cols-[1fr_80px_80px] items-center px-6 py-3.5 sm:grid-cols-[1fr_120px_120px] sm:px-8 ${i < COMPARISON.length - 1 ? "border-b border-white/5" : ""
                                        }`}
                                >
                                    <span className="text-sm text-zinc-400">{row.feature}</span>
                                    <span className="flex justify-center">
                                        {row.us ? (
                                            <CheckCircle2 size={18} className="text-violet-400" />
                                        ) : (
                                            <XCircle size={18} className="text-zinc-700" />
                                        )}
                                    </span>
                                    <span className="flex justify-center">
                                        {row.them ? (
                                            <CheckCircle2 size={18} className="text-zinc-500" />
                                        ) : (
                                            <XCircle size={18} className="text-zinc-700" />
                                        )}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 7. Security & Compliance ── */}
                <section ref={securityRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isSecurityInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                Trust & Security
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                Enterprise-grade security, not afterthought checkboxes.
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isSecurityInView ? "show" : "hidden"}
                            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {SECURITY_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        variants={childFade}
                                        className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15"
                                    >
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-green-500/30 group-hover:bg-green-950/30 group-hover:text-green-400">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="mb-2 text-base font-bold tracking-tight text-white">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ── Separator ── */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>

                {/* ── 8. CTA ── */}
                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-xl">
                                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                    Ready to work with engineers who{" "}
                                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                        actually build?
                                    </span>
                                </h2>
                                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                                    Book a discovery call and talk directly to the team that will design,
                                    architect, and ship your system.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(109,40,217,0.5)] whitespace-nowrap"
                            >
                                Start a Project
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>

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
    );
}
