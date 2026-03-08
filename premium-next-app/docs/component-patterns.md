# Component Patterns & Coding Conventions

> Deep reference extracted from CLAUDE.md. For project identity and rules, see [CLAUDE.md](../CLAUDE.md).
> For brand voice and copy rules, see [Content Guide](./content-guide.md).

---

## Component Patterns

This section documents every recurring structural pattern extracted from the homepage components (`Hero`, `Services`, `HowItWorks`, `WhyChooseUs`, `TechStackMarquee`, `CaseStudies`, `CTA`). New components **must** follow these patterns for visual and structural consistency.

### Section Wrapper Pattern

Every homepage section follows this outer structure:

```tsx
<section
    id="section-id"          // kebab-case anchor ID
    ref={ref}                // for useInView / useScroll
    className="relative overflow-hidden py-28 lg:py-36"
>
    {/* Decorative layer: hairline + ambient glow */}
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(...)" }} />

    {/* Content container */}
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        {/* Section body (grid / timeline / etc.) */}
    </div>
</section>
```

**Key rules:**
- `relative overflow-hidden` on every `<section>`
- Vertical padding: `py-28 lg:py-36` (standard sections) or `py-20 lg:py-28` (lighter sections like CTA)
- Content container: `mx-auto max-w-7xl px-6 lg:px-12` — **never deviate** from this max-width and horizontal padding
- Decorative elements **always** get `aria-hidden="true"` + `pointer-events-none`

### Section Header Pattern (Eyebrow → H2 → Subtitle)

Every section header uses a three-part hierarchy:

```tsx
<motion.div className="mb-16 max-w-2xl lg:mb-20">
    {/* 1. Eyebrow */}
    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
        <span className="h-px w-6 bg-zinc-700" />
        Label Text
    </span>

    {/* 2. Heading */}
    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
        Main Heading{" "}
        <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Gradient Word
        </span>
    </h2>

    {/* 3. Subtitle */}
    <p className="mt-5 text-base leading-relaxed text-zinc-500 lg:text-lg">
        Supporting paragraph text.
    </p>
</motion.div>
```

**Eyebrow variations:**
- Left-aligned with single leading dash: `<span className="h-px w-6 bg-zinc-700" /> Label` (Services, HowItWorks, WhyChooseUs, CaseStudies)
- Center-aligned with double dashes: `<span className="h-px w-6 bg-zinc-700" /> Label <span className="h-px w-6 bg-zinc-700" />` (CTA, TechStackMarquee)
- Always: `font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600` (or `text-zinc-500`)

**Heading gradient variants:**
- White-to-gray: `bg-gradient-to-br from-white to-zinc-500` (HowItWorks, CaseStudies)
- Violet-to-indigo: `bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400` (Hero, CTA)
- Violet-to-indigo (bi-directional): `bg-gradient-to-br from-violet-400 to-indigo-400` (WhyChooseUs)

### Glass Card Pattern

Cards across Services, HowItWorks, and WhyChooseUs share this exact structure:

```tsx
<motion.div
    variants={cardVariants}
    className="group relative overflow-hidden rounded-2xl border border-white/8 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/15 lg:p-8"
>
    {/* 1. Hover glow overlay */}
    <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accentGradient }}
    />

    {/* 2. Content with z-10 */}
    <div className="relative z-10 flex h-full flex-col">
        {/* Icon box */}
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 group-hover:border-white/20 group-hover:text-white transition-colors duration-300">
            <Icon size={20} strokeWidth={1.5} />
        </div>

        {/* Eyebrow label */}
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
            {eyebrow}
        </p>

        {/* Card title */}
        <h3 className="mb-3 text-lg font-semibold leading-snug text-white lg:text-xl">
            {title}
        </h3>

        {/* Card description */}
        <p className="flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
            {description}
        </p>

        {/* Optional: "Learn more" link or footer */}
    </div>
</motion.div>
```

