"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HeroBlobBackground from "./HeroBlobBackground";

// Dynamically import 3D background for performance
const HybridBackground = dynamic(
    () => import("@/3d").then((mod) => mod.HybridBackground),
    { ssr: false }
);

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
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* ─── 3D Hybrid Background ─── */}
            <HybridBackground />

            {/* ─── Overlay: noise + hairline ─── */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
                {/* ── Soft Centered Luminous Cloud Blob Background ── */}
                <HeroBlobBackground />

                {/* Fine noise texture — dithers gradient banding across the full hero */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "200px 200px",
                        opacity: 0.55,
                        mixBlendMode: "overlay",
                    }}
                />
                {/* Hairline separator at bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ─── Main content (above 3D background) ─── */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-32 lg:px-12"
            >

                {/* Primary headline */}
                <motion.h1
                    variants={fadeUp}
                    className="max-w-5xl text-center text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[5rem]"
                >
                    <span className="block">We Build the Systems That Drive</span>
                    <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Modern Business
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mt-6 max-w-2xl text-center text-base leading-7 text-zinc-400 lg:text-lg"
                >
                    TechBridge delivers custom software, AI automation, and scalable SaaS
                    platforms — engineered for precision, built for growth.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    variants={fadeUp}
                    className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
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


                {/* Social proof stats */}
                <motion.div
                    variants={fadeUp}
                    className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-10 sm:gap-16"
                >
                    {STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-2">
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
