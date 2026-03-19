"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function StepTwoArchitecture() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    // Parallax mouse tracking state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Subtle parallax shifts
    const rotateX = useTransform(y, [-50, 50], [2, -2]);
    const rotateY = useTransform(x, [-50, 50], [-2, 2]);
    const translateZLayer1 = useTransform(x, [-50, 50], [-10, 10]);
    const translateZLayer2 = useTransform(y, [-50, 50], [-15, 15]);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const center_x = left + width / 2;
        const center_y = top + height / 2;
        mouseX.set(clientX - center_x);
        mouseY.set(clientY - center_y);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center ml-auto">
            <div className="flex flex-row-reverse lg:flex-row items-center justify-start lg:justify-end gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white lg:text-3xl text-right">Design the Architecture</h3>
                {/* 3D Wireframe Cube Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/30 bg-neutral-900 z-10">
                    <span className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand-accent)" strokeWidth="1" className="w-8 h-8 animate-[spin_10s_linear_infinite]">
                            <path strokeDasharray="4 2" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline strokeDasharray="4 2" points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line strokeDasharray="4 2" x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </span>
                    <span className="font-mono text-lg font-bold text-brand-accent-light z-10">02</span>
                </div>
            </div>

            {/* Interactive Card container (Perspective) */}
            <div
                style={{ perspective: "1200px" }}
                className="group relative cursor-pointer"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    ref={cardRef}
                    style={{
                        rotateX,
                        rotateY: isFlipped ? 180 : rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-[280px]"
                >
                    {/* Front Face */}
                    <div
                        className="absolute inset-0 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-8 lg:p-10 flex flex-col transition-colors duration-500 group-hover:border-brand-accent/40"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <p className="text-zinc-400 leading-relaxed flex-grow">
                            Integration maps, data boundaries, and failure paths — all defined up front before a single line of code is written. Structure, 3D, and blueprint-focused.
                        </p>

                        <div className="flex items-center justify-between mt-6">
                            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Blueprint Toggle</span>
                            <button className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 hover:text-brand-accent">
                                Click to See Schema
                            </button>
                        </div>

                        {/* Parallax layers */}
                        <motion.div
                            style={{ x: translateZLayer1, y: translateZLayer2 }}
                            className="absolute right-[-10px] top-[-10px] w-24 h-24 border border-brand-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        />
                        <motion.div
                            style={{ x: translateZLayer2, y: translateZLayer1 }}
                            className="absolute right-[20px] top-[-30px] w-32 h-32 border border-brand-accent/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        />
                    </div>

                    {/* Back Face (Flipped) */}
                    <div
                        className="absolute inset-0 rounded-2xl border border-brand-accent/40 bg-zinc-950 p-8 lg:p-10 flex flex-col justify-center"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <div className="space-y-4 relative z-10 w-full">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2">Tech Stack Blueprint</div>

                            <ul className="space-y-3 font-mono text-xs text-zinc-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                    System Flowcharts
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                    Database Schema Layout
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                    Scalability Action Plan
                                </li>
                            </ul>
                        </div>

                        {/* Blurred ER Diagram graphic in background */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-20 blur-[2px]">
                            <svg className="w-full h-full stroke-brand-accent" fill="none" viewBox="0 0 400 300">
                                <rect x="50" y="50" width="80" height="40" rx="4" />
                                <rect x="250" y="50" width="100" height="60" rx="4" />
                                <rect x="150" y="180" width="120" height="80" rx="4" />
                                <path d="M130 70 H250 M170 180 V110" strokeDasharray="4 4" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
