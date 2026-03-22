"use client";

const COMMITS = [
    "feat: sprint-brief-aligned",
    "fix: approval-flow-edge-case",
    "refactor: data-contracts",
    "perf: image-pipeline-tuned",
    "chore: qa-checklist-updated",
    "feat: launch-readiness-hooks",
];

export default function StepThreeShip() {
    return (
        <div className="relative flex w-full flex-col justify-center lg:w-1/2">
            <div className="mb-6 flex items-center gap-4">
                <div className="group relative z-10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-brand-accent/30 bg-neutral-900">
                    <svg className="absolute inset-0 h-full w-full animate-[spin_5s_linear_infinite] text-brand-accent/10 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 100 100" fill="none">
                        <path d="M 50 10 A 40 40 0 0 1 90 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        <path d="M 90 50 A 40 40 0 0 1 50 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 8" />
                        <path d="M 50 90 A 40 40 0 0 1 10 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 4" />
                        <path d="M 10 50 A 40 40 0 0 1 50 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span className="z-10 font-mono text-lg font-bold text-brand-accent-light transition-transform duration-500 group-hover:scale-110">03</span>
                </div>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">Ship in Loops</h3>
            </div>

            <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md transition-colors duration-500 hover:border-brand-accent/40">
                <div className="absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-[0.05] pointer-events-none">
                    <div className="flex whitespace-nowrap pt-4 animate-[scrollLeftHover_15s_linear_infinite]">
                        {COMMITS.concat(COMMITS).map((commit, index) => (
                            <span key={index} className="mx-6 font-mono text-4xl font-black uppercase tracking-widest text-brand-accent">
                                {commit}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex min-h-[320px] flex-col justify-between p-8 lg:p-10">
                    <div>
                        <p className="max-w-lg leading-relaxed text-zinc-400">
                            Progress shows up as working software, not status theater. The team
                            plans, builds, and reviews in short loops so each decision is grounded
                            in something real.
                        </p>
                    </div>

                    <div className="relative mt-8 w-full border-t border-white/10 pt-4">
                        <div className="mb-4 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                            <span>Weekly Proof</span>
                            <span className="text-brand-accent-light">1 Wk Loops</span>
                        </div>

                        <div className="relative flex flex-col justify-start overflow-hidden rounded-md border border-white/5 bg-white/5 px-3 pb-4 pt-5">
                            <div className="absolute inset-x-4 top-[24px] h-px bg-white/10" />

                            <div className="relative z-10 flex w-full items-start justify-between px-3 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                                <div className="group/node flex flex-col items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-zinc-600 transition-colors delay-100 group-hover:bg-brand-accent" />
                                    <span className="whitespace-nowrap text-[9px] font-mono uppercase tracking-widest text-zinc-500 transition-colors delay-100 group-hover:text-zinc-300">Mon: Plan</span>
                                </div>
                                <div className="group/node flex flex-col items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-zinc-600 transition-colors delay-200 group-hover:bg-brand-accent" />
                                    <span className="whitespace-nowrap text-[9px] font-mono uppercase tracking-widest text-zinc-500 transition-colors delay-200 group-hover:text-zinc-300">Wed: Build</span>
                                </div>
                                <div className="group/node flex flex-col items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-zinc-600 shadow-[0_0_8px_rgba(var(--brand-accent-rgb),0.8)] transition-colors delay-300 group-hover:bg-brand-accent-light" />
                                    <span className="whitespace-nowrap text-[9px] font-mono uppercase tracking-widest text-brand-accent-light">Fri: Review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrollLeftHover {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
