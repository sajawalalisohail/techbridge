"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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





export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">


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

                {/* Primary headline */}
                <motion.h1
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                    }}
                    className="flex max-w-5xl flex-wrap justify-center gap-x-[0.3em] text-center text-4xl font-normal leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                    {["Senior", "Engineers."].map((word, i) => (
                        <motion.span
                            key={`w1-${i}`}
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
                        Half
                    </motion.span>
                    {["the", "Cost."].map((word, i) => (
                        <motion.span
                            key={`w2-${i}`}
                            variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                    {["Full", "Accountability."].map((word, i) => (
                        <motion.span
                            key={`w3-${i}`}
                            variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mt-4 max-w-xl text-center text-sm font-medium tracking-wide text-zinc-400 drop-shadow-md sm:mt-6 sm:max-w-2xl sm:text-base leading-relaxed"
                >
                    Custom software, AI systems, and dedicated engineering talent — architected from West Virginia,
                    delivered by senior engineers in Pakistan at half the US rate. <br className="hidden sm:block" />
                    Your next build or your next hire. We do both.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    variants={fadeUp}
                    className="mt-12 flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4"
                >
                    <Link
                        href="/contact"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[13.5px] sm:px-8 sm:py-3.5 sm:text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/10 hover:text-brand-accent-light"
                    >
                        Start a Project
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    <Link
                        href="/staff-augmentation"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[13.5px] sm:px-8 sm:py-3.5 sm:text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/10 hover:text-brand-accent-light"
                    >
                        Hire Engineers
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

