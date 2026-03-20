"use client";

const ARCHITECTURE_DECISIONS = [
  "API boundaries and system responsibilities",
  "Data model and automation hooks",
  "Failure paths, observability, and rollout constraints",
];

export default function StepTwoArchitecture() {
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(var(--brand-accent-rgb), 0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)",
        }}
      />

      <div className="relative rounded-[1.55rem] border border-white/8 bg-[#04070d]/88 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent-light">
              02 / Architecture
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.035em] text-white">
              Design the system
            </h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300">
            Blueprint
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          Architecture is resolved before momentum can fracture. Interfaces, data flow, and launch
          guardrails are defined early so design and engineering can move in parallel without
          stepping on each other.
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/30 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Blueprint surface
            </p>

            <div className="relative mt-5 min-h-[220px] rounded-[1.15rem] border border-white/8 bg-[#050913] p-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <svg viewBox="0 0 320 190" className="relative h-full w-full">
                <path
                  d="M70 92 L155 92"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  strokeDasharray="5 6"
                />
                <path d="M188 92 L260 52" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <path d="M188 92 L260 132" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

                <rect x="20" y="72" width="54" height="40" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
                <text x="47" y="97" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
                  Client
                </text>

                <rect x="154" y="65" width="72" height="54" rx="14" fill="rgba(var(--brand-accent-rgb),0.14)" stroke="rgba(var(--brand-accent-light-rgb),0.6)" />
                <text x="190" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
                  API Layer
                </text>
                <text x="190" y="104" textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="8">
                  auth / logic
                </text>

                <rect x="252" y="28" width="52" height="40" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
                <text x="278" y="52" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">
                  Data
                </text>

                <rect x="244" y="112" width="68" height="40" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
                <text x="278" y="136" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">
                  Automations
                </text>
              </svg>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.035] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Locked decisions
            </p>
            <div className="mt-4 space-y-3">
              {ARCHITECTURE_DECISIONS.map((decision, index) => (
                <div
                  key={decision}
                  className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{decision}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Outcome
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            A delivery blueprint the whole team can execute against without reinterpretation.
          </p>
        </div>
      </div>
    </article>
  );
}
