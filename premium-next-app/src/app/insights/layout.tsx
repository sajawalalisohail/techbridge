import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights | Engineering Blog",
    description: "Architecture decisions, engineering lessons, and hard-won patterns from shipping production systems for B2B enterprises.",
    alternates: { canonical: "/insights" },
    openGraph: {
        title: "Insights | Engineering Blog — TechBridge",
        description: "Architecture decisions, engineering lessons, and hard-won patterns from shipping production systems for B2B enterprises.",
        url: "https://techbridge.dev/insights",
    },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
