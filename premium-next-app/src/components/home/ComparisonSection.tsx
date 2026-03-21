"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

interface ComparisonRow {
  feature: string;
  values: [string, string, string];
}

const ROWS: ComparisonRow[] = [
  { feature: "Monthly cost", values: ["$10,000-$15,000", "$4,000-$8,000", "$4,000-$6,000"] },
  { feature: "Vetting", values: ["You handle it", "Platform reviews", "We vet and manage"] },
  { feature: "Accountability", values: ["Direct", "Variable", "Replacement guarantee"] },
  { feature: "Architecture oversight", values: ["Internal only", "Not included", "US-led oversight"] },
  { feature: "Communication", values: ["Direct", "Inconsistent", "Slack, repos, weekly reporting"] },
  { feature: "Ramp-up time", values: ["2-4 weeks", "1-2 weeks", "48 hours"] },
];

const COLUMN_HEADERS = ["US / Europe", "Freelancer", "TechBridge"];

const BULLET_POINTS = [
  "Senior engineers working inside a TechBridge-managed global engineering office.",
  "Replacement coverage if the fit slips, without restarting the whole search.",
  "Direct repo and Slack access so execution stays transparent and fast.",
];

const PROOF_POINTS = [
  { label: "Talent lane", value: "Senior only" },
  { label: "Placement window", value: "48 hrs" },
  { label: "Management model", value: "Global office" },
];

const ENGINEER_COUNTS = [1, 2, 3, 5, 10] as const;
const COST_PER_TB = 5000;
const COST_PER_US = 12500;

function SavingsCalculator() {
  const [count, setCount] = useState<number>(2);
  const tbCost = count * COST_PER_TB;
  const usCost = count * COST_PER_US;
  const savings = usCost - tbCost;

  return (
    <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-black/20 p-5 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Savings model
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Choose the team size and compare equivalent senior coverage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Number of engineers">
          {ENGINEER_COUNTS.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={value === count}
              onClick={() => setCount(value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                value === count
                  ? "border-brand-accent/40 bg-brand-accent/[0.16] text-white"
                  : "border-white/10 bg-white/[0.035] text-zinc-400 hover:border-brand-accent/30 hover:text-zinc-200"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.035] px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            TechBridge
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`tb-${count}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={MOTION_TRANSITIONS.ui}
              className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white"
            >
              ${tbCost.toLocaleString()}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">monthly cost</p>
        </div>

        <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.035] px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            US hiring
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`us-${count}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={MOTION_TRANSITIONS.ui}
              className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white"
            >
              ${usCost.toLocaleString()}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">monthly cost</p>
        </div>

        <div className="rounded-[1.25rem] border border-brand-accent/20 bg-brand-accent/[0.08] px-4 py-4 shadow-[0_16px_36px_rgba(var(--brand-accent-rgb),0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent-light">
            Monthly savings
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`save-${count}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={MOTION_TRANSITIONS.ui}
              className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white"
            >
              ${savings.toLocaleString()}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">same senior lane</p>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Cost comparison"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 16% 18%, rgba(var(--brand-accent-rgb), 0.08), transparent 24%), radial-gradient(circle at 86% 72%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 24%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="grid gap-10 xl:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)] xl:gap-14">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={MOTION_TRANSITIONS.reveal}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
              The real advantage
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
              className="mt-6 text-3xl font-light leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]"
            >
              Same engineers. <span className="text-brand-accent-light">Half the price.</span> Zero
              compromise.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.14 }}
              className="mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base"
            >
              US and European teams often pay top-market rates without getting tighter execution.
              TechBridge pairs a global engineering office with US-led architecture oversight so the
              buying model stays lean without ever feeling like a handoff.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.2 }}
              className="mt-8 space-y-3"
            >
              {BULLET_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <Check size={16} className="mt-1 flex-shrink-0 text-brand-accent-light" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.24 }}
              className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-1"
            >
              {PROOF_POINTS.map((point) => (
                <div
                  key={point.label}
                  className="rounded-[1.3rem] border border-white/10 bg-white/[0.035] px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {point.label}
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">
                    {point.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.28 }}
              className="mt-8"
            >
              <Link
                href="/staff-augmentation"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-brand-accent/40 hover:bg-brand-accent/[0.12]"
              >
                See the talent model
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.12 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_26px_70px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-5"
          >
            <div className="rounded-[1.7rem] border border-white/8 bg-[#05070d]/90 p-5 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
                    Decision board
                  </p>
                  <h3 className="mt-3 text-[1.6rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[1.9rem]">
                    Senior talent economics without the management gap.
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-6 text-zinc-500">
                  Compare the buying models directly, then pressure-test the monthly savings with
                  the same senior-level team size.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto pb-1">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] gap-2">
                    <div className="rounded-[1rem] border border-transparent px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                      Capability
                    </div>
                    {COLUMN_HEADERS.map((header, index) => (
                      <div
                        key={header}
                        className={`rounded-[1rem] border px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] ${
                          index === 2
                            ? "border-brand-accent/25 bg-brand-accent/[0.08] text-brand-accent-light"
                            : "border-white/8 bg-white/[0.03] text-zinc-500"
                        }`}
                      >
                        {header}
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 space-y-2">
                    {ROWS.map((row, index) => (
                      <motion.div
                        key={row.feature}
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          ...MOTION_TRANSITIONS.reveal,
                          delay: 0.12 + index * MOTION_STAGGER.tight,
                        }}
                        className="grid grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] gap-2"
                      >
                        <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-zinc-200">
                          {row.feature}
                        </div>
                        {row.values.map((value, valueIndex) => (
                          <div
                            key={`${row.feature}-${valueIndex}`}
                            className={`flex items-center justify-center rounded-[1rem] border px-4 py-4 text-center text-sm leading-6 ${
                              valueIndex === 2
                                ? "border-brand-accent/20 bg-brand-accent/[0.06] font-medium text-white"
                                : "border-white/8 bg-white/[0.03] text-zinc-400"
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <SavingsCalculator />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
