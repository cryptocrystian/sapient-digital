import type { ReactNode } from 'react';
import RfMark from './RfMark';
import ResultantNav from './ResultantNav';
import ResultantFooter from './ResultantFooter';

type ResultantPlaceholderProps = {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  statusLabel?: string;
  meta?: Array<{ label: string; value: string }>;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  theme?: 'dark' | 'light';
};

export default function ResultantPlaceholder({
  eyebrow,
  title,
  body,
  statusLabel = 'In Development',
  meta,
  primaryHref = '/contact',
  primaryLabel = 'Talk Strategy →',
  secondaryHref = '/',
  secondaryLabel = '← Return home',
  theme = 'dark',
}: ResultantPlaceholderProps) {
  const sectionClass = `rs-ph-page${theme === 'light' ? ' rs-theme-light' : ''}`;
  return (
    <>
      <header className="rs-ph-nav-bar">
        <ResultantNav />
      </header>
      <section className={sectionClass} aria-label={eyebrow}>
        <div className="rs-ph-page__inner">
          <p className="rs-ph-page__eyebrow">
            <RfMark />
            <span>{eyebrow}</span>
          </p>
          <div className="rs-ph-page__status">{statusLabel}</div>
          <h1 className="rs-ph-page__h1">{title}</h1>
          <div className="rs-ph-page__body">{body}</div>
          {meta && meta.length > 0 && (
            <div className="rs-ph-page__meta">
              {meta.map((item) => (
                <div key={item.label}>
                  {item.label} <span>{item.value}</span>
                </div>
              ))}
            </div>
          )}
          <div className="rs-ph-page__ctas">
            <a className="rs-btn rs-btn--primary" href={primaryHref}>{primaryLabel}</a>
            <a className="rs-btn rs-btn--ghost" href={secondaryHref}>{secondaryLabel}</a>
          </div>
        </div>
      </section>
      <ResultantFooter />
    </>
  );
}
