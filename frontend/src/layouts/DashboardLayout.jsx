import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

const PAGE_TITLES = {
  '/dashboard':  'Overview',
  '/keys':       'API Keys',
  '/accounts':   'Gmail Accounts',
  '/templates':  'Templates',
  '/playground': 'Playground',
  '/analytics':  'Analytics',
  '/settings':   'Settings',
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location  = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Dashboard'

  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-60 flex-shrink-0
          border-r border-[#E5E7EB] bg-[#FAFAFA] flex flex-col
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Main area */}
      <div className="lg:ml-60 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-[#E5E7EB] bg-white flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-20">
          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden text-[#6B7280] hover:text-[#374151] transition-colors p-1 -ml-1"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex-1">
            <h1 className="font-display font-semibold text-[#111827] text-base leading-tight">
              {pageTitle}
            </h1>
          </div>

          {/* User area */}
          <div className="flex items-center gap-3">
            {/* Display name on desktop */}
            {user?.displayName && (
              <span className="hidden md:block text-sm font-body text-[#374151]">
                {user.displayName}
              </span>
            )}

            {/* Avatar — photo or initials */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'User'}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full flex-shrink-0 border border-[#E5E7EB]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-display font-bold">{initials}</span>
              </div>
            )}

            {/* Sign out */}
            <button
              onClick={logout}
              title="Sign out"
              className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 max-w-6xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
