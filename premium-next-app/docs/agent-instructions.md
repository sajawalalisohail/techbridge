# Agent & Contributor Instructions

When modifying or expanding the TechBridge Next.js Application, AI agents and developers must strictly adhere to the following guidelines:

## 1. Visual & Animation Standards
- **Premium Feel:** Prefer `useSpring` and `useTransform` mapped to scroll progress for structural shifts. Avoid jitter. Let items breathe with heavy damping and low stiffness on hover effects.
- **No Letterboxing:** When mixing 16:9 widescreen containers with programmatic video (Remotion), ensure the internal `Composition` matches the aspect ratio perfectly (e.g., `1920x1080`).

## 2. React Three Fiber (R3F) & WebGL Rules
- **Purity:** Never execute impure functions like `Math.random()` inside the React render cycle or deep inside a `useFrame` hook unless heavily restricted. Always compute random points/vectors inside a `useMemo` or a `useEffect` setup block.
- **Immutability:** Never directly mutate objects returned from hooks (e.g., mutating the `camera` object from `useThree`). Use `camera.position.set()` instead of direct primitive reassignment, or do modifications within standard R3F update patterns.

## 3. UI/UX Rules
- **Occlusion:** Modals and high-level overlays must be immersive. Always attach an effect that sets `document.body.style.overflow = "hidden"` and dispatches a global event (e.g., `force-hide-navbar`) to remove navigational distractions during the modal viewing.
- **Responsive:** Ensure mobile styling works gracefully. Hide complex navigational arrays on mobile and defer to the hamburger menu.
- **Typography:** Ensure `JetBrains Mono` maps uniquely to code blocks, metrics, and eyebrow components to contrast with modern Sans-Serif headings.

## 4. Code Quality
- All modifications must strictly use TypeScript.
