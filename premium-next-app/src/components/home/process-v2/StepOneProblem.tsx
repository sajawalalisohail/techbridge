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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-brand-accent/40 lg:h-[320px]"
            >
                {/* Searchlight Background */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                    style={{ background: searchLight }}
                />

                <div className="relative z-10 flex flex-col md:flex-row h-full">

                    {/* Left Pane: Descriptive Content */}
                    <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
                        <p className="text-zinc-400 leading-relaxed mb-8">
                            We identify bottlenecks and define one clear scope before touching a build. The vibe is diagnostic, precise, and forensic.
                        </p>

                        {/* Output Micro-tag */}
                        <div className="inline-flex flex-col gap-1 mt-auto">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                Discovery Output
                            </span>
                            <div className="rounded-md border border-brand-accent/20 bg-brand-accent/5 px-3 py-2 text-xs font-mono text-brand-accent-light shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.1)] w-fit backdrop-blur-md">
                                {">"} Problem Definition Doc
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Dedicated Diagnostic Terminal */}
                    <div className="md:w-[280px] lg:w-[320px] bg-zinc-950 border-l border-white/5 relative overflow-hidden flex flex-col">

                        {/* Terminal Header */}
                        <div className="h-8 border-b border-white/5 bg-zinc-900/50 flex items-center px-4 gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-rose-500/20" />
                            <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                            <span className="font-mono text-[8px] text-zinc-500 ml-auto uppercase opacity-50">SYS_DIAGNOSTICS</span>
                        </div>

                        {/* Radar Target Overlay */}
                        <div className="absolute inset-x-0 bottom-0 aspect-square opacity-[0.03] pointer-events-none flex items-center justify-center">
                            <div className="w-full h-full border border-white rounded-full" />
                            <div className="absolute w-[60%] h-[60%] border border-white rounded-full" />
                            <div className="absolute w-full h-px bg-white" />
                            <div className="absolute h-full w-px bg-white" />
                        </div>

                        {/* Forensic Log Stream */}
                        <div className="relative flex-1 overflow-hidden p-4 min-h-0">
                            {/* Fade mask for smooth scrolling logs */}
                            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-zinc-950 to-transparent z-10" />
                            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent z-10" />

                            <div className="flex flex-col gap-2 items-start animate-[scrollUp_15s_linear_infinite] font-mono text-[9px] text-brand-accent-light/70 pointer-events-none select-none h-full">
                                {[
                                    "[AUDIT] Analyzing legacy architecture...",
                                    "[DISCOVERY] Mapping core user journeys...",
                                    "[SCOPE] Defining success metrics... PASS",
                                    "[VERIFY] Checking API rate limits... OK",
                                    "[AUDIT] System health check... NOMINAL",
                                    "[DISCOVERY] Bottleneck located at Node 7... LOGGED",
                                    "[SCOPE] Blueprint constraints generated... PASS",
                                    "[VERIFY] Security vulnerability scan... 0 Threats",
                                    "[AUDIT] Analyzing legacy architecture...",
                                    "[DISCOVERY] Mapping core user journeys...",
                                    "[SCOPE] Defining success metrics... PASS",
                                    "[VERIFY] Checking API rate limits... OK",
                                    "[AUDIT] System health check... NOMINAL",
                                    "[DISCOVERY] Bottleneck located at Node 7... LOGGED",
                                    "[SCOPE] Blueprint constraints generated... PASS",
                                    "[VERIFY] Security vulnerability scan... 0 Threats",
                                ].map((log, i) => (
                                    <div key={i} className="flex items-start gap-2 w-full">
                                        <span className="text-zinc-600 opacity-50 shrink-0">{`>_`}</span>
                                        <span className={log.includes("PASS") || log.includes("OK") || log.includes("NOMINAL") ? "text-emerald-400" : log.includes("LOGGED") ? "text-amber-400" : "text-zinc-400"}>
                                            {log}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
