"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import HeroBlobBackground from "./HeroBlobBackground";
import { CountUp } from "@/components/shared/CountUp";

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
    { value: 50, suffix: "+", label: "Systems in Production" },
    { value: 98, suffix: "%", label: "Client Retention" },
    { value: 3, suffix: "×", label: "Faster Than In-House" },
];



export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
            {/* â”€â”€â”€ 3D Hybrid Background â”€â”€â”€ */}
            <HybridBackground />

            {/* â”€â”€â”€ Overlay: noise + hairline â”€â”€â”€ */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
                {/* â”€â”€ Soft Centered Luminous Cloud Blob Background â”€â”€ */}
                <HeroBlobBackground />

                {/* Fine noise texture â€” dithers gradient banding across the full hero */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "260px 260px",
                        opacity: 0.12,
                        mixBlendMode: "overlay",
                    }}
                />
                {/* Hairline separator at bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* â”€â”€â”€ Main content (above 3D background) â”€â”€â”€ */}
            <motion.div
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="relative z-10 mx-auto flex min-h-screen max-w-[100rem] flex-col items-center justify-center px-6 pb-24 pt-28 lg:px-10"
            >

                {/* Primary headline — word-by-word reveal */}
                <motion.h1
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                    }}
                    className="flex max-w-5xl flex-wrap justify-center gap-x-[0.3em] text-center text-3xl font-semibold leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-4xl lg:text-5xl xl:text-6xl"
                >
                    {["Custom", "Software.", "AI", "Systems."].map((word, i) => (
                        <motion.span
                            key={`w-${i}`}
                            variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                    <motion.span
                        variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                        className="inline-block bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                    >
                        Senior Engineers.
                    </motion.span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mt-6 max-w-2xl text-center text-base leading-relaxed text-zinc-300 drop-shadow-[0_2px_12px_rgba(0,0,0,1)] sm:text-lg lg:text-xl"
                >
                    Custom platforms, AI automation, and SaaS systems.
                    Architected by senior engineers who&apos;ve shipped this before.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    variants={fadeUp}
                    className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-accent px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(0,229,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_0_rgba(0,229,255,0.5)]"
                    >
                        <span className="relative z-10">Our services</span>
                        <svg
                            className="relative z-10 h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Link>

                    <Link
                        href="/work"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/10 hover:text-brand-accent-light"
                    >
                        Get in touch
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </Link>
                </motion.div>


                {/* Social proof stats */}
                <motion.dl
                    variants={fadeUp}
                    className="mt-16 grid grid-cols-1 gap-8 border-t border-white/5 pt-10 sm:grid-cols-3 sm:gap-16"
                >
                    {STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-2">
                            <dd>
                                <CountUp
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    from={20}
                                    className="font-mono text-3xl font-bold tracking-tight bg-gradient-to-br from-brand-accent-light to-brand-accent-light bg-clip-text text-transparent sm:text-4xl"
                                />
                            </dd>
                            <dt className="text-xs tracking-wider text-zinc-500 uppercase text-center">
                                {stat.label}
                            </dt>
                        </div>
                    ))}
                </motion.dl>
            </motion.div>
        </section>
    );
}

