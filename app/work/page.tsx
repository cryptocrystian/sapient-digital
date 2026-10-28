import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Work — Sapient Digital",
  description: "The spectrum, in production. Recent engagements, anonymized by request.",
};

export default function WorkPage() {
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
          The <span className="text-beam">spectrum</span>, in production.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          Recent engagements shown as anonymized shapes until the agreements say otherwise. The full case strip and the live Visibility curve both live on the home page.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#work" className="btn btn-primary">See the case strip</Link>
          <Link href="/#prismos" className="btn btn-ghost">Explore PrismOS</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
