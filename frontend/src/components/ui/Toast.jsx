import { useEffect } from 'react'

const VARIANTS = {
  success: {
    bg: '#F0FDF4', border: '#BBF7D0', icon: 'check_circle',
    iconColor: '#16A34A', titleColor: '#15803D', bodyColor: '#16A34A',
  },
  error: {
    bg: '#FEF2F2', border: '#FECACA', icon: 'error',
    iconColor: '#DC2626', titleColor: '#B91C1C', bodyColor: '#DC2626',
  },
  warning: {
    bg: '#FFFBEB', border: '#FDE68A', icon: 'warning',
    iconColor: '#D97706', titleColor: '#92400E', bodyColor: '#D97706',
  },
  info: {
    bg: '#EBF4FF', border: '#BAD8FF', icon: 'info',
    iconColor: '#0A84FF', titleColor: '#1E40AF', bodyColor: '#0A84FF',
  },
}

export default function Toast({ type = 'success', title, body, onClose, autoDismiss = 3000 }) {
  const v = VARIANTS[type]

  useEffect(() => {
    if (!autoDismiss || !onClose) return
    const t = setTimeout(onClose, autoDismiss)
    return () => clearTimeout(t)
  }, [autoDismiss, onClose])

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-lg border"
      style={{ background: v.bg, borderColor: v.border, animation: 'fadeSlideUp 250ms ease-out' }}
    >
      <span
        className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5"
        style={{ color: v.iconColor, fontVariationSettings: "'FILL' 1" }}
      >
        {v.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-medium" style={{ color: v.titleColor }}>{title}</p>
        {body && <p className="text-xs font-body mt-0.5" style={{ color: v.bodyColor }}>{body}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[#9CA3AF] hover:text-[#374151] transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  )
}
