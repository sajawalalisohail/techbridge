// src/components/home/HeroBlobBackground.tsx
// Anti-banding fix: blob-container adds backdrop-filter chroma boost.
// noise-overlay SVG fractal noise acts as CSS dithering to prevent circular banding.

export default function HeroBlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* Flex centering anchor */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* blob-container: backdrop-filter saturate+contrast smooths color gradients */}
        <div
          className="blob-container"
          style={{ width: "min(25vw, 320px)", height: "min(25vw, 320px)" }}
        >
          {/* Dithering noise overlay — pointer-events-none, z-index:1 */}
          <div className="noise-overlay" />

          {/* Layer 1: Outer atmospheric halo */}
          <div className="blob-halo" />

          {/* Layer 2: Conic spinner with white beacon */}
          <div className="blob-core" />

          {/* Layer 3: Inner counter-spin */}
          <div className="blob-inner" />

          {/* Layer 4: Soft center shimmer */}
          <div className="blob-shimmer" />
        </div>
      </div>
    </div>
  );
}
