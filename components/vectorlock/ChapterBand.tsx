/* Shared chapter marker band — editorial section opener */
export function ChapterBand({
  num,
  label,
  total = "08",
  variant = "light",
}: {
  num: string;
  label: string;
  total?: string;
  variant?: "light" | "carbon";
}) {
  return (
    <div className={`vl-chapter-band vl-chapter-band--${variant}`}>
      <div className="vl-chapter-container">
        <div className="vl-chapter-left">
          <span className="vl-chapter-num">{num}</span>
          <span className="vl-chapter-slash">/</span>
          <span className="vl-chapter-label">{label}</span>
        </div>
        <div className="vl-chapter-right">
          <span className="vl-chapter-meta">
            Chapter · {num} of {total}
          </span>
          <span className="vl-chapter-dot" aria-hidden="true" />
          <span className="vl-chapter-meta">Sapient Digital · 3.0</span>
        </div>
      </div>
    </div>
  );
}
