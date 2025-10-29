"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

/**
 * SAGE Mesh — a non-linear network where each pillar amplifies its counterparts.
 * - Nodes: Signal, Authority, Growth, Exposure
 * - Edges: fully connected with animated flow
 * - On hover/focus: node glows and shows a small tooltip
 * - Respects prefers-reduced-motion
 */

type NodeKey = "Signal" | "Authority" | "Growth" | "Exposure";

const NODES: Record<NodeKey, { x: number; y: number; blurb: string }> = {
  Signal: {
    x: 18,
    y: 28,
    blurb:
      "Narrative design & earned media angles that generate market signal and demand.",
  },
  Authority: {
    x: 82,
    y: 32,
    blurb:
      "Executive bylines, expert content, and entity SEO that establish durable trust.",
  },
  Growth: {
    x: 26,
    y: 78,
    blurb:
      "Technical & programmatic SEO, conversion design, and CRO sprints that scale discovery.",
  },
  Exposure: {
    x: 84,
    y: 76,
    blurb:
      "Distribution ops—syndication, podcast tours, and social loops—to compound reach.",
  },
};

function pairs(keys: NodeKey[]) {
  const out: [NodeKey, NodeKey][] = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) out.push([keys[i], keys[j]]);
  }
  return out;
}

export default function SageMesh() {
  const k = Object.keys(NODES) as NodeKey[];
  const E = useMemo(() => pairs(k), [k]);
  const [active, setActive] = useState<NodeKey | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Title / Caption */}
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-inter-tight)] tracking-tight">
          SAGE Mesh
        </h2>
        <p className="mt-2 text-fg-300 max-w-2xl">
          Not a line or a loop—a mesh. Each pillar amplifies the others. The
          effect is compounding visibility.
        </p>
      </div>

      <div className="rounded-2xl border border-line-700 bg-bg-700 p-4 md:p-6">
        <svg
          viewBox="0 0 100 100"
          className="block h-[360px] w-full md:h-[420px]"
          role="img"
          aria-label="SAGE mesh diagram showing four nodes connected in a fully-amplifying network"
        >
          <defs>
            {/* soft node glow */}
            <radialGradient id="glow" r="60%" cx="50%" cy="50%">
              <stop
                offset="0%"
                stopColor="var(--sd-accent-400)"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="var(--sd-accent-400)"
                stopOpacity="0"
              />
            </radialGradient>

            {/* flowing stroke gradient */}
            <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--sd-accent-500)" />
              <stop offset="100%" stopColor="var(--sd-gold-400)" />
            </linearGradient>

            {/* animated dash pattern */}
            <style>
              {`
                @keyframes dash {
                  to { stroke-dashoffset: -200; }
                }
                @keyframes pulse {
                  0%,100% { filter: drop-shadow(0 0 0 rgba(70,195,138,0)); }
                  50% { filter: drop-shadow(0 0 8px rgba(70,195,138,0.5)); }
                }
              `}
            </style>
          </defs>

          {/* Ambient mesh field */}
          <rect x="0" y="0" width="100" height="100" fill="url(#bg)" opacity="0" />

          {/* Edges (fully connected) */}
          {E.map(([a, b], i) => {
            const A = NODES[a],
              B = NODES[b];
            const path = `M ${A.x},${A.y} C ${(A.x + B.x) / 2},${A.y} ${
              (A.x + B.x) / 2
            },${B.y} ${B.x},${B.y}`;
            return (
              <motion.path
                key={`${a}-${b}`}
                d={path}
                fill="none"
                stroke="url(#flow)"
                strokeWidth={active ? 0.6 : 0.5}
                strokeLinecap="round"
                strokeOpacity={active ? 0.75 : 0.5}
                style={
                  reduceMotion
                    ? {}
                    : {
                        strokeDasharray: "6 8",
                        animation: "dash 6s linear infinite",
                        animationDelay: `${(i * 400) % 2000}ms`,
                      }
                }
              />
            );
          })}

          {/* Nodes */}
          {k.map((key) => {
            const n = NODES[key];
            const isActive = active === key;
            return (
              <g key={key} transform={`translate(${n.x} ${n.y})`}>
                {/* glow */}
                <circle
                  r={8}
                  fill="url(#glow)"
                  opacity={isActive ? 0.8 : 0.35}
                />
                {/* core */}
                <motion.circle
                  r={3.6}
                  stroke="var(--sd-line-600)"
                  strokeWidth={0.4}
                  fill="var(--sd-accent-500)"
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(key)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  aria-label={`${key}: ${n.blurb}`}
                  style={
                    !reduceMotion
                      ? { animation: "pulse 3.2s ease-in-out infinite" }
                      : {}
                  }
                />
                {/* label */}
                <text
                  x={0}
                  y={-6.8}
                  textAnchor="middle"
                  className="fill-[var(--sd-fg-100)]"
                  fontSize="3"
                  style={{ fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  {key}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip panel */}
        <div
          className={`mt-4 rounded-lg border border-line-700 bg-bg-800 p-4 transition ${
            active ? "opacity-100" : "opacity-70"
          }`}
          aria-live="polite"
        >
          <div className="text-sm text-fg-300">
            <strong className="text-fg-100">{active ?? "Hover a node"}</strong>
            <span className="ml-2">
              {active
                ? NODES[active].blurb
                : " to see how each pillar amplifies the others."}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-fg-300">
        <span
          className="inline-flex h-2 w-8 rounded-full"
          style={{
            background:
              "linear-gradient(90deg,var(--sd-accent-500),var(--sd-gold-400))",
          }}
        />
        <span>Amplification flow</span>
        <span className="ml-4 inline-block h-2 w-2 rounded-full bg-[var(--sd-accent-500)]" />
        <span>Pillar node</span>
      </div>
    </div>
  );
}
