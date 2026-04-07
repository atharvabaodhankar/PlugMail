export default function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h3 className="font-display font-semibold text-[#111827] text-base leading-tight">{title}</h3>
        {subtitle && <p className="text-sm font-body text-[#6B7280] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  )
}
