"use client";

const DISCOVERY_POINTS = [
  "User and operator friction mapped before scope is approved.",
  "Constraints surfaced early so architecture does not drift mid-build.",
  "One clear brief created for design, engineering, and launch ownership.",
];

export default function StepOneProblem() {
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)",
        }}
      />

      <div className="relative rounded-[1.55rem] border border-white/8 bg-[#04070d]/88 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
              01 / Discovery
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.035em] text-white">
              Map the problem
            </h3>
          </div>
          <div className="rounded-full border border-brand-accent/25 bg-brand-accent/[0.14] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            Scope first
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          We start by defining the business problem, the technical reality, and the decision
          boundaries. That gives the team one shared brief before anyone disappears into build mode.
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.035] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Discovery outputs
            </p>
            <ul className="mt-4 space-y-3">
              {DISCOVERY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-accent-light shadow-[0_0_10px_rgba(var(--brand-accent-light-rgb),0.72)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/30">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-brand-accent/35" />
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                discovery board
              </span>
            </div>

            <div className="space-y-3 p-4 font-mono text-[11px]">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-zinc-300">
                <span className="text-zinc-500">01</span> User journeys and operator pain mapped
              </div>
              <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/[0.08] px-4 py-3 text-zinc-200">
                <span className="text-brand-accent-light">02</span> Scope boundary approved
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-zinc-300">
                <span className="text-zinc-500">03</span> Success metrics and failure paths logged
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Outcome
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Problem definition, technical constraints, and a shipping-ready scope document.
          </p>
        </div>
      </div>
    </article>
  );
}
