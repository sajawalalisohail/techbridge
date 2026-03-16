"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    Code2,
    BrainCircuit,
    Zap,
    Smartphone,
    Palette,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import { ClipReveal } from "@/components/shared/headingAnimations";
import dynamic from "next/dynamic";

const ServicesProcessShowcase = dynamic(
    () => import("@/components/services/ServicesProcessShowcase"),
    { ssr: false }
);

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const SECTIONS = [
    {
        id: "custom-software",
        number: "01",
        category: "Custom Software & SaaS",
        icon: Code2,
        subHeadline: "Architecture that your next engineer can actually understand.",
        description:
            "We build custom software that doesn't need a rewrite in two years. Multi-tenant SaaS, internal platforms, enterprise systems, all with clean code and actual documentation.",
        capabilities: [
            "Multi-tenant SaaS platforms",
            "Real-time dashboards & analytics",
            "Authentication, RBAC & multi-org",
            "Stripe billing & subscription logic",
            "RESTful & GraphQL API design",
            "Database architecture & migrations",
            "Microservice & monolith patterns",
            "CI/CD pipeline setup",
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Redis", "Docker", "AWS"],
        callout: {
            label: "Founder's Principle",
            text: "Any senior engineer should be able to clone your repo and ship a feature within a week. That's the bar we hold ourselves to.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "ai-automation",
        number: "02",
        category: "AI Workflow Automation",
        icon: BrainCircuit,
        subHeadline: "Your team is wasting 20 hours a week on work a machine should do.",
        description:
            "We find your most expensive manual processes and replace them with LLM-powered workflows, custom agents, and data pipelines that plug into your existing tools. Most clients cut 30-50% of ops overhead in the first quarter.",
        capabilities: [
            "LLM integration (GPT-4o, Claude, Gemini)",
            "Custom AI agents & autonomous workflows",
            "RAG pipelines & vector search (Pinecone)",
            "Document processing & classification",
            "Data extraction & transformation",
            "Internal AI tools & dashboards",
            "Workflow orchestration engines",
            "AI-powered reporting & summaries",
        ],
        stack: ["Python", "LangChain", "OpenAI", "Anthropic", "Pinecone", "FastAPI", "n8n", "Zapier"],
        callout: {
            label: "Founder's Principle",
            text: "We don't hand you a prompt library. We ship production AI systems with monitoring, fallback handling, and observability. The things that actually matter when it breaks at 2am.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "rapid-deploy",
        number: "03",
        category: "24-Hour Web Presence",
        icon: Zap,
        subHeadline: "You'll be live before your competitor finishes their agency brief.",
        description:
            "For founders who need a real website now, not a 12-week agency timeline. Custom-coded, conversion-optimized, and live before end of day. No templates, no page builders.",
        capabilities: [
            "Next.js App Router, performance-first",
            "Custom UI/UX â€” not a template",
            "Conversion-optimized page architecture",
            "On-page SEO & Core Web Vitals",
            "CMS integration (Sanity, Contentful)",
            "Global CDN edge deployment",
            "Analytics & event tracking setup",
            "Domain, DNS & SSL configuration",
        ],
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity", "Vercel", "Cloudflare"],
        callout: {
            label: "Founder's Principle",
            text: "Most agencies charge $15k and take 3 months for a marketing site. We do it in 24 hours because we've cut every minute of waste from the process, not the quality.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "mobile-apps",
        number: "04",
        category: "Mobile App Development",
        icon: Smartphone,
        subHeadline: "Apps people actually keep installed.",
        description:
            "Cross-platform and native mobile apps that feel fast on real devices, not just in the simulator. We handle the full lifecycle: architecture, build, App Store deployment, and the painful parts in between.",
        capabilities: [
            "React Native & Flutter cross-platform",
            "Native iOS (Swift) & Android (Kotlin)",
            "App Store deployment & optimization",
            "Push notifications & real-time sync",
            "Offline-first architecture",
            "Mobile CI/CD pipelines",
            "Performance profiling & optimization",
            "Deep linking & universal links",
        ],
        stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo", "Fastlane", "TestFlight"],
        callout: {
            label: "Founder's Principle",
            text: "A mobile app isn't a responsive website in a wrapper. We build for spotty connections, impatient users, and the reality that one laggy screen means an uninstall.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "design-branding",
        number: "05",
        category: "UI/UX Design & Branding",
        icon: Palette,
        subHeadline: "Design that ships to production, not just Figma.",
        description:
            "Design systems, brand identity, and UX grounded in actual user research. We design inside the constraints of real engineering systems, so what ships is exactly what was designed. Not a watered-down version.",
        capabilities: [
            "User research & persona development",
            "Wireframing & interactive prototyping",
            "Design systems & component libraries",
            "Brand identity & visual language",
            "Motion design & micro-interactions",
            "Accessibility audits (WCAG 2.1 AA)",
            "Conversion rate optimization",
            "Figma-to-code production handoff",
        ],
        stack: ["Figma", "Adobe Creative Suite", "Framer", "Principle", "Lottie", "Storybook"],
        callout: {
            label: "Founder's Principle",
            text: "A Figma file isn't a product. We design with engineering constraints in mind from the start, so developers don't spend two sprints negotiating what's 'feasible.'",
            attribution: "Sajawal Ali Sohail",
        },
    },
];

/* â”€â”€â”€ Fade-up variant â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

/* â”€â”€â”€ Section Block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ServiceSection({
    section,
    onEnter,
}: {
    section: (typeof SECTIONS)[number];
    onEnter: (id: string) => void;
}) {
    const ref = useRef<HTMLElement>(null);
    // Pinpoint center of screen
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
    const isVisible = useInView(ref, { once: true, margin: "-80px" });
    const Icon = section.icon;

    // Notify parent which section is active via effect to avoid render-time state updates
    useEffect(() => {
        if (isInView) onEnter(section.id);
    }, [isInView, onEnter, section.id]);

    return (
        <motion.section
            ref={ref}
            id={section.id}
            variants={fadeUp}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            className="scroll-mt-32 overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm"
        >
            {/* Section top bar */}
            <div className="flex items-center gap-4 border-b border-white/8 px-8 py-5">
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-600">
                    {section.number}
                </span>
                <div className="h-px flex-1 bg-white/5" />
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                    <Icon size={12} strokeWidth={1.5} className="text-brand-accent-light" />
                    <span className="text-xs font-medium text-zinc-400">{section.category}</span>
                </div>
            </div>

            <div className="p-8 lg:p-10">
                {/* Sub-headline */}
                <h3 className="mb-5 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                    {section.subHeadline}
                </h3>

                {/* Description */}
                <p className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400">
                    {section.description}
                </p>

                {/* Capabilities grid */}
                <div className="mb-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        Core Capabilities
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {section.capabilities.map((cap) => (
                            <div key={cap} className="flex items-start gap-2.5">
                                <CheckCircle2
                                    size={14}
                                    className="mt-0.5 flex-shrink-0 text-brand-accent"
                                    strokeWidth={2}
                                />
                                <span className="text-sm text-zinc-400">{cap}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stack tags */}
                <div className="mb-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        Primary Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {section.stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Callout */}
                <div className="border-l-2 border-brand-accent/60 bg-brand-accent-deep/10 rounded-r-xl p-5 pl-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-accent-light">
                        {section.callout.label}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400 italic">
                        &quot;{section.callout.text}&quot;
                    </p>
                    {section.callout.attribution && (
                        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            â€” {section.callout.attribution}
                        </p>
                    )}
                </div>
            </div>
        </motion.section>
    );
}

/* â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ServicesPage() {
    const [activeId, setActiveId] = useState(SECTIONS[0].id);
    const activeSection = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-clip min-h-screen">

                {/* â”€â”€ Services Hero â”€â”€ */}
                <section ref={heroRef} className="relative flex min-h-[52vh] items-center overflow-hidden border-b border-white/5 lg:min-h-[56vh]">
                    {/* Ambient glow */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(var(--brand-accent-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0) 50%)" }} />
                        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(var(--brand-accent-dark-rgb), 0.06) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%)" }} />
                    </div>

                    <div className="relative z-10 mx-auto max-w-[100rem] px-6 pb-20 pt-28 lg:px-10 lg:pb-24 lg:pt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                                services
                            </span>
                            <ClipReveal>
                                <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                                    What we build, how we build it, and what it costs you to{" "}
                                    <span className="bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent">
                                        wait.
                                    </span>
                                </h1>
                            </ClipReveal>
                            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
                                Five service lines, one delivery standard, and a process built to move like an engineering system instead of an agency brochure. Pick the line that matches your problem, then follow how we ship it.
                            </p>

                            {/* Jump links */}
                            <div className="mt-10 flex flex-wrap gap-3">
                                {SECTIONS.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light"
                                    >
                                        <span className="font-mono text-xs text-zinc-600">{s.number}</span>
                                        {s.category}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <ServicesProcessShowcase />

                {/* â”€â”€ Sticky Sidebar Layout â”€â”€ */}
                <div className="mx-auto max-w-[100rem] px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">

                        {/* LEFT â€” Sticky sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                {/* Current section indicator */}
                                <motion.div
                                    key={activeId}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span className="font-mono text-[80px] font-extrabold leading-none tracking-tighter text-white/[0.07] select-none block">
                                        {activeSection.number}
                                    </span>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                        Currently viewing
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold leading-snug text-white lg:text-2xl">
                                        {activeSection.category}
                                    </h2>
                                </motion.div>

                                {/* Section nav dots */}
                                <nav className="space-y-3">
                                    {SECTIONS.map((s) => {
                                        const isActive = s.id === activeId;
                                        return (
                                            <a
                                                key={s.id}
                                                href={`#${s.id}`}
                                                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${isActive
                                                    ? "text-white"
                                                    : "text-zinc-600 hover:text-brand-accent-light"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-tab-highlight"
                                                        className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.05]"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span
                                                    className={`relative z-10 h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-brand-accent-light" : "bg-zinc-700"
                                                        }`}
                                                />
                                                <span className="relative z-10 font-mono text-xs mr-1 opacity-40">{s.number}</span>
                                                <span className="relative z-10">{s.category}</span>
                                            </a>
                                        );
                                    })}
                                </nav>

                                {/* CTA */}
                                <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6">
                                    <p className="mb-1 text-sm font-semibold text-white">
                                        Have a project?
                                    </p>
                                    <p className="mb-5 text-xs leading-relaxed text-zinc-500">
                                        30 minutes with an engineer. No sales pitch.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 text-sm font-medium text-brand-accent-light transition-colors duration-200 hover:text-brand-accent-light"
                                    >
                                        Book a Call
                                        <ArrowRight
                                            size={14}
                                            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT â€” Scrollable content blocks */}
                        <div className="space-y-6 lg:col-span-2">
                            {SECTIONS.map((section) => (
                                <ServiceSection
                                    key={section.id}
                                    section={section}
                                    onEnter={setActiveId}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* â”€â”€ Tech Stack â”€â”€ */}
                <TechStackMarquee />

                {/* Subtle lime border glow separating the scrolling content from the reveal footer */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.4) 30%, rgba(var(--brand-accent-light-rgb), 0.6) 50%, rgba(var(--brand-accent-rgb), 0.4) 70%, rgba(var(--brand-accent-rgb), 0) 100%)',
                        boxShadow: '0 0 20px 4px rgba(var(--brand-accent-dark-rgb), 0.25)',
                    }}
                />
            </div>
        </div>
    );
}

