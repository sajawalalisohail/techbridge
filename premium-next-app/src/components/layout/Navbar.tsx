"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GlowButton from "@/components/shared/GlowButton";

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "24-Hr Websites", href: "/websites" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];
type NavState = "top" | "hidden" | "pill";

export default function Navbar() {
    const [navState, setNavState] = useState<NavState>("top");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [forceHide, setForceHide] = useState(false);
    const pathname = usePathname();

    const updateNavState = useCallback(() => {
        const y = window.scrollY;
        if (y < 50) setNavState("top");
        else if (y < 600) setNavState("hidden");
        else setNavState("pill");
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", updateNavState, { passive: true });
        // Call it once manually after mount, but outside render
        updateNavState();
        return () => window.removeEventListener("scroll", updateNavState);
    }, [updateNavState]);

    useEffect(() => {
        const handleForceHide = (e: CustomEvent<{ hide: boolean }>) => {
            setForceHide(e.detail.hide);
        };
        window.addEventListener("force-hide-navbar", handleForceHide as EventListener);
        return () => window.removeEventListener("force-hide-navbar", handleForceHide as EventListener);
    }, []);

    // Phase 1: Auto-dismiss banner after 8 seconds
    useEffect(() => {
        if (!bannerVisible || pathname === "/websites") return;
        const timer = setTimeout(() => setBannerVisible(false), 8000);
        return () => clearTimeout(timer);
    }, [bannerVisible, pathname]);

    const isActive = (href: string) => pathname === href;

    /* Motion variants for the header wrapper */
    const headerVariants = {
        top: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
        pill: { y: 0, opacity: 1 },
    };

    return (
        <>
            {/* Banner + Navbar anchor: relative wrapper so navbar can float below banner */}
            <div className="relative z-50">
                {/* Announcement Banner — in normal flow, pushes hero down by its height */}
                <AnimatePresence mode="popLayout">
                    {bannerVisible && pathname !== "/websites" && (
                        <motion.div
                            key="announcement-banner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative overflow-hidden border-b border-white/[0.06] bg-black"
                        >
                            {/* Matching Hero Noise Overlay */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "repeat",
                                    backgroundSize: "128px 128px",
                                }}
                            />

                            <div className="relative z-10 mx-auto flex w-full items-center justify-center py-2.5 px-12 sm:px-16">
                                <p className="text-center text-sm font-medium text-zinc-300">
                                    Need a website fast? Custom-coded and live in 24 hours.{" "}
                                    <Link href="/websites" className="text-white hover:text-lime-300 underline underline-offset-4 transition-colors">
                                        See how &rarr;
                                    </Link>
                                </p>
                            </div>

                            <button
                                onClick={() => setBannerVisible(false)}
                                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-md p-1 text-zinc-400 hover:bg-lime-500/5 hover:text-lime-300 transition-colors sm:right-5"
                                aria-label="Dismiss banner"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navbar — absolute at top so it overlays hero; fixed when pill */}
                <motion.header
                    initial={{ opacity: 0, y: -24 }}
                    animate={forceHide ? { opacity: 0, y: -24 } : headerVariants[navState]}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`left-0 right-0 z-50 ${navState === "top" ? "absolute" : "fixed top-0"} ${forceHide ? "pointer-events-none" : ""}`}
                >
                    <div
                        className={`mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${navState === "pill"
                            ? "mt-4 max-w-5xl rounded-full border border-lime-500/20 bg-[#06060c]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(132,204,22,0.15)] backdrop-blur-xl"
                            : "max-w-full rounded-none border-b border-transparent bg-transparent"
                            }`}
                    >
                        <nav
                            className={`flex items-center justify-between ${navState === "pill"
                                ? "px-5 py-2.5"
                                : "px-6 py-4 xl:px-8"
                                }`}
                        >
                            {/* Logo */}
                            <Link href="/" className="group flex items-center gap-2.5">
                                <span className="relative flex h-6 w-6 items-center justify-center">
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 opacity-80 blur-sm group-hover:blur group-hover:opacity-100 transition-all duration-300" />
                                    <span className="relative h-3 w-3 rounded-full bg-white" />
                                </span>
                                <span className="text-sm font-semibold tracking-widest text-white uppercase">
                                    TechBridge
                                </span>
                            </Link>

                            {/* Desktop links */}
                            <ul className={`hidden md:flex items-center ${navState === "pill" ? "gap-7 lg:gap-10" : "gap-6 lg:gap-8"
                                }`}>
                                {NAV_LINKS.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={`relative whitespace-nowrap text-sm transition-colors duration-200
                                            after:absolute after:-bottom-0.5 after:left-0 after:h-px after:transition-all after:duration-300
                                            ${active
                                                        ? "text-white after:w-full after:bg-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]"
                                                        : "text-zinc-400 hover:text-lime-300 after:w-0 after:bg-white hover:after:w-full"
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* CTA */}
                            <div className="hidden md:flex items-center gap-4">
                                <GlowButton
                                    href="/contact"
                                    size={navState === "pill" ? "sm" : "md"}
                                >
                                    Talk to Us
                                    <svg
                                        className="h-3.5 w-3.5 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </GlowButton>
                            </div>

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden flex flex-col gap-1.5 p-2"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                            >
                                <span className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "translate-y-2.5 rotate-45" : ""}`} />
                                <span className={`block h-px w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                                <span className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
                            </button>
                        </nav>
                    </div>

                    {/* Mobile drawer */}
                    <AnimatePresence mode="popLayout">
                        {mobileOpen && (
                            <motion.div
                                key="mobile-drawer"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="md:hidden mx-3 mt-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6"
                            >
                                <ul className="flex flex-col gap-5">
                                    {NAV_LINKS.map((link) => {
                                        const active = isActive(link.href);
                                        return (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`text-base transition-colors ${active ? "text-lime-400 font-medium" : "text-zinc-300 hover:text-lime-300"}`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                    <li>
                                        <Link
                                            href="/contact"
                                            onClick={() => setMobileOpen(false)}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white"
                                        >
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            </div>
        </>
    );
}
