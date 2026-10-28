import RfMark from './RfMark';

export default function ResultantDecision() {
  return (
    <section className="rs-decision rs-theme-light" id="decision" aria-label="Decision">
      <div className="rs-decision__inner">
        <div>
          <p className="rs-decision__eyebrow">
            <RfMark />
            <span>07 — Decision</span>
          </p>
          <h2 className="rs-decision__h2">
            What should your market<br />know you for?
          </h2>
          <p className="rs-decision__body">
            Tell us what you are trying to change — recognition, reputation, category position,
            or discoverability. We will discuss your priorities, what may be holding you back,
            and whether our integrated approach is the right fit.
          </p>
          <p className="rs-decision__assurance">
            A conversation about your market — not a software demo.
          </p>
        </div>

        <div className="rs-decision__paths">
          <div className="rs-decision__path">
            <span className="rs-decision__path-chip">Diagnostic Path</span>
            <h3 className="rs-decision__path-title">
              Start with the free Resultant Scorecard<sup className="rs-tm">™</sup>
            </h3>
            <p className="rs-decision__path-sub">
              A 60-second diagnostic of your current PR, content, and search &amp; AI visibility
              — scored, banded, and benchmarked against your category.
            </p>
            <a
              className="rs-btn rs-btn--primary"
              href="/audit"
              data-track="cta_click"
              data-cta-name="scorecard"
              data-cta-location="decision"
              data-cta-discipline="generic"
            >
              Score Your Presence →
            </a>
          </div>

          <div className="rs-decision__divider"><span>or</span></div>

          <div className="rs-decision__path">
            <span className="rs-decision__path-chip">Direct Path</span>
            <h3 className="rs-decision__path-title">Talk Strategy directly.</h3>
            <p className="rs-decision__path-sub">
              A focused conversation about your market, your priorities, and whether our
              integrated approach is the right fit. No pitch deck.
            </p>
            <a
              className="rs-btn rs-btn--ghost"
              href="/contact"
              data-track="cta_click"
              data-cta-name="talk_strategy"
              data-cta-location="decision"
            >
              Book a Conversation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
