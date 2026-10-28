import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Services — Sapient Digital",
  description: "Four pillars kept in phase. One orchestration layer.",
};

export default function ServicesPage() {
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
          Four pillars, kept in <span className="text-beam">phase</span>.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          PR, expert content, SEO + AEO, and video — unified through PrismOS and measured across every surface. See the full four-wavelength breakdown on the home page.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#wavelengths" className="btn btn-primary">See the four wavelengths</Link>
          <Link href="/#start" className="btn btn-ghost">Book a Prism Audit</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
