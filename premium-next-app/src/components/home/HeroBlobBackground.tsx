"use client";

interface HeroBlobBackgroundProps {
  variant?: "fullscreen" | "contained";
  className?: string;
}

export default function HeroBlobBackground({
  variant = "fullscreen",
  className = "",
}: HeroBlobBackgroundProps) {
  const wrapperClassName =
    variant === "contained"
      ? `absolute inset-0 overflow-hidden pointer-events-none ${className}`.trim()
      : `hero-blob-wrapper ${className}`.trim();

  return (
    <div className={wrapperClassName} aria-hidden="true">
      <div className="hero-blob-floater">
        <div className="hero-blob-aura" />
      </div>
    </div>
  );
}
