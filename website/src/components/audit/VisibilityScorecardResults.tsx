'use client';

import Link from 'next/link';
import ResultantNav from '@/components/resultant/ResultantNav';
import RfMark from '@/components/resultant/RfMark';
import {
  visibilityBand,
  sevColor,
  pillarOrder,
  PILLAR_CONFIG,
  type ScanResponse,
  type EntryPath,
} from './audit-types';

interface Props {
  scanResult: ScanResponse;
  entryPath: EntryPath;
}

function bandNarrative(label: string): string {
  if (label === 'At Risk') {
    return "Your brand has significant visibility gaps across digital PR, strategic content, and search & AI presence. Competitors are taking ground you haven't claimed yet.";
  }
  if (label === 'Emerging') {
    return 'Your brand is building presence but there are clear gaps slowing your momentum. Targeted investment in lagging disciplines will compound quickly.';
  }
  if (label === 'Competitive') {
    return 'Your brand has solid visibility across most disciplines. The gap to Dominant status is addressable with a coordinated cross-discipline strategy.';
  }
  return 'Your brand has strong visibility across all three disciplines. Maintaining this position requires consistent execution and active defense.';
}

function quartileLabel(q: 1 | 2 | 3 | 4 | null): string {
  if (q === 1) return 'Top quartile';
  if (q === 2) return '2nd quartile';
  if (q === 3) return '3rd quartile';
  if (q === 4) return 'Bottom quartile';
  return '';
}

export default function VisibilityScorecardResults({ scanResult, entryPath }: Props) {
  const band    = visibilityBand(scanResult.evi_score);
  const order   = pillarOrder(entryPath);
  const v       = scanResult.variance;
  const bench   = scanResult.benchmark;
  const leading = PILLAR_CONFIG[v.leading_pillar];
  const lagging = PILLAR_CONFIG[v.lagging_pillar];
  const leadPillar = order[0]; // The user's entry-path discipline sits first.

  return (
    <>
      <header style={{ padding: '20px', borderBottom: '1px solid var(--rs-border)' }}>
        <ResultantNav />
      </header>

      <section className="rs-score" aria-label="Resultant Scorecard results">
        {/* Overall score hero */}
        <div className="rs-score__hero">
          <div className="rs-score__hero-eyebrow">
            <RfMark />
            <span>
              The Resultant Scorecard<sup className="rs-tm">™</sup>
            </span>
          </div>
          <div className="rs-score__number" style={{ color: band.color }}>
            {scanResult.evi_score}
          </div>
          <div
            className="rs-score__band-chip"
            style={{ color: band.color, background: band.bgColor }}
          >
            {band.label}
          </div>
          <p className="rs-score__narrative">{bandNarrative(band.label)}</p>
          {bench.category_label && (
            <div className="rs-score__benchmark">
              <strong>{quartileLabel(bench.category_quartile)}</strong>
              {' '} in {bench.category_label}
            </div>
          )}
        </div>

        {/* Three discipline pillars */}
        <div className="rs-score__pillars">
          {order.map((pk) => {
            const ps  = scanResult.pillars[pk];
            const cfg = PILLAR_CONFIG[pk];
            const b   = visibilityBand(ps.score);
            const isLead = pk === leadPillar;
            return (
              <div
                key={pk}
                className={`rs-score__pillar${isLead ? ' rs-score__pillar--lead' : ''}`}
                style={{ color: isLead ? 'var(--rs-signal)' : cfg.accent }}
              >
                <div className="rs-score__pillar-header">
                  <span className="rs-score__pillar-label">{cfg.label}</span>
                  <span className="rs-score__pillar-score" style={{ color: b.color }}>
                    {ps.score}
                  </span>
                </div>
                <div className="rs-score__pillar-bar">
                  <div
                    className="rs-score__pillar-bar-fill"
                    style={{
                      width: `${ps.score}%`,
                      background: isLead ? 'var(--rs-signal)' : cfg.accent,
                    }}
                  />
                </div>
                <div className="rs-score__gaps">
                  {ps.gaps.slice(0, 2).map((gap, i) => (
                    <div key={i} className="rs-score__gap">
                      <div className="rs-score__gap-header">
                        <span
                          className="rs-score__gap-dot"
                          style={{ background: sevColor(gap.severity) }}
                        />
                        <p className="rs-score__gap-title">{gap.title}</p>
                      </div>
                      <p className="rs-score__gap-desc">{gap.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cross-pillar variance / orchestration opportunity */}
        <div className="rs-score__variance">
          <div>
            <p className="rs-score__variance-label">Cross-Discipline Opportunity</p>
            <p className="rs-score__variance-copy">{v.orchestration_opportunity}</p>
          </div>
          <div className="rs-score__variance-visual">
            <div className="rs-score__variance-pillar">
              <div
                className="rs-score__variance-pillar-score"
                style={{ color: leading.accent }}
              >
                {scanResult.pillars[v.leading_pillar].score}
              </div>
              <div className="rs-score__variance-pillar-label">{leading.label}</div>
            </div>
            <div className="rs-score__variance-arrow">→</div>
            <div className="rs-score__variance-pillar">
              <div
                className="rs-score__variance-pillar-score"
                style={{ color: lagging.accent }}
              >
                {scanResult.pillars[v.lagging_pillar].score}
              </div>
              <div className="rs-score__variance-pillar-label">{lagging.label}</div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="rs-score__close">
          <div className="rs-score__close-eyebrow">— Next</div>
          <h2 className="rs-score__close-title">
            Ready to close the gaps?
          </h2>
          <p className="rs-score__close-copy">
            Your scorecard shows exactly where you&apos;re losing ground. Let&apos;s discuss a
            coordinated strategy to move you up the band — a focused engagement on your lagging
            discipline, or an integrated program across all three.
          </p>
          <div className="rs-score__close-ctas">
            <Link href="/contact" className="rs-btn rs-btn--primary">
              Talk Strategy →
            </Link>
            <Link href="/approach" className="rs-btn rs-btn--ghost">
              The Resultant Framework<sup className="rs-tm">™</sup>&nbsp;↗
            </Link>
          </div>
          <p className="rs-score__close-fine">
            No commitment · We review your results together · Human-reviewed
          </p>
        </div>
      </section>
    </>
  );
}
