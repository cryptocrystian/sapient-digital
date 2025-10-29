export type Service = {
  name: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  kpis: string[];
  timeline?: string;
  priceBand?: string;
  faq?: { q: string; a: string }[];
};
