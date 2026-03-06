"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* Stagger container + child variants */
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const STATS = [
    { value: "50+", label: "Projects Shipped" },
    { value: "98%", label: "Client Retention" },
    { value: "3×", label: "Avg. Efficiency Gain" },
];

export default function Hero() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* ─── Ambient background gradients ─── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
            >
                {/* Deep top-left violet bloom */}
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-900/20 blur-[120px]" />
                {/* Subtle bottom-right indigo */}
                <div className="absolute -bottom-32 right-0 h-[500px] w-[500px] rounded-full bg-indigo-900/15 blur-[100px]" />
                {/* Fine noise texture for depth */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "128px 128px",
                    }}
                />
                {/* Hairline horizontal rule at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ─── Main content ─── */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-32 lg:px-12"
            >
                {/* Eyebrow badge */}
                <motion.div variants={fadeUp} className="mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                        </span>
                        AI-Powered Software Agency
                    </span>
                </motion.div>

                {/* Primary headline */}
                <motion.h1
                    variants={fadeUp}
                    className="max-w-4xl text-center text-5xl font-bold leading-[1.07] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                >
                    We Build the{" "}
                    <span className="relative">
                        <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                            Systems
                        </span>
                    </span>{" "}
                    That Drive{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Modern Business
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mt-8 max-w-2xl text-center text-lg leading-relaxed text-zinc-400 lg:text-xl"
                >
                    TechBridge delivers custom software, AI automation, and scalable SaaS
                    platforms - engineered for precision, built for growth.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    variants={fadeUp}
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
                    >
                        <span className="relative z-10">Start Your Project</span>
                        <svg
                            className="relative z-10 h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        {/* Shimmer sweep */}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Link>

                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                    >
                        View Our Work
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>

                {/* ────────────────────────────────────────────
            3D CANVAS INJECTION ZONE
            React Three Fiber "Neural Bridge" goes here.
            Load dynamically via next/dynamic for performance.
        ──────────────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    ref={canvasRef}
                    id="neural-bridge-canvas"
                    aria-hidden="true"
                    className="relative mt-16 w-full max-w-4xl"
                >
                    {/* Placeholder frame — replace inner content with <NeuralBridge /> */}
                    <div className="flex h-[320px] w-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] lg:h-[440px]">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium tracking-widest text-white/20 uppercase">
                                Neural Bridge - 3D Canvas
                            </p>
                        </div>
                    </div>

                    {/* Edge fade vignette */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent rounded-b-3xl" />
                </motion.div>

                {/* Social proof stats */}
                <motion.div
                    variants={fadeUp}
                    className="mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-10 sm:gap-16"
                >
                    {STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1">
                            <span className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {stat.value}
                            </span>
                            <span className="text-xs tracking-wider text-zinc-500 uppercase text-center">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
