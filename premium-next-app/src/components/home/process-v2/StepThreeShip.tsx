"use client";

import { motion } from "framer-motion";

const COMMITS = [
    "feat: optimized-auth",
    "fix: cache-invalidation",
    "refactor: data-layer",
    "chore: dependency-update",
    "perf: lazy-loaded-images",
    "feat: user-preferences",
];

export default function StepThreeShip() {
    return (
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
                {/* Infinite Loader Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/30 bg-neutral-900 z-10 group overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full text-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity animate-[spin_5s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                        <path d="M 50 10 A 40 40 0 0 1 90 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        <path d="M 90 50 A 40 40 0 0 1 50 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 8" />
                        <path d="M 50 90 A 40 40 0 0 1 10 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 4" />
                        <path d="M 10 50 A 40 40 0 0 1 50 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-lg font-bold text-brand-accent-light z-10 transition-transform duration-500 group-hover:scale-110">03</span>
                </div>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">Ship in Loops</h3>
            </div>

            {/* Interactive Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-brand-accent/40 w-full">

                {/* Continuous Marquee Background */}
                <div className="absolute inset-0 flex flex-coljustify-end z-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none overflow-hidden">
                    <div className="flex whitespace-nowrap pt-4 animate-[scrollLeftHover_15s_linear_infinite]">
                        {COMMITS.concat(COMMITS).map((commit, i) => (
                            <span key={i} className="font-mono text-4xl font-black text-brand-accent mx-6 tracking-widest uppercase">
                                {commit}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 p-8 lg:p-10 min-h-[320px] flex flex-col justify-between">
                    <div>
                        <p className="text-zinc-400 leading-relaxed max-w-lg">
                            Short delivery cycles so you see real progress every week, not one giant reveal at the end. Kinetic, iterative, and fast.
                        </p>
                    </div>

                    {/* Timeline Expansion Hover (Weekly Pulse) */}
                    <div className="w-full relative mt-8 border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
                            <span>The Feedback Loop</span>
                            <span className="text-brand-accent-light">1 Wk Sprints</span>
                        </div>

                        <div className="relative w-full overflow-hidden rounded-md bg-white/5 border border-white/5 pt-5 pb-4 px-3 flex flex-col justify-start">
                            <div className="absolute inset-x-4 top-[24px] h-px bg-white/10" />

                            {/* Animated nodes that slide/fade in to form a timeline on hover */}
                            <div className="relative z-10 flex items-start justify-between px-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500 w-full">
                                {/* Node 1 */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-brand-accent transition-colors delay-100" />
                                    <span className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors delay-100 uppercase tracking-widest whitespace-nowrap">Mon: Plan</span>
                                </div>
                                {/* Node 2 */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-brand-accent transition-colors delay-200" />
                                    <span className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors delay-200 uppercase tracking-widest whitespace-nowrap">Wed: Build</span>
                                </div>
                                {/* Node 3 */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-brand-accent-light shadow-[0_0_8px_rgba(var(--brand-accent-rgb),0.8)] transition-colors delay-300" />
                                    <span className="text-[9px] font-mono text-brand-accent-light uppercase tracking-widest whitespace-nowrap">Fri: Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrollLeftHover {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
