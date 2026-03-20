"use client";

import { useRef, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import CodeTypingAnimation from "./why-us/CodeTypingAnimation";
import OrgChartAnimation from "./why-us/OrgChartAnimation";
import TimelineBarsAnimation from "./why-us/TimelineBarsAnimation";
import GuaranteeBadgeAnimation from "./why-us/GuaranteeBadgeAnimation";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

interface Reason {
  tag: string;
  headline: string;
  description: string;
  tagline: string;
  proof: string;
  Animation: ComponentType<{ isInView: boolean }>;
}

const REASONS: Reason[] = [
  {
    tag: "How we build",
    headline: "AI from line one",
    description:
      "We design systems so automation hooks, machine-readable interfaces, and future AI workflows are part of the architecture from the start.",
    tagline: "No retrofit tax later.",
    proof: "Machine-ready APIs and operations hooks built into the first version.",
    Animation: CodeTypingAnimation,
  },
  {
    tag: "Who you work with",
    headline: "Direct access to builders",
    description:
      "Clients talk to the people making the product real. Less translation, fewer layers, and faster decision loops when something changes.",
    tagline: "No middle-management fog.",
    proof: "Slack, repos, standups, and direct conversation with the people shipping.",
    Animation: OrgChartAnimation,
  },
  {
    tag: "Speed with discipline",
    headline: "Fast because the lane is sharp",
    description:
      "Speed comes from operating rhythm and senior judgment, not from skipping structure. The process is tuned so quality and pace reinforce each other.",
    tagline: "Weeks, not quarters.",
    proof: "Tight loops, visible progress, and fewer restart moments mid-project.",
    Animation: TimelineBarsAnimation,
  },
  {
    tag: "Accountability",
    headline: "Replacement risk covered",
    description:
      "When an engineer is not the right fit, the model absorbs that risk instead of pushing it back onto your team or timeline.",
    tagline: "Senior capacity without hiring roulette.",
    proof: "Replacement coverage stays inside the operating model, not outside it.",
    Animation: GuaranteeBadgeAnimation,
  },
];

function ReasonCard({
  reason,
  index,
}: {
  reason: Reason;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const { Animation } = reason;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        ...MOTION_TRANSITIONS.reveal,
        delay: index * MOTION_STAGGER.tight,
      }}
      className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.12), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)",
        }}
      />

      <div className="relative rounded-[1.55rem] border border-white/8 bg-[#04070d]/88 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
              {reason.tag}
            </p>
            <h3 className="mt-4 text-[1.55rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[1.75rem]">
              {reason.headline}
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            0{index + 1}
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">{reason.description}</p>

        <div className="mt-6">
          <Animation isInView={isInView} />
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Why it matters
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{reason.proof}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-accent-light">
            {reason.tagline}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Why choose us"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 24%), radial-gradient(circle at 18% 82%, rgba(var(--brand-accent-rgb), 0.08), transparent 28%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="grid gap-12 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-14">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={MOTION_TRANSITIONS.reveal}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
              Why us, honestly
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
              className="mt-6 text-3xl font-light leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]"
            >
              Four operating advantages that show up in the work, not just the pitch.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.14 }}
              className="mt-5 max-w-md text-sm leading-7 text-zinc-400 sm:text-base"
            >
              The difference is not a vague agency claim. It is how the team is structured, how the
              systems are designed, and how risk is handled when the work gets real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.2 }}
              className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Credibility check
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                The model is built for mixed B2B buyers who want senior execution, clear ownership,
                and less waste between strategy and delivery.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {REASONS.map((reason, index) => (
              <ReasonCard key={reason.headline} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
