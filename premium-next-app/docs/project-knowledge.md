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
- ServicesProcessShowcase is dynamically imported with `ssr: false` for bundle reduction.
- The visual stack depends on layered backgrounds, sticky particle canvases, and a fixed footer reveal.
- Reduced-motion support is part of the visual system and must remain functional.

## Homepage Section Order

```
Hero -> Differentiators -> TrustedBy (marquee) -> Services (6 cards) -> ProcessTimeline (4 steps) -> CaseStudies (9 cards, horizontal scroll) -> CTA
```

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

## Typography Standards

- **Hero h1 (standard):** `text-5xl font-bold leading-tight tracking-tight lg:text-6xl xl:text-7xl`
- **Hero h1 (home):** `text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl`
- **Accent gradient:** `bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent bg-clip-text text-transparent`
- **Eyebrow labels:** `font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600` with dot+line decoration
- **Section padding:** `py-24 lg:py-32` standard, `py-16 lg:py-20` tight
- **Container widths:** Homepage `max-w-[100rem]` with `px-6 lg:px-10`, interior pages `max-w-7xl` with `px-6 lg:px-12`

## Animation System

- Standard easing: `[0.22, 1, 0.36, 1]`
- GlowButton uses CSS `@property --glow-angle` for rotation (no GSAP at runtime)
- CTA pulse and glow-rotate keyframes live in globals.css
- GSAP ScrollTrigger for CaseStudies must use `useLayoutEffect` for cleanup (prevents removeChild errors during navigation)
- ServicesProcessShowcase uses `500vh` height on desktop (lg+), `auto` on mobile via matchMedia

## 3D Color Pipeline

- `MainScene` uses runtime brand colors to generate blob radial gradients.
- `PageParticles` and `Particles` build color palettes and connection-line colors from the current CSS token values.
- `DarkMatterField` passes `uBrandAccent`, `uBrandAccentLight`, and `uBrandAccentDark` uniforms into the shader.
- This makes the accent swap test work across both DOM and WebGL layers.

## Data-Driven Color Exception

Case studies still store project-specific `accentColor` values as RGB triplets in `src/data/`. Those values are separate from the TechBridge global brand accent and should stay data-driven.

## SEO Infrastructure

- Root layout: title template, OG + Twitter cards, og:image placeholder at /og-image.png
- Per-page layouts: each has title, description, canonical URL, openGraph
- JSON-LD: Organization, WebSite, Services (ItemList), LocalBusiness (US + PK offices)
- Sitemap: all static routes + all dynamic /work/[slug] and /insights/[slug]
- Robots: allow /, disallow /api/ and /_next/

## Known Gotchas

- `.website-glow-shell > *` in globals.css forces `position: relative` on all direct children. Use `style={{ position: "absolute" }}` inline for decorative overlay divs.
- The /websites page is exempt from all site-wide consistency rules (typography, spacing, layout).
- Font loading may fail in restricted network environments during `npm run build`.

## Validation Workflow

1. Run a repo search to ensure no stray hardcoded brand accent classes or RGB literals remain in `src/`.
2. Run `npm run build`.
3. If build fails only because `next/font/google` cannot fetch `Plus Jakarta Sans`, record that as an environment/network limitation.
4. Manually verify core routes at 320px, 375px, 768px, 1024px, 1440px.
5. Perform the accent swap test by changing only the `--brand-accent*` values in `globals.css`.

## Editing Guidelines

- Prefer token-driven styling over one-off color literals.
- Keep visual polish intentional: gradients, glows, and layered motion are part of the brand.
- Preserve existing component structure and data-driven content patterns unless the task explicitly changes them.
- Always check mobile (320px minimum) for overflow, touch targets (44px min), and grid layouts.
