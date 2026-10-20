import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "About — Sapient Digital",
  description: "The earned-first growth firm. One brand, full spectrum.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container-wide" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 7vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.038em",
            color: "var(--ink)",
            margin: 0,
            maxWidth: "16ch",
            fontWeight: 700,
          }}
        >
          A small firm. Four pillars, one voice.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "48ch", color: "var(--body)" }}>
          Sapient Digital is the agency arm of Saipien Labs. We unify press, expert content, SEO + AEO, and video through a proprietary orchestration layer called PrismOS — so our clients' brand voice stays one voice across every surface the market reads.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#start" className="btn btn-primary">Book a Prism Audit</Link>
          <Link href="/#prism" className="btn btn-ghost">See the Prism</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
