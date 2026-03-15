"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animation ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const blockVariants = {
    hidden: { opacity: 0.15 },
    show: (i: number) => ({
        opacity: 1,
        transition: { duration: 0.5, ease: EASE, delay: 0.8 + i * 0.15 },
    }),
};

/* ─── Main Export ────────────────────────────────────────── */
export default function BrowserLoadMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/5 bg-black/30"
        >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <div className="ml-2 flex-1 rounded-sm bg-white/5 px-2 py-0.5">
                    <span className="font-mono text-[9px] text-zinc-600">techbridge.dev</span>
                </div>
            </div>

            {/* Loading progress bar */}
            <motion.div
                className="h-[2px] bg-gradient-to-r from-lime-500 to-yellow-500"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            />

            {/* Page content skeleton */}
            <div className="space-y-2.5 p-3">
                {/* Nav skeleton */}
                <motion.div
                    custom={0}
                    variants={blockVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex items-center justify-between"
                >
                    <div className="h-2 w-10 rounded-sm bg-white/10" />
                    <div className="flex gap-2">
                        <div className="h-2 w-6 rounded-sm bg-white/6" />
                        <div className="h-2 w-6 rounded-sm bg-white/6" />
                        <div className="h-2 w-6 rounded-sm bg-white/6" />
                    </div>
                </motion.div>

                {/* Hero skeleton */}
                <motion.div
                    custom={1}
                    variants={blockVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="space-y-1.5 py-2"
                >
                    <div className="h-3 w-3/4 rounded-sm bg-white/10" />
                    <div className="h-3 w-1/2 rounded-sm bg-white/8" />
                    <div className="mt-2 h-2 w-1/3 rounded-sm bg-lime-500/20" />
                </motion.div>

                {/* Two column cards */}
                <motion.div
                    custom={2}
                    variants={blockVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex gap-2"
                >
                    <div className="flex-1 space-y-1 rounded bg-white/5 p-2">
                        <div className="h-2 w-full rounded-sm bg-white/8" />
                        <div className="h-2 w-2/3 rounded-sm bg-white/6" />
                    </div>
                    <div className="flex-1 space-y-1 rounded bg-white/5 p-2">
                        <div className="h-2 w-full rounded-sm bg-white/8" />
                        <div className="h-2 w-2/3 rounded-sm bg-white/6" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
