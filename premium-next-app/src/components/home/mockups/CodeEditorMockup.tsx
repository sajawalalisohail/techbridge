"use client";

import { motion } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const CODE_LINES = [
    { tokens: [{ text: "const", color: "text-lime-400" }, { text: " app ", color: "text-zinc-300" }, { text: "=", color: "text-zinc-500" }, { text: " createApp", color: "text-emerald-400" }, { text: "({", color: "text-zinc-500" }] },
    { tokens: [{ text: "  runtime", color: "text-lime-300" }, { text: ":", color: "text-zinc-500" }, { text: ' "edge"', color: "text-amber-300" }, { text: ",", color: "text-zinc-500" }] },
    { tokens: [{ text: "  framework", color: "text-lime-300" }, { text: ":", color: "text-zinc-500" }, { text: ' "next@16"', color: "text-amber-300" }, { text: ",", color: "text-zinc-500" }] },
    { tokens: [{ text: "  auth", color: "text-lime-300" }, { text: ":", color: "text-zinc-500" }, { text: " withOAuth", color: "text-emerald-400" }, { text: "(),", color: "text-zinc-500" }] },
    { tokens: [{ text: "  db", color: "text-lime-300" }, { text: ":", color: "text-zinc-500" }, { text: " postgres", color: "text-emerald-400" }, { text: "({", color: "text-zinc-500" }] },
    { tokens: [{ text: "    pool", color: "text-lime-300" }, { text: ":", color: "text-zinc-500" }, { text: " 20", color: "text-orange-300" }, { text: ",", color: "text-zinc-500" }] },
    { tokens: [{ text: "  }),", color: "text-zinc-500" }] },
    { tokens: [{ text: "});", color: "text-zinc-500" }] },
];

/* ─── Animation variants ─────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
};

const lineVariants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

/* ─── Main Export ────────────────────────────────────────── */
export default function CodeEditorMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/5 bg-neutral-950"
        >
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-[10px] text-zinc-600">app.config.ts</span>
            </div>

            {/* Code area */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-0.5 px-4 py-3"
            >
                {CODE_LINES.map((line, i) => (
                    <motion.div
                        key={i}
                        variants={lineVariants}
                        className="flex items-center gap-0 font-mono text-[11px] leading-5"
                    >
                        <span className="mr-3 w-4 select-none text-right text-[10px] text-zinc-700">
                            {i + 1}
                        </span>
                        {line.tokens.map((token, j) => (
                            <span key={j} className={token.color}>
                                {token.text}
                            </span>
                        ))}
                        {/* Blinking cursor on last line */}
                        {i === CODE_LINES.length - 1 && (
                            <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-[cursor-blink_1s_step-end_infinite] bg-lime-400" />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
