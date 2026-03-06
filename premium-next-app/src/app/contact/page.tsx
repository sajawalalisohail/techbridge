"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin, CheckCircle2 } from "lucide-react";

/* ─── Styles ──────────────────────────────────────────────── */
const inputFocusCSS = `
  .tb-input:focus,
  .tb-select:focus,
  .tb-textarea:focus {
    outline: none;
    border-bottom-color: rgba(139, 92, 246, 0.8);
    box-shadow: 0 2px 16px rgba(109, 40, 217, 0.2);
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

/* ─── Ease constant (fixes TS Variants type error) ────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Fade-up helper ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: EASE },
    },
});

/* ─── Input wrapper ──────────────────────────────────────── */
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

/* ─── Shared input class ─────────────────────────────────── */
const inputClass =
    "tb-input w-full rounded-lg border-b-2 border-white/10 bg-neutral-950 px-4 py-3.5 text-sm text-white transition-all duration-300 placeholder:text-zinc-500";

/* ─── Main Page ──────────────────────────────────────────── */
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

                    {/* ── Main section ── */}
                    <section
                        ref={ref}
                        className="relative min-h-[calc(100vh-80px)] overflow-hidden"
                    >
                        {/* Ambient glows */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 0% 30%, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0) 60%)" }} />
                            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 70%, rgba(79,70,229,0.04) 0%, rgba(79,70,229,0) 50%)" }} />
                        </div>

                        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-32">
                            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

                                {/* ── LEFT — Hook & Info ── */}
                                <div className="flex flex-col justify-center">
                                    <motion.span
                                        variants={fadeUp(0)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600"
                                    >
                                        <span className="h-px w-6 bg-zinc-700" />
                                        Get In Touch
                                    </motion.span>

                                    <motion.h1
                                        variants={fadeUp(0.1)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl xl:text-7xl"
                                    >
                                        Let&apos;s build your{" "}
                                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                            leverage.
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        variants={fadeUp(0.2)}
                                        initial="hidden"
                                        animate={isInView ? "show" : "hidden"}
                                        className="mt-6 text-lg leading-relaxed text-zinc-400"
                                    >
                                        Partner with our engineering team to build custom software,
                                        automate your workflows, or launch a premium web presence
                                        that converts.
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
                                            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                                        >
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-500 transition-colors duration-300 group-hover:border-violet-500/30 group-hover:text-violet-400">
                                                <Mail size={16} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                                    Email
                                                </p>
                                                <p className="text-sm text-zinc-300 transition-colors duration-300 group-hover:text-white">
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
                                            We typically respond within 24 hours
                                        </span>
                                    </motion.div>
                                </div>

                                {/* ── RIGHT — Premium Form ── */}
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
                                            style={{ background: "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 50%)" }}
                                        />

                                        {!submitted ? (
                                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                                <div className="mb-8">
                                                    <h2 className="text-xl font-bold text-white">
                                                        Start a Conversation
                                                    </h2>
                                                    <p className="mt-1 text-sm text-zinc-500">
                                                        Tell us about your project and we&apos;ll be in touch.
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
                                                                Select a service…
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
                                                        placeholder="Describe your project, goals, and any existing tech stack…"
                                                        className="tb-textarea w-full resize-none rounded-lg border-b-2 border-white/10 bg-neutral-950 px-4 py-3.5 text-sm text-white transition-all duration-300 placeholder:text-zinc-500"
                                                    />
                                                </Field>

                                                {/* Submit */}
                                                <button
                                                    type="submit"
                                                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(109,40,217,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(109,40,217,0.5)]"
                                                >
                                                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                                                        Send Inquiry
                                                        <ArrowRight
                                                            size={15}
                                                            className="transition-transform duration-300 group-hover:translate-x-0.5"
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
                                            /* ── Success state ── */
                                            <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
                                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-violet-500/30 bg-violet-950/40">
                                                    <CheckCircle2 size={28} className="text-violet-400" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    Message received.
                                                </h3>
                                                <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                                                    Thanks for reaching out. A senior engineer will be in
                                                    touch within 24 hours.
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
        </>
    );
}
