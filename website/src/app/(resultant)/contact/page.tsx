import type { Metadata } from 'next';
import ResultantNav from '@/components/resultant/ResultantNav';
import ResultantFooter from '@/components/resultant/ResultantFooter';
import ResultantContactForm from '@/components/resultant/ResultantContactForm';
import RfMark from '@/components/resultant/RfMark';

export const metadata: Metadata = {
  title: 'Talk Strategy',
  description:
    'A focused conversation about your market, your priorities, and whether our integrated approach is the right fit. No pitch deck, no software demo.',
};

export default function ContactPage() {
  return (
    <>
      <header style={{ padding: '20px', borderBottom: '1px solid var(--rs-border)' }}>
        <ResultantNav />
      </header>

      <section className="rs-contact rs-theme-light" aria-label="Talk Strategy">
        <header className="rs-contact__header">
          <div>
            <p className="rs-contact__eyebrow">
              <RfMark />
              <span>Talk Strategy</span>
            </p>
            <h1 className="rs-contact__h1">
              What do you want your market to believe about you?
            </h1>
          </div>
          <p className="rs-contact__lead">
            Tell us what you&apos;re trying to change — recognition, reputation, category position,
            or discoverability. We&apos;ll discuss your priorities, what may be holding you back,
            and whether our integrated approach is the right fit. A conversation about your
            market, not a software demo.
          </p>
        </header>

        <div className="rs-contact__body">
          <div className="rs-contact__form-card">
            <ResultantContactForm />
          </div>

          <aside className="rs-contact__sidebar">
            <div className="rs-contact__panel">
              <p className="rs-contact__panel-label">What Happens Next</p>
              <ul className="rs-contact__panel-list">
                <li>You get a confirmation within seconds</li>
                <li>A named strategist reads your note within one business day</li>
                <li>We respond with questions, not a sales pitch</li>
                <li>If we&apos;re a fit, we schedule a 30-minute strategy call</li>
              </ul>
            </div>

            <div className="rs-contact__panel">
              <p className="rs-contact__panel-label">Not Ready to Talk?</p>
              <p className="rs-contact__panel-title">Start with the free Resultant Scorecard&trade;.</p>
              <p className="rs-contact__panel-body">
                A 60-second diagnostic of your current PR, content, and search &amp; AI visibility
                — scored and banded. Gives us a concrete starting point for the conversation when
                you&apos;re ready.
              </p>
              <a
                className="rs-btn rs-btn--ghost"
                href="/audit"
                style={{ marginTop: '14px' }}
              >
                Score Your Presence →
              </a>
            </div>

            <div className="rs-contact__panel">
              <p className="rs-contact__panel-label">Prefer Email?</p>
              <p className="rs-contact__panel-body">
                Direct line:{' '}
                <a
                  href="mailto:hello@sapientdigital.io"
                  style={{ color: 'var(--rs-signal)', textDecoration: 'underline' }}
                >
                  hello@sapientdigital.io
                </a>
                <br />
                Same response commitment — one business day.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <ResultantFooter />
    </>
  );
}
