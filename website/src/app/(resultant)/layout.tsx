import '@/styles/resultant.css';

export default function ResultantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="resultant-root">
      <a href="#main" className="rs-skip-link">Skip to main content</a>
      <div className="rs-page">
        <div id="main">{children}</div>
      </div>
    </div>
  );
}
