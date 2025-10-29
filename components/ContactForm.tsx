"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { events } from "@/lib/analytics";

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    setFormState("submitting");
    events.form_start("contact");

    // Create mailto link with form data
    const subject = encodeURIComponent(`New Contact from ${name}${company ? ` (${company})` : ''}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:hello@sapient.digital?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      setFormState("success");
      events.form_submit("contact", true);
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-fg-100 mb-2"
        >
          Name <span className="text-state-danger">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-700 border border-line-700 text-fg-100 placeholder:text-fg-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-fg-100 mb-2"
        >
          Email <span className="text-state-danger">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-700 border border-line-700 text-fg-100 placeholder:text-fg-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-fg-100 mb-2"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-3 rounded-xl bg-bg-700 border border-line-700 text-fg-100 placeholder:text-fg-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          placeholder="Your company"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-fg-100 mb-2"
        >
          Message <span className="text-state-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-bg-700 border border-line-700 text-fg-100 placeholder:text-fg-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <Button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </Button>

      {formState === "success" && (
        <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400">
          Thanks! We&apos;ll get back to you soon.
        </div>
      )}

      {formState === "error" && (
        <div className="p-4 rounded-xl bg-state-danger/10 border border-state-danger/20 text-state-danger">
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  );
}
