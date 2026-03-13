// src/components/home/HeroBlobBackground.tsx
// 4K premium blob: multi-layered mesh gradients, secondary blob, dot grid, film grain noise.
// Anti-banding fix: blob-container adds backdrop-filter chroma boost.

export default function HeroBlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* Flex centering anchor, shifted slightly upwards */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-12 lg:-translate-y-20">
        {/* blob-container: fluid scaling for desktop and mobile */}
        <div
          className="blob-container"
          style={{ width: "clamp(220px, 22vw, 360px)", height: "clamp(220px, 22vw, 360px)" }}
        >
          {/* Multi-layered mesh gradient for depth */}
          <div className="blob-mesh-layer" />

          {/* Outer atmospheric halo */}
          <div className="blob-halo" />

          {/* Conic spinner */}
          <div className="blob-core" />

          {/* Rotating white/cyan highlight beacon */}
          <div className="blob-highlight" />

          {/* Inner counter-spin */}
          <div className="blob-inner" />

          {/* Soft center shimmer */}
          <div className="blob-shimmer" />
        </div>

        {/* Secondary smaller blob on different drift path */}
        <div
          className="blob-secondary"
          style={{
            width: "clamp(80px, 8vw, 140px)",
            height: "clamp(80px, 8vw, 140px)",
            top: "35%",
            right: "30%",
            position: "absolute",
          }}
        />
      </div>

      {/* Texture overlays — full viewport coverage */}
      <div className="blob-dot-grid" />
      <div className="blob-noise" />
    </div>
  );
}
