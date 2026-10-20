export function VectorLockSchematic() {
  const gridMinor = Array.from({ length: 46 }, (_, i) => i * 20);
  const gridMajor = Array.from({ length: 16 }, (_, i) => i * 60);
  const gridMinorV = Array.from({ length: 32 }, (_, i) => i * 20);
  const gridMajorV = Array.from({ length: 11 }, (_, i) => i * 60);

  // Beam path — steeper, more aggressive climb to top-right terminus
  const beamPath = "M 420 320 Q 540 280 640 210 T 870 60";

  return (
    <svg
      viewBox="0 0 920 620"
      className="vl-schematic"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Vector Lock schematic: three discipline vectors converging at a lock, exiting as one unified momentum beam toward unified velocity lock."
    >
      <defs>
        {/* Multi-color beam core gradient — richer, with white-hot terminus */}
        <linearGradient id="vl-beam-core" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9A2E0E" />
          <stop offset="25%" stopColor="#E54A1C" />
          <stop offset="55%" stopColor="#FF5722" />
          <stop offset="80%" stopColor="#FF9A3E" />
          <stop offset="100%" stopColor="#FFD47A" />
        </linearGradient>

        <linearGradient id="vl-beam-highlight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFC27A" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#FFE6B8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
        </linearGradient>

        {/* Convergence flash — bright center */}
        <radialGradient id="vl-flash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#D4EB00" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#FF8A3E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>

        {/* Terminus reticle glow */}
        <radialGradient id="vl-terminus-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD47A" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#FF5722" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>

        <clipPath id="vl-plot">
          <rect x="40" y="60" width="840" height="500" />
        </clipPath>

        {/* Beam path reused by particles */}
        <path id="vl-beam-path-ref" d={beamPath} />
      </defs>

      {/* ────────── Grid ────────── */}
      <g aria-hidden="true">
        {gridMinor.map((x) => (
          <line key={`gvi-${x}`} className="grid-line--minor" x1={x} y1={60} x2={x} y2={560} />
        ))}
        {gridMinorV.map((y) => (
          <line key={`ghi-${y}`} className="grid-line--minor" x1={40} y1={y} x2={880} y2={y} />
        ))}
        {gridMajor.map((x) => (
          <line key={`gvm-${x}`} className="grid-line--major" x1={x} y1={60} x2={x} y2={560} />
        ))}
        {gridMajorV.map((y) => (
          <line key={`ghm-${y}`} className="grid-line--major" x1={40} y1={y} x2={880} y2={y} />
        ))}
      </g>

      {/* Plot frame + corner marks */}
      <rect className="plot-frame" x={40} y={60} width={840} height={500} />
      <g className="corner-ticks" aria-hidden="true">
        <line x1={14} y1={14} x2={34} y2={14} />
        <line x1={14} y1={14} x2={14} y2={34} />
        <line x1={906} y1={14} x2={886} y2={14} />
        <line x1={906} y1={14} x2={906} y2={34} />
        <line x1={14} y1={606} x2={34} y2={606} />
        <line x1={14} y1={606} x2={14} y2={586} />
        <line x1={906} y1={606} x2={886} y2={606} />
        <line x1={906} y1={606} x2={906} y2={586} />
      </g>

      {/* Sheet metadata */}
      <g className="annot annot--phase">
        <text className="label" x={50} y={34}>Schematic</text>
        <text className="callout" x={50} y={50}>SD · VL — 01 · Scale 1:25.4</text>
      </g>
      <g className="annot annot--phase">
        <text className="label" x={460} y={34} textAnchor="middle">Alignment</text>
        <text className="title" x={460} y={52} textAnchor="middle">Lock Established</text>
      </g>
      <g className="annot annot--phase">
        <text className="label volt" x={870} y={34} textAnchor="end">Unified Lock</text>
        <text className="title signal" x={870} y={52} textAnchor="end">Vmax · +Δv · Terminal</text>
      </g>

      {/* Side vertical ruler — tier 2 */}
      <g className="annot annot--phase annot--tier2" aria-hidden="true">
        <line x1={850} y1={60} x2={850} y2={560} stroke="var(--vl-carbon)" strokeWidth={1} />
        {[80, 140, 200, 260, 320, 380, 440, 500, 560].map((y, i) => (
          <g key={`rt-${y}`}>
            <line x1={850} y1={y} x2={858} y2={y} stroke="var(--vl-carbon)" strokeWidth={1} />
            <text className="callout" x={862} y={y + 3}>{(10 + i * 10).toString().padStart(2, "0")}</text>
          </g>
        ))}
        {Array.from({ length: 25 }, (_, i) => 80 + i * 20).map((y) => (
          <line key={`rtm-${y}`} x1={850} y1={y} x2={854} y2={y} stroke="var(--vl-text-soft)" strokeWidth={0.5} />
        ))}
      </g>

      {/* ────────── ORIGIN annotation blocks ────────── */}
      <g className="annot annot--pr">
        <text className="label" x={60} y={178}>Origin · 01</text>
        <text className="title" x={60} y={196}>Digital PR</text>
        <text className="callout" x={60} y={212}>Launch · 073.2°</text>
        <text className="callout" x={60} y={226}>Velocity · 340 m/s</text>
        <text className="callout" x={60} y={240}>T — 00:04:13</text>
      </g>
      <g className="annot annot--content">
        <text className="label" x={60} y={320}>Origin · 02</text>
        <text className="title" x={60} y={338}>Strategic Content</text>
        <text className="callout" x={60} y={354}>Launch · 090.0°</text>
        <text className="callout" x={60} y={368}>Velocity · 440 m/s</text>
        <text className="callout" x={60} y={382}>T — 00:04:12</text>
      </g>
      <g className="annot annot--search">
        <text className="label" x={60} y={460}>Origin · 03</text>
        <text className="title" x={60} y={478}>SEO · AEO · GEO</text>
        <text className="callout" x={60} y={494}>Launch · 107.8°</text>
        <text className="callout" x={60} y={508}>Velocity · 340 m/s</text>
        <text className="callout" x={60} y={522}>T — 00:04:12</text>
      </g>
      <g className="annot annot--video">
        <text className="label dim" x={60} y={548}>Origin · 04 · Optional</text>
        <text className="title dim" x={60} y={562}>Video Production</text>
      </g>

      {/* ────────── Incoming vectors ────────── */}
      {/* PR cluster */}
      <g clipPath="url(#vl-plot)">
        <path className="ghost-trail ghost-trail--pr" d="M 170 160 Q 290 170 410 300" />
        <path className="ghost-trail ghost-trail--pr" d="M 170 182 Q 290 194 410 320" style={{ animationDelay: "0.7s" }} />
        <path className="vec-incoming vec-incoming--pr" d="M 170 172 Q 290 184 410 310" />
        <polygon className="vec-head vec-head--pr" points="416,310 404,304 402,316" />
      </g>

      {/* CONTENT cluster */}
      <g clipPath="url(#vl-plot)">
        <path className="ghost-trail ghost-trail--content" d="M 170 300 L 410 310" />
        <path className="ghost-trail ghost-trail--content" d="M 170 332 L 410 322" style={{ animationDelay: "0.75s" }} />
        <path className="vec-incoming vec-incoming--content" d="M 170 316 L 410 316" />
        <polygon className="vec-head vec-head--content" points="416,316 404,310 404,322" />
      </g>

      {/* SEARCH cluster */}
      <g clipPath="url(#vl-plot)">
        <path className="ghost-trail ghost-trail--search" d="M 170 460 Q 290 450 410 332" />
        <path className="ghost-trail ghost-trail--search" d="M 170 440 Q 290 428 410 312" style={{ animationDelay: "0.8s" }} />
        <path className="vec-incoming vec-incoming--search" d="M 170 450 Q 290 440 410 322" />
        <polygon className="vec-head vec-head--search" points="416,322 404,316 404,328" />
      </g>

      {/* VIDEO optional */}
      <g clipPath="url(#vl-plot)">
        <path className="vec-optional" d="M 170 540 Q 290 500 410 334" />
      </g>

      {/* Mid-flight velocity callouts — tier 2 */}
      <g className="annot annot--pr annot--tier2">
        <text className="callout" x={275} y={200}>Vθ · 23.4</text>
      </g>
      <g className="annot annot--content annot--tier2">
        <text className="callout" x={275} y={308}>Vθ · 23.4</text>
      </g>
      <g className="annot annot--search annot--tier2">
        <text className="callout" x={275} y={432}>Vθ · 23.4</text>
      </g>

      {/* ────────── Convergence zone ────────── */}
      <circle className="convergence-flash" cx={416} cy={316} r={70} fill="url(#vl-flash)" />
      <circle className="convergence-ring-expand" cx={416} cy={316} r={30} fill="none" stroke="var(--vl-signal)" strokeWidth={1.5} />
      <circle className="convergence-ring" cx={416} cy={316} r={30} fill="none" stroke="var(--vl-carbon)" strokeWidth={1} strokeDasharray="3 3" />
      <g className="convergence-marks">
        <line x1={416} y1={290} x2={416} y2={302} stroke="var(--vl-carbon)" strokeWidth={1} />
        <line x1={416} y1={330} x2={416} y2={342} stroke="var(--vl-carbon)" strokeWidth={1} />
        <line x1={390} y1={316} x2={402} y2={316} stroke="var(--vl-carbon)" strokeWidth={1} />
        <line x1={430} y1={316} x2={442} y2={316} stroke="var(--vl-carbon)" strokeWidth={1} />
      </g>

      <g className="annot annot--lock">
        <line className="annot-leader" x1={430} y1={296} x2={476} y2={256} />
        <text className="title volt" x={482} y={248}>Convergence Lock</text>
        <text className="value" x={482} y={266}>T + 00:00:00</text>
        <text className="callout" x={482} y={280}>ALGN · 0.986</text>
      </g>

      {/* ────────── Unified momentum beam (THE HERO) ────────── */}
      <g clipPath="url(#vl-plot)">
        {/* Terminus glow halo */}
        <circle className="terminus-glow" cx={870} cy={60} r={90} fill="url(#vl-terminus-glow)" />

        {/* Outermost diffuse glow */}
        <path className="beam-glow-outer" d={beamPath} fill="none" />
        {/* Mid glow */}
        <path className="beam-glow-mid" d={beamPath} fill="none" />
        {/* Core beam */}
        <path className="beam-core" d={beamPath} fill="none" />
        {/* Highlight */}
        <path className="beam-highlight" d={beamPath} fill="none" />

        {/* Ghost trailing paths */}
        <path className="beam-ghost" d="M 420 334 Q 540 300 640 236 T 870 86" fill="none" style={{ animationDelay: "2.8s" }} />
        <path className="beam-ghost" d="M 420 346 Q 540 316 640 258 T 870 108" fill="none" style={{ animationDelay: "3.0s" }} />
        <path className="beam-ghost" d="M 420 308 Q 540 266 640 192 T 870 42" fill="none" style={{ animationDelay: "2.9s" }} />

        {/* Kinetic particles traveling the beam */}
        <g className="beam-particles">
          <circle r={2.5} fill="#FFE6B8">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="4.2s" rotate="auto">
              <mpath href="#vl-beam-path-ref" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="4.2s" />
          </circle>
          <circle r={2} fill="#FFD47A">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="4.8s" rotate="auto">
              <mpath href="#vl-beam-path-ref" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="4.8s" />
          </circle>
          <circle r={1.5} fill="#D4EB00">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="5.4s" rotate="auto">
              <mpath href="#vl-beam-path-ref" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="5.4s" />
          </circle>
          <circle r={2} fill="#FFC27A">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="6.0s" rotate="auto">
              <mpath href="#vl-beam-path-ref" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="6.0s" />
          </circle>
        </g>
      </g>

      {/* Beam arrow head — larger */}
      <g className="beam-head">
        <polygon points="892,58 854,46 854,82 892,70" fill="url(#vl-beam-core)" />
        <polygon points="886,60 858,50 858,78 886,70" fill="url(#vl-beam-highlight)" />
      </g>

      {/* Terminus target reticle */}
      <g className="terminus-reticle">
        <circle cx={870} cy={60} r={22} fill="none" stroke="var(--vl-signal)" strokeWidth={1.25} />
        <circle cx={870} cy={60} r={32} fill="none" stroke="var(--vl-signal)" strokeWidth={0.75} strokeDasharray="2 3" opacity="0.6" />
        <line x1={870} y1={32} x2={870} y2={42} stroke="var(--vl-signal)" strokeWidth={1} />
        <line x1={870} y1={78} x2={870} y2={88} stroke="var(--vl-signal)" strokeWidth={1} />
        <line x1={842} y1={60} x2={852} y2={60} stroke="var(--vl-signal)" strokeWidth={1} />
        <line x1={888} y1={60} x2={898} y2={60} stroke="var(--vl-signal)" strokeWidth={1} />
      </g>

      {/* Milestone markers */}
      <g className="annot annot--momentum">
        <circle className="milestone-dot" cx={548} cy={252} r={4} />
        <circle className="milestone-dot" cx={660} cy={188} r={4} />
        <circle className="milestone-dot" cx={780} cy={118} r={4} />
        <text className="callout signal" x={556} y={244}>+12.65</text>
        <text className="callout signal" x={668} y={180}>+24.1%</text>
        <text className="callout signal" x={788} y={110}>+41.3%</text>
      </g>

      <g className="annot annot--momentum">
        <text className="label signal" x={620} y={158}>Momentum</text>
        <text className="value signal" x={620} y={176}>Δv +34.6 m/s</text>
      </g>

      {/* Unified lock terminus callout */}
      <g className="annot annot--terminus">
        <line className="annot-leader" x1={850} y1={70} x2={780} y2={110} />
        <text className="label volt" x={776} y={102} textAnchor="end">Unified Velocity Lock</text>
        <text className="callout" x={776} y={118} textAnchor="end">Angle · 0.5° · Hold</text>
      </g>

      {/* Method readout */}
      <g className="annot annot--telemetry">
        <rect className="annot-rect" x={580} y={448} width={262} height={102} />
        <text className="title" x={596} y={468}>Vector Lock · Method</text>
        <line x1={596} y1={476} x2={826} y2={476} stroke="var(--vl-rule)" strokeWidth={1} />
        <text className="label" x={596} y={494}>Phase</text>
        <text className="value" x={826} y={494} textAnchor="end">Define · Sense · Lock</text>
        <text className="label" x={596} y={512}>Correction</text>
        <text className="value" x={826} y={512} textAnchor="end">30-day interval</text>
        <text className="label" x={596} y={530}>Measurement</text>
        <text className="value" x={826} y={530} textAnchor="end">Verified · versioned</text>
      </g>

      {/* Sheet footer */}
      <g className="annot annot--phase" aria-hidden="true">
        <line x1={40} y1={582} x2={560} y2={582} stroke="var(--vl-rule)" strokeWidth={0.75} />
        <text className="callout" x={40} y={598}>Scale · 1 : 25.4</text>
        <text className="callout" x={160} y={598}>Rev · 3.0</text>
        <text className="callout" x={240} y={598}>Sheet · 01 / 01</text>
        <text className="callout" x={360} y={598}>Canonical · Vector Lock</text>
      </g>
    </svg>
  );
}
