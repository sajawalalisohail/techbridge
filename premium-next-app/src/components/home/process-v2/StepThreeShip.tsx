"use client";

const SPRINT_RHYTHM = [
  { day: "Mon", label: "Plan", detail: "Scope, priorities, and decisions aligned." },
  { day: "Wed", label: "Build", detail: "Senior execution moving in shared repos." },
  { day: "Fri", label: "Review", detail: "Working software, feedback, and next actions." },
];

export default function StepThreeShip() {
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(var(--brand-accent-rgb), 0.12), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)",
        }}
      />

      <div className="relative rounded-[1.55rem] border border-white/8 bg-[#04070d]/88 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
              03 / Execution
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.035em] text-white">
              Ship in loops
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300">
            Weekly cadence
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          Progress shows up as working software, not status theater. The team plans, builds, and
          reviews in short loops so decisions stay fresh and stakeholders always know what moved.
        </p>

        <div className="mt-7 rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Sprint rhythm
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent-light">
              1 week loops
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {SPRINT_RHYTHM.map((step, index) => (
              <div key={step.day} className="rounded-[1rem] border border-white/8 bg-white/[0.035] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {step.day}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                      {step.label}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-accent-light shadow-[0_0_10px_rgba(var(--brand-accent-light-rgb),0.7)]" />
                    {index < SPRINT_RHYTHM.length - 1 ? (
                      <span className="h-px w-10 bg-white/10" />
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Outcome
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Weekly proof of progress in the product itself, not just on a slide deck.
          </p>
        </div>
      </div>
    </article>
  );
}
