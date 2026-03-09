"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useTransform, animate, useInView } from "framer-motion";

/* ─── Reusable CountUp Component ─────────────────────────── */
interface CountUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    from?: number;
    duration?: number;
    className?: string;
}

export function CountUp({
    value,
    suffix = "",
    prefix = "",
    from = 0,
    duration = 1.5,
    className,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const motionVal = useMotionValue(from);
    const rounded = useTransform(motionVal, (v) => Math.round(v));
    const [display, setDisplay] = useState(String(from));

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(motionVal, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
        });
        return () => controls.stop();
    }, [isInView, motionVal, value, duration]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => setDisplay(String(v)));
        return () => unsubscribe();
    }, [rounded]);

    return (
        <span ref={ref} className={className}>
            {prefix}{display}{suffix}
        </span>
    );
}
