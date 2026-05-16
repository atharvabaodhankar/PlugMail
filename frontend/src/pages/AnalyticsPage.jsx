import { useState, useEffect } from 'react'
import { API_URL } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import Card, { CardHeader } from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'

export default function AnalyticsPage() {
  const { getIdToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSent: 0,
    totalFailed: 0,
    successRate: 0,
    providerStats: {},
    chartData: []
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await getIdToken()
        const res = await fetch(`${API_URL}/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch analytics')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Analytics Overview</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">
            Monitor your email delivery metrics and performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] mb-4">
            <span className="material-symbols-outlined text-[24px]">send</span>
          </div>
          <p className="text-sm font-body font-medium text-[#6B7280]">Total Sent</p>
          <h3 className="text-3xl font-display font-bold text-[#111827] mt-1">{loading ? '...' : stats.totalSent}</h3>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] mb-4">
            <span className="material-symbols-outlined text-[24px]">error</span>
          </div>
          <p className="text-sm font-body font-medium text-[#6B7280]">Total Failed</p>
          <h3 className="text-3xl font-display font-bold text-[#111827] mt-1">{loading ? '...' : stats.totalFailed}</h3>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-4">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <p className="text-sm font-body font-medium text-[#6B7280]">Success Rate</p>
          <h3 className="text-3xl font-display font-bold text-[#111827] mt-1">{loading ? '...' : `${stats.successRate}%`}</h3>
        </Card>
      </div>

      <Card>
        <CardHeader title="Sending History" subtitle="Your recent email volume" />
        <div className="p-6">
          {loading ? (
             <div className="h-64 flex justify-center items-center"><div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" /></div>
          ) : stats.chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-lg bg-[#F9FAFB]">
              <div className="text-center">
                <span className="material-symbols-outlined text-[#9CA3AF] text-4xl mb-2">bar_chart</span>
                <p className="text-sm font-body font-medium text-[#6B7280]">No data available yet</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Send some emails to see your charts.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.chartData.map(day => (
                 <div key={day.date} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-mono text-gray-600">{day.date}</div>
                    <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden flex">
                      <div className="bg-indigo-500 h-full" style={{ width: `${(day.sent / Math.max(stats.totalSent, 1)) * 100}%` }}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${(day.failed / Math.max(stats.totalSent, 1)) * 100}%` }}></div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">
                      {day.sent}
                    </div>
                 </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
