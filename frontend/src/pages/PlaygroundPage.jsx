import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import Input from '../components/ui/Input'
import Toast from '../components/ui/Toast'

export default function PlaygroundPage() {
  const { getIdToken } = useAuth()
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  // Options
  const [keys, setKeys] = useState([])
  const [templates, setTemplates] = useState([])
  const [accounts, setAccounts] = useState([])

  // Form State
  const [selectedKey, setSelectedKey] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [toEmail, setToEmail] = useState('')
  const [variablesText, setVariablesText] = useState('{\n  "name": "Developer"\n}')

  // Fetch Dropdown Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getIdToken()
        const headers = { 'Authorization': `Bearer ${token}` }

        // Fetch Keys
        const keysRes = await fetch(`${import.meta.env.VITE_API_URL}/keys`, { headers })
        if (keysRes.ok) {
          const ks = await keysRes.json()
          const activeKeys = ks.filter(k => k.active)
          setKeys(activeKeys)
          if (activeKeys.length > 0) setSelectedKey(activeKeys[0].id) // Default to first (just for UI ID, we don't have the raw key)
        }

        // Fetch Templates
        const tplRes = await fetch(`${import.meta.env.VITE_API_URL}/templates`, { headers })
        if (tplRes.ok) {
          const ts = await tplRes.json()
          setTemplates(ts)
          if (ts.length > 0) setSelectedTemplate(ts[0].name)
        }

        // Fetch Accounts (just to warn if none)
        const accRes = await fetch(`${import.meta.env.VITE_API_URL}/accounts`, { headers })
        if (accRes.ok) {
          setAccounts(await accRes.json())
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleTestSend = async () => {
    if (!selectedKey) return setToast({ type: 'warning', title: 'Missing Key', body: 'Please select an API Key.' })
    if (!selectedTemplate) return setToast({ type: 'warning', title: 'Missing Template', body: 'Please select a template.' })
    if (!toEmail.trim()) return setToast({ type: 'warning', title: 'Missing Email', body: 'Please enter a recipient email.' })
    
    let parsedVars = {}
    try {
      if (variablesText.trim()) parsedVars = JSON.parse(variablesText)
    } catch (e) {
      return setToast({ type: 'error', title: 'Invalid JSON', body: 'Variables must be valid JSON format.' })
    }

    setLoading(true)
    try {
      // For the playground, we actually hit the real /api/send endpoint!
      // But wait... the playground only has the *masked* API key. 
      // To truly test the API using x-api-key, the user needs to paste their RAW key.
      // So we must ask the user for their raw key in the playground.
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': selectedKey // The user must PASTE the raw key here!
        },
        body: JSON.stringify({
          to: toEmail,
          template: selectedTemplate,
          variables: parsedVars
        })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setToast({ type: 'success', title: 'Email Sent!', body: `Message ID: ${data.messageId}` })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Test Failed', body: err.message })
    } finally {
      setLoading(false)
    }
  }

  // Preview Logic
  const activeTemplate = templates.find(t => t.name === selectedTemplate)
  let previewHtml = activeTemplate?.html || '<p class="text-gray-400">Select a template to preview...</p>'
  
  try {
    const vars = JSON.parse(variablesText)
    // Very simple regex replacement for preview (Handlebars is used on backend)
    Object.keys(vars).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      previewHtml = previewHtml.replace(regex, vars[key])
    })
  } catch (e) {
    // ignore
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">API Playground</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Test your email templates and API integration directly from the browser.
          </p>
        </div>
      </div>

      {accounts.length === 0 && (
         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2 text-sm font-medium">
            <span className="material-symbols-outlined">warning</span>
            You need to connect a Gmail account before you can send test emails!
         </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Request Setup" />
            <div className="p-6 flex flex-col gap-5 border-b border-[#F3F4F6]">
              
              <Input
                label="Raw API Key (x-api-key)"
                placeholder="pk_live_..."
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                helper="Paste your raw API key here to test the actual endpoint."
                type="password"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#374151]">Template</label>
                <select
                  className="w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] appearance-none"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="" disabled>-- Select a Template --</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <Input
                label="Recipient (To)"
                placeholder="test@example.com"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#374151]">Variables (JSON)</label>
                <textarea
                  className="w-full h-32 resize-none rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] font-mono focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
                  value={variablesText}
                  onChange={(e) => setVariablesText(e.target.value)}
                />
              </div>

            </div>
            <div className="p-4 bg-[#F9FAFB] rounded-b-lg flex justify-end">
              <button 
                className="btn-primary" 
                onClick={handleTestSend} 
                disabled={loading || accounts.length === 0}
              >
                {loading ? 'Sending...' : 'Send Test Email'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Code Snippets" subtitle="How to integrate in your app" />
            <div className="p-6">
              <div className="bg-[#1E293B] rounded-md overflow-hidden">
                <div className="flex px-4 py-2 border-b border-[#334155] gap-4">
                  <button className="text-sm font-mono text-[#38BDF8]">Node.js</button>
                  <button className="text-sm font-mono text-[#94A3B8] hover:text-[#CBD5E1]">cURL</button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm text-[#E2E8F0] font-mono leading-relaxed">
                    <code dangerouslySetInnerHTML={{ __html: `const response = await fetch('https://api.plugmail.com/send', {
  method: 'POST',
  headers: {
    'x-api-key': '${selectedKey || 'pk_live_YOUR_KEY'}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '${toEmail || 'user@example.com'}',
    template: '${selectedTemplate || 'welcome'}',
    variables: ${variablesText.replace(/\n/g, '\n    ')}
  })
});`}} />
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="flex flex-col gap-6">
          <Card className="h-full flex flex-col min-h-[600px]">
            <CardHeader title="Live Preview" subtitle="How the recipient sees it" />
            <div className="flex-1 bg-[#F3F4F6] p-6 border-b border-[#E5E7EB]">
              {/* Fake Email Client UI */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col border border-[#E5E7EB]">
                <div className="border-b border-[#E5E7EB] p-4 bg-[#F9FAFB]">
                  <p className="text-sm font-medium text-[#111827] mb-1">
                    Subject: <span className="font-normal">{activeTemplate?.subject || '...'}</span>
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    To: {toEmail || '...'}
                  </p>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                  <iframe 
                    title="Email Preview"
                    className="w-full h-full border-none bg-white rounded-b-lg"
                    srcDoc={previewHtml}
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
