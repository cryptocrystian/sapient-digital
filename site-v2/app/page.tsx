const services = [
  { no: "01", title: "Digital PR", description: "Earn the recognition that makes your expertise harder to overlook. Strategic stories, journalist relationships, and third-party credibility." },
  { no: "02", title: "Strategic Content", description: "Turn real expertise into distinctive ideas, compelling narratives, and useful content that shapes consideration." },
  { no: "03", title: "SEO / AEO / GEO", description: "Help the right audiences discover your brand across traditional search and AI-assisted research." },
];
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="nav">
      <a className="wordmark" href="/" aria-label="Sapient Digital home">SAPIENT<span className="brand-dot">.</span>DIGITAL</a>
      <nav aria-label="Main navigation"><a href="#worldview">Our worldview</a><a href="#effect">The Signal Effect</a><a href="#services">Expertise</a><a href="#approach">Our approach</a></nav>
      <a className="nav-cta" href="mailto:hello@sapientdigital.io?subject=Let's%20Talk">Start a conversation <span aria-hidden="true">↗</span></a>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="tiny-line"/>INTELLIGENCE-LED AUTHORITY &amp; VISIBILITY</div>
          <h1 id="hero-title">IMPOSSIBLE<br/>TO <em>IGNORE.</em></h1>
          <p>Attention is everywhere. Authority is not. We connect digital PR, strategic content, and search visibility to build the credible market presence B2B brands need.</p>
          <div className="hero-actions"><a className="button button-orange" href="mailto:hello@sapientdigital.io?subject=Build%20Market%20Authority">Build your market presence <span aria-hidden="true">↗</span></a><a className="text-link" href="#worldview">Explore our worldview ↓</a></div>
        </div>
        <div className="array-stage" role="img" aria-label="Conceptual industrial signal array: concentric antenna rings and structural towers communicating connected market signals.">
          <div className="stage-grid"/><div className="array-glow"/><div className="array-rings"><div className="ring ring-one"/><div className="ring ring-two"/><div className="ring ring-three"/><div className="ring ring-four"/><div className="array-core"/></div><div className="array-base"/><div className="figure-scale"/><span className="stage-label">THE SIGNAL / 001</span><span className="stage-label stage-right">AUTHORITY IN MOTION</span>
        </div>
        <div className="hero-bottom"><span>CONNECTED MARKETING. AMPLIFIED IMPACT.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section id="worldview" className="section worldview"><div className="section-label">01 / THE WORLDVIEW</div><div className="split"><h2>THE WORLD DOESN'T NEED<br/><i>MORE NOISE.</i></h2><div className="body-panel"><p className="lead">It needs signals worth trusting.</p><p>Publishing is easier. Attention is fragmented. Buyers investigate brands across media, search, AI tools, and the people they trust. Visibility alone doesn't earn consideration.</p><p>What matters is a credible presence that carries across those encounters—and becomes stronger with every meaningful interaction.</p></div></div></section>
      <section id="effect" className="section effect"><div className="section-label">02 / THE SIGNAL EFFECT</div><div className="effect-heading"><h2>CONNECTED<br/><i>BY DESIGN.</i></h2><p>Authority isn't built in silos. It develops when expertise, earned recognition, and discoverability inform and reinforce one another.</p></div><div className="signal-layout"><div className="signal-node">EARNED<br/>AUTHORITY</div><div className="signal-center"><div className="pulse-orbit"><span>THE<br/>SIGNAL<br/>EFFECT</span></div></div><div className="signal-node">STRATEGIC<br/>CONTENT</div><div className="signal-node bottom-node">SEARCH &amp; AI<br/>DISCOVERY</div></div><p className="caption">One coordinated program. Three connected disciplines. A stronger, more consistent market presence.</p></section>
      <section id="services" className="section services"><div className="section-label">03 / THREE DISCIPLINES. ONE PROGRAM.</div><div className="services-header"><h2>BUILT TO<br/><i>REINFORCE.</i></h2><p>Every engagement connects all three capabilities. We adjust the mix of execution as priorities and market opportunities evolve.</p></div><div className="service-list">{services.map(s=><article className="service" key={s.no}><span className="service-no">{s.no}</span><h3>{s.title}</h3><p>{s.description}</p><span className="service-mark" aria-hidden="true">↗</span></article>)}</div></section>
      <section id="approach" className="section approach"><div className="section-label">04 / HOW WE WORK</div><div className="split"><h2>EXPERT PEOPLE.<br/><i>PURPOSE-BUILT</i><br/>INTELLIGENCE.</h2><div className="body-panel"><p className="lead">A clear plan. The freedom to make it better.</p><p>Our proprietary intelligence and orchestration technology helps surface opportunities and connect activity across PR, content, and search. Experienced strategists make the decisions, protect quality, and keep every action aligned with your goals.</p><p>We establish a concrete roadmap—then adapt execution when the market creates a better opening. You get the clarity of a defined program without the limitations of a rigid production checklist.</p><a className="text-link dark-link" href="mailto:hello@sapientdigital.io?subject=Talk%20About%20Our%20Approach">Discuss your goals ↗</a></div></div></section>
      <section className="section proof"><div className="section-label">05 / THE MEASURE OF PROGRESS</div><div className="split"><h2>MEASURE WHAT<br/><i>MATTERS.</i></h2><div className="body-panel"><p className="lead">Not just activity. Market progress.</p><p>We look at the signals behind visibility, earned authority, competitive presence, and momentum—alongside the work that helped shape them. Where evidence is limited, we say so. Where outcomes are measurable, we show the movement.</p><p className="proof-note">Proprietary measurement framework in development. We do not promise guaranteed rankings, earned placements, or unsupported attribution.</p></div></div></section>
      <section className="close"><div className="section-label">06 / WHAT'S NEXT</div><h2>MAKE YOUR<br/>MARKET <em>NOTICE.</em></h2><p>Build authority. Become discoverable. Influence the conversations that matter.</p><a className="button button-light" href="mailto:hello@sapientdigital.io?subject=Let's%20Talk%20About%20Sapient">Let's talk <span aria-hidden="true">↗</span></a></section>
    </main>
    <footer><span className="wordmark">SAPIENT<span className="brand-dot">.</span>DIGITAL</span><span>CONNECTED MARKETING. AMPLIFIED IMPACT.</span><span>© {new Date().getFullYear()} SAPIENT DIGITAL</span></footer>
  </>
}
