// src/components/home/HeroBlobBackground.tsx
// Anti-banding fix: blob-container adds backdrop-filter chroma boost.
// noise-overlay SVG fractal noise acts as CSS dithering to prevent circular banding.

export default function HeroBlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* Flex centering anchor, shifted slightly upwards but lowered from previous state */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-12 lg:-translate-y-20">
        {/* blob-container: fluid scaling for desktop and mobile */}
        <div
          className="blob-container"
          style={{ width: "clamp(220px, 22vw, 360px)", height: "clamp(220px, 22vw, 360px)" }}
        >
          {/* Layer 1: Outer atmospheric halo */}
          <div className="blob-halo" />

          {/* Layer 2: Conic spinner with white beacon */}
          <div className="blob-core" />

          {/* Layer 2.5: Rotating white/cyan highlight beacon */}
          <div className="blob-highlight" />

          {/* Layer 3: Inner counter-spin */}
          <div className="blob-inner" />

          {/* Layer 4: Soft center shimmer */}
          <div className="blob-shimmer" />
        </div>
      </div>
    </div>
  );
}
