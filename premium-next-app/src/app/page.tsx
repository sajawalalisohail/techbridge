import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      {/* Hero is transparent, letting the sticky background show underneath */}
      <Hero />

      <TrustedBy />
      <Services />
      <CaseStudies />
      <CTA />

      {/* Subtle violet border glow separating the scrolling content from the reveal footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
        style={{
          background: 'linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 70%, rgba(139,92,246,0) 100%)',
          boxShadow: '0 0 20px 4px rgba(109,40,217,0.25)',
        }}
      />
    </>
  );
}
