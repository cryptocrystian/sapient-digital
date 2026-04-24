export default function PartnersPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Partner Agencies</h1>
        <p className="text-sm text-slate-6">White-label agency program — Phase 6</p>
      </div>

      <div className="panel-card p-8 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'var(--agency-gold-muted)' }}
        >
          <span className="text-2xl">🤝</span>
        </div>
        <h3 className="text-heading-md text-white-0 mb-2">Partner Program Coming Soon</h3>
        <p className="text-sm text-slate-6 max-w-md mx-auto mb-6">
          The Sapient Digital partner program allows other agencies to operate their own
          white-label instance — with their own clients, team, branding, and billing — built
          on the same multi-tenant infrastructure.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-6 text-left">
          {[
            { icon: '🏷️', label: 'White-label', desc: 'Your brand, your domain, your colors' },
            { icon: '🔒', label: 'Fully isolated', desc: 'Complete tenant separation — clients see only your agency' },
            { icon: '📊', label: 'Usage analytics', desc: 'Billing passthrough and platform usage reports' },
          ].map(feature => (
            <div key={feature.label} className="panel-card p-4">
              <p className="text-lg mb-2">{feature.icon}</p>
              <p className="text-xs font-semibold text-white-0 mb-1">{feature.label}</p>
              <p className="text-xs text-slate-6">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-4 text-xs text-slate-6">
          Activates after 5 active Sapient Digital clients · D004 Phase 6
        </div>
      </div>
    </div>
  );
}
