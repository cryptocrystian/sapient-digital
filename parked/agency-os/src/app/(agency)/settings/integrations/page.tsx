import { CheckCircle, XCircle, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  envKeys: string[];
  docsUrl: string | null;
  phase: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'higgsfield',
    name: 'Higgsfield Cloud API',
    description: 'Primary video generation — B-roll, generative, cinematic formats via Kling 3.0, Sora 2, Wan 2.5',
    envKeys: ['HIGGSFIELD_API_KEY_ID', 'HIGGSFIELD_API_KEY_SECRET'],
    docsUrl: 'https://cloud.higgsfield.ai',
    phase: 'Video Pipeline',
  },
  {
    id: 'heygen',
    name: 'HeyGen API',
    description: 'Avatar and lipsync video — executive thought leadership and avatar programs',
    envKeys: ['HEYGEN_API_KEY'],
    docsUrl: 'https://app.heygen.com/settings/api',
    phase: 'Video Pipeline',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs API',
    description: 'AI voice narration for B-roll and explainer video formats',
    envKeys: ['ELEVEN_LABS_API_KEY'],
    docsUrl: 'https://elevenlabs.io/app/api-key',
    phase: 'Video Pipeline',
  },
  {
    id: 'vimeo',
    name: 'Vimeo API',
    description: 'Client review link delivery, video hosting and feedback management',
    envKeys: ['VIMEO_PERSONAL_API_TOKEN'],
    docsUrl: 'https://developer.vimeo.com/apps',
    phase: 'Video Pipeline',
  },
  {
    id: 'n8n',
    name: 'n8n Pipeline Webhook',
    description: 'Video pipeline orchestration — triggers generation workflow and receives status callbacks',
    envKeys: ['N8N_WEBHOOK_SECRET', 'N8N_VIDEO_PIPELINE_WEBHOOK'],
    docsUrl: null,
    phase: 'Video Pipeline',
  },
  {
    id: 'youtube',
    name: 'YouTube Data API',
    description: 'Final video distribution, metadata management and public publishing',
    envKeys: ['YOUTUBE_API_KEY'],
    docsUrl: 'https://console.cloud.google.com',
    phase: 'Distribution',
  },
];

function getStatus(envKeys: string[]): { configured: boolean; partial: boolean } {
  const values = envKeys.map(k => process.env[k]);
  const configured = values.every(v => v && v.length > 0);
  const partial = !configured && values.some(v => v && v.length > 0);
  return { configured, partial };
}

export default function IntegrationsPage() {
  const phases = [...new Set(INTEGRATIONS.map(i => i.phase))];
  const configuredCount = INTEGRATIONS.filter(i => getStatus(i.envKeys).configured).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-xl text-white-0 mb-1">Integrations</h1>
        <p className="text-sm text-slate-6">
          {configuredCount} of {INTEGRATIONS.length} configured
          <span className="ml-3 text-xs text-slate-6">
            Keys stored in <code className="text-brand-cyan">.env.local</code> — update Vercel env vars for production
          </span>
        </p>
      </div>

      {phases.map(phase => (
        <div key={phase} className="mb-8">
          <h2 className="text-xs font-semibold text-slate-6 uppercase tracking-wide mb-3">{phase}</h2>
          <div className="panel-card divide-y divide-border-subtle">
            {INTEGRATIONS.filter(i => i.phase === phase).map(integration => {
              const { configured, partial } = getStatus(integration.envKeys);
              return (
                <div key={integration.id} className="flex items-start gap-4 px-5 py-5">
                  {/* Status icon */}
                  <div className="mt-0.5 flex-shrink-0">
                    {configured ? (
                      <CheckCircle size={16} className="text-semantic-success" />
                    ) : (
                      <XCircle size={16} className={partial ? 'text-semantic-warning' : 'text-slate-6'} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white-0">{integration.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        configured
                          ? 'text-semantic-success bg-green-900/20'
                          : partial
                          ? 'text-semantic-warning bg-yellow-900/20'
                          : 'text-slate-6 bg-slate-4'
                      }`}>
                        {configured ? 'Configured' : partial ? 'Partial' : 'Not configured'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-6 mb-2">{integration.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.envKeys.map(key => {
                        const val = process.env[key];
                        const isSet = val && val.length > 0;
                        return (
                          <div key={key} className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isSet ? 'bg-semantic-success' : 'bg-slate-6'}`} />
                            <code className="text-xs text-slate-6 font-mono">{key}</code>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {integration.docsUrl && (
                    <a
                      href={integration.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-6 hover:text-brand-cyan transition-colors flex items-center gap-1 flex-shrink-0 mt-0.5"
                    >
                      Docs <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="panel-card p-5 border-brand-cyan/20" style={{ borderColor: 'rgba(0,217,255,0.15)' }}>
        <p className="text-xs font-semibold text-brand-cyan mb-1">Production deployment</p>
        <p className="text-sm text-slate-6">
          Set these as environment variables in your Vercel project settings.
          Never commit API keys to source control.
        </p>
      </div>
    </div>
  );
}
