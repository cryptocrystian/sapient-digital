'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'basics' | 'brand' | 'retainer' | 'pillars' | 'confirm';
const STEPS: { id: Step; label: string }[] = [
  { id: 'basics',  label: 'Basics'  },
  { id: 'brand',   label: 'Brand'   },
  { id: 'retainer',label: 'Retainer'},
  { id: 'pillars', label: 'Pillars' },
  { id: 'confirm', label: 'Confirm' },
];

const SEGMENTS = [
  { value: 'b2b_saas',              label: 'B2B SaaS' },
  { value: 'professional_services', label: 'Professional Services' },
  { value: 'industrial',            label: 'Industrial' },
  { value: 'executive',             label: 'Executive / Personal Brand' },
];

const TIERS = [
  { value: 'establish',   label: 'Establish',   price: '$10,500/mo' },
  { value: 'accelerate',  label: 'Accelerate',  price: '$16,500/mo' },
  { value: 'dominate',    label: 'Dominate',    price: '$24,500/mo' },
  { value: 'enterprise',  label: 'Enterprise',  price: 'Custom'     },
];

const VIDEO_MODULES = [
  { value: '',           label: 'None' },
  { value: 'essentials', label: 'Video Essentials (+$299/mo)' },
  { value: 'pro',        label: 'Video Pro (+$599/mo)' },
  { value: 'enterprise', label: 'Video Enterprise (custom)' },
];

const PILLAR_OPTIONS = [
  { value: 'pr',      label: 'Earned Media & PR' },
  { value: 'content', label: 'Authority Content' },
  { value: 'aeo',     label: 'AI Search Visibility' },
  { value: 'video',   label: 'AI Video Production' },
];

interface FormData {
  // Basics
  name: string;
  domain: string;
  segment: string;
  industry: string;
  // Brand
  brand_voice: string;
  icp_description: string;
  competitors: string;
  // Retainer
  tier: string;
  monthly_value: string;
  video_module: string;
  onboarding_fee: string;
  start_date: string;
  // Pillars
  pillars: string[];
}

