import { Service } from "@/types/service";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group p-8 rounded-xl bg-bg-700 border border-line-700 hover:border-accent-500/50 transition-all duration-200 shadow-card">
      <h3 className="text-2xl font-semibold text-fg-100 mb-4 group-hover:text-accent-400 transition">
        {service.name}
      </h3>
      <p className="text-fg-300 mb-6">{service.summary}</p>

      {service.outcomes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-fg-100 mb-2">Outcomes</h4>
          <ul className="space-y-2">
            {service.outcomes.map((outcome, idx) => (
              <li key={idx} className="text-fg-300 text-sm flex items-start gap-2">
                <span className="text-accent-400 mt-1">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.deliverables.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-fg-100 mb-2">
            Deliverables
          </h4>
          <ul className="space-y-2">
            {service.deliverables.map((deliverable, idx) => (
              <li key={idx} className="text-fg-300 text-sm">
                • {deliverable}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.timeline && (
        <div className="mt-4 pt-4 border-t border-line-700">
          <span className="text-xs text-fg-500">Timeline: </span>
          <span className="text-sm text-fg-100">{service.timeline}</span>
        </div>
      )}
    </div>
  );
}
