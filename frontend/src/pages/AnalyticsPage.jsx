import { useState } from 'react'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Card, { CardHeader } from '../components/ui/Card'

const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'Last 90 days']

const LOGS = [
  { id: 1, to: 'alice@gmail.com',  template: 'welcome',        status: 'sent',    time: 'May 9 · 14:22', provider: 'Gmail' },
  { id: 2, to: 'bob@example.com',  template: 'otp',            status: 'sent',    time: 'May 9 · 13:55', provider: 'Gmail' },
  { id: 3, to: 'carol@startup.io', template: 'password-reset', status: 'failed',  time: 'May 9 · 13:41', provider: 'Gmail' },
  { id: 4, to: 'dave@corp.dev',    template: 'welcome',        status: 'sent',    time: 'May 9 · 12:08', provider: 'Gmail' },
  { id: 5, to: 'eve@product.co',   template: 'order-confirm',  status: 'sent',    time: 'May 8 · 18:30', provider: 'Gmail' },
  { id: 6, to: 'frank@dev.io',     template: 'newsletter',     status: 'pending', time: 'May 8 · 17:12', provider: 'Gmail' },
  { id: 7, to: 'grace@saas.dev',   template: 'welcome',        status: 'sent',    time: 'May 7 · 10:05', provider: 'Gmail' },
]

// Minimal bar chart using divs
const CHART_DATA = [
  { day: 'Mon', sent: 62, failed: 2  },
  { day: 'Tue', sent: 85, failed: 0  },
  { day: 'Wed', sent: 124,failed: 5  },
  { day: 'Thu', sent: 98, failed: 1  },
  { day: 'Fri', sent: 110,failed: 3  },
  { day: 'Sat', sent: 54, failed: 0  },
  { day: 'Sun', sent: 149,failed: 2  },
]
const MAX_VAL = Math.max(...CHART_DATA.map((d) => d.sent))

export default function AnalyticsPage() {
  const [range, setRange] = useState('Last 7 days')

  return (
    <div className="flex flex-col gap-8 animate-reveal">
      {/* Header + range picker */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display font-semibold text-[#111827] text-2xl">Analytics</h2>
          <p className="text-sm font-body text-[#6B7280] mt-1">Email delivery metrics and usage history.</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F3F4F6] p-1 rounded-lg">
          {DATE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded text-xs font-body font-medium transition-all duration-150 ${
                range === r
                  ? 'bg-white text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Emails Sent"   value="682"   delta="18%" deltaLabel="vs prior period" icon="mail"         iconBg="#EBF4FF" iconColor="#0A84FF" />
        <StatCard label="Failed"        value="13"    delta="-5%" deltaLabel="vs prior period" icon="error"        iconBg="#FEF2F2" iconColor="#DC2626" />
        <StatCard label="Success Rate"  value="98.1%" delta="1.2%"deltaLabel="improvement"     icon="check_circle" iconBg="#F0FDF4" iconColor="#16A34A" />
        <StatCard label="Avg / Day"     value="97.4"                                           icon="trending_up"  iconBg="#EBF4FF" iconColor="#0A84FF" />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader title="Daily Volume" subtitle="Sent (blue) vs Failed (red)" />
        <div className="px-6 py-5">
          <div className="flex items-end gap-3 h-40">
            {CHART_DATA.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1"
                style={{ animation: 'fadeSlideUp 400ms ease-out forwards', opacity: 0, animationDelay: `${i * 50}ms` }}>
                <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '120px' }}>
                  {/* Sent bar */}
                  <div
                    className="w-full rounded-t transition-all duration-300"
                    style={{
                      height: `${(d.sent / MAX_VAL) * 108}px`,
                      background: '#0A84FF',
                      opacity: 0.85,
                    }}
                  />
                  {/* Failed bar (stacked) */}
                  {d.failed > 0 && (
                    <div
                      className="w-full"
                      style={{
                        height: `${(d.failed / MAX_VAL) * 108}px`,
                        minHeight: '4px',
                        background: '#DC2626',
                        opacity: 0.75,
                      }}
                    />
                  )}
                </div>
                <span className="section-label" style={{ fontSize: '9px' }}>{d.day}</span>
                <span className="text-[10px] font-mono text-[#6B7280]">{d.sent}</span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#0A84FF] opacity-85" />
              <span className="text-xs font-body text-[#6B7280]">Sent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#DC2626] opacity-75" />
              <span className="text-xs font-body text-[#6B7280]">Failed</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Logs table */}
      <Card>
        <CardHeader title="Email Logs" subtitle={`${LOGS.length} records in this period`} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {['Recipient', 'Template', 'Provider', 'Status', 'Sent At'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 section-label whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOGS.map((log, i) => (
                <tr key={log.id}
                  className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100"
                  style={{ animation: 'fadeSlideUp 300ms ease-out forwards', opacity: 0, animationDelay: `${i * 40}ms` }}>
                  <td className="px-6 py-3.5 text-sm font-body text-[#111827] whitespace-nowrap">{log.to}</td>
                  <td className="px-6 py-3.5 text-sm font-body text-[#374151]">{log.template}</td>
                  <td className="px-6 py-3.5 text-xs font-body text-[#6B7280]">{log.provider}</td>
                  <td className="px-6 py-3.5"><Badge status={log.status} /></td>
                  <td className="px-6 py-3.5 text-xs font-body text-[#6B7280] whitespace-nowrap">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
