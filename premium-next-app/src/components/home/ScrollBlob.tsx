"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroBlobBackground from "./HeroBlobBackground";

/* ─── Scroll-linked blob that travels through the homepage ── */
export default function ScrollBlob() {
    const [isMobile, setIsMobile] = useState(false);

    /* Detect mobile for conditional behavior */
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    /* Full-page scroll progress (0 → 1) */
    const { scrollYProgress } = useScroll();

    /* ── Keyframe arrays ─────────────────────────────────────
     *  Each array maps scroll progress → a blob property.
     *
     *  Sections (rough scroll %):
     *  0.00  Hero (center)
     *  0.08  TrustedBy (center)
     *  0.16  Services / Our Capabilities heading (center)
     *  0.24  Services cards (center)
     *  0.30  HowItWorks / Our Process heading (left)
     *  0.38  HowItWorks timeline mid-scroll (center)
     *  0.44  WhyChooseUs / TechBridge Advantage heading (right)
     *  0.52  WhyChooseUs body / TechStackMarquee (center)
     *  0.58  CaseStudies / Proven Impact enter (center)
     *  0.65  Proven Impact peak (right, bright glow)
     *  0.75  Testimonials — transitioning back (center)
     *  0.88  CTA (center, light)
     *  0.95  Pre-footer fade (invisible)
     *  1.00  Footer (invisible)
     * ──────────────────────────────────────────────────────── */

    const progress = [0, 0.08, 0.16, 0.24, 0.30, 0.38, 0.44, 0.52, 0.58, 0.65, 0.75, 0.88, 0.95, 1.0];

    /* X position as % from left (50 = center) */
    const rawX = useTransform(
        scrollYProgress,
        progress,
        [50, 50, 50, 50, 20, 50, 75, 50, 50, 72, 50, 50, 50, 50]
    );

    /* Y position — fixed at viewport center, no vertical drift */
    const rawY = useTransform(
        scrollYProgress,
        progress,
        [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    );

    /* Scale (1.0 = base size) */
    const rawScale = useTransform(
        scrollYProgress,
        progress,
        [1.0, 0.9, 1.0, 0.9, 1.1, 0.85, 1.0, 0.85, 0.9, 1.15, 1.0, 1.0, 0.9, 0.8]
    );

    /* Opacity */
    const rawOpacity = useTransform(
        scrollYProgress,
        progress,
        [1.0, 0.85, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.65, 0.5, 0.5, 0.0, 0.0]
    );

    /* Brightness — glows at Proven Impact */
    const rawBrightness = useTransform(
        scrollYProgress,
        progress,
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.45, 1.0, 1.0, 1.0, 1.0]
    );

    /* Mobile: gentler opacity curve (≈70 % of desktop values) */
    const rawMobileOpacity = useTransform(
        scrollYProgress,
        progress,
        [0.8, 0.6, 0.5, 0.4, 0.4, 0.35, 0.35, 0.3, 0.3, 0.5, 0.35, 0.35, 0.0, 0.0]
    );

    /* Spring smoothing for buttery motion */
    const springConfig = { damping: 40, stiffness: 60, mass: 1.5 };

    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);
    const scale = useSpring(rawScale, springConfig);
    const opacity = useSpring(
        isMobile ? rawMobileOpacity : rawOpacity,
        { damping: 50, stiffness: 80 }
    );
    const brightness = useSpring(rawBrightness, springConfig);

    /* Convert x/y percentages to CSS transforms */
    const translateX = useTransform(x, (v) => `${v - 50}vw`);
    const translateY = useTransform(y, (v) => `${v - 50}vh`);
    const brightnessFilter = useTransform(brightness, (v) => `brightness(${v})`);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[1]"
            style={{ opacity, filter: brightnessFilter }}
        >
            <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                    x: translateX,
                    y: translateY,
                    scale,
                    willChange: "transform, opacity",
                }}
            >
                <HeroBlobBackground />
            </motion.div>
        </motion.div>
    );
}
