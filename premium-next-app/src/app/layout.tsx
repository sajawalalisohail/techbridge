import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { PageParticlesWrapper } from "@/components/PageParticlesWrapper";
import CursorFollower from "@/components/shared/CursorFollowerWrapper";

const satoshi = localFont({
  src: [
    {
      path: "../../public/font/satoshi/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../public/font/satoshi/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  weight: "300 900",
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
    images: [{ url: "https://techbridge.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBridge | Premium Software & AI Engineering",
    description:
      "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
    images: ["https://techbridge.dev/og-image.png"],
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
        className={`${satoshi.variable} bg-[var(--surface-0)] text-white antialiased font-sans`}
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
