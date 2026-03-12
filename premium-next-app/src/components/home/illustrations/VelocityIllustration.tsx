"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function VelocityIllustration() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-32 w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 my-4 flex items-end justify-start p-2">

            {/* Background grid markings (Subtle chart look) */}
            <div className="absolute inset-x-0 bottom-0 top-[20%] opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                    backgroundSize: '25% 33%',
                    backgroundPosition: 'left bottom'
                }}
            />

            <svg viewBox="0 0 200 100" className="w-full h-full absolute inset-0 preserve-3d">
                <defs>
                    <linearGradient id="velocity-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="velocity-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Fill under the curve */}
                <motion.path
                    d="M 10 90 Q 80 85 110 50 T 190 10 L 190 90 Z"
                    fill="url(#velocity-fill)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* The high-speed trajectory line */}
                <motion.path
                    d="M 10 90 Q 80 85 110 50 T 190 10"
                    fill="none"
                    stroke="url(#velocity-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                />

                {/* Racing comet indicator */}
                {isInView && (
                    <motion.circle
                        r="4" fill="#ffffff"
                        style={{ filter: "drop-shadow(0px 0px 8px rgba(255,255,255,0.8))" }}
                        animate={{
                            offsetDistance: ["0%", "100%"]
                        }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    >
                        {/* We use an animateMotion hack if simple offset distance doesn't work perfectly in all browsers, but Framer handles most paths well. However, standard path animation works nicely with SVGs. */}
                        <animateMotion dur="1.2s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.25 0.1 0.25 1" repeatCount="1">
                            <mpath href="#velocity-path" />
                        </animateMotion>
                    </motion.circle>
                )}
                {/* Invisible path for the comet to follow strictly if we want to ensure exact tracking */}
                <path id="velocity-path" d="M 10 90 Q 80 85 110 50 T 190 10" fill="none" stroke="none" />
            </svg>

            {/* Glowing comet head tracked via Framer (fallback to svg native above for simplicity, we'll just put a static one at the end that fades in) */}
            <motion.div
                className="absolute right-[5%] top-[10%] h-3 w-3 rounded-full bg-white shadow-[0_0_15px_5px_rgba(167,139,250,0.8)]"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.3 }}
            />
        </div>
    );
}
