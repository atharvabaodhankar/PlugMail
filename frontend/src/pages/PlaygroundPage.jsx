import { useState, useEffect } from 'react'
import { API_URL } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import Input from '../components/ui/Input'
import Toast from '../components/ui/Toast'
import CodeSnippets from '../components/ui/CodeSnippets'

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
        const keysRes = await fetch(`${API_URL}/keys`, { headers })
        if (keysRes.ok) {
          const ks = await keysRes.json()
          const activeKeys = ks.filter(k => k.active)
          setKeys(activeKeys)
          if (activeKeys.length > 0) setSelectedKey(activeKeys[0].key) // Use real key for snippets
        }

        // Fetch Templates
        const tplRes = await fetch(`${API_URL}/templates`, { headers })
        if (tplRes.ok) {
          const ts = await tplRes.json()
          setTemplates(ts)
          if (ts.length > 0) setSelectedTemplate(ts[0].name)
        }

        // Fetch Accounts (just to warn if none)
        const accRes = await fetch(`${API_URL}/accounts`, { headers })
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
      const token = await getIdToken()
      const res = await fetch(`${API_URL}/send/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#374151]">API Key (x-api-key)</label>
                <select
                  className="w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] appearance-none"
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                >
                  <option value="" disabled>-- Select an API Key --</option>
                  {keys.map(k => (
                    <option key={k.id} value={k.key || ''}>
                      {k.name} {k.key ? `(${k.maskedKey})` : `(Legacy - Masked)`}
                    </option>
                  ))}
                </select>
                {!selectedKey && keys.length > 0 && (
                  <p className="text-[11px] text-[#F59E0B] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Legacy key selected. Create a new key to see it unmasked in snippets.
                  </p>
                )}
                <p className="text-[11px] text-[#6B7280]">
                  Select an active key to update the code snippets below.
                </p>
              </div>

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
            <div className="p-6 h-[400px]">
              <CodeSnippets 
                apiKey={selectedKey || 'pk_live_YOUR_API_KEY'} 
                toEmail={toEmail} 
                templateName={selectedTemplate} 
                variablesText={variablesText} 
              />
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
