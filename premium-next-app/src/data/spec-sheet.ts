export interface SpecSheetItem {
  label: string;
  title: string;
  description: string;
}

export const ENGINEERING_SPEC_SHEET: ReadonlyArray<SpecSheetItem> = [
  {
    label: "Core Engine",
    title: "Next.js 16",
    description: "App Router SSR for instant loads, streaming UX, and SEO resilience.",
  },
  {
    label: "Animation",
    title: "GSAP / Framer Motion",
    description: "Studio-grade interaction layers with controlled motion and reduced-motion support.",
  },
  {
    label: "Smooth Scroll",
    title: "Lenis",
    description: "Premium tactile movement without turning the site into a motion demo.",
  },
  {
    label: "Infrastructure",
    title: "Vercel Edge",
    description: "Global low-latency delivery with deploy-first workflows and clean rollback paths.",
  },
] as const;
