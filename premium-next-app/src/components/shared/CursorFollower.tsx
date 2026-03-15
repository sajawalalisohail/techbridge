"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─── Spring configs ─────────────────────────────────────── */
const DOT_SPRING = { stiffness: 560, damping: 28, mass: 0.1 };
const RING_SPRING = { stiffness: 220, damping: 18, mass: 0.1 };

/* ─── Main Export ────────────────────────────────────────── */
export default function CursorFollower() {
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [enabled] = useState(() => {
        if (typeof window === "undefined") return false;

        const isTouch =
            window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        return !isTouch && !prefersReduced;
    });

    /* Raw mouse position */
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    /* Dot follows tightly */
    const dotX = useSpring(mouseX, DOT_SPRING);
    const dotY = useSpring(mouseY, DOT_SPRING);

    /* Ring follows with lag */
    const ringX = useSpring(mouseX, RING_SPRING);
    const ringY = useSpring(mouseY, RING_SPRING);

    useEffect(() => {
        /* Touch device or reduced motion → bail */
        const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || prefersReduced) return;

        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const onEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], .cursor-hover, input, textarea, select")) {
                setIsHovering(true);
            }
        };

        const onLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], .cursor-hover, input, textarea, select")) {
                setIsHovering(false);
            }
        };

        const onOut = () => {
            setVisible(false);
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onEnter);
        document.addEventListener("mouseout", onLeave);
        document.addEventListener("mouseleave", onOut);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onEnter);
            document.removeEventListener("mouseout", onLeave);
            document.removeEventListener("mouseleave", onOut);
        };
    }, [mouseX, mouseY, visible]);

    if (!enabled) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    opacity: visible ? (isHovering ? 0.5 : 0.3) : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div className="h-full w-full rounded-full border border-lime-400/40" />
            </motion.div>

            {/* Inner dot */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 8 : 6,
                    height: isHovering ? 8 : 6,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            >
                <div className="h-full w-full rounded-full bg-lime-400" />
            </motion.div>
        </>
    );
}
