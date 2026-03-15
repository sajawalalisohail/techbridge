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
            "We map your architecture, business logic, and success metrics before writing a single line of code. Skipping this is how you end up rewriting everything in six months.",
        tags: ["Stakeholder Workshops", "Technical Scoping", "Architecture Design"],
        Mockup: ArchitectureBlueprintMockup,
    },
    {
        number: "02",
        icon: Code2,
        label: "Core Engineering",
        description:
            "We build your system. Clean code, documented APIs, proper abstractions. The kind of codebase your next hire can actually onboard into without a Rosetta Stone.",
        tags: ["Full-Stack Development", "API Design", "QA & Testing"],
        Mockup: CodeEditorMockup,
    },
    {
        number: "03",
        icon: BrainCircuit,
        label: "AI & Automation",
        description:
            "We find the parts of your operation where humans are doing copy-paste work a machine should handle, and we automate those first. Highest ROI, lowest risk.",
        tags: ["AI Workflow Design", "LLM Integration", "Process Automation"],
        Mockup: AIProcessingMockup,
    },
    {
        number: "04",
        icon: Rocket,
        label: "Launch & Deployment",
        description:
            "Your system goes live with monitoring, error tracking, and a deployment pipeline. Not a zip file and a prayer. Real users, real feedback, from day one.",
        tags: ["MVP Launch", "Performance Budgets", "Conversion Architecture"],
        Mockup: DeploymentSuccessMockup,
    },
];

/* ─── Shared Animation Constants ─────────────────────────── */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Section Header Data ────────────────────────────────── */
export const SECTION_HEADER = {
    eyebrow: "how it actually works",
    heading: "Four phases.",
    headingAccent: "No surprises.",
    subtitle:
        "We don't start coding on day one. Here's what actually happens between 'yes' and 'deployed.'",
};
