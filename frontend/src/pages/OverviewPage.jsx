import { useState, useEffect } from 'react'
import { API_URL } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import CodeBlock from '../components/ui/CodeBlock'
import { Sun, Moon, CloudSun, Loader2 } from 'lucide-react'

function getHour() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function OverviewPage() {
  const { user, getIdToken } = useAuth()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const baseUrl = API_URL
  
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = await getIdToken()
        const res = await fetch(`${baseUrl}/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Analytics fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [getIdToken, baseUrl])

  const firstName = user?.displayName?.split(' ')[0] || 'Developer'

  const QUICK_START = `const response = await fetch(
  "${baseUrl}/send",
  {
    method: "POST",
    headers: {
      "x-api-key": "pk_live_••••••••",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: "user@example.com",
      template: "welcome",
      variables: { name: "${firstName}" }
    })
  }
);`

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-[#6B7280]">
        <Loader2 className="w-8 h-8 animate-spin mb-2 text-[#0A84FF]" />
        <p className="text-sm font-body">Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-reveal">
      {/* Page greeting */}
      <div>
        <h2 className="font-display font-semibold text-[#111827] text-2xl flex items-center gap-2">
          Good {getHour()}, {firstName}. 
          {getHour() === 'morning' && <Sun className="w-6 h-6 text-yellow-500" />}
          {getHour() === 'afternoon' && <CloudSun className="w-6 h-6 text-orange-400" />}
          {getHour() === 'evening' && <Moon className="w-6 h-6 text-indigo-400" />}
        </h2>
        <p className="text-sm font-body text-[#6B7280] mt-1">{today}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Emails Sent"     value={stats?.totalSent?.toLocaleString() || "0"} delta="0%" deltaLabel="vs yesterday" icon="mail"          iconBg="#EBF4FF" iconColor="#0A84FF" />
        <StatCard label="Failed"          value={stats?.totalFailed?.toLocaleString() || "0"} delta="0%" deltaLabel="vs yesterday" icon="error"         iconBg="#FEF2F2" iconColor="#DC2626" />
        <StatCard label="Success Rate"    value={`${stats?.successRate || "0.0"}%`}           delta="0%" deltaLabel="vs yesterday" icon="check_circle"  iconBg="#F0FDF4" iconColor="#16A34A" />
        <StatCard label="Active Templates"value={stats?.templateCount || "0"}                                           icon="description"   iconBg="#EBF4FF" iconColor="#0A84FF" />
      </div>

      {/* 2-col row: recent logs + quick start */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent logs — spans 3 cols */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader title="Recent Emails" subtitle="Your last 5 deliveries" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    {['Recipient', 'Template', 'Status', 'Sent At'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 section-label whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!stats?.recentLogs || stats.recentLogs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-sm font-body text-[#6B7280]">
                        No emails sent yet. Start by using the Quick Start guide!
                      </td>
                    </tr>
                  ) : (
                    stats.recentLogs.map((log, i) => (
                      <tr
                        key={log.id}
                        className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors duration-100 stagger-${Math.min(i + 1, 5)}`}
                        style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 40}ms` }}
                      >
                        <td className="px-6 py-3.5 text-sm font-body text-[#111827] whitespace-nowrap">{log.to}</td>
                        <td className="px-6 py-3.5 text-sm font-body text-[#374151]">{log.template}</td>
                        <td className="px-6 py-3.5"><Badge status={log.status} /></td>
                        <td className="px-6 py-3.5 text-xs font-body text-[#6B7280] whitespace-nowrap">{log.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick start — spans 2 cols */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader title="Quick Start" subtitle="Send your first email" />
            <CardBody>
              <CodeBlock lang="Node.js" code={QUICK_START} />
              <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                <p className="text-[10px] section-label mb-1">Your API endpoint</p>
                <code className="text-xs font-mono text-[#1E293B]">POST {baseUrl}/send</code>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
