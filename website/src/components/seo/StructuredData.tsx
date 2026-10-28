/**
 * JSON-LD structured data helpers.
 *
 * Why: Google (and other search engines + LLM crawlers) prefer explicit
 * machine-readable facts over heuristic guesses at page meaning. For an
 * agency positioning on AI visibility, strong structured data is table stakes.
 *
 * Reusable schemas defined below. Each returns a serialized <script> element
 * that can drop into a page's `<head>` via Next's `<Script>` or inline in JSX.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapientdigital.io';
const LEGAL_NAME = 'Sapient Digital LLC';
const BRAND_NAME = 'Sapient Digital';

type JsonLd = Record<string, unknown>;

function Script({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    description:
      'A B2B marketing agency connecting digital PR, strategic content, and search & AI visibility in one accountable program.',
    sameAs: [
      // Add social URLs once they are live:
      // 'https://www.linkedin.com/company/sapient-digital',
      // 'https://x.com/sapientdigital',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@sapientdigital.io',
      availableLanguage: ['English'],
      areaServed: 'US',
    },
    knowsAbout: [
      'Digital PR',
      'Strategic Content',
      'Search & AI Visibility',
      'AI citation measurement',
      'Earned media',
      'B2B marketing',
    ],
  };
  return <Script data={data} />;
}

export function WebsiteJsonLd() {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'en-US',
  };
  return <Script data={data} />;
}

/**
 * Marketing-agency ProfessionalService schema. Captures the service model
 * so Google can describe the business accurately in Knowledge Panels.
 */
export function ProfessionalServiceJsonLd() {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}#service`,
    name: BRAND_NAME,
    url: SITE_URL,
    description:
      'B2B marketing agency specializing in digital PR, strategic content, and search & AI visibility.',
    priceRange: '$$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital PR',
            description:
              'Earn credible, independent recognition in publications buyers already trust.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Strategic Content',
            description:
              'Turn expertise into a defensible point of view — thought leadership journalists and buyers cite.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Search & AI Visibility',
            description:
              'Be discoverable when buyers investigate — in traditional search and in AI-assisted research.',
          },
        },
      ],
    },
  };
  return <Script data={data} />;
}

type ArticleProps = {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  modifiedAt?: string;
  readingTime?: string;
};

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  readingTime,
}: ArticleProps) {
  const url = `${SITE_URL}/insights/${slug}`;
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}#website` },
    publisher: { '@id': `${SITE_URL}#organization` },
    author: { '@id': `${SITE_URL}#organization` },
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
    ...(readingTime && { timeRequired: readingTime }),
    image: `${SITE_URL}/opengraph-image`,
  };
  return <Script data={data} />;
}

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return <Script data={data} />;
}
