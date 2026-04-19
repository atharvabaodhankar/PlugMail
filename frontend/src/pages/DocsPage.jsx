import Card, { CardHeader } from '../components/ui/Card'

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-6 animate-reveal">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Documentation</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Built for developers' convenience. Everything you need to integrate PlugMail.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader title="Open Source" subtitle="Check out the codebase on GitHub" />
          <div className="p-6">
            <p className="text-sm text-[#374151] mb-4 leading-relaxed max-w-2xl">
              PlugMail is fully open source and built with modern web technologies. We believe in transparency and community contributions. 
              Star the repository, open issues, or submit pull requests to help us make email infrastructure easier for developers.
            </p>
            <a 
              href="https://github.com/atharvabaodhankar/plugmail" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E293B] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#0F172A] transition-colors shadow-sm"
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              github.com/atharvabaodhankar/plugmail
            </a>
          </div>
        </Card>
        
        <Card>
           <CardHeader title="API Reference" subtitle="Endpoints and Payloads" />
           <div className="p-6">
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg p-4 flex gap-3">
                <span className="material-symbols-outlined text-[#4F46E5] flex-shrink-0">info</span>
                <p className="text-sm text-[#4338CA] leading-relaxed">
                  The full written documentation is currently being drafted and polished for your convenience. 
                  In the meantime, the easiest way to integrate PlugMail is to use the <strong>Playground</strong> and the <strong>API Snippets</strong> tab inside the Template Editor to get instant, copy-paste ready code tailored to your exact template!
                </p>
              </div>
           </div>
        </Card>
      </div>
    </div>
  )
}
