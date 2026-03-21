"use client";

import { ENGINEERING_SPEC_SHEET } from "@/data/spec-sheet";

interface SpecSheetSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function SpecSheetSection({
  eyebrow = "Spec sheet",
  title = "The technical baseline behind every serious TechBridge delivery.",
  description = "A compact readout of the runtime, interaction stack, tactile layer, and deployment posture behind the current product surface.",
  className = "",
}: SpecSheetSectionProps) {
  return (
    <section
      aria-label="Engineering spec sheet"
      className={`relative overflow-hidden py-24 lg:py-28 ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(var(--brand-accent-rgb), 0.08), transparent 28%), radial-gradient(circle at 82% 72%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 26%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
              {eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              {description}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 lg:max-w-[19rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Why it matters
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              The stack is presented like an engineering readout, not a logo wall, so the signal is
              capability and delivery discipline instead of tool-name theater.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {ENGINEERING_SPEC_SHEET.map((item) => (
            <article
              key={item.label}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.12), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 30%)",
                }}
              />

              <div className="relative rounded-[1.45rem] border border-white/8 bg-[#04070d]/88 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {item.label}
                </p>
                <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
