# CLAUDE.md — TechBridge Premium Website

> ## Reference Files (read when relevant to the task)
> - [`docs/skills.md`](docs/skills.md) — Required technical expertise
> - [`docs/agent-instructions.md`](docs/agent-instructions.md) — Visual standards, R3F rules, UI/UX rules, code quality rules
> - [`docs/component-patterns.md`](docs/component-patterns.md) — Section wrappers, glass cards, CTAs, hairlines, animations
> - [`docs/content-guide.md`](docs/content-guide.md) — Brand voice, heading formulas, eyebrow labels, overused words, tone zones

---

## Identity

**TechBridge** — Premium marketing site for a B2B software & AI engineering agency.
- **Design:** Dark-mode-first · deep-space blacks · violet/indigo accent glows · glassmorphism · spring-physics micro-animations
- **Proof-as-product:** Remotion video, React Three Fiber 3D, cinematic scroll interactions demonstrate engineering depth
- **Stack:** Next.js 16 App Router · React 19 · TypeScript 5 · Tailwind CSS v4 · Framer Motion 12 · GSAP · R3F · Remotion
- **Fonts:** Plus Jakarta Sans (`--font-sans`) · JetBrains Mono (`--font-jetbrains-mono`, local)
- **Global easing:** `[0.22, 1, 0.36, 1]` — referenced everywhere as `EASE`

---

## Folder Structure

```
src/
├── app/                    # App Router pages + globals.css
│   ├── layout.tsx          # Root shell: fonts, Navbar, Footer, PageParticles
│   ├── page.tsx            # Homepage (/)
│   ├── about/page.tsx      # /about
│   ├── contact/page.tsx    # /contact
│   ├── services/page.tsx   # /services
│   ├── websites/page.tsx   # /websites (24-Hr Studio, ~1361 LOC)
│   └── work/page.tsx       # /work
├── components/
│   ├── home/               # Homepage sections: Hero, Services, HowItWorks, WhyChooseUs, TechStackMarquee, CaseStudies, CTA
│   ├── layout/             # Navbar.tsx, Footer.tsx (persistent)
│   └── remotion/           # CaseStudyReel.tsx, WebsiteShowcase.tsx
├── 3d/                     # R3F layer: HybridBackground, PageParticles, blobs, camera
└── lib/                    # Shared utilities

docs/                       # Deep-reference documentation
├── skills.md
├── agent-instructions.md
├── component-patterns.md
└── content-guide.md
```

---

## Layout Composition

```
<html lang="en" className="dark">
  <body>
    <div className="relative min-h-screen">
      <!-- z-0: Sticky particle background (R3F via PageParticlesWrapper, ssr:false) -->
      <!-- z-10: Navbar + {children} -->
    </div>
    <Footer />  <!-- fixed bottom, reveal-on-scroll -->
  </body>
</html>
```

---

## Rendering Layers

1. **WebGL (z:0)** — `PageParticles` (floating particle field) + `HybridBackground` (gradient blobs, bloom, interactive camera)
2. **CSS Animation** — `HeroBlobBackground` (conic-gradient morphing, `mix-blend-mode: screen`, blur). Global keyframes: marquee, mesh-drift, scan-line, violet-pulse
3. **DOM/React (z:10)** — Framer Motion (`useScroll`, `useTransform`, `useSpring`, `useInView`, `AnimatePresence`) + GSAP scroll timelines

---

## Hard Rules

- **Section padding:** `py-32 lg:py-44` (standard) or `py-28 lg:py-36` (lighter)
- **Content max-width:** `mx-auto max-w-[90rem] px-6 lg:px-16` — never deviate
- **Decorative elements:** Always `aria-hidden="true"` + `pointer-events-none`
- **Animations play once:** `useInView` always `{ once: true }`
- **Variant names:** Always `hidden` / `show` — never `visible` or `initial`
- **y offsets:** 20–40px only. Duration: 0.5–1.0s only. Stagger: 0.1–0.13
- **Heading line-height:** `leading-tight` for h2, `leading-snug` for h3 — never mix
- **CTAs:** Always `rounded-full`, always `group` class, always shimmer sweep
- **Dynamic imports:** All R3F + Remotion → `next/dynamic` with `{ ssr: false }`
- **Data arrays:** UPPERCASE at module scope, never inside components
- **Path alias:** `@/*` → `./src/*`
- **No tailwind.config:** Tailwind v4 CSS-first config via `@theme inline` in `globals.css`

---

## File Order Convention

```
1.  "use client";
2.  React imports
3.  Next.js imports
4.  Framer Motion imports
5.  Lucide imports
6.  Internal imports (@/...)
7.  /* ─── Types ─── */
8.  /* ─── Data ─── */
9.  /* ─── Animation variants ─── */
10. /* ─── Sub-components ─── */
11. /* ─── Main Export ─── */
```

---

## Key Color Tokens

| Token | Role |
|---|---|
| `text-white` / `text-zinc-400` / `text-zinc-500` / `text-zinc-600` | Heading → body → muted → eyebrow |
| `text-violet-400` / `text-violet-300` | Accent highlights, active pills |
| `bg-neutral-900/40` / `border-white/8` | Card base |
| `border-white/15` / `border-white/20` | Hover borders |
| `border-violet-500/30` | Accent / highlighted borders |
| `from-violet-600 to-indigo-600` | Primary gradient CTA |
| `from-violet-400 to-indigo-400` | Gradient text accent |

---

## Comment Style

```tsx
/* ─── Section Name ───────────────────────────────────────── */     // component sections
{/* ── Sub-section Label ── */}                                      // inline JSX

/* ══════════════════════════════════════════════════════════
   STEP 1 — HERO                                                    // multi-section page files
══════════════════════════════════════════════════════════ */
```

---

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (Core Web Vitals + TS)
```
