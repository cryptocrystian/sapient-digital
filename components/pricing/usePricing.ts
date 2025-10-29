export type Period = "monthly" | "annual";

export function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString()}`;
}

/** Apply ~15% discount for annual billing (pay monthly equivalent). */
export function priceFor(baseMonthlyCents: number, period: Period) {
  if (period === "annual") return Math.round(baseMonthlyCents * 0.85);
  return baseMonthlyCents;
}
