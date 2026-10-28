export default function ResultantFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="rs-footer" aria-label="Site footer">
      <div className="rs-footer__brand">
        <a className="rs-footer__wordmark" href="/">
          Sapient<em>·</em>Digital
        </a>
        <p className="rs-footer__tagline">
          Connected Marketing. Amplified Impact.
        </p>
      </div>

      <nav aria-label="Agency">
        <h4 className="rs-footer__col-title">Agency</h4>
        <ul className="rs-footer__links">
          <li><a href="/approach">The Resultant Framework&trade;</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#thinking">Thinking</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <nav aria-label="Scorecard &amp; resources">
        <h4 className="rs-footer__col-title">Scorecard &amp; Resources</h4>
        <ul className="rs-footer__links">
          <li><a href="/audit">Free Resultant Scorecard</a></li>
          <li><a href="/insights/attention-authority">The Authority Economy</a></li>
          <li><a href="/insights/missed-opportunity">PR / Content / Search Teardown</a></li>
          <li><a href="/insights/ai-visibility-measurement">AI Visibility Measurement</a></li>
          <li><a href="/subscribe">Subscribe</a></li>
        </ul>
      </nav>

      <div className="rs-footer__base">
        <span>© {year} Sapient Digital LLC · All rights reserved</span>
        <span>
          <a href="/privacy">Privacy</a>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>·</span>
          <a href="/terms">Terms</a>
        </span>
      </div>
    </footer>
  );
}
