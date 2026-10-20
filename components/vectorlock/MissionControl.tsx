import { ChapterBand } from "./ChapterBand";

export function MissionControl() {
  return (
    <section className="vl-mc">
      <ChapterBand num="06" label="The Means" variant="carbon" />
      <div className="vl-mc-container">
        {/* ───── Narrative header ───── */}
        <header className="vl-mc-header">
          <p className="vl-mc-eyebrow">
            <span className="vl-mc-eye-key">Sapient · Mission Control</span>
            <span className="vl-mc-sep">//</span>
            <span className="vl-mc-live">
              <span className="vl-mc-live-dot" aria-hidden="true" />
              The operating layer
            </span>
          </p>
          <h2 className="vl-mc-headline">
            We watch the pillars.
            <br />
            You run the business.
          </h2>
          <p className="vl-mc-lead">
            Mission Control is the operating HUD our team watches every day.
            It tracks pillar sync, flags drift, and tells us when a course
            correction is due — before the market tells you.
          </p>
        </header>

        {/* ───── The HUD ───── */}
        <div className="vl-mc-grid">
          <PillarSyncPanel />
          <SignalBusPanel />
          <CorrectionWindowPanel />
          <ConvergenceMarginPanel />
          <ApprovalFlowPanel />
          <PhasePanel />
        </div>

        {/* ───── Proof points below the HUD ───── */}
        <div className="vl-mc-proof">
          <article className="vl-mc-proof-item">
            <span className="vl-mc-proof-num">01</span>
            <h3 className="vl-mc-proof-title">Live pillar sync</h3>
            <p className="vl-mc-proof-body">
              Three disciplines tracked against one trajectory. If any pillar
              drifts out of phase, we see it in the HUD before the client
              does — and before it stacks into lost quarters.
            </p>
          </article>
          <article className="vl-mc-proof-item">
            <span className="vl-mc-proof-num">02</span>
            <h3 className="vl-mc-proof-title">
              Corrections on a 30-day rhythm
            </h3>
            <p className="vl-mc-proof-body">
              No annual-replan surprises. Material adjustments go through
              partner-led approval monthly, with a documented reason recorded
              against the engagement.
            </p>
          </article>
          <article className="vl-mc-proof-item">
            <span className="vl-mc-proof-num">03</span>
            <h3 className="vl-mc-proof-title">Partner-led governance</h3>
            <p className="vl-mc-proof-body">
              Nothing reputation-sensitive leaves the queue without a named
              partner's sign-off. The HUD shows the queue; a human calls the
              shot.
            </p>
          </article>
        </div>

        {/* ───── Section CTA ───── */}
        <div className="vl-mc-cta">
          <a href="#audit" className="vl-btn vl-btn--onCarbon">
            Begin a Vector Audit
          </a>
        </div>

        {/* ───── Status footer strip ───── */}
        <p className="vl-mc-disclaimer">
          Diagnostic values shown · Sapient method, not client data. KPI set
          under definition.
        </p>

        <footer className="vl-mc-footer">
          <span className="vl-mc-footer-item">
            <span className="vl-mc-live-dot" aria-hidden="true" />
            SYS_STATUS · NOMINAL
          </span>
          <span className="vl-mc-footer-item">UPLINK · ACTIVE</span>
          <span className="vl-mc-footer-item">TELEMETRY · ∞</span>
          <span className="vl-mc-footer-item">REV 3.0 · CANONICAL</span>
        </footer>
      </div>
    </section>
  );
}

