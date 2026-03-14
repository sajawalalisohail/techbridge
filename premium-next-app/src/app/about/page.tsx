"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
        title: "First-Principles Thinking",
        description:
            "We trace architecture decisions back to real constraints instead of trends, templates, or agency habits.",
    },
    {
        icon: Shield,
        title: "Ownership Over Output",
        description:
            "We stay close to what we ship. The goal is not delivery theater, it is dependable software and accountable execution.",
    },
    {
        icon: Clock,
        title: "Velocity Without Shortcuts",
        description:
            "We move fast by tightening process and reducing waste, not by cutting quality or piling on technical debt.",
    },
    {
        icon: Globe,
        title: "Global Execution, Clear Oversight",
        description:
            "US-based leadership and architecture paired with a dedicated engineering function in Pakistan for reliable delivery scale.",
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
        title: "End-to-End Encryption",
        description: "All data in transit and at rest is handled with industry-standard encryption practices.",
    },
    {
        icon: FileCheck,
        title: "Code Audit Trail",
        description: "Every deployment and change is traceable, reviewable, and easy to reason about.",
    },
    {
        icon: Shield,
        title: "OWASP-Aligned Delivery",
        description: "Security posture is considered during architecture and implementation, not bolted on later.",
    },
    {
        icon: Globe,
        title: "Data Residency Control",
        description: "We deploy to the regions your compliance and operations teams actually need.",
    },
];

