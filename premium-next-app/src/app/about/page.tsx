"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Code2,
    FileCheck,
    Globe,
    Linkedin,
    Lock,
    Shield,
    XCircle,
} from "lucide-react";
import { blurFocusIn, slideFromLeft, slideFromRight, wordContainerVariants, wordVariants, ClipReveal } from "@/components/shared/headingAnimations";
import { InteriorHeroBlob } from "@/components/shared/InteriorHeroBlob";
import { PageFooterGlow } from "@/components/shared/PageFooterGlow";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const VALUES = [
    {
        icon: Code2,
        title: "AI From Line One",
        description:
            "We make architecture decisions based on your actual constraints, not whatever framework is trending on Twitter this week.",
    },
    {
        icon: Shield,
        title: "No Middlemen. No Juniors.",
        description:
            "No delivery theater. If we built it, we're accountable for it. The goal is dependable software, not impressive slide decks.",
    },
    {
        icon: Clock,
        title: "We Ship Fast Because We're Good",
        description:
            "We move fast by eliminating waste from the process, not by skipping tests or writing code that future-you will regret.",
    },
    {
        icon: Globe,
        title: "Code That Survives Your Series B",
        description:
            "Architecture and oversight in West Virginia. Engineering execution in Lahore. Same code reviews, same standards, same accountability.",
    },
];

const TIMELINE = [
    {
        year: "2022",
        title: "Founded in Morgantown, WV",
        description:
            "TechBridge was founded by Sajawal Ali Sohail at West Virginia University with a computer science-first approach to B2B engineering.",
    },
    {
        year: "2023",
        title: "First Client Momentum",
        description:
            "Delivered premium client work across websites and custom software engagements, building a reputation for speed and strong execution.",
    },
    {
        year: "2024",
        title: "Hybrid Delivery Model",
        description:
            "Scaled into a hybrid model with dedicated engineering support in Pakistan while keeping architecture and oversight tightly aligned.",
    },
    {
        year: "2025",
        title: "AI and Product Systems",
        description:
            "Expanded into AI workflow automation, custom internal systems, and higher-throughput SaaS product work for B2B clients.",
    },
];

interface TeamMember {
    name: string;
    role: string;
    location: string;
    bio: string;
    imageSrc: string;
    linkedinUrl: string;
}

const TEAM: TeamMember[] = [
    {
        name: "Sajawal Ali Sohail",
        role: "Founder & Lead Architect",
        location: "WV",
        bio: "WVU Computer Science alumnus leading business strategy, system architecture, UI and UX direction, and end-to-end project orchestration across TechBridge engagements.",
        imageSrc: "/headshots/Ali.jpg",
        linkedinUrl: "https://www.linkedin.com/in/sajawalalisohail/",
    },
    {
        name: "Hamza Majeed",
        role: "Head of Technology, Pakistan",
        location: "PK",
        bio: "Leads technical delivery across our Pakistan engineering function, overseeing implementation quality, engineering coordination, and execution across active client work.",
        imageSrc: "/headshots/Hamza.jpg",
        linkedinUrl: "https://www.linkedin.com/in/hamzamajeed1234/",
    },
];

const COMPARISON = [
    { feature: "Code review by senior architects", us: true, them: false },
    { feature: "Direct access to the builders", us: true, them: false },
    { feature: "Custom architecture per project", us: true, them: false },
    { feature: "Sub-24hr response time", us: true, them: false },
    { feature: "Post-launch monitoring included", us: true, them: false },
    { feature: "AI and automation capability", us: true, them: false },
    { feature: "Fixed-price estimates up front", us: true, them: true },
];

const SECURITY_ITEMS = [
    {
        icon: Lock,
        title: "Encryption in Transit and at Rest",
        description: "All data in transit and at rest is handled with industry-standard encryption practices.",
    },
    {
        icon: FileCheck,
        title: "Every Change Is Traceable",
        description: "Every deployment and change is traceable, reviewable, and easy to reason about.",
    },
    {
        icon: Shield,
        title: "OWASP During Development, Not After",
        description: "Security posture is considered during architecture and implementation, not bolted on later.",
    },
    {
        icon: Globe,
        title: "Your Data Stays Where You Need It",
        description: "We deploy to the regions your compliance and operations teams actually need.",
    },
];

