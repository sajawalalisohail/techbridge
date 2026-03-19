"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GuaranteeBadgeAnimation({ isInView }: { isInView: boolean }) {
    return (
        <div
            aria-hidden="true"
            className="flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 p-6"
        >
            {/* Shield with checkmark */}
            <svg
                viewBox="0 0 80 90"
                className="h-20 w-20"
                fill="none"
            >
                {/* Shield outline — draw in */}
                <motion.path
                    d="M40 5 L70 20 V50 C70 65 55 80 40 85 C25 80 10 65 10 50 V20 Z"
                    stroke="var(--brand-accent-light)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(var(--brand-accent-rgb), 0.06)"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, ease: EASE }}
                />

                {/* Checkmark — draw in after shield */}
                <motion.path
                    d="M26 45 L36 55 L54 35"
                    stroke="var(--brand-accent-light)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{
                        pathLength: { duration: 0.4, ease: EASE, delay: 0.8 },
                        opacity: { duration: 0.1, delay: 0.8 },
                    }}
                />
            </svg>

            {/* Text */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
                className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-brand-accent-light"
            >
                100% Replacement Guarantee
            </motion.p>
        </div>
    );
}
