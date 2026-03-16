import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work | Case Studies & Portfolio",
    description: "See how we've helped businesses scale with custom software, AI automation, and premium web platforms.",
    alternates: { canonical: "/work" },
    openGraph: {
        title: "Work | Case Studies & Portfolio — TechBridge",
        description: "See how we've helped businesses scale with custom software, AI automation, and premium web platforms.",
        url: "https://techbridge.dev/work",
    },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return children;
}
