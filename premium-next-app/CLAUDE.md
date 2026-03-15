# CLAUDE.md - TechBridge Premium Marketing Site

> Current source of truth for AI-assisted development in this repo.

---

## Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | `16.1.6` | App Router framework |
| `react` / `react-dom` | `19.2.3` | UI runtime |
| `typescript` | `^5` | Type safety |
| `tailwindcss` | `^4` | Utility styling |
| `@tailwindcss/postcss` | `^4` | Tailwind v4 PostCSS integration |
| `framer-motion` | `^12.35.0` | Motion and entrance animation |
| `gsap` | `^3.14.2` | Supplemental motion and glow animation |
| `three` | `^0.183.2` | 3D engine |
| `@react-three/fiber` | `^9.5.0` | React renderer for Three.js |
| `@react-three/drei` | `^10.7.7` | R3F helpers |
| `@react-three/postprocessing` | `^3.0.4` | Post-processing |
| `lucide-react` | `^0.577.0` | Icons |
| `react-markdown` | `^10.1.0` | Insights markdown rendering |
| `puppeteer` | `^24.38.0` | Headless browser tooling |

---

## Project Layout

```text
premium-next-app/
├── docs/
│   └── project-knowledge.md
├── public/
│   ├── font/
│   └── proofs/
├── src/
│   ├── 3d/
│   │   ├── components/
│   │   └── scenes/
│   ├── app/
│   ├── components/
│   ├── data/
│   └── lib/
│       ├── brand-colors.ts
│       └── gsap.ts
├── CLAUDE.md
├── package.json
└── tsconfig.json
```

Important paths:

- `src/app/globals.css`: Tailwind import, custom properties, global animations, brand tokens
- `src/lib/brand-colors.ts`: runtime helper for reading the CSS-driven accent system
- `src/3d/`: particle fields, blobs, shaders, and scenes
- `src/data/`: typed static content for case studies and insights

---

## Hard Rules

### Rendering

- All interactive pages and components are client components.
- Route `layout.tsx` files are the only expected server components for metadata and shell composition.
- Do not add server actions or `"use server"` patterns.

### Dynamic Imports

- Heavy Three.js / R3F pieces must stay dynamically imported with `ssr: false`.
- Existing wrappers and patterns in `src/components/` should be preserved.

### Styling

- Tailwind v4 is configured through `@theme inline` in `src/app/globals.css`.
- No `tailwind.config.ts` is used.
- No CSS modules, styled-components, or extra global stylesheets.
- Inline styles are acceptable for gradients, noise textures, and SVG/animation-specific visuals.

### TypeScript

- `strict: true` is enabled.
- Path alias: `@/* -> ./src/*`.
- Keep helper types explicit when they are shared across 3D or data-driven code.

### Icons and Images

- Use `lucide-react` for icons.
- Use `next/image` for images.

---

## Brand Accent System

The site-wide accent is centralized. Do not hardcode lime hex/RGB values in components.

### Source Of Truth

- CSS tokens live in `src/app/globals.css`.
- Runtime 3D/shader consumers must read colors through `src/lib/brand-colors.ts`.

### Primary Tokens

```css
--brand-accent: #84cc16;
--brand-accent-rgb: 132, 204, 22;
--brand-accent-light: #a3e635;
--brand-accent-light-rgb: 163, 230, 53;
--brand-accent-dark: #65a30d;
--brand-accent-dark-rgb: 101, 163, 13;
--brand-accent-deep: #1a2e05;
```

### Tailwind Tokens

`@theme inline` exposes:

- `brand-accent`
- `brand-accent-light`
- `brand-accent-dark`
- `brand-accent-deep`
- `shadow-accent-glow`

Use utilities like:

- `text-brand-accent`
- `bg-brand-accent-dark`
- `border-brand-accent/40`
- `shadow-brand-accent/10`

### 3D / Shader Rules

- Three.js color objects should come from `getBrandColors()`.
- Shader color uniforms should use:
  - `uBrandAccent`
  - `uBrandAccentLight`
  - `uBrandAccentDark`
- Blob and particle colors should not embed legacy accent hex values.

### Case Study Accent Data

- Case studies still use per-project `accentColor` RGB triplets in `src/data/`.
- That data is separate from the global TechBridge brand accent and should remain data-driven.

---

## Motion And Visual Patterns

- Framer Motion handles entrances, staggered reveals, and in-view transitions.
- CSS keyframes in `globals.css` handle ambient loops and shared visual effects.
- GSAP is used selectively for specialty interactions such as rotating glow borders.
- Standard easing curve: `[0.22, 1, 0.36, 1]`.

Key shared animations:

- `blobSpin`
- `blobMorph`
- `blobPulse`
- `shimmerPulse`
- `blobDrift`
- `blobDriftAlt`
- `accent-pulse`
- `mesh-drift`
- `mesh-drift-b`
- `scan-down`
- `grid-pulse`
- `node-ping`
- `dash-flow`
- `tb-marquee-scroll`
- `cursor-blink`

Accessibility rule:

- `prefers-reduced-motion` support in `globals.css` must continue to disable ambient blob animation.

---

## Layout Notes

- Root layout applies fonts, navbar, footer reveal, particles, and cursor follower.
- Background layers sit under content with a sticky fullscreen particle canvas.
- The footer reveal depends on content scrolling above a fixed footer layer.
- The separator glow between content and footer should use the brand-accent gradient, not a hardcoded color.

---

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Note:

- In restricted environments, `next/font/google` may fail to fetch `Plus Jakarta Sans` during `npm run build`. Treat that as an external network blocker unless local code changes introduced additional errors.

---

## Preserve These Patterns

1. Inline SVG noise textures and `feTurbulence` data URIs stay inline.
2. Global accent styling must come from `--brand-accent*` tokens and `getBrandColors()`.
3. Case-study project accents remain data-driven RGB strings.
4. Barrel exports in `3d/`, `illustrations/`, `mockups/`, and `process/` should remain intact.
5. Existing section separator comments and component organization conventions should stay consistent.
6. Animated blob layers should keep `will-change: transform` where already used.
