import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Our Approach — Sapient Digital",
  description: "A structured process for compounding growth through integrated marketing.",
};

export default function ApproachPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8 pb-24">
        <section className="mx-auto max-w-5xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] tracking-tight mb-6">
            Our Approach
          </h1>
          <p className="text-xl text-fg-300 mb-6">
            SAGE turns earned signal into owned authority, then scales discovery
            and exposure through SEO and distribution ops. It&apos;s a
            closed-loop system with measurement at every step.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <div className="rounded-lg border border-line-700 bg-bg-700 p-5">
              <h3 className="text-lg font-semibold text-accent-400 mb-2">
                Signal
              </h3>
              <p className="text-fg-300 text-sm">
                Media angles, founder narratives, and category positioning
              </p>
            </div>
            <div className="rounded-lg border border-line-700 bg-bg-700 p-5">
              <h3 className="text-lg font-semibold text-accent-400 mb-2">
                Authority
              </h3>
              <p className="text-fg-300 text-sm">
                Bylines, expert content, and entity SEO
              </p>
            </div>
            <div className="rounded-lg border border-line-700 bg-bg-700 p-5">
              <h3 className="text-lg font-semibold text-accent-400 mb-2">
                Growth
              </h3>
              <p className="text-fg-300 text-sm">
                Programmatic SEO, keyword clusters, and CRO
              </p>
            </div>
            <div className="rounded-lg border border-line-700 bg-bg-700 p-5">
              <h3 className="text-lg font-semibold text-accent-400 mb-2">
                Exposure
              </h3>
              <p className="text-fg-300 text-sm">
                Syndication, podcast tours, and social loops
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-fg-300">
            For detailed methodology and our four-phase implementation process,
            visit our{" "}
            <Link href="/#approach" className="text-accent-400 hover:underline">
              home page
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
