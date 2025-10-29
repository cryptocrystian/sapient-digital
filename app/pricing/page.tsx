"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingToggle from "@/components/pricing/PricingToggle";
import {
  priceFor,
  formatPrice,
  type Period,
} from "@/components/pricing/usePricing";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    name: "Foundation",
    monthly: 300000,
    features: [
      "Narrative workshop",
      "1 content pillar/mo",
      "SEO audit",
      "Monthly reporting",
    ],
  },
  {
    name: "Growth",
    monthly: 700000,
    recommended: true,
    features: [
      "2–3 content pillars/mo",
      "PR outreach",
      "Programmatic pages",
      "Biweekly reporting",
    ],
  },
  {
    name: "Authority+",
    monthly: 1200000,
    features: [
      "Exec ghostwriting",
      "Founder PR tour",
      "3–4 pillars/mo",
      "Advanced analytics",
    ],
  },
];

export default function PricingPage() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">
              Pricing
            </h1>
            <p className="text-xl text-fg-300 max-w-2xl mx-auto">
              Choose the plan that fits your stage. Switch billing anytime.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <PricingToggle value={period} onChange={setPeriod} />
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {PLANS.map((plan) => {
              const cents = priceFor(plan.monthly, period);
              return (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-8 transition-all duration-200 ${
                    plan.recommended
                      ? "border-gold-400 bg-bg-700 scale-105 shadow-lg"
                      : "border-line-700 bg-bg-700 hover:border-accent-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-fg-100">
                      {plan.name}
                    </h3>
                    {plan.recommended && (
                      <span className="text-xs text-gold-400 uppercase tracking-wide font-semibold px-2 py-1 rounded bg-gold-400/10 border border-gold-400/20">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-4xl font-bold text-fg-100">
                      {formatPrice(cents)}
                      <span className="text-lg font-normal text-fg-300">
                        /mo
                      </span>
                    </p>
                    {period === "annual" && (
                      <p className="text-sm text-accent-400 mt-1">
                        Save 15% with annual billing
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-fg-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.recommended ? "primary" : "ghost"}
                  >
                    Get Started
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-fg-300 mb-4">
              All plans include senior-led strategy, monthly reporting, and
              direct team access.
            </p>
            <p className="text-fg-300">
              Need a custom plan?{" "}
              <Link
                href="/#contact"
                className="text-accent-400 hover:text-accent-500 transition underline"
              >
                Let&apos;s talk
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
