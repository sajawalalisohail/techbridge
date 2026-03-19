"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const CODE_LINES = [
    { tokens: [{ text: "const", cls: "text-brand-accent-light" }, { text: " api", cls: "text-white" }, { text: " = ", cls: "text-zinc-500" }, { text: "buildAPI", cls: "text-blue-400" }, { text: "({", cls: "text-zinc-500" }] },
    { tokens: [{ text: "  hooks", cls: "text-zinc-300" }, { text: ": ", cls: "text-zinc-500" }, { text: "true", cls: "text-brand-accent-light" }, { text: ",", cls: "text-zinc-500" }] },
    { tokens: [{ text: "  automation", cls: "text-zinc-300" }, { text: ": ", cls: "text-zinc-500" }, { text: "\"day-one\"", cls: "text-emerald-400" }, { text: ",", cls: "text-zinc-500" }] },
    { tokens: [{ text: "});", cls: "text-zinc-500" }] },
];

const lineStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.4, delayChildren: 0.2 } },
};

const lineVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.15 } },
};

export default function CodeTypingAnimation({ isInView }: { isInView: boolean }) {
    return (
        <div
            aria-hidden="true"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 font-mono text-sm leading-relaxed"
        >
            {/* Top bar dots */}
            <div className="mb-3 flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-zinc-700" />
                <div className="h-2 w-2 rounded-full bg-zinc-700" />
                <div className="h-2 w-2 rounded-full bg-zinc-700" />
            </div>

            <motion.div
                variants={lineStagger}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                {CODE_LINES.map((line, li) => (
                    <motion.div key={li} variants={lineVariant} className="whitespace-pre">
                        {line.tokens.map((token, ti) => (
                            <span key={ti} className={token.cls}>{token.text}</span>
                        ))}
                    </motion.div>
                ))}
                {/* Blinking cursor */}
                <motion.span
                    variants={lineVariant}
                    className="mt-1 inline-block h-4 w-1.5 bg-brand-accent-light"
                    style={{ animation: "cursor-blink 1s step-end infinite" }}
                />
            </motion.div>
        </div>
    );
}
