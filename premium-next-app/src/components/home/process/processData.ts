import { Search, Code2, BrainCircuit, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import {
    ArchitectureBlueprintMockup,
    CodeEditorMockup,
    AIProcessingMockup,
    DeploymentSuccessMockup,
} from "@/components/home/mockups";

/* ─── Types ──────────────────────────────────────────────── */
export interface Phase {
    number: string;
    icon: LucideIcon;
    label: string;
    description: string;
    tags: string[];
    Mockup: ComponentType;
}

/* ─── Data ───────────────────────────────────────────────── */
export const PHASES: Phase[] = [
    {
        number: "01",
        icon: Search,
        label: "Discovery & Blueprinting",
        description:
            "We map your architecture, business logic, and success metrics before writing a single line of code. This phase eliminates costly re-work and ensures every engineering decision is deliberate.",
        tags: ["Stakeholder Workshops", "Technical Scoping", "Architecture Design"],
        Mockup: ArchitectureBlueprintMockup,
    },
    {
        number: "02",
        icon: Code2,
        label: "Core Engineering",
        description:
            "Building your custom software, SaaS platform, or internal tools using modern, scalable stacks. Clean code, proper abstractions, and thorough documentation - always.",
        tags: ["Full-Stack Development", "API Design", "QA & Testing"],
        Mockup: CodeEditorMockup,
    },
    {
        number: "03",
        icon: BrainCircuit,
        label: "AI & Automation Integration",
        description:
            "Implementing intelligent workflows that reduce overhead and scale operations. We identify the highest-leverage automation opportunities and execute with precision.",
        tags: ["AI Workflow Design", "LLM Integration", "Process Automation"],
        Mockup: AIProcessingMockup,
    },
    {
        number: "04",
        icon: Rocket,
        label: "Launch & Deployment",
        description:
            "MVPs and premium web presences launched in record time to establish immediate ROI and create a feedback loop with real users - not assumptions.",
        tags: ["MVP Launch", "Performance Budgets", "Conversion Architecture"],
        Mockup: DeploymentSuccessMockup,
    },
];

/* ─── Shared Animation Constants ─────────────────────────── */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Section Header Data ────────────────────────────────── */
export const SECTION_HEADER = {
    eyebrow: "Our Process",
    heading: "From Concept to",
    headingAccent: "Scalable Architecture",
    subtitle:
        "A four-phase methodology that turns ambiguity into precision-engineered systems - on time, every time.",
};
