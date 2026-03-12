"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ZeroBloatIllustration() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-32 w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 my-4 flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full max-w-[250px]">

                {/* Faded Chaos Network Background */}
                <g className="opacity-20 hidden md:block group-hover:opacity-10 transition-opacity duration-700">
                    <path d="M 20 50 Q 50 10 80 50 T 140 50" fill="none" stroke="#52525b" strokeWidth="1" strokeDasharray="2 4" />
                    <path d="M 40 80 Q 70 40 100 80 T 160 80" fill="none" stroke="#52525b" strokeWidth="1" strokeDasharray="2 4" />
                    <path d="M 30 20 Q 90 90 150 20" fill="none" stroke="#52525b" strokeWidth="1" strokeDasharray="2 4" />
                    {[20, 50, 80, 140, 40, 70, 100, 160, 30, 90, 150].map((x, i) => (
                        <circle key={`chaos-${i}`} cx={x} cy={i % 2 === 0 ? 50 : (i % 3 === 0 ? 80 : 20)} r="2" fill="#52525b" />
                    ))}
                </g>

                {/* The Direct Path (Foreground) */}
                <defs>
                    <linearGradient id="direct-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow-path" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Main thick path */}
                <motion.line
                    x1="30" y1="50" x2="170" y2="50"
                    stroke="url(#direct-path-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glow-path)"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />

                {/* Animated data packet traveling the direct path */}
                {isInView && (
                    <motion.circle
                        r="3" fill="#ffffff"
                        animate={{ cx: [30, 170], cy: [50, 50], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                )}

                {/* "You" Node */}
                <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <circle cx="30" cy="50" r="12" fill="#18181b" stroke="#4f46e5" strokeWidth="2" />
                    <text x="30" y="53" textAnchor="middle" fontSize="8" fill="#a1a1aa" fontFamily="monospace" fontWeight="bold">YOU</text>
                </motion.g>

                {/* "Builder" Node */}
                <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <circle cx="170" cy="50" r="14" fill="#2e1065" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="170" y="53" textAnchor="middle" fontSize="7" fill="#ddd6fe" fontFamily="monospace" fontWeight="bold">DEV</text>
                </motion.g>
            </svg>
        </div>
    );
}
