import { Link } from 'react-router-dom'

export default function NavItem({ icon, label, path, active, onClick }) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-body
        transition-colors duration-150 text-left no-underline
        ${active
          ? 'bg-[#EBF4FF] text-[#0A84FF] font-medium'
          : 'text-[#374151] hover:bg-[#F3F4F6] font-normal'
        }
      `}
    >
      <span
        className="material-symbols-outlined text-[20px] flex-shrink-0"
        style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
      >
        {icon}
      </span>
      {label}
    </Link>
  )
}
