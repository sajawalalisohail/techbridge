import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
        className={`${geistSans.variable} ${jetbrainsMono.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
