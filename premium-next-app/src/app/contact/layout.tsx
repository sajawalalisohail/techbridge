import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Start Your Project",
    description: "Book a discovery call or send us a message. Talk directly to the senior engineers building your system.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
