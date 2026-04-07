import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, subtitle, children, footer }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:p-6"
      style={{ animation: 'fadeIn 200ms ease-out' }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div
        className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_20px_25px_rgba(0,0,0,0.08)] w-full max-w-md"
        style={{ animation: 'fadeSlideUp 250ms ease-out' }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold text-[#111827] text-lg leading-tight">{title}</h2>
            {subtitle && <p className="text-sm font-body text-[#6B7280] mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#374151] transition-colors -mt-0.5 flex-shrink-0 p-0.5"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
