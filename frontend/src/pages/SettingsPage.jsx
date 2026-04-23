import { useAuth } from '../context/AuthContext'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import { LogOut, User, Shield, Bell } from 'lucide-react'

export default function SettingsPage() {
  const { user, logout, getIdToken } = useAuth()

  const handleDeleteAccount = async () => {
    if (!window.confirm('ARE YOU ABSOLUTELY SURE? \n\nThis will permanently delete:\n- All your email templates\n- All API keys\n- All email history\n- Your connected Gmail accounts\n\nThis action cannot be undone.')) {
      return
    }

    try {
      const token = await getIdToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.ok) {
        // Firebase Auth user is already deleted by backend
        // We just need to clear local state
        await logout()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete account')
      }
    } catch (error) {
      console.error('Delete account error:', error)
      alert('An error occurred while deleting your account.')
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-reveal pb-10">
      <div>
        <h2 className="font-display font-semibold text-[#111827] text-2xl">Settings</h2>
        <p className="text-sm font-body text-[#6B7280] mt-1">
          Manage your account preferences and subscription.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar-style Nav (Internal to page) */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          {[
            { id: 'profile', label: 'Profile', icon: User, active: true },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                item.active 
                ? 'bg-[#F3F4F6] text-[#111827] shadow-sm' 
                : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.active ? 'text-[#0A84FF]' : 'text-[#9CA3AF]'}`} />
              {item.label}
            </button>
          ))}
          
          <hr className="my-4 border-[#F3F4F6]" />
          
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader title="Profile Information" subtitle="Your account details" />
            <CardBody className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={user?.photoURL} 
                  alt={user?.displayName} 
                  className="w-16 h-16 rounded-full border-2 border-[#E5E7EB]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#111827]">{user?.displayName}</h4>
                  <p className="text-xs text-[#6B7280] font-body">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151] uppercase tracking-wider">Full Name</label>
                  <div className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] font-medium">
                    {user?.displayName}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151] uppercase tracking-wider">Email Address</label>
                  <div className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] font-medium">
                    {user?.email}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Usage & Plan" subtitle="Currently active tier" />
            <CardBody>
              <div className="p-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#10B981] shadow-sm">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E293B]">Free Forever</h4>
                    <p className="text-xs text-[#64748B]">Unlimited access to all features</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#DCFCE7] text-[#166534] text-[10px] font-bold rounded-full uppercase">
                  Active
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Account Management" subtitle="Danger Zone" />
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#111827]">Delete Account</h4>
                  <p className="text-xs text-[#6B7280] font-body">Permanently remove your account and all data.</p>
                </div>
                <button 
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 border border-[#FEE2E2] text-[#DC2626] rounded-lg text-xs font-bold hover:bg-[#FEF2F2] transition-all"
                >
                  Delete
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
