"use client";

export type InteriorHeroBlobAlignment = "center" | "right" | "left" | "center-right";
export type InteriorHeroBlobIntensity = "subtle" | "medium" | "strong";
export type InteriorHeroBlobSize = "sm" | "md" | "lg";
export type InteriorHeroBlobPresetName =
    | "services"
    | "work"
    | "about"
    | "insights"
    | "contact"
    | "websites";

interface InteriorHeroBlobPreset {
    alignment: InteriorHeroBlobAlignment;
    intensity: InteriorHeroBlobIntensity;
    size: InteriorHeroBlobSize;
    anchorClassName?: string;
    secondaryClassName?: string;
}

interface InteriorHeroBlobProps {
    preset?: InteriorHeroBlobPresetName;
    alignment?: InteriorHeroBlobAlignment;
    intensity?: InteriorHeroBlobIntensity;
    size?: InteriorHeroBlobSize;
    className?: string;
}

export const INTERIOR_HERO_BLOB_PRESETS = {
    services: {
        alignment: "right",
        intensity: "medium",
        size: "lg",
        anchorClassName: "lg:top-[48%]",
        secondaryClassName: "left-[8%] top-[30%] lg:left-[10%]",
    },
    work: {
        alignment: "right",
        intensity: "medium",
        size: "lg",
        anchorClassName: "lg:top-[47%]",
        secondaryClassName: "left-[10%] top-[28%] lg:left-[12%]",
    },
    about: {
        alignment: "center-right",
        intensity: "subtle",
        size: "md",
        anchorClassName: "lg:top-[46%] lg:left-[62%]",
        secondaryClassName: "left-[12%] top-[26%] lg:left-[14%]",
    },
    insights: {
        alignment: "center-right",
        intensity: "subtle",
        size: "sm",
        anchorClassName: "lg:top-[45%] lg:left-[60%]",
        secondaryClassName: "left-[16%] top-[24%] lg:left-[18%]",
    },
    contact: {
        alignment: "center-right",
        intensity: "medium",
        size: "lg",
        anchorClassName: "top-[54%] lg:top-[50%] lg:left-[66%]",
        secondaryClassName: "left-[14%] top-[24%] lg:left-[16%]",
    },
    websites: {
        alignment: "center",
        intensity: "medium",
        size: "lg",
        anchorClassName: "top-[46%] lg:top-[44%]",
        secondaryClassName: "right-[18%] top-[26%] lg:right-[22%]",
    },
} as const satisfies Record<InteriorHeroBlobPresetName, InteriorHeroBlobPreset>;

const BASE_ANCHOR_CLASS =
    "absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2";

const ALIGNMENT_CLASSES: Record<InteriorHeroBlobAlignment, string> = {
    center: "lg:left-1/2",
    right: "lg:left-[76%]",
    left: "lg:left-[24%]",
    "center-right": "lg:left-[64%]",
};

const SECONDARY_POSITION_CLASSES: Record<InteriorHeroBlobAlignment, string> = {
    center: "right-[12%] top-[24%] lg:right-[16%]",
    right: "left-[10%] top-[28%] lg:left-[12%]",
    left: "right-[10%] top-[28%] lg:right-[12%]",
    "center-right": "left-[12%] top-[26%] lg:left-[14%]",
};

const GLOW_ORIGINS: Record<InteriorHeroBlobAlignment, string> = {
    center: "50% 34%",
    right: "78% 42%",
    left: "22% 42%",
    "center-right": "66% 40%",
};

const EDGE_ORIGINS: Record<InteriorHeroBlobAlignment, string> = {
    center: "100% 0%",
    right: "100% 18%",
    left: "0% 20%",
    "center-right": "100% 16%",
};

const SIZE_DIMENSIONS: Record<
    InteriorHeroBlobSize,
    { primary: string; secondary: string }
> = {
    sm: {
        primary: "clamp(180px, 18vw, 280px)",
        secondary: "clamp(70px, 6vw, 110px)",
    },
    md: {
        primary: "clamp(220px, 21vw, 340px)",
        secondary: "clamp(82px, 7vw, 128px)",
    },
    lg: {
        primary: "clamp(250px, 24vw, 380px)",
        secondary: "clamp(96px, 8vw, 144px)",
    },
};

