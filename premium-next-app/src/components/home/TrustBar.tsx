"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock3, ShieldCheck, Workflow } from "lucide-react";
import { getHomepageCaseStudies } from "@/data/case-studies";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

const CREDENTIALS = [
  {
    icon: Workflow,
    value: "50+",
    label: "systems in production",
    detail: "Across SaaS, internal tooling, mobile, and premium web delivery.",
  },
  {
    icon: Clock3,
    value: "48 hrs",
    label: "senior placement window",
    detail: "Candidates land ready for Slack, standups, repos, and ownership.",
  },
  {
    icon: ShieldCheck,
    value: "US-led",
    label: "delivery accountability",
    detail: "Architecture oversight stays anchored while execution moves fast.",
  },
] as const;

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const plaques = useMemo(() => getHomepageCaseStudies().slice(0, 6), []);

  return (
    <section
      ref={sectionRef}
      aria-label="Proof and credibility"
      className="relative overflow-hidden border-y border-white/6 py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 24%), radial-gradient(circle at 10% 15%, rgba(var(--brand-accent-rgb), 0.08), transparent 28%), radial-gradient(circle at 85% 85%, rgba(var(--brand-accent-light-rgb), 0.07), transparent 24%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        initial={{ x: "-120%", opacity: 0 }}
        animate={isInView ? { x: "125%", opacity: [0, 0.55, 0] } : {}}
        transition={{ duration: 1.35, delay: 0.3, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] blur-xl"
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={MOTION_TRANSITIONS.reveal}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
            Operating credibility
          </p>
          <h2 className="mt-4 text-2xl font-light tracking-[-0.04em] text-white sm:text-3xl lg:text-[2.6rem]">
            Proof presented like an operating ledger, not a startup ticker.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            The homepage now states the delivery reality plainly: systems already live, senior
            talent deployable quickly, and architecture accountability that does not disappear once
            the contract is signed.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {CREDENTIALS.map((credential, index) => {
            const Icon = credential.icon;

            return (
              <motion.div
                key={credential.label}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  ...MOTION_TRANSITIONS.reveal,
                  delay: index * MOTION_STAGGER.medium,
                }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-brand-accent-light">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {credential.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                      {credential.label}
                    </p>
                  </div>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
                  {credential.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.22 }}
          className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
              Active sectors / selected clients
            </p>
            <p className="text-xs text-zinc-500">Static plaques. No marquee.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {plaques.map((study) => (
              <div
                key={study.slug}
                className="rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-4"
              >
                <p className="text-sm font-semibold text-white">{study.client}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  {study.sector}
                </p>
                <div className="mt-4 border-t border-white/8 pt-3">
                  <p className="text-lg font-semibold tracking-[-0.04em] text-brand-accent-light">
                    {study.metric}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{study.metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
