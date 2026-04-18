import { useLocation, Link } from 'react-router-dom'
import NavItem from './NavItem'

const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Overview', path: '/dashboard' },
  { icon: 'vpn_key', label: 'API Keys', path: '/keys' },
  { icon: 'alternate_email', label: 'Gmail Accounts', path: '/accounts' },
  { icon: 'description', label: 'Templates', path: '/templates' },
  { icon: 'science', label: 'Playground', path: '/playground' },
  { icon: 'bar_chart', label: 'Analytics', path: '/analytics' },
]

const BOTTOM_ITEMS = [
  { icon: 'settings', label: 'Settings', path: '/settings' },
  { icon: 'help_outline', label: 'Documentation', path: '/docs' },
]

export default function Sidebar({ onNavigate }) {
  const location = useLocation()

  return (
    <>
      {/* Logo + wordmark */}
      <div className="h-16 border-b border-[#E5E7EB] px-5 flex items-center gap-2.5 flex-shrink-0">
        <img src="/logo.png" alt="PlugMail Logo" className="w-7 h-7 object-contain" />
        <span className="font-display font-semibold text-[#111827] text-base">PlugMail</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={location.pathname === item.path}
            onClick={onNavigate}
          />
        ))}

        <div className="my-3 border-t border-[#E5E7EB]" />

        {BOTTOM_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={location.pathname === item.path}
            onClick={onNavigate}
          />
        ))}
      </nav>

    </>
  )
}
