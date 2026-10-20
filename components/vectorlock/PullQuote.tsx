/* Carbon pull-quote intermission between sections — editorial rhythm break */
export function PullQuote({
  children,
  attribution,
  variant = "carbon",
}: {
  children: React.ReactNode;
  attribution?: string;
  variant?: "carbon" | "signal";
}) {
  return (
    <aside className={`vl-pullquote vl-pullquote--${variant}`}>
      <div className="vl-pullquote-container">
        <span className="vl-pullquote-mark" aria-hidden="true" />
        <blockquote className="vl-pullquote-text vl-reveal">
          {children}
        </blockquote>
        {attribution && (
          <p className="vl-pullquote-attr">{attribution}</p>
        )}
      </div>
    </aside>
  );
}
