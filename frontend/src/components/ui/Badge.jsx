export default function Badge({ status }) {
  const variants = {
    active:  { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A', dot: '#16A34A', label: 'Active'  },
    sent:    { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A', dot: '#16A34A', label: 'Sent'    },
    failed:  { bg: '#FEF2F2', border: '#FECACA', text: '#DC2626', dot: '#DC2626', label: 'Failed'  },
    pending: { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706', dot: '#D97706', label: 'Pending' },
    revoked: { bg: '#F3F4F6', border: '#E5E7EB', text: '#6B7280', dot: '#9CA3AF', label: 'Revoked' },
  }
  const v = variants[status] ?? variants.pending

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-body font-semibold tracking-[0.1em] uppercase rounded-full"
      style={{ background: v.bg, border: `1px solid ${v.border}`, color: v.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
        style={{ background: v.dot }}
      />
      {v.label}
    </span>
  )
}
