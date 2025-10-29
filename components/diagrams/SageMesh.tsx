"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type Pillar = "Signal" | "Authority" | "Growth" | "Exposure";
type Preset = "calm" | "dynamic";

const PILLARS: Record<Pillar, { x: number; y: number; blurb: string }> = {
  Signal:    { x: 18, y: 30, blurb: "Narratives & earned media angles that generate market signal." },
  Authority: { x: 82, y: 28, blurb: "Expert content, executive bylines, and entity SEO for trust." },
  Growth:    { x: 24, y: 78, blurb: "Technical & programmatic SEO, CRO, and conversion design." },
  Exposure:  { x: 84, y: 76, blurb: "Distribution ops: podcasts, syndication, newsletter loops." },
};

function allPairs<T extends string>(keys: T[]) {
  const out: [T, T][] = [];
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) out.push([keys[i], keys[j]]);
  return out;
}

function curve(A: { x: number; y: number }, B: { x: number; y: number }, bow = 0.22) {
  // cubic with mid control points to create elegant "mesh" arcs
  const mx = (A.x + B.x) / 2;
  const my = (A.y + B.y) / 2;
  const nx = mx + (B.y - A.y) * bow;
  const ny = my - (B.x - A.x) * bow;
  return `M ${A.x},${A.y} C ${nx},${ny} ${nx},${ny} ${B.x},${B.y}`;
}

