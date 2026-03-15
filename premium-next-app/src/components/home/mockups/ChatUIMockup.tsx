"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const USER_MESSAGE = "Analyze our team's workflow for automation opportunities.";
const AI_RESPONSE = "I've identified 3 automation opportunities that could save 12 hours per week.";
const AI_WORDS = AI_RESPONSE.split(" ");

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Sub-components ─────────────────────────────────────── */
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-3 py-2">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-zinc-500"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function ChatUIMockup() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [phase, setPhase] = useState<"idle" | "typing" | "response">("idle");
    const [wordIndex, setWordIndex] = useState(0);

    /* Sequence: idle → typing dots → word-by-word response */
    useEffect(() => {
        if (!isInView) return;
        const typingTimer = setTimeout(() => setPhase("typing"), 600);
        const responseTimer = setTimeout(() => setPhase("response"), 1800);
        return () => { clearTimeout(typingTimer); clearTimeout(responseTimer); };
    }, [isInView]);

    useEffect(() => {
        if (phase !== "response") return;
        if (wordIndex >= AI_WORDS.length) return;
        const timer = setTimeout(() => setWordIndex((prev) => prev + 1), 60);
        return () => clearTimeout(timer);
    }, [phase, wordIndex]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col gap-3 rounded-xl border border-white/5 bg-black/30 px-4 py-5"
        >
            {/* User message */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="ml-auto max-w-[85%] rounded-xl rounded-br-sm border border-lime-500/20 bg-lime-600/15 px-3 py-2"
            >
                <p className="text-[11px] leading-relaxed text-zinc-300">{USER_MESSAGE}</p>
            </motion.div>

            {/* AI response area */}
            <div className="max-w-[85%]">
                <AnimatePresence mode="wait">
                    {phase === "typing" && (
                        <motion.div
                            key="dots"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex rounded-xl rounded-bl-sm border border-white/8 bg-white/5"
                        >
                            <TypingDots />
                        </motion.div>
                    )}
                    {phase === "response" && (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="rounded-xl rounded-bl-sm border border-white/8 bg-white/5 px-3 py-2"
                        >
                            <p className="text-[11px] leading-relaxed text-zinc-300">
                                {AI_WORDS.slice(0, wordIndex).join(" ")}
                                {wordIndex < AI_WORDS.length && (
                                    <span className="ml-0.5 inline-block h-3 w-[2px] animate-[cursor-blink_1s_step-end_infinite] bg-lime-400" />
                                )}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
