import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Pricing — Sapient Digital",
  description: "Transparent pricing for integrated PR, content, and SEO services.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            Pricing
          </h1>
          <p className="text-xl text-fg-300 max-w-3xl mb-8">
            Detailed pricing page coming soon. Our services are tailored to each
            client&apos;s needs and growth stage.
          </p>
          <p className="text-lg text-fg-300 max-w-3xl">
            For now,{" "}
            <Link href="/#contact" className="text-accent-400 hover:underline">
              book a call
            </Link>{" "}
            to discuss your specific requirements and we&apos;ll provide a custom quote.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
