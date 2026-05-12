import { Suspense } from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    "Start with a free visibility audit or book a scoping call. We'll show you where you stand before we talk scope.",
};

export default function ContactPage() {
  // useSearchParams in ContactClient requires Suspense boundary.
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
