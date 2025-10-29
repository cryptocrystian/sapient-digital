import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./_sections/hero";
import ServicesSection from "./_sections/services";
import CaseStudiesSection from "./_sections/case-studies";
import ApproachSection from "./_sections/approach";
import Methodologies from "./_sections/methodologies";
import Cadence from "./_sections/cadence";
import ContactSection from "./_sections/contact";
import { orgJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <ApproachSection />
        <Methodologies />
        <Cadence />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
