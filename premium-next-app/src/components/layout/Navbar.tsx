"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink, X } from "lucide-react";
import GlowButton from "@/components/shared/GlowButton";
import { getCaseStudy } from "@/data/case-studies";
import { SERVICE_NAV_GROUPS } from "@/data/site-navigation";

const NAV_LINKS = [
    { label: "24-Hr Websites", href: "/websites" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const HOVER_OPEN_DELAY_MS = 90;
const HOVER_CLOSE_DELAY_MS = 140;

type NavState = "top" | "hidden" | "pill";
type ServicesMenuTrigger = "hover" | "click" | null;

const FEATURED_STUDY = getCaseStudy("ali-wali");

function getNavState(scrollY: number): NavState {
    if (scrollY < 50) return "top";
    if (scrollY < 600) return "hidden";
    return "pill";
}

function ServicesMegaPanel({
    closeMenu,
}: {
    closeMenu: () => void;
}) {
    return (
        <div
            id="services-mega-menu"
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050508]/92 shadow-[0_24px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 0% 0%, rgba(var(--brand-accent-rgb), 0.08) 0%, rgba(var(--brand-accent-rgb), 0) 36%),
                        radial-gradient(circle at 100% 100%, rgba(var(--brand-accent-dark-rgb), 0.07) 0%, rgba(var(--brand-accent-dark-rgb), 0) 40%)
                    `,
                }}
            />

            <div className="relative z-10 grid gap-3 p-3 lg:grid-cols-[0.82fr_1.18fr]">
                <Link
                    href={FEATURED_STUDY ? `/work/${FEATURED_STUDY.slug}` : "/work"}
                    onClick={closeMenu}
                    className="group relative self-start overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-brand-accent/30 hover:bg-white/[0.04]"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at 100% 0%, rgba(var(--brand-accent-rgb), 0.12) 0%, rgba(var(--brand-accent-rgb), 0) 46%)",
                        }}
                    />

                    <div className="relative h-24 overflow-hidden border-b border-white/8 bg-neutral-950">
                        {FEATURED_STUDY?.assets[0] ? (
                            <Image
                                src={FEATURED_STUDY.assets[0]}
                                alt={FEATURED_STUDY.client}
                                fill
                                sizes="(min-width: 1024px) 32rem, 100vw"
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--brand-accent-rgb),0.18),transparent_55%)]" />
                        )}
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-3 p-3">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                                latest work
                            </p>
                            <h3 className="mt-1 text-sm font-semibold tracking-tight text-white">
                                {FEATURED_STUDY?.client ?? "Selected Work"}
                            </h3>
                            <p className="font-mono text-lg font-extrabold tracking-tight text-white">
                                {FEATURED_STUDY?.metric ?? "Fast"}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                {FEATURED_STUDY?.metricLabel ?? "delivery"}
                            </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-brand-accent-light">
                            View
                            <ArrowRight
                                size={12}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </span>
                    </div>
                </Link>

                <div className="rounded-[1.5rem] border border-white/8 bg-black/30 p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-2">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                                services
                            </p>
                        </div>
                        <Link
                            href="/services"
                            onClick={closeMenu}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-accent/5 hover:text-brand-accent-light"
                        >
                            All Services
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {SERVICE_NAV_GROUPS.map((group) => {
                            const Icon = group.icon;

                            return (
                                <Link
                                    key={group.id}
                                    href={group.href}
                                    onClick={closeMenu}
                                    className="group rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-3 transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-accent/5"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-accent-light transition-all duration-300 group-hover:border-brand-accent/30 group-hover:bg-brand-accent/10">
                                            <Icon size={18} strokeWidth={1.8} />
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                                                {group.number}
                                            </p>
                                            <h4 className="mt-0.5 text-sm font-semibold leading-tight text-white">
                                                {group.label}
                                            </h4>
                                        </div>
                                    </div>

                                    <ul className="mt-2 space-y-1">
                                        {group.capabilities.map((capability) => (
                                            <li
                                                key={capability}
                                                className="text-xs leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300"
                                            >
                                                {capability}
                                            </li>
                                        ))}
                                    </ul>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 border-t border-white/8 px-5 py-2.5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-zinc-500">
                    Delivery designed to move faster than a traditional agency process.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/work"
                        onClick={closeMenu}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-brand-accent-light"
                    >
                        Explore Work
                        <ArrowRight size={14} />
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-brand-accent-light"
                    >
                        Talk to Us
                        <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const [navState, setNavState] = useState<NavState>(() =>
        typeof window === "undefined" ? "top" : getNavState(window.scrollY),
    );
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [forceHide, setForceHide] = useState(false);
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
    const [servicesMenuTrigger, setServicesMenuTrigger] =
        useState<ServicesMenuTrigger>(null);
    const pathname = usePathname();
    const menuShellRef = useRef<HTMLDivElement>(null);
    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearMenuTimers = useCallback(() => {
        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
            openTimerRef.current = null;
        }

        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, []);

    const closeServicesMenu = useCallback(() => {
        clearMenuTimers();
        setServicesMenuOpen(false);
        setServicesMenuTrigger(null);
    }, [clearMenuTimers]);

    const openServicesMenu = useCallback(
        (trigger: Exclude<ServicesMenuTrigger, null>) => {
            clearMenuTimers();
            setServicesMenuOpen(true);
            setServicesMenuTrigger(trigger);
        },
        [clearMenuTimers],
    );

    const scheduleHoverOpen = useCallback(() => {
        if (window.innerWidth < 768) return;
        clearMenuTimers();
        openTimerRef.current = setTimeout(() => {
            openServicesMenu("hover");
        }, HOVER_OPEN_DELAY_MS);
    }, [clearMenuTimers, openServicesMenu]);

    const scheduleHoverClose = useCallback(() => {
        clearMenuTimers();
        closeTimerRef.current = setTimeout(() => {
            closeServicesMenu();
        }, HOVER_CLOSE_DELAY_MS);
    }, [clearMenuTimers, closeServicesMenu]);

    const updateNavState = useCallback(() => {
        const state = getNavState(window.scrollY);
        setNavState(pathname === "/work" && state === "pill" ? "hidden" : state);
    }, [pathname]);

    useEffect(() => {
        window.addEventListener("scroll", updateNavState, { passive: true });
        return () => window.removeEventListener("scroll", updateNavState);
    }, [updateNavState]);

    useEffect(() => {
        const handleForceHide = (e: CustomEvent<{ hide: boolean }>) => {
            setForceHide(e.detail.hide);
        };
        window.addEventListener(
            "force-hide-navbar",
            handleForceHide as EventListener,
        );
        return () =>
            window.removeEventListener(
                "force-hide-navbar",
                handleForceHide as EventListener,
            );
    }, []);

    useEffect(() => {
        if (!bannerVisible || pathname === "/websites") return;
        const timer = setTimeout(() => setBannerVisible(false), 8000);
        return () => clearTimeout(timer);
    }, [bannerVisible, pathname]);

    useEffect(() => {
        if (navState === "hidden" || mobileOpen || forceHide) {
            const timer = window.setTimeout(() => {
                closeServicesMenu();
            }, 0);
            return () => window.clearTimeout(timer);
        }
    }, [closeServicesMenu, forceHide, mobileOpen, navState]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            closeServicesMenu();
            setMobileOpen(false);
            setMobileServicesOpen(false);
            updateNavState();
        }, 0);

        return () => window.clearTimeout(timer);
    }, [closeServicesMenu, pathname, updateNavState]);

    useEffect(() => {
        if (!servicesMenuOpen) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (
                menuShellRef.current &&
                !menuShellRef.current.contains(event.target as Node)
            ) {
                closeServicesMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeServicesMenu();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeServicesMenu, servicesMenuOpen]);

    useEffect(() => {
        return () => clearMenuTimers();
    }, [clearMenuTimers]);

    const isActive = (href: string) => pathname === href;
    const isServicesActive = pathname === "/services";

    const headerVariants = {
        top: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
        pill: { y: 0, opacity: 1 },
    };

    return (
        <>
            <div className="relative z-50">
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
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage:
                                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                                    backgroundRepeat: "repeat",
                                    backgroundSize: "128px 128px",
                                }}
                            />

                            <div className="relative z-10 mx-auto flex w-full items-center justify-center px-6 py-2.5 sm:px-12">
                                <p className="text-center text-sm font-medium text-zinc-300">
                                    Need a website fast? Custom-coded and live in 24 hours.{" "}
                                    <Link
                                        href="/websites"
                                        className="text-white underline underline-offset-4 transition-colors hover:text-brand-accent-light"
                                    >
                                        See how &rarr;
                                    </Link>
                                </p>
                            </div>

                            <button
                                onClick={() => setBannerVisible(false)}
                                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:bg-brand-accent/5 hover:text-brand-accent-light sm:right-5"
                                aria-label="Dismiss banner"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.header
                    initial={{ opacity: 0, y: -24 }}
                    animate={
                        forceHide
                            ? { opacity: 0, y: -24 }
                            : headerVariants[navState]
                    }
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`fixed top-0 left-0 right-0 z-50 ${forceHide ? "pointer-events-none" : ""}`}
                >
                    <div ref={menuShellRef} className="px-3 md:px-4">
                        <div
                            className="mx-auto mt-4 max-w-5xl rounded-full border border-brand-accent/20 bg-[#06060c]/60 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(var(--brand-accent-rgb),0.15)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        >
                            <nav
                                className="flex items-center justify-between px-5 py-2.5"
                            >
                                <Link href="/" className="group flex items-center gap-2.5">
                                    <span className="relative flex h-6 w-6 items-center justify-center">
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark opacity-80 blur-sm transition-all duration-300 group-hover:blur group-hover:opacity-100" />
                                        <span className="relative h-3 w-3 rounded-full bg-white" />
                                    </span>
                                    <span className="text-sm font-semibold uppercase tracking-widest text-white">
                                        TechBridge
                                    </span>
                                </Link>
                                <ul
                                    className="hidden items-center md:flex gap-6 lg:gap-9"
                                >
                                    <li
                                        onMouseEnter={scheduleHoverOpen}
                                        onMouseLeave={
                                            servicesMenuTrigger === "hover"
                                                ? scheduleHoverClose
                                                : undefined
                                        }
                                    >
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-all duration-300 ${servicesMenuOpen || isServicesActive
                                                    ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                                                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-brand-accent-light"
                                                }`}
                                        >
                                            <Link
                                                href="/services"
                                                onClick={closeServicesMenu}
                                                className="transition-colors duration-200"
                                            >
                                                Services
                                            </Link>
                                            <button
                                                type="button"
                                                aria-expanded={servicesMenuOpen}
                                                aria-controls="services-mega-menu"
                                                onFocus={() => openServicesMenu("click")}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (servicesMenuOpen) closeServicesMenu();
                                                    else openServicesMenu("click");
                                                }}
                                                className="rounded-sm p-0.5 transition-colors duration-200 hover:text-brand-accent-light"
                                                aria-label="Toggle services menu"
                                            >
                                                <ChevronDown
                                                    size={14}
                                                    className={`transition-transform duration-300 ${servicesMenuOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                        </span>
                                    </li>

                                    {NAV_LINKS.map((link) => {
                                        const active = isActive(link.href);

                                        return (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    onClick={closeServicesMenu}
                                                    className={`relative whitespace-nowrap text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:transition-all after:duration-300 ${active
                                                            ? "text-white after:w-full after:bg-brand-accent-light drop-shadow-[0_0_8px_rgba(var(--brand-accent-light-rgb),0.6)]"
                                                            : "text-zinc-400 after:w-0 after:bg-white hover:text-brand-accent-light hover:after:w-full"
                                                        }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="hidden items-center gap-4 md:flex">
                                    <GlowButton
                                        href="/contact"
                                        size={navState === "pill" ? "sm" : "md"}
                                    >
                                        Talk to Us
                                        <svg
                                            className="h-3.5 w-3.5 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </GlowButton>
                                </div>

                                <button
                                    className="flex flex-col gap-1.5 p-3 md:hidden"
                                    onClick={() => {
                                        setMobileOpen((value) => !value);
                                        setMobileServicesOpen(false);
                                    }}
                                    aria-label="Toggle menu"
                                    aria-expanded={mobileOpen}
                                >
                                    <span
                                        className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "translate-y-2.5 rotate-45" : ""
                                            }`}
                                    />
                                    <span
                                        className={`block h-px w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""
                                            }`}
                                    />
                                    <span
                                        className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-translate-y-2.5 -rotate-45" : ""
                                            }`}
                                    />
                                </button>
                            </nav>
                        </div>

                        <AnimatePresence>
                            {servicesMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative z-40 hidden pt-3 md:block"
                                    onMouseEnter={clearMenuTimers}
                                    onMouseLeave={scheduleHoverClose}
                                >
                                    <div className="mx-auto max-w-[68rem]">
                                        <ServicesMegaPanel closeMenu={closeServicesMenu} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                            {mobileOpen && (
                                <motion.div
                                    key="mobile-drawer"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    className="mx-1 mt-2 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl md:hidden"
                                >
                                    <ul className="flex flex-col gap-4">
                                        <li className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMobileServicesOpen((value) => !value)
                                                }
                                                aria-expanded={mobileServicesOpen}
                                                className="flex w-full items-center justify-between gap-3 text-left"
                                            >
                                                <span className="text-base font-medium text-white">
                                                    Services
                                                </span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-zinc-400 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.24 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 border-t border-white/8 pt-4">
                                                            <Link
                                                                href="/services"
                                                                onClick={() => setMobileOpen(false)}
                                                                className="mb-3 block text-sm font-medium text-zinc-300 transition-colors hover:text-brand-accent-light"
                                                            >
                                                                All Services
                                                            </Link>
                                                            <div className="space-y-3">
                                                                {SERVICE_NAV_GROUPS.map((group) => (
                                                                    <Link
                                                                        key={group.id}
                                                                        href={group.href}
                                                                        onClick={() =>
                                                                            setMobileOpen(false)
                                                                        }
                                                                        className="block text-sm text-zinc-400 transition-colors hover:text-brand-accent-light"
                                                                    >
                                                                        {group.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </li>

                                        {NAV_LINKS.map((link) => {
                                            const active = isActive(link.href);

                                            return (
                                                <li key={link.href}>
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`block rounded-xl px-2 py-1 text-base transition-colors ${active
                                                                ? "font-medium text-brand-accent-light"
                                                                : "text-zinc-300 hover:text-brand-accent-light"
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}

                                        <li className="pt-2">
                                            <Link
                                                href="/contact"
                                                onClick={() => setMobileOpen(false)}
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white"
                                            >
                                                Talk to Us
                                                <ArrowRight size={14} />
                                            </Link>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.header>
            </div>
        </>
    );
}
