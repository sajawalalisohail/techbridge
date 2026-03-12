import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TechBridge | Senior Software Engineers & AI Specialists",
    description: "Meet the senior engineers at TechBridge who build enterprise-grade software, AI automation systems, and scalable SaaS platforms for growth-stage companies.",
    alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
