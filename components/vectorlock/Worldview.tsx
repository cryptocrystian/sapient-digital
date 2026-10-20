import { ChapterBand } from "./ChapterBand";

export function Worldview() {
  return (
    <section className="vl-worldview">
      <ChapterBand num="02" label="The Worldview" />
      <div className="vl-worldview-container">
        <div className="vl-worldview-grid">
          <div className="vl-worldview-text vl-reveal">
            <h2 className="vl-worldview-headline">
              Attention is everywhere.
              <br />
              <span className="vl-worldview-emphasis">Authority is not.</span>
            </h2>
            <p className="vl-worldview-lead">
              Every category now has more content, more posts, and more
              AI-generated noise than any buyer could ever read. What is scarce
              is not reach. What is scarce is the credibility that lets a
              specific brand be recognized, cited, and trusted when a decision
              has to be made.
            </p>
            <div className="vl-worldview-body">
              <p>
                Attention dilutes. The more sources, the less any one of them
                is heard. Authority accrues — the more a brand is
                independently recognized, the more every subsequent placement,
                article, and citation carries. That asymmetry is the whole
                game.
              </p>
              <p>
                Sapient Digital is built for the accrual side of the curve.
              </p>
            </div>
          </div>
          <div className="vl-worldview-chart vl-reveal">
            <WorldviewChart />
          </div>
        </div>

        <div className="vl-worldview-convictions vl-reveal">
          <article className="vl-conviction">
            <span className="vl-conviction-num">01</span>
            <h3 className="vl-conviction-title">
              Authority is earned, not manufactured.
            </h3>
            <p className="vl-conviction-body">
              Volume alone will not build it. Independent recognition will.
            </p>
          </article>
          <article className="vl-conviction">
            <span className="vl-conviction-num">02</span>
            <h3 className="vl-conviction-title">
              PR, content, and discoverability belong on one trajectory.
            </h3>
            <p className="vl-conviction-body">
              Pursued separately, they contradict each other. Pursued together,
              they reinforce.
            </p>
          </article>
          <article className="vl-conviction">
            <span className="vl-conviction-num">03</span>
            <h3 className="vl-conviction-title">
              The market moves. Direction holds.
            </h3>
            <p className="vl-conviction-body">
              We adjust tactics when the evidence calls for it. We do not drift
              from strategy.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ────────── Attention vs Authority chart ────────── */
function WorldviewChart() {
  // Two curves on a shared axis. Attention: logarithmic decay toward noise floor.
  // Authority: exponential-like accrual with slow start and acceleration.
  // Both normalized to the same y-scale 0-1.
  const w = 440;
  const h = 280;
  const padL = 44;
  const padR = 24;
  const padT = 50;
  const padB = 56;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const toX = (t: number) => padL + t * plotW;
  const toY = (v: number) => padT + (1 - v) * plotH;

  // Attention curve — starts high, logarithmic flatten toward low plateau
  const attention: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    // Diminishing returns: starts at 0.78, decays toward 0.18
    const v = 0.78 - 0.6 * (1 - Math.exp(-3.5 * t));
    attention.push(`${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(v).toFixed(1)}`);
  }

  // Authority curve — slow start, accelerating accrual
  const authority: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    // Accrual: starts near 0.08, slow start, grows to ~0.92 via quadratic+exp blend
    const v = 0.08 + 0.84 * (t * t * 0.6 + (1 - Math.exp(-2.8 * t)) * 0.4);
    authority.push(`${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(v).toFixed(1)}`);
  }

  // Crossover point (approx where curves meet)
  const crossoverT = 0.42;
  const crossoverV = 0.42;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="vl-worldview-chart-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Attention diminishes over time while authority accrues. Two curves on a shared axis showing the asymmetry Sapient Digital is built for."
    >
      {/* Plot frame */}
      <rect
        x={padL}
        y={padT}
        width={plotW}
        height={plotH}
        fill="none"
        stroke="var(--vl-rule)"
        strokeWidth={1}
      />

      {/* Horizontal gridlines */}
      {[0.25, 0.5, 0.75].map((v) => (
        <line
          key={v}
          x1={padL}
          y1={toY(v)}
          x2={padL + plotW}
          y2={toY(v)}
          stroke="var(--vl-rule-soft)"
          strokeWidth={0.5}
          strokeDasharray="2 3"
        />
      ))}

      {/* Y-axis tick marks */}
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line
            x1={padL - 4}
            y1={toY(v)}
            x2={padL}
            y2={toY(v)}
            stroke="var(--vl-mid)"
            strokeWidth={1}
          />
        </g>
      ))}

      {/* Axis labels */}
      <text
        className="vl-chart-axis"
        x={padL - 10}
        y={toY(1) + 3}
        textAnchor="end"
      >
        HIGH
      </text>
      <text
        className="vl-chart-axis"
        x={padL - 10}
        y={toY(0) + 3}
        textAnchor="end"
      >
        LOW
      </text>
      <text
        className="vl-chart-axis"
        x={padL}
        y={padT + plotH + 18}
      >
        T₀
      </text>
      <text
        className="vl-chart-axis"
        x={padL + plotW}
        y={padT + plotH + 18}
        textAnchor="end"
      >
        T → ∞
      </text>
      <text
        className="vl-chart-axis-ttl"
        x={padL + plotW / 2}
        y={padT + plotH + 36}
        textAnchor="middle"
      >
        TIME · PRESENCE IN MARKET
      </text>

      {/* Attention curve (gray) */}
      <path
        d={attention.join(" ")}
        fill="none"
        stroke="var(--vl-text-soft)"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      {/* Authority curve (signal orange) */}
      <path
        d={authority.join(" ")}
        fill="none"
        stroke="var(--vl-signal)"
        strokeWidth={2.5}
      />

      {/* Curve endpoint dots */}
      <circle cx={toX(1)} cy={toY(0.18)} r={3} fill="var(--vl-text-soft)" />
      <circle cx={toX(1)} cy={toY(0.92)} r={4} fill="var(--vl-signal)" />
      <circle
        cx={toX(1)}
        cy={toY(0.92)}
        r={9}
        fill="none"
        stroke="var(--vl-signal)"
        strokeWidth={1}
        opacity={0.35}
      />

      {/* Curve labels at endpoints */}
      <text
        className="vl-chart-label"
        x={toX(1) - 8}
        y={toY(0.18) - 6}
        textAnchor="end"
      >
        ATTENTION
      </text>
      <text
        className="vl-chart-label vl-chart-label--signal"
        x={toX(1) - 8}
        y={toY(0.92) - 6}
        textAnchor="end"
      >
        AUTHORITY
      </text>

      {/* Crossover marker */}
      <circle
        cx={toX(crossoverT)}
        cy={toY(crossoverV)}
        r={2.5}
        fill="var(--vl-carbon)"
      />
      <line
        x1={toX(crossoverT)}
        y1={toY(crossoverV)}
        x2={toX(crossoverT)}
        y2={toY(crossoverV) + 14}
        stroke="var(--vl-mid)"
        strokeDasharray="2 2"
        strokeWidth={0.75}
      />
      <text
        className="vl-chart-callout"
        x={toX(crossoverT)}
        y={toY(crossoverV) + 26}
        textAnchor="middle"
      >
        Inflection
      </text>

      {/* Monospace function callout — top-right */}
      <text className="vl-chart-fn" x={w - padR} y={padT - 20} textAnchor="end">
        authority · ƒ(credibility)
        <tspan baselineShift="super" fontSize="8">t</tspan>
      </text>

      {/* Chart title */}
      <text className="vl-chart-title" x={padL} y={padT - 20}>
        Figure · 01 — Asymmetry over time
      </text>
    </svg>
  );
}
