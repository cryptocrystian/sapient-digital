import { ChapterBand } from "./ChapterBand";

export function VectorLockMethod() {
  return (
    <section className="vl-method">
      <ChapterBand num="04" label="The Method" />
      <div className="vl-method-container">
        <div className="vl-method-header vl-reveal">
          <h2 className="vl-method-headline">
            Four phases.
            <br />
            <span className="vl-method-emphasis">One trajectory.</span>
          </h2>
          <p className="vl-method-lead">
            Every engagement runs the same loop. Define the destination, sense
            the market, lock the vectors, measure the drift, correct the
            course. It takes thirty days to run once, and we run it every
            month.
          </p>
        </div>

        <div className="vl-method-diagram vl-reveal">
          <div className="vl-method-diagram-head">
            <span className="vl-method-diagram-eye">
              <span className="vl-method-diagram-dot" aria-hidden="true" />
              Operating state · Method viewer
            </span>
            <span className="vl-method-diagram-time">T + 00:17:00 · In cycle</span>
          </div>
          <PhaseLoopDiagram />
        </div>

        <div className="vl-method-phases vl-reveal">
          <PhaseCard
            num="01"
            name="Define"
            lede="Agree the destination."
            body="Strategic mandate, 90-day roadmap, approval rules, baseline capture. Who holds the authority to say yes."
            state="done"
          />
          <PhaseCard
            num="02"
            name="Sense"
            lede="Watch the market."
            body="Market, press, content, and AI-visibility intelligence. Opportunity detection against the mandate. Priorities proposed, never executed on their own."
            state="done"
          />
          <PhaseCard
            num="03"
            name="Lock"
            lede="Three vectors in phase."
            body="Partner-led prioritization against capacity. Three-vector execution in step. Approval gates where reputation sits. A verified deliverable log for every move."
            state="active"
          />
          <PhaseCard
            num="04"
            name="Measure"
            lede="Prove, correct, repeat."
            body="Transparent visibility and authority trends. Monthly scorecard in plain English. Documented reason behind every reallocation. Correction window opens on day 30."
            state="pending"
          />
        </div>

        <p className="vl-method-transition">
          That is the loop. Next: how we actually run it, day by day. ↓
        </p>
      </div>
    </section>
  );
}

function PhaseCard({
  num,
  name,
  lede,
  body,
  state,
}: {
  num: string;
  name: string;
  lede: string;
  body: string;
  state: "done" | "active" | "pending";
}) {
  return (
    <article className={`vl-phase-card vl-phase-card--${state}`}>
      <header className="vl-phase-card-header">
        <span className="vl-phase-card-num">{num}</span>
        <span className="vl-phase-card-state" aria-hidden="true">
          {state === "done" ? "✓" : state === "active" ? "●" : "○"}
        </span>
      </header>
      <h3 className="vl-phase-card-name">{name}</h3>
      <p className="vl-phase-card-lede">{lede}</p>
      <p className="vl-phase-card-body">{body}</p>
    </article>
  );
}

