'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export interface Client {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  domain: string;
  industry?: string;
  segment?: string;
  status: 'onboarding' | 'active' | 'paused' | 'churned';
  account_lead_id?: string;
  brand_voice?: string;
  logo_url?: string;
  brand_colors: Record<string, string>;
  icp_description?: string;
  competitors: string[];
}

export interface Retainer {
  id: string;
  client_id: string;
  tier: string;
  monthly_value: number;
  start_date: string;
  end_date?: string;
  status: string;
  sow_url?: string;
  msa_url?: string;
  video_module?: string;
}

interface ClientContextValue {
  client: Client | null;
  retainer: Retainer | null;
  isLoading: boolean;
}

const ClientContext = createContext<ClientContextValue>({
  client: null,
  retainer: null,
  isLoading: true,
});

export function ClientProvider({
  clientId,
  children,
}: {
  clientId: string;
  children: React.ReactNode;
}) {
  const [client, setClient] = useState<Client | null>(null);
  const [retainer, setRetainer] = useState<Retainer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: clientData }, { data: retainerData }] = await Promise.all([
        supabase
          .schema('agency')
          .from('clients')
          .select('*')
          .eq('id', clientId)
          .single(),
        supabase
          .schema('agency')
          .from('retainers')
          .select('*')
          .eq('client_id', clientId)
          .eq('status', 'active')
          .single(),
      ]);

      if (clientData) setClient(clientData as Client);
      if (retainerData) setRetainer(retainerData as Retainer);
      setIsLoading(false);
    }

    load();
  }, [clientId]);

  return (
    <ClientContext.Provider value={{ client, retainer, isLoading }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
