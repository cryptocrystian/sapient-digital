export default function ResultantNav() {
  return (
    <nav className="rs-nav" aria-label="Primary">
      <a className="rs-wordmark" href="/">
        Sapient<em>·</em>Digital
      </a>
      <div className="rs-nav__links">
        <a className="rs-nav__link" href="#worldview">Worldview</a>
        <a className="rs-nav__link" href="/approach">Approach</a>
        <a className="rs-nav__link" href="#services">Services</a>
        <a className="rs-nav__link" href="#thinking">Thinking</a>
        <a className="rs-nav__link" href="/about">About</a>
      </div>
      <a
        className="rs-nav__cta"
        href="/contact"
        data-track="cta_click"
        data-cta-name="talk_strategy"
        data-cta-location="nav"
      >
        Talk Strategy
      </a>
    </nav>
  );
}
