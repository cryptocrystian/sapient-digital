import type { Metadata } from "next";
import styles from "./hero-v2.module.css";

export const metadata: Metadata = {
  title: "Sapient Digital — Resultant Framework concept",
  description: "B2B digital PR, strategic content, and search visibility. Connected marketing. Amplified impact.",
  robots: { index: false, follow: false },
};

function Mark() {
  return <span className={styles.brand}>SAPIENT<span className={styles.brandArrow}>↗</span>DIGITAL</span>;
}

export default function BuyerFirstHeroStudy() {
  return (
    <main className={styles.page} id="top">
      <header className={styles.header}>
        <a className={styles.brandLink} href="#top" aria-label="Sapient Digital, back to top"><Mark /></a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="/resultant-preview/services">Services</a>
          <a href="/resultant-preview/approach">Our approach</a>
          <a href="/resultant-preview/contact">Work with us</a>
        </nav>
        <a className={styles.topCta} href="/resultant-preview/contact">Work with us <span aria-hidden="true">↗</span></a>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.topline}>
          <span className={styles.kicker}><span className={styles.kickerMark} />B2B AUTHORITY &amp; VISIBILITY AGENCY</span>
          <span className={styles.toplineRight}>INDEPENDENT THINKING. CONNECTED EXECUTION.</span>
        </div>
        <div className={styles.statement}>
          <h1 id="hero-title">IMPOSSIBLE<span className={styles.secondLine}>TO IGNORE<span className={styles.orangeStop}>.</span></span></h1>
          <div className={styles.annotation} aria-hidden="true"><span>RECOGNITION</span><span>↗</span><span>AUTHORITY</span></div>
        </div>

        <div className={styles.lower}>
          <div className={styles.pitch}>
            <h2>Become the brand your market <em>recognizes, trusts, and finds.</em></h2>
            <p>Sapient Digital is a B2B marketing agency connecting digital PR, strategic content, and search visibility. We help ambitious companies turn expertise into earned authority and lasting market presence.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="/resultant-preview/approach">Explore our approach <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="/audit">Free Visibility Audit <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className={styles.art} aria-label="Editorial illustration: earned recognition, trusted perspectives, and discovery all connect through a shared strategic direction" role="img">
            <div className={styles.artHeader}><span>THE WORK / THE IMPACT</span><span>01 — 03</span></div>
            <div className={styles.artLayers}>
              <div className={styles.layer}><span className={styles.layerNumber}>01 / PR</span><span>RECOGNIZED</span></div>
              <div className={styles.layer}><span className={styles.layerNumber}>02 / CONTENT</span><span>TRUSTED</span></div>
              <div className={styles.layer}><span className={styles.layerNumber}>03 / SEARCH</span><span>DISCOVERED</span></div>
            </div>
            <svg className={styles.arc} viewBox="0 0 640 460" aria-hidden="true" preserveAspectRatio="none">
              <path d="M-18 368 C 128 416, 238 370, 329 231 S 508 25, 674 52" fill="none" stroke="#F45B32" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
              <path d="M-18 389 C 128 437, 238 391, 329 252 S 508 46, 674 73" fill="none" stroke="#F45B32" strokeOpacity=".22" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle cx="330" cy="231" r="6" fill="#E6FF00" stroke="#131416" strokeWidth="1.5" />
            </svg>
            <div className={styles.artFooter}><span>ONE CONNECTED STRATEGY</span><span className={styles.arrow}>↗</span></div>
          </div>
        </div>
        <div className={styles.capabilityRail} id="capabilities">
          <span className={styles.railLabel}>WHAT WE DO</span>
          <span>DIGITAL PR</span><span>STRATEGIC CONTENT</span><span>SEARCH &amp; AI VISIBILITY</span>
          <span className={styles.railEnd}>CONNECTED MARKETING. AMPLIFIED IMPACT.</span>
        </div>
      </section>

      <section className={styles.next} id="approach" aria-labelledby="approach-title">
        <div className={styles.sectionTag}><span>01 / THE CHALLENGE</span><span>↓</span></div>
        <h2 id="approach-title">Attention is everywhere. <em>Authority is scarce.</em></h2>
        <p>Your buyers form opinions across publications, search engines, AI-assisted research, and trusted conversations. Every encounter contributes to what they believe about your company. Authority is built when credible expertise is consistently discovered, recognized, and understood.</p>
        <div className={styles.nextDivider}><span>INDEPENDENT CREDIBILITY. CONNECTED PRESENCE.</span><span>FRAGMENTATION CREATES DRAG. ALIGNMENT CREATES FORCE.</span></div>
      </section>


<section className={styles.fullSection} id="services" aria-labelledby="services-heading">
  <div className={styles.fullEyebrow}>02 / OUR EXPERTISE</div>
  <div className={styles.fullTitle}><h2 id="services-heading">Make your expertise <em>matter in market.</em></h2><p>Our work connects the three disciplines that make B2B brands known, credible and discoverable. Not isolated tactics. One coordinated marketing engagement.</p></div>
  <div className={styles.fullServices}>
    <article><span>01 / EARNED</span><h3>Digital PR</h3><p>Relevant stories, meaningful media relationships and independent recognition that strengthen credibility.</p></article>
    <article><span>02 / OWNED</span><h3>Strategic Content</h3><p>Thought leadership and substantive editorial work that turns expertise into ideas buyers remember.</p></article>
    <article><span>03 / DISCOVERED</span><h3>Search &amp; AI Visibility</h3><p>Authority-focused visibility across traditional search and the AI-assisted research journey.</p></article>
  </div>
  <p className={styles.fullNote}>Video and multimedia production can extend the program when the story calls for it—always separately scoped.</p>
</section>
<section className={styles.fullDark} id="resultant" aria-labelledby="method-heading">
  <div className={styles.fullEyebrow}>03 / THE DIFFERENCE</div>
  <div className={styles.fullTitle}><h2 id="method-heading">Fragmentation creates drag.<br/><em>Alignment creates force.</em></h2><p><strong>The Resultant Framework™</strong> is our signature methodology. In physics, a resultant expresses the combined effect of multiple forces. We apply that idea to marketing: establish direction, read the market, coordinate specialist execution, measure the impact, and adapt. Each practice delivers independent value; together, the work can reinforce a more credible, discoverable market presence.</p></div>
  <div className={styles.fullVector} aria-hidden="true"><span>DIGITAL PR</span><span>STRATEGIC CONTENT</span><span>SEARCH VISIBILITY</span><strong>↗</strong></div>
</section>
<section className={styles.fullSection} id="mission-control" aria-labelledby="team-heading">
  <div className={styles.fullEyebrow}>04 / THE INTELLIGENCE BEHIND THE WORK</div>
  <div className={styles.fullTitle}><h2 id="team-heading">Expert-led delivery.<br/><em>Powered by Mission Control.</em></h2><p>Mission Control is the operating system behind our managed engagements—not a product clients must learn. Our specialists use market and media intelligence, practice-specific workflows, human editorial approvals, and performance reviews to prioritize and deliver work. For integrated programs, shared orchestration connects opportunities and dependencies across practices. For focused programs, each practice operates on its own accountable scorecard.</p></div>
  <div className={styles.fullAttributes}><span>MARKET INTELLIGENCE</span><span>EDITORIAL QUALITY</span><span>COORDINATED DELIVERY</span><span>HUMAN APPROVAL</span></div>
</section>
<section className={styles.fullProof} id="evidence" aria-labelledby="evidence-heading">
  <div className={styles.fullEyebrow}>05 / REASONS TO BELIEVE</div>
  <div className={styles.fullTitle}><h2 id="evidence-heading">Accountability you can <em>understand.</em></h2><p>Every engagement begins with agreed objectives and a documented baseline. We report what we committed to, what we delivered, what changed, and what the evidence supports. PR tracks verified recognition and relevant coverage; Content tracks editorial delivery, quality and engagement; Search tracks discoverability and sampled AI-answer presence. Integrated programs also review cross-practice progress and emerging opportunities.</p></div>
  <a href="/resultant-preview/services">Explore engagement options ↗</a>
</section>


<section className={styles.fullSection} id="engagements" aria-labelledby="engagements-title">
  <div className={styles.fullEyebrow}>06 / WORK WITH US</div>
  <div className={styles.fullTitle}>
    <h2 id="engagements-title">Built to work together. <em>Available where you need us.</em></h2>
    <p>You don't have to replace every marketing partner to benefit from a better approach. Start with the specialized expertise you need now or bring PR, content, and search into a coordinated authority program. Either way, our standards and strategic direction remain consistent.</p>
  </div>
  <div className={styles.fullServices}>
    <article><span>OPTION / 01</span><h3>Focused Engagement</h3><p>Dedicated delivery in PR, content, or search visibility, with clear practice-specific priorities, deliverables, and reporting. We collaborate with your existing partners where agreed.</p><a href="/resultant-preview/contact">Discuss a focused need ↗</a></article>
    <article><span>OPTION / 02</span><h3>Integrated Authority Program</h3><p>One coordinated strategy spanning earned recognition, thought leadership, and discoverability, supported by shared intelligence and cross-practice measurement.</p><a href="/resultant-preview/contact">Discuss an integrated program ↗</a></article>
    <article><span>START WITH INSIGHT</span><h3>Explore Before You Engage</h3><p>Get to know how we think, explore our point of view, or use our Free Visibility Audit as one possible starting point. No meeting required to begin learning.</p><a href="/audit">Explore the audit ↗</a></article>
  </div>
</section>
      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <p>THE NEXT CONVERSATION</p>
        <h2 id="contact-title">Let's build the recognition you've earned.</h2>
        <a href="mailto:hello@sapientdigital.io?subject=Let's%20talk%20strategy">Start a conversation ↗</a>
        <small>Private preview: content and design under creative review.</small>
      </section>
    </main>
  );
}
