import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Approach — Sapient Digital",
  description: "The orchestration layer that keeps four pillars in phase.",
};

export default function ApproachPage() {
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
            maxWidth: "18ch",
            fontWeight: 700,
          }}
        >
          PrismOS. The attribution map.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          A single press placement, traced through every surface it triggers: Google rank, Perplexity citation, video embed. The full interactive map lives on the home page.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#prismos" className="btn btn-primary">Explore PrismOS</Link>
          <Link href="/#start" className="btn btn-ghost">Book a Prism Audit</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
