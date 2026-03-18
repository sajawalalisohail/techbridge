"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/* ─── Premium Staggered Blur Reveal ─────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
        },
    },
};

const wordVariants: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
    },
    show: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: EASE,
        },
    },
};

interface AnimatedHeadingProps {
    /** The heading tag to render (h1-h6). Defaults to h2 */
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /** Text content — will be split by words for staggered reveal */
    children: string;
    /** Optional className to apply to the heading container */
    className?: string;
    /** Optional delay before the animation starts (seconds) */
    delay?: number;
    /** Whether to trigger only once (default: true) */
    once?: boolean;
    /** Optional: If the heading contains a gradient-styled portion, pass it here */
    highlightWords?: string[];
    /** Class applied to highlighted words (e.g. gradient text) */
    highlightClassName?: string;
}

/**
 * AnimatedHeading — Universal heading component with premium
 * staggered blur-reveal animation. Splits text by words and
 * animates each with a cinematic blur + fade + slide effect.
 *
 * Triggered via `whileInView` for scroll-driven reveals.
 */
export default function AnimatedHeading({
    as: Tag = "h2",
    children,
    className = "",
    delay = 0,
    once = true,
    highlightWords = [],
    highlightClassName = "bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent",
}: AnimatedHeadingProps) {
    const MotionTag = motion.create(Tag as ElementType);

    const words = children.split(" ");
    const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

    const staggerContainer: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.06,
                delayChildren: delay,
            },
        },
    };

    return (
        <MotionTag
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once, margin: "-60px" }}
            className={className}
            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
        >
            {words.map((word: string, i: number) => {
                const isHighlighted = highlightSet.has(word.toLowerCase());

                return (
                    <motion.span
                        key={`${word}-${i}`}
                        variants={wordVariants}
                        className={isHighlighted ? highlightClassName : undefined}
                        style={{ display: "inline-block" }}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </MotionTag>
    );
}