function FounderCard() {
    return (
        <div className="relative h-full min-h-[480px] overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm lg:min-h-[560px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 0% 0%, rgba(var(--brand-accent-rgb), 0.15) 0%, rgba(var(--brand-accent-rgb), 0) 50%)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 100% 100%, rgba(var(--brand-accent-dark-rgb), 0.12) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-8 w-8 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark opacity-80 blur-sm" />
                        <span className="relative h-4 w-4 rounded-full bg-white" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">TechBridge</span>
                </div>
                <div className="text-center">
                    <span className="block select-none font-mono text-[120px] font-extrabold leading-none tracking-tighter text-white/[0.06]">
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
                            <span className="mt-1 block text-xs uppercase tracking-wider text-zinc-600">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);
    const storyRef = useRef<HTMLElement>(null);
    const teamRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLElement>(null);
    const timelineTrackRef = useRef<HTMLDivElement>(null);
    const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeMilestones, setActiveMilestones] = useState<boolean[]>(new Array(TIMELINE.length).fill(false));
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

    /* Scroll-driven milestone progress line */
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineTrackRef,
        offset: ["start 80%", "end 60%"],
    });

    useMotionValueEvent(timelineProgress, "change", (latest) => {
        const count = TIMELINE.length;
        setActiveMilestones((prev) => {
            const next = prev.map((_, i) => {
                const threshold = (i + 0.5) / count;
                return latest >= threshold;
            });
            if (next.every((v, i) => v === prev[i])) return prev;
            return next;
        });
    });

    const progressScaleY = useTransform(timelineProgress, [0, 1], [0, 1]);

    return (
        <div className="relative text-white">
            <div className="relative z-10 min-h-screen overflow-hidden">
                <section ref={heroRef} className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/5">
                    <InteriorHeroBlob preset="about" />
                    <div className="relative z-10 mx-auto max-w-[100rem] px-6 py-32 lg:px-10">
                        <motion.span variants={fadeUp(0)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                            <span className="h-px w-4 bg-brand-accent/40" />
                            about us
                        </motion.span>
                        <motion.h1 variants={blurFocusIn(0.1)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                            We&apos;re engineers.{" "}
                            <span className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                                Not an agency wearing a tech hat.
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp(0.22)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                            CS fundamentals, disciplined execution, and a deep discomfort with shipping anything we wouldn&apos;t maintain ourselves.
                        </motion.p>
                    </div>
                </section>

                <section ref={storyRef} className="relative py-24 lg:py-32">
                    <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}>
                            <FounderCard />
                        </motion.div>
                        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={isStoryInView ? "show" : "hidden"} className="flex flex-col justify-center">
                            <span className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">the short version</span>
                            <motion.h2
                                variants={slideFromLeft}
                                initial="hidden"
                                animate={isStoryInView ? "show" : "hidden"}
                                className="mb-7 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl"
                            >
                                Started because agencies kept disappointing us too.
                            </motion.h2>
                            <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                Based in Morgantown, WV. Founded because we kept seeing the same thing: agencies delivering beautiful front-ends on top of architectures that collapse under real load.
                            </p>
                            <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                                We bring actual engineering rigor to B2B companies that need their tech to be an asset, not a liability that slows them down in six months.
                            </p>
                            <div className="mt-10 border-l-2 border-brand-accent/60 pl-6">
                                <p className="text-base font-medium italic text-zinc-300 lg:text-lg">
                                    &quot;Your tech stack should be a weapon, not a weight.&quot;
                                </p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    Sajawal Ali Sohail, Founder
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={teamRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                                who builds your system
                            </span>
                            <motion.h2
                                variants={slideFromRight}
                                initial="hidden"
                                animate={isTeamInView ? "show" : "hidden"}
                                className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                            >
                                Names, not titles.
                            </motion.h2>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {TEAM.map((member) => (
                                <motion.article key={member.name} variants={childFade} className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-brand-accent/40 hover:bg-brand-accent/5">
                                    <div className="relative z-10">
                                        <div className="mb-6 flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                                                    <Image src={member.imageSrc} alt={member.name} fill className="object-cover" sizes="72px" />
                                                </div>
                                                <div>
                                                    <span className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-bold uppercase tracking-widest text-zinc-400">{member.location}</span>
                                                    <h3 className="mt-3 text-xl font-bold tracking-tight text-white">{member.name}</h3>
                                                </div>
                                            </div>
                                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light">
                                                <Linkedin size={18} />
                                            </a>
                                        </div>
                                        <p className="mb-4 text-sm font-medium text-brand-accent-light/80">{member.role}</p>
                                        <p className="text-sm leading-relaxed text-zinc-400">{member.bio}</p>
                                    </div>
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 100% 100%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 60%)" }} />
                                </motion.article>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeUp(0.3)} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                            <div className="flex-1">
                                <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                    TechBridge operates as a hybrid engineering firm with architecture leadership in Morgantown and a dedicated engineering function in Lahore. That structure lets us scale delivery while keeping technical oversight close to the work.
                                </p>
                            </div>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                                {[
                                    { label: "Discipline", value: "Computer Science" },
                                    { label: "Scale", value: "Dedicated Team" },
                                    { label: "Oversight", value: "WV Leadership" },
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

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={timelineRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTimelineInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />Milestones</span>
                            <motion.h2
                                variants={wordContainerVariants}
                                initial="hidden"
                                animate={isTimelineInView ? "show" : "hidden"}
                                className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                                style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                            >
                                {["How", "we", "got", "here."].map((word, index) => (
                                    <motion.span key={`${word}-${index}`} variants={wordVariants} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h2>
                        </motion.div>

                        {/* Timeline with progress line */}
                        <div ref={timelineTrackRef} className="relative">
                            {/* Vertical progress track (desktop only) */}
                            <div className="pointer-events-none absolute left-7 top-0 hidden h-full w-px lg:block" aria-hidden="true">
                                {/* Background track */}
                                <div className="h-full w-full bg-white/10" />
                                {/* Animated fill */}
                                <motion.div
                                    className="absolute left-0 top-0 w-full origin-top"
                                    style={{
                                        scaleY: progressScaleY,
                                        height: "100%",
                                        background: "linear-gradient(180deg, var(--brand-accent) 0%, var(--brand-accent-light) 100%)",
                                        boxShadow: "0 0 12px rgba(var(--brand-accent-rgb), 0.5), 0 0 4px rgba(var(--brand-accent-light-rgb), 0.3)",
                                    }}
                                />
                            </div>

                            <motion.div variants={staggerContainer} initial="hidden" animate={isTimelineInView ? "show" : "hidden"} className="space-y-12 lg:space-y-16">
                                {TIMELINE.map((event, index) => {
                                    const isActive = activeMilestones[index];
                                    return (
                                        <motion.div
                                            key={event.year}
                                            variants={childFade}
                                            ref={(el) => { milestoneRefs.current[index] = el; }}
                                            className="flex flex-col gap-4 lg:flex-row lg:gap-12"
                                        >
                                            <div className="flex items-center gap-4 lg:w-32 lg:flex-shrink-0">
                                                <div
                                                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl font-mono text-lg font-bold backdrop-blur-sm transition-all duration-700 ${
                                                        isActive
                                                            ? "border-brand-accent/60 bg-brand-accent/10 text-brand-accent-light"
                                                            : "border border-white/10 bg-neutral-900/80 text-white"
                                                    }`}
                                                    style={{
                                                        boxShadow: isActive
                                                            ? "0 0 20px rgba(var(--brand-accent-rgb), 0.35), inset 0 0 12px rgba(var(--brand-accent-rgb), 0.1)"
                                                            : "none",
                                                        borderWidth: "1px",
                                                        borderStyle: "solid",
                                                    }}
                                                >
                                                    {event.year.slice(-2)}
                                                </div>
                                                <span className="font-mono text-sm font-semibold text-zinc-500 lg:hidden">{event.year}</span>
                                            </div>
                                            <div
                                                className={`flex-1 rounded-2xl p-6 backdrop-blur-sm transition-all duration-700 lg:p-8 ${
                                                    isActive
                                                        ? "border border-brand-accent/40 bg-brand-accent/5"
                                                        : "border border-white/8 bg-neutral-900/30"
                                                }`}
                                                style={{
                                                    boxShadow: isActive
                                                        ? "0 0 30px rgba(var(--brand-accent-rgb), 0.15), 0 0 60px rgba(var(--brand-accent-rgb), 0.05)"
                                                        : "none",
                                                }}
                                            >
                                                <p className="mb-1 hidden font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600 lg:block">{event.year}</p>
                                                <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{event.title}</h3>
                                                <p className="text-sm leading-relaxed text-zinc-400">{event.description}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={valuesRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="mb-16">
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />what we won&apos;t compromise</span>
                            <motion.h2
                                variants={blurFocusIn()}
                                initial="hidden"
                                animate={isValuesInView ? "show" : "hidden"}
                                className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                            >
                                Four things we actually mean.
                            </motion.h2>
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {VALUES.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div key={value.title} variants={childFade} className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-brand-accent/40 hover:bg-brand-accent/5">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-brand-accent/40 group-hover:bg-brand-accent/5 group-hover:text-brand-accent-light"><Icon size={20} strokeWidth={1.5} /></div>
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{value.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={diffRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isDiffInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />honest comparison</span>
                            <motion.h2
                                variants={slideFromLeft}
                                initial="hidden"
                                animate={isDiffInView ? "show" : "hidden"}
                                className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                            >
                                Us vs. the last agency you hired.
                            </motion.h2>
                        </motion.div>
                        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={isDiffInView ? "show" : "hidden"} className="overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/30 backdrop-blur-sm">
                            <div className="grid grid-cols-[1fr_80px_80px] items-center border-b border-white/8 px-6 py-4 sm:grid-cols-[1fr_120px_120px] sm:px-8">
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Feature</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-brand-accent-light">Us</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">Them</span>
                            </div>
                            {COMPARISON.map((row, index) => (
                                <div key={row.feature} className={`grid grid-cols-[1fr_80px_80px] items-center px-6 py-3.5 sm:grid-cols-[1fr_120px_120px] sm:px-8 ${index < COMPARISON.length - 1 ? "border-b border-white/5" : ""}`}>
                                    <span className="text-sm text-zinc-400">{row.feature}</span>
                                    <span className="flex justify-center">{row.us ? <CheckCircle2 size={18} className="text-brand-accent-light" /> : <XCircle size={18} className="text-zinc-700" />}</span>
                                    <span className="flex justify-center">{row.them ? <CheckCircle2 size={18} className="text-zinc-500" /> : <XCircle size={18} className="text-zinc-700" />}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={securityRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isSecurityInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />security</span>
                            <motion.h2
                                variants={slideFromRight}
                                initial="hidden"
                                animate={isSecurityInView ? "show" : "hidden"}
                                className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                            >
                                Security that&apos;s built in, not bolted on.
                            </motion.h2>
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={isSecurityInView ? "show" : "hidden"} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {SECURITY_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={item.title} variants={childFade} className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-brand-accent/40 hover:bg-brand-accent/5">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-brand-accent/40 group-hover:bg-brand-accent/5 group-hover:text-brand-accent-light"><Icon size={20} strokeWidth={1.5} /></div>
                                        <h3 className="mb-2 text-base font-bold tracking-tight text-white">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-[100rem] px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-xl">
                                <ClipReveal>
                                    <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                        Ready to talk to the people who&apos;ll <span className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent">actually write your code?</span>
                                    </h2>
                                </ClipReveal>
                                <p className="mt-4 text-base leading-relaxed text-zinc-400">30 minutes. No sales pitch. Just the engineer who&apos;ll architect your system.</p>
                            </div>
                            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-accent-dark to-brand-accent-dark px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(var(--brand-accent-dark-rgb), 0.3)] transition-all duration-300 hover:shadow-brand-accent/10">
                                Book a Call
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                <PageFooterGlow />
            </div>
        </div>
    );
}
