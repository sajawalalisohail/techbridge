"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { animate, createTimeline, cubicBezier, stagger } from "animejs";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  ShieldCheck,
  Users2,
  Workflow,
} from "lucide-react";
import { MOTION_TRANSITIONS } from "@/lib/motion";
import type { HeroMode } from "./HeroDepthField";

const HeroDepthField = dynamic(() => import("./HeroDepthField"), { ssr: false });

const HERO_HEADLINE: ReadonlyArray<
  ReadonlyArray<{ text: string; accent?: boolean; muted?: boolean }>
> = [
  [
    { text: "Build", accent: false },
    { text: "operating systems.", accent: true },
  ],
  [
    { text: "Embed", accent: false },
    { text: "senior engineers.", accent: false },
  ],
  [
    { text: "Move like", accent: false },
    { text: "an in-house team.", accent: false, muted: true },
  ],
] as const;

const PROOF_CHIPS = [
  {
    icon: Workflow,
    value: "50+",
    label: "systems in production",
  },
  {
    icon: Clock3,
    value: "48 hrs",
    label: "senior placement window",
  },
  {
    icon: ShieldCheck,
    value: "US-led",
    label: "architecture oversight",
  },
  {
    icon: Users2,
    value: "Direct",
    label: "Slack + repo collaboration",
  },
] as const;

const HERO_MODES = {
  build: {
    tabLabel: "Build a System",
    panelLabel: "Product + engineering strike team",
    title: "Ship custom software, AI systems, and premium launch surfaces without stitching together five vendors.",
    description:
      "We run architecture, product thinking, design, and senior execution as one lane so the build moves like a focused internal team instead of a bloated agency relay.",
    bullets: [
      "Sprint-zero architecture in the first week",
      "Senior ICs writing production code from day one",
      "Milestones, QA, and launch ownership in one delivery rhythm",
    ],
    metrics: [
      { value: "5 days", label: "to architecture and execution map" },
      { value: "1 lane", label: "strategy, design, build, and launch" },
      { value: "Senior", label: "execution from the first commit" },
    ],
    bestFit: "Founders replacing fragmented freelancers, slow agencies, or scattered internal ownership.",
    href: "/contact",
    cta: "Start a Project",
  },
  hire: {
    tabLabel: "Hire Engineers",
    panelLabel: "Embedded senior coverage",
    title: "Add vetted senior engineers to your Slack, standups, and repos without the recruiting drag or management vacuum.",
    description:
      "You keep direct communication and shipping velocity. We handle vetting, management support, and replacement risk behind the scenes so capacity arrives without chaos.",
    bullets: [
      "48-hour shortlist across AI, full-stack, mobile, and QA",
      "Replacement guarantee if the fit is off",
      "US-based architecture oversight when your team needs extra leverage",
    ],
    metrics: [
      { value: "48 hrs", label: "from brief to candidate shortlist" },
      { value: "Full", label: "replacement guarantee coverage" },
      { value: "Direct", label: "team integration, not outsourced distance" },
    ],
    bestFit: "CTOs and operators who need senior capacity now without paying US-market hiring overhead.",
    href: "/staff-augmentation",
    cta: "See Talent Model",
  },
} as const satisfies Record<
  HeroMode,
  {
    tabLabel: string;
    panelLabel: string;
    title: string;
    description: string;
    bullets: string[];
    metrics: { value: string; label: string }[];
    bestFit: string;
    href: string;
    cta: string;
  }
>;

