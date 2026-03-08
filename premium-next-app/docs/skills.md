# TechBridge Required Expertise & Skills

To work on this repository, developers must possess deep expertise across the following technologies:

## 🌐 Next.js 16 (React 19)
- **App Router:** Understanding Server and Client components.
- **Layout Management:** Utilizing conditional persistent `layout.tsx` strategies.

## 🎨 Advanced Frontend Animation & Styling
- **Framer Motion (`framer-motion`):** Proficient in `useTransform`, `useScroll`, `useMotionValueEvent`, `useSpring`, and `AnimatePresence`.
- **Tailwind CSS V4:** Familiarity with building robust, inline complex classes and integrating native CSS custom properties.
- **Scroll Hijacking/Smoothing:** Connecting Lenis or GSAP scroll synchronizations to deeply map scroll position over custom logic and component timelines.

## 🕹️ 3D Graphics
- **Three.js & React Three Fiber (`@react-three/fiber`):**
  - Building performant mathematical canvases.
  - Strict adherence to React Hooks parity (no pure mutations inside render).
  - Understanding BufferGeometry, PointsMaterials, Instancing, and Shaders.
- **Drei (`@react-three/drei`):** Utilizing camera and positioning helpers.

## 🎬 Programmatic Video Engineering
- **Remotion (`remotion` & `@remotion/player`):**
  - Constructing pure React-driven animated timelines instead of MP4 blobs.
  - Tying `useCurrentFrame` to complex inline interpolation logic for alpha blending, kinetic typography, and zooming.
  - Resolving aspect ratio layout bugs in the DOM by carefully synchronizing the `compositionWidth` and `compositionHeight`.

## 🛡️ Typing and Architecture
- **TypeScript:** Strict standard configurations mapping arrays, event types (Keyboard and custom DOM), and context objects cleanly.
- **Linting & Code Smells:** Fixing dependency arrays (`useEffect`, `useCallback`) and mitigating `react-hooks/exhaustive-deps`. Understanding impure DOM manipulations mapping over the render frame.