**Card anatomy rules:**
- Always `rounded-2xl`
- Border default: `border-white/8`, hover: `hover:border-white/15`
- Background: `bg-neutral-900/40` or `bg-neutral-900/50` with `backdrop-blur-sm`
- Group hover class on the root for child transitions
- Icon containers: `rounded-xl border border-white/10 bg-white/5`
- Icon sizing: `size={20} strokeWidth={1.5}` (standard), `size={22} strokeWidth={1.5}` (large cards)
- All transition durations: `duration-300` (color changes), `duration-500` (structural/opacity), `duration-700` (complex multi-property)

### Hover Glow Pattern

Every interactive element has a radial glow that fades in on hover:

```tsx
{/* Pre-mounted but invisible — fades in via group-hover */}
<div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 100%)" }}
/>
```

The glow is **always pre-mounted** (not conditionally rendered) to avoid layout shifts. Opacity transitions from `0 → 1` on `group-hover`.

### CTA Button Patterns

**Primary CTA (solid):**
```tsx
<Link
    href="/contact"
    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
>
    <span className="relative z-10">Button Label</span>
    <svg className="relative z-10 h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5" ...>
        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
    {/* Shimmer sweep */}
    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
</Link>
```

**Primary CTA variant (gradient fill, used in CTA section):**
```tsx
className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(109,40,217,0.35)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(109,40,217,0.55)]"
```

**Secondary CTA (ghost):**
```tsx
className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:text-white hover:shadow-[0_0_24px_rgba(109,40,217,0.2)]"
```

**Text link CTA:**
```tsx
className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
```

**Common CTA rules:**
- Always `rounded-full`
- Always include `group` class for child hover effects
- Arrow icon: `translate-x-0 → group-hover:translate-x-0.5` or `group-hover:translate-x-1`
- SVG arrow path: `M17 8l4 4m0 0l-4 4m4-4H3` (used everywhere)
- Shimmer sweep: `absolute inset-0 -translate-x-full → group-hover:translate-x-full` with `via-white/20` or `via-white/30`

### Hairline Separator Pattern

Thin gradient lines used to visually separate sections:

```tsx
{/* Top of section */}
<div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
/>

{/* Inline between content blocks */}
<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

{/* Bottom border glow (page.tsx) */}
<div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
    style={{
        background: 'linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 70%, rgba(139,92,246,0) 100%)',
        boxShadow: '0 0 20px 4px rgba(109,40,217,0.25)',
    }}
/>
```

### Tag / Pill Pattern

Tags appear in HowItWorks, CaseStudies, and across the `/work` route:

```tsx
<span className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500">
    {tag}
</span>
```

Active/highlighted state:
```tsx
className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
```

Code-style tags (CaseStudies):
```tsx
<span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
    {"//"}  {tag}
</span>
```

### Noise Texture Overlay Pattern

An SVG-based noise dithering layer used in Hero and CTA:

```tsx
<div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity: 0.55,
        mixBlendMode: "overlay",
    }}
/>
```

### Stagger Animation Pattern

Container/children pattern used for grid reveals:

```tsx
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,   // 0.1–0.13 range
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 36 },   // y: 24–40 range
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },  // 0.7–0.8 range
    },
};
```

Applied via:
```tsx
<motion.div
    variants={containerVariants}
    initial="hidden"
    animate={isInView ? "show" : "hidden"}
>
    {items.map(item => (
        <motion.div key={item.id} variants={childVariants}>
            ...
        </motion.div>
    ))}
</motion.div>
```

### InView Trigger Pattern

Every section uses `useInView` with consistent settings:

```tsx
const ref = useRef<HTMLElement>(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });
// or for headers:
const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
```

The `once: true` flag is **always** set — animations play once and never reverse. Negative margin values range from `-60px` to `-100px`, triggering slightly before the element fully enters the viewport.

### Scroll-Linked Animation Pattern (CaseStudies, HowItWorks)

For scroll-scrubbed effects:

