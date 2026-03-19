"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    Bot,
    Briefcase,
    Check,
    ChevronDown,
    Cpu,
    FlaskConical,
    Layers,
    Shield,
    Smartphone,
    Users,
} from "lucide-react";
import Link from "next/link";
import GlowButton from "@/components/shared/GlowButton";
import { InteriorHeroBlob } from "@/components/shared/InteriorHeroBlob";
import { wordContainerVariants, wordVariants, splitWords } from "@/components/shared/headingAnimations";

/* ─── Animation constants ─────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: EASE } },
});

const stagger = (delay = 0.08) => ({
    hidden: {},
    show: { transition: { staggerChildren: delay } },
});

const childFade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Reusable sub-components ─────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            <span className="h-px w-4 bg-brand-accent/40" />
            {children}
        </span>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="relative flex min-h-[56vh] items-center overflow-hidden border-b border-white/5">
            <InteriorHeroBlob preset="services" />

            <div className="relative z-10 mx-auto max-w-[100rem] px-6 pb-20 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
                <motion.div
                    variants={stagger(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <motion.div variants={childFade}>
                        <Eyebrow>staff augmentation</Eyebrow>
                    </motion.div>

                    <motion.h1
                        variants={wordContainerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="max-w-5xl text-left text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                        style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "0 0.3em" }}
                    >
                        {splitWords("Senior Engineers. Embedded in Your Team.").map((word, i, arr) => {
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
                        {splitWords("Half the US Cost.").map((word, i) => (
                            <motion.span key={`b-${i}`} variants={wordVariants} style={{ display: "inline-block" }}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        variants={childFade}
                        className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400"
                    >
                        Stop overpaying for engineering talent. Our Pakistan-based senior developers and AI engineers
                        integrate directly into your workflow — managed by our US architecture team, accountable to you,
                        and replaceable if they don&apos;t deliver.
                    </motion.p>

                    <motion.div variants={childFade} className="mt-10 flex flex-wrap items-center gap-4">
                        <GlowButton href="/contact">
                            Book a Call
                            <ArrowRight size={16} />
                        </GlowButton>
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                        >
                            See our work
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* Trust signals */}
                    <motion.div variants={childFade} className="mt-10 flex flex-wrap items-center gap-6">
                        {[
                            "48-hr placement",
                            "Full replacement guarantee",
                            "US architecture oversight",
                        ].map((signal) => (
                            <div key={signal} className="flex items-center gap-2">
                                <Check size={12} className="text-brand-accent flex-shrink-0" />
                                <span className="text-xs text-zinc-500">{signal}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — HOW IT WORKS
══════════════════════════════════════════════════════════════ */
const HOW_IT_WORKS = [
    {
        step: "01",
        title: "Tell Us What You Need",
        description:
            "Share the role, tech stack, and team dynamics. We match you with a vetted senior engineer within 48 hours.",
    },
    {
        step: "02",
        title: "Meet Your Engineer",
        description:
            "Interview them yourself. Review their work, assess their communication, make sure the fit is right before we start.",
    },
    {
        step: "03",
        title: "Seamless Onboarding",
        description:
            "Your engineer joins your Slack, your repos, your standups. They operate as a full member of your team from day one.",
    },
    {
        step: "04",
        title: "Ongoing Management & Accountability",
        description:
            "We handle performance reviews, provide architecture oversight from our US team, and deliver weekly progress reports. If someone underperforms, we replace them — no questions asked.",
    },
];

function HowItWorks() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-16"
                >
                    <Eyebrow>how it works</Eyebrow>
                    <h2 className="max-w-7xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        From call to committed engineer in{" "}
                        <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                            48 hours.
                        </span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical connector line */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[1.75rem] top-0 hidden h-full w-px bg-white/5 lg:block"
                    />

                    <motion.div
                        variants={stagger(0.12)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="space-y-8"
                    >
                        {HOW_IT_WORKS.map((item) => (
                            <motion.div
                                key={item.step}
                                variants={childFade}
                                className="relative flex gap-6 lg:gap-10"
                            >
                                {/* Step number bubble */}
                                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-neutral-900">
                                    <span className="font-mono text-xs font-bold text-brand-accent">{item.step}</span>
                                </div>

                                <div className="flex-1 pb-8">
                                    <h3 className="mb-2 text-lg font-bold text-white lg:text-xl">{item.title}</h3>
                                    <p className="text-base leading-relaxed text-zinc-400">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — ROLES AVAILABLE
══════════════════════════════════════════════════════════════ */
const ROLES = [
    {
        icon: Bot,
        title: "AI / ML Engineers",
        description:
            "LLMs, RAG systems, computer vision, NLP pipelines. Production-grade AI, not notebook demos.",
    },
    {
        icon: Layers,
        title: "Full-Stack Developers",
        description:
            "Next.js, React, Node.js, Python. End-to-end feature delivery with clean architecture.",
    },
    {
        icon: Cpu,
        title: "Backend Engineers",
        description:
            "API design, database architecture, microservices, cloud infrastructure.",
    },
    {
        icon: Smartphone,
        title: "Mobile Developers",
        description:
            "React Native, Flutter, Swift, Kotlin. Cross-platform and native — built for real devices.",
    },
    {
        icon: Briefcase,
        title: "DevOps Engineers",
        description:
            "CI/CD, Docker, AWS, monitoring, infrastructure as code. Reliable systems at scale.",
    },
    {
        icon: FlaskConical,
        title: "QA Engineers",
        description:
            "Manual and automated testing, E2E pipelines, regression coverage. Ship with confidence.",
    },
];

function RolesAvailable() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="border-t border-white/5 py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-16"
                >
                    <Eyebrow>roles available</Eyebrow>
                    <h2 className="max-w-7xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Senior engineers across every discipline.
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
                        All engineers are vetted through technical interviews, portfolio review, architecture assessment,
                        and a trial task before joining our bench.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger(0.08)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {ROLES.map((role) => {
                        const Icon = role.icon;
                        return (
                            <motion.div
                                key={role.title}
                                variants={childFade}
                                className="group rounded-2xl border border-white/8 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand-accent/30 hover:bg-neutral-800/50"
                            >
                                <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] p-3">
                                    <Icon
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-brand-accent-light transition-colors duration-300 group-hover:text-brand-accent"
                                    />
                                </div>
                                <h3 className="mb-2 text-base font-bold text-white">{role.title}</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">{role.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — PRICING TRANSPARENCY
══════════════════════════════════════════════════════════════ */
const PRICING_ROWS = [
    {
        feature: "Monthly Cost (Senior)",
        usInHouse: "$12,000–$18,000",
        european: "$10,000–$15,000",
        upwork: "$4,000–$8,000",
        techbridge: "$4,000–$6,000",
        highlight: true,
    },
    {
        feature: "Vetting & Management",
        usInHouse: "You handle everything",
        european: "Agency manages",
        upwork: "You vet from profiles",
        techbridge: "We vet, manage & oversee",
        highlight: false,
    },
    {
        feature: "Architecture Oversight",
        usInHouse: "You provide",
        european: "Included",
        upwork: "None",
        techbridge: "Included (US-based)",
        highlight: false,
    },
    {
        feature: "Replacement Guarantee",
        usInHouse: "N/A (firing is expensive)",
        european: "Varies",
        upwork: "None",
        techbridge: "Yes — fast and free",
        highlight: false,
    },
    {
        feature: "Communication",
        usInHouse: "Direct",
        european: "Through PM layer",
        upwork: "Variable",
        techbridge: "Dedicated Slack + weekly reports",
        highlight: false,
    },
    {
        feature: "Ramp-up Time",
        usInHouse: "4–8 weeks (recruiting)",
        european: "2–4 weeks",
        upwork: "1–2 weeks",
        techbridge: "48 hours",
        highlight: false,
    },
    {
        feature: "Commitment",
        usInHouse: "Full-time employment",
        european: "Contract minimums",
        upwork: "Per-project",
        techbridge: "Flexible: monthly, part-time, full-time",
        highlight: false,
    },
];

function PricingTransparency() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="border-t border-white/5 py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-12"
                >
                    <Eyebrow>pricing transparency</Eyebrow>
                    <h2 className="max-w-7xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        No hidden fees.{" "}
                        <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                            No surprises.
                        </span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
                        You know exactly what you&apos;re paying and who you&apos;re paying for. Compare us honestly against every
                        alternative.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="overflow-x-auto rounded-2xl border border-white/8"
                >
                    <table className="w-full min-w-[700px] text-sm">
                        <thead>
                            <tr className="border-b border-white/8 bg-white/[0.02]">
                                <th className="py-4 pl-6 pr-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    Feature
                                </th>
                                <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    US In-House
                                </th>
                                <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    European Agency
                                </th>
                                <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    Upwork Freelancer
                                </th>
                                <th className="px-4 py-4 pr-6 text-left font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent">
                                    TechBridge ✓
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {PRICING_ROWS.map((row) => (
                                <tr
                                    key={row.feature}
                                    className={row.highlight ? "bg-brand-accent/[0.04]" : ""}
                                >
                                    <td className="py-4 pl-6 pr-4 font-medium text-zinc-300">{row.feature}</td>
                                    <td className="px-4 py-4 text-zinc-500">{row.usInHouse}</td>
                                    <td className="px-4 py-4 text-zinc-500">{row.european}</td>
                                    <td className="px-4 py-4 text-zinc-500">{row.upwork}</td>
                                    <td className="px-4 py-4 pr-6 font-semibold text-brand-accent-light">{row.techbridge}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.p
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mt-5 text-xs leading-relaxed text-zinc-600"
                >
                    All pricing is transparent. No hidden fees, no surprise markups. You know exactly what you&apos;re
                    paying and who you&apos;re paying for.
                </motion.p>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — THE TECHBRIDGE DIFFERENCE
══════════════════════════════════════════════════════════════ */
const DIFFERENTIATORS = [
    {
        icon: Layers,
        title: "US-Led Architecture",
        description:
            "Every engineer we place operates under the oversight of our West Virginia-based architecture team. Code reviews, system design decisions, and quality standards are set and enforced from the US.",
    },
    {
        icon: BadgeCheck,
        title: "Full Replacement Guarantee",
        description:
            "If your engineer isn't performing, isn't the right cultural fit, or isn't meeting your standards — tell us. We'll replace them quickly at no additional cost. We take full ownership.",
    },
    {
        icon: Shield,
        title: "Radical Transparency",
        description:
            "Weekly progress reports. Direct Slack access to your engineer. Shared Git repos. You see everything, always.",
    },
];

function TechBridgeDifference() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="border-t border-white/5 py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mb-16"
                >
                    <Eyebrow>the techbridge difference</Eyebrow>
                    <h2 className="max-w-7xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Accountability built into every engagement.
                    </h2>
                </motion.div>

                <motion.div
                    variants={stagger(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                >
                    {DIFFERENTIATORS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                variants={childFade}
                                className="rounded-2xl border border-white/8 bg-neutral-900/50 p-8 backdrop-blur-sm"
                            >
                                <div className="mb-5 inline-flex items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-3">
                                    <Icon size={20} strokeWidth={1.5} className="text-brand-accent-light" />
                                </div>
                                <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 6 — CTA
══════════════════════════════════════════════════════════════ */
function CtaSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="border-t border-white/5 py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <motion.div
                    variants={stagger(0.1)}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mx-auto max-w-3xl text-center"
                >
                    <motion.div variants={childFade}>
                        <Eyebrow>get started</Eyebrow>
                    </motion.div>
                    <motion.h2
                        variants={childFade}
                        className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                    >
                        Your Next Engineer Is{" "}
                        <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                            48 Hours Away.
                        </span>
                    </motion.h2>
                    <motion.p variants={childFade} className="mt-5 text-lg leading-relaxed text-zinc-400">
                        Book a 30-minute call. Tell us the role. We&apos;ll match you with a vetted senior engineer and you
                        can interview them yourself before anything starts.
                    </motion.p>
                    <motion.div variants={childFade} className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <GlowButton href="/contact">
                            Book a Call
                            <ArrowRight size={16} />
                        </GlowButton>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 7 — FAQ
══════════════════════════════════════════════════════════════ */
const FAQS = [
    {
        q: "How fast can you place an engineer?",
        a: "Within 48 hours of your initial call. We maintain a bench of vetted senior engineers across all major disciplines, so we can match you quickly without cutting corners on the vetting process.",
    },
    {
        q: "What if the engineer isn't a good fit?",
        a: "We replace them — fast and free. No drama, no delays. We take full ownership of the talent we place. If it's not working, we fix it immediately.",
    },
    {
        q: "Do I manage the engineer directly?",
        a: "Yes. They join your Slack, your repos, your standups. They're your team member. We handle the backend — payroll, performance oversight, architecture reviews — so you get the benefit without the overhead.",
    },
    {
        q: "What's the minimum commitment?",
        a: "Monthly. No long-term contracts required. Cancel anytime. We're confident enough in our engineers that we don't need to lock you in.",
    },
    {
        q: "How do you vet your engineers?",
        a: "Technical interviews, portfolio review, architecture assessment, and a trial task. Only senior-level engineers who pass all stages join our bench. We don't send you anyone we wouldn't trust with our own codebase.",
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/8">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={open}
            >
                <span className="pr-8 text-base font-semibold text-white">{q}</span>
                <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-zinc-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 pb-5" : "max-h-0"}`}
            >
                <p className="text-sm leading-relaxed text-zinc-400">{a}</p>
            </div>
        </div>
    );
}

function Faq() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="border-t border-white/5 py-24 lg:py-32">
            <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">
                    <motion.div
                        variants={fadeUp(0)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <Eyebrow>faq</Eyebrow>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                            Common questions, honest answers.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                            Still have questions?{" "}
                            <Link href="/contact" className="text-brand-accent-light underline underline-offset-4 hover:text-white transition-colors">
                                Book a call
                            </Link>{" "}
                            and ask us directly.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="lg:col-span-2"
                    >
                        {FAQS.map((faq) => (
                            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function StaffAugmentationPage() {
    return (
        <div className="relative text-white">
            <div className="relative z-10 min-h-screen">
                <Hero />
                <HowItWorks />
                <RolesAvailable />
                <PricingTransparency />
                <TechBridgeDifference />
                <CtaSection />
                <Faq />

                {/* Footer glow accent */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.4) 30%, rgba(var(--brand-accent-light-rgb), 0.6) 50%, rgba(var(--brand-accent-rgb), 0.4) 70%, rgba(var(--brand-accent-rgb), 0) 100%)",
                        boxShadow: "0 0 20px 4px rgba(var(--brand-accent-dark-rgb), 0.25)",
                    }}
                />
            </div>
        </div>
    );
}
