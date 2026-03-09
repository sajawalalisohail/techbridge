import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | The Team Behind TechBridge",
    description: "Meet the engineers who build enterprise-grade software, AI workflows, and scalable SaaS platforms at TechBridge.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
