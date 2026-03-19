"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function StepOneProblem() {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // A searchlight gradient representing "diagnostic and forensic" visibility
    const searchLight = useMotionTemplate`radial-gradient(
        400px circle at ${mouseX}px ${mouseY}px,
        rgba(var(--brand-accent-rgb), 0.15),
        transparent 80%
    )`;

    return (
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
                {/* Sonar Pulse Ring Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/30 bg-neutral-900 z-10">
                    <span className="font-mono text-lg font-bold text-brand-accent-light">01</span>
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border border-brand-accent/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-brand-accent/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                </div>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">Map the Problem</h3>
            </div>

            {/* Interactive Card */}
            <motion.div
                ref={cardRef}
                onMouseMove={onMouseMove}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-brand-accent/40"
            >
                {/* Searchlight Background */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: searchLight }}
                />

                {/* Audit Log Backdrop (Visible on Hover) */}
                <div className="absolute top-0 right-0 bottom-0 w-2/3 overflow-hidden opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-[0.03] pointer-events-none">
                    <div className="flex flex-col gap-1 items-end animate-[scrollUp_20s_linear_infinite] font-mono text-[10px] text-brand-accent-light pointer-events-none select-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <span key={i}>
                                SYS_AUDIT_{Math.floor(Math.random() * 9000) + 1000} :: SCAN_METRICS // DATA_VERIFY
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 p-8 lg:p-10">
                    <p className="text-zinc-400 leading-relaxed max-w-lg mb-8">
                        We identify bottlenecks and define one clear scope before touching a build. The vibe is diagnostic, precise, and forensic.
                    </p>

                    {/* Output Micro-tag */}
                    <div className="inline-flex flex-col gap-1 mt-4">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                            Discovery Output
                        </span>
                        <div className="rounded-md border border-brand-accent/20 bg-brand-accent/5 px-3 py-2 text-xs font-mono text-brand-accent-light shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.1)]">
                            {">"} Problem Definition Doc &amp; Success Metrics
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
