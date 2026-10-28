"use client";

import { useId, useState } from "react";

/**
 * PrismMark — Sapient's signature mark.
 *
 * Four pillar rays (PR, Content, SEO/AEO, Video) enter the left face of
 * the prism in parallel. They converge inside and exit the right face as
 * one unified output beam — the brand's full-spectrum market presence.
 *
 * Rendered, not drawn. Soft 3D lighting on the prism body, flowing light
 * particles along each input ray (SMIL animateMotion), a breathing glow on
 * the output cone. Hover an input ray and that pillar highlights.
 */

type Wavelength = "beam" | "medium" | "refraction" | "spectrum";

const RAYS: Array<{
  k: Wavelength;
  color: string;
  pillar: string;
  pillarSub: string;
  yEntry: number; // y where it meets the left face of the prism
  yStart: number; // y at the left edge of the SVG
}> = [
  { k: "beam",       color: "#FF4F1A", pillar: "PR",         pillarSub: "Earned Media",   yEntry: 230, yStart: 230 },
  { k: "medium",     color: "#F59E0B", pillar: "Content",    pillarSub: "Expert Editorial", yEntry: 290, yStart: 290 },
  { k: "refraction", color: "#E8FF3A", pillar: "SEO + AEO",  pillarSub: "Answer Engines",  yEntry: 350, yStart: 350 },
  { k: "spectrum",   color: "#0E8A6A", pillar: "Video",      pillarSub: "Full Production", yEntry: 410, yStart: 410 },
];

// Prism geometry (3/4 isometric view)
const APEX_X = 520, APEX_Y = 170;
const BL_X   = 390, BL_Y   = 460;
const BR_X   = 650, BR_Y   = 460;
// Back face offset for perspective
const BACK_DX = 48, BACK_DY = -32;
// Entry / exit midpoints on faces
const EXIT_Y = 320;

