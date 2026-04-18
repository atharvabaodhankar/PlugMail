import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Toast from '../components/ui/Toast'
import CodeSnippets from '../components/ui/CodeSnippets'
import { defaultTemplates } from '../utils/defaultTemplates'

export default function TemplatesPage() {
  const { getIdToken } = useAuth()
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  
  // Editor State
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [editorTab, setEditorTab] = useState('html')

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

  const saveTemplate = async () => {
    if (!editingTemplate.name.trim()) return
    setIsSaving(true)
    try {
      const token = await getIdToken()
      const isNew = !editingTemplate.id
      const url = isNew 
        ? `${import.meta.env.VITE_API_URL}/templates` 
        : `${import.meta.env.VITE_API_URL}/templates/${editingTemplate.id}`
        
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingTemplate)
      })
      
      if (!res.ok) throw new Error('Failed to save template')
      const savedTpl = await res.json()
      
      if (isNew) {
        setTemplates(prev => [savedTpl, ...prev])
      } else {
        setTemplates(prev => prev.map(t => t.id === savedTpl.id ? savedTpl : t))
      }
      
      setToast({ type: 'success', title: 'Saved!', body: `"${savedTpl.name}" was saved successfully.` })
      setEditingTemplate(null) // Go back to list
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to save template.' })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteTemplate = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    
    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/templates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete template')
      
      setTemplates(prev => prev.filter(t => t.id !== id))
      setToast({ type: 'success', title: 'Deleted', body: 'The template was removed.' })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', title: 'Error', body: 'Failed to delete template.' })
    }
  }

  const openEditor = (tpl = null) => {
    if (tpl) {
      setEditingTemplate({ ...tpl })
    } else {
      setEditingTemplate({ name: '', category: '', subject: '', html: '' })
    }
  }

  // ---- RENDER EDITOR VIEW ----
  if (editingTemplate) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)] -m-8 animate-reveal bg-[#F9FAFB]">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB] shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 -ml-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-md transition-colors"
              onClick={() => setEditingTemplate(null)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h2 className="font-display font-semibold text-[#111827] text-lg leading-tight">
                {editingTemplate.id ? 'Edit Template' : 'Create Template'}
              </h2>
              <p className="text-xs font-body text-[#6B7280]">
                {editingTemplate.name || 'Untitled Template'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary" onClick={() => setEditingTemplate(null)}>Cancel</button>
            <button className="btn-primary" onClick={saveTemplate} disabled={isSaving || !editingTemplate.name.trim()}>
              {isSaving ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </div>

        {/* Split Pane Workspace */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Pane: Code & Settings */}
          <div className="w-1/2 flex flex-col border-r border-[#E5E7EB] bg-white overflow-y-auto">
            <div className="p-6 flex flex-col gap-5 border-b border-[#F3F4F6]">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Template Name" 
                  placeholder="e.g. Welcome Email" 
                  value={editingTemplate.name} 
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })} 
                />
                <Input 
                  label="Category (optional)" 
                  placeholder="e.g. Onboarding" 
                  value={editingTemplate.category} 
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })} 
                />
              </div>
              <Input 
                label="Subject Line" 
                placeholder="Welcome {{name}}!" 
                value={editingTemplate.subject} 
                onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })} 
              />
            </div>
            
            <div className="flex-1 flex flex-col p-6 pt-0">
              <div className="flex border-b border-[#E5E7EB] mb-4 gap-6">
                <button 
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${editorTab === 'html' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-[#6B7280] hover:text-[#374151]'}`}
                  onClick={() => setEditorTab('html')}
                >
                  HTML Source
                </button>
                <button 
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${editorTab === 'snippets' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-[#6B7280] hover:text-[#374151]'}`}
                  onClick={() => setEditorTab('snippets')}
                >
                  API Snippets
                </button>
              </div>

              {editorTab === 'html' ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9CA3AF] bg-[#F3F4F6] px-2 py-1 rounded font-mono">Supports {'{{variables}}'}</span>
                  </div>
                  <textarea 
                    className="w-full flex-1 resize-none rounded-md border border-[#D1D5DB] bg-[#1E293B] text-[#E2E8F0] p-4 text-sm font-mono focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] placeholder:text-[#64748B] transition-shadow duration-200"
                    placeholder="<h1>Hi {{name}}</h1><p>Welcome to our platform!</p>"
                    value={editingTemplate.html}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, html: e.target.value })}
                    spellCheck="false"
                  />
                </>
              ) : (
                <div className="flex-1">
                  <CodeSnippets 
                    templateName={editingTemplate.name || 'welcome'} 
                    variablesText={
                      (editingTemplate.vars || []).length > 0 
                        ? JSON.stringify(editingTemplate.vars.reduce((acc, v) => ({ ...acc, [v]: 'value' }), {}), null, 2)
                        : '{}'
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Pane: Live Preview */}
          <div className="w-1/2 flex flex-col bg-[#F3F4F6]">
            <div className="flex-shrink-0 px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
              <span className="text-sm font-medium text-[#374151]">Live Preview</span>
              <div className="flex gap-1">
                 <span className="w-3 h-3 rounded-full bg-[#FCA5A5]"></span>
                 <span className="w-3 h-3 rounded-full bg-[#FCD34D]"></span>
                 <span className="w-3 h-3 rounded-full bg-[#6EE7B7]"></span>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-hidden">
              <div className="w-full h-full bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col">
                <div className="border-b border-[#E5E7EB] p-4 bg-[#F9FAFB] flex-shrink-0">
                  <p className="text-sm font-medium text-[#111827] mb-1">
                    Subject: <span className="font-normal text-[#6B7280]">{editingTemplate.subject || '...'}</span>
                  </p>
                </div>
                <iframe 
                  title="Live HTML Preview"
                  className="w-full flex-1 border-none bg-white"
                  srcDoc={editingTemplate.html || '<p style="color: #9CA3AF; font-family: sans-serif; padding: 20px;">Preview will appear here...</p>'}
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </div>
          
        </div>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    )
  }

  // ---- RENDER LIST VIEW ----
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
          <button className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors" onClick={() => openEditor()}>
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
                    <button className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors" onClick={() => openEditor()}>
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
            <Card 
              key={tpl.id} 
              className="flex flex-col h-full hover:shadow-lg hover:border-[#4F46E5] transition-all cursor-pointer group" 
              style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}
              onClick={() => openEditor(tpl)}
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-1 rounded">
                    {tpl.category || 'General'}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="text-[#9CA3AF] hover:bg-[#FEF2F2] hover:text-[#DC2626] p-1.5 rounded-md transition-colors flex items-center justify-center" 
                      onClick={(e) => deleteTemplate(tpl.id, e)}
                      title="Delete Template"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
                <h3 className="text-[#111827] font-display font-semibold text-lg leading-tight mb-1 group-hover:text-[#4F46E5] transition-colors">{tpl.name}</h3>
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
    </div>
  )
}
