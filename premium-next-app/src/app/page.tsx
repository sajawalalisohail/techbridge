import Hero from "@/components/home/Hero";
import Differentiators from "@/components/home/Differentiators";
import TrustedBy from "@/components/home/TrustedBy";
import Services from "@/components/home/Services";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CaseStudies from "@/components/home/CaseStudies";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      {/* Hero is transparent, letting the sticky background show underneath */}
      <Hero />

      {/* Addition 1: Differentiators strip */}
      <Differentiators />

      <TrustedBy />
      <Services />

      {/* Addition 2: Process timeline */}
      <ProcessTimeline />

      {/* Addition 3: Trimmed to 3 case studies + "View all" link */}
      <CaseStudies />
      <CTA />

      {/* Subtle lime border glow separating the scrolling content from the reveal footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
        style={{
          background: 'linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.4) 30%, rgba(var(--brand-accent-light-rgb), 0.6) 50%, rgba(var(--brand-accent-rgb), 0.4) 70%, rgba(var(--brand-accent-rgb), 0) 100%)',
          boxShadow: '0 0 20px 4px rgba(var(--brand-accent-dark-rgb), 0.25)',
        }}
      />
    </>
  );
}

