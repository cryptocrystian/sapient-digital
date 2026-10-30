import ResultantNav from './ResultantNav';
import ResultantFooter from './ResultantFooter';
import s from './SapientHomeV3.module.css';

const services = [
  {num:'01',title:'Digital PR',headline:'Earn recognition that matters.',description:'Your expertise deserves an audience with influence. We develop compelling narratives, identify meaningful media opportunities, and pursue earned recognition in the publications and conversations relevant to your market.',value:'Third-party credibility, market recognition, and a stronger reputation among the audiences that matter.',link:'/services/digital-pr'},
  {num:'02',title:'Strategic Content',headline:'Give your expertise the influence it deserves.',description:'Being an expert and being recognized as one are different things. We turn your knowledge into distinctive perspectives, substantive thought leadership, and content that helps buyers understand what sets your company apart.',value:'Stronger differentiation, deeper audience understanding, and more reasons for buyers to trust your expertise.',link:'/services/strategic-content'},
  {num:'03',title:'Search & AI Visibility',headline:'Be present when buyers are looking.',description:'The way companies are discovered is changing. Search engines remain essential, while AI-assisted research is reshaping how buyers explore options. We strengthen your discoverability through search strategy, content alignment, and disciplined visibility measurement across relevant research environments.',value:'Greater visibility during buyer research and more opportunities to enter the consideration set.',link:'/services/search-ai-visibility'},
];
const stages = [
  ['Direction','Understand the opportunity.'],['Intelligence','Find the advantage.'],['Execution','Put expertise to work.'],['Integration','Amplify what works.'],['Optimization','Improve and adapt.']
];
function VisualSlot({number,title,brief,kind='asset'}:{number:string,title:string,brief:string,kind?:string}){return <div className={s.visualSlot} role="img" aria-label={title+' — visual planned'}><div className={s.visualTop}><span>VISUAL {number} / {kind}</span><span>ASSET PENDING ↗</span></div><div className={s.visualCenter}><span className={s.visualCross} aria-hidden="true">＋</span><strong>{title}</strong><p>{brief}</p></div><div className={s.visualBottom}>ART DIRECTION / NOT FINAL CREATIVE</div></div>}
export default function SapientHomeV3(){
 return <main className={s.site}>
  <section className={s.hero} id="top" aria-labelledby="hero-title">
   <div className={s.heroPhoto} aria-hidden="true"/>
   <div className={s.heroWash} aria-hidden="true"/>
   <div className={s.nav}><ResultantNav/></div>
   <div className={s.heroGrid}>
    <div className={s.heroCopy}>
     <p className={s.kicker}>B2B Authority &amp; Visibility Agency</p>
     <h1 id="hero-title">Impossible<br/>to ignore<span className={s.dot}>.</span></h1>
     <p className={s.heroSub}>Connected marketing. Amplified impact.</p>
     <p className={s.heroBody}>Market leadership isn’t determined by capability alone. It’s shaped by who buyers recognize, which companies they trust, and whose expertise they find when it matters.</p>
     <p className={s.heroBody}>Sapient Digital connects Digital PR, Strategic Content, and Search &amp; AI Visibility to turn your expertise into a stronger competitive market presence.</p>
     <div className={s.actions}><a className={s.primary} href="/contact">Talk Strategy <span aria-hidden="true">↗</span></a><a className={s.ghost} href="/approach">Explore Our Approach <span aria-hidden="true">↗</span></a></div>
    </div>
   </div>
   <div className={s.heroRail}>Digital PR <span>/</span> Strategic Content <span>/</span> Search &amp; AI Visibility</div>
  </section>

  <section id="worldview" className={s.reality} aria-labelledby="reality-title">
   <div className={s.shell}>
    <p className={s.kickerDark}>01 / The market doesn’t wait</p>
    <div className={s.twoCol}><h2 id="reality-title">Being better isn’t enough.<br/><em>You have to be known for it.</em></h2>
     <div className={s.prose}><p>Your prospects are forming opinions long before they speak with sales. They’re reading industry coverage, evaluating expert perspectives, searching for answers, and increasingly consulting AI systems.</p><p>Every credible encounter can strengthen their understanding of your company. Every missed opportunity leaves more room for someone else to shape that understanding.</p><p>The challenge isn’t simply getting noticed. It’s building the recognition, trust, and discoverability that put your company in the conversation when decisions are being made.</p></div>
    </div>
    <div className={s.statement}>Attention is everywhere. <strong>Authority is scarce.</strong></div>
   </div>
  </section>

  <section id="services" className={s.services} aria-labelledby="services-title">
   <div className={s.shell}><p className={s.kickerDark}>02 / Three disciplines. One ambition.</p>
    <div className={s.sectionTop}><h2 id="services-title">Build the reputation.<br/>Earn the trust. <em>Be found.</em></h2><p>A stronger market position doesn’t come from a single channel. It develops as credible recognition, substantive expertise, and discoverability reinforce one another. Sapient brings together three specialized practices to help build that advantage.</p></div>
    <div className={s.serviceGrid}>{services.map(item=><article key={item.num} className={s.service}><div className={s.serviceMeta}><span>{item.num} / {item.title}</span><span aria-hidden="true">↗</span></div><h3>{item.headline}</h3><p>{item.description}</p><div className={s.serviceArt}><VisualSlot number={item.num==='01'?'02':item.num==='02'?'03':'04'} kind="capability visual" title={item.num==='01'?'Earned media proof':item.num==='02'?'Original editorial work':'Search discovery visual'} brief={item.num==='01'?'Verified placement or editorial feature.':item.num==='02'?'Actual content cover or authored publication.':'Purpose-built search/AI research illustration.'}/></div><div className={s.serviceBottom}><p><strong>The value:</strong> {item.value}</p><a href={item.link}>Explore {item.title} <span aria-hidden="true">↗</span></a></div></article>)}</div>
    <aside className={s.video}><div><span className={s.miniLabel}>Additional creative capability / scoped separately</span><h3>When the story demands more, we deliver.</h3><p>Compelling visual storytelling, selectively commissioned to give important ideas greater impact.</p></div><div className={s.videoArt}><VisualSlot number="05" kind="portfolio still" title="Production reel" brief="Actual video frame or approved showreel thumbnail."/></div><a href="/services/video-production">Explore Video Production ↗</a></aside>
   </div>
  </section>

  <section className={s.advantage} id="advantage" aria-labelledby="advantage-title">
   <div className={s.shell}><p className={s.kicker}>03 / Why connected marketing wins</p>
    <div className={s.advantageIntro}><h2 id="advantage-title">Your best ideas should do more than <em>make one appearance.</em></h2><div><p>Consider what happens when your company develops a compelling perspective on an important industry challenge.</p><p>A content team turns it into an article. PR pursues coverage. Search focuses on relevant queries. Useful work, certainly. But often treated as separate assignments.</p><p><strong>There’s a more powerful approach.</strong></p></div></div>
    <div className={s.featureAsset}><VisualSlot number="06" kind="information design" title="One idea. Multiple expressions." brief="Custom visual: source insight → authored content → earned media → discoverability → measured learning. No generic hub-and-spoke."/></div><div className={s.playbook} aria-label="Illustrative example of connected marketing"><div className={s.seed}><span className={s.miniLabel}>The starting point</span><strong>One substantive, evidence-backed industry perspective.</strong><span className={s.exampleNote}>Illustrative scenario—not a client case study.</span></div><div className={s.steps}>
     <article><span>01 / Develop</span><h3>Start with an idea worth owning.</h3><p>Develop a distinctive point of view grounded in expertise and evidence.</p></article>
     <article><span>02 / Earn</span><h3>Earn the recognition it deserves.</h3><p>Bring that perspective into relevant industry conversations through targeted media opportunities.</p></article>
     <article><span>03 / Discover</span><h3>Make the expertise discoverable.</h3><p>Connect underlying content, earned recognition, and search strategy so buyers have more opportunities to encounter your perspective.</p></article>
     <article><span>04 / Learn</span><h3>Learn from every meaningful signal.</h3><p>Measure coverage, discoverability, and relevant audience engagement. Apply those insights to what happens next.</p></article>
    </div></div>
    <p className={s.conclusion}>The goal isn’t to make every discipline do the same work. <strong>It’s to make great work more valuable by connecting what happens before, during, and after it.</strong></p>
   </div>
  </section>

  <section id="method" className={s.method} aria-labelledby="method-title"><div className={s.shell}>
   <p className={s.kickerDark}>04 / The intelligence behind the execution</p>
   <div className={s.sectionTop}><div><h2 id="method-title">One direction.<br/><em>Greater impact.</em></h2><p className={s.frameworkName}>The Resultant Framework™</p></div><div className={s.prose}><p>Connecting capabilities takes more than good coordination. It requires shared priorities, disciplined execution, and a clear understanding of what success looks like.</p><p>We begin with your commercial priorities and competitive landscape. Identify where authority and visibility can make a meaningful difference. Put specialized expertise to work. Connect initiatives around shared objectives. Measure performance and adapt.</p></div></div>
   <div className={s.frameworkAsset}><VisualSlot number="07" kind="proprietary illustration" title="Resultant convergence" brief="Original editable vector system demonstrating aligned disciplines. Distinct from the concrete example above."/></div><ol className={s.stageGrid}>{stages.map(([title,desc],i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><strong>{title}</strong><small>{desc}</small></li>)}</ol>
   <div className={s.methodFooter}><p>Fragmentation creates drag. <strong>Alignment creates force.</strong></p><a href="/approach">Explore The Resultant Framework™ ↗</a></div>
  </div></section>

  <section className={s.proof} id="proof" aria-labelledby="proof-title"><div className={s.shell}>
   <p className={s.kickerDark}>05 / Strategy is only as good as the work</p>
   <div className={s.sectionTop}><h2 id="proof-title">Judge us by the thinking.<br/><em>And the execution.</em></h2><div className={s.prose}><p>A methodology isn’t proof of performance. The quality of the strategy matters. So does the judgment behind every recommendation, the substance of the work, and the evidence that shows whether it’s making a difference.</p><p>Sapient’s approach is built around those standards.</p></div></div>
   <div className={s.proofAssetRow}><VisualSlot number="08" kind="verified proof" title="Featured client work" brief="Real campaign, publication, or approved portfolio asset—no fabricated results."/><VisualSlot number="09" kind="verified proof" title="Outcome evidence" brief="Use attributable metrics, screenshots, or documented outcomes only."/></div><div className={s.proofGrid}><article><span>01 / Original thinking</span><h3>Perspectives grounded in meaningful market challenges.</h3><p>Explore research and thinking on authority, modern search, and connected marketing.</p><a href="/insights">Explore Our Thinking ↗</a></article><article><span>02 / Specialized execution</span><h3>Work that stands up to scrutiny.</h3><p>Earned media, strategic content, discoverability work, and creative production—not invented case-study metrics.</p><a href="/work">Explore Our Work ↗</a></article><article><span>03 / Accountable measurement</span><h3>Understand what the evidence says.</h3><p>Clear objectives, relevant indicators, and honest reporting on progress and limitations.</p><a href="/approach">How We Work ↗</a></article></div>
   <div className={s.engagement}><div><p className={s.kickerDark}>How we engage</p><h3>The expertise you need. An engagement built around your goals.</h3><p>Whether your priority is stronger media recognition, more influential content, improved discoverability, or a connected authority program, the engagement should fit the opportunity.</p><p>You don’t need to outsource your entire marketing operation to benefit from Sapient.</p></div><div className={s.engagementChoices}><article><strong>Focused engagements</strong><p>Specialized support against defined objectives.</p></article><article><strong>Integrated Authority Programs</strong><p>PR, content, and search working under one coordinated strategy.</p></article><a href="/contact">Discuss Your Priorities ↗</a></div></div>
  </div></section>

  <section className={s.cta} id="decision" aria-labelledby="decision-title"><div className={s.shell}><p className={s.kickerDark}>06 / The next move is yours</p><div className={s.ctaGrid}><h2 id="decision-title">What should your market <em>know you for?</em></h2><div><p>The expertise is already inside your organization. The opportunity is to make it more visible, more credible, and more influential in the places that shape buyer decisions.</p><p>Let’s examine where you stand, where your competitors are gaining ground, and what a stronger market position could look like.</p><div className={s.actions}><a className={s.darkBtn} href="/contact">Talk Strategy ↗</a><a className={s.outlineBtn} href="/audit">Assess Your Visibility ↗</a></div></div></div></div></section>
  <ResultantFooter/>
 </main>
}
