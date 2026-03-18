"use client";

import Link from "next/link";

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
    const sizeClasses =
        size === "sm"
            ? "px-4 py-1.5 text-xs"
            : "px-5 py-2";

    return (
        <Link
            href={href}
            className={`glow-button group relative inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-300 ${sizeClasses} ${className}`}
        >
            {/* Rotating conic gradient border — animated via CSS @property in globals.css */}
            <span
                aria-hidden="true"
                className="glow-button-ring absolute inset-0 rounded-full opacity-80 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `conic-gradient(from var(--glow-angle), transparent 0deg, transparent 80deg, var(--brand-accent) 120deg, var(--brand-accent-light) 180deg, var(--brand-accent) 240deg, transparent 280deg, transparent 360deg)`,
                }}
            />

            {/* Outer glow blur layer */}
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-40 blur-md"
                style={{
                    background:
                        "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.3) 0%, transparent 70%)",
                }}
            />

            {/* Inner background (covers the gradient border) */}
            <span className="absolute inset-[1.5px] rounded-full bg-[var(--surface-0)]/90 backdrop-blur-xl" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </Link>
    );
}
