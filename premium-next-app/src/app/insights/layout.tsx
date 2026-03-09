import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights | Engineering Blog",
    description: "Architecture decisions, engineering lessons, and hard-won patterns from shipping production systems for B2B enterprises.",
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
