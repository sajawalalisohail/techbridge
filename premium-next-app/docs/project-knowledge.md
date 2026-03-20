# TechBridge Project Knowledge

**Version:** 2026-03-20
**Project Type:** Premium B2B marketing and conversion site
**Framework:** Next.js 16 App Router, React 19, Tailwind CSS v4

## Overview

TechBridge presents itself as a premium software and AI engineering partner. The site is not a generic agency brochure. It sells confidence through:

- premium custom software and SaaS delivery
- AI systems and workflow automation
- fast-turn website launches
- staff augmentation with vetted senior engineers

The product experience leans heavily on motion, layered backgrounds, particle systems, and strong typography. The codebase is therefore part marketing site, part motion system, and part structured content repository.

## Current Positioning

The live site supports several offers at once:

- **Staff augmentation**
  Global cost advantage paired with senior talent and US-side oversight.
- **Custom software and SaaS**
  Architecture-first delivery for platforms, internal tools, and product infrastructure.
- **AI automation**
  Practical business automation rather than generic "AI" marketing.
- **24-hour websites**
  A fast-launch offer with a dedicated sales page and proof points.

Copy should stay premium, direct, and operator-friendly. Avoid vague claims, startup buzzwords, and anything that sounds like a template agency.

## Architecture

### App Shell

`src/app/layout.tsx` establishes the shared shell:

- local Satoshi font loading through `next/font/local`
- dark root theme
- global Lenis smooth scrolling through `SmoothScroll`
- global JSON-LD injection through `JsonLd`
- `ClientProviders`, which currently wraps `JellyMorphScrollProvider`
- sticky full-screen particle backdrop via `PageParticlesWrapper`
- persistent `Navbar`
- fixed reveal-style `Footer`
- global cursor follower

This shell is a major design primitive. Many pages assume those layers already exist.

### Directory Responsibilities

- `src/app/`
  routes, layouts, metadata, `globals.css`, sitemap, robots
- `src/components/layout/`
  actual navbar and footer used by the app shell
- `src/components/home/`
  homepage sections, illustrations, mockups, process blocks
- `src/components/services/`
  service page specific showcase logic
- `src/components/shared/`
  reusable UI, animation helpers, scroll helpers, JSON-LD
- `src/3d/`
  WebGL components, particle layers, scenes, shaders
- `src/data/`
  central data model for services, work, and insights
- `src/lib/`
  shared helpers for brand tokens, GSAP, and jelly morph state

## Route Inventory

### Primary Routes

- `/`
  Main homepage and the clearest snapshot of the current brand language.
- `/services`
  Full service inventory with seven detailed sections.
- `/staff-augmentation`
  Dedicated staffing and talent-placement offer page.
- `/websites`
  Dedicated 24-hour websites funnel page with long-form comparisons, stack messaging, and pricing-focused flow.
- `/work`
  Grouped case-study overview page.
- `/insights`
  Editorial listing page for engineering and architecture content.
- `/about`
  Company story and team positioning.
- `/contact`
  Contact and conversion page.
- `/privacy`, `/terms`
  Legal pages.

### Dynamic Routes

- `/work/[slug]`
  Generated from `CASE_STUDIES` in `src/data/case-studies.ts`
- `/insights/[slug]`
  Generated from `INSIGHTS` in `src/data/insights.ts`

Both dynamic routes use `generateStaticParams()` and `generateMetadata()`.

## Homepage Structure

The homepage currently renders in this order:

1. `Hero`
2. `TrustBar`
3. `JellyMorphServicesSection`
4. `ComparisonSection`
5. `CaseStudiesSection`
6. `ProcessSection`
7. `WhyUsSection`
8. `FinalCTA`

That sequence matters. The site moves from promise to trust, then into an interactive service reveal, proof, process, differentiation, and final conversion.

## Content Model

### Services

`src/data/site-navigation.ts` is the source of truth for:

- `SERVICE_SECTIONS`
  the seven service lines used for `/services`
- `SERVICE_NAV_GROUPS`
  the navbar mega-menu groupings
- `FOOTER_COLUMNS`
  footer navigation
- footer email and social links

The current seven service lines are:

1. Custom Software and SaaS
2. AI Powered Lead Generation
3. 24-Hour Web Presence
4. Mobile App Development
5. UI/UX Design and Branding
6. Internal Tools and Integrations
7. Staff Augmentation

### Work

`src/data/case-studies.ts` defines:

- typed case study records
- homepage featured work
- grouped work-page sections
- dynamic route content for `/work/[slug]`

`WORK_SECTION_META` currently groups work into:

- flagship platforms
- systems and internal tools
- mobile products
- rapid websites

### Insights

`src/data/insights.ts` defines:

- typed insight records
- card metadata
- article body content stored inline as markdown strings

Detail pages render that content through `react-markdown`.

## Design System

### Brand Tokens

The canonical brand tokens live in `src/app/globals.css`.

Current live values:

- `--brand-accent: #1e3a8a`
- `--brand-accent-rgb: 30, 58, 138`
- `--brand-accent-light: #3b82f6`
- `--brand-accent-light-rgb: 59, 130, 246`
- `--brand-accent-dark: #172554`
- `--brand-accent-dark-rgb: 23, 37, 84`
- `--brand-accent-deep: #020617`

