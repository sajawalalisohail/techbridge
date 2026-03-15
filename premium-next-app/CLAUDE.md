# CLAUDE.md — TechBridge Premium Marketing Site

> Single source of truth for AI-assisted development on this codebase.
> Read this file completely before making any changes.

---

## Stack & Versions

| Package                        | Version   | Purpose                          |
|--------------------------------|-----------|----------------------------------|
| next                           | 16.1.6    | App Router framework             |
| react / react-dom              | 19.2.3    | UI runtime                       |
| typescript                     | ^5        | Type safety                      |
| tailwindcss                    | ^4        | Utility-first CSS (v4 engine)    |
| @tailwindcss/postcss           | ^4        | PostCSS integration for TW v4    |
| framer-motion                  | ^12.35.0  | Declarative animations           |
| gsap                           | ^3.14.2   | Scroll / timeline animations     |
| @react-three/fiber             | ^9.5.0    | React Three.js renderer          |
| @react-three/drei              | ^10.7.7   | R3F helpers                      |
| @react-three/postprocessing    | ^3.0.4    | R3F post-processing effects      |
| three                          | ^0.183.2  | 3D engine                        |
| @types/three                   | ^0.183.1  | Three.js type definitions        |
| lucide-react                   | ^0.577.0  | Icon library                     |
| remotion                       | ^4.0.434  | Programmatic video               |
| @remotion/player               | ^4.0.434  | Remotion playback component      |
| @studio-freight/react-lenis    | ^0.0.47   | Smooth scrolling                 |
| react-markdown                 | ^10.1.0   | Markdown rendering (insights)    |
| puppeteer                      | ^24.38.0  | Headless browser (dev only)      |
| eslint / eslint-config-next    | ^9 / 16.1.6 | Linting                       |

---

## Folder Structure

