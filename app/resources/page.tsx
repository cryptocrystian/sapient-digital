import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resources — Sapient Digital",
  description: "Insights on PR, content marketing, and SEO best practices.",
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            Resources
          </h1>
          <p className="text-xl text-fg-300 max-w-3xl">
            Blog and resources coming soon. We&apos;ll share actionable insights on
            integrated marketing, PR strategies, and technical SEO.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
