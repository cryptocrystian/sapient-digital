import { ChapterBand } from "./ChapterBand";

export function Services() {
  return (
    <section className="vl-services">
      <ChapterBand num="05" label="The Disciplines" />
      <div className="vl-services-container">
        <div className="vl-services-header vl-reveal">
          <h2 className="vl-services-headline">
            Three in retainer.
            <br />
            <span className="vl-services-emphasis">
              Video on invitation.
            </span>
          </h2>
          <p className="vl-services-lead">
            Every engagement locks three disciplines on one trajectory.
            Video is added when it earns its place — not because the
            retainer calls for it.
          </p>
          <p className="vl-services-sublead">
            Each discipline below is a specialization within one program,
            not a shoppable module. There is no &quot;just the PR&quot; option.
          </p>
        </div>

        {/* Discipline 01 · Digital PR — visual LEFT */}
        <article className="vl-discipline vl-discipline--v1 vl-reveal">
          <div className="vl-discipline-visual">
            <DigitalPRVisual />
          </div>
          <div className="vl-discipline-text">
            <div className="vl-discipline-head">
              <span className="vl-discipline-num">01</span>
              <span className="vl-discipline-tag">In retainer</span>
            </div>
            <h3 className="vl-discipline-name">Digital PR</h3>
            <p className="vl-discipline-role">
              Earn credible recognition for the brands we represent.
            </p>
            <dl className="vl-discipline-dl">
              <dt>What we do</dt>
              <dd>
                Strategic story development. Journalist relevance.
                Thought-leadership placement. Targeted outreach.
              </dd>
              <dt>What you get</dt>
              <dd>
                Independent authority. Trusted citations. A verified
                placements log you can defend to a board.
              </dd>
              <dt>How it reinforces the others</dt>
              <dd>
                Every placement feeds the content calendar and signals
                authority to search algorithms. Nothing operates alone.
              </dd>
            </dl>
          </div>
        </article>

        {/* Discipline 02 · Strategic Content — visual RIGHT */}
        <article className="vl-discipline vl-discipline--v2 vl-reveal">
          <div className="vl-discipline-text">
            <div className="vl-discipline-head">
              <span className="vl-discipline-num">02</span>
              <span className="vl-discipline-tag">In retainer</span>
            </div>
            <h3 className="vl-discipline-name">Strategic Content</h3>
            <p className="vl-discipline-role">
              Turn expertise into narratives the market wants to read.
            </p>
            <dl className="vl-discipline-dl">
              <dt>What we do</dt>
              <dd>
                Narrative architecture. Original analysis. Buyer-education
                assets. Discoverability-grade long-form.
              </dd>
              <dt>What you get</dt>
              <dd>
                Owned authority. A search surface that gains weight
                monthly. Content that serves PR and search at once.
              </dd>
              <dt>What we do not do</dt>
              <dd>
                We do not operate content mills. We do not publish
                AI-generated finished copy. We do not ghost-author
                anonymously.
              </dd>
            </dl>
          </div>
          <div className="vl-discipline-visual">
            <ContentVisual />
          </div>
        </article>

        {/* Discipline 03 · SEO · AEO · GEO — visual LEFT */}
        <article className="vl-discipline vl-discipline--v3 vl-reveal">
          <div className="vl-discipline-visual">
            <SearchVisual />
          </div>
          <div className="vl-discipline-text">
            <div className="vl-discipline-head">
              <span className="vl-discipline-num">03</span>
              <span className="vl-discipline-tag">In retainer</span>
            </div>
            <h3 className="vl-discipline-name">SEO · AEO · GEO</h3>
            <p className="vl-discipline-role">
              Discoverable on every surface a buyer touches.
            </p>
            <dl className="vl-discipline-dl">
              <dt>What we do</dt>
              <dd>
                Entity-grade structure. Citation preparation. Schema and
                sitemap hygiene. AI-answer monitoring.
              </dd>
              <dt>Where you appear</dt>
              <dd>
                Google &amp; Bing (SEO). Perplexity, ChatGPT, Gemini,
                Claude (AEO/GEO). Trade search. Industry databases.
              </dd>
              <dt>What we do not promise</dt>
              <dd>
                We do not guarantee ranks. We do not purchase links. We
                do not call AI citations a controllable outcome — we
                measure what the models return and work the inputs that
                matter.
              </dd>
            </dl>
          </div>
        </article>

        {/* Discipline 04 · Video Production (OPTIONAL) — visual RIGHT, distinct treatment */}
        <article className="vl-discipline vl-discipline--v4 vl-discipline--optional vl-reveal">
          <div className="vl-discipline-text">
            <div className="vl-discipline-head">
              <span className="vl-discipline-num vl-discipline-num--optional">04</span>
              <span className="vl-discipline-tag vl-discipline-tag--optional">
                Optional · separately scoped
              </span>
            </div>
            <h3 className="vl-discipline-name">Video Production</h3>
            <p className="vl-discipline-role">
              Amplify the story when a visual format carries it better than
              text.
            </p>
            <dl className="vl-discipline-dl">
              <dt>Formats</dt>
              <dd>
                Brand film. Executive narrative. Short-form explainer.
                Documentary conversation.
              </dd>
              <dt>Commercial treatment</dt>
              <dd>
                Separate SOW. Project-based or recurring production
                program. Scoped by formats, revision rounds, and rights.
              </dd>
              <dt>Honest scope note</dt>
              <dd>
                Video is a complementary capability. It is not included
                in the three-discipline retainer. If the Vector Lock
                story calls for video, we propose it as its own
                engagement.
              </dd>
            </dl>
          </div>
          <div className="vl-discipline-visual">
            <VideoVisual />
          </div>
        </article>

        <div className="vl-services-boundary">
          <p className="vl-boundary-eyebrow">What this engagement is NOT</p>
          <div className="vl-boundary-grid">
            <p className="vl-boundary-item">
              We do not run paid acquisition.
            </p>
            <p className="vl-boundary-item">
              We do not operate CRM, RevOps, or sales ops.
            </p>
            <p className="vl-boundary-item">
              We do not sell outsourced demand generation.
            </p>
            <p className="vl-boundary-item">
              We complement those functions. We do not replace them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── Discipline visuals ────────── */

function DigitalPRVisual() {
  // Citation map — placement nodes connected to central authority node
  return (
    <svg viewBox="0 0 380 320" className="vl-disc-svg" role="img" aria-label="Citation map: outlets connect to one authority node.">
      <rect x={1} y={1} width={378} height={318} fill="none" stroke="var(--vl-rule)" strokeWidth={1} />
      {/* Grid */}
      {Array.from({ length: 13 }, (_, i) => i * 30).map((x) => (
        <line key={`gv-${x}`} x1={x} y1={0} x2={x} y2={320} stroke="var(--vl-rule-soft)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 30).map((y) => (
        <line key={`gh-${y}`} x1={0} y1={y} x2={380} y2={y} stroke="var(--vl-rule-soft)" strokeWidth={0.5} />
      ))}

      {/* Outlet nodes with labels */}
      {[
        { x: 60, y: 60, label: "Tier 1" },
        { x: 100, y: 180, label: "Trade" },
        { x: 50, y: 250, label: "Byline" },
        { x: 320, y: 70, label: "Industry" },
        { x: 340, y: 180, label: "Analyst" },
        { x: 300, y: 260, label: "Podcast" },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={190} y2={160} stroke="var(--vl-text-dim)" strokeWidth={0.75} strokeDasharray="2 2" />
          <circle cx={n.x} cy={n.y} r={5} fill="var(--vl-daylight)" stroke="var(--vl-carbon)" strokeWidth={1} />
          <text className="vl-disc-label" x={n.x + 10} y={n.y + 3}>
            {n.label}
          </text>
        </g>
      ))}

      {/* Central authority node */}
      <circle cx={190} cy={160} r={28} fill="none" stroke="var(--vl-signal)" strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={190} cy={160} r={10} fill="var(--vl-signal)" />
      <text className="vl-disc-label vl-disc-label--signal" x={190} y={200} textAnchor="middle">
        AUTHORITY
      </text>

      <text className="vl-disc-label" x={14} y={310}>
        FIG · PR 01 — EARNED CITATION MAP
      </text>
    </svg>
  );
}

function ContentVisual() {
  // Masthead-style layout mock showing editorial rhythm
  return (
    <svg viewBox="0 0 380 320" className="vl-disc-svg" role="img" aria-label="Editorial layout showing content pieces in a publication grid.">
      <rect x={1} y={1} width={378} height={318} fill="none" stroke="var(--vl-rule)" strokeWidth={1} />

      {/* Masthead line */}
      <line x1={20} y1={42} x2={360} y2={42} stroke="var(--vl-carbon)" strokeWidth={1.25} />
      <text className="vl-disc-headline" x={20} y={34}>
        THE SAPIENT RUN
      </text>
      <text className="vl-disc-label" x={360} y={34} textAnchor="end">
        VOL · 03
      </text>

      {/* Lead article */}
      <rect x={20} y={62} width={220} height={100} fill="var(--vl-paper)" stroke="var(--vl-rule)" strokeWidth={0.75} />
      <line x1={30} y1={80} x2={200} y2={80} stroke="var(--vl-carbon)" strokeWidth={1.5} />
      <line x1={30} y1={88} x2={180} y2={88} stroke="var(--vl-carbon)" strokeWidth={1.5} />
      <line x1={30} y1={104} x2={225} y2={104} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={112} x2={220} y2={112} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={120} x2={215} y2={120} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={128} x2={225} y2={128} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={136} x2={190} y2={136} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <text className="vl-disc-label vl-disc-label--signal" x={30} y={154}>
        LEAD ESSAY · 4,200 WORDS
      </text>

      {/* Side pieces */}
      <rect x={250} y={62} width={110} height={48} fill="var(--vl-paper)" stroke="var(--vl-rule)" strokeWidth={0.75} />
      <line x1={258} y1={76} x2={340} y2={76} stroke="var(--vl-carbon)" strokeWidth={1} />
      <line x1={258} y1={86} x2={320} y2={86} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={258} y1={94} x2={330} y2={94} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <text className="vl-disc-label" x={258} y={106}>
        NOTE · 400W
      </text>

      <rect x={250} y={118} width={110} height={44} fill="var(--vl-paper)" stroke="var(--vl-rule)" strokeWidth={0.75} />
      <line x1={258} y1={132} x2={340} y2={132} stroke="var(--vl-carbon)" strokeWidth={1} />
      <line x1={258} y1={140} x2={325} y2={140} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <text className="vl-disc-label" x={258} y={158}>
        BRIEF · 600W
      </text>

      {/* Second row */}
      <rect x={20} y={176} width={160} height={90} fill="var(--vl-paper)" stroke="var(--vl-rule)" strokeWidth={0.75} />
      <line x1={30} y1={192} x2={160} y2={192} stroke="var(--vl-carbon)" strokeWidth={1.25} />
      <line x1={30} y1={208} x2={165} y2={208} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={216} x2={160} y2={216} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={30} y1={224} x2={165} y2={224} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <text className="vl-disc-label" x={30} y={244}>
        FRAMEWORK PIECE · 1,800W
      </text>
      <text className="vl-disc-label vl-disc-label--signal" x={30} y={258}>
        FEEDS → SEARCH · 03
      </text>

      <rect x={190} y={176} width={170} height={90} fill="var(--vl-paper)" stroke="var(--vl-rule)" strokeWidth={0.75} />
      <line x1={200} y1={192} x2={340} y2={192} stroke="var(--vl-carbon)" strokeWidth={1.25} />
      <line x1={200} y1={208} x2={340} y2={208} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <line x1={200} y1={216} x2={340} y2={216} stroke="var(--vl-text-dim)" strokeWidth={0.5} />
      <text className="vl-disc-label" x={200} y={244}>
        EXEC NARRATIVE · 2,200W
      </text>
      <text className="vl-disc-label vl-disc-label--signal" x={200} y={258}>
        FEEDS → PR · 01
      </text>

      <text className="vl-disc-label" x={14} y={310}>
        FIG · CT 02 — MONTHLY EDITORIAL RHYTHM
      </text>
    </svg>
  );
}

function SearchVisual() {
  // Search surface list — Google / Perplexity / ChatGPT / Gemini / Claude / Trade
  const surfaces = [
    { name: "Google / Bing", kind: "classic" },
    { name: "Perplexity", kind: "ai" },
    { name: "ChatGPT", kind: "ai" },
    { name: "Gemini", kind: "ai" },
    { name: "Claude", kind: "ai" },
    { name: "Trade search", kind: "classic" },
    { name: "Industry DBs", kind: "classic" },
  ];
  return (
    <svg viewBox="0 0 380 320" className="vl-disc-svg" role="img" aria-label="List of search surfaces monitored, with presence state indicators.">
      <rect x={1} y={1} width={378} height={318} fill="none" stroke="var(--vl-rule)" strokeWidth={1} />
      {Array.from({ length: 13 }, (_, i) => i * 30).map((x) => (
        <line key={`gv-${x}`} x1={x} y1={0} x2={x} y2={320} stroke="var(--vl-rule-soft)" strokeWidth={0.5} />
      ))}

      <line x1={20} y1={40} x2={360} y2={40} stroke="var(--vl-carbon)" strokeWidth={1} />
      <text className="vl-disc-headline" x={20} y={32}>
        SURFACES WATCHED
      </text>
      <text className="vl-disc-label" x={360} y={32} textAnchor="end">
        STATUS · ACTIVE
      </text>

      {surfaces.map((s, i) => {
        const y = 70 + i * 28;
        return (
          <g key={s.name}>
            <text className="vl-disc-surface-name" x={28} y={y}>
              {s.name}
            </text>
            <text className="vl-disc-label" x={200} y={y}>
              {s.kind === "ai" ? "AI · AEO/GEO" : "CLASSIC · SEO"}
            </text>
            {/* Presence bar */}
            <rect
              x={272}
              y={y - 10}
              width={88}
              height={10}
              fill="none"
              stroke="var(--vl-rule)"
              strokeWidth={0.75}
            />
            <rect
              x={272}
              y={y - 10}
              width={s.kind === "ai" ? 56 : 72}
              height={10}
              fill={s.kind === "ai" ? "var(--vl-signal)" : "var(--vl-carbon)"}
              opacity={0.85}
            />
          </g>
        );
      })}

      <text className="vl-disc-label" x={14} y={310}>
        FIG · SR 03 — PRESENCE ACROSS SURFACES (symbolic)
      </text>
    </svg>
  );
}

function VideoVisual() {
  // Filmstrip with 4 frames + a timeline
  return (
    <svg viewBox="0 0 380 320" className="vl-disc-svg" role="img" aria-label="Filmstrip of four frames representing a short-form brand film sequence.">
      <rect x={1} y={1} width={378} height={318} fill="none" stroke="var(--vl-rule)" strokeWidth={1} />

      <text className="vl-disc-headline" x={20} y={32}>
        REEL · OPTIONAL AMPLIFICATION
      </text>
      <line x1={20} y1={40} x2={360} y2={40} stroke="var(--vl-carbon)" strokeWidth={1} />

      {/* Filmstrip frames */}
      {[
        { x: 24, label: "FRAME · 01" },
        { x: 112, label: "FRAME · 02" },
        { x: 200, label: "FRAME · 03" },
        { x: 288, label: "FRAME · 04" },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={64} width={70} height={46} fill="var(--vl-carbon)" opacity={0.08} stroke="var(--vl-carbon)" strokeWidth={0.75} />
          {/* Perforations */}
          {[0, 1, 2].map((p) => (
            <rect key={`p-top-${p}`} x={f.x + 10 + p * 20} y={60} width={10} height={3} fill="var(--vl-carbon)" opacity={0.4} />
          ))}
          {[0, 1, 2].map((p) => (
            <rect key={`p-bot-${p}`} x={f.x + 10 + p * 20} y={112} width={10} height={3} fill="var(--vl-carbon)" opacity={0.4} />
          ))}
          <text className="vl-disc-label" x={f.x + 35} y={85} textAnchor="middle" opacity={0.6}>
            IMG
          </text>
          <text className="vl-disc-label" x={f.x + 35} y={132} textAnchor="middle">
            {f.label}
          </text>
        </g>
      ))}

      {/* Timeline */}
      <line x1={24} y1={170} x2={360} y2={170} stroke="var(--vl-carbon)" strokeWidth={1} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={24 + i * 56} y1={166} x2={24 + i * 56} y2={174} stroke="var(--vl-carbon)" strokeWidth={1} />
      ))}
      <text className="vl-disc-label" x={24} y={192}>
        0:00
      </text>
      <text className="vl-disc-label" x={192} y={192} textAnchor="middle">
        0:30
      </text>
      <text className="vl-disc-label" x={360} y={192} textAnchor="end">
        1:00
      </text>

      {/* Rights/scope note */}
      <text className="vl-disc-label" x={20} y={226}>
        SPEC · SEPARATE SOW
      </text>
      <text className="vl-disc-label" x={20} y={242}>
        RIGHTS · PROJECT-LICENSED
      </text>
      <text className="vl-disc-label" x={20} y={258}>
        FORMATS · 4
      </text>
      <text className="vl-disc-label" x={20} y={274}>
        REVISIONS · 3 ROUNDS
      </text>

      <text className="vl-disc-label" x={14} y={310}>
        FIG · VD 04 — AMPLIFICATION REEL (optional)
      </text>
    </svg>
  );
}
