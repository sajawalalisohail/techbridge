"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TimelineBarsAnimation({ isInView }: { isInView: boolean }) {
    return (
        <div aria-hidden="true" className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            {/* Agency bar */}
            <div>
                <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
                    <span>Typical Agency</span>
                    <span>12 weeks</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                        className="h-full rounded-full bg-zinc-600"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 0.85 } : {}}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                        style={{ originX: 0 }}
                    />
                </div>
            </div>

            {/* TechBridge bar */}
            <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-brand-accent-light">TechBridge</span>
                    <span className="font-bold text-brand-accent-light">Weeks</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 0.28 } : {}}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
                        style={{
                            originX: 0,
                            boxShadow: "0 0 12px rgba(var(--brand-accent-rgb), 0.4)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
