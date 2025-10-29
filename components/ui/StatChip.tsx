export function StatChip({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: number;
}) {
  const isPositive = typeof delta === "number" ? delta >= 0 : undefined;

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-line-700 bg-bg-700 px-3 py-2">
      <span className="text-fg-300 text-sm">{label}</span>
      <code className="font-mono font-semibold">{value}</code>
      {typeof delta === "number" && (
        <span
          className={`text-xs font-medium ${
            isPositive ? "text-accent-400" : "text-state-danger"
          }`}
        >
          {isPositive ? "+" : ""}
          {delta}%
        </span>
      )}
    </div>
  );
}
