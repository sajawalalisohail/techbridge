"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { animate, cubicBezier, stagger } from "animejs";
import { ArrowRight, Clock3, ShieldCheck, Users2, Workflow } from "lucide-react";
import { MOTION_TRANSITIONS } from "@/lib/motion";

type CommandMode = "build" | "hire";

const COMMAND_MODES = {
  build: {
    tabLabel: "Build a System",
    panelLabel: "Product + engineering strike team",
    title:
      "Ship custom software, AI systems, and premium launch surfaces without stitching together five vendors.",
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
    bestFit:
      "Founders replacing fragmented freelancers, slow agencies, or scattered internal ownership.",
    href: "/contact",
    cta: "Start a Project",
  },
  hire: {
    tabLabel: "Hire Engineers",
    panelLabel: "Embedded senior coverage",
    title:
      "Add vetted senior engineers to your Slack, standups, and repos without the recruiting drag or management vacuum.",
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
    bestFit:
      "CTOs and operators who need senior capacity now without paying US-market hiring overhead.",
    href: "/staff-augmentation",
    cta: "See Talent Model",
  },
} as const;

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

const heroEase = cubicBezier(0.22, 1, 0.36, 1);

export default function CommandSurfaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<CommandMode>("build");
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const activePanel = useMemo(() => COMMAND_MODES[activeMode], [activeMode]);

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
    <section
      ref={sectionRef}
      aria-label="Choose your engagement model"
      className="relative overflow-hidden py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(var(--brand-accent-rgb), 0.08), transparent 26%), radial-gradient(circle at 82% 72%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 24%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={MOTION_TRANSITIONS.reveal}
            className="max-w-3xl"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
              Buying motions
            </p>
            <h2 className="mt-5 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]">
              One premium team, two clear ways to engage.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              The hero no longer needs to carry both stories at once. This section handles the
              decision explicitly so visitors can compare the build lane and the talent lane without
              interrupting the first impression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 lg:max-w-[19rem]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Section logic
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Keep the hero emotional and centered. Handle engagement selection one section lower,
              once trust is already established.
            </p>
          </motion.div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.06 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl"
        >
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
            <div className="mb-6 grid grid-cols-1 gap-2.5 border-b border-white/8 pb-6 sm:grid-cols-2 xl:grid-cols-4">
              {PROOF_CHIPS.map((chip) => {
                const Icon = chip.icon;

                return (
                  <div
                    key={chip.label}
                    className="flex items-center gap-3 rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-sm text-zinc-200 backdrop-blur-sm"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[0.85rem] border border-white/8 bg-black/20 text-brand-accent-light">
                      <Icon size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-semibold leading-none tracking-[-0.03em] text-white">
                        {chip.value}
                      </p>
                      <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        {chip.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
                  Command Surface
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                  Switch between the two buying motions without splitting the story across two
                  separate landing pages.
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Build / Hire
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1">
              {(Object.entries(COMMAND_MODES) as Array<[CommandMode, (typeof COMMAND_MODES)[CommandMode]]>).map(
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
                        layoutId="command-surface-pill"
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
                    <h3
                      data-command-item="true"
                      className="mt-3 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.8rem]"
                    >
                      {activePanel.title}
                    </h3>
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
        </motion.article>
      </div>
    </section>
  );
}
