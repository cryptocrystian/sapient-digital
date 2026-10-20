"use client";

import { useState } from "react";

/**
 * PrismOS — the attribution map.
 *
 * Interactive. Four horizontal wavelength lanes (Beam / Medium / Refraction /
 * Spectrum) with events plotted along a 90-day timeline. Clicking a trigger
 * event (a tier-1 press placement) highlights the causal chain across the
 * wavelengths — showing how one input triggers compounding outputs over time.
 */

type Wave = "beam" | "medium" | "refraction" | "spectrum";

type Evt = {
  id: string;
  wave: Wave;
  day: number;
  label: string;
  detail: string;
  triggers?: string[]; // ids of events this one triggers
};

const EVENTS: Evt[] = [
  { id: "e1", wave: "beam", day: 0,
    label: "Pitch sent",
    detail: "Thesis piece on quiet-infra brands → Wired, M. Alvarez.",
    triggers: ["e2"] },
  { id: "e2", wave: "beam", day: 7,
    label: "Placed · Wired",
    detail: "Published Oct 11. DA 94. 1.2M monthly readers.",
    triggers: ["e3", "e4", "e5"] },
  { id: "e3", wave: "medium", day: 10,
    label: "Byline refresh",
    detail: "Companion byline shipped to Stratechery leveraging Wired context." },
  { id: "e4", wave: "refraction", day: 14,
    label: "Google indexed · pos 3",
    detail: "northwind.com/wired → indexed, schema-valid, first-page in 7 days.",
    triggers: ["e6", "e7"] },
  { id: "e5", wave: "spectrum", day: 18,
    label: "Video edit shipped",
    detail: "90-second cut of the Wired thesis. Vimeo + embedded in article." },
  { id: "e6", wave: "refraction", day: 28,
    label: "Perplexity · first cite",
    detail: "Perplexity now cites Northwind on category query 'quiet infra B2B'." },
  { id: "e7", wave: "refraction", day: 40,
    label: "ChatGPT · first cite",
    detail: "ChatGPT reaches for Northwind inside answer. Share-of-model +42%." },
  { id: "e8", wave: "spectrum", day: 56,
    label: "Avatar series launched",
    detail: "4-episode AI-avatar series extending the Wired thesis. Weekly cadence." },
  { id: "e9", wave: "beam", day: 72,
    label: "Follow-on placed · WSJ",
    detail: "WSJ reporter cites original Wired piece. Second placement earned downstream." },
];

const WAVES: { k: Wave; name: string; color: string }[] = [
  { k: "beam",       name: "The Beam",       color: "var(--beam)" },
  { k: "medium",     name: "The Medium",     color: "var(--medium)" },
  { k: "refraction", name: "The Refraction", color: "var(--refraction)" },
  { k: "spectrum",   name: "The Spectrum",   color: "var(--spectrum)" },
];

const DAYS_SPAN = 90;

export function PrismOS() {
  const [active, setActive] = useState<string>("e2");

  const activeChain = buildChain(active);

  return (
    <section id="prismos" className="section section--ink-deep" style={{ paddingTop: 112, paddingBottom: 112 }}>
      <div className="container-wide">
        <div style={{ marginBottom: 48, maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 92px)",
              color: "var(--soft-ink)",
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "-0.038em",
              maxWidth: "18ch",
              margin: 0,
            }}
          >
            PrismOS. The attribution map.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: "clamp(17px, 1.4vw, 20px)",
              lineHeight: 1.5,
              color: "var(--soft-ink)",
              opacity: 0.82,
              maxWidth: "60ch",
            }}
          >
            One signal in. Four wavelengths tracked across ninety days. Click an event to trace the chain — press placement to AI citation to video edit — attributed, measured, replayable.
          </p>
        </div>

        {/* Attribution map */}
        <div
          style={{
            background: "var(--charcoal)",
            border: "1px solid var(--slate-border)",
            padding: "32px 28px",
            borderRadius: 0,
          }}
        >
          {/* Chrome */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--slate-border-soft)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B4030" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B4030" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B4030" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--dim-ink)", marginLeft: 10 }}>
                prismos · attribution map · last 90 days
              </span>
            </div>
            <span className="pill--dark pill" style={{ padding: "4px 10px", fontSize: 10 }}>
              <span className="pill-dot" style={{ background: "var(--refraction)" }} />
              live
            </span>
          </div>

          {/* Lanes */}
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 24, columnGap: 20 }}>
            {WAVES.map((wave) => {
              const laneEvents = EVENTS.filter((e) => e.wave === wave.k);
              return (
                <LaneRow
                  key={wave.k}
                  wave={wave}
                  events={laneEvents}
                  active={active}
                  activeChain={activeChain}
                  onSelect={setActive}
                />
              );
            })}
          </div>

          {/* Day axis */}
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "140px 1fr", gap: 20 }}>
            <div />
            <div style={{ position: "relative", height: 20, borderTop: "1px solid var(--slate-border-soft)" }}>
              {[0, 15, 30, 45, 60, 75, 90].map((d) => (
                <span
                  key={d}
                  style={{
                    position: "absolute",
                    left: `${(d / DAYS_SPAN) * 100}%`,
                    top: 4,
                    transform: "translateX(-50%)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--dim-ink)",
                  }}
                >
                  d{d}
                </span>
              ))}
            </div>
          </div>

          {/* Readout */}
          <ActiveReadout evt={EVENTS.find((e) => e.id === active)!} chain={activeChain} />
        </div>
      </div>
    </section>
  );
}