Tailwind v4 exposes these through `@theme inline`, so components should consume the semantic token classes rather than hardcoded hex values.

### 3D Token Bridge

`src/lib/brand-colors.ts` reads the CSS custom properties at runtime and converts them into forms usable by Three.js and shaders.

Important nuance:

- the fallback constants in `brand-colors.ts` are cyan safety defaults
- the real design language comes from the CSS tokens in `globals.css`

### Typography

- Satoshi is loaded locally from `public/font/satoshi/`
- The app uses a premium editorial feel rather than a default SaaS UI stack
- Mono text is frequently used for eyebrows, labels, and metadata

### Layout

- Main content typically lives inside `max-w-[100rem]`
- Interior sections generally follow a left-aligned editorial grid
- Select heroes and isolated promotional blocks may center content
- The design assumes generous spacing and layered surfaces rather than flat white-card layouts

## Motion And Visual System

### Motion Stack

- **Framer Motion**
  Default layer for reveal, stagger, and section transitions.
- **GSAP + ScrollTrigger**
  Reserved for pinned and scroll-driven experiences, especially the jelly morph services sequence.
- **Lenis**
  Global smooth scrolling, initialized once in `SmoothScroll`.
- **CSS Keyframes**
  Repeating ambient motion, glow rotation, pulse effects, marquee movement, and other low-level visual loops.

The house easing curve appears throughout the codebase:

```ts
[0.22, 1, 0.36, 1]
```

### Reduced Motion

Reduced motion is already respected in multiple places:

- `SmoothScroll` exits early if `prefers-reduced-motion` is enabled
- multiple CSS utility animations disable themselves under reduced motion

New motion work should keep that behavior.

### Particle And Jelly Morph System

The homepage and some global ambience rely on a shared scroll-progress model:

- `JellyMorphScrollProvider` stores a mutable progress ref
- `JellyMorphServicesSection` updates that ref
- `PageParticlesWrapper` reads the ref and fades the glow/canvas accordingly
- `JellyMorphParticles` consumes live brand colors through the brand-color bridge

The particle layer is not decorative filler; it is coordinated with the services section.

## Navigation And Conversion Patterns

### Navbar

`src/components/layout/Navbar.tsx` includes:

- a transient top announcement banner, hidden on `/websites`
- a scroll-aware top/hidden/pill state machine
- a desktop services mega-menu
- mobile services expansion
- route-specific behavior for `/work`

Practical implementation notes:

- mobile and tablet widths force the pill state
- the intended desktop breakpoint is `lg`, not `md`
- the component also responds to a `force-hide-navbar` custom event

### Footer

`src/components/layout/Footer.tsx` is part of the experience, not a generic footer include:

- fixed reveal behavior on `md+`
- JS-managed `--footer-height` spacer
- WV location copy plus live Eastern Time clock
- structured footer columns from `src/data/site-navigation.ts`

If the footer structure changes, the reveal spacer logic usually needs to change too.

## Route-Specific Notes

### `/services`

- Powered by `SERVICE_SECTIONS`
- Includes a dynamically imported `ServicesProcessShowcase`
- Uses section-centered active state tracking for the sticky sidebar

### `/websites`

- Long-form, motion-heavy page focused on the 24-hour website offer
- Uses dedicated "website glow" utility classes defined in `globals.css`
- Has its own visual language but still sits inside the main site shell

### `/work`

- Uses grouped case-study sections keyed by `WORK_SECTION_META`
- Pulls highlight items and groups directly from `CASE_STUDIES`

### `/insights`

- Uses `INSIGHTS` as the content source
- Detail pages render markdown-like strings rather than MDX files

## SEO And Structured Data

The SEO layer is already wired into the app:

- root metadata in `src/app/layout.tsx`
- route metadata in route layouts
- per-slug metadata in dynamic route files
- structured data in `src/components/shared/JsonLd.tsx`
- robots rules in `src/app/robots.ts`
- sitemap generation in `src/app/sitemap.ts`

Structured data currently includes:

- `Organization`
- `WebSite`
- `LocalBusiness` for US and PK locations
- `ItemList` for services

## Known Gotchas

- The default `README.md` is stale create-next-app boilerplate and should not be used as project guidance.
- Do not hardcode accent colors into DOM or WebGL code.
- Do not replace measured container widths with `window.innerWidth` in pinned horizontal sections.
- Avoid adding `overflow-hidden` around inner animated grids that rely on off-axis motion.
- Keep route-driven content in the `src/data/` files when possible.
- The root shell uses a layered z-index system; casual changes to positioning often break particles, navbar overlays, or footer reveal.
- `src/components/layout/Footer.tsx` is the active footer. There is an older `src/components/home/Footer.tsx` file in the tree that is not the shell footer.

## Validation Workflow

Minimum validation after changes:

```bash
npm run lint
```

Recommended when touching route boundaries, metadata, or rendering architecture:

```bash
npm run build
```

## Editing Guidance For Future Work

- Start from the current shell and data model before proposing structural changes.
- Preserve the premium design direction; do not flatten sections into generic SaaS components.
- Favor shared tokens, shared animation helpers, and data-driven content over one-off implementations.
- When updating copy, make it sound like a confident engineering partner, not a vague creative agency.