```tsx
const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],   // or ["start 50%", "end 50%"]
});

const opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);
const y = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [40, 0, 0, -40]);

// For spring-smoothed values:
const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
});
```

---

## Coding Conventions

### File Structure

Every component file follows this exact top-to-bottom order:

```
1.  "use client";                           // Always first line
2.  (blank line)
3.  React imports                           // useRef, useState, useEffect
4.  Next.js imports                         // Link, dynamic, usePathname
5.  Framer Motion imports                   // motion, useInView, useScroll, etc.
6.  Lucide icon imports                     // Named icon imports
7.  Internal component imports              // @/components/..., @/3d/...
8.  (blank line)
9.  /* ─── Types ─── */                     // TypeScript interfaces
10. (blank line)
11. /* ─── Data ─── */                      // Constant arrays (SERVICES, PHASES, etc.)
12. (blank line)
13. /* ─── Animation variants ─── */        // EASE const, container/child variants
14. (blank line)
15. /* ─── Sub-components ─── */            // Private helper components
16. (blank line)
17. /* ─── Main Export ─── */               // export default function SectionName()
```

### Comment Style

Section banners use **em-dash rulers** with a consistent format:

```tsx
/* ─── Section Name ───────────────────────────────────────── */
// For single-line inline comments:
{/* ── Sub-section Label ── */}
```

Page-level multi-section files (like `websites/page.tsx`) use **double-line box banners**:

```tsx
/* ══════════════════════════════════════════════════════════
   STEP 1 — HERO
══════════════════════════════════════════════════════════ */
```

### TypeScript Conventions

- **Interfaces above components:** Always define prop interfaces explicitly above the component, never inline.
- **`as const` on ease arrays:** Every `[0.22, 1, 0.36, 1]` literal uses `as const` to satisfy Framer Motion's strict tuple types.
- **Lucide `LucideIcon` type:** When storing icon references in data arrays, type them as `LucideIcon` from `lucide-react`.
- **Explicit ref types:** `useRef<HTMLElement>(null)`, `useRef<HTMLDivElement>(null)`, `useRef<PlayerRef>(null)`.
- **`Readonly<{ children: React.ReactNode }>` for layout props.**

### Tailwind Class Conventions

**Color palette (used across all components):**

| Token | Usage |
|---|---|
| `text-white` | Headings, primary content, active states |
| `text-zinc-300` | Subtitles in active/hover states |
| `text-zinc-400` | Body text, sub-headlines, secondary links |
| `text-zinc-500` | Descriptions, muted body text, default tags |
| `text-zinc-600` | Eyebrow labels, dimmed metadata |
| `text-zinc-700` | Very muted markers (TechStackMarquee labels) |
| `text-violet-400` | Accent highlights, active eyebrows, gradient text |
| `text-violet-300` | Active tag pill text |
| `bg-black` / `bg-neutral-900/40` / `bg-neutral-900/50` | Section and card backgrounds |
| `bg-neutral-950` | Input field backgrounds |
| `bg-violet-950/50` / `bg-violet-950/60` | Active icon container backgrounds |
| `border-white/5` / `border-white/8` / `border-white/10` | Default borders (ascending intensity) |
| `border-white/15` / `border-white/20` | Hover border states |
| `border-violet-500/30` / `border-violet-500/40` | Accent borders (active / highlighted) |

**Spacing tokens (consistent across all sections):**

| Token | Usage |
|---|---|
| `px-6 lg:px-12` | Horizontal content padding |
| `py-28 lg:py-36` | Standard section vertical padding |
| `py-20 lg:py-28` | Lighter section vertical padding (CTA, Marquee) |
| `mb-16 lg:mb-20` | Section header to body gap |
| `mb-4` / `mb-5` / `mb-6` | Element vertical spacing within cards |
| `mt-5` / `mt-6` / `mt-7` | Subtitle to content spacing |
| `mt-12` | CTA button block spacing |
| `gap-4` / `gap-5` | Grid gap (cards) |

