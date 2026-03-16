import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "24-Hour Websites | Premium Custom Web Presence by TechBridge",
    description: "Launch a custom-coded, performance-optimized website in 24 hours. No templates, no shortcuts — engineered by senior developers for maximum conversion.",
    alternates: { canonical: "/websites" },
    openGraph: {
        title: "24-Hour Websites | Premium Custom Web Presence by TechBridge",
        description: "Launch a custom-coded, performance-optimized website in 24 hours. No templates, no shortcuts — engineered by senior developers for maximum conversion.",
        url: "https://techbridge.dev/websites",
    },
};

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
