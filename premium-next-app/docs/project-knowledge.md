# TechBridge Project Knowledge

**Version:** 1.0.0
**Target Framework:** Next.js 16 (App Router), React 19, Tailwind v4

## Overview

TechBridge is a premium marketing site with a strong visual layer built from Tailwind v4, Framer Motion, GSAP, and React Three Fiber. The app is primarily client-rendered, with route layouts used for metadata, SEO, and shell composition.

## Architecture & Directory Structure

- `src/app/`: Next.js App Router (entrypoints, layouts, `globals.css`, metadata)
- `src/components/`: Modular UI, layouts, shared components, mockups, and illustrations
- `src/3d/`: Advanced WebGL context (particle systems, background blobs, interactive shaders, R3F scenes)
- `src/data/`: Typed, static JSON/TS content (case studies, insights, timelines)
- `src/lib/`: Shared utilities (`brand-colors.ts` bridges CSS vars to Three.js; `gsap.ts` hooks)
- `public/`: Fonts, images, og-images, and proofs
- `.agent/skills/`: AI agent capabilities catalog, guiding automated LLM feature development

## Agent System Integration

The repository is fully equipped to interact alongside AI agents (Claude, Gemini, Cursor). 
- Agents must refer to `CLAUDE.md` and `.agent/skills/CATALOG.md` for strict design constraints, workflows, and task automation context.
- Generated code should inherit the active unified design system rather than inventing ad-hoc styling or missing framework migrations.

## Rendering And UX Constraints

- Interactive UI is heavily client-side (`"use client"`).
- Heavy 3D modules (Three.js, R3F) and complex animations (`ServicesProcessShowcase`) must remain dynamically imported via `next/dynamic` with `ssr: false` to reduce bundle weights.
- The visual stack depends on layered backgrounds, sticky particle canvases, and a fixed footer reveal.
- Reduced-motion support is systematically enforced across the visual system.

## Homepage Section Order

```text
Hero -> Differentiators -> TrustedBy (marquee) -> Services (6 cards) -> ProcessTimeline (4 steps) -> CaseStudies (9 cards, horizontal scroll) -> CTA
```

## Accent Token System

The global TechBridge accent is strictly centralized in `src/app/globals.css` using Tailwind v4 `@theme inline`:

```css
--brand-accent /* Base hex/RGB variations */
```

**Rules:**
- **No hardcoding:** Do not use hex/RGB lime values directly in components or inline styles.
- **CSS:** Use exposed Tailwind v4 tokens: `text-brand-accent`, `bg-brand-accent-dark`, `border-brand-accent/40`, `shadow-accent-glow`.
- **3D / WebGL:** Use `getBrandColors()` to inject the live CSS values into Three.js materials and GLSL uniforms (e.g., `uBrandAccent`).

**Data-Driven Exception:**
- Case studies store project-specific `accentColor` RGB strings in `src/data/`. This enables distinct thematic colors per project, separate from the global TechBridge styling.

## Typography & Core Styling Standards

- **Hero h1:** `text-5xl font-bold leading-tight tracking-tight lg:text-7xl xl:text-7xl`
- **Text Gradients:** `bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent`
- **Eyebrows:** `font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600` (often decorated with a dot + line)
- **Whitespace / Padding:** Section padding expects `py-24 lg:py-32` minimally; `py-16 lg:py-20` for tight layouts.
- **Constraints:** Standard max-widths: `max-w-[100rem]` (Home/Landing), `max-w-7xl` (Interior Routes).

## Animation Pipeline

We distribute motion across three specialized tools based on performance/impact:
1. **Framer Motion**: View transitions, staggered reveal arrays, page loads. Default easing is `[0.22, 1, 0.36, 1]`.
2. **GSAP**: Scroll triggers, complex timelines (like Horizontal Case Studies), and specialized UI rotation. Must be wrapped in `useLayoutEffect` to clean up upon unmount safely.
3. **CSS / PostCSS keyframes**: Infinite background loops (blobs, particles, marquee scrolls, rotating button glows using `@property --glow-angle`).

## SEO Infrastructure

- **Layout metadata:** Root handles base `<title>`, OpenGraph cards, Twitter, and the default `og:image` placeholder. Routes define distinct descriptions, canonicals, and openGraph updates.
- **JSON-LD Schema:** Comprehensive structured data embedded for `Organization`, `WebSite`, `LocalBusiness` (US & PK branches).
- **Robots / Sitemap:** Exposes static + dynamic pages (`/work`, `/insights`), disallowing restricted routes.

## Known Gotchas & Validation Workflow

- Overlay styling (e.g. `.website-glow-shell > *`) may force localized stacking. Beware positioning traps!
- The `/websites` route is an edge case and handles alternate layout structures.
- During build (`npm run build`), `next/font/google` fetch requests for `Plus Jakarta Sans` can fail under strict proxy setups.
- **Validation:** Always test interactions on Safari vs Chrome, verify cleanup hooks for GSAP scroll zones, and confirm dynamic imports correctly split chunks.
