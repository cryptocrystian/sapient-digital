export type CaseStudy = {
  title: string;
  slug: string;
  client: string;
  industry?: string;
  problem: string;
  approach: string;
  execution: string;
  results: {
    kpi: string;
    value: string;
    delta?: number;
    method?: string;
  }[];
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
};
