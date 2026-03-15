"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Kills all GSAP ScrollTrigger instances on route change.
 * Prevents "removeChild" errors caused by ScrollTrigger pin reparenting
 * conflicting with React's DOM reconciliation during client navigation.
 */
export default function ScrollTriggerCleanup() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Kill all ScrollTrigger instances from the previous page
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return null;
}
