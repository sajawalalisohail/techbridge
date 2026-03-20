# CLAUDE.md

> AI operating manual for TechBridge. Treat this file and `docs/project-knowledge.md` as the source of truth over the default `README.md`, which is still boilerplate.

## Project Snapshot

TechBridge is a premium B2B marketing and conversion site for a software and AI engineering studio. The current commercial story combines:

- premium custom software and SaaS delivery
- AI workflow automation and lead-generation systems
- 24-hour website launches
- staff augmentation with Pakistan-based senior engineers under US-side oversight

This is a Next.js App Router project with a strong visual layer. Performance, motion quality, and design consistency matter as much as the copy.

## Core Stack

- Next.js 16.1.6 with App Router
- React 19.2.3
- TypeScript with `strict: true`
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Framer Motion for most UI motion
- GSAP + ScrollTrigger for pinned and scroll-linked choreography
- Lenis for smooth scrolling, initialized in `src/components/shared/SmoothScroll.tsx`
- Three.js, React Three Fiber, and Drei for WebGL layers
- React Markdown for insights detail content
- Remotion and Puppeteer for media/showcase tooling

## Repo Structure

- `src/app/` route entrypoints, layouts, metadata, `globals.css`, robots, sitemap
- `src/components/layout/` global navbar and footer used by the root shell
- `src/components/home/` homepage sections and shared marketing components
- `src/components/services/` service-page specific interactive content
- `src/components/shared/` reusable UI, heading animation helpers, providers, JSON-LD, smooth scroll
- `src/3d/` particle systems, scenes, shader files, and R3F wrappers
- `src/data/` service navigation, case studies, and insights source data
- `src/lib/` brand color bridge, GSAP helpers, jelly morph scroll context
- `public/` local fonts, proof images, and static assets
- `docs/` project handbook and non-code documentation

## Route Map

- `/` homepage narrative:
  `Hero -> TrustBar -> JellyMorphServicesSection -> ComparisonSection -> CaseStudiesSection -> ProcessSection -> WhyUsSection -> FinalCTA`
- `/services` seven service lines driven from `SERVICE_SECTIONS`
- `/staff-augmentation` dedicated staffing offer page
- `/websites` dedicated 24-hour website sales page with its own long-form motion-heavy funnel
- `/work` grouped case-study overview page
- `/work/[slug]` static detail pages generated from `CASE_STUDIES`
- `/insights` article index
- `/insights/[slug]` static detail pages generated from `INSIGHTS`
- `/about`, `/contact`, `/privacy`, `/terms`

## Root Shell Rules

The root layout in `src/app/layout.tsx` is the backbone of the experience. Preserve these behaviors unless the task explicitly changes them:

- Local Satoshi variable font is loaded with `next/font/local`
- `html` is rendered with `className="dark"`
- `SmoothScroll` mounts globally
- `JsonLd` mounts globally
- `ClientProviders` currently supplies `JellyMorphScrollProvider`
- `PageParticlesWrapper` sits in a sticky full-screen layer behind page content
- `Navbar` lives above route content
- `src/components/layout/Footer.tsx` is the real global footer and reveal system
- `CursorFollowerWrapper` mounts globally

Do not casually restructure the root stacking order, sticky canvas wrapper, or footer reveal spacer logic.

## Data-Driven Content

Prefer editing typed data files over hardcoding copy inside page components:

- `src/data/site-navigation.ts`
  source of truth for service sections, mega-menu items, footer columns, and service jump links
- `src/data/case-studies.ts`
  source of truth for work page groups, homepage featured studies, and `/work/[slug]`
- `src/data/insights.ts`
  source of truth for article cards and markdown-like article bodies rendered in `/insights/[slug]`

If a route is generated from these files, keep the data shape and route metadata in sync.

## Design System

### Brand Accent Tokens

The real source of truth is `src/app/globals.css`, not scattered inline styles.

- Current live palette is the "Abyss Navy" set:
  - `--brand-accent: #1e3a8a`
  - `--brand-accent-light: #3b82f6`
  - `--brand-accent-dark: #172554`
  - `--brand-accent-deep: #020617`
