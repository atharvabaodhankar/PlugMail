export default function StatCard({ label, value, delta, deltaLabel, icon, iconBg, iconColor }) {
  const isPositive = delta && !delta.startsWith('-')

  return (
    <div className="card p-6 animate-reveal">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="section-label">{label}</p>
          <p className="text-2xl font-display font-semibold text-[#111827] mt-1">{value}</p>
          {delta && (
            <p className="text-xs font-body text-[#6B7280] mt-1">
              <span className={`font-medium ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                {isPositive ? '↑' : '↓'} {delta}
              </span>
              {deltaLabel && <span className="ml-1">{deltaLabel}</span>}
            </p>
          )}
        </div>
        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: iconBg ?? '#EBF4FF' }}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ color: iconColor ?? '#0A84FF', fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
