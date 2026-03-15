"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { slideFromLeftContainer, slideFromLeftItem, slideFromRight, splitWords } from "@/components/shared/headingAnimations";

/* â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const inputFocusCSS = `
  .tb-input:focus,
  .tb-select:focus,
  .tb-textarea:focus {
    outline: none;
    border-bottom-color: rgba(var(--brand-accent-rgb), 0.8);
    box-shadow: 0 2px 16px rgba(var(--brand-accent-dark-rgb), 0.2);
  }
  .tb-input::placeholder,
  .tb-textarea::placeholder {
    color: rgba(113, 113, 122, 0.7);
  }
  .tb-select option {
    background: #0a0a0a;
    color: #a1a1aa;
  }
`;

/* â”€â”€â”€ Ease constant (fixes TS Variants type error) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const EASE = [0.22, 1, 0.36, 1] as const;

/* â”€â”€â”€ Fade-up helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: EASE },
    },
});

/* â”€â”€â”€ Input wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {label}
            </label>
            {children}
        </div>
    );
}

/* â”€â”€â”€ Shared input class â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const inputClass =
    "tb-input w-full rounded-lg border-b-2 border-white/10 bg-neutral-950 px-4 py-3.5 text-sm text-white transition-all duration-300 placeholder:text-zinc-500";

/* â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ContactPage() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: inputFocusCSS }} />

            <div className="relative text-white min-h-screen">
                <div className="relative z-10 overflow-hidden min-h-screen">

                    {/* â”€â”€ Main section â”€â”€ */}
                    <section
                        ref={ref}
                        className="relative min-h-[calc(100vh-80px)] overflow-hidden"
                    >
                        {/* Ambient glows */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(var(--brand-accent-rgb), 0.06) 0%, rgba(var(--brand-accent-rgb), 0) 60%)" }} />
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 70%, rgba(var(--brand-accent-dark-rgb), 0.04) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%)" }} />
                        </div>

                        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-32">
                            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

                                {/* â”€â”€ LEFT â€” Hook & Info â”€â”€ */}
                                <div className="flex flex-col justify-center">
                                    <motion.span
                                        variants={fadeUp(0)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                                        let&apos;s talk
                                    </motion.span>

                                    <motion.h1
                                        variants={slideFromRight}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl"
                                    >
                                        Tell us what you need{" "}
                                        <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent-light bg-clip-text text-transparent">
                                            built.
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        variants={fadeUp(0.2)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mt-6 text-lg leading-relaxed text-zinc-400"
                                    >
                                        Describe the problem. We&apos;ll tell you honestly if we&apos;re
                                        the right team, and what it&apos;ll take.
                                    </motion.p>

                                    {/* Contact info */}
                                    <motion.div
                                        variants={fadeUp(0.3)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mt-12 space-y-4"
                                    >
                                        <a
                                            href="mailto:hello@techbridge.dev"
                                            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/5"
                                        >
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-500 transition-colors duration-300 group-hover:border-brand-accent/40 group-hover:text-brand-accent-light">
                                                <Mail size={16} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                                    Email
                                                </p>
                                                <p className="text-sm text-zinc-300 transition-colors duration-300 group-hover:text-brand-accent-light">
                                                    hello@techbridge.dev
                                                </p>
                                            </div>
                                        </a>

                                        <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-500">
                                                <MapPin size={16} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                                    Location
                                                </p>
                                                <p className="text-sm text-zinc-300">
                                                    Morgantown, West Virginia, USA
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Response time badge */}
                                    <motion.div
                                        variants={fadeUp(0.4)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mt-8 inline-flex items-center gap-2"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-zinc-600">
                                            You&apos;ll hear back within 24 hours
                                        </span>
                                    </motion.div>
                                </div>

                                {/* â”€â”€ RIGHT â€” Premium Form â”€â”€ */}
                                <motion.div
                                    variants={fadeUp(0.18)}
                                    initial="hidden"
                                    animate={isInView ? "show" : "hidden"}
                                >
                                    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/50 p-8 backdrop-blur-sm lg:p-10">
                                        {/* Corner glow */}
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0"
                                            style={{ background: "radial-gradient(circle at 100% 0%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 50%)" }}
                                        />

                                        {!submitted ? (
                                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                                <div className="mb-8">
                                                    <h2 className="text-xl font-bold text-white">
                                                        Project Details
                                                    </h2>
                                                    <p className="mt-1 text-sm text-zinc-500">
                                                        The more detail, the better our first reply.
                                                    </p>
                                                </div>

                                                {/* Row 1 */}
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <Field label="Name">
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Alex Johnson"
                                                            className={inputClass}
                                                        />
                                                    </Field>
                                                    <Field label="Work Email">
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="alex@company.com"
                                                            className={inputClass}
                                                        />
                                                    </Field>
                                                </div>

                                                {/* Company */}
                                                <Field label="Company Name">
                                                    <input
                                                        type="text"
                                                        placeholder="Acme Corp"
                                                        className={inputClass}
                                                    />
                                                </Field>

                                                {/* Service select */}
                                                <Field label="What do you need help with?">
                                                    <div className="relative">
                                                        <select
                                                            required
                                                            defaultValue=""
                                                            className="tb-select appearance-none w-full rounded-lg border-b-2 border-white/10 bg-neutral-950 px-4 py-3.5 text-sm text-zinc-400 transition-all duration-300 cursor-pointer"
                                                        >
                                                            <option value="" disabled>
                                                                Select a serviceâ€¦
                                                            </option>
                                                            <option value="custom-software">
                                                                Custom Software Development
                                                            </option>
                                                            <option value="saas-platform">
                                                                SaaS Platform Development
                                                            </option>
                                                            <option value="ai-automation">
                                                                AI Workflow Automation
                                                            </option>
                                                            <option value="internal-tools">
                                                                Internal Business Tools
                                                            </option>
                                                            <option value="api-integrations">
                                                                API Integrations
                                                            </option>
                                                            <option value="24h-website">
                                                                24-Hour Web Presence
                                                            </option>
                                                        </select>
                                                        {/* Custom arrow */}
                                                        <svg
                                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                                            width="14" height="14" viewBox="0 0 24 24"
                                                            fill="none" stroke="currentColor" strokeWidth="2"
                                                        >
                                                            <path d="M6 9l6 6 6-6" />
                                                        </svg>
                                                    </div>
                                                </Field>

                                                {/* Message */}
                                                <Field label="Tell us about the project">
                                                    <textarea
                                                        rows={5}
                                                        placeholder="Describe your project, goals, and any existing tech stackâ€¦"
                                                        className="tb-textarea w-full resize-none rounded-lg border-b-2 border-white/10 bg-neutral-950 px-4 py-3.5 text-sm text-white transition-all duration-300 placeholder:text-zinc-500"
                                                    />
                                                </Field>

                                                {/* Submit */}
                                                <button
                                                    type="submit"
                                                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-accent-dark to-brand-accent-dark px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(var(--brand-accent-dark-rgb), 0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-brand-accent/10"
                                                >
                                                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                                                        Send It
                                                        <ArrowRight
                                                            size={15}
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        />
                                                    </span>
                                                    {/* Shimmer */}
                                                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                                </button>

                                                <p className="text-center text-xs text-zinc-600">
                                                    No spam. We&apos;ll only use your details to respond to your inquiry.
                                                </p>
                                            </form>
                                        ) : (
                                            /* â”€â”€ Success state â”€â”€ */
                                            <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
                                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent-deep/40">
                                                    <CheckCircle2 size={28} className="text-brand-accent-light" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    Got it.
                                                </h3>
                                                <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                                                    An engineer (not an account manager) will reply
                                                    within 24 hours.
                                                </p>
                                                <p className="mt-6 text-xs text-zinc-600">
                                                    hello@techbridge.dev
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </section>

                    {/* â”€â”€ Cal.com Scheduling â”€â”€ */}
                    <section className="py-24 lg:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            <div className="mb-10">
                                <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /><span className="h-px w-4 bg-brand-accent/40" />
                                    prefer a call?
                                </span>
                                <motion.h2
                                    variants={slideFromLeftContainer}
                                    initial="hidden"
                                    animate={isInView ? "show" : "hidden"}
                                    className="text-3xl font-bold tracking-tight text-white lg:text-4xl"
                                    style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
                                >
                                    {splitWords("Skip the form. Grab a time.").map((word, index) => (
                                        <motion.span key={`${word}-${index}`} variants={slideFromLeftItem} style={{ display: "inline-block" }}>
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.h2>
                                <p className="mt-3 max-w-lg text-base text-zinc-400">
                                    30 minutes with the engineer who&apos;d actually work on your project. No sales rep.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 backdrop-blur-sm">
                                {/* Cal.com embed â€” replace src with your actual booking URL */}
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <p className="text-lg font-semibold text-white">Scheduling Coming Soon</p>
                                    <p className="mt-2 max-w-sm text-sm text-zinc-400">
                                        In the meantime, fill out the form above or email us directly at{" "}
                                        <a href="mailto:hello@techbridge.dev" className="text-brand-accent-light hover:underline">
                                            hello@techbridge.dev
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

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
        </>
    );
}

