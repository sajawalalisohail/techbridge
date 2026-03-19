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
                            className="absolute right-[20px] top-[30px] w-32 h-32 border border-brand-accent/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        />
                    </div>

                    {/* Back Face (Flipped) */}
                    <div
                        className="absolute inset-0 rounded-2xl border border-brand-accent/40 bg-zinc-950 p-6 lg:p-8 flex flex-col"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4 z-10">Tech Stack Blueprint</div>

                        {/* High Fidelity Node Graph Diagram */}
                        <div className="relative flex-grow w-full border border-white/5 rounded-xl bg-black/40 overflow-hidden flex items-center justify-center">
                            {/* Grid Background */}
                            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

                            {/* The Nodes */}
                            <div className="relative w-full max-w-[280px] h-[160px]">
                                {/* Connecting Lines with glowing data packets */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                                    {/* Client to Gateway */}
                                    <path d="M 40 80 L 100 80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                    <motion.circle cx="40" cy="80" r="2" fill="var(--brand-accent)" animate={{ cx: [40, 100] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />

                                    {/* Gateway to Database */}
                                    <path d="M 140 80 L 200 40" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                                    <motion.circle cx="140" cy="80" r="2" fill="var(--brand-accent-light)" animate={{ cx: [140, 200], cy: [80, 40] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.5 }} />

                                    {/* Gateway to Logic */}
                                    <path d="M 140 80 L 200 120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                                    <motion.circle cx="140" cy="80" r="2" fill="#10B981" animate={{ cx: [140, 200], cy: [80, 120] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.2 }} />
                                </svg>

                                {/* Client Node */}
                                <div className="absolute left-[10px] top-[70px] flex items-center justify-center p-2 rounded border border-white/10 bg-zinc-900 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                    <span className="font-mono text-[9px] text-zinc-300">Client</span>
                                </div>

                                {/* API Gateway Node */}
                                <div className="absolute left-[100px] top-[65px] flex flex-col items-center justify-center p-2 rounded border border-brand-accent/40 bg-brand-accent/10 z-10 shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.2)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent absolute -top-0.5 -right-0.5 animate-ping" />
                                    <span className="font-mono text-[9px] text-brand-accent-light font-bold">API Gateway</span>
                                </div>

                                {/* Database Node */}
                                <div className="absolute left-[200px] top-[25px] flex items-center justify-center p-2 rounded border border-white/10 bg-zinc-900 z-10">
                                    <span className="font-mono text-[9px] text-zinc-300 flex items-center gap-1">
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                                        Database
                                    </span>
                                </div>

                                {/* Logic / Cloud Node */}
                                <div className="absolute left-[200px] top-[105px] flex items-center justify-center p-2 rounded border border-white/10 bg-zinc-900 z-10">
                                    <span className="font-mono text-[9px] text-zinc-300 flex items-center gap-1">
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
                                        Cloud Logic
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status Overlay Footer */}
                        <div className="mt-4 flex justify-between items-center px-2">
                            <span className="flex items-center gap-2 font-mono text-[9px] text-zinc-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                SCHEMA VALIDATED
                            </span>
                            <span className="font-mono text-[9px] text-zinc-600">v2.4.0</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
