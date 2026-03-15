"use client";

import { ProcessStepper, ProcessBento, ProcessTimeline, ProcessScroll } from "./process";

/* ─── Main Export ────────────────────────────────────────── */
interface HowItWorksProps {
    variant?: "stepper" | "bento" | "timeline" | "scroll";
}

export default function HowItWorks({ variant = "timeline" }: HowItWorksProps) {
    switch (variant) {
        case "stepper":
            return <ProcessStepper />;
        case "bento":
            return <ProcessBento />;
        case "timeline":
            return <ProcessTimeline />;
        case "scroll":
            return <ProcessScroll />;
    }
}
