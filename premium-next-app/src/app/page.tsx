import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudies from "@/components/home/CaseStudies";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    /*
     * Sticky Parallax Footer Reveal Architecture
     * ─────────────────────────────────────────
     * The outer div is `relative`. All main content (z-10, solid bg) sits
     * on top. The footer is in normal document flow at the very bottom.
     * The CTA section has `relative z-10 bg-neutral-950 rounded-b-3xl` —
     * it acts as the "card" that visually peels away as the user scrolls,
     * revealing the footer beneath. The footer uses `sticky bottom-0 z-0`
     * so once it enters the viewport it anchors in place.
     */
    <div className="bg-black">
      {/* All main content: z-10, solid backgrounds, covers footer during scroll */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <CaseStudies />
        {/* CTA: the grand finale card — solid bg + rounded-b-3xl peels away to reveal footer */}
        <CTA />
      </div>

      {/* Footer: in normal flow below all content — sticky bottom-0 anchors it
          once visible; the CTA's rounded bottom edge and color contrast create
          the "reveal from underneath" premium feel as it scrolls into view.  */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
