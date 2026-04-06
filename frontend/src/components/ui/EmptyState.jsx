export default function EmptyState({ icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-reveal">
      <div className="w-14 h-14 rounded-xl bg-[#EBF4FF] flex items-center justify-center mb-4">
        <span
          className="material-symbols-outlined text-[28px] text-[#0A84FF]"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-display font-semibold text-[#111827] text-base">{title}</h3>
      {body && (
        <p className="font-body text-sm text-[#6B7280] mt-1.5 max-w-[280px] leading-relaxed">
          {body}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
