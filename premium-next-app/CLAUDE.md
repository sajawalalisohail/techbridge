# CLAUDE.md

> **AI System Prompt**: This document is the ultimate source of truth for all AI/LLM-assisted development (Claude, Gemini, Cursor). You must prioritize these rules over your general knowledge.

## 🏗️ Project Architecture & Tech Stack

**Core Stack**
- Framework: Next.js 16.1.6 (App Router)
- UI: React 19.2.3, Tailwind CSS v4 (@tailwindcss/postcss)
- 3D/Canvas: Three.js (v0.183), React Three Fiber (v9.5), Drei
- Animation: Framer Motion v12, GSAP v3.14, Lenis (smooth scroll)
- Content: React Markdown
- Media Tooling: Remotion, Puppeteer  

**Repo Structure**
- `src/app/` - Next.js routing, layouts, pages, global CSS and metadata.
- `src/components/` - Standard UI components, shared layouts, and icons.
- `src/3d/` - Specialized WebGL (particles, blobs, shaders, R3F scenes).
- `src/data/` - Typed JSON/TS content (case studies, insights).
- `src/lib/` - Shared utils (`brand-colors.ts` bridges CSS to 3D, GSAP config).
- `docs/` - Extended project knowledge and SEO infrastructure.
- `.agent/skills/` - Custom agent capacities and AI workflows.

---

## 🤖 AI Agent & Skills System

- **Skill Catalog Reference**: Use `.agent/skills/CATALOG.md` and `skills_index.json` to leverage existing routines before writing redundant scripts.
- **Workflow Constraints**: 
  1. Review `CLAUDE.md` and `docs/project-knowledge.md` before coding.
  2. Implement features following the Design System rigorously.
  3. Validate strictly against the Rendering constraints.
  4. Ensure NO hallucinations: Do not configure Tailwind v3 `tailwind.config.ts`, nor use CSS Modules unless explicitly noted.

---

## 🎨 Design System Consistency

The UI enforces a single unified token system spanning both the DOM and WebGL environments.

### 1. Brand Accent System
- **Source of Truth**: Token definitions are locked in `src/app/globals.css`. 
- **NEVER** hardcode lime hex/RGB literals in inline styles or classes. 
- **Tailwind v4 Integration**: Variables map automatically via `@theme inline`. Consume them directly (`text-brand-accent`, `bg-brand-accent-dark`, `border-brand-accent/40`).
- **3D / Shader Bridging**: Real-time rendering modules must dynamically fetch colors using `getBrandColors()` from `src/lib/brand-colors.ts`, feeding them into GLSL uniforms (e.g., `uBrandAccent`).
- **Data Exception**: Case studies (`src/data/`) possess individual thematic `accentColor` RGB strings. This is data-driven by design.

### 2. Typography & Layout Metrics
- **Font Family**: *Plus Jakarta Sans* (`next/font/google`).
- **Hero h1 Guidelines**: Usually `text-5xl font-bold leading-tight tracking-tight lg:text-7xl xl:text-7xl`.
- **Eyebrows**: Format strictly as `font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600`.
- **Spacing Guidelines**: Standard section padding is `py-24 lg:py-32`; tight layouts use `py-16 lg:py-20`.
- **Container Limits**: Max widths adhere to `max-w-[100rem]` (Homepage defaults) and `max-w-7xl` (Interior Routes). Prioritize testing mobile (320px) overflow bounds.

---

## 🧩 Component & Pattern Architecture

- **React Client vs Server Components**: 
  - All interactive UI and animated segments **must** explicitly use `"use client"`.
  - Static root shells and route `layout.tsx` files remain Server Components to maximize SEO performance. **Do not** introduce `"use server"` patterns unexpectedly.
- **Dynamic Imports Strategy**:
  - Heavy visual logic (`ServicesProcessShowcase`) and WebGL/3D packages **must** use `next/dynamic` with `{ ssr: false }` to avert severe main-thread impacts.
- **Global Layout Behavior**:
  - The root layout sets up persistent backgrounds, sticky canvases, and a dynamic footer reveal. New root nodes must accurately handle z-indexing contexts.
- **Static Artifacts**: Maintain inline SVG noise elements (`feTurbulence`) directly within the components to prevent FOUC or flicker problems.

---

## 🎬 Animation Rules (Framer / GSAP / CSS)

Use the correct orchestration layer for smooth 60-120fps metrics:
- **Framer Motion**: Default tool for mount/unmount presence, list reveals, scroll-into-view triggers.
  - Standard curve: `[0.22, 1, 0.36, 1]`.
- **GSAP**: Strictly reserved for complex choreographed scroll features (e.g., Horizontal Parallax / Horizontal Case Studies). Must be rigorously isolated inside `useLayoutEffect` or `gsap.context` for perfect unmount cleanup and DOM safety.
- **CSS Animations**: Infinite background movements (blobs, pulses) and computational loops (like `@property --glow-angle`) are kept in `globals.css` to offload the main thread.
- **A11y**: Enforce `prefers-reduced-motion` compliance to halt or minimize background ambient loops automatically.

---

## ⚡ Code Quality & Performance

- **Types**: Always uphold `strict: true` compliance. Output explicit interface types, particularly when bridging 3D math logic. Target imports using `@/`.
- **Hardware Acceleration**: DO NOT strip `will-change: transform` rules off components with computationally dense looping motions like morphing blobs.
- **Assets**:
  - Prefer `next/image` for standard web graphics.
  - Exclusively use `lucide-react` for app and UI iconography.

## 🛠️ Development Tools

```bash
npm run dev     # Run hot-reloading native development server
npm run build   # Production optimized build (Needs internet access for Google Fonts)
npm run lint    # ESLint static analysis suite
```
