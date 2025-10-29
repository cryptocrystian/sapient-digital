import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Services — Sapient Digital",
  description: "Integrated PR, content marketing, and technical SEO services.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            Services
          </h1>
          <p className="text-xl text-fg-300 max-w-3xl">
            Detailed services page coming soon. For now, visit our{" "}
            <Link href="/#services" className="text-accent-400 hover:underline">
              home page
            </Link>{" "}
            to learn about our integrated PR, content, and SEO offerings.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
