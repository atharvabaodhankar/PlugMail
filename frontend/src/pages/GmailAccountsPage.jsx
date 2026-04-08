import { useState } from 'react'
import Card, { CardHeader } from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Toast from '../components/ui/Toast'
import EmptyState from '../components/ui/EmptyState'

const INITIAL_ACCOUNTS = [
  { id: 1, email: 'atharva@gmail.com',    isDefault: true,  connected: 'May 1, 2025'  },
  { id: 2, email: 'plugmail.dev@gmail.com', isDefault: false, connected: 'Apr 20, 2025' },
]

function Avatar({ email }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-sm font-display font-bold uppercase">
        {email[0]}
      </span>
    </div>
  )
}

export default function GmailAccountsPage() {
  const [accounts, setAccounts]   = useState(INITIAL_ACCOUNTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast]         = useState(null)
  const [form, setForm]           = useState({ email: '', password: '' })
  const [showPass, setShowPass]   = useState(false)

  const addAccount = () => {
    if (!form.email.trim() || !form.password.trim()) return
    const newAccount = {
      id: Date.now(),
      email: form.email.trim(),
      isDefault: accounts.length === 0,
      connected: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setAccounts((prev) => [...prev, newAccount])
    setModalOpen(false)
    setForm({ email: '', password: '' })
    setToast({ type: 'success', title: 'Gmail account connected', body: `${newAccount.email} is now active.` })
  }

  const removeAccount = (id) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id))
    setToast({ type: 'info', title: 'Account removed', body: 'Gmail account disconnected successfully.' })
  }

  const setDefault = (id) => {
    setAccounts((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Encryption info banner */}
      <div className="flex items-start gap-3 px-4 py-3 bg-[#EBF4FF] border border-[#BAD8FF] rounded-lg">
        <span className="material-symbols-outlined text-[20px] text-[#0A84FF] flex-shrink-0 mt-0.5"
          style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
        <div>
          <p className="text-sm font-body font-medium text-[#1E40AF]">AES-256 encrypted storage</p>
          <p className="text-xs font-body text-[#0A84FF] mt-0.5">
            Your Gmail App Passwords are encrypted at rest. We never store plaintext credentials.
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Gmail Accounts</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Connect Gmail accounts to send emails on your behalf.
          </p>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => setModalOpen(true)}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Account
        </button>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <EmptyState
            icon="alternate_email"
            title="No Gmail accounts connected"
            body="Connect a Gmail account with an App Password to start sending emails."
            action={
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Gmail Account
              </button>
            }
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {accounts.map((account, i) => (
            <Card key={account.id}
              className="animate-reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="px-6 py-4 flex items-center gap-4">
                <Avatar email={account.email} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-body font-medium text-[#111827]">{account.email}</p>
                    {account.isDefault && (
                      <span className="px-2 py-0.5 bg-[#EBF4FF] border border-[#BAD8FF] text-[#0A84FF] text-[10px] font-body font-semibold tracking-[0.1em] uppercase rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-body text-[#6B7280] mt-0.5">Connected {account.connected}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!account.isDefault && (
                    <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => setDefault(account.id)}>
                      Set Default
                    </button>
                  )}
                  <button className="btn-danger px-3 py-1.5 text-xs" onClick={() => removeAccount(account.id)}>
                    <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setForm({ email: '', password: '' }) }}
        title="Connect Gmail Account"
        subtitle="Use a Google App Password — not your regular Gmail password."
        footer={
          <>
            <button className="btn-secondary"
              onClick={() => { setModalOpen(false); setForm({ email: '', password: '' }) }}>
              Cancel
            </button>
            <button className="btn-primary" onClick={addAccount}
              disabled={!form.email.trim() || !form.password.trim()}>
              <span className="material-symbols-outlined text-[18px]">link</span>
              Connect
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Gmail Address"
            type="email"
            placeholder="you@gmail.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            autoFocus
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-body font-medium text-[#374151]">App Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="xxxx xxxx xxxx xxxx"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full h-10 px-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-mono text-[#111827] placeholder:text-[#9CA3AF] transition-all duration-150 hover:border-[#9CA3AF] focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                onClick={() => setShowPass((p) => !p)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="text-xs font-body text-[#6B7280]">
              Generate at <span className="text-[#0A84FF]">myaccount.google.com → Security → App Passwords</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
