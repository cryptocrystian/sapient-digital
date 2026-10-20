import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Writing — Sapient Digital",
  description: "Published essays, bylines, and quarterly research from the operators.",
};

export default function ResourcesPage() {
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
          The work is the <span className="text-beam">credential</span>.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "52ch", color: "var(--body)" }}>
          Essays on earned-first growth, AI citation measurement, and the mechanics of PrismOS. We publish the thinking we charge for.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/#start" className="btn btn-primary">Book a Prism Audit</Link>
          <Link href="/" className="btn btn-ghost">Back to the home page</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