const INTENSITY_SETTINGS: Record<
    InteriorHeroBlobIntensity,
    {
        blobOpacity: number;
        secondaryBlobOpacity: number;
        primaryGlow: number;
        secondaryGlow: number;
        tertiaryGlow: number;
        dotGridOpacity: number;
        noiseOpacity: number;
    }
> = {
    subtle: {
        blobOpacity: 0.58,
        secondaryBlobOpacity: 0.4,
        primaryGlow: 0.06,
        secondaryGlow: 0.04,
        tertiaryGlow: 0.025,
        dotGridOpacity: 0.005,
        noiseOpacity: 0.009,
    },
    medium: {
        blobOpacity: 0.72,
        secondaryBlobOpacity: 0.52,
        primaryGlow: 0.09,
        secondaryGlow: 0.06,
        tertiaryGlow: 0.035,
        dotGridOpacity: 0.007,
        noiseOpacity: 0.011,
    },
    strong: {
        blobOpacity: 0.86,
        secondaryBlobOpacity: 0.62,
        primaryGlow: 0.12,
        secondaryGlow: 0.08,
        tertiaryGlow: 0.05,
        dotGridOpacity: 0.009,
        noiseOpacity: 0.013,
    },
};

export function InteriorHeroBlob({
    preset,
    alignment,
    intensity,
    size,
    className = "",
}: InteriorHeroBlobProps) {
    const presetConfig = preset ? INTERIOR_HERO_BLOB_PRESETS[preset] : undefined;

    const resolvedAlignment = alignment ?? presetConfig?.alignment ?? "center-right";
    const resolvedIntensity = intensity ?? presetConfig?.intensity ?? "medium";
    const resolvedSize = size ?? presetConfig?.size ?? "md";

    const dimensions = SIZE_DIMENSIONS[resolvedSize];
    const intensityConfig = INTENSITY_SETTINGS[resolvedIntensity];
    const anchorClassName = presetConfig?.anchorClassName ?? "";
    const secondaryClassName =
        presetConfig?.secondaryClassName ??
        SECONDARY_POSITION_CLASSES[resolvedAlignment];

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at ${GLOW_ORIGINS[resolvedAlignment]}, rgba(var(--brand-accent-rgb), ${intensityConfig.primaryGlow}) 0%, rgba(var(--brand-accent-rgb), 0) 58%),
                        radial-gradient(ellipse at ${EDGE_ORIGINS[resolvedAlignment]}, rgba(var(--brand-accent-dark-rgb), ${intensityConfig.secondaryGlow}) 0%, rgba(var(--brand-accent-dark-rgb), 0) 50%),
                        radial-gradient(circle at 50% 0%, rgba(var(--brand-accent-light-rgb), ${intensityConfig.tertiaryGlow}) 0%, rgba(var(--brand-accent-light-rgb), 0) 40%)
                    `,
                }}
            />

            <div
                className={`${BASE_ANCHOR_CLASS} ${ALIGNMENT_CLASSES[resolvedAlignment]} ${anchorClassName}`.trim()}
            >
                <div
                    className="blob-container"
                    style={{
                        width: dimensions.primary,
                        height: dimensions.primary,
                        opacity: intensityConfig.blobOpacity,
                    }}
                >
                    <div className="blob-mesh-layer" />
                    <div className="blob-halo" />
                    <div className="blob-core" />
                    <div className="blob-highlight" />
                    <div className="blob-inner" />
                    <div className="blob-shimmer" />
                </div>

                <div
                    className={`blob-secondary absolute ${secondaryClassName}`.trim()}
                    style={{
                        width: dimensions.secondary,
                        height: dimensions.secondary,
                        opacity: intensityConfig.secondaryBlobOpacity,
                    }}
                />
            </div>

            <div
                className="blob-dot-grid"
                style={{ opacity: intensityConfig.dotGridOpacity }}
            />
            <div
                className="blob-noise"
                style={{ opacity: intensityConfig.noiseOpacity }}
            />
        </div>
    );
}
