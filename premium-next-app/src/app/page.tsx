import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import CaseStudies from "@/components/home/CaseStudies";
import CTA from "@/components/home/CTA";
import { PageParticlesWrapper } from "@/components/PageParticlesWrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">

      {/* 
        This is the main opaque wrapper that contains all page content.
        Because it has `bg-black` and `z-10`, it hides the fixed footer completely 
        until you scroll past it to the transparent spacer.
      */}
      <div className="relative w-full z-10 bg-black">

        {/* 
          PARTICLES LAYER:
          By using an `absolute inset-0` parent, this layer perfectly matches the physical scroll height of the page.
          Inside it, `sticky top-0` keeps the particles locked to the window while you scroll, 
          until the parent absolutely ends—then the particles gracefully scroll out of view, revealing the footer!
        */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <PageParticlesWrapper />
          </div>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 w-full">
          <Navbar />
          {/* Hero is transparent, letting the sticky sticky particles show underneath */}
          <Hero />

          <Services />
          <HowItWorks />
          <WhyChooseUs />
          <TechStackMarquee />
          <CaseStudies />
          <CTA />

          {/* Subtle violet border glow separating the scrolling content from the reveal footer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 70%, transparent 100%)',
              boxShadow: '0 0 20px 4px rgba(109,40,217,0.25)',
            }}
          />
        </div>
      </div>

      {/* FOOTER REVEAL: Uses a spacer div + fixed z-[0] footprint */}
      <Footer />
    </main>
  );
}
