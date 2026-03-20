"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StepOneProblem from "./process-v2/StepOneProblem";
import StepTwoArchitecture from "./process-v2/StepTwoArchitecture";
import StepThreeShip from "./process-v2/StepThreeShip";
import StepFourLaunch from "./process-v2/StepFourLaunch";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

const PROCESS_STEPS = [
  StepOneProblem,
  StepTwoArchitecture,
  StepThreeShip,
  StepFourLaunch,
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Our delivery process"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 18%, rgba(var(--brand-accent-rgb), 0.07), transparent 24%), radial-gradient(circle at 84% 82%, rgba(var(--brand-accent-light-rgb), 0.07), transparent 22%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={MOTION_TRANSITIONS.reveal}
            className="max-w-3xl"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
              The delivery system
            </p>
            <h2 className="mt-5 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]">
              Four deliberate steps. One operating rhythm from discovery to live support.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              The workflow is designed to feel like a senior product and engineering lane, not a
              parade of disconnected handoffs. Each step has a concrete output, a clear owner, and
              a visible decision point.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 lg:max-w-[20rem]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Delivery rule
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Strategy, architecture, implementation, and launch stay in one lane so progress shows
              up weekly instead of waiting for a giant reveal.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {PROCESS_STEPS.map((StepComponent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  ...MOTION_TRANSITIONS.reveal,
                  delay: index * MOTION_STAGGER.tight,
                }}
                className={index % 2 === 1 ? "lg:translate-y-16" : ""}
              >
                <StepComponent />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
