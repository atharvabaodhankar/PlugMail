import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Toast from '../components/ui/Toast'

export default function ApiKeysPage() {
  const { getIdToken } = useAuth()
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [toast, setToast] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [newRawKey, setNewRawKey] = useState(null) // Only shown once!

  const fetchKeys = async () => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/keys`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to fetch keys')
      const data = await res.json()
      setKeys(data)
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to load API keys.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const createKey = async () => {
    if (!keyName.trim()) return
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/keys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: keyName.trim() })
      })
      if (!res.ok) throw new Error('Failed to create key')
      const data = await res.json()
      
      // Update local state
      setKeys(prev => [data, ...prev])
      setModalOpen(false)
      setKeyName('')
      setNewRawKey(data.key) // Store raw key to show user once
      setToast({ type: 'success', title: 'API key created', body: `"${data.name}" is ready to use.` })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to create API key.' })
    }
  }

  const revokeKey = async (id) => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/keys/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to revoke key')
      
      setKeys(prev => prev.map(k => k.id === id ? { ...k, active: false } : k))
      setToast({ type: 'warning', title: 'API key revoked', body: 'This key can no longer be used.' })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to revoke API key.' })
    }
  }

  const copyKey = (keyToCopy, id) => {
    navigator.clipboard.writeText(keyToCopy)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const activeKeys = keys.filter(k => k.active)

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

      {newRawKey && (
        <div className="bg-[#ECFDF5] border border-[#059669] p-4 rounded-lg flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#065F46] font-semibold font-display">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            Important: Save this key now!
          </div>
          <p className="text-sm font-body text-[#065F46]">
            This is the only time you will be able to see the full raw API key. Please copy it and store it safely.
          </p>
          <div className="flex items-center gap-2 bg-white border border-[#34D399] rounded px-3 py-2 mt-1">
            <code className="font-mono text-sm text-[#065F46] flex-1 break-all tracking-wide">{newRawKey}</code>
            <button className="text-[#059669] hover:text-[#047857] transition-colors" onClick={() => copyKey(newRawKey, 'raw')}>
              <span className="material-symbols-outlined text-[18px]">
                {copiedId === 'raw' ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
          <button className="text-sm text-[#059669] font-medium self-start hover:underline mt-1" onClick={() => setNewRawKey(null)}>
            I have copied it
          </button>
        </div>
      )}

      <Card>
        <CardHeader
          title="Your API Keys"
          subtitle={loading ? 'Loading...' : `${activeKeys.length} active key${activeKeys.length !== 1 ? 's' : ''}`}
        />
        {loading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" /></div>
        ) : keys.length === 0 ? (
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
                  <p className="text-xs font-body text-[#6B7280] mt-0.5">
                    Created {new Date(k.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded px-3 py-1.5">
                  <code className="font-mono text-xs text-[#1E293B] tracking-wide">
                    {k.maskedKey || 'pk_live_••••••••••••••••'}
                  </code>
                  <button className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                    onClick={() => copyKey(k.key || k.maskedKey, k.id)}>
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedId === k.id ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <Badge status={k.active ? 'active' : 'revoked'} />
                {k.active && !k.key && (
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider ml-1">Legacy</span>
                )}
                {k.active && (
                  <button className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors"
                    onClick={() => revokeKey(k.id)} title="Revoke Key">
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
