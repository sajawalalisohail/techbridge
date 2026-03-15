# TechBridge Project Knowledge

## Overview

TechBridge is a premium Next.js 16 marketing site with a strong visual layer built from Tailwind v4, Framer Motion, GSAP, and React Three Fiber. The app is primarily client-rendered, with route layouts used for metadata and shell composition.

## Architecture

- `src/app/`: route entrypoints, layouts, and `globals.css`
- `src/components/`: homepage, layout, shared UI, mockups, and illustrations
- `src/3d/`: particle systems, blobs, interactive backgrounds, and shader-driven effects
- `src/data/`: typed static content for case studies and insights
- `src/lib/brand-colors.ts`: runtime bridge between CSS custom properties and Three.js / GLSL

## Rendering And UX Constraints

- Interactive UI stays client-side.
- Heavy 3D modules should remain dynamically imported with `ssr: false`.
- The visual stack depends on layered backgrounds, sticky particle canvases, and a fixed footer reveal.
- Reduced-motion support is part of the visual system and must remain functional.

## Accent Token System

The global TechBridge accent is centralized in `src/app/globals.css`:

```css
--brand-accent
--brand-accent-rgb
--brand-accent-light
--brand-accent-light-rgb
--brand-accent-dark
--brand-accent-dark-rgb
--brand-accent-deep
```

Tailwind v4 exposes matching utilities through `@theme inline`, including:

- `brand-accent`
- `brand-accent-light`
- `brand-accent-dark`
- `brand-accent-deep`
- `shadow-accent-glow`

Rules:

- Do not hardcode the site accent in component markup or inline styles.
- Use `rgba(var(--brand-accent-rgb), alpha)` and companion light/dark RGB tokens for opacity-based styling.
- Use `getBrandColors()` for Three.js color objects and GLSL uniforms.

## 3D Color Pipeline

- `MainScene` uses runtime brand colors to generate blob radial gradients.
- `PageParticles` and `Particles` build color palettes and connection-line colors from the current CSS token values.
- `DarkMatterField` passes `uBrandAccent`, `uBrandAccentLight`, and `uBrandAccentDark` uniforms into the shader.
- This makes the accent swap test work across both DOM and WebGL layers.

## Data-Driven Color Exception

Case studies still store project-specific `accentColor` values as RGB triplets in `src/data/`. Those values are separate from the TechBridge global brand accent and should stay data-driven.

## Validation Workflow

1. Run a repo search to ensure no stray hardcoded brand accent classes or RGB literals remain in `src/`.
2. Run `cmd /c npm run build`.
3. If build fails only because `next/font/google` cannot fetch `Plus Jakarta Sans`, record that as an environment/network limitation.
4. Manually verify core routes:
   - `/`
   - `/services`
   - `/about`
   - `/websites`
   - `/work`
   - `/contact`
   - `/insights/[slug]`
5. Perform the accent swap test by changing only the `--brand-accent*` values in `globals.css`.

## Editing Guidelines

- Prefer token-driven styling over one-off color literals.
- Keep visual polish intentional: gradients, glows, and layered motion are part of the brand.
- Preserve existing component structure and data-driven content patterns unless the task explicitly changes them.
