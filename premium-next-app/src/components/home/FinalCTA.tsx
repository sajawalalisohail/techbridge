"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MOTION_TRANSITIONS } from "@/lib/motion";

const CALL_STEPS = [
  "Define the right engagement lane",
  "Pressure-test scope, timing, and risks",
  "Leave with a concrete next move",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Call to action"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(var(--brand-accent-rgb), 0.08), transparent 24%), radial-gradient(circle at 82% 70%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 26%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <motion.article
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={MOTION_TRANSITIONS.reveal}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-5"
        >
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/8 bg-[#04070d]/90 p-7 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 30%)",
              }}
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
                  Closing command panel
                </p>
                <h2 className="mt-5 text-3xl font-light leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]">
                  Stop circling the project. <span className="text-brand-accent-light">Start the operating lane.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  The first conversation is built to clarify the right engagement model, expose the
                  real constraints, and show what execution would actually look like with TechBridge.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(var(--brand-accent-rgb),0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-light"
                  >
                    Start a Project
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/staff-augmentation"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:bg-brand-accent/[0.12]"
                  >
                    Hire Engineers
                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  What happens on the call
                </p>
                <div className="mt-5 space-y-3">
                  {CALL_STEPS.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 rounded-[1rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-accent/25 bg-brand-accent/[0.14] text-sm font-semibold text-white">
                        0{index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-6 text-zinc-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
