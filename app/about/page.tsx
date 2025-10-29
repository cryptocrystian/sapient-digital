import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "About — Sapient Digital",
  description: "Senior-led agency combining PR, content, and SEO expertise.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            About Sapient Digital
          </h1>
          <div className="prose prose-invert max-w-3xl">
            <p className="text-xl text-fg-300 mb-6">
              We&apos;re a senior-led agency that believes great marketing compounds.
            </p>
            <p className="text-fg-300 mb-4">
              Most agencies silo their services. PR teams pitch media. Content
              teams write blog posts. SEO teams optimize pages. The result?
              Disjointed efforts that don&apos;t amplify each other.
            </p>
            <p className="text-fg-300 mb-4">
              We do it differently. Our campaigns integrate earned media,
              strategic content, and technical SEO into one coherent system. PR
              drives authoritative backlinks. Content ranks and converts.
              Technical SEO ensures maximum visibility.
            </p>
            <p className="text-fg-300 mb-4">
              Everything compounds.
            </p>
            <p className="text-fg-300">
              Ready to grow?{" "}
              <Link href="/#contact" className="text-accent-400 hover:underline">
                Let&apos;s talk.
              </Link>
            </p>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-bg-700 border border-line-700 inline-block">
            <p className="text-sm text-fg-300 mb-1">Innovation Partner</p>
            <a
              href="https://saipienlabs.com"
              className="text-lg text-accent-400 hover:text-accent-500 transition font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saipien Labs
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
