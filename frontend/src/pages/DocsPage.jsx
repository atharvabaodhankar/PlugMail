import Card, { CardHeader, CardBody } from '../components/ui/Card'
import CodeBlock from '../components/ui/CodeBlock'
import { API_URL } from '../lib/api'

export default function DocsPage() {
  const baseUrl = API_URL

  return (
    <div className="flex flex-col gap-10 animate-reveal pb-20">
      {/* Header */}
      <div>
        <h2 className="font-display font-semibold text-[#111827] text-3xl">Documentation</h2>
        <p className="text-[#6B7280] font-body mt-2 text-lg">
          Everything you need to integrate professional email delivery into your application.
        </p>
      </div>

      {/* Getting Started */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-display font-semibold text-[#111827]">Getting Started</h3>
          <p className="text-sm text-[#4B5563] font-body">
            PlugMail is a developer-first email infrastructure that allows you to send beautiful, templated emails using your own Gmail account as the provider. No complex SMTP setup required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: '1. Connect Account', desc: 'Link your Gmail account securely via the Gmail Accounts tab.' },
            { title: '2. Create Template', desc: 'Design your email using our template editor and Handlebars.' },
            { title: '3. Generate API Key', desc: 'Create a production API key to authorize your requests.' },
          ].map((step, i) => (
            <div key={i} className="p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#EBF4FF] text-[#0A84FF] flex items-center justify-center text-sm font-bold mb-3">
                {i + 1}
              </div>
              <h4 className="text-sm font-semibold text-[#111827] mb-1">{step.title}</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed font-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authentication */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-display font-semibold text-[#111827]">Authentication</h3>
        <p className="text-sm text-[#4B5563] font-body">
          All API requests must be authenticated using the <code className="bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#EF4444] font-mono text-xs">x-api-key</code> header. You can manage your keys in the <a href="/api-keys" className="text-[#0A84FF] hover:underline">API Keys</a> section.
        </p>
        <div className="bg-[#1E293B] rounded-lg p-4 font-mono text-xs text-white">
          <span className="text-[#94A3B8]"># Header format</span><br/>
          x-api-key: pk_live_your_actual_api_key_here
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-display font-semibold text-[#111827]">API Reference</h3>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#10B981] text-white text-[10px] font-bold rounded uppercase">POST</span>
            <code className="text-sm font-mono text-[#374151] font-semibold">{baseUrl}/send</code>
          </div>
        </div>

        <Card>
          <CardBody>
            <div className="flex flex-col gap-8">
              {/* Body Params */}
              <div>
                <h4 className="section-label mb-4">Request Body</h4>
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'to', type: 'string', req: true, desc: 'The recipient email address.' },
                    { name: 'template', type: 'string', req: true, desc: 'The name of the template you created in the dashboard.' },
                    { name: 'variables', type: 'object', req: false, desc: 'Key-value pairs to populate the Handlebars placeholders in your template.' },
                    { name: 'subject', type: 'string', req: false, desc: 'Override the default subject line defined in the template.' },
                  ].map((param) => (
                    <div key={param.name} className="flex flex-col gap-1 pb-4 border-b border-[#F3F4F6] last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#111827]">{param.name}</span>
                        <span className="text-[10px] bg-[#F3F4F6] text-[#6B7280] px-1.5 py-0.5 rounded uppercase font-bold">{param.type}</span>
                        {param.req && <span className="text-[10px] text-[#EF4444] font-bold uppercase">Required</span>}
                      </div>
                      <p className="text-sm text-[#6B7280] font-body">{param.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div>
                <h4 className="section-label mb-4">Example Implementation</h4>
                <CodeBlock 
                  lang="Node.js" 
                  code={`const response = await fetch("${baseUrl}/send", {
  method: "POST",
  headers: {
    "x-api-key": "your_api_key",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    to: "customer@example.com",
    template: "welcome-email",
    variables: {
      name: "John Doe",
      plan: "Pro"
    }
  })
});

const data = await response.json();
console.log(data);`} 
                />
              </div>

              {/* Responses */}
              <div>
                <h4 className="section-label mb-4">Response Codes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span className="text-sm font-bold text-[#166534]">200 OK</span>
                    </div>
                    <p className="text-xs text-[#166534] font-body">Email successfully queued for delivery.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span className="text-sm font-bold text-[#991B1B]">401 Unauthorized</span>
                    </div>
                    <p className="text-xs text-[#991B1B] font-body">Invalid or missing API key.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#FEF3C7]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                      <span className="text-sm font-bold text-[#92400E]">400 Bad Request</span>
                    </div>
                    <p className="text-xs text-[#92400E] font-body">Missing required fields (to, template) or invalid JSON.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span className="text-sm font-bold text-[#991B1B]">404 Not Found</span>
                    </div>
                    <p className="text-xs text-[#991B1B] font-body">Template not found for the current user.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* GitHub Section */}
      <section className="flex flex-col gap-4 mt-4">
        <h3 className="text-xl font-display font-semibold text-[#111827]">Community & Open Source</h3>
        <p className="text-sm text-[#4B5563] font-body leading-relaxed max-w-2xl">
          PlugMail is fully open source. We encourage you to explore the source code, suggest features, and contribute to making email infrastructure more accessible for everyone.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/atharvabaodhankar/plugmail" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1E293B] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0F172A] transition-all shadow-sm active:scale-95"
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            View on GitHub
          </a>
          <span className="text-xs text-[#94A3B8] font-medium font-body">MIT Licensed</span>
        </div>
      </section>
    </div>
  )
}
