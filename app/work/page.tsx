import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Case Studies — Sapient Digital",
  description: "Real growth results from integrated PR, content, and SEO campaigns.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-fg-300 max-w-3xl">
            Detailed case studies page coming soon. For now, visit our{" "}
            <Link href="/#case-studies" className="text-accent-400 hover:underline">
              home page
            </Link>{" "}
            to see our proven results.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
