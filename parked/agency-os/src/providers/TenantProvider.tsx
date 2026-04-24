'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export type TenantRole =
  | 'super_admin'
  | 'admin'
  | 'account_lead'
  | 'specialist'
  | 'viewer';

export interface TenantMember {
  id: string;
  tenant_id: string;
  user_id: string;
  role: TenantRole;
  name: string;
  avatar_url?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: 'sapient' | 'partner';
  status: string;
  plan: string;
  white_label: Record<string, unknown>;
}

interface TenantContextValue {
  tenant: Tenant | null;
  member: TenantMember | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  can: (action: 'manage_clients' | 'manage_team' | 'manage_billing' | 'view_all_clients') => boolean;
}

const TenantContext = createContext<TenantContextValue>({
  tenant: null,
  member: null,
  isLoading: true,
  isSuperAdmin: false,
  isAdmin: false,
  can: () => false,
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [member, setMember] = useState<TenantMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }

      // Use the view that joins tenant_members with tenants
      const { data } = await supabase
        .from('agency_tenant_members_with_tenant')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setMember({
          id: data.id,
          tenant_id: data.tenant_id,
          user_id: data.user_id,
          role: data.role,
          name: data.name,
          avatar_url: data.avatar_url,
        });
        setTenant({
          id: data.tenant_id,
          name: data.tenant_name,
          slug: data.tenant_slug,
          type: data.tenant_type,
          status: data.tenant_status,
          plan: data.tenant_plan,
          white_label: data.white_label ?? {},
        });
      }

      setIsLoading(false);
    }

    load();
  }, []);

  const isSuperAdmin = member?.role === 'super_admin';
  const isAdmin = member?.role === 'admin' || isSuperAdmin;

  const can = (action: TenantContextValue['can'] extends (a: infer A) => boolean ? A : never) => {
    if (!member) return false;
    const role = member.role;
    switch (action) {
      case 'manage_clients':    return ['super_admin', 'admin', 'account_lead'].includes(role);
      case 'manage_team':       return ['super_admin', 'admin'].includes(role);
      case 'manage_billing':    return ['super_admin', 'admin'].includes(role);
      case 'view_all_clients':  return ['super_admin', 'admin'].includes(role);
      default: return false;
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, member, isLoading, isSuperAdmin, isAdmin, can }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
