import { useState } from 'react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Toast from '../components/ui/Toast'

const INITIAL_KEYS = [
  { id: 1, name: 'Production Key', key: 'pk_live_aZ3xQ8mN1pWr5tYk', status: 'active',  created: 'May 1, 2025'  },
  { id: 2, name: 'Staging Key',    key: 'pk_live_bK7wL2vD9nFj4sUe', status: 'active',  created: 'Apr 22, 2025' },
  { id: 3, name: 'Dev / Testing',  key: 'pk_live_cR4hG5oP0qMx6iAy', status: 'revoked', created: 'Apr 10, 2025' },
]

function maskKey(key) {
  return key.slice(0, 12) + '••••••••' + key.slice(-4)
}

export default function ApiKeysPage() {
  const [keys, setKeys]           = useState(INITIAL_KEYS)
  const [modalOpen, setModalOpen] = useState(false)
  const [keyName, setKeyName]     = useState('')
  const [toast, setToast]         = useState(null)
  const [revealed, setRevealed]   = useState({})
  const [copiedId, setCopiedId]   = useState(null)

  const createKey = () => {
    if (!keyName.trim()) return
    const newKey = {
      id: Date.now(),
      name: keyName.trim(),
      key: 'pk_live_' + Math.random().toString(36).slice(2, 18),
      status: 'active',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setKeys((prev) => [newKey, ...prev])
    setModalOpen(false)
    setKeyName('')
    setToast({ type: 'success', title: 'API key created', body: `"${newKey.name}" is ready to use.` })
  }

  const revokeKey = (id) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: 'revoked' } : k))
    setToast({ type: 'warning', title: 'API key revoked', body: 'This key can no longer be used.' })
  }

  const copyKey = (key, id) => {
    navigator.clipboard.writeText(key)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const activeKeys = keys.filter((k) => k.status !== 'revoked')

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">API Keys</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Manage your access tokens. Keep them secret.
          </p>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => setModalOpen(true)}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create Key
        </button>
      </div>

      <Card>
        <CardHeader
          title="Your API Keys"
          subtitle={`${activeKeys.length} active key${activeKeys.length !== 1 ? 's' : ''}`}
        />
        {keys.length === 0 ? (
          <EmptyState
            icon="vpn_key"
            title="No API keys yet"
            body="Create your first API key to start sending emails from your apps."
            action={
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                <span className="material-symbols-outlined text-[18px]">add</span>
                Create API Key
              </button>
            }
          />
        ) : (
          <div>
            {keys.map((k, i) => (
              <div
                key={k.id}
                className="flex flex-wrap items-center gap-4 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100 px-6"
                style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-[#111827]">{k.name}</p>
                  <p className="text-xs font-body text-[#6B7280] mt-0.5">Created {k.created}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded px-3 py-1.5">
                  <code className="font-mono text-xs text-[#1E293B] tracking-wide">
                    {revealed[k.id] ? k.key : maskKey(k.key)}
                  </code>
                  <button className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                    onClick={() => setRevealed((p) => ({ ...p, [k.id]: !p[k.id] }))}>
                    <span className="material-symbols-outlined text-[16px]">
                      {revealed[k.id] ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                  <button className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                    onClick={() => copyKey(k.key, k.id)}>
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedId === k.id ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <Badge status={k.status} />
                {k.status === 'active' && (
                  <button className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors"
                    onClick={() => revokeKey(k.id)}>
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setKeyName('') }}
        title="Create API Key"
        subtitle="Give it a descriptive name to identify it later."
        footer={
          <>
            <button className="btn-secondary" onClick={() => { setModalOpen(false); setKeyName('') }}>Cancel</button>
            <button className="btn-primary" onClick={createKey} disabled={!keyName.trim()}>
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Key
            </button>
          </>
        }
      >
        <Input
          label="Key Name"
          placeholder="e.g. Production, Staging, Dev"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createKey()}
          autoFocus
          helper="Only you can see this name. The key itself is auto-generated."
        />
      </Modal>
    </div>
  )
}
