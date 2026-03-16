"use client";

interface PageFooterGlowProps {
    className?: string;
}

export function PageFooterGlow({ className = "" }: PageFooterGlowProps) {
    return (
        <div className={`relative z-10 h-px w-full ${className}`.trim()}>
            <div
                aria-hidden="true"
                className="pointer-events-none h-px w-full"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.4) 30%, rgba(var(--brand-accent-light-rgb), 0.6) 50%, rgba(var(--brand-accent-rgb), 0.4) 70%, rgba(var(--brand-accent-rgb), 0) 100%)",
                    boxShadow:
                        "0 0 20px 4px rgba(var(--brand-accent-dark-rgb), 0.25)",
                }}
            />
        </div>
    );
}
