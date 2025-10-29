import { CaseStudy } from "@/types/case-study";
import { StatChip } from "@/components/ui/StatChip";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="p-8 rounded-xl bg-bg-700 border border-line-700 hover:border-accent-500/50 transition-all duration-200 shadow-card">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-fg-100 mb-2">
          {study.title}
        </h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-fg-300">{study.client}</span>
          {study.industry && (
            <>
              <span className="text-line-600">•</span>
              <span className="text-fg-500">{study.industry}</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-accent-400 mb-2">
            Problem
          </h4>
          <p className="text-fg-300 text-sm">{study.problem}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-accent-400 mb-2">
            Approach
          </h4>
          <p className="text-fg-300 text-sm">{study.approach}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-fg-100 mb-3">Results</h4>
        <div className="flex flex-wrap gap-2">
          {study.results.map((result, idx) => (
            <StatChip
              key={idx}
              label={result.kpi}
              value={result.value}
              delta={result.delta}
            />
          ))}
        </div>
      </div>

      {study.quote && (
        <blockquote className="mt-6 pt-6 border-t border-line-700">
          <p className="text-fg-100 italic mb-2">&ldquo;{study.quote.text}&rdquo;</p>
          <footer className="text-sm text-fg-300">
            — {study.quote.author}
            {study.quote.role && `, ${study.quote.role}`}
          </footer>
        </blockquote>
      )}
    </article>
  );
}
