import '@/styles/resultant.css';

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="resultant-root">
      <a href="#main" className="rs-skip-link">Skip to main content</a>
      <div className="rs-page">
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
