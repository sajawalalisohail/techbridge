"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StepFourLaunch() {
    const [latency, setLatency] = useState(42);

    // Mock jittering latency stat
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * (48 - 38 + 1) + 38));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center ml-auto">
            <div className="flex flex-row-reverse lg:flex-row items-center justify-start lg:justify-end gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white lg:text-3xl text-right">Launch &amp; Monitor</h3>
                {/* Glowing Live Indicator Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-neutral-900 z-10 box-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <span className="font-mono text-lg font-bold text-emerald-400 z-10 gap-1 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        04
                    </span>
                    {/* SVG Waveform wrapper */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M0 10 L8 10 L12 2 L16 18 L20 10 L40 10"
                                stroke="#10B981"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Interactive Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] w-full h-[280px]">

                {/* Breathing Border Overlay */}
                <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/0 group-hover:border-emerald-500/30 transition-all duration-1000 group-hover:animate-pulse pointer-events-none" />

                {/* Content Matrix Container */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Default View (Always visible partially) */}
                    <div className="p-8 lg:p-10 transition-transform duration-500 group-hover:-translate-y-4">
                        <p className="text-zinc-400 leading-relaxed max-w-lg mb-8">
                            Going live is an operating phase, not a handoff. Monitoring, rollback
                            paths, and the first post-launch iteration are defined before release
                            day arrives.
                        </p>

                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-600">
                            Post-Launch Guardrails
                        </div>
                    </div>

                    {/* Status Dashboard (Slides up on Hover) */}
                    <div className="absolute left-0 right-0 bottom-0 bg-zinc-950 border-t border-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">System Health</span>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-500/70 uppercase">Live Telemetry</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-1 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                <span className="text-[10px] text-zinc-500 font-mono uppercase">Uptime</span>
                                <span className="text-sm font-bold text-white font-mono">99.99%</span>
                            </div>
                            <div className="flex flex-col gap-1 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                <span className="text-[10px] text-zinc-500 font-mono uppercase">Latency</span>
                                <span className="text-sm font-bold text-emerald-400 font-mono">{latency}ms</span>
                            </div>
                            <div className="flex flex-col gap-1 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                <span className="text-[10px] text-zinc-500 font-mono uppercase">Errors</span>
                                <span className="text-sm font-bold text-white font-mono">0.00%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
