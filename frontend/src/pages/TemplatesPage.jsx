import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Toast from '../components/ui/Toast'
import { defaultTemplates } from '../utils/defaultTemplates'

export default function TemplatesPage() {
  const { getIdToken } = useAuth()
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subject: '',
    html: ''
  })

  const fetchTemplates = async () => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to fetch templates')
      const data = await res.json()
      setTemplates(data)
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to load templates.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const createTemplate = async () => {
    if (!formData.name.trim()) return
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Failed to create template')
      const newTemplate = await res.json()
      
      setTemplates(prev => [newTemplate, ...prev])
      setModalOpen(false)
      setFormData({ name: '', category: '', subject: '', html: '' })
      setToast({ type: 'success', title: 'Template created', body: `"${newTemplate.name}" was saved successfully.` })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to save template.' })
    }
  }

  const loadDefaultTemplates = async () => {
    setLoading(true);
    try {
      const token = await getIdToken();
      let newTemplates = [];
      for (const tpl of defaultTemplates) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tpl)
        });
        if (res.ok) {
          const newTpl = await res.json();
          newTemplates.push(newTpl);
        }
      }
      setTemplates(prev => [...newTemplates, ...prev]);
      setToast({ type: 'success', title: 'Templates Loaded', body: `Successfully loaded ${newTemplates.length} default templates.` });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', title: 'Error', body: 'Failed to load default templates.' });
    } finally {
      setLoading(false);
    }
  }

  const deleteTemplate = async (id) => {
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/templates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete template')
      
      setTemplates(prev => prev.filter(t => t.id !== id))
      setToast({ type: 'success', title: 'Template deleted', body: 'The template was successfully removed.' })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to delete template.' })
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Email Templates</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Create reusable HTML email templates with variables.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button className="btn-secondary flex items-center gap-2 px-4 py-2 bg-white border border-[#D1D5DB] text-[#374151] rounded-md text-sm font-medium hover:bg-[#F9FAFB] transition-colors" onClick={loadDefaultTemplates}>
            <span className="material-symbols-outlined text-[18px]">download</span>
            Load Defaults
          </button>
          <button className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors" onClick={() => setModalOpen(true)}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" /></div>
        ) : templates.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <EmptyState
                icon="description"
                title="No templates yet"
                body="Design your first HTML email template and use {{variables}} to personalize it."
                action={
                  <div className="flex gap-3 mt-4">
                    <button className="btn-secondary flex items-center gap-2 px-4 py-2 bg-white border border-[#D1D5DB] text-[#374151] rounded-md text-sm font-medium hover:bg-[#F9FAFB] transition-colors" onClick={loadDefaultTemplates}>
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Load Defaults
                    </button>
                    <button className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors" onClick={() => setModalOpen(true)}>
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Create Template
                    </button>
                  </div>
                }
              />
            </Card>
          </div>
        ) : (
          templates.map((tpl, i) => (
            <Card key={tpl.id} className="flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer group" style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">
                    {tpl.category || 'General'}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[#9CA3AF] hover:text-[#DC2626] p-1 transition-colors" onClick={(e) => { e.stopPropagation(); deleteTemplate(tpl.id); }}>
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
                <h3 className="text-[#111827] font-display font-semibold text-lg leading-tight mb-1">{tpl.name}</h3>
                <p className="text-[#6B7280] font-body text-sm flex-1 truncate">Subject: {tpl.subject || 'No Subject'}</p>
                <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex flex-wrap gap-2">
                  {(tpl.vars || []).length === 0 ? (
                    <span className="text-xs text-[#9CA3AF] italic">No variables</span>
                  ) : (
                    tpl.vars.map(v => (
                      <span key={v} className="bg-[#F3F4F6] text-[#4B5563] text-xs px-2 py-1 rounded border border-[#E5E7EB] font-mono">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Template"
        subtitle="Use {{variable_name}} to inject data dynamically."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={createTemplate} disabled={!formData.name.trim()}>
              Save Template
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Template Name" placeholder="e.g. Welcome Email" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} autoFocus />
          <Input label="Category (optional)" placeholder="e.g. Onboarding, Receipts" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          <Input label="Subject Line" placeholder="Welcome {{name}}!" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#374151]">HTML Body</label>
            <textarea 
              className="w-full h-40 resize-y rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] font-mono focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] placeholder:text-[#9CA3AF] transition-shadow duration-200"
              placeholder="<h1>Hi {{name}}</h1><p>Welcome to our platform!</p>"
              value={formData.html}
              onChange={(e) => setFormData({ ...formData, html: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
