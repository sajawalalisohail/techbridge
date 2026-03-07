import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageParticlesWrapper } from "@/components/PageParticlesWrapper";

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
  title: "TechBridge | Premium Software & AI Engineering",
  description:
    "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} bg-black text-white antialiased font-sans`}
      >
        <div className="relative min-h-screen bg-black w-full">
          <div className="relative w-full z-10 bg-black">
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
        </div>
      </body>
    </html>
  );
}
