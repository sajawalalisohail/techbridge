import TechBridgeSymbol from "@/components/shared/TechBridgeSymbol";

interface StudioLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

const SIZE_MAP = {
  sm: {
    shell: "gap-2.5",
    badge: "h-10 w-10 rounded-[1rem]",
    wordmark: "text-[1.02rem]",
    tagline: "text-[9px]",
  },
  md: {
    shell: "gap-3",
    badge: "h-11 w-11 rounded-[1.05rem]",
    wordmark: "text-[1.16rem]",
    tagline: "text-[9px]",
  },
  lg: {
    shell: "gap-3.5",
    badge: "h-12 w-12 rounded-[1.15rem]",
    wordmark: "text-[1.26rem]",
    tagline: "text-[10px]",
  },
} as const;

export default function StudioLogo({
  size = "md",
  showTagline = false,
  className = "",
  wordmarkClassName = "",
}: StudioLogoProps) {
  const config = SIZE_MAP[size];

  return (
    <span className={`inline-flex items-center ${config.shell} ${className}`.trim()}>
      <span
        className={`relative inline-flex items-center justify-center border border-white/10 bg-[linear-gradient(180deg,#0f1115,#090b0f)] shadow-[0_10px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl ${config.badge}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 28%), radial-gradient(circle at bottom left, rgba(212,192,154,0.12), transparent 34%)",
          }}
        />
        <TechBridgeSymbol className="relative h-[74%] w-[74%]" />
      </span>

      <span className={`flex flex-col ${wordmarkClassName}`.trim()}>
        <span
          className={`font-semibold uppercase tracking-[-0.06em] text-[#F6F2EA] ${config.wordmark}`}
        >
          TECHBRIDGE
        </span>
        {showTagline && (
          <span
            className={`font-mono font-medium uppercase tracking-[0.28em] text-zinc-500 ${config.tagline}`}
          >
            Premium Engineering Studio
          </span>
        )}
      </span>
    </span>
  );
}
