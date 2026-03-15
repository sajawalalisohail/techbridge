"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface GlowButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md";
}

export default function GlowButton({
    href,
    children,
    className = "",
    size = "md",
}: GlowButtonProps) {
    const glowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        // Respect reduced motion
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) return;

        const tween = gsap.to(glow, {
            "--glow-angle": "360deg",
            duration: 3,
            repeat: -1,
            ease: "none",
            modifiers: {
                "--glow-angle": (value: string) => value,
            },
        });

        return () => {
            tween.kill();
        };
    }, []);

    const sizeClasses =
        size === "sm"
            ? "px-4 py-1.5 text-xs"
            : "px-5 py-2";

    return (
        <Link
            href={href}
            className={`glow-button group relative inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-300 ${sizeClasses} ${className}`}
        >
            {/* Rotating conic gradient border */}
            <span
                ref={glowRef}
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-80 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                style={
                    {
                        "--glow-angle": "0deg",
                        background: `conic-gradient(from var(--glow-angle), transparent 0deg, transparent 80deg, #84cc16 120deg, #a3e635 180deg, #84cc16 240deg, transparent 280deg, transparent 360deg)`,
                    } as React.CSSProperties
                }
            />

            {/* Outer glow blur layer */}
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-40 blur-md"
                style={{
                    background:
                        "radial-gradient(circle, rgba(132,204,22,0.3) 0%, transparent 70%)",
                }}
            />

            {/* Inner background (covers the gradient border) */}
            <span className="absolute inset-[1.5px] rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </Link>
    );
}