- Tailwind v4 tokens are exposed via `@theme inline`
- Use classes like `text-brand-accent`, `bg-brand-accent-dark`, `border-brand-accent/40`
- Do not hardcode alternate accent hex values into components
- For WebGL and shader work, read colors with `getBrandColors()` from `src/lib/brand-colors.ts`
- `brand-colors.ts` contains cyan fallback values only as runtime safety nets; they are not the intended product palette

### Typography And Layout

- Primary font is Satoshi from `public/font/satoshi/`
- The general page language is premium, sharp, and B2B; avoid generic "AI agency" phrasing
- Most interior pages follow a left-aligned editorial layout inside `max-w-[100rem]`
- Text blocks usually cap around `max-w-7xl` or smaller
- Homepage hero and some isolated marketing moments can center content when the composition calls for it
- Eyebrows generally use mono, uppercase, tracked styling

## Rendering Rules

- Interactive and animated components must be client components
- Keep route layouts and simple shells as server components when interactivity is unnecessary
- Heavy client-only features should stay dynamically imported with `ssr: false`
  - `PageParticlesWrapper` imports the jelly morph canvas dynamically
  - `ServicesProcessShowcase` is dynamically imported on `/services`
- Do not add Tailwind v3 config files or old config-based token patterns
- Do not introduce CSS Modules unless there is a strong reason and the task explicitly benefits from them
- Use the `@/` import alias

## Motion Rules

- Framer Motion is the default animation layer
- Reuse the house easing curve where possible:
  `[0.22, 1, 0.36, 1]`
- GSAP is reserved for scroll-linked or pinned choreography
- Lenis is initialized once globally and synced with ScrollTrigger
- Reduced-motion behavior matters:
  - `SmoothScroll` exits early when reduced motion is requested
  - several CSS animations in `globals.css` also disable themselves under reduced motion

## 3D And Particle Rules

- The global particle system is controlled through `JellyMorphScrollProvider`
- `PageParticlesWrapper` fades the backdrop based on the shared jelly morph scroll progress ref
- `JellyMorphServicesSection` is the section that drives that scroll progress
- Keep DOM tokens and WebGL colors aligned through the shared brand-color bridge
- Avoid changing shader uniforms or particle color logic to hardcoded brand values

## Navigation And Footer Gotchas

- The navbar desktop breakpoint is effectively `lg`; on smaller widths it forces the pill/mobile treatment
- Scroll state logic is intentional:
  - top under 50px
  - hidden until about 600px
  - pill after that
- On `/work`, the desktop pill navbar is hidden to reduce overlap with the page design
- The top announcement banner is disabled on `/websites`
- The navbar listens for a custom `force-hide-navbar` event
- The footer reveal system relies on setting `--footer-height` from `src/components/layout/Footer.tsx`
- Do not remove the spacer div or fixed-footer behavior on `md+` without reworking the reveal pattern

## Section-Specific Gotchas

- `JellyMorphServicesSection` must compute horizontal movement from the actual viewport container width, not `window.innerWidth`
- The services card reveal depends on `.card-spacer` collapsing correctly
- The services particle fade-out window is intentionally short near the end of the section
- `/websites` uses a dedicated family of glow utility classes in `globals.css` such as `.website-glow-shell` and `.website-glow-card-active`
- Avoid `overflow-hidden` on inner grids that need off-axis Framer motion travel, or entrance animations will clip

## SEO And Metadata

- Root metadata is defined in `src/app/layout.tsx`
- Route-specific metadata is defined in route layouts and in `generateMetadata` for dynamic detail pages
- `src/components/shared/JsonLd.tsx` injects organization, website, local business, and services schema
- `src/app/robots.ts` and `src/app/sitemap.ts` are part of the production SEO surface

## Validation

Run these after meaningful code changes:

```bash
npm run lint
```

Also consider `npm run build` when changing route structure, metadata, dynamic imports, or anything likely to affect Next.js compilation boundaries.

## Working Rules For AI Agents

- Read this file and `docs/project-knowledge.md` before making structural changes
- Prefer updating source data over duplicating content in JSX
- Preserve the premium visual language and do not downgrade sections into generic SaaS templates
- Keep changes compatible with the current motion stack, sticky layers, and footer reveal behavior
- Ignore the default `README.md` for architecture guidance unless it is updated in the future
