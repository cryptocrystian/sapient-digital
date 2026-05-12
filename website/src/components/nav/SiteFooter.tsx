import Link from 'next/link';
import Wordmark from './Wordmark';

const LINKS = {
  Services: [
    { label: 'PR & Media Relations',         href: '/services/pr-media-relations' },
    { label: 'Content & Thought Leadership', href: '/services/content-thought-leadership' },
    { label: 'AI Presence & AEO',            href: '/services/search-ai-visibility' },
    { label: 'Video Production',             href: '/services/video-production' },
  ],
  Company: [
    { label: 'Approach', href: '/approach' },
    { label: 'Work',     href: '/work' },
    { label: 'Pricing',  href: '/pricing' },
    { label: 'Contact',  href: '/contact' },
  ],
  Audit: [
    { label: 'Free Visibility Audit', href: '/audit' },
    { label: 'PR Audit',              href: '/audit/pr' },
    { label: 'Content Audit',         href: '/audit/content' },
    { label: 'Search & AI Audit',     href: '/audit/visibility' },
  ],
};

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '64px 52px 40px',
        background: 'var(--surface-base)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '56px',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Wordmark height={36} />
            </div>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                lineHeight: 1.7,
                maxWidth: '220px',
              }}
            >
              AI-native PR, content, search visibility, and video production for B2B brands that
              refuse to be invisible.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                marginTop: '20px',
              }}
            >
              hello@sapientdigital.io
            </p>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                  marginBottom: '16px',
                }}
              >
                {group}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            © 2026 Sapient Digital LLC · All rights reserved
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/privacy"
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
