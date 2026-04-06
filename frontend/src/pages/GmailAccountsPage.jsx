import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Toast from '../components/ui/Toast'

export default function GmailAccountsPage() {
  const { getIdToken } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const fetchAccounts = async () => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/accounts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to fetch accounts')
      const data = await res.json()
      setAccounts(data)
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to load Gmail accounts.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const addAccount = async () => {
    if (!formData.email.trim() || !formData.password.trim()) return
    setIsSubmitting(true)
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email.trim(), password: formData.password.trim() })
      })
      if (!res.ok) throw new Error('Failed to add account')
      const newAccount = await res.json()
      
      setAccounts(prev => [...prev, newAccount])
      setModalOpen(false)
      setFormData({ email: '', password: '' })
      setToast({ type: 'success', title: 'Account connected', body: `${newAccount.email} is ready for sending.` })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to add Gmail account.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeAccount = async (id) => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/accounts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to remove account')
      
      setAccounts(prev => prev.filter(a => a.id !== id))
      setToast({ type: 'success', title: 'Account removed', body: 'The account was successfully removed.' })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to remove account.' })
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Gmail Accounts</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Connect the Gmail accounts you want to send emails from.
          </p>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => setModalOpen(true)}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          Connect Account
        </button>
      </div>

      <Card>
        <CardHeader
          title="Connected Accounts"
          subtitle={loading ? 'Loading...' : `${accounts.length} account${accounts.length !== 1 ? 's' : ''}`}
        />
        {loading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" /></div>
        ) : accounts.length === 0 ? (
          <EmptyState
            icon="mail"
            title="No accounts connected"
            body="You need to connect at least one Gmail account to send emails via the API."
            action={
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                <span className="material-symbols-outlined text-[18px]">add</span>
                Connect Account
              </button>
            }
          />
        ) : (
          <div>
            {accounts.map((acc, i) => (
              <div
                key={acc.id}
                className="flex flex-wrap items-center gap-4 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100 px-6"
                style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-body font-medium text-[#111827]">{acc.email}</p>
                      {acc.isDefault && <Badge status="active" label="Default" />}
                    </div>
                    <p className="text-xs font-body text-[#6B7280] mt-0.5">
                      Connected {new Date(acc.connected).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button 
                  className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors"
                  onClick={() => removeAccount(acc.id)}
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => !isSubmitting && setModalOpen(false)}
        title="Connect Gmail Account"
        subtitle="You need to use a Google App Password, not your regular password."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)} disabled={isSubmitting}>Cancel</button>
            <button className="btn-primary" onClick={addAccount} disabled={!formData.email.trim() || !formData.password.trim() || isSubmitting}>
              {isSubmitting ? 'Connecting...' : 'Connect'}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Gmail Address"
            placeholder="you@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="email"
          />
          <Input
            label="App Password"
            placeholder="16-character app password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            helper="We encrypt this heavily before storing it. It is never stored in plain text."
          />
          <div className="mt-2 bg-[#F3F4F6] p-3 rounded text-xs text-[#4B5563] border border-[#E5E7EB]">
            <strong>How to get an App Password:</strong>
            <ol className="list-decimal pl-4 mt-1 space-y-1">
              <li>Go to your Google Account settings</li>
              <li>Ensure 2-Step Verification is enabled</li>
              <li>Search for "App Passwords"</li>
              <li>Create one for "Mail" / "Other"</li>
              <li>Paste the 16-character code here</li>
            </ol>
          </div>
        </div>
      </Modal>
    </div>
  )
}
