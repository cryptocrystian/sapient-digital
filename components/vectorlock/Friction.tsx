import { ChapterBand } from "./ChapterBand";

export function Friction() {
  return (
    <section className="vl-friction">
      <ChapterBand num="03" label="The Silo Problem" />
      <div className="vl-friction-container">
        {/* Twin visuals: BEFORE | AFTER */}
        <div className="vl-friction-twins vl-reveal">
          <figure className="vl-friction-twin vl-friction-twin--before">
            <header className="vl-friction-twin-header">
              <span className="vl-friction-state">State · 01</span>
              <span className="vl-friction-state-label">Before Vector Lock</span>
            </header>
            <ScatteredVectors />
            <figcaption className="vl-friction-caption">
              Four separate programs. Zero shared awareness. Every quarter
              rewrites the brief.
            </figcaption>
          </figure>

          <figure className="vl-friction-twin vl-friction-twin--after">
            <header className="vl-friction-twin-header">
              <span className="vl-friction-state vl-friction-state--active">
                State · 02
              </span>
              <span className="vl-friction-state-label">
                After Vector Lock
              </span>
            </header>
            <LockedVectors />
            <figcaption className="vl-friction-caption">
              One trajectory. Three disciplines in phase. One brief,
              corrected monthly.
            </figcaption>
          </figure>
        </div>

        {/* Thesis text */}
        <div className="vl-friction-text vl-reveal">
          <h2 className="vl-friction-headline">
            Four vendors. Four briefs.
            <br />
            <span className="vl-friction-emphasis">Four sets of drag.</span>
          </h2>
          <p className="vl-friction-lead">
            When PR, content, and search are run by different firms on
            different calendars, the work doesn&apos;t just stay separate — it
            fights itself. Press hits land outside content moments. Content
            publishes without the search surfaces primed. Search optimizes
            for yesterday&apos;s narrative. Every pillar burns calories undoing
            the others.
          </p>
          <p className="vl-friction-body">
            The cost is not visible on any one invoice. It shows up as a flat
            visibility curve, press coverage that doesn&apos;t move pipeline, and
            quarterly reviews where no one can explain why the number stayed
            where it was. Drag is not a vendor problem; it&apos;s a topology
            problem.
          </p>
        </div>

        {/* Diagnostic callouts */}
        <div className="vl-friction-callouts vl-reveal">
          <article className="vl-callout">
            <span className="vl-callout-tag">Symptom · 01</span>
            <h3 className="vl-callout-title">Brief drift</h3>
            <p className="vl-callout-body">
              Direction loses coherence over quarters as each vendor renews
              their own version of &quot;the plan.&quot;
            </p>
          </article>
          <article className="vl-callout">
            <span className="vl-callout-tag">Symptom · 02</span>
            <h3 className="vl-callout-title">Timing overlap</h3>
            <p className="vl-callout-body">
              Press hits land outside content moments. Content launches
              before search surfaces catch up. The compound effect never
              arrives.
            </p>
          </article>
          <article className="vl-callout">
            <span className="vl-callout-tag">Symptom · 03</span>
            <h3 className="vl-callout-title">Measurement gap</h3>
            <p className="vl-callout-body">
              No single dashboard, no single owner. Three monthly reports
              that explain their own silo and nothing else.
            </p>
          </article>
        </div>

        <p className="vl-friction-disclaimer">
          Symptoms observed on first-call diagnostics across prior
          engagements. Pattern language, not client-specific data.
        </p>
      </div>
    </section>
  );
}

