"use client";

import { useRef, useState, MouseEvent } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    // Magnetic effect state
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100, mass: 0.8 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!pillRef.current) return;
        const rect = pillRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const backgroundGlow = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(var(--brand-accent-rgb), 0.12), transparent 40%)`;

    return (
        <section
            ref={sectionRef}
            aria-label="Call to action"
            className="relative z-10 py-32 lg:py-40 flex justify-center items-center px-4 overflow-visible"
        >
            <motion.div
                ref={pillRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex w-full max-w-4xl flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/60 px-8 py-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-accent/40 hover:shadow-[0_20px_50px_rgba(var(--brand-accent-rgb),0.15)] sm:flex-row sm:rounded-full lg:px-12"
            >
                {/* Left side text */}
                <div className="z-10 flex w-full flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                        Next Step
                    </span>
                    <h2 className="text-2xl font-light tracking-tight text-white lg:text-3xl">
                        Stop Evaluating. Start <span className="bg-gradient-to-r from-brand-accent to-brand-accent-light bg-clip-text text-transparent">Building.</span>
                    </h2>
                    <p className="max-w-md text-sm text-zinc-400">
                        Book a 30-minute call with the engineer who&apos;ll actually build your system.
                    </p>
                </div>

                {/* Right side button */}
                <div className="z-10 flex-shrink-0">
                    <Link
                        href="/contact"
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 active:scale-95"
                    >
                        Book a Call, Free
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Interactive background glow that follows the mouse */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-full"
                    style={{ background: backgroundGlow }}
                />
            </motion.div>
        </section>
    );
}
