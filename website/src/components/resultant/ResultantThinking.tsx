import RfMark from './RfMark';

const SUPPORTING = [
  {
    chip: '— Essay',
    meta: '12 min read · Free',
    title: 'The Missed Opportunity Between PR, Content & Search.',
    abstract:
      'An annotated hypothetical integrated campaign — showing where coverage, content, and discoverability compound when the work is coordinated instead of calendared separately.',
    cta: 'Read the teardown',
    href: '/insights/missed-opportunity',
  },
  {
    chip: '— Methodology',
    meta: '18 min read · Free',
    title: 'Measuring AI Visibility Without Pretending It Is Revenue.',
    abstract:
      'What AI citation measurement can and cannot tell you — the sampling discipline, the honest caveats, and why "rank #1 in ChatGPT" is a claim nobody can make.',
    cta: 'Read the explainer',
    href: '/insights/ai-visibility-measurement',
  },
  {
    chip: '— Primer',
    meta: '8 pages · PDF · Free',
    title: 'The Resultant Framework™ Primer.',
    abstract:
      'A shorter companion to the full methodology — the five stages, the four review gates, and how a focused engagement differs from an integrated one.',
    cta: 'Download the primer',
    href: '/insights/resultant-primer',
  },
];

export default function ResultantThinking() {
  return (
    <section className="rs-thinking rs-theme-light" id="thinking" aria-label="The Thinking">
      <header className="rs-thinking__header">
        <div>
          <p className="rs-thinking__eyebrow">
            <RfMark />
            <span>06 — The Thinking</span>
          </p>
          <h2 className="rs-thinking__h2">Earn authority before you ask for a meeting.</h2>
        </div>
        <p className="rs-thinking__body">
          The best proof of judgment is published thinking. Four original research assets on the
          authority economy, the connected marketing opportunity, and honest measurement — all
          free, nothing gated beyond an email.
        </p>
      </header>

      <div className="rs-thinking__featured">
        <article className="rs-insight rs-insight--featured">
          <div>
            <div className="rs-insight__header">
              <span className="rs-insight__type-chip">— Featured Report</span>
              <span className="rs-insight__meta">24 pages · Free · 2026 Q4</span>
            </div>
            <h3 className="rs-insight__title">
              Attention Is Everywhere.<br />Authority Is Scarce.
            </h3>
            <p className="rs-insight__abstract">
              A market thesis on how B2B buyers form opinions in the AI-assisted research era —
              and why earned authority is the only compounding asset left when discovery
              fragments across every surface.
            </p>
          </div>
          <div className="rs-insight__cta">
            <a
              className="rs-insight__link"
              href="/insights/attention-authority"
              data-track="cta_click"
              data-cta-name="read_insight"
              data-cta-location="thinking_featured"
              data-insight-slug="attention-authority"
            >
              <span>Read the Report</span>
              <span className="rs-insight__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>

      <div className="rs-thinking__supporting">
        {SUPPORTING.map((item) => (
          <article key={item.title} className="rs-insight rs-insight--supporting">
            <div className="rs-insight__header">
              <span className="rs-insight__type-chip">{item.chip}</span>
              <span className="rs-insight__meta">{item.meta}</span>
            </div>
            <h3 className="rs-insight__title">{item.title}</h3>
            <p className="rs-insight__abstract">{item.abstract}</p>
            <a
              className="rs-insight__link"
              href={item.href}
              data-track="cta_click"
              data-cta-name="read_insight"
              data-cta-location="thinking_supporting"
              data-insight-slug={item.href.replace('/insights/', '')}
            >
              <span>{item.cta}</span>
              <span className="rs-insight__arrow" aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <aside className="rs-newsletter">
        <div className="rs-newsletter__text">
          <div className="rs-newsletter__chip">— Occasional</div>
          <h3 className="rs-newsletter__title">
            Monthly thinking on authority, credibility, and discoverability.
          </h3>
          <p className="rs-newsletter__sub">
            One editorial note a month. No vendor roundups, no sponsored content, no sales
            pitches. Unsubscribe in two clicks.
          </p>
        </div>
        <form className="rs-newsletter__form" action="/subscribe" method="post">
          <input
            type="email"
            placeholder="you@company.com"
            className="rs-newsletter__input"
            aria-label="Your email"
          />
          <button
            type="submit"
            className="rs-newsletter__btn"
            data-track="cta_click"
            data-cta-name="newsletter_subscribe"
            data-cta-location="thinking_newsletter"
          >
            Subscribe →
          </button>
        </form>
      </aside>
    </section>
  );
}
