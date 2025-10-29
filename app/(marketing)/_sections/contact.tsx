import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-8 bg-bg-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">
            Ready to <span className="text-accent-400">Grow?</span>
          </h2>
          <p className="text-xl text-fg-300">
            Book a free 30-minute strategy call. We&apos;ll audit your current approach
            and show you exactly where the opportunities are.
          </p>
        </div>

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
    </section>
  );
}
