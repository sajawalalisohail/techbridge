"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-50"
        >
            {/* Glass bar */}
            <div
                className={`mx-auto transition-all duration-500 ${scrolled
                        ? "mt-3 max-w-5xl rounded-2xl border border-white/10 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                        : "max-w-full rounded-none border-b border-white/5 bg-black/20 backdrop-blur-sm"
                    }`}
            >
                <nav className="flex items-center justify-between px-6 py-4 lg:px-10">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2.5">
                        <span className="relative flex h-6 w-6 items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-80 blur-sm group-hover:blur group-hover:opacity-100 transition-all duration-300" />
                            <span className="relative h-3 w-3 rounded-full bg-white" />
                        </span>
                        <span className="text-sm font-semibold tracking-widest text-white uppercase">
                            TechBridge
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="relative text-sm text-zinc-400 transition-colors duration-200 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                        >
                            <span className="relative z-10">Start a Project</span>
                            <svg
                                className="relative z-10 h-3.5 w-3.5 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            {/* Glow on hover */}
                            <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "translate-y-2.5 rotate-45" : ""}`}
                        />
                        <span
                            className={`block h-px w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
                        />
                    </button>
                </nav>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden mx-3 mt-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6"
                    >
                        <ul className="flex flex-col gap-5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-base text-zinc-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white"
                                >
                                    Start a Project →
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
