import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Engagements — Sapient Digital",
  description: "Transparent floor. Quarterly commitment. One partner per account.",
};

export default function PricingPage() {
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
          One floor. One partner. One prism.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          Engagements start at $18k/mo. Quarterly commitment, month-to-month after Q1. Fit: B2B growth-stage, earned-first ready. Share-of-model instrumentation always included.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#start" className="btn btn-primary">Book a Prism Audit</Link>
          <a href="mailto:hello@sapient.digital?subject=Engagements" className="btn btn-ghost">Email the partners</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