/* ────────── Cyclic phase-loop diagram ────────── */
function PhaseLoopDiagram() {
  const w = 820;
  const h = 420;
  const cx = w / 2;
  const cy = h / 2;
  const r = 150;

  // Four phase positions (clockwise from top)
  const positions = [
    { name: "Define", angle: -Math.PI / 2, state: "done" },
    { name: "Sense", angle: 0, state: "done" },
    { name: "Lock", angle: Math.PI / 2, state: "active" },
    { name: "Measure", angle: Math.PI, state: "pending" },
  ];

  const toXY = (angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="vl-method-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Four-phase cyclic loop: Define, Sense, Lock, Measure. Lock is the current phase."
    >
      {/* Frame */}
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        fill="none"
        stroke="rgba(245, 242, 236, 0.1)"
        strokeWidth={1}
      />

      {/* Grid — on carbon */}
      {Array.from({ length: 28 }, (_, i) => i * 30).map((x) => (
        <line
          key={`gv-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={h}
          stroke="rgba(245, 242, 236, 0.04)"
          strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => i * 30).map((y) => (
        <line
          key={`gh-${y}`}
          x1={0}
          y1={y}
          x2={w}
          y2={y}
          stroke="rgba(245, 242, 236, 0.04)"
          strokeWidth={0.5}
        />
      ))}

      {/* Center cycle marker */}
      <text
        className="vl-method-center-label"
        x={cx}
        y={cy - 12}
        textAnchor="middle"
      >
        30-DAY LOOP
      </text>
      <text
        className="vl-method-center-sub"
        x={cx}
        y={cy + 8}
        textAnchor="middle"
      >
        Partner-called correction window
      </text>
      <text
        className="vl-method-center-sub"
        x={cx}
        y={cy + 24}
        textAnchor="middle"
      >
        Day 17 / 30 · in cycle
      </text>

      {/* Circular path (dashed) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(245, 242, 236, 0.2)"
        strokeWidth={0.75}
        strokeDasharray="3 4"
      />

      {/* Arrows along the circle between nodes */}
      {positions.map((p, i) => {
        const nextAngle = positions[(i + 1) % 4].angle;
        // Position arrow at midpoint of the arc
        let midAngle = (p.angle + nextAngle) / 2;
        // Handle wrap-around for the last arc
        if (i === 3) midAngle = p.angle + Math.PI / 4;
        const { x: ax, y: ay } = toXY(midAngle);
        const rotation = (midAngle * 180) / Math.PI + 90;
        return (
          <g key={`arrow-${i}`}>
            <polygon
              points="-5,-6 6,0 -5,6"
              fill={
                p.state === "done"
                  ? "var(--vl-signal)"
                  : p.state === "active"
                  ? "var(--vl-volt)"
                  : "rgba(245, 242, 236, 0.3)"
              }
              transform={`translate(${ax} ${ay}) rotate(${rotation})`}
              opacity={p.state === "done" ? 0.9 : p.state === "active" ? 1 : 0.4}
            />
          </g>
        );
      })}

      {/* Phase nodes */}
      {positions.map((p) => {
        const { x, y } = toXY(p.angle);
        const isActive = p.state === "active";
        const isDone = p.state === "done";
        return (
          <g key={p.name}>
            {isActive && (
              <circle
                cx={x}
                cy={y}
                r={34}
                fill="none"
                stroke="var(--vl-volt)"
                strokeWidth={1}
                opacity={0.3}
              >
                <animate
                  attributeName="r"
                  values="30;44;44"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={x}
              cy={y}
              r={28}
              fill="rgba(245, 242, 236, 0.03)"
              stroke={
                isActive
                  ? "var(--vl-volt)"
                  : isDone
                  ? "var(--vl-signal)"
                  : "rgba(245, 242, 236, 0.3)"
              }
              strokeWidth={isActive ? 2 : 1.25}
            />
            {isDone && (
              <text
                className="vl-method-node-check"
                x={x}
                y={y + 5}
                textAnchor="middle"
              >
                ✓
              </text>
            )}
            {isActive && (
              <circle
                cx={x}
                cy={y}
                r={6}
                fill="var(--vl-volt)"
              />
            )}
            {!isActive && !isDone && (
              <circle
                cx={x}
                cy={y}
                r={3}
                fill="rgba(245, 242, 236, 0.4)"
              />
            )}
            {/* Phase label */}
            <text
              className={`vl-method-node-label ${isActive ? "vl-method-node-label--active" : ""}`}
              x={x}
              y={y - 48}
              textAnchor="middle"
            >
              {p.name}
            </text>
          </g>
        );
      })}

      {/* Legend bottom-left */}
      <g>
        <text className="vl-method-legend-title" x={24} y={h - 50}>
          Legend
        </text>
        <circle cx={30} cy={h - 32} r={5} fill="none" stroke="var(--vl-signal)" strokeWidth={1.25} />
        <text className="vl-method-legend" x={44} y={h - 28}>
          Complete
        </text>
        <circle cx={120} cy={h - 32} r={5} fill="var(--vl-volt)" />
        <text className="vl-method-legend" x={132} y={h - 28}>
          In cycle
        </text>
        <circle cx={210} cy={h - 32} r={3} fill="rgba(245, 242, 236, 0.4)" />
        <text className="vl-method-legend" x={222} y={h - 28}>
          Upcoming
        </text>
      </g>

      {/* Timestamp bottom-right */}
      <text className="vl-method-legend" x={w - 24} y={h - 28} textAnchor="end">
        VL · METHOD · REV 3.0
      </text>
    </svg>
  );
}
