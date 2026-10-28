import type { Metadata } from 'next';
import ResultantHome from '@/components/resultant/ResultantHome';
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  ProfessionalServiceJsonLd,
} from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  // Homepage overrides the layout's title template because the brand IS the title here.
  title: {
    absolute: 'Sapient Digital — Impossible to Ignore',
  },
  description:
    'Sapient Digital is a B2B marketing agency connecting digital PR, strategic content, and search visibility in one accountable program — so your market encounters a credible, consistent picture of who you are.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sapient Digital — Impossible to Ignore',
    description:
      'Connected marketing. Amplified impact. The Resultant Framework™ turns specialized disciplines into coordinated market presence.',
    url: '/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <ProfessionalServiceJsonLd />
      <ResultantHome />
    </>
  );
}