export default function NewClientPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('basics');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<FormData>({
    name: '', domain: '', segment: '', industry: '',
    brand_voice: '', icp_description: '', competitors: '',
    tier: 'establish', monthly_value: '1050000', video_module: '',
    onboarding_fee: '250000', start_date: '',
    pillars: ['pr', 'content'],
  });

  const update = (key: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const stepIndex = STEPS.findIndex(s => s.id === step);

  function next() {
    const steps = STEPS.map(s => s.id);
    const next = steps[stepIndex + 1];
    if (next) setStep(next);
  }

  function back() {
    const steps = STEPS.map(s => s.id);
    const prev = steps[stepIndex - 1];
    if (prev) setStep(prev);
  }

  async function submit() {
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/agency/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          domain: form.domain,
          segment: form.segment,
          industry: form.industry,
          brand_voice: form.brand_voice,
          icp_description: form.icp_description,
          competitors: form.competitors.split('\n').map(c => c.trim()).filter(Boolean),
          retainer: {
            tier: form.tier,
            monthly_value: parseInt(form.monthly_value),
            video_module: form.video_module || null,
            onboarding_fee: parseInt(form.onboarding_fee),
            start_date: form.start_date,
          },
          pillars: form.pillars,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message ?? 'Failed to create client');

      router.push(`/clients/${data.data.id}/overview`);
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">New Client</h1>
        <p className="text-sm text-slate-6">Onboard a new retainer client</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const done    = i < stepIndex;
          const current = s.id === step;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  done    ? 'text-dark-bg'  : current ? 'text-dark-bg'  : 'text-slate-6',
                  done    ? '' : current ? '' : 'bg-slate-4',
                )} style={done || current ? { background: 'var(--agency-gold)' } : {}}>
                  {done ? <Check size={14} /> : i + 1}
                </div>
                <span className={cn(
                  'text-xs font-medium',
                  current ? 'text-white-0' : done ? 'text-slate-6' : 'text-slate-6'
                )}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-px mx-2 mb-5 transition-colors',
                  i < stepIndex ? '' : 'bg-border-subtle'
                )} style={i < stepIndex ? { background: 'var(--agency-gold)' } : {}} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="panel-card p-6">

        {/* BASICS */}
        {step === 'basics' && (
          <div className="space-y-4">
            <h2 className="text-heading-sm text-white-0 mb-4">Client Basics</h2>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Company Name *</label>
              <input value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Acme Corporation" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Website Domain *</label>
              <input value={form.domain} onChange={e => update('domain', e.target.value)}
                placeholder="acmecorp.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Segment *</label>
              <div className="grid grid-cols-2 gap-2">
                {SEGMENTS.map(seg => (
                  <button key={seg.value} type="button"
                    onClick={() => update('segment', seg.value)}
                    className={cn(
                      'px-3 py-2.5 rounded-md text-sm font-medium text-left transition-all border',
                      form.segment === seg.value
                        ? 'text-dark-bg border-transparent'
                        : 'text-slate-6 bg-slate-3 border-border-subtle hover:border-slate-5'
                    )}
                    style={form.segment === seg.value ? { background: 'var(--agency-gold)', borderColor: 'var(--agency-gold)' } : {}}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Industry</label>
              <input value={form.industry} onChange={e => update('industry', e.target.value)}
                placeholder="e.g. Cybersecurity, Manufacturing, Legal" className="input-field" />
            </div>
          </div>
        )}

        {/* BRAND */}
        {step === 'brand' && (
          <div className="space-y-4">
            <h2 className="text-heading-sm text-white-0 mb-4">Brand & Positioning</h2>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Brand Voice</label>
              <textarea value={form.brand_voice} onChange={e => update('brand_voice', e.target.value)}
                placeholder="Describe the client's tone, personality, and communication style..."
                className="input-field resize-none" rows={3} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">ICP Description</label>
              <textarea value={form.icp_description} onChange={e => update('icp_description', e.target.value)}
                placeholder="Describe the ideal customer profile — role, company size, pain points..."
                className="input-field resize-none" rows={3} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">
                Competitor Domains
                <span className="text-slate-6 font-normal ml-1">(one per line)</span>
              </label>
              <textarea value={form.competitors} onChange={e => update('competitors', e.target.value)}
                placeholder="competitor1.com&#10;competitor2.com&#10;competitor3.com"
                className="input-field resize-none font-mono text-xs" rows={4} />
            </div>
          </div>
        )}

        {/* RETAINER */}
        {step === 'retainer' && (
          <div className="space-y-4">
            <h2 className="text-heading-sm text-white-0 mb-4">Retainer Structure</h2>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Retainer Tier *</label>
              <div className="grid grid-cols-2 gap-2">
                {TIERS.map(tier => (
                  <button key={tier.value} type="button"
                    onClick={() => update('tier', tier.value)}
                    className={cn(
                      'px-3 py-3 rounded-md text-sm font-medium text-left transition-all border',
                      form.tier === tier.value
                        ? 'text-dark-bg border-transparent'
                        : 'text-slate-6 bg-slate-3 border-border-subtle hover:border-slate-5'
                    )}
                    style={form.tier === tier.value ? { background: 'var(--agency-gold)', borderColor: 'var(--agency-gold)' } : {}}
                  >
                    <span className="block font-semibold">{tier.label}</span>
                    <span className="text-xs opacity-80">{tier.price}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Monthly Value (cents) *</label>
                <input type="number" value={form.monthly_value}
                  onChange={e => update('monthly_value', e.target.value)}
                  className="input-field" />
                <p className="text-xs text-slate-6 mt-1">
                  ${(parseInt(form.monthly_value || '0') / 100).toLocaleString()}/mo
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-white-0 mb-1.5">Onboarding Fee (cents)</label>
                <input type="number" value={form.onboarding_fee}
                  onChange={e => update('onboarding_fee', e.target.value)}
                  className="input-field" />
                <p className="text-xs text-slate-6 mt-1">
                  ${(parseInt(form.onboarding_fee || '0') / 100).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Start Date *</label>
              <input type="date" value={form.start_date}
                onChange={e => update('start_date', e.target.value)}
                className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-0 mb-1.5">Video Module Add-on</label>
              <div className="space-y-2">
                {VIDEO_MODULES.map(mod => (
                  <label key={mod.value} className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer border transition-all',
                    form.video_module === mod.value
                      ? 'border-agency-gold bg-slate-3'
                      : 'border-border-subtle bg-slate-3 hover:border-slate-5'
                  )}>
                    <input type="radio" name="video_module" value={mod.value}
                      checked={form.video_module === mod.value}
                      onChange={() => update('video_module', mod.value)}
                      className="accent-current" />
                    <span className="text-sm text-white-0">{mod.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PILLARS */}
        {step === 'pillars' && (
          <div className="space-y-4">
            <h2 className="text-heading-sm text-white-0 mb-4">Active Service Pillars</h2>
            <p className="text-sm text-slate-6 -mt-2 mb-4">Select which pillars are included in this retainer.</p>
            <div className="grid grid-cols-2 gap-3">
              {PILLAR_OPTIONS.map(pillar => {
                const active = form.pillars.includes(pillar.value);
                return (
                  <button key={pillar.value} type="button"
                    onClick={() => {
                      update('pillars', active
                        ? form.pillars.filter(p => p !== pillar.value)
                        : [...form.pillars, pillar.value]
                      );
                    }}
                    className={cn(
                      'px-4 py-3 rounded-md text-sm font-medium text-left transition-all border',
                      active
                        ? 'text-dark-bg border-transparent'
                        : 'text-slate-6 bg-slate-3 border-border-subtle hover:border-slate-5'
                    )}
                    style={active ? { background: 'var(--agency-gold)', borderColor: 'var(--agency-gold)' } : {}}
                  >
                    {active && <Check size={13} className="inline mr-1.5 -mt-0.5" />}
                    {pillar.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CONFIRM */}
        {step === 'confirm' && (
          <div className="space-y-4">
            <h2 className="text-heading-sm text-white-0 mb-4">Confirm & Create</h2>

            {error && <div className="alert-error">{error}</div>}

            <div className="space-y-3">
              {[
                { label: 'Company',  value: form.name },
                { label: 'Domain',   value: form.domain },
                { label: 'Segment',  value: SEGMENTS.find(s => s.value === form.segment)?.label ?? '—' },
                { label: 'Tier',     value: TIERS.find(t => t.value === form.tier)?.label ?? '—' },
                { label: 'MRR',      value: `$${(parseInt(form.monthly_value || '0') / 100).toLocaleString()}/mo` },
                { label: 'Start',    value: form.start_date || '—' },
                { label: 'Pillars',  value: form.pillars.map(p => p.toUpperCase()).join(', ') || 'None' },
                { label: 'Video',    value: VIDEO_MODULES.find(m => m.value === form.video_module)?.label ?? 'None' },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border-subtle text-sm">
                  <span className="text-slate-6">{item.label}</span>
                  <span className="text-white-0 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={back}
          disabled={stepIndex === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40"
        >
          <ChevronLeft size={15} /> Back
        </button>

        {step !== 'confirm' ? (
          <button
            onClick={next}
            disabled={
              (step === 'basics' && (!form.name || !form.domain || !form.segment)) ||
              (step === 'retainer' && (!form.tier || !form.monthly_value || !form.start_date))
            }
            className="btn-agency flex items-center gap-2 disabled:opacity-40"
          >
            Continue <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            className="btn-agency flex items-center gap-2"
          >
            {submitting ? (
              <><Loader2 size={15} className="animate-spin" /> Creating...</>
            ) : (
              <><Check size={15} /> Create Client</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
