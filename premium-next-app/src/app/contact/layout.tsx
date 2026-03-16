import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact TechBridge | Start Your Custom Software Project",
    description: "Book a discovery call or send us a message. Talk directly to senior engineers who will architect and build your custom software, AI, or SaaS solution.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact TechBridge | Start Your Custom Software Project",
        description: "Book a discovery call or send us a message. Talk directly to senior engineers who will architect and build your custom software, AI, or SaaS solution.",
        url: "https://techbridge.dev/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
