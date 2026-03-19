"use client";

export default function HeroBlobBackground() {
  return (
    <div className="hero-blob-wrapper" aria-hidden="true">
      {/* Anchor container that handles the bouncing float animation */}
      <div className="hero-blob-floater">
        {/* The single strictly circular aura layer that spins with the pizza-slice gradient */}
        <div className="hero-blob-aura" />
      </div>
    </div>
  );
}
