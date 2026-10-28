import RfMark from './RfMark';

type Band = { code: string; title: string; x: number; width: number; yCode: number; yTitle: number; weeks: string; signal?: boolean };

const BANDS: Band[] = [
  { code: 'STAGE 01', title: 'Establish Direction', x: 210, width: 70, yCode: 76, yTitle: 92, weeks: 'W01 – W02' },
  { code: 'STAGE 02', title: 'Read the Market', x: 280, width: 180, yCode: 112, yTitle: 128, weeks: 'W03 – W04' },
  { code: 'STAGE 03', title: 'Deploy Expertise', x: 460, width: 540, yCode: 148, yTitle: 164, weeks: 'W05 – W10' },
  { code: 'STAGE 04', title: 'Connect the Work', x: 640, width: 360, yCode: 184, yTitle: 200, weeks: 'W07 – W10' },
  { code: 'STAGE 05 · LOCK', title: 'Measure & Adapt', x: 1000, width: 180, yCode: 220, yTitle: 236, weeks: 'W11 – W12', signal: true },
];

const BAND_Y_OFFSET: Record<string, number> = {
  'STAGE 01': 68,
  'STAGE 02': 104,
  'STAGE 03': 140,
  'STAGE 04': 176,
  'STAGE 05 · LOCK': 212,
};

const WEEK_LABELS: Array<{ x: number; label: string; anchor?: 'middle' | 'end' }> = [
  { x: 245, label: 'W01' },
  { x: 325, label: 'W02' },
  { x: 415, label: 'W03' },
  { x: 505, label: 'W04' },
  { x: 595, label: 'W05' },
  { x: 685, label: 'W06' },
  { x: 775, label: 'W07' },
  { x: 865, label: 'W08' },
  { x: 955, label: 'W09' },
  { x: 1045, label: 'W10' },
  { x: 1135, label: 'W11' },
  { x: 1180, label: 'W12', anchor: 'end' },
];

const GRID_X = [190, 280, 370, 550, 640, 730, 910, 1000, 1090];
const GRID_STRONG_X = [460, 820];

type Gate = { cx: number; label: string; signal?: boolean };
const GATES: Gate[] = [
  { cx: 280, label: 'MANDATE LOCK' },
  { cx: 460, label: 'OPPORTUNITY BRIEF' },
  { cx: 820, label: 'MID-CYCLE REVIEW' },
  { cx: 1180, label: 'SCORECARD + REPLAN →', signal: true },
];

export default function ResultantCadence() {
  return (
    <section className="rs-cadence" id="cadence" aria-label="90-Day Rhythm">
      <header className="rs-cadence__header">
        <div>
          <p className="rs-cadence__eyebrow">
            <RfMark />
            <span>04 — The Operating Rhythm</span>
          </p>
          <h2 className="rs-cadence__h2">What a quarter of engagement actually looks like.</h2>
        </div>
        <p className="rs-cadence__body">
          Ninety days is enough to establish direction, deploy specialist work, coordinate across
          practices, and read back the first signal of change. Review gates are fixed. What runs
          between them adapts.
        </p>
      </header>

      <div className="rs-cadence__diagram">
        <svg
          className="rs-cadence__svg"
          viewBox="0 0 1240 400"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Sample 90-day engagement cadence — five stages mapped to twelve weeks, with four review gates"
        >
          <g>
            {GRID_X.map((x) => (
              <line key={`g-${x}`} className="cad-grid" x1={x} y1={50} x2={x} y2={270} />
            ))}
            {GRID_STRONG_X.map((x) => (
              <line key={`gs-${x}`} className="cad-grid-strong" x1={x} y1={50} x2={x} y2={270} />
            ))}
          </g>

          {BANDS.map((b) => (
            <g key={b.code}>
              <text className="cad-code" x="200" y={b.yCode} textAnchor="end">{b.code}</text>
              <text className="cad-stage" x="200" y={b.yTitle} textAnchor="end">{b.title}</text>
              <rect
                className={b.signal ? 'cad-band-signal-fill' : 'cad-band-fill'}
                x={b.x}
                y={BAND_Y_OFFSET[b.code]}
                width={b.width}
                height="24"
              />
              <rect
                className={b.signal ? 'cad-band-signal-stroke' : 'cad-band-stroke'}
                x={b.x}
                y={BAND_Y_OFFSET[b.code]}
                width={b.width}
                height="24"
              />
            </g>
          ))}

          <line className="cad-grid-strong" x1="210" y1="270" x2="1180" y2="270" />

          {GATES.map((g) => (
            <g key={g.label}>
              <rect
                className={g.signal ? 'cad-gate-signal' : 'cad-gate-shape'}
                x={g.cx - 5}
                y="285"
                width="10"
                height="10"
                transform={`rotate(45 ${g.cx} 290)`}
              />
              <text
                className={g.signal ? 'cad-gate-label-signal' : 'cad-gate-label'}
                x={g.signal ? g.cx - 2 : g.cx}
                y="314"
                textAnchor={g.signal ? 'end' : 'middle'}
              >
                {g.label}
              </text>
            </g>
          ))}

          {WEEK_LABELS.map((w) => (
            <text
              key={w.label}
              className="cad-week"
              x={w.x}
              y="342"
              textAnchor={w.anchor ?? 'middle'}
            >
              {w.label}
            </text>
          ))}

          <text className="cad-axis-label" x="210" y="374" textAnchor="start">T₀</text>
          <text className="cad-axis-label" x="695" y="374" textAnchor="middle">OPERATING WEEKS</text>
          <text className="cad-axis-label" x="1180" y="374" textAnchor="end">T + 90d</text>
        </svg>

        <div className="rs-cadence__cards" aria-hidden="true">
          {BANDS.map((b) => (
            <div key={b.code} className="rs-cadence__card">
              <div className="rs-cadence__card-top">
                <span className="rs-cadence__card-code">{b.code}</span>
                <span className="rs-cadence__card-weeks">{b.weeks}</span>
              </div>
              <div className="rs-cadence__card-title">{b.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rs-cadence__notes">
        <div className="rs-cadence__note">
          <div className="rs-cadence__note-label">Fixed</div>
          <p className="rs-cadence__note-text">
            Review gates are fixed. Mandate Lock, Opportunity Brief, Mid-cycle Review, and
            Scorecard + Replan happen on schedule — every engagement, every cycle.
          </p>
        </div>
        <div className="rs-cadence__note">
          <div className="rs-cadence__note-label">Adaptive</div>
          <p className="rs-cadence__note-text">
            What runs between the gates adapts to signal, opportunity, and priority — within
            agreed scope and with documented change decisions.
          </p>
        </div>
        <div className="rs-cadence__note">
          <div className="rs-cadence__note-label">Human-Approved</div>
          <p className="rs-cadence__note-text">
            Every outbound action — placement, publish, pitch — goes through a named reviewer.
            Nothing leaves the agency without approval.
          </p>
        </div>
      </div>

      <aside className="rs-cadence__rf-callout">
        <div className="rs-cadence__rf-eyebrow">Methodology</div>
        <p>
          This cadence runs on{' '}
          <strong>
            The Resultant Framework<sup className="rs-tm">™</sup>
          </strong>{' '}
          — Sapient&apos;s methodology for turning specialized disciplines into coordinated
          market presence.
        </p>
        <a
          className="rs-cadence__rf-link"
          href="/approach"
          data-track="cta_click"
          data-cta-name="open_framework"
          data-cta-location="cadence_callout"
        >
          Open the Framework&nbsp;↗
        </a>
      </aside>
    </section>
  );
}