/* ────────── Panel 01 · Pillar Sync ────────── */
function PillarSyncPanel() {
  const pillars = [
    { name: "Digital PR", id: "PR", velocity: "340", state: "lock" },
    { name: "Strategic Content", id: "CT", velocity: "440", state: "lock" },
    { name: "SEO · AEO · GEO", id: "SR", velocity: "340", state: "lock" },
    { name: "Video (optional)", id: "VD", velocity: "—", state: "idle" },
  ];
  return (
    <article className="vl-mc-panel vl-mc-panel--wide">
      <PanelHeader label="01 · Pillar Sync" status="active" />
      <div className="vl-mc-pillar-list">
        {pillars.map((p) => (
          <div key={p.id} className={`vl-mc-pillar vl-mc-pillar--${p.state}`}>
            <span className="vl-mc-pillar-id">{p.id}</span>
            <span className="vl-mc-pillar-name">{p.name}</span>
            <SyncWave active={p.state === "lock"} />
            <span className="vl-mc-pillar-vel">{p.velocity} m/s</span>
            <span className="vl-mc-pillar-state">
              {p.state === "lock" ? "LOCK" : "IDLE"}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function SyncWave({ active }: { active: boolean }) {
  if (!active) {
    return (
      <svg
        className="vl-mc-wave vl-mc-wave--idle"
        viewBox="0 0 160 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="12" x2="160" y2="12" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg
      className="vl-mc-wave"
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 0 12 Q 10 4 20 12 T 40 12 T 60 12 T 80 12 T 100 12 T 120 12 T 140 12 T 160 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

/* ────────── Panel 02 · Signal Bus ────────── */
function SignalBusPanel() {
  const events = [
    { x: 10, y: 60, intensity: "mid" },
    { x: 22, y: 40, intensity: "high" },
    { x: 30, y: 72, intensity: "low" },
    { x: 42, y: 50, intensity: "mid" },
    { x: 54, y: 30, intensity: "high" },
    { x: 66, y: 66, intensity: "mid" },
    { x: 78, y: 44, intensity: "high" },
    { x: 90, y: 58, intensity: "mid" },
    { x: 102, y: 36, intensity: "high" },
    { x: 114, y: 62, intensity: "low" },
    { x: 128, y: 48, intensity: "mid" },
    { x: 142, y: 32, intensity: "high" },
    { x: 156, y: 54, intensity: "mid" },
    { x: 170, y: 42, intensity: "high" },
    { x: 184, y: 58, intensity: "mid" },
    { x: 196, y: 46, intensity: "high" },
    { x: 210, y: 36, intensity: "high" },
    { x: 222, y: 64, intensity: "low" },
    { x: 236, y: 50, intensity: "mid" },
    { x: 248, y: 38, intensity: "high" },
    { x: 260, y: 52, intensity: "mid" },
  ];
  return (
    <article className="vl-mc-panel">
      <PanelHeader label="02 · Signal Bus" status="active" />
      <div className="vl-mc-panel-body">
        <div className="vl-mc-metric">
          <span className="vl-mc-metric-value">21</span>
          <span className="vl-mc-metric-unit">signals / 24h</span>
        </div>
        <svg
          className="vl-mc-bus"
          viewBox="0 0 270 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="0" y1="80" x2="270" y2="80" stroke="rgba(245,242,236,0.14)" strokeWidth="1" />
          <line x1="0" y1="50" x2="270" y2="50" stroke="rgba(245,242,236,0.08)" strokeDasharray="2 3" strokeWidth="0.75" />
          <line className="vl-mc-scanner" x1="0" y1="4" x2="0" y2="84" stroke="#FF5722" strokeWidth="1" opacity="0.5" />
          {events.map((e, i) => (
            <circle
              key={i}
              cx={e.x}
              cy={e.y}
              r={e.intensity === "high" ? 3 : e.intensity === "mid" ? 2 : 1.5}
              fill={
                e.intensity === "high"
                  ? "#FF5722"
                  : e.intensity === "mid"
                  ? "rgba(245,242,236,0.6)"
                  : "rgba(245,242,236,0.3)"
              }
            />
          ))}
        </svg>
        <div className="vl-mc-legend">
          <span className="vl-mc-tick">T−24h</span>
          <span className="vl-mc-tick">now</span>
        </div>
      </div>
    </article>
  );
}

/* ────────── Panel 03 · Correction Window ────────── */
function CorrectionWindowPanel() {
  return (
    <article className="vl-mc-panel">
      <PanelHeader label="03 · Correction Window" status="holding" />
      <div className="vl-mc-panel-body vl-mc-panel-body--center">
        <div className="vl-mc-countdown">
          <span className="vl-mc-count-primary">
            T<span className="vl-mc-count-sep">−</span>14<span className="vl-mc-count-unit">D</span>
          </span>
          <span className="vl-mc-count-secondary">03:22:17</span>
        </div>
        <div className="vl-mc-corr-label">Next course correction</div>
        <div className="vl-mc-corr-sub">30-day interval · partner-called</div>
      </div>
    </article>
  );
}

/* ────────── Panel 04 · Convergence Margin ────────── */
function ConvergenceMarginPanel() {
  const line = "M 0 44 L 20 40 L 40 46 L 60 42 L 80 48 L 100 44 L 120 50 L 140 42 L 160 46 L 180 40 L 200 48 L 220 44 L 240 46 L 260 42";
  return (
    <article className="vl-mc-panel">
      <PanelHeader label="04 · Convergence Margin" status="active" />
      <div className="vl-mc-panel-body">
        <div className="vl-mc-metric">
          <span className="vl-mc-metric-value">
            ±<span className="vl-mc-metric-main">2.1</span>°
          </span>
          <span className="vl-mc-metric-unit">tolerance ±4° / 2σ</span>
        </div>
        <svg
          className="vl-mc-margin"
          viewBox="0 0 270 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="0" y="30" width="270" height="34" fill="rgba(255,87,34,0.06)" />
          <line x1="0" y1="30" x2="270" y2="30" stroke="rgba(255,87,34,0.4)" strokeDasharray="2 3" strokeWidth="0.75" />
          <line x1="0" y1="64" x2="270" y2="64" stroke="rgba(255,87,34,0.4)" strokeDasharray="2 3" strokeWidth="0.75" />
          <line x1="0" y1="47" x2="270" y2="47" stroke="rgba(245,242,236,0.2)" strokeWidth="0.5" />
          <path d={line} fill="none" stroke="#D4EB00" strokeWidth="1.5" />
          <circle cx="260" cy="42" r="3" fill="#D4EB00" />
          <circle cx="260" cy="42" r="7" fill="none" stroke="#D4EB00" strokeWidth="1" opacity="0.4">
            <animate attributeName="r" values="4;10;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="vl-mc-legend">
          <span className="vl-mc-tick">D−30</span>
          <span className="vl-mc-tick">today</span>
        </div>
      </div>
    </article>
  );
}

/* ────────── Panel 05 · Approval Flow ────────── */
function ApprovalFlowPanel() {
  return (
    <article className="vl-mc-panel vl-mc-panel--half">
      <PanelHeader label="05 · Approval Flow" status="active" />
      <div className="vl-mc-panel-body">
        <div className="vl-mc-flow">
          <div className="vl-mc-flow-item">
            <span className="vl-mc-flow-value">6</span>
            <span className="vl-mc-flow-label">Queued</span>
          </div>
          <div className="vl-mc-flow-item vl-mc-flow-item--active">
            <span className="vl-mc-flow-value">3</span>
            <span className="vl-mc-flow-label">In partner review</span>
          </div>
          <div className="vl-mc-flow-item">
            <span className="vl-mc-flow-value">12</span>
            <span className="vl-mc-flow-label">Scheduled</span>
          </div>
        </div>
        <svg
          className="vl-mc-flowbar"
          viewBox="0 0 270 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="0" y="2" width="80" height="6" fill="rgba(245,242,236,0.3)" />
          <rect x="82" y="2" width="40" height="6" fill="#FF5722" />
          <rect x="124" y="2" width="146" height="6" fill="rgba(212,235,0,0.5)" />
        </svg>
        <div className="vl-mc-corr-sub">Governance · partner-led · verified</div>
      </div>
    </article>
  );
}

/* ────────── Panel 06 · Phase ────────── */
function PhasePanel() {
  const phases = ["Define", "Sense", "Lock", "Measure"];
  const activeIdx = 2;
  return (
    <article className="vl-mc-panel vl-mc-panel--half">
      <PanelHeader label="06 · Phase" status="active" />
      <div className="vl-mc-panel-body">
        <div className="vl-mc-phase-label">Current phase</div>
        <div className="vl-mc-phase-current">
          Lock<span className="vl-mc-phase-dot">●</span>
        </div>
        <div className="vl-mc-phase-track" role="presentation">
          {phases.map((p, i) => (
            <div
              key={p}
              className={`vl-mc-phase-node ${i < activeIdx ? "done" : ""} ${i === activeIdx ? "active" : ""}`}
            >
              <span className="vl-mc-phase-dot-outer">
                <span className="vl-mc-phase-dot-inner" />
              </span>
              <span className="vl-mc-phase-name">{p}</span>
            </div>
          ))}
        </div>
        <div className="vl-mc-corr-sub">
          Day 17 / 30 · correction window opens 03:22:17
        </div>
      </div>
    </article>
  );
}

function PanelHeader({
  label,
  status,
}: {
  label: string;
  status: "active" | "holding" | "idle";
}) {
  return (
    <header className="vl-mc-panel-header">
      <span className="vl-mc-panel-label">{label}</span>
      <span className={`vl-mc-status vl-mc-status--${status}`}>
        <span className="vl-mc-status-dot" aria-hidden="true" />
        {status === "active" ? "ACTIVE" : status === "holding" ? "HOLDING" : "IDLE"}
      </span>
    </header>
  );
}
