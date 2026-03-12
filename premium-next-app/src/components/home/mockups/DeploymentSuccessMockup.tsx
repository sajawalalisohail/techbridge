"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Rocket, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DeploymentSuccessMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [progress, setProgress] = useState(0);

    // Simulate progress bar filling up quickly when in view
    useEffect(() => {
        if (!isInView) return;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15 + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
            }
            setProgress(Math.floor(currentProgress));
        }, 100);

        return () => clearInterval(interval);
    }, [isInView]);

    const isComplete = progress === 100;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-[#0c0c0c] p-5 shadow-2xl lg:h-72 lg:p-6"
        >
            {/* Top Bar - Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Rocket size={16} className={isComplete ? "text-violet-400" : "text-zinc-500"} />
                    <span className="font-mono text-xs font-medium text-zinc-300">
                        system_deploy.sh
                    </span>
                </div>

                {/* Status Badge */}
                <motion.div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${isComplete
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : "border border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                        }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {isComplete ? (
                        <>
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            </span>
                            LIVE
                        </>
                    ) : (
                        "Building..."
                    )}
                </motion.div>
            </div>

            {/* Middle Section - Performance Graph (Appears after completion) */}
            <div className="relative mb-2 mt-4 flex-1">
                {isComplete && (
                    <motion.div
                        className="absolute inset-0 flex flex-col justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                )}

                {/* SVG Graph animated drawing */}
                {isComplete && (
                    <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="chart-area" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="chart-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgb(99,102,241)" />
                                <stop offset="100%" stopColor="rgb(167,139,250)" />
                            </linearGradient>
                        </defs>

                        {/* The Path (Upward curve) */}
                        <motion.path
                            d="M0,90 Q30,80 50,50 T100,5"
                            fill="none"
                            stroke="url(#chart-line)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                        />
                        <motion.path
                            d="M0,90 Q30,80 50,50 T100,5 L100,100 L0,100 Z"
                            fill="url(#chart-area)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                    </svg>
                )}

                {/* Uplift Stat */}
                {isComplete && (
                    <motion.div
                        className="absolute right-0 top-0 flex items-center gap-1 rounded-lg border border-violet-500/20 bg-violet-900/30 px-2.5 py-1.5 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
                    >
                        <ArrowUpRight size={14} className="text-violet-400" />
                        <span className="font-mono text-xs font-bold text-white">2.4x ROI</span>
                    </motion.div>
                )}
            </div>

            {/* Bottom Section - Progress Bar */}
            <div>
                <div className="mb-2 flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    <span>Performance Optimization</span>
                    <span className={isComplete ? "text-violet-400" : ""}>{progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }} // Smooth snap between tick values
                    />
                </div>

                {/* Secondary success checks */}
                <div className="mt-4 flex gap-4 text-xs">
                    <motion.div
                        className="flex items-center gap-1.5 text-zinc-400"
                        initial={{ opacity: 0 }} animate={progress > 30 ? { opacity: 1 } : {}}
                    >
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="scale-[0.8] lg:scale-100">Edge Cached</span>
                    </motion.div>
                    <motion.div
                        className="flex items-center gap-1.5 text-zinc-400"
                        initial={{ opacity: 0 }} animate={progress > 70 ? { opacity: 1 } : {}}
                    >
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="scale-[0.8] lg:scale-100">DB Migrated</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