/* ────────── Visual · BEFORE (scattered vectors) ────────── */
function ScatteredVectors() {
  const w = 420;
  const h = 300;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="vl-friction-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Four unaligned vectors scatter in different directions with no convergence point."
    >
      {/* Grid */}
      {Array.from({ length: 15 }, (_, i) => i * 30).map((x) => (
        <line
          key={`gv-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={h}
          stroke="var(--vl-rule-soft)"
          strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 30).map((y) => (
        <line
          key={`gh-${y}`}
          x1={0}
          y1={y}
          x2={w}
          y2={y}
          stroke="var(--vl-rule-soft)"
          strokeWidth={0.5}
        />
      ))}

      {/* Frame */}
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        fill="none"
        stroke="var(--vl-rule)"
        strokeWidth={1}
      />

      {/* Four scattered vectors with origins + heads */}
      {/* Vector 1 — PR going up-right then stalling */}
      <g>
        <circle cx={40} cy={100} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 100 Q 120 70 180 90 L 220 110"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.5}
        />
        <polygon
          points="226,110 215,106 215,114"
          fill="var(--vl-carbon)"
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={92}
        >
          PR
        </text>
      </g>

      {/* Vector 2 — CONTENT going right then back */}
      <g>
        <circle cx={40} cy={160} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 160 L 180 160 L 230 185 L 190 220"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <polygon
          points="190,224 194,214 185,216"
          fill="var(--vl-carbon)"
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={152}
        >
          CONTENT
        </text>
      </g>

      {/* Vector 3 — SEARCH going down-right then colliding */}
      <g>
        <circle cx={40} cy={240} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 240 Q 120 230 200 250"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.5}
        />
        <polygon
          points="206,250 195,246 195,254"
          fill="var(--vl-carbon)"
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={232}
        >
          SEARCH
        </text>
      </g>

      {/* Vector 4 — VIDEO (optional) off-axis */}
      <g opacity={0.5}>
        <circle cx={40} cy={60} r={2.5} fill="var(--vl-text-dim)" />
        <path
          d="M 40 60 L 160 50"
          fill="none"
          stroke="var(--vl-text-dim)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          className="vl-friction-vec-label vl-friction-vec-label--dim"
          x={44}
          y={52}
        >
          VIDEO
        </text>
      </g>

      {/* Drag indicators — volt yellow warning markers at friction points */}
      <g>
        {/* Collision mark at vectors 1 and 3 near each other */}
        <circle
          cx={220}
          cy={130}
          r={14}
          fill="none"
          stroke="var(--vl-signal)"
          strokeWidth={1}
          strokeDasharray="2 2"
          opacity={0.6}
        />
        <line
          x1={212}
          y1={122}
          x2={228}
          y2={138}
          stroke="var(--vl-signal)"
          strokeWidth={1.5}
        />
        <line
          x1={228}
          y1={122}
          x2={212}
          y2={138}
          stroke="var(--vl-signal)"
          strokeWidth={1.5}
        />
        <text
          className="vl-friction-warn"
          x={240}
          y={130}
          dominantBaseline="middle"
        >
          Collision
        </text>
      </g>

      <g>
        <circle
          cx={210}
          cy={200}
          r={14}
          fill="none"
          stroke="var(--vl-signal)"
          strokeWidth={1}
          strokeDasharray="2 2"
          opacity={0.6}
        />
        <text
          className="vl-friction-warn"
          x={240}
          y={200}
          dominantBaseline="middle"
        >
          Backward motion
        </text>
      </g>

      {/* Status label — ALIGNMENT: NONE */}
      <g>
        <rect
          x={w - 128}
          y={h - 40}
          width={116}
          height={24}
          fill="none"
          stroke="var(--vl-text-dim)"
          strokeWidth={0.75}
        />
        <text
          className="vl-friction-status"
          x={w - 70}
          y={h - 23}
          textAnchor="middle"
        >
          ALIGN · NULL
        </text>
      </g>
    </svg>
  );
}

/* ────────── Visual · AFTER (locked vectors) ────────── */
function LockedVectors() {
  const w = 420;
  const h = 300;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="vl-friction-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three vectors converge cleanly at a lock point and emerge as one unified trajectory."
    >
      {/* Grid */}
      {Array.from({ length: 15 }, (_, i) => i * 30).map((x) => (
        <line
          key={`gv-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={h}
          stroke="var(--vl-rule-soft)"
          strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 30).map((y) => (
        <line
          key={`gh-${y}`}
          x1={0}
          y1={y}
          x2={w}
          y2={y}
          stroke="var(--vl-rule-soft)"
          strokeWidth={0.5}
        />
      ))}

      {/* Frame */}
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        fill="none"
        stroke="var(--vl-rule)"
        strokeWidth={1}
      />

      {/* Three incoming vectors converging to lock */}
      <g>
        <circle cx={40} cy={100} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 100 Q 120 110 200 150"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.75}
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={92}
        >
          PR
        </text>
      </g>
      <g>
        <circle cx={40} cy={150} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 150 L 200 150"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.75}
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={142}
        >
          CONTENT
        </text>
      </g>
      <g>
        <circle cx={40} cy={200} r={3} fill="var(--vl-carbon)" />
        <path
          d="M 40 200 Q 120 190 200 150"
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1.75}
        />
        <text
          className="vl-friction-vec-label"
          x={44}
          y={192}
        >
          SEARCH
        </text>
      </g>

      {/* Lock point */}
      <g>
        <circle
          cx={200}
          cy={150}
          r={12}
          fill="none"
          stroke="var(--vl-carbon)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <circle cx={200} cy={150} r={4} fill="var(--vl-volt)" stroke="var(--vl-carbon)" strokeWidth={0.75} />
      </g>

      {/* Momentum trajectory out — orange */}
      <g>
        {/* Glow */}
        <path
          d="M 205 148 Q 270 130 320 100 T 400 50"
          fill="none"
          stroke="var(--vl-signal)"
          strokeWidth={10}
          opacity={0.18}
          strokeLinecap="round"
        />
        {/* Core */}
        <path
          d="M 205 148 Q 270 130 320 100 T 400 50"
          fill="none"
          stroke="var(--vl-signal)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <polygon
          points="406,52 390,42 390,62"
          fill="var(--vl-signal)"
        />
      </g>

      {/* Trajectory label */}
      <text
        className="vl-friction-vec-label vl-friction-vec-label--signal"
        x={w - 20}
        y={30}
        textAnchor="end"
      >
        MARKET PRESENCE →
      </text>

      {/* Status label — ALIGNMENT: LOCK */}
      <g>
        <rect
          x={w - 128}
          y={h - 40}
          width={116}
          height={24}
          fill="var(--vl-signal)"
          stroke="var(--vl-signal)"
        />
        <text
          className="vl-friction-status vl-friction-status--on-signal"
          x={w - 70}
          y={h - 23}
          textAnchor="middle"
        >
          ALIGN · LOCK
        </text>
      </g>
    </svg>
  );
}
