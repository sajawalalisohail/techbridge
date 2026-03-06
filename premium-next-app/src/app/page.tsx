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
    <main className="relative min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Black background layer */}
      <div className="fixed inset-0 z-0" style={{ backgroundColor: '#000000' }} />
      
      {/* Particles layer */}
      <div className="fixed inset-0 z-[1]">
        <PageParticlesWrapper />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <TechStackMarquee />
        <CaseStudies />
        <CTA />
      </div>

      {/* Footer */}
      <div className="relative z-10" style={{ backgroundColor: '#000000' }}>
        <Footer />
      </div>
    </main>
  );
}
