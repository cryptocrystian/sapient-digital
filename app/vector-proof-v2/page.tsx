import type { Metadata } from "next";
import styles from "./hero-v2.module.css";

export const metadata: Metadata = {
  title: "Sapient Digital — Buyer-first hero study",
  description: "Creative study: an authority and visibility marketing agency, not a software product.",
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
          <a href="#capabilities">What we do</a>
          <a href="#approach">Our approach</a>
          <a href="#contact">Let's talk</a>
        </nav>
        <a className={styles.topCta} href="#contact">Talk strategy <span aria-hidden="true">↗</span></a>
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
            <h2>We build the authority B2B brands need to be <em>discovered, recognized, and trusted.</em></h2>
            <p>Sapient Digital connects digital PR, strategic content, and search visibility into one coordinated marketing program—built to strengthen how your market sees you.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#contact">Talk strategy <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="#approach">Explore our approach <span aria-hidden="true">↗</span></a>
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
        <h2 id="approach-title">The right audience can't trust what it <em>never discovers.</em></h2>
        <p>Your expertise deserves more than isolated campaigns and fleeting attention. We connect the disciplines that make your business visible, credible, and worth remembering.</p>
        <div className={styles.nextDivider}><span>THE BUYER'S STORY CONTINUES HERE</span><span>VECTOR LOCK IS THE METHOD — NOT THE OFFER</span></div>
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
<section className={styles.fullDark} id="vector-lock" aria-labelledby="method-heading">
  <div className={styles.fullEyebrow}>03 / THE DIFFERENCE</div>
  <div className={styles.fullTitle}><h2 id="method-heading">Less friction.<br/><em>More momentum.</em></h2><p>Great PR, content and search do more when they reinforce one another. Vector Lock is our integrated method for setting shared direction, coordinating the work, and adapting when markets change. It's how we deliver—not a product you need to manage.</p></div>
  <div className={styles.fullVector} aria-hidden="true"><span>DIGITAL PR</span><span>STRATEGIC CONTENT</span><span>SEARCH VISIBILITY</span><strong>↗</strong></div>
</section>
<section className={styles.fullSection} id="mission-control" aria-labelledby="team-heading">
  <div className={styles.fullEyebrow}>04 / THE INTELLIGENCE BEHIND THE WORK</div>
  <div className={styles.fullTitle}><h2 id="team-heading">Experienced judgment.<br/><em>Better informed.</em></h2><p>Our team combines communications expertise with proprietary intelligence and orchestration tools to spot opportunities, coordinate execution, and measure what can be verified. We call that support layer Mission Control. It stays behind the scenes. Our people remain accountable for the work.</p></div>
  <div className={styles.fullAttributes}><span>MARKET INTELLIGENCE</span><span>EDITORIAL QUALITY</span><span>COORDINATED DELIVERY</span><span>HUMAN APPROVAL</span></div>
</section>
<section className={styles.fullProof} id="evidence" aria-labelledby="evidence-heading">
  <div className={styles.fullEyebrow}>05 / REASONS TO BELIEVE</div>
  <div className={styles.fullTitle}><h2 id="evidence-heading">Substance before <em>spin.</em></h2><p>We don't promise press placements, rankings, AI citations or revenue outcomes we cannot control. We make our strategic thinking visible, document what we do, and report evidence honestly. Verified client work will appear here when available and authorized.</p></div>
  <a href="#contact">Discuss your business challenge ↗</a>
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
