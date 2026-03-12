import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Custom Software, AI Automation & SaaS Engineering",
    description: "Explore TechBridge's engineering services: custom software development, AI workflow automation, SaaS platforms, API integrations, and 24-hour rapid websites.",
    alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