export function PrismMark({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<Wavelength | null>(null);
  const uid = useId().replace(/:/g, "");

  return (
    <div className={className} style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox="0 0 1200 640"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "auto" }}
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>The Sapient Prism</title>
        <desc id={`${uid}-desc`}>
          Four pillar rays — PR, Content, SEO and AEO, and Video — converge through a prism and exit as one unified beam of market presence.
        </desc>

        <defs>
          {/* Soft radial glow behind the prism */}
          <radialGradient id={`${uid}-aura`} cx="50%" cy="50%" r="60%">
            <stop offset="0%"  stopColor="#FF4F1A" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.06" />
            <stop offset="80%" stopColor="#0E8A6A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0E8A6A" stopOpacity="0" />
          </radialGradient>

          {/* Prism body — soft 3D glass gradient */}
          <linearGradient id={`${uid}-face`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stopColor="#FDFBF6" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#E2DED5" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#C9C2B2" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`${uid}-face-right`} x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%"  stopColor="#C9C2B2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8A857A" stopOpacity="0.9" />
          </linearGradient>

          {/* Highlight across the prism face */}
          <linearGradient id={`${uid}-highlight`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Output beam — unified spectrum */}
          <linearGradient id={`${uid}-beam`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#FDFBF6" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FDFBF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FDFBF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-beam-fringe`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#FF4F1A" stopOpacity="0.65" />
            <stop offset="33%"  stopColor="#F59E0B" stopOpacity="0.55" />
            <stop offset="66%"  stopColor="#E8FF3A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0E8A6A" stopOpacity="0.6" />
          </linearGradient>

          {/* Per-ray gradients (left to prism) */}
          {RAYS.map((r) => (
            <linearGradient
              key={`g-${r.k}`}
              id={`${uid}-ray-${r.k}`}
              x1="0" y1={r.yStart}
              x2={APEX_X} y2={r.yEntry}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={r.color} stopOpacity="0" />
              <stop offset="30%"  stopColor={r.color} stopOpacity="0.65" />
              <stop offset="100%" stopColor={r.color} stopOpacity="1" />
            </linearGradient>
          ))}

          {/* Soft glow filter */}
          <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`${uid}-sharp-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Flowing particle paths */}
          {RAYS.map((r) => (
            <path
              key={`p-${r.k}`}
              id={`${uid}-path-${r.k}`}
              d={`M 0 ${r.yStart} L ${findEntryX(r.yEntry)} ${r.yEntry}`}
            />
          ))}
        </defs>

        {/* Background aura */}
        <rect width="1200" height="640" fill={`url(#${uid}-aura)`} />

        {/* ─── OUTPUT BEAM (right side) — unified cone ─── */}
        <g style={{ mixBlendMode: "normal" }}>
          {/* Soft outer glow (blurred) */}
          <path
            d={`M ${findExitX(EXIT_Y)} ${EXIT_Y - 10} L 1200 ${EXIT_Y - 160} L 1200 ${EXIT_Y + 160} L ${findExitX(EXIT_Y)} ${EXIT_Y + 10} Z`}
            fill={`url(#${uid}-beam-fringe)`}
            filter={`url(#${uid}-soft)`}
            opacity="0.55"
          >
            <animate attributeName="opacity" values="0.4; 0.7; 0.4" dur="4s" repeatCount="indefinite" />
          </path>
          {/* Core bright beam */}
          <path
            d={`M ${findExitX(EXIT_Y)} ${EXIT_Y - 2} L 1200 ${EXIT_Y - 90} L 1200 ${EXIT_Y + 90} L ${findExitX(EXIT_Y)} ${EXIT_Y + 2} Z`}
            fill={`url(#${uid}-beam)`}
          />
          {/* Light pulse along the beam axis */}
          <line
            x1={findExitX(EXIT_Y)} y1={EXIT_Y}
            x2="1200" y2={EXIT_Y}
            stroke="#FDFBF6"
            strokeWidth="1.2"
            opacity="0.4"
          />
        </g>

        {/* ─── INPUT RAYS (left side) ─── */}
        {RAYS.map((r) => {
          const isHov = hovered === r.k;
          const dimmed = hovered !== null && !isHov;
          return (
            <g
              key={r.k}
              onMouseEnter={() => setHovered(r.k)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(r.k)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${r.pillar} · ${r.pillarSub}`}
              style={{
                opacity: dimmed ? 0.3 : 1,
                transition: "opacity 220ms cubic-bezier(.2,.8,.2,1)",
                cursor: "pointer",
              }}
            >
              {/* Ray line (solid gradient) */}
              <line
                x1="0" y1={r.yStart}
                x2={findEntryX(r.yEntry)} y2={r.yEntry}
                stroke={`url(#${uid}-ray-${r.k})`}
                strokeWidth={isHov ? 3 : 2}
                strokeLinecap="round"
                style={{ transition: "stroke-width 220ms cubic-bezier(.2,.8,.2,1)" }}
              />

              {/* Soft glow version behind */}
              <line
                x1="0" y1={r.yStart}
                x2={findEntryX(r.yEntry)} y2={r.yEntry}
                stroke={r.color}
                strokeWidth={isHov ? 7 : 4.5}
                strokeLinecap="round"
                opacity="0.22"
                filter={`url(#${uid}-soft)`}
                style={{ transition: "stroke-width 220ms cubic-bezier(.2,.8,.2,1)" }}
              />

              {/* Flowing light particles — SMIL animateMotion */}
              {[0, 0.4, 0.8].map((delay, i) => (
                <circle
                  key={i}
                  r={isHov ? 4 : 3}
                  fill={r.color}
                  filter={`url(#${uid}-sharp-glow)`}
                >
                  <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                    rotate="auto"
                  >
                    <mpath href={`#${uid}-path-${r.k}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                  />
                </circle>
              ))}

              {/* Entry glow at the prism */}
              <circle
                cx={findEntryX(r.yEntry)} cy={r.yEntry}
                r={isHov ? 10 : 7}
                fill={r.color}
                opacity={isHov ? 0.4 : 0.22}
                filter={`url(#${uid}-soft)`}
                style={{ transition: "all 220ms cubic-bezier(.2,.8,.2,1)" }}
              />
              <circle
                cx={findEntryX(r.yEntry)} cy={r.yEntry}
                r={isHov ? 3.5 : 2.5}
                fill={r.color}
                style={{ transition: "r 220ms cubic-bezier(.2,.8,.2,1)" }}
              />

              {/* Label at start of ray (left) */}
              <g transform={`translate(16, ${r.yStart - 10})`}>
                <text
                  x="0" y="0"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  letterSpacing="0.14em"
                  fill={isHov ? r.color : "#403C35"}
                  fontWeight="700"
                  style={{ transition: "fill 220ms cubic-bezier(.2,.8,.2,1)" }}
                >
                  {r.pillar.toUpperCase()}
                </text>
                <text
                  x="0" y="14"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  letterSpacing="0.1em"
                  fill="#8A857A"
                >
                  {r.pillarSub}
                </text>
              </g>
            </g>
          );
        })}

        {/* ─── PRISM BODY (3/4 isometric) ─── */}
        {/* Soft shadow behind the prism */}
        <ellipse
          cx={APEX_X - 20} cy={BR_Y + 20}
          rx="200" ry="18"
          fill="#0A0A08"
          opacity="0.08"
          filter={`url(#${uid}-soft)`}
        />

        {/* Breathing aura behind prism body */}
        <polygon
          points={`${BL_X - 15},${BL_Y + 10} ${APEX_X},${APEX_Y - 20} ${BR_X + 15},${BR_Y + 10}`}
          fill="#FDFBF6"
          opacity="0.5"
          filter={`url(#${uid}-soft)`}
        >
          <animate attributeName="opacity" values="0.3;0.65;0.3" dur="4.5s" repeatCount="indefinite" />
        </polygon>

        {/* Back face (visible through glass) */}
        <polygon
          points={`${BL_X + BACK_DX},${BL_Y + BACK_DY} ${APEX_X + BACK_DX},${APEX_Y + BACK_DY} ${BR_X + BACK_DX},${BR_Y + BACK_DY}`}
          fill="rgba(10,10,8,0.08)"
          stroke="rgba(10,10,8,0.25)"
          strokeWidth="0.6"
        />

        {/* Right face */}
        <polygon
          points={`${BR_X},${BR_Y} ${APEX_X},${APEX_Y} ${APEX_X + BACK_DX},${APEX_Y + BACK_DY} ${BR_X + BACK_DX},${BR_Y + BACK_DY}`}
          fill={`url(#${uid}-face-right)`}
          stroke="#0A0A08"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Front triangular face */}
        <polygon
          points={`${BL_X},${BL_Y} ${APEX_X},${APEX_Y} ${BR_X},${BR_Y}`}
          fill={`url(#${uid}-face)`}
          stroke="#0A0A08"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Highlight sweep on the front face (subtle 3D cue) */}
        <polygon
          points={`${BL_X + 40},${BL_Y - 20} ${APEX_X - 10},${APEX_Y + 40} ${APEX_X + 30},${APEX_Y + 70} ${BL_X + 80},${BL_Y - 10}`}
          fill={`url(#${uid}-highlight)`}
          opacity="0.6"
        />

        {/* Edge where front meets right (apex to BR) */}
        <line x1={APEX_X} y1={APEX_Y} x2={BR_X} y2={BR_Y} stroke="#0A0A08" strokeWidth="1.6" strokeLinecap="round" />

        {/* Internal refraction hint lines (subtle) */}
        <g opacity="0.25">
          {RAYS.map((r) => (
            <line
              key={`internal-${r.k}`}
              x1={findEntryX(r.yEntry)} y1={r.yEntry}
              x2={findExitX(EXIT_Y)} y2={EXIT_Y}
              stroke={r.color}
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          ))}
        </g>

        {/* ─── OUTPUT LABEL ─── */}
        <g transform="translate(1180, 320)" textAnchor="end">
          <text
            x="0" y="-28"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.14em"
            fontWeight="700"
            fill="#A82B10"
          >
            UNIFIED OUTPUT
          </text>
          <text
            x="0" y="4"
            fontFamily="var(--font-display)"
            fontSize="28"
            fontWeight="700"
            fill="#0A0A08"
            letterSpacing="-0.025em"
          >
            One brand presence.
          </text>
          <text
            x="0" y="30"
            fontFamily="var(--font-sans)"
            fontSize="13"
            fill="#403C35"
          >
            Everywhere the market reads.
          </text>
        </g>

        {/* Input group label */}
        <g transform="translate(16, 180)">
          <text
            x="0" y="0"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.14em"
            fontWeight="700"
            fill="#A82B10"
          >
            FOUR PILLARS
          </text>
        </g>
      </svg>
    </div>
  );
}

/** Where a horizontal ray at y hits the left face of the prism. */
function findEntryX(y: number): number {
  // left face: from (APEX_X, APEX_Y) to (BL_X, BL_Y) — linear interp on y
  const t = (y - APEX_Y) / (BL_Y - APEX_Y);
  return APEX_X + t * (BL_X - APEX_X);
}

/** Where a horizontal ray at y hits the right face of the prism. */
function findExitX(y: number): number {
  const t = (y - APEX_Y) / (BR_Y - APEX_Y);
  return APEX_X + t * (BR_X - APEX_X);
}
