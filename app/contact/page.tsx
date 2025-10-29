import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Sapient Digital",
  description: "Get in touch to discuss your PR, content, and SEO needs.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-fg-300 mb-12 max-w-2xl">
            Book a free 30-minute strategy call. We&apos;ll audit your current approach
            and show you exactly where the opportunities are.
          </p>

          <div className="p-8 rounded-xl bg-bg-700 border border-line-700">
            <ContactForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-fg-500 text-sm">
              Not ready to talk yet? Email us at{" "}
              <a
                href="mailto:hello@sapient.digital"
                className="text-accent-400 hover:text-accent-500 transition"
              >
                hello@sapient.digital
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
