import { redirect } from 'next/navigation';
export default function AEORootPage({ params }: { params: { clientId: string } }) {
  redirect(`/clients/${params.clientId}/aeo/share-of-model`);
}
