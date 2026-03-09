import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "24-Hour Websites | Premium Web Presence",
    description: "Launch a custom-coded, performance-optimized website in 24 hours. No templates. No shortcuts.",
};

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
