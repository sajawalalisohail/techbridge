"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    FOOTER_COLUMNS,
    FOOTER_EMAIL,
    FOOTER_SOCIAL_LINKS,
} from "@/data/site-navigation";

function HeroClock({ tz }: { tz: string }) {
    const [timeValue, setTimeValue] = useState("--:--:--");
    const [dayPeriod, setDayPeriod] = useState("ET");

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: tz,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        const tick = () => {
            const parts = formatter.formatToParts(new Date());
            const main = parts
                .filter(
                    (part) =>
                        part.type === "hour" ||
                        part.type === "minute" ||
                        part.type === "second" ||
                        part.type === "literal",
                )
                .map((part) => part.value)
                .join("")
                .replace(/\s/g, "");

            const period = parts.find((part) => part.type === "dayPeriod")?.value ?? "ET";
            setTimeValue(main);
            setDayPeriod(period.toUpperCase());
        };

        tick();
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [tz]);

    return (
        <div className="mt-10">
            <div className="flex items-end gap-3">
                <p
                    className="font-mono text-[clamp(4rem,11vw,8rem)] font-thin leading-none tracking-[-0.08em] text-white"
                    suppressHydrationWarning
                >
                    {timeValue}
                </p>
                <span
                    className="pb-3 font-mono text-xl font-semibold uppercase tracking-[0.18em] text-white/90"
                    suppressHydrationWarning
                >
                    {dayPeriod}
                </span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
                Eastern Time for architecture, strategy, and first response.
            </p>
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (footerRef.current) {
                document.documentElement.style.setProperty(
                    "--footer-height",
                    `${footerRef.current.offsetHeight}px`,
                );
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <>
            <div
                style={{ height: "var(--footer-height, 640px)" }}
                className="pointer-events-none w-full"
            />

            <footer
                ref={footerRef}
                className="fixed bottom-0 left-0 z-[0] w-full overflow-hidden border-t border-white/[0.04] bg-[#020203] pt-14 pb-8 shadow-[0_-14px_50px_rgba(0,0,0,0.55)]"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at 8% 100%, rgba(var(--brand-accent-rgb), 0.09) 0%, rgba(var(--brand-accent-rgb), 0) 28%),
                            radial-gradient(circle at 68% 100%, rgba(var(--brand-accent-dark-rgb), 0.08) 0%, rgba(var(--brand-accent-dark-rgb), 0) 32%)
                        `,
                    }}
                />

                <div className="relative z-10 mx-auto max-w-[100rem] px-6 lg:px-12">
                    <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                    <div className="grid gap-14 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] xl:gap-16">
                        <div className="flex flex-col justify-between">
                            <div>
                                <a
                                    href={`mailto:${FOOTER_EMAIL}`}
                                    className="inline-flex items-center text-[clamp(1.1rem,1.8vw,1.9rem)] font-medium tracking-tight text-white transition-colors duration-300 hover:text-brand-accent-light"
                                >
                                    {FOOTER_EMAIL}
                                </a>

                                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                                    {FOOTER_SOCIAL_LINKS.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            className="text-base text-zinc-400 transition-colors duration-300 hover:text-white"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-lg">
                                    <span className="text-white">Based in Morgantown, WV</span>
                                    <span className="text-zinc-500">Serving clients globally</span>
                                </div>

                                <HeroClock tz="America/New_York" />
                            </div>

                            <p className="mt-12 text-sm text-zinc-600">
                                TechBridge, <span className="font-mono">&copy; {year}</span>. All rights reserved.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {FOOTER_COLUMNS.map((column) => (
                                <div key={column.title}>
                                    <p className="mb-3 text-sm font-medium tracking-tight text-zinc-500">
                                        {column.title}
                                    </p>
                                    <ul className="space-y-2">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm leading-snug text-white/88 transition-colors duration-300 hover:text-brand-accent-light"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
