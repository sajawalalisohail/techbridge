"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const TESTIMONIALS = [
    {
        quote:
            "TechBridge didn't just build our platform — they re-architected the way we think about scale. Our document processing pipeline went from a fragile monolith to a resilient, multi-tenant system that handles ten thousand users without breaking a sweat.",
        name: "Sarah Donovan",
        title: "CTO, NextLex",
        initials: "SD",
    },
    {
        quote:
            "We needed a digital presence that could match the scale of our global supply chain. TechBridge delivered a high-performance storefront in record time, and the lead quality improvement has been transformational for our sales team.",
        name: "Marcus Chen",
        title: "VP Digital, PrimeMark Apparel",
        initials: "MC",
    },
    {
        quote:
            "After 35 years of operating on paper and phone calls, TechBridge modernized our entire digital footprint without a single day of downtime. Their engineering team understood our industry from day one — no hand-holding required.",
        name: "Ali Wali",
        title: "Managing Director, AliWali Trading Co.",
        initials: "AW",
    },
];

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: EASE },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
        transition: { duration: 0.35, ease: EASE },
    }),
};

/* ─── Component ──────────────────────────────────────────── */
export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    const [[activeIndex, direction], setActive] = useState([0, 1]);

    const paginate = useCallback(
        (newIndex: number) => {
            const dir = newIndex > activeIndex ? 1 : -1;
            setActive([newIndex, dir]);
        },
        [activeIndex]
    );

    // Auto-advance every 6s, reset on manual navigation
    useEffect(() => {
        const timer = setInterval(() => {
            setActive(([prev]) => {
                const next = (prev + 1) % TESTIMONIALS.length;
                return [next, 1];
            });
        }, 6000);
        return () => clearInterval(timer);
    }, [activeIndex]); // reset interval when user manually navigates

    const testimonial = TESTIMONIALS[activeIndex];

    return (
        <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0) 60%)",
                }}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-14 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                        <span className="h-px w-6 bg-zinc-700" />
                        Client Voices
                        <span className="h-px w-6 bg-zinc-700" />
                    </span>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
                        What Our Partners Say.
                    </h2>
                </motion.div>

                {/* ── Carousel ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    {/* Card container — fixed height for smooth transitions */}
                    <div className="relative min-h-[320px] sm:min-h-[280px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-neutral-900/40 p-8 backdrop-blur-sm sm:p-12">
                                    {/* Decorative quote mark */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-8 top-6 select-none font-serif text-6xl leading-none text-violet-500/20 sm:left-12 sm:top-8 sm:text-7xl"
                                    >
                                        &ldquo;
                                    </span>

                                    {/* Quote */}
                                    <blockquote className="relative z-10 pt-8 text-base leading-relaxed text-zinc-300 italic sm:pt-10 sm:text-lg">
                                        {testimonial.quote}
                                    </blockquote>

                                    {/* Attribution */}
                                    <div className="relative z-10 mt-8 flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 bg-violet-950/60 font-mono text-xs font-semibold text-violet-300">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Dot Navigation ── */}
                    <div className="mt-8 flex items-center justify-center gap-2.5">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                                        ? "w-6 bg-violet-400"
                                        : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
