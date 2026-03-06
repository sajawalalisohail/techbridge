"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Live Clock ─────────────────────────────────────────── */
function LiveClock({ tz, label }: { tz: string; label: string }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () =>
            setTime(
                new Intl.DateTimeFormat("en-US", {
                    timeZone: tz,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).format(new Date())
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [tz]);

    return (
        <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-1.5">
                {label}
            </p>
            <p className="font-mono text-sm tabular-nums text-zinc-400">
                {time || "--:--:--"}
            </p>
        </div>
    );
}

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES_LINKS = [
    { label: "Custom Software", href: "/services#custom-software" },
    { label: "AI Automation", href: "/services#ai-automation" },
    { label: "Internal Tools", href: "/services#ai-automation" },
    { label: "SaaS Platforms", href: "/services#custom-software" },
    { label: "24-Hour Websites", href: "/services#rapid-deploy" },
];

const COMPANY_LINKS = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "X / Twitter",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
];

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
    const year = new Date().getFullYear();
    const footerRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const updateHeight = () => {
            if (footerRef.current) {
                document.documentElement.style.setProperty('--footer-height', `${footerRef.current.offsetHeight}px`);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <>
            {/* Spacer that pushes normal document flow to allow scrolling past the fixed footer */}
            <div style={{ height: "var(--footer-height, 400px)" }} className="w-full pointer-events-none" />

            {/* The actual footer sits fixed at the bottom behind the page content */}
            <footer ref={footerRef} className="fixed bottom-0 left-0 z-[0] w-full bg-[#030303] pt-20 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {/* Top hairline */}
                    <div className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                    {/* 4-column distributed layout */}
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        {/* Col 1 - Brand */}
                        <div className="max-w-xs">
                            <Link href="/" className="group mb-5 inline-flex items-center gap-2.5">
                                <span className="relative flex h-6 w-6 items-center justify-center">
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur" />
                                    <span className="relative h-3 w-3 rounded-full bg-white" />
                                </span>
                                <span className="text-sm font-semibold tracking-widest text-white uppercase">
                                    TechBridge
                                </span>
                            </Link>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                Engineering the future of business - one system at a time.
                            </p>

                            {/* Social row */}
                            <div className="mt-7 flex items-center gap-3">
                                {SOCIAL_LINKS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-zinc-500 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Col 2 - Services */}
                        <div>
                            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                Services
                            </p>
                            <ul className="flex flex-col gap-3">
                                {SERVICES_LINKS.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 - Company */}
                        <div>
                            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                Company
                            </p>
                            <ul className="flex flex-col gap-3">
                                {COMPANY_LINKS.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4 - Global Presence (Live Clocks) */}
                        <div>
                            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                Global Presence
                            </p>
                            <div className="flex flex-col gap-5">
                                <LiveClock tz="America/New_York" label="HQ - Morgantown, WV" />
                                <LiveClock tz="Asia/Karachi" label="Engineering - Lahore, PK" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
                        <p className="text-xs text-zinc-600">
                            <span className="font-mono tabular-nums">&copy; {year}</span> TechBridge. All rights reserved.
                        </p>
                        <p className="text-xs text-zinc-700">
                            Engineered with precision.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