export default function SageMeshPro({
  preset = "dynamic",
  particles = 24,
  className = "",
}: {
  preset?: Preset;
  particles?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const keys = Object.keys(PILLARS) as Pillar[];
  const edges = useMemo(() => allPairs(keys), [keys]);
  const [active, setActive] = useState<Pillar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // particle seeds
  const seeds = useMemo(() => Array.from({ length: particles }, (_, i) => i + 1), [particles]);

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">SAGE Mesh</h2>
        <p className="mt-2 text-fg-300 max-w-2xl">
          A non-linear, fully connected network. Each pillar amplifies the others, producing compounding visibility.
        </p>
      </div>

      <div className="rounded-2xl border border-line-700 bg-bg-700 p-4 md:p-6">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="block w-full h-[420px]"
          role="img"
          aria-label="SAGE mesh diagram with four pillars connected by animated amplification flows"
        >
          <defs>
            {/* Soft noise for enterprise texture */}
            <filter id="noise" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch" result="n" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0 .04 .06 .04 0"/>
              </feComponentTransfer>
            </filter>

            {/* Grid lines */}
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="0.2" />
            </pattern>

            {/* Node glow */}
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--sd-accent-400)" stopOpacity=".55"/>
              <stop offset="100%" stopColor="var(--sd-accent-400)" stopOpacity="0"/>
            </radialGradient>

            {/* Flow gradient */}
            <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--sd-accent-500)" />
              <stop offset="100%" stopColor="var(--sd-gold-400)" />
            </linearGradient>

            <style>
              {`
              @keyframes dash { to { stroke-dashoffset: -400; } }
              @keyframes orb  { to { transform: rotate(360deg); } }
              `}
            </style>
          </defs>

          {/* Field */}
          <rect x="0" y="0" width="100" height="100" fill="url(#grid)" opacity=".55" />
          <rect x="0" y="0" width="100" height="100" filter="url(#noise)" opacity=".75" />

          {/* Central nexus resonance */}
          <g transform="translate(50 52)">
            {!reduce && (
              <>
                <motion.circle r="10" fill="none" stroke="url(#flow)" strokeOpacity=".15"
                  initial={{ r: 0 }} animate={{ r: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}/>
                <motion.circle r="18" fill="none" stroke="url(#flow)" strokeOpacity=".08"
                  initial={{ r: 0 }} animate={{ r: [0, 18, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}/>
              </>
            )}
            <circle r="1.6" fill="var(--sd-accent-500)" opacity=".85" />
          </g>

          {/* Amplification edges */}
          {edges.map(([a, b], i) => {
            const A = PILLARS[a], B = PILLARS[b];
            const d = curve(A, B, preset === "dynamic" ? 0.26 : 0.18);
            const isLit = active === a || active === b || active === null;
            return (
              <path
                key={`${a}-${b}`}
                d={d}
                fill="none"
                stroke="url(#flow)"
                strokeLinecap="round"
                strokeWidth={isLit ? 0.85 : 0.55}
                strokeOpacity={isLit ? 0.75 : 0.35}
                style={
                  reduce ? undefined : { strokeDasharray: "10 12", animation: `dash ${6 + (i % 3)}s linear infinite` }
                }
              />
            );
          })}

          {/* Orbiting particles on paths (subtle, enterprise) */}
          {!reduce &&
            edges.slice(0, 3).map(([a, b], i) => {
              const A = PILLARS[a], B = PILLARS[b];
              const midx = (A.x + B.x) / 2;
              const midy = (A.y + B.y) / 2;
              return (
                <g key={`orb-${i}`} transform={`translate(${midx} ${midy})`}>
                  <g style={{ transformOrigin: "center", animation: "orb 12s linear infinite", animationDelay: `${i * 1.2}s`}}>
                    <circle cx="6" cy="0" r="0.8" fill="var(--sd-gold-400)" opacity=".75" />
                    <circle cx="-6" cy="0" r="0.6" fill="var(--sd-accent-500)" opacity=".6" />
                  </g>
                </g>
              );
            })}

          {/* Pillar nodes */}
          {(keys).map((k) => {
            const n = PILLARS[k];
            const hot = active === k;
            return (
              <g key={k} transform={`translate(${n.x} ${n.y})`}>
                <circle r="8" fill="url(#nodeGlow)" opacity={hot ? .85 : .45} />
                <motion.circle
                  r="3.8"
                  stroke="var(--sd-line-600)"
                  strokeWidth=".4"
                  fill="var(--sd-accent-500)"
                  tabIndex={0}
                  aria-label={`${k}: ${n.blurb}`}
                  onMouseEnter={() => setActive(k)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(k)}
                  onBlur={() => setActive(null)}
                  animate={reduce ? {} : { scale: hot ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <text x="0" y="-7.5" fontSize="3" textAnchor="middle"
                      className="fill-[var(--sd-fg-100)]" style={{ fontWeight: 700 }}>{k}</text>
              </g>
            );
          })}
        </svg>

        {/* Live caption */}
        <div className="mt-4 rounded-lg border border-line-700 bg-bg-800 p-4" aria-live="polite">
          <div className="text-sm text-fg-300">
            <strong className="text-fg-100">{active ?? "Hover a pillar"}</strong>
            <span className="ml-2">
              {active ? PILLARS[active].blurb : " to see how its amplification influences the mesh."}
            </span>
          </div>
        </div>
      </div>

      {/* Legend + export */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-fg-300">
          <span className="inline-flex h-2 w-10 rounded-full"
                style={{ background: "linear-gradient(90deg,var(--sd-accent-500),var(--sd-gold-400))" }} />
          <span>Amplification flow</span>
          <span className="ml-4 inline-block h-2 w-2 rounded-full bg-[var(--sd-accent-500)]" />
          <span>Pillar node</span>
        </div>
        <ExportSvgButton targetRef={svgRef} />
      </div>
    </div>
  );
}

/** Inline export button (SVG download for decks) */
function ExportSvgButton({ targetRef }: { targetRef: React.RefObject<SVGSVGElement> }) {
  const onClick = () => {
    const svg = targetRef.current;
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sage-mesh.svg"; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button onClick={onClick}
      className="rounded-md border border-line-700 bg-bg-700 px-3 py-1.5 text-xs text-fg-100 hover:bg-bg-800">
      Export SVG
    </button>
  );
}
