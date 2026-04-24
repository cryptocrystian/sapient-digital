import { redirect } from 'next/navigation';

export default function ClientPRPage({ params }: { params: { clientId: string } }) {
  redirect(`/clients/${params.clientId}/pr/pitches`);
}
