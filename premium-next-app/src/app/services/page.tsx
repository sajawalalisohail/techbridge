"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
    Code2,
    BrainCircuit,
    Zap,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const SECTIONS = [
    {
        id: "custom-software",
        number: "01",
        category: "Custom Software & SaaS",
        icon: Code2,
        subHeadline: "Architecture that evolves with your business.",
        description:
            "We design and build enterprise-grade custom software — scalable, secure, and maintainable systems architected for the long term. No shortcuts that compound into a re-write two years later.",
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
            label: "Our Standard",
            text: "Every system we build can be picked up and extended by any senior engineer — not just ours. Clean code, clear abstractions, and thorough documentation are non-negotiable.",
        },
    },
    {
        id: "ai-automation",
        number: "02",
        category: "AI Workflow Automation",
        icon: BrainCircuit,
        subHeadline: "Replace 20 hours of manual work per week with one intelligent workflow.",
        description:
            "We identify your highest-cost manual processes and replace them with LLM-powered automations, custom AI agents, and intelligent data pipelines — seamlessly integrated with your existing tools and business logic.",
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
            label: "Production Standard",
            text: "We don't suggest prompts. We build production-ready AI systems that run reliably, can be monitored, and improve over time — with full observability and fallback handling.",
        },
    },
    {
        id: "rapid-deploy",
        number: "03",
        category: "24-Hour Web Presence",
        icon: Zap,
        subHeadline: "Premium brand authority. Delivered in a single working day.",
        description:
            "For businesses that need a high-quality web presence now — not in three months. We deploy conversion-optimized, performance-first websites with premium design execution, live and ready for traffic in 24 hours.",
        capabilities: [
            "Next.js App Router, performance-first",
            "Custom UI/UX — not a template",
            "Conversion-optimized page architecture",
            "On-page SEO & Core Web Vitals",
            "CMS integration (Sanity, Contentful)",
            "Global CDN edge deployment",
            "Analytics & event tracking setup",
            "Domain, DNS & SSL configuration",
        ],
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity", "Vercel", "Cloudflare"],
        callout: {
            label: "The Reality",
            text: "Most agencies charge $15k and take 3 months. We deliver in 24 hours — not because we cut corners, but because we've engineered the process to remove wasted time and deliver only what matters.",
        },
    },
];

/* ─── Fade-up variant ─────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── Section Block ──────────────────────────────────────── */
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

    // Notify parent which section is active
    if (isInView) onEnter(section.id);

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
                    <Icon size={12} strokeWidth={1.5} className="text-violet-400" />
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
                                    className="mt-0.5 flex-shrink-0 text-violet-500"
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
                <div className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-5">
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-violet-400">
                        {section.callout.label}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400 italic">
                        "{section.callout.text}"
                    </p>
                </div>
            </div>
        </motion.section>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ServicesPage() {
    const [activeId, setActiveId] = useState(SECTIONS[0].id);
    const activeSection = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-hidden min-h-screen">

                {/* ── Services Hero ── */}
                <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-white/5">
                    {/* Ambient glow */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 50%)" }} />
                        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(79,70,229,0.06) 0%, rgba(79,70,229,0) 50%)" }} />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                <span className="h-px w-6 bg-zinc-700" />
                                Our Expertise
                            </span>
                            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl">
                                We architect scalable systems and{" "}
                                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                    intelligent workflows.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                                Three core service lines — each engineered with the same obsession for precision,
                                performance, and long-term value.
                            </p>

                            {/* Jump links */}
                            <div className="mt-10 flex flex-wrap gap-3">
                                {SECTIONS.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-white/20 hover:text-white"
                                    >
                                        <span className="font-mono text-xs text-zinc-600">{s.number}</span>
                                        {s.category}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Sticky Sidebar Layout ── */}
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">

                        {/* LEFT — Sticky sidebar */}
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
                                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                                                    ? "border border-white/10 bg-white/[0.05] text-white"
                                                    : "text-zinc-600 hover:text-zinc-400"
                                                    }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-violet-400" : "bg-zinc-700"
                                                        }`}
                                                />
                                                <span className="font-mono text-xs mr-1 opacity-40">{s.number}</span>
                                                {s.category}
                                            </a>
                                        );
                                    })}
                                </nav>

                                {/* CTA */}
                                <div className="rounded-2xl border border-white/8 bg-neutral-900/40 p-6">
                                    <p className="mb-1 text-sm font-semibold text-white">
                                        Ready to get started?
                                    </p>
                                    <p className="mb-5 text-xs leading-relaxed text-zinc-500">
                                        Book a free 30-minute discovery call with a senior engineer.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors duration-200 hover:text-violet-300"
                                    >
                                        Book a Call
                                        <ArrowRight
                                            size={14}
                                            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT — Scrollable content blocks */}
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
