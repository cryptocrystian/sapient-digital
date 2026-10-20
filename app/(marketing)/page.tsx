import { Nav } from "@/components/prism/Nav";
import { Hero } from "@/components/prism/Hero";
import { PrismReveal } from "@/components/prism/PrismReveal";
import { FracturedLight } from "@/components/prism/FracturedLight";
import { Wavelengths } from "@/components/prism/Wavelengths";
import { PrismOS } from "@/components/prism/PrismOS";
import { Work } from "@/components/prism/Work";
import { VideoReel } from "@/components/prism/VideoReel";
import { Masthead } from "@/components/prism/Masthead";
import { Start } from "@/components/prism/Start";
import { Colophon } from "@/components/prism/Colophon";
import { orgJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <PrismReveal />
        <FracturedLight />
        <Wavelengths />
        <PrismOS />
        <Work />
        <VideoReel />
        <Masthead />
        <Start />
      </main>
      <Colophon />
    </>
  );
}
