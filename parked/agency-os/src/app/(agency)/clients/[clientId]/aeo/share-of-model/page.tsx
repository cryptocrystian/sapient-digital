export default function AEOPage({ params }: { params: { clientId: string } }) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-heading-lg text-white-0 mb-1">AI Presence & AEO</h2>
        <p className="text-sm text-slate-6">Share of Model, citation tracking, and AEO optimization</p>
      </div>

      <div className="panel-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-4 flex items-center justify-center mx-auto mb-4">
          <span className="text-xl">📡</span>
        </div>
        <h3 className="text-heading-sm text-white-0 mb-2">Available after Pravado GA</h3>
        <p className="text-sm text-slate-6 max-w-sm mx-auto">
          AEO intelligence — Share of Model, citation rates, and competitor gap analysis —
          connects to Pravado's CiteMind engine. This view activates when the Pravado
          intelligence endpoints are live.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-4 text-xs text-slate-6">
          Tracked in DECISIONS_LOG.md · D004 · Phase 5
        </div>
      </div>
    </div>
  );
}
