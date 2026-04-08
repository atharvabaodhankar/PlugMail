import { useState } from 'react'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Toast from '../components/ui/Toast'
import EmptyState from '../components/ui/EmptyState'

const CATEGORIES = ['All', 'Welcome', 'OTP', 'Password Reset', 'Notification', 'Order', 'Newsletter']

const PREMADE = [
  { id: 'p1', name: 'Welcome Email',      category: 'Welcome',        subject: 'Welcome to {{appName}}, {{name}}!',    vars: ['name', 'appName'] },
  { id: 'p2', name: 'OTP Verification',   category: 'OTP',            subject: 'Your verification code: {{otp}}',      vars: ['otp', 'expiry'] },
  { id: 'p3', name: 'Password Reset',     category: 'Password Reset', subject: 'Reset your {{appName}} password',      vars: ['name', 'link', 'appName'] },
  { id: 'p4', name: 'Order Confirmation', category: 'Order',          subject: 'Order #{{orderId}} confirmed!',         vars: ['orderId', 'total'] },
  { id: 'p5', name: 'Security Alert',     category: 'Notification',   subject: 'New login detected on your account',   vars: ['ip', 'location', 'time'] },
  { id: 'p6', name: 'Newsletter',         category: 'Newsletter',     subject: '{{month}} Update — {{appName}}',       vars: ['month', 'appName'] },
]

const INITIAL_MY = [
  { id: 'm1', name: 'Waitlist Invite',    category: 'Welcome',        subject: 'You\'re in, {{name}}! 🎉',              vars: ['name'] },
]

function TemplateCategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-xs font-body font-medium transition-all duration-150 ${
        active
          ? 'bg-[#0A84FF] text-white shadow-[0_4px_14px_rgba(10,132,255,0.25)]'
          : 'bg-white border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB]'
      }`}
    >
      {label}
    </button>
  )
}

function TemplateCard({ tpl, onUse, onEdit, onDelete, showDelete }) {
  return (
    <div className="card flex flex-col">
      <div className="px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 bg-[#EBF4FF] border border-[#BAD8FF] text-[#0A84FF] text-[10px] font-body font-semibold tracking-[0.1em] uppercase rounded-full">
            {tpl.category}
          </span>
        </div>
        <h3 className="font-display font-semibold text-[#111827] text-sm">{tpl.name}</h3>
        <p className="text-xs font-body text-[#6B7280] mt-1 leading-relaxed truncate">{tpl.subject}</p>
      </div>
      <div className="px-5 py-3 flex items-center gap-2 mt-auto">
        <button className="btn-primary text-xs px-3 py-1.5" onClick={() => onUse(tpl)}>
          <span className="material-symbols-outlined text-[14px]">send</span>
          Use
        </button>
        <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => onEdit(tpl)}>
          <span className="material-symbols-outlined text-[14px]">edit</span>
          Edit
        </button>
        {showDelete && (
          <button className="btn-danger text-xs px-3 py-1.5 ml-auto" onClick={() => onDelete(tpl.id)}>
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const [tab, setTab]           = useState('my')
  const [catFilter, setCatFilter] = useState('All')
  const [myTemplates, setMyTemplates] = useState(INITIAL_MY)
  const [toast, setToast]       = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm]         = useState({ name: '', subject: '', category: 'Welcome' })

  const filtered = (tab === 'premade' ? PREMADE : myTemplates).filter(
    (t) => catFilter === 'All' || t.category === catFilter
  )

  const deleteTemplate = (id) => {
    setMyTemplates((prev) => prev.filter((t) => t.id !== id))
    setToast({ type: 'warning', title: 'Template deleted' })
  }

  const createTemplate = () => {
    if (!form.name.trim()) return
    setMyTemplates((prev) => [...prev, {
      id: 'm' + Date.now(),
      name: form.name.trim(),
      subject: form.subject.trim() || '(no subject)',
      category: form.category,
      vars: [],
    }])
    setCreateOpen(false)
    setForm({ name: '', subject: '', category: 'Welcome' })
    setToast({ type: 'success', title: 'Template created', body: `"${form.name}" is ready to use.` })
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Templates</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Create reusable email templates with dynamic variables.
          </p>
        </div>
        {tab === 'my' && (
          <button className="btn-primary flex-shrink-0" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Template
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E5E7EB] pb-0">
        {['my', 'premade'].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setCatFilter('All') }}
            className={`px-4 py-2.5 text-sm font-body font-medium transition-all duration-150 border-b-2 -mb-px ${
              tab === t
                ? 'border-[#0A84FF] text-[#0A84FF]'
                : 'border-transparent text-[#6B7280] hover:text-[#374151]'
            }`}
          >
            {t === 'my' ? 'My Templates' : 'Premade'}
          </button>
        ))}
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <TemplateCategoryChip
            key={cat}
            label={cat}
            active={catFilter === cat}
            onClick={() => setCatFilter(cat)}
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="description"
          title="No templates found"
          body={tab === 'my' ? 'Create your first template to get started.' : 'No premade templates in this category.'}
          action={tab === 'my' && (
            <button className="btn-primary" onClick={() => setCreateOpen(true)}>
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Template
            </button>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tpl, i) => (
            <div key={tpl.id}
              style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}>
              <TemplateCard
                tpl={tpl}
                showDelete={tab === 'my'}
                onUse={() => setToast({ type: 'success', title: `Using "${tpl.name}"`, body: 'Go to Playground to send a test.' })}
                onEdit={() => setToast({ type: 'info', title: 'Template editor', body: 'Full editor coming soon.' })}
                onDelete={deleteTemplate}
              />
            </div>
          ))}
        </div>
      )}

      <Modal
        open={createOpen}
        onClose={() => { setCreateOpen(false); setForm({ name: '', subject: '', category: 'Welcome' }) }}
        title="New Template"
        subtitle="Create a reusable email template."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setCreateOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={createTemplate} disabled={!form.name.trim()}>
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Template Name" placeholder="e.g. Welcome Email" value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} autoFocus />
          <Input label="Subject Line" placeholder="e.g. Welcome, {{name}}!" value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            helper="Use {{variable}} for dynamic values." />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-body font-medium text-[#374151]">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded text-sm font-body text-[#111827] focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20 transition-all duration-150"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
