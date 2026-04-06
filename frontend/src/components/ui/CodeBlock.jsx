import { useState } from 'react'

export default function CodeBlock({ lang = 'Node.js', code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E8F0]">
        <span className="section-label">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-[10px] font-body font-medium text-[#0A84FF] hover:text-[#0071E3] transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#1E293B] m-0">
        <code>{code}</code>
      </pre>
    </div>
  )
}
