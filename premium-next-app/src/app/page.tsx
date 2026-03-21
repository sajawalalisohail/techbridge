import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CommandSurfaceSection from "@/components/home/CommandSurfaceSection";
import JellyMorphServicesSection from "@/components/home/JellyMorphServicesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CommandSurfaceSection />
      <JellyMorphServicesSection />
      <CaseStudiesSection />
      <ComparisonSection />
      <ProcessSection />
      <WhyUsSection />
      <FinalCTA />

      {/* Subtle accent border glow separating scrolling content from reveal footer */}
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