**Typography scale:**

| Class | Usage |
|---|---|
| `text-[2.25rem] sm:text-4xl lg:text-5xl xl:text-[4.75rem]` | Hero h1 (largest) |
| `text-5xl sm:text-6xl lg:text-7xl xl:text-8xl` | CTA h2 (second largest) |
| `text-4xl lg:text-5xl xl:text-6xl` | Standard section h2 |
| `text-2xl lg:text-3xl` | Card h3 (WhyChooseUs, CaseStudies) |
| `text-lg lg:text-xl` | Card h3 (Services — smaller) |
| `text-base lg:text-lg` | Section subtitles |
| `text-sm` | Default body text, descriptions |
| `text-xs` | Eyebrow labels, tag pills, metadata |
| `text-[10px]` | Code-style tags in CaseStudies |
| `font-mono text-xs font-semibold uppercase tracking-widest` | Eyebrow class string (always this exact combination) |

**Heading pattern:**
- All headings: `font-bold leading-tight tracking-tight text-white`
- Cards/sub-headings: `font-semibold leading-snug text-white`
- `leading-tight` for h2s, `leading-snug` for h3s — **never mix these**

### Framer Motion Conventions

**Variant naming:**
- Container variants: `hidden` / `show`
- Never use `visible`, `initial`, `animate` as variant names — always `hidden`/`show`
- `initial="hidden"` and `animate={isInView ? "show" : "hidden"}` pattern

**Animation value ranges:**
- `y` offset: `24` (light), `32` (standard), `36`–`40` (heavy) — **never use values outside 20–40**
- `duration`: `0.7` (standard), `0.75` (cards), `0.8` (hero/CTA headings) — **never below 0.5 or above 1.0**
- `staggerChildren`: `0.1`–`0.13` — **never above 0.15**
- `delay`: Manual delays use `0.1` increments (e.g., `0.1`, `0.2`, `0.32`)

**Spring physics (for scroll-linked effects):**
```tsx
useSpring(value, { stiffness: 70, damping: 30, restDelta: 0.001 })
```

### Data Organization

- **Constant arrays are always UPPERCASE:** `SERVICES`, `STATS`, `PHASES`, `ADVANTAGES`, `CASE_STUDIES`, `STACK`, `NAV_LINKS`
- **Data lives at module scope, NOT inside components** — keeps render functions pure and re-render-safe
- **Each data item includes its own accent color** as a string property (e.g., `accentColor: "rgb(139,92,246)"`), never computed in JSX

### Accessibility

- All decorative elements: `aria-hidden="true"` + `pointer-events-none`
- All links with icons: `aria-label={descriptive text}`
- Mobile hamburger: `aria-label="Toggle menu"`
- Dismiss buttons: `aria-label="Dismiss banner"`
- Stat blocks use `<dl>`, `<dt>`, `<dd>` semantic elements
- SVG icons always have `fill="none"` and explicit `strokeWidth`

### Dynamic Imports

Browser-only components (R3F, Remotion) must be wrapped:

```tsx
const Component = dynamic(
    () => import("@/3d").then((mod) => mod.ComponentName),
    { ssr: false }
);
```

- Always use the barrel export from `@/3d` or direct `@/components/remotion/...`
- Client wrappers go in `src/components/` with a `Wrapper` suffix naming convention

### Inline Keyframes (Component-Scoped CSS)

When CSS keyframes are only needed by one component, inject them via `<style>`:

```tsx
const animationCSS = `
  @keyframes custom-effect {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%       { opacity: 0.85; transform: scale(1.06); }
  }
  .custom-effect { animation: custom-effect 5s ease-in-out infinite; }
`;

// Inside component:
<style dangerouslySetInnerHTML={{ __html: animationCSS }} />
```

Used in: `CTA.tsx`, `work/page.tsx`, `websites/page.tsx`, `contact/page.tsx`
