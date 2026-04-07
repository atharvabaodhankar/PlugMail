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
        <div className="w-7 h-7 rounded bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-display font-bold">P</span>
        </div>
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

      {/* Plan badge */}
      <div className="px-3 py-4 border-t border-[#E5E7EB] flex-shrink-0">
        <div className="px-3 py-2.5 rounded-lg bg-white border border-[#E5E7EB]">
          <p className="section-label">Free Plan</p>
          <p className="text-xs font-body text-[#374151] mt-0.5">142 / 200 emails today</p>
          <div className="mt-2 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full w-[71%] bg-[#0A84FF] rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}
