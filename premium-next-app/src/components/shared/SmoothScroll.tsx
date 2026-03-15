"use client";

import { useEffect, useRef } from "react";

/**
 * Initializes Lenis smooth scroll + GSAP ScrollTrigger sync as a side-effect.
 * Does NOT wrap children — just mounts as an empty component in the layout.
 * This avoids hydration mismatches and removeChild errors during client navigation.
 */
export default function SmoothScroll() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Dynamically import Lenis + GSAP to keep them client-only
    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisModule, gsapModule, stModule]) => {
      const Lenis = lenisModule.default;
      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      // Sync Lenis scroll position with ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's unified ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });
  }, []);

  return null;
}
