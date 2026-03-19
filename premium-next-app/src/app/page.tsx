import Hero from "@/components/home/Hero";
import UnderHeroText from "@/components/home/UnderHeroText";
import StatsBanner from "@/components/home/StatsBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustedBy from "@/components/home/TrustedBy";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import ProcessShowcase from "@/components/home/ProcessShowcase";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <UnderHeroText />
      <StatsBanner />
      <TrustedBy />
      <WhyChooseUs />
      <Services />
      <CaseStudies />
      <ProcessShowcase />
      <CTA />

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
