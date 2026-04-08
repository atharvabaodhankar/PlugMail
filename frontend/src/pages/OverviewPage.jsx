import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import CodeBlock from '../components/ui/CodeBlock'

const RECENT_LOGS = [
  { id: 1, to: 'alice@gmail.com',   template: 'welcome',        status: 'sent',    time: 'May 9 · 14:22' },
  { id: 2, to: 'bob@example.com',   template: 'otp',            status: 'sent',    time: 'May 9 · 13:55' },
  { id: 3, to: 'carol@startup.io',  template: 'password-reset', status: 'failed',  time: 'May 9 · 13:41' },
  { id: 4, to: 'dave@corp.dev',     template: 'welcome',        status: 'sent',    time: 'May 9 · 12:08' },
  { id: 5, to: 'eve@product.co',    template: 'order-confirm',  status: 'pending', time: 'May 9 · 11:30' },
]

const QUICK_START = `const response = await fetch(
  "https://api.plugmail.dev/api/send",
  {
    method: "POST",
    headers: {
      "x-api-key": "pk_live_••••••••",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: "user@example.com",
      template: "welcome",
      variables: { name: "Atharva" }
    })
  }
);`

function getHour() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function OverviewPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex flex-col gap-8 animate-reveal">
      {/* Page greeting */}
      <div>
        <h2 className="font-display font-semibold text-[#111827] text-2xl">
          Good {getHour()}, Atharva. 👋
        </h2>
        <p className="text-sm font-body text-[#6B7280] mt-1">{today}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Emails Sent"     value="1,482" delta="12%" deltaLabel="vs yesterday" icon="mail"          iconBg="#EBF4FF" iconColor="#0A84FF" />
        <StatCard label="Failed"          value="14"    delta="-3%" deltaLabel="vs yesterday" icon="error"         iconBg="#FEF2F2" iconColor="#DC2626" />
        <StatCard label="Success Rate"    value="98.9%" delta="0.4%"deltaLabel="vs yesterday" icon="check_circle"  iconBg="#F0FDF4" iconColor="#16A34A" />
        <StatCard label="Active Templates"value="8"                                           icon="description"   iconBg="#EBF4FF" iconColor="#0A84FF" />
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
                  {RECENT_LOGS.map((log, i) => (
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
                  ))}
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
                <code className="text-xs font-mono text-[#1E293B]">POST https://api.plugmail.dev/api/send</code>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
