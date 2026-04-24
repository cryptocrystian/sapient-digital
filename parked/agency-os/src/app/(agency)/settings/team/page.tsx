'use client';

import { useState, useEffect } from 'react';
import { Plus, X, Loader2, UserCheck, Mail } from 'lucide-react';

const ROLES = [
  { value: 'admin',         label: 'Admin',         desc: 'Full access — manage clients, team, billing' },
  { value: 'account_lead',  label: 'Account Lead',  desc: 'Manage assigned clients, create content and pitches' },
  { value: 'specialist',    label: 'Specialist',    desc: 'Execute deliverables on assigned clients' },
  { value: 'viewer',        label: 'Viewer',        desc: 'Read-only access to all clients' },
];

interface Member {
  id: string; user_id: string; role: string; name: string; created_at: string;
}

export default function TeamSettingsPage() {
  const [members, setMembers]         = useState<Member[]>([]);
  const [loading, setLoading]         = useState(true);
  const [showInvite, setShowInvite]   = useState(false);
  const [inviting, setInviting]       = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setSuccess]   = useState('');
  const [form, setForm] = useState({ email: '', name: '', role: 'specialist' });

  function loadMembers() {
    fetch('/api/agency/team/invite')
      .then(r => r.json())
      .then(d => { setMembers(d.data ?? []); setLoading(false); });
  }

  useEffect(() => { loadMembers(); }, []);

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true); setInviteError(''); setSuccess('');
    try {
      const res = await fetch('/api/agency/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Invite failed');
      setSuccess(`Invite sent to ${form.email}`);
      setForm({ email: '', name: '', role: 'specialist' });
      setShowInvite(false);
      loadMembers();
    } catch (e: any) {
      setInviteError(e.message);
    } finally {
      setInviting(false);
    }
  }

  const roleColor: Record<string, string> = {
    super_admin:  'text-agency-gold',
    admin:        'text-brand-cyan',
    account_lead: 'text-brand-iris',
    specialist:   'text-white-0',
    viewer:       'text-slate-6',
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 size={20} className="animate-spin text-brand-cyan" /></div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-xl text-white-0 mb-1">Team</h1>
          <p className="text-sm text-slate-6">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowInvite(!showInvite)}
          className="btn-agency flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={14} /> Invite Member
        </button>
      </div>

      {inviteSuccess && (
        <div className="alert-info mb-6 flex items-center gap-2">
          <Mail size={15} /> {inviteSuccess}
        </div>
      )}

      {showInvite && (
        <div className="panel-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-sm text-white-0">Invite Team Member</h3>
            <button onClick={() => setShowInvite(false)} className="text-slate-6 hover:text-white-0"><X size={16} /></button>
          </div>
          {inviteError && <div className="alert-error mb-4">{inviteError}</div>}
          <form onSubmit={sendInvite} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Email *</label>
                <input type="email" value={form.email}
                  onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  placeholder="colleague@company.com" className="input-field" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Name</label>
                <input value={form.name}
                  onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  placeholder="First Last" className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-2">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <label key={r.value}
                    className={`flex items-start gap-3 p-3 rounded-md cursor-pointer border transition-all ${
                      form.role === r.value
                        ? 'bg-slate-3 border-brand-cyan/40'
                        : 'bg-slate-3 border-border-subtle hover:border-slate-5'
                    }`}>
                    <input type="radio" name="role" value={r.value}
                      checked={form.role === r.value}
                      onChange={() => setForm(p => ({...p, role: r.value}))}
                      className="mt-0.5 accent-brand-cyan" />
                    <div>
                      <p className="text-sm font-medium text-white-0">{r.label}</p>
                      <p className="text-xs text-slate-6 leading-snug">{r.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={() => setShowInvite(false)}
                className="btn-secondary text-sm px-4 py-2">Cancel</button>
              <button type="submit" disabled={inviting || !form.email}
                className="btn-agency flex items-center gap-2 text-sm px-4 py-2 disabled:opacity-50">
                {inviting
                  ? <><Loader2 size={13} className="animate-spin" /> Sending...</>
                  : <><Mail size={13} /> Send Invite</>}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="panel-card divide-y divide-border-subtle">
        {members.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <UserCheck size={28} className="text-slate-6 mx-auto mb-3" />
            <p className="text-sm text-white-0 font-medium mb-1">No team members yet</p>
            <p className="text-xs text-slate-6">Invite your first team member above</p>
          </div>
        ) : members.map(member => (
          <div key={member.id} className="flex items-center gap-4 px-5 py-4">
            <div className="w-9 h-9 rounded-full bg-slate-4 flex items-center justify-center text-sm font-semibold text-white-0 flex-shrink-0">
              {(member.name || '?').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white-0">{member.name || '—'}</p>
              <p className="text-xs text-slate-6">
                {new Date(member.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <span className={`text-xs font-medium capitalize ${roleColor[member.role] ?? 'text-slate-6'}`}>
              {member.role.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
