import { useState } from 'react'
import Toast from '../components/ui/Toast'

const TEMPLATES = ['welcome', 'otp', 'password-reset', 'order-confirm', 'security-alert']

const PREVIEWS = {
  welcome: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
  <div style="width:40px;height:40px;background:linear-gradient(135deg,#0A84FF,#5E5CE6);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:24px">
    <span style="color:white;font-weight:700;font-size:18px">P</span>
  </div>
  <h1 style="font-size:24px;font-weight:600;color:#111827;margin:0 0 8px">Welcome to {{appName}}, {{name}}! 🎉</h1>
  <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px">
    We're excited to have you on board. Your account is ready — let's build something great.
  </p>
  <a href="#" style="display:inline-block;background:#0A84FF;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px">Get Started →</a>
</div>`,
  otp: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
  <h1 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px">Verification Code</h1>
  <p style="color:#374151;font-size:15px;margin:0 0 24px">Use the code below to verify your identity. It expires in {{expiry}} minutes.</p>
  <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px">
    <span style="font-family:monospace;font-size:36px;font-weight:700;color:#111827;letter-spacing:8px">{{otp}}</span>
  </div>
  <p style="color:#9CA3AF;font-size:13px">If you didn't request this, ignore this email.</p>
</div>`,
}

const DEFAULT_VARS = {
  welcome: JSON.stringify({ name: 'Atharva', appName: 'MyApp' }, null, 2),
  otp:     JSON.stringify({ otp: '482916', expiry: '10' }, null, 2),
}

function renderTemplate(html, vars) {
  try {
    const parsed = JSON.parse(vars)
    return html.replace(/\{\{(\w+)\}\}/g, (_, key) => parsed[key] ?? `{{${key}}}`)
  } catch {
    return html
  }
}

export default function PlaygroundPage() {
  const [template, setTemplate]   = useState('welcome')
  const [vars, setVars]           = useState(DEFAULT_VARS.welcome ?? '{}')
  const [toast, setToast]         = useState(null)
  const [sending, setSending]     = useState(false)
  const [toEmail, setToEmail]     = useState('')

  const preview = PREVIEWS[template]
    ? renderTemplate(PREVIEWS[template], vars)
    : '<p style="color:#9CA3AF;padding:32px;text-align:center">No preview available for this template.</p>'

  const handleTemplateChange = (t) => {
    setTemplate(t)
    setVars(DEFAULT_VARS[t] ?? '{}')
  }

  const sendTest = () => {
    if (!toEmail.trim()) {
      setToast({ type: 'error', title: 'Recipient required', body: 'Enter a "To" email address.' })
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setToast({ type: 'success', title: 'Test email sent!', body: `Delivered to ${toEmail}` })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div>
        <h2 className="font-display font-semibold text-[#111827] text-2xl">Playground</h2>
        <p className="text-sm font-body text-[#6B7280] mt-1">
          Test your email templates before deploying to production.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — editor panel */}
        <div className="flex flex-col gap-4">
          <div className="card">
            <div className="px-6 py-4 border-b border-[#E5E7EB]">
              <h3 className="font-display font-semibold text-[#111827] text-base">Configuration</h3>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Template selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-body font-medium text-[#374151]">Template</label>
                <select
                  value={template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded text-sm font-body text-[#111827] focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20 transition-all"
                >
                  {TEMPLATES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* To email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-body font-medium text-[#374151]">Send To</label>
                <input
                  type="email"
                  placeholder="test@example.com"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded text-sm font-body text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20 transition-all duration-150"
                />
              </div>

              {/* Variables JSON */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-body font-medium text-[#374151]">Variables (JSON)</label>
                <textarea
                  value={vars}
                  onChange={(e) => setVars(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded font-mono text-xs text-[#1E293B] focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20 transition-all duration-150 resize-none"
                  spellCheck={false}
                />
                <p className="text-xs font-body text-[#6B7280]">
                  These replace <code className="font-mono text-[#0A84FF]">{'{{variable}}'}</code> in your template.
                </p>
              </div>

              <button
                className="btn-primary w-full justify-center"
                onClick={sendTest}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Send Test Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right — preview panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="section-label">Email Preview</p>
          </div>
          <div className="card flex-1 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#E5E7EB] flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FECACA]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FDE68A]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#BBF7D0]" />
              </div>
              <span className="text-xs font-body text-[#9CA3AF] ml-2">Preview</span>
            </div>
            <iframe
              srcDoc={preview}
              title="Email Preview"
              className="w-full border-0 bg-white"
              style={{ height: '480px' }}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
