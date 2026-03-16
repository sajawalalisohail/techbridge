"use client";

export type BrandVec3 = [number, number, number];

export interface BrandColors {
  accent: string;
  accentLight: string;
  accentDark: string;
  accentDeep: string;
  accentRgb: string;
  accentLightRgb: string;
  accentDarkRgb: string;
  accentVec3: BrandVec3;
  accentLightVec3: BrandVec3;
  accentDarkVec3: BrandVec3;
}

const DEFAULT_ACCENT = "#c12468";
const DEFAULT_ACCENT_LIGHT = "#df4c8f";
const DEFAULT_ACCENT_DARK = "#6a2a43";
const DEFAULT_ACCENT_DEEP = "#1a3d3f";
const DEFAULT_ACCENT_RGB = "193, 36, 104";
const DEFAULT_ACCENT_LIGHT_RGB = "223, 76, 143";
const DEFAULT_ACCENT_DARK_RGB = "106, 42, 67";

function readProperty(style: CSSStyleDeclaration, name: string, fallback: string) {
  const value = style.getPropertyValue(name).trim();
  return value || fallback;
}

function parseRgb(value: string, fallback: BrandVec3): BrandVec3 {
  const parsed = value
    .split(",")
    .map((part) => Number.parseFloat(part.trim()))
    .filter((part) => Number.isFinite(part));

  if (parsed.length !== 3) {
    return fallback;
  }

  return [parsed[0], parsed[1], parsed[2]];
}

function toVec3(rgb: BrandVec3): BrandVec3 {
  return [
    Number((rgb[0] / 255).toFixed(4)),
    Number((rgb[1] / 255).toFixed(4)),
    Number((rgb[2] / 255).toFixed(4)),
  ];
}

function buildBrandColors(values: {
  accent: string;
  accentLight: string;
  accentDark: string;
  accentDeep: string;
  accentRgb: string;
  accentLightRgb: string;
  accentDarkRgb: string;
}): BrandColors {
  const accentRgbTuple = parseRgb(values.accentRgb, [193, 36, 104]);
  const accentLightRgbTuple = parseRgb(values.accentLightRgb, [223, 76, 143]);
  const accentDarkRgbTuple = parseRgb(values.accentDarkRgb, [106, 42, 67]);

  return {
    accent: values.accent,
    accentLight: values.accentLight,
    accentDark: values.accentDark,
    accentDeep: values.accentDeep,
    accentRgb: values.accentRgb,
    accentLightRgb: values.accentLightRgb,
    accentDarkRgb: values.accentDarkRgb,
    accentVec3: toVec3(accentRgbTuple),
    accentLightVec3: toVec3(accentLightRgbTuple),
    accentDarkVec3: toVec3(accentDarkRgbTuple),
  };
}

export const DEFAULT_BRAND_COLORS = buildBrandColors({
  accent: DEFAULT_ACCENT,
  accentLight: DEFAULT_ACCENT_LIGHT,
  accentDark: DEFAULT_ACCENT_DARK,
  accentDeep: DEFAULT_ACCENT_DEEP,
  accentRgb: DEFAULT_ACCENT_RGB,
  accentLightRgb: DEFAULT_ACCENT_LIGHT_RGB,
  accentDarkRgb: DEFAULT_ACCENT_DARK_RGB,
});

export function getBrandColors(): BrandColors {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return DEFAULT_BRAND_COLORS;
  }

  const style = getComputedStyle(document.documentElement);

  return buildBrandColors({
    accent: readProperty(style, "--brand-accent", DEFAULT_ACCENT),
    accentLight: readProperty(style, "--brand-accent-light", DEFAULT_ACCENT_LIGHT),
    accentDark: readProperty(style, "--brand-accent-dark", DEFAULT_ACCENT_DARK),
    accentDeep: readProperty(style, "--brand-accent-deep", DEFAULT_ACCENT_DEEP),
    accentRgb: readProperty(style, "--brand-accent-rgb", DEFAULT_ACCENT_RGB),
    accentLightRgb: readProperty(style, "--brand-accent-light-rgb", DEFAULT_ACCENT_LIGHT_RGB),
    accentDarkRgb: readProperty(style, "--brand-accent-dark-rgb", DEFAULT_ACCENT_DARK_RGB),
  });
}
