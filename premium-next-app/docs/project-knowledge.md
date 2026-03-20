# TechBridge Project Knowledge

**Version:** 1.0.0
**Target Framework:** Next.js 16 (App Router), React 19, Tailwind v4

## Overview

TechBridge is a premium B2B marketing and conversion site focused intently on **Staff Augmentation**. Our positioning emphasizes "Silicon Valley Quality. Global Cost Advantage," leveraging elite Pakistani software and AI engineering talent. The site features a strong visual layer built from Tailwind v4, Framer Motion, GSAP, and React Three Fiber. The app is primarily client-rendered, with route layouts used for metadata, SEO, and shell composition.

## Architecture & Directory Structure

- `src/app/`: Next.js App Router (entrypoints, layouts, `globals.css`, metadata)
- `src/components/`: Modular UI, layouts, shared components, mockups, and illustrations
- `src/3d/`: Advanced WebGL context (particle systems, background blobs, interactive shaders, R3F scenes)
- `src/data/`: Typed, static JSON/TS content (case studies, insights, timelines)
- `src/lib/`: Shared utilities (`brand-colors.ts` bridges CSS vars to Three.js; `gsap.ts` hooks)
- `public/`: Fonts, images, og-images, and proofs

## Agent System Integration

The repository is fully equipped to interact alongside AI agents (Claude, Gemini, Cursor). 
- Agents must refer to `CLAUDE.md` for strict design constraints and current implementation context.
- Generated code should inherit the active unified design system rather than inventing ad-hoc styling or missing framework migrations.

## Rendering And UX Constraints

- Interactive UI is heavily client-side (`"use client"`).
- Heavy 3D modules (Three.js, R3F) and complex animations (`ServicesProcessShowcase`) must remain dynamically imported via `next/dynamic` with `ssr: false` to reduce bundle weights.
- The visual stack depends on layered backgrounds, a sticky global `PageParticlesWrapper` canvas in `src/app/layout.tsx`, and a fixed footer reveal.
- Reduced-motion support is systematically enforced across the visual system.

## Homepage Section Order (The Phase 2 Narrative Flow)

```text
Hero -> Trust Bar -> Jelly Morph Services -> Comparison -> Case Studies -> Process -> Why Us -> Final CTA
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

- **Font Family**: `Satoshi` via `next/font/local` in `src/app/layout.tsx`.
- **Universal Grid Baseline**: Left-Aligned Editorial architecture. Root sections use `max-w-[100rem]`, driving text blocks bounds using `max-w-7xl` pinned with `flex-col items-start text-left`. Wait for explicit exceptions (like the Hero `items-center`).
- **Hero h1:** `text-5xl font-bold leading-tight tracking-tight lg:text-7xl xl:text-7xl`
- **Text Gradients:** `bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent`
- **Eyebrows:** `font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600` (often decorated with a dot + line)
- **Whitespace / Padding:** Section padding expects `py-24 lg:py-32` minimally; `py-16 lg:py-20` for tight layouts.

## Services Section Implementation Notes

- `src/components/home/JellyMorphServicesSection.tsx` is a pinned GSAP horizontal reveal section that still needs to visually align to the same centered `max-w-[100rem]` container as the sections below it.
- The services split is currently 40/60 on desktop, but the scroll math must use the measured viewport width (`viewportRef.clientWidth`) rather than `window.innerWidth`.
- Inactive service cards are designed so the title sits at the bottom, then rises during reveal via the `.card-spacer` collapse animation.
- The section title remains fixed on the left while the horizontal card track is clipped on the right using a mask gradient.

## Services Particle System Notes

- The sticky particle layer is mounted globally by `src/components/PageParticlesWrapper.tsx`.
- `src/3d/components/JellyMorphParticles.tsx` reads live brand colors through `getBrandColors()` and passes them into GLSL uniforms rather than hardcoding theme colors.
- The current services morph uses bright, near-white particles with a subtle brand-blue tint and a radial theme-colored backdrop glow.
- The particle/glow exit timing should remain tightly synced with the final services card exit; the current fast fade window is roughly `0.9 -> 0.94` of services scroll progress.

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

- **Navigation Overflow**: Do not set `Navbar` break points to `md`; utilize `lg:hidden` (1024px) for menus to prevent dense horizontal link overlaps on tablets. On narrow screens, dynamically force `navState = "pill"`.
- **Framer Motion Clipping**: Do not apply `overflow-hidden` wrappers to internal grids manipulating elements outside bounds (i.e. `x: -60` variants), or text will visually shear. Wrap `overflow-hidden` at the root `<section>` level exclusively.
- **Overlay styling** (e.g. `.website-glow-shell > *`) may force localized stacking. Beware positioning traps!
- The `/websites` route is an edge case and handles alternate layout structures.
- The project uses local `Satoshi` fonts, so typography should not depend on `next/font/google` fetches at build time.
- The services section is easy to misalign if width calculations fall back to raw viewport units. Keep it container-aligned with the sections below.
- **Validation:** Always test interactions on Safari vs Chrome, verify cleanup hooks for GSAP scroll zones, and confirm dynamic imports correctly split chunks.
