import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Sapient Digital",
  description: "Book a Prism Audit. Thirty minutes. One partner on the line.",
};

export default function ContactPage() {
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
            maxWidth: "20ch",
            fontWeight: 700,
          }}
        >
          Thirty minutes. One partner on the line.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          We&apos;ll pull your share of model from PrismOS on the call, name three fixable gaps across the four wavelengths, and send the audit after. No deck. No SDR.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="mailto:hello@sapient.digital?subject=Prism%20Audit" className="btn btn-primary">
            Email the partners
          </a>
        </div>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 820 }}>
          <ContactLine label="General" value="hello@sapient.digital" />
          <ContactLine label="Press" value="press@sapient.digital" />
          <ContactLine label="Careers" value="careers@sapient.digital" />
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
        {label}
      </span>
      <a href={`mailto:${value}`} style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--ink)", textDecoration: "none", wordBreak: "break-word" }}>
        {value}
      </a>
    </div>
  );
}
