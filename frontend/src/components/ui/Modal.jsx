import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, subtitle, children, footer }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9999] flex items-center justify-center p-4 lg:p-6"
      style={{ animation: 'fadeIn 200ms ease-out' }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div
        className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] w-full max-w-md overflow-hidden"
        style={{ animation: 'fadeSlideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold text-[#111827] text-xl leading-tight">{title}</h2>
            {subtitle && <p className="text-sm font-body text-[#6B7280] mt-1.5 leading-relaxed">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all -mt-1 -mr-1 rounded-full p-1.5 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#F3F4F6] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
