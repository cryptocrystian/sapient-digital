import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
const ResultantScene=dynamic(()=>import("../ResultantScene"));
export const metadata:Metadata={title:"Resultant Framework — 3D Visual Lab | Sapient Digital",robots:{index:false,follow:false}};
export default function Page(){return <main className={styles.page}>
<header className={styles.header}><Link href="/resultant-preview">← RESULTANT HOMEPAGE</Link><span>CREATIVE STUDY / NOT FOR PUBLICATION</span></header>
<section className={styles.hero}><div className={styles.intro}><p>THE RESULTANT FRAMEWORK™ / MOTION STUDY 01</p><h1>Different strengths.<br/><em>One direction.</em></h1><div><h2>Fragmentation creates drag.<br/>Alignment creates force.</h2><p>Independent practices become more powerful when market intelligence gives them a shared direction. The movement is the message: three differentiated contributions, coordinated toward a stronger market presence.</p><Link href="/resultant-preview/approach">Explore the Framework ↗</Link></div></div><ResultantScene/></section>
<section className={styles.notes}><h2>What this prototype is testing</h2><div><article><h3>01 / Legibility</h3><p>Each practice remains distinct. Alignment creates a common trajectory without implying the practices lose their expertise.</p></article><article><h3>02 / Restraint</h3><p>Materiality and motion should feel premium and precise—not like a software interface or science-fiction scene.</p></article><article><h3>03 / Accessibility</h3><p>Reduced-motion and touch conditions show a stable result; a static SVG-like fallback remains available where WebGL is unsupported.</p></article></div></section>
</main>}