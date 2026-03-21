interface TechBridgeSymbolProps {
  className?: string;
  stroke?: string;
  core?: string;
}

export default function TechBridgeSymbol({
  className = "",
  stroke = "url(#tb-symbol-stroke)",
  core = "rgba(244, 239, 231, 0.92)",
}: TechBridgeSymbolProps) {
  const rotations = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="tb-symbol-stroke" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F7F3EA" />
          <stop offset="0.58" stopColor="#EEE8DE" />
          <stop offset="1" stopColor="#D4C09A" />
        </linearGradient>
        <radialGradient id="tb-symbol-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(8.5)">
          <stop offset="0" stopColor="#F8F5EE" />
          <stop offset="1" stopColor="#D9C5A1" />
        </radialGradient>
      </defs>

      <g stroke={stroke} strokeWidth="4.3" strokeLinecap="round" strokeLinejoin="round">
        {rotations.map((rotation) => (
          <ellipse
            key={rotation}
            cx="32"
            cy="18.8"
            rx="7.75"
            ry="16.25"
            transform={`rotate(${rotation} 32 32)`}
          />
        ))}
      </g>

      <circle cx="32" cy="32" r="4.25" fill={core === "rgba(244, 239, 231, 0.92)" ? "url(#tb-symbol-core)" : core} />
    </svg>
  );
}