const heroEase = cubicBezier(0.22, 1, 0.36, 1);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<HeroMode>("build");
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const activePanel = useMemo(() => HERO_MODES[activeMode], [activeMode]);

  useEffect(() => {
    if (!isInView || !copyRef.current || prefersReducedMotion) {
      return;
    }

    const root = copyRef.current;
    const headlineWords = Array.from(root.querySelectorAll("[data-hero-word]"));
    const copyBlocks = Array.from(root.querySelectorAll("[data-hero-copy]"));
    const panel = root.querySelector("[data-hero-panel]");
    const timeline = createTimeline({
      defaults: { ease: heroEase },
    });

    timeline
      .add(headlineWords, {
        opacity: [0, 1],
        y: [56, 0],
        duration: 820,
        delay: stagger(85),
      })
      .add(
        copyBlocks,
        {
          opacity: [0, 1],
          y: [26, 0],
          duration: 620,
          delay: stagger(70),
        },
        "-=520"
      );

    if (panel) {
      timeline.add(
        panel,
        {
          opacity: [0, 1],
          y: [42, 0],
          scale: [0.97, 1],
          duration: 760,
        },
        "-=420"
      );
    }

    return () => {
      timeline.revert();
    };
  }, [isInView, prefersReducedMotion]);

  useEffect(() => {
    if (!commandRef.current || prefersReducedMotion) {
      return;
    }

    const items = Array.from(commandRef.current.querySelectorAll("[data-command-item]"));
    if (!items.length) {
      return;
    }

    const animation = animate(items, {
      opacity: [0, 1],
      y: [18, 0],
      duration: 460,
      delay: stagger(55),
      ease: heroEase,
    });

    return () => {
      animation.revert();
    };
  }, [activeMode, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_32%),linear-gradient(180deg,#030406_0%,#05070b_45%,#070b11_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundPosition: "center",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.25) 55%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0">
        <HeroDepthField mode={activeMode} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.45) 28%, rgba(var(--brand-accent-light-rgb), 0.72) 50%, rgba(var(--brand-accent-rgb), 0.45) 72%, rgba(var(--brand-accent-rgb), 0) 100%)",
          boxShadow: "0 0 22px rgba(var(--brand-accent-rgb), 0.2)",
        }}
      />

      <div
        ref={copyRef}
        className="relative z-10 mx-auto max-w-[100rem] px-6 pb-20 pt-28 sm:pt-32 lg:px-10 lg:pb-24"
      >
        <div className="grid min-h-[calc(100vh-7rem)] items-end gap-10 lg:grid-cols-[minmax(0,58%)_minmax(340px,42%)] lg:gap-12">
          <div className="max-w-4xl pb-2 lg:pb-10">
            <div
              data-hero-copy="true"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light shadow-[0_0_12px_rgba(var(--brand-accent-light-rgb),0.7)]" />
              Obsidian Cobalt Delivery Model
            </div>

            <h1 className="mt-7 text-[clamp(2.9rem,7vw,6.5rem)] font-light leading-[0.94] tracking-[-0.045em] text-white">
              {HERO_HEADLINE.map((line, lineIndex) => (
                <span key={`hero-line-${lineIndex}`} className="block overflow-hidden pb-2">
                  {line.map((word) => (
                    <span
                      key={word.text}
                      data-hero-word="true"
                      className={`mr-[0.22em] inline-block ${
                        word.accent
                          ? "bg-gradient-to-r from-white via-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                          : word.muted
                            ? "text-zinc-300"
                            : ""
                      }`}
                    >
                      {word.text}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              data-hero-copy="true"
              className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg"
            >
              TechBridge builds custom software, AI systems, and premium web presences while also
              embedding vetted senior engineers directly into client teams. The result is sharper
              execution, clearer accountability, and less agency drag.
            </p>

            <p
              data-hero-copy="true"
              className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-[15px]"
            >
              West Virginia leadership. Senior execution in Pakistan. Structured like a command
              surface instead of a handoff maze.
            </p>

            <div
              data-hero-copy="true"
              className="mt-8 flex flex-wrap gap-3"
            >
              {PROOF_CHIPS.map((chip) => {
                const Icon = chip.icon;

                return (
                  <div
                    key={chip.label}
                    className="inline-flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-zinc-200 backdrop-blur-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-brand-accent-light">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-semibold leading-none text-white">{chip.value}</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                        {chip.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              data-hero-copy="true"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(var(--brand-accent-rgb),0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-light"
              >
                Start a Project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/staff-augmentation"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/50 hover:bg-brand-accent/[0.12]"
              >
                Hire Engineers
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                See Selected Work
              </Link>
            </div>
          </div>

          <div data-hero-panel="true" className="pb-2 lg:pb-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.18), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008) 18%, transparent 42%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                  maskImage:
                    "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.45) 60%, transparent 100%)",
                }}
              />

              <div className="relative rounded-[1.6rem] border border-white/8 bg-[#04070d]/85 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
                      Command Surface
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                      Switch between the two buying motions without splitting the story across two
                      landing pages.
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                    Build / Hire
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1">
                  {(Object.entries(HERO_MODES) as Array<[HeroMode, (typeof HERO_MODES)[HeroMode]]>).map(
                    ([mode, panel]) => (
                      <motion.button
                        key={mode}
                        type="button"
                        onClick={() => setActiveMode(mode)}
                        whileHover={prefersReducedMotion ? undefined : { y: -1.5 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                        className={`relative min-h-11 rounded-[1rem] px-4 py-3 text-left text-sm font-semibold transition-colors ${
                          activeMode === mode ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                        }`}
                      >
                        {activeMode === mode && (
                          <motion.span
                            layoutId="hero-mode-pill"
                            className="absolute inset-0 rounded-[1rem] border border-brand-accent/30 bg-brand-accent/[0.16] shadow-[0_8px_24px_rgba(var(--brand-accent-rgb),0.18)]"
                            transition={MOTION_TRANSITIONS.emphasis}
                          />
                        )}
                        <span className="relative z-10">{panel.tabLabel}</span>
                      </motion.button>
                    )
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMode}
                    ref={commandRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={MOTION_TRANSITIONS.ui}
                    className="mt-6"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
                      <div>
                        <p
                          data-command-item="true"
                          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500"
                        >
                          {activePanel.panelLabel}
                        </p>
                        <h2
                          data-command-item="true"
                          className="mt-3 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.8rem]"
                        >
                          {activePanel.title}
                        </h2>
                        <p
                          data-command-item="true"
                          className="mt-4 text-sm leading-6 text-zinc-400"
                        >
                          {activePanel.description}
                        </p>

                        <ul className="mt-5 space-y-3">
                          {activePanel.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              data-command-item="true"
                              className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent-light shadow-[0_0_12px_rgba(var(--brand-accent-light-rgb),0.75)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-3">
                        {activePanel.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            data-command-item="true"
                            className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4"
                          >
                            <p className="text-[1.75rem] font-semibold tracking-[-0.04em] text-white">
                              {metric.value}
                            </p>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                      <p
                        data-command-item="true"
                        className="max-w-md text-sm leading-6 text-zinc-400"
                      >
                        <span className="font-semibold text-zinc-200">Best fit:</span>{" "}
                        {activePanel.bestFit}
                      </p>

                      <Link
                        data-command-item="true"
                        href={activePanel.href}
                        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-brand-accent/50 hover:bg-brand-accent/[0.12]"
                      >
                        {activePanel.cta}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
