"use client";

import type { MouseEvent } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CALL_STEPS = [
    "Pick the right lane: build a system or hire senior engineers",
    "Pressure-test scope, timing, team gaps, and risk",
    "Leave with a concrete next move instead of a vague follow-up",
];

export default function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100, mass: 0.8 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!pillRef.current) {
            return;
        }

        const rect = pillRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const backgroundGlow = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(var(--brand-accent-rgb), ${isHovered ? 0.14 : 0.08}), transparent 40%)`;

    return (
        <section
            ref={sectionRef}
            aria-label="Call to action"
            className="relative z-10 flex items-center justify-center overflow-visible px-4 py-32 lg:py-40"
        >
            <motion.div
                ref={pillRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/60 px-8 py-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-accent/40 hover:shadow-[0_20px_50px_rgba(var(--brand-accent-rgb),0.15)] lg:px-12"
            >
                <div className="z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                    <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                            Next Step
                        </span>
                        <h2 className="text-2xl font-light tracking-tight text-white lg:text-3xl">
                            Stop circling the project. Start the{" "}
                            <span className="bg-gradient-to-r from-brand-accent to-brand-accent-light bg-clip-text text-transparent">
                                right operating lane.
                            </span>
                        </h2>
                        <p className="max-w-xl text-sm leading-6 text-zinc-400">
                            The first call is built to clarify whether you need a full system or
                            senior capacity, expose the real constraint, and leave you with a
                            concrete next move.
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                Start a Project
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/staff-augmentation"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-brand-accent-light"
                            >
                                See the talent model
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="z-10 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 sm:p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                            What happens on the call
                        </p>
                        <div className="mt-5 space-y-3">
                            {CALL_STEPS.map((step, index) => (
                                <div
                                    key={step}
                                    className="flex items-start gap-4 rounded-[1rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                                >
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-accent/25 bg-brand-accent/[0.14] text-sm font-semibold text-white">
                                        0{index + 1}
                                    </div>
                                    <p className="pt-1 text-sm leading-6 text-zinc-300">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: backgroundGlow }}
                />
            </motion.div>
        </section>
    );
}
