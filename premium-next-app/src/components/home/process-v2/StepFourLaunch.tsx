"use client";

const LAUNCH_GUARDRAILS = [
  { label: "Uptime target", value: "99.99%" },
  { label: "Response lane", value: "42 ms" },
  { label: "Rollback path", value: "Ready" },
];

export default function StepFourLaunch() {
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(var(--brand-accent-light-rgb), 0.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)",
        }}
      />

      <div className="relative rounded-[1.55rem] border border-white/8 bg-[#04070d]/88 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
              04 / Launch
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.035em] text-white">
              Launch and monitor
            </h3>
          </div>
          <div className="rounded-full border border-brand-accent/25 bg-brand-accent/[0.14] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            Live control
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          Going live is treated like an operating phase, not a handoff. Rollback paths,
          observability, and next-iteration priorities are already part of the plan before launch
          day arrives.
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Live telemetry
              </p>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent-light">
                <span className="h-2 w-2 rounded-full bg-brand-accent-light shadow-[0_0_10px_rgba(var(--brand-accent-light-rgb),0.72)]" />
                Monitoring on
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {LAUNCH_GUARDRAILS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.035] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Post-launch guardrails
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-6 text-zinc-300">
                Rollback paths and alert routing defined before deployment.
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-6 text-zinc-300">
                Owners know what gets watched, who responds, and what happens next.
              </div>
              <div className="rounded-[1rem] border border-brand-accent/20 bg-brand-accent/[0.08] px-4 py-4 text-sm leading-6 text-zinc-200">
                The first post-launch iteration is queued instead of being rediscovered later.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Outcome
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            A live system with visibility, backup plans, and momentum for the next iteration.
          </p>
        </div>
      </div>
    </article>
  );
}