```
premium-next-app/
├── .agent/skills/              # Agent skill definitions (see table below)
├── public/
│   ├── font/                   # JetBrains Mono variable font
│   └── proofs/                 # Case study screenshots (per client folder)
├── src/
│   ├── 3d/                     # Three.js / R3F layer
│   │   ├── components/         # CenterBlob, DarkBackground, InteractiveCamera,
│   │   │                       # PageParticles, Particles, ScrollLinkedBlob,
│   │   │                       # SoftGradientBlob
│   │   ├── scenes/             # MainScene.tsx
│   │   ├── HybridBackground.tsx
│   │   └── index.ts            # Barrel: HybridBackground, PageParticles
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, Navbar, Footer, particles)
│   │   ├── page.tsx            # Homepage (Hero → TrustedBy → Services → CaseStudies → CTA)
│   │   ├── globals.css         # Tailwind import, CSS custom properties, keyframes
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── robots.ts           # SEO robots.txt
│   │   ├── sitemap.ts          # SEO sitemap generation
│   │   ├── about/              # layout.tsx + page.tsx
│   │   ├── contact/            # layout.tsx + page.tsx
│   │   ├── insights/           # layout.tsx + page.tsx + [slug]/(InsightDetail, page)
│   │   ├── privacy/            # page.tsx
│   │   ├── services/           # layout.tsx + page.tsx
│   │   ├── terms/              # page.tsx
│   │   ├── websites/           # layout.tsx + page.tsx (24-Hour Studio)
│   │   └── work/               # layout.tsx + page.tsx + [slug]/(CaseStudyDetail, page)
│   ├── components/
│   │   ├── home/               # Homepage section components
│   │   │   ├── Hero.tsx, HeroBlobBackground.tsx, ScrollBlob.tsx
│   │   │   ├── TrustedBy.tsx, Services.tsx, CaseStudies.tsx
│   │   │   ├── WhyChooseUs.tsx, HowItWorks.tsx, Testimonials.tsx
│   │   │   ├── LatestInsights.tsx, TechStackMarquee.tsx, CTA.tsx, Footer.tsx
│   │   │   ├── illustrations/  # AINative, Resilience, Velocity, ZeroBloat + index
│   │   │   ├── mockups/        # 10 mockup components + index barrel
│   │   │   └── process/        # ProcessBento, ProcessStepper, ProcessTimeline,
│   │   │                       # processData, index
│   │   ├── layout/             # Navbar.tsx, Footer.tsx (site-wide)
│   │   ├── shared/             # CountUp, CursorFollower, CursorFollowerWrapper, JsonLd
│   │   ├── remotion/           # CaseStudyReel.tsx, WebsiteShowcase.tsx
│   │   ├── HybridBackgroundWrapper.tsx
│   │   └── PageParticlesWrapper.tsx
│   └── data/
│       ├── case-studies.ts     # CaseStudy[], CATEGORIES, WORK_SECTION_META, helpers
│       └── insights.ts         # InsightPost[], getInsight()
├── CLAUDE.md                   # ← This file
├── next.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## Hard Rules

### 1. Rendering Strategy
- **Every page and component is client-side** — 54 of 54 component files use `"use client"`.
- Sub-route `layout.tsx` files are the **only server components** — they export `Metadata` and return `{children}`.
- Do NOT add `"use server"` directives or server actions. The site is purely client-rendered with static metadata.

### 2. Dynamic Imports for Heavy Modules
- All Three.js / R3F components **must** be dynamically imported with `{ ssr: false }`.
- Pattern: wrapper component in `src/components/` uses `next/dynamic` to import from `src/3d/`.
- Examples: `PageParticlesWrapper`, `HybridBackgroundWrapper`, `CursorFollowerWrapper`.
- The Hero component also uses `dynamic()` for `HybridBackground` directly.

### 3. Fonts
- **Primary**: `Plus_Jakarta_Sans` (Google Fonts) → CSS variable `--font-sans`
- **Mono**: `JetBrains Mono` (local, `public/font/`) → CSS variable `--font-jetbrains-mono`
- Applied via `font-sans` utility class on `<body>`. Mono used for stats, clocks, code.

### 4. Styling
- **Tailwind CSS v4** with `@tailwindcss/postcss`. No `tailwind.config.ts` — uses `@theme inline` in `globals.css`.
- Inline `style={{}}` is used deliberately for gradients, noise textures, and accent colors from data.
- No CSS modules. No styled-components. No external CSS files beyond `globals.css`.

### 5. Animation Approach
- **Framer Motion** for entrance animations, stagger containers, `useInView` triggers, and `AnimatePresence`.
- **CSS keyframes** in `globals.css` for continuous/ambient animations (blob spin, morph, drift, pulse, marquee).
- **GSAP** available but secondary — used selectively alongside Framer Motion.
- Standard ease curve: `[0.22, 1, 0.36, 1]` (used across all components).

### 6. Component File Order Convention
Components follow this internal structure:
```
1. "use client"
2. Imports (React → Next → framer-motion → lucide-react → local)
3. Type definitions (interfaces)
4. Constants / data arrays
5. Helper sub-components (if any)
6. Default export (main component)
```

### 7. Data Layer
- **No CMS, no database, no API routes** — all content is in TypeScript data files under `src/data/`.
- `case-studies.ts`: typed `CaseStudy[]` with categories, work sections, homepage flags.
- `insights.ts`: typed `InsightPost[]` with inline markdown body strings.
- Helper functions (`getCaseStudy`, `getInsight`, `getHomepageCaseStudies`, etc.) are co-located.

### 8. SEO Pattern
- Root `layout.tsx` defines global `Metadata` with `metadataBase`, OpenGraph, Twitter cards.
- Each route has a `layout.tsx` that exports page-specific `Metadata` (title, description, canonical).
- Dynamic routes (`[slug]`) generate metadata in their `page.tsx` using `generateMetadata`.
- `robots.ts` and `sitemap.ts` at app root for crawler directives.
- `JsonLd` component rendered in root layout for structured data.

### 9. Icons
- **Only `lucide-react`** for icons. Do not introduce other icon libraries.
- Social icons (LinkedIn, X, GitHub) are inline SVGs in the Footer component.

### 10. Image Handling
- `next.config.ts` enables `image/avif` and `image/webp` formats.
- Case study screenshots stored in `public/proofs/{ClientName}/`.
- Use `next/image` for all images.

### 11. Security Headers
Configured in `next.config.ts`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 12. TypeScript
- `strict: true` in `tsconfig.json`.
- Path alias: `@/*` → `./src/*`.
- Target: `ES2017`, module resolution: `bundler`.

---

## Color Tokens & Palette

### CSS Custom Properties (globals.css)
```css
--background: #000000
--foreground: #ededed
--color-background: var(--background)
--color-foreground: var(--foreground)
--font-sans: var(--font-sans)
--font-mono: var(--font-jetbrains-mono)
```

### Core Brand Colors (used across components via Tailwind classes)
| Token / Class              | Hex / RGBA                    | Usage                              |
|---------------------------|-------------------------------|------------------------------------|
| `bg-black` / `#000000`    | `#000000`                     | Page background, base              |
| `text-white`              | `#ffffff`                     | Primary text, headings             |
| `text-zinc-400`           | `#a1a1aa`                     | Body text, descriptions            |
| `text-zinc-500`           | `#71717a`                     | Secondary text, labels             |
| `text-zinc-600`           | `#52525b`                     | Tertiary text, eyebrows            |
| `text-zinc-700`           | `#3f3f46`                     | Footer links                       |
| `violet-400`              | `#a78bfa`                     | Active nav indicator glow          |
| `violet-500`              | `#8b5cf6`                     | Primary accent, gradients, borders |
| `violet-600`              | `#7c3aed`                     | Gradient midpoints, blob layers    |
| `violet-950`              | hover states                  | Dark violet hover backgrounds      |
| `indigo-300`              | `#a5b4fc`                     | Banner link hover                  |
| `indigo-400`              | `#818cf8`                     | Gradient text endpoints            |
| `indigo-600`              | `#4f46e5`                     | CTA gradient, blob layers          |
| `purple-400`              | `#c084fc`                     | Hero gradient text endpoint        |

### Accent Colors (case studies — stored as RGB triplets)
```
"109,40,217"   — deep violet  (NextLex, default)
"79,70,229"    — indigo       (Ali Wali)
"99,102,241"   — lighter indigo (PrimeMark, SaaS Analytics, Aggadoo)
"139,92,246"   — violet       (Ops Dashboard, MallBuddy)
"14,165,233"   — sky blue     (Truck Adda)
"34,197,94"    — green        (Tree Tracker, New Leaf)
"234,88,12"    — orange       (Buff Dudes)
"168,85,247"   — purple       (Muraqaba)
"244,63,94"    — rose         (SwapFans)
"236,72,153"   — pink         (FaceBloom)
"245,158,11"   — amber        (Win the Day)
"6,182,212"    — cyan         (CoolingOnDemand)
"249,115,22"   — orange       (TableTapp)
```

### Blob / Gradient Colors (globals.css layers)
```
rgba(139,92,246,*)   — violet (primary blob color)
rgba(99,102,241,*)   — indigo
rgba(14,165,233,*)   — sky/cyan
rgba(124,58,237,*)   — purple
rgba(79,70,229,*)    — deep indigo
rgba(109,40,217,*)   — deep violet
#3b1066              — dark purple (conic gradient base)
#5b21b6              — violet-800
#7c3aed              — violet-600
#3730a3              — indigo-800
#4f46e5              — indigo-600
#6366f1              — indigo-500
```

---

## CSS Keyframes (globals.css)

| Keyframe           | Duration | Purpose                                   |
|--------------------|----------|-------------------------------------------|
| `blobSpin`         | 10–25s   | Clockwise rotation for blob layers        |
| `blobMorph`        | 20s      | 6-stage organic border-radius morph       |
| `blobPulse`        | 25s      | Halo scale + opacity breathe              |
| `shimmerPulse`     | 32s      | Inner shimmer opacity + scale             |
| `blobDrift`        | 25s      | Mesh gradient layer drift                 |
| `blobDriftAlt`     | 30s      | Secondary blob offset path                |
| `violet-pulse`     | —        | WhyChooseUs card border glow              |
| `mesh-drift`       | 9s       | Orb A drift (WhyChooseUs)                 |
| `mesh-drift-b`     | 11s      | Orb B drift (WhyChooseUs)                 |
| `scan-down`        | 4s       | Case study SVG scan line                  |
| `grid-pulse`       | 3s       | Case study grid opacity pulse             |
| `node-ping`        | 2.4s     | Case study node scale ping                |
| `dash-flow`        | 2s       | Case study dashed line flow               |
| `tb-marquee-scroll`| 35s      | Tech stack marquee infinite scroll        |
| `cursor-blink`     | —        | Code editor / chat cursor blink           |

---

## Layout Composition (Root layout.tsx)

```
<html lang="en" className="dark">
  <body className="bg-black text-white antialiased font-sans">
    <JsonLd />                              ← Structured data (SEO)
    <div.relative.min-h-screen.bg-black>
      <div.relative.z-10.bg-black>
        <div.absolute.inset-0.z-0>          ← Background layer
          <div.sticky.top-0.h-screen>       ← Sticky fullscreen particle canvas
            <PageParticlesWrapper />         ← Dynamic import (SSR: false)
          </div>
        </div>
        <div.relative.z-10>                 ← Content layer (above particles)
          <Navbar />
          {children}                        ← Page content
        </div>
      </div>
      <Footer />                            ← Fixed-position reveal footer (z-0)
      <CursorFollower />                    ← Custom cursor (dynamic import)
    </div>
  </body>
</html>
```

### Rendering Layers (z-index stack)
1. **z-0**: `PageParticlesWrapper` — sticky full-screen Three.js particle field
2. **z-0**: `Footer` — fixed at bottom, revealed as user scrolls past content
3. **z-10**: Main page content — solid `bg-black` sections that scroll over footer
4. **z-50**: `Navbar` — absolute at top, transitions to fixed floating pill on scroll

### Footer Reveal Mechanism
- Footer is `position: fixed; bottom: 0; z-index: 0`.
- A spacer `div` with `height: var(--footer-height)` is placed above the footer.
- Page content (`z-10`) scrolls up to reveal the footer underneath.
- A violet gradient hairline separates scrolling content from the footer reveal.

---

## Homepage Section Order

```
1. Hero              — Full-screen with 3D HybridBackground + CSS blob + headline
2. TrustedBy         — Social proof / client logos
3. Services          — 6 service cards with interactive mockups
4. CaseStudies       — Featured case study cards (filtered by homepageFeatured)
5. CTA               — Final call-to-action with ambient glow
6. [Footer reveal]   — Scrolls into view beneath content
```

---

## Routes

| Path                | Page            | Layout Metadata |
|---------------------|-----------------|-----------------|
| `/`                 | Homepage        | Root layout     |
| `/services`         | Services        | Yes             |
| `/websites`         | 24-Hour Studio  | Yes             |
| `/work`             | Case Studies    | Yes             |
| `/work/[slug]`      | Case Study      | Dynamic         |
| `/insights`         | Blog listing    | Yes             |
| `/insights/[slug]`  | Blog post       | Dynamic         |
| `/about`            | About / Team    | Yes             |
| `/contact`          | Contact form    | Yes             |
| `/privacy`          | Privacy Policy  | —               |
| `/terms`            | Terms of Service| —               |

---

## Navbar Behavior

Three states based on scroll position:
- **`top`** (y < 50): Absolute, full-width, transparent background
- **`hidden`** (50 ≤ y < 600): Slides up and fades out
- **`pill`** (y ≥ 600): Fixed, max-w-5xl, rounded-full, glass-morphism background

Includes:
- Announcement banner (auto-dismisses after 8s, hidden on `/websites`)
- Desktop nav links with active indicator (violet underline + glow)
- Mobile hamburger → animated slide-down drawer
- `force-hide-navbar` custom event support

---

## Agent Skills

| Skill                         | Purpose                                               |
|-------------------------------|-------------------------------------------------------|
| `api-security-best-practices` | API security patterns and hardening                   |
| `auth-implementation-patterns`| Authentication implementation guidance                |
| `brainstorming`               | Structured ideation → validated design (no coding)    |
| `concise-planning`            | Generate atomic action-item checklists for tasks      |
| `frontend-design`             | Frontend design patterns and decisions                |
| `git-pushing`                 | Git push workflow guidance                            |
| `lint-and-validate`           | Linting and validation workflows                      |
| `nextjs-best-practices`       | Next.js patterns, App Router, performance             |
| `react-best-practices`        | React component patterns and hooks                    |
| `seo-audit`                   | SEO analysis and optimization                         |
| `systematic-debugging`        | Structured debugging methodology                      |
| `tailwind-patterns`           | Tailwind CSS patterns and utilities                   |
| `test-driven-development`     | TDD workflows and testing strategy                    |

---

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Key Patterns to Preserve

1. **Noise texture overlay** — SVG `feTurbulence` filter inlined as data URIs across Hero, Banner, CTA sections. Do not replace with image files.
2. **Accent color as RGB triplet** — Case studies store `accentColor` as `"r,g,b"` strings, used in `rgba(${accentColor}, opacity)` template literals. Do not convert to hex.
3. **Barrel exports** — `src/3d/index.ts`, `mockups/index.ts`, `illustrations/index.ts`, `process/index.ts` all use barrel re-exports.
4. **Consistent ease** — `[0.22, 1, 0.36, 1]` is the project standard cubic-bezier. Stored as `const EASE` in components.
5. **Section comment headers** — Components use `/* ─── Section Name ────── */` separator comments. Maintain this style.
6. **`will-change: transform`** — Applied to all animated blob layers for GPU compositing.
7. **`prefers-reduced-motion`** — Blob animations respect reduced motion media query in `globals.css`.
