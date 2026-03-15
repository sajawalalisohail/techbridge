import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { PageParticlesWrapper } from "@/components/PageParticlesWrapper";
import CursorFollower from "@/components/shared/CursorFollowerWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = localFont({
  src: "../../public/font/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techbridge.dev"),
  title: {
    default: "TechBridge | Premium Software & AI Engineering",
    template: "%s — TechBridge",
  },
  description:
    "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
  keywords: [
    "custom software development",
    "AI automation",
    "SaaS development",
    "enterprise engineering",
    "TechBridge",
    "web application development",
    "API integration",
  ],
  authors: [{ name: "TechBridge" }],
  creator: "TechBridge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techbridge.dev",
    siteName: "TechBridge",
    title: "TechBridge | Premium Software & AI Engineering",
    description:
      "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBridge | Premium Software & AI Engineering",
    description:
      "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
  },
  alternates: {
    canonical: "https://techbridge.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} bg-[var(--surface-0)] text-white antialiased font-sans`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        <JsonLd />
        <div className="relative min-h-screen bg-[var(--surface-0)] w-full">
          <div className="relative w-full z-10 bg-[var(--surface-0)]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                <PageParticlesWrapper />
              </div>
            </div>

            <div className="relative z-10 w-full">
              <Navbar />
              {children}
            </div>
          </div>

          <Footer />
          <CursorFollower />
        </div>
      </body>
    </html>
  );
}
