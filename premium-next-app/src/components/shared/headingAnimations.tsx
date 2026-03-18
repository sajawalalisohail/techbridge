"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ─── Shared Constants ──────────────────────────────────── */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0, y = 20): Variants => ({
    hidden: { opacity: 0, y },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: EASE },
    },
});

export const createStaggerContainer = (
    staggerChildren: number,
    delayChildren = 0
): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

/* ─── 1. SLIDE FROM LEFT ────────────────────────────────── */
export const slideFromLeft: Variants = {
    hidden: { x: -80, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: EASE },
    },
};

export const slideFromLeftContainer = createStaggerContainer(0.1);

export const slideFromLeftItem: Variants = {
    hidden: { x: -80, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: EASE },
    },
};

/* ─── 2. SLIDE FROM RIGHT ───────────────────────────────── */
export const slideFromRight: Variants = {
    hidden: { x: 80, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: EASE },
    },
};

export const slideFromRightContainer = createStaggerContainer(0.1);

export const slideFromRightItem: Variants = {
    hidden: { x: 80, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: EASE },
    },
};

/* ─── 3. WORD BY WORD REVEAL ────────────────────────────── */
export const wordContainerVariants = createStaggerContainer(0.08);

export const wordVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: EASE },
    },
};

export function WordReveal({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    const words = text.split(" ");
    return (
        <motion.div
            variants={wordContainerVariants}
            className={className}
            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    variants={wordVariants}
                    style={{ display: "inline-block" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

/* ─── 4. CLIP REVEAL ────────────────────────────────────── */
export const clipRevealVariants: Variants = {
    hidden: { y: "100%" },
    show: {
        y: "0%",
        transition: { duration: 0.9, ease: EASE },
    },
};

export function ClipReveal({
    children,
    className,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <div className={`overflow-hidden ${className || ""}`}>
            <motion.div
                variants={{
                    hidden: { y: "100%" },
                    show: {
                        y: "0%",
                        transition: { duration: 0.9, delay, ease: EASE },
                    },
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

/* ─── 5. LETTER SCALE IN ───────────────────────────────── */
export const letterContainerVariants: Variants = {
    ...createStaggerContainer(0.03),
};

export const letterVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: EASE },
    },
};

export function LetterScaleIn({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    return (
        <motion.span
            variants={letterContainerVariants}
            className={className}
            style={{ display: "inline-flex" }}
        >
            {text.split("").map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    variants={letterVariants}
                    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

/* ─── 6. BLUR FOCUS IN ──────────────────────────────────── */
export const blurFocusIn = (delay = 0): Variants => ({
    hidden: { opacity: 0, filter: "blur(12px)" },
    show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, delay, ease: EASE },
    },
});

/* ─── 7. BLUR WORD REVEAL (Staggered Blur + Slide) ──────── */
export const blurWordContainerVariants = createStaggerContainer(0.06);

export const blurWordVariants: Variants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    show: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: EASE },
    },
};

export function BlurWordReveal({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    const words = text.split(" ");
    return (
        <motion.div
            variants={blurWordContainerVariants}
            className={className}
            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    variants={blurWordVariants}
                    style={{ display: "inline-block" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

export function splitWords(text: string) {
    return text.split(" ");
}

export function splitCharacters(text: string) {
    return text.split("");
}
