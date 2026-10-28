import { ChapterBand } from "./ChapterBand";

export function Evidence() {
  return (
    <section className="vl-evidence">
      <ChapterBand num="07" label="The Evidence" />
      <div className="vl-evidence-container">
        <div className="vl-evidence-header vl-reveal">
          <h2 className="vl-evidence-headline">
            The composite is published.
            <br />
            <span className="vl-evidence-emphasis">
              The claims are checked.
            </span>
          </h2>
          <p className="vl-evidence-lead">
            We measure what we can verify. The rest we label &quot;collecting.&quot;
            Nothing on this page is unanchored, and nothing on the live site
            will appear without the data behind it.
          </p>
        </div>

        {/* Methodology strip */}
        <div className="vl-evidence-method vl-reveal">
          <div className="vl-method-head">
            <span className="vl-evidence-tag">Strip · 01</span>
            <h3 className="vl-method-title">Earned Visibility Composite</h3>
            <p className="vl-method-sub">
              Methodology v1.0 · versioned, verified, published.
            </p>
          </div>
          <div className="vl-method-weights">
            <WeightBar label="Visibility" weight={40} color="var(--vl-signal)" />
            <WeightBar label="Authority" weight={35} color="var(--vl-carbon)" />
            <WeightBar label="Momentum" weight={25} color="var(--vl-volt)" />
          </div>
          <p className="vl-method-note">
            Weights are declared and the formula is documented. Every monthly
            scorecard distinguishes causal findings from associations and
            labels data as &quot;collecting&quot; when it is not yet available.
          </p>
        </div>

        {/* Case strip */}
        <div className="vl-evidence-cases vl-reveal">
          <div className="vl-cases-head">
            <span className="vl-evidence-tag">Strip · 02</span>
            <h3 className="vl-cases-title">Work in flight</h3>
            <p className="vl-cases-sub">
              Three current engagements, anonymized until the agreements say
              otherwise. No fabricated logos, no stock testimonials.
            </p>
          </div>
          <div className="vl-cases-grid">
            <CaseCard
              industry="Enterprise SaaS"
              duration="7 months"
              scope="PR + Content + Search"
              note="Three sustained placements traced to one Vector Lock cycle. Measurement window Q+1 open."
            />
            <CaseCard
              industry="AI infrastructure"
              duration="11 months"
              scope="PR + Content + Search"
              note="Earned coverage sequence sourced from a single quarter's lock. Attribution report in draft."
            />
            <CaseCard
              industry="Cybersecurity"
              duration="4 months (ongoing)"
              scope="PR + Content + Search"
              note="Baseline established. First measurement window opens Q+1."
              state="collecting"
            />
          </div>
        </div>

        {/* What we don't claim */}
        <div className="vl-evidence-disclaim vl-reveal">
          <div className="vl-disclaim-head">
            <span className="vl-evidence-tag">Strip · 03</span>
            <h3 className="vl-disclaim-title">What we do not claim</h3>
          </div>
          <ul className="vl-disclaim-list">
            <li>We do not guarantee press placements.</li>
            <li>We do not guarantee Google ranks.</li>
            <li>We do not guarantee AI citations.</li>
            <li>We do not stage client testimonials.</li>
            <li>We do not publish fabricated dashboards.</li>
            <li>
              When data is unavailable, we label it &quot;collecting,&quot; not
              zero.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function WeightBar({
  label,
  weight,
  color,
}: {
  label: string;
  weight: number;
  color: string;
}) {
  return (
    <div className="vl-weight-row">
      <span className="vl-weight-label">{label}</span>
      <div className="vl-weight-track" role="presentation">
        <div
          className="vl-weight-fill"
          style={{ width: `${weight}%`, background: color }}
        />
      </div>
      <span className="vl-weight-value">{weight}%</span>
    </div>
  );
}

function CaseCard({
  industry,
  duration,
  scope,
  note,
  state = "active",
}: {
  industry: string;
  duration: string;
  scope: string;
  note: string;
  state?: "active" | "collecting";
}) {
  return (
    <article className={`vl-case vl-case--${state}`}>
      <div className="vl-case-head">
        <span className="vl-case-tag">
          {state === "collecting" ? "COLLECTING" : "ACTIVE"}
        </span>
      </div>
      <h4 className="vl-case-industry">{industry}</h4>
      <dl className="vl-case-dl">
        <dt>Duration</dt>
        <dd>{duration}</dd>
        <dt>Scope</dt>
        <dd>{scope}</dd>
      </dl>
      <p className="vl-case-note">{note}</p>
      {/* Abstract shape — placeholder for anonymized evidence */}
      <svg
        className="vl-case-shape"
        viewBox="0 0 220 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x={0} y={28} width={220} height={4} fill="var(--vl-rule)" />
        {state === "collecting" ? (
          <line
            x1={0}
            y1={30}
            x2={220}
            y2={30}
            stroke="var(--vl-text-dim)"
            strokeDasharray="3 3"
            strokeWidth={2}
          />
        ) : (
          <path
            d="M 0 42 Q 55 36 110 28 T 220 14"
            fill="none"
            stroke="var(--vl-signal)"
            strokeWidth={2.5}
          />
        )}
        <circle
          cx={state === "collecting" ? 110 : 220}
          cy={state === "collecting" ? 30 : 14}
          r={3}
          fill={state === "collecting" ? "var(--vl-text-dim)" : "var(--vl-signal)"}
        />
      </svg>
    </article>
  );
}