function LaneRow({
  wave, events, active, activeChain, onSelect,
}: {
  wave: { k: Wave; name: string; color: string };
  events: Evt[];
  active: string;
  activeChain: Set<string>;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignSelf: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>
          λ · {wave.k.toUpperCase()}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--soft-ink)", letterSpacing: "-0.012em" }}>
          {wave.name}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          height: 56,
          background: "repeating-linear-gradient(90deg, rgba(232,227,213,0.06) 0, rgba(232,227,213,0.06) 1px, transparent 1px, transparent calc(100% / 90 * 15))",
          borderTop: "1px solid rgba(232,227,213,0.08)",
          borderBottom: "1px solid rgba(232,227,213,0.08)",
        }}
      >
        {/* Lane connector line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0, right: 0, top: "50%",
            borderTop: "1px dashed rgba(232,227,213,0.14)",
          }}
        />

        {events.map((e) => {
          const isActive = e.id === active;
          const inChain = activeChain.has(e.id);
          const left = `${(e.day / DAYS_SPAN) * 100}%`;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => onSelect(e.id)}
              aria-label={`${e.label} on day ${e.day}`}
              aria-pressed={isActive}
              style={{
                position: "absolute",
                top: "50%",
                left,
                transform: "translate(-50%, -50%)",
                width: 160,
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: isActive ? 16 : inChain ? 12 : 10,
                  height: isActive ? 16 : inChain ? 12 : 10,
                  background: inChain ? wave.color : "transparent",
                  border: `1.5px solid ${wave.color}`,
                  borderRadius: "50%",
                  margin: "0 auto",
                  transition: "all 220ms var(--ease-standard)",
                  boxShadow: isActive ? `0 0 0 5px ${wave.color}33` : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  color: isActive ? "var(--soft-ink)" : (inChain ? "var(--soft-ink)" : "var(--dim-ink)"),
                  opacity: isActive || inChain ? 1 : 0.7,
                  textTransform: "uppercase",
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "normal",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {e.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function buildChain(startId: string): Set<string> {
  const chain = new Set<string>([startId]);
  const walk = (id: string) => {
    const node = EVENTS.find((e) => e.id === id);
    if (!node?.triggers) return;
    for (const t of node.triggers) {
      if (!chain.has(t)) {
        chain.add(t);
        walk(t);
      }
    }
  };
  walk(startId);
  return chain;
}

function ActiveReadout({ evt, chain }: { evt: Evt; chain: Set<string> }) {
  const chainCount = chain.size;
  const waveColor = WAVES.find((w) => w.k === evt.wave)!.color;
  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 24,
        borderTop: "1px solid var(--slate-border-soft)",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 24,
      }}
      className="p-prismos-readout"
    >
      <div style={{ gridColumn: "span 3" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>
          SELECTED EVENT
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: waveColor }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--soft-ink)", letterSpacing: "-0.015em" }}>
            {evt.label}
          </span>
        </div>
        <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>
          DAY {evt.day} · λ {evt.wave.toUpperCase()}
        </div>
      </div>
      <div style={{ gridColumn: "span 6" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>
          CAUSAL CHAIN
        </div>
        <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "var(--soft-ink)", opacity: 0.86 }}>
          {evt.detail}
        </p>
      </div>
      <div style={{ gridColumn: "span 3", textAlign: "right" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--dim-ink)" }}>
          DOWNSTREAM EVENTS
        </div>
        <div style={{ marginTop: 8, fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "var(--refraction)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          {chainCount}
        </div>
        <div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--dim-ink)" }}>
          triggered across the spectrum
        </div>
      </div>
    </div>
  );
}