function FounderCard() {
    return (
        <div className="relative h-full min-h-[480px] overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm lg:min-h-[560px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 50%)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 100% 100%, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0) 50%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-8 w-8 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80 blur-sm" />
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
            <div className="relative z-10 min-h-screen overflow-hidden">
                <section ref={heroRef} className="relative flex min-h-[55vh] items-center overflow-hidden border-b border-white/5">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%)" }} />
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
                        <motion.span variants={fadeUp(0)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                            <span className="h-px w-4 bg-violet-500/40" />
                            The TechBridge Ethos
                        </motion.span>
                        <motion.h1 variants={fadeUp(0.1)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                            Engineering as a discipline.{" "}
                            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                Not an afterthought.
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeUp(0.22)} initial="hidden" animate={isHeroInView ? "show" : "hidden"} className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                            We build with computer science fundamentals, disciplined execution, and a bias toward systems that stay dependable as they grow.
                        </motion.p>
                    </div>
                </section>

                <section ref={storyRef} className="relative py-24 lg:py-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isStoryInView ? "show" : "hidden"}>
                            <FounderCard />
                        </motion.div>
                        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={isStoryInView ? "show" : "hidden"} className="flex flex-col justify-center">
                            <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Our Story</span>
                            <h2 className="mb-7 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
                                Built from first principles.
                            </h2>
                            <p className="text-base leading-relaxed text-zinc-400 lg:text-lg">
                                Headquartered in Morgantown, West Virginia, TechBridge was founded to solve a familiar B2B problem: too much digital work looks polished on the surface but falls apart at the architecture layer.
                            </p>
                            <p className="mt-5 text-base leading-relaxed text-zinc-400 lg:text-lg">
                                We bring deeper engineering discipline to businesses that need technology to compound advantage over time, not create drag six months after launch.
                            </p>
                            <div className="mt-10 border-l-2 border-violet-500/60 pl-6">
                                <p className="text-base font-medium italic text-zinc-300 lg:text-lg">
                                    &quot;Technology should compound your advantage over time, not create debt that slows you down.&quot;
                                </p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    Sajawal Ali Sohail, Founder
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={teamRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />
                                The Engineering Foundation
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">Who builds your systems.</h2>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" animate={isTeamInView ? "show" : "hidden"} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {TEAM.map((member) => (
                                <motion.article key={member.name} variants={childFade} className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15">
                                    <div className="relative z-10">
                                        <div className="mb-6 flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                                                    <Image src={member.imageSrc} alt={member.name} fill className="object-cover" sizes="72px" />
                                                </div>
                                                <div>
                                                    <span className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-bold uppercase tracking-widest text-zinc-400">{member.location}</span>
                                                    <h3 className="mt-3 text-xl font-bold tracking-tight text-white">{member.name}</h3>
                                                </div>
                                            </div>
                                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-950/40 hover:text-violet-300">
                                                <Linkedin size={18} />
                                            </a>
                                        </div>
                                        <p className="mb-4 text-sm font-medium text-violet-300/80">{member.role}</p>
                                        <p className="text-sm leading-relaxed text-zinc-400">{member.bio}</p>
                                    </div>
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 60%)" }} />
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

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={timelineRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isTimelineInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />Milestones</span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">How we got here.</h2>
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={isTimelineInView ? "show" : "hidden"} className="space-y-12 lg:space-y-16">
                            {TIMELINE.map((event) => (
                                <motion.div key={event.year} variants={childFade} className="flex flex-col gap-4 lg:flex-row lg:gap-12">
                                    <div className="flex items-center gap-4 lg:w-32 lg:flex-shrink-0">
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/80 font-mono text-lg font-bold text-white backdrop-blur-sm">{event.year.slice(-2)}</div>
                                        <span className="font-mono text-sm font-semibold text-zinc-500 lg:hidden">{event.year}</span>
                                    </div>
                                    <div className="flex-1 rounded-2xl border border-white/8 bg-neutral-900/30 p-6 backdrop-blur-sm lg:p-8">
                                        <p className="mb-1 hidden font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600 lg:block">{event.year}</p>
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{event.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-400">{event.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>
                <WhyChooseUs />
                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={valuesRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="mb-16">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />Core Values</span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">The principles we do not compromise on.</h2>
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={isValuesInView ? "show" : "hidden"} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {VALUES.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div key={value.title} variants={childFade} className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/60">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-950/50 group-hover:text-violet-400"><Icon size={20} strokeWidth={1.5} /></div>
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{value.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={diffRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isDiffInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />The Difference</span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">TechBridge vs. the typical agency.</h2>
                        </motion.div>
                        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={isDiffInView ? "show" : "hidden"} className="overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/30 backdrop-blur-sm">
                            <div className="grid grid-cols-[1fr_80px_80px] items-center border-b border-white/8 px-6 py-4 sm:grid-cols-[1fr_120px_120px] sm:px-8">
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Feature</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-violet-400">Us</span>
                                <span className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">Them</span>
                            </div>
                            {COMPARISON.map((row, index) => (
                                <div key={row.feature} className={`grid grid-cols-[1fr_80px_80px] items-center px-6 py-3.5 sm:grid-cols-[1fr_120px_120px] sm:px-8 ${index < COMPARISON.length - 1 ? "border-b border-white/5" : ""}`}>
                                    <span className="text-sm text-zinc-400">{row.feature}</span>
                                    <span className="flex justify-center">{row.us ? <CheckCircle2 size={18} className="text-violet-400" /> : <XCircle size={18} className="text-zinc-700" />}</span>
                                    <span className="flex justify-center">{row.them ? <CheckCircle2 size={18} className="text-zinc-500" /> : <XCircle size={18} className="text-zinc-700" />}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section ref={securityRef} className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div variants={fadeUp(0)} initial="hidden" animate={isSecurityInView ? "show" : "hidden"} className="mb-14">
                            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /><span className="h-px w-4 bg-violet-500/40" />Trust & Security</span>
                            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">Enterprise-grade security, not afterthought checkboxes.</h2>
                        </motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" animate={isSecurityInView ? "show" : "hidden"} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {SECURITY_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={item.title} variants={childFade} className="group rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15">
                                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-500 transition-all duration-300 group-hover:border-green-500/30 group-hover:bg-green-950/30 group-hover:text-green-400"><Icon size={20} strokeWidth={1.5} /></div>
                                        <h3 className="mb-2 text-base font-bold tracking-tight text-white">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-zinc-500">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 lg:px-12"><div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div>

                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-xl">
                                <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                    Ready to work with engineers who <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">actually build?</span>
                                </h2>
                                <p className="mt-4 text-base leading-relaxed text-zinc-400">Book a discovery call and talk directly to the team that will design, architect, and ship your system.</p>
                            </div>
                            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(109,40,217,0.5)]">
                                Start a Project
                                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
