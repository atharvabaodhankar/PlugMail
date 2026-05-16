import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Zap, LayoutTemplate, BarChart3, Globe, Shield, ArrowRight, CheckCircle2, Copy, Mail, Key, UserPlus, RefreshCw, Bell } from 'lucide-react'
import Lenis from 'lenis'
import { API_URL } from '../lib/api'

// --- CONSTANTS & DATA ---
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Templates', href: '#templates' },
  { label: 'Developers', href: '#developers' },
]

const FEATURES = [
  { title: 'API-first architecture', desc: 'Seamlessly integrate email sending into any codebase with simple REST APIs.', icon: <Terminal className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Gmail integration', desc: 'Connect your own Google accounts to send emails with extremely high deliverability.', icon: <Globe className="w-6 h-6 text-[#5E5CE6]" /> },
  { title: 'Template management', desc: 'Author responsive HTML emails with variables and real-time previews.', icon: <LayoutTemplate className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Analytics dashboard', desc: 'Track opens, clicks, bounces, and delivery rates in real-time.', icon: <BarChart3 className="w-6 h-6 text-[#5E5CE6]" /> },
  { title: 'Secure API keys', desc: 'Granular API keys with prefix security and immediate rotation capabilities.', icon: <Shield className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Test instantly', desc: 'Use our Playground to verify payload data and template variables before shipping.', icon: <Zap className="w-6 h-6 text-[#5E5CE6]" /> },
]

const TEMPLATES = [
  { name: 'Welcome Email', icon: <UserPlus className="w-5 h-5" />, color: 'bg-blue-500' },
  { name: 'OTP Verification', icon: <Key className="w-5 h-5" />, color: 'bg-indigo-500' },
  { name: 'Password Reset', icon: <RefreshCw className="w-5 h-5" />, color: 'bg-purple-500' },
  { name: 'App Notification', icon: <Bell className="w-5 h-5" />, color: 'bg-pink-500' },
]

// --- COMPONENTS ---

const Navbar = () => (
  <motion.nav 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xl"
  >
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="PlugMail" className="w-8 h-8 object-contain" />
      <span className="font-display font-semibold text-[#111827] text-lg tracking-tight">PlugMail</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map(link => (
        <a key={link.label} href={link.href} className="text-sm font-body text-[#6B7280] hover:text-[#111827] transition-colors">
          {link.label}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-4">
      <Link to="/login" className="text-sm font-body text-[#6B7280] hover:text-[#111827] transition-colors">
        Sign in
      </Link>
      <Link to="/login" className="px-4 py-2 rounded-lg bg-[#111827] text-white text-sm font-medium hover:bg-[#1F2937] transition-colors">
        Get Started
      </Link>
    </div>
  </motion.nav>
)

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0A84FF]/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5E5CE6]/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E7EB] bg-white/60 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#0A84FF] shadow-[0_0_8px_#0A84FF]" />
          <span className="text-xs font-medium text-[#374151] tracking-wide uppercase">100% Free for developers</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-6xl md:text-8xl tracking-tight text-[#111827] mb-6 leading-[1.1]"
        >
          Email infrastructure <br className="hidden md:block" />
          built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6]">developers.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Send transactional emails instantly using your own Gmail with powerful APIs, templates, analytics, and testing tools.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/login" className="h-12 px-6 rounded-lg bg-[#111827] text-white text-sm font-medium flex items-center justify-center hover:scale-105 transition-transform w-full sm:w-auto shadow-lg shadow-[#111827]/20">
            Start Building <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <a href="#developers" className="h-12 px-6 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] text-sm font-medium flex items-center justify-center hover:bg-gray-50 transition-colors w-full sm:w-auto shadow-sm">
            View API Docs
          </a>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ 
            opacity: 1, 
            y: [100, 0, -10, 0], 
            rotateX: 0 
          }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.5 },
            y: { duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
            rotateX: { duration: 1.2, delay: 0.5 },
            repeat: 0
          }}
          style={{ perspective: 1000 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-[#E5E7EB] bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-[16/9] relative"
          >
            {/* Fake macOS window header */}
            <div className="h-12 border-b border-[#E5E7EB] flex items-center px-4 gap-2 bg-[#FAFAFA]">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            {/* Fake dashboard content */}
            <div className="p-8 flex h-[calc(100%-3rem)] gap-8 bg-white text-left">
              <div className="w-48 flex flex-col gap-4">
                <div className="h-8 bg-gray-100 rounded-lg flex items-center px-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dashboard</div>
                <div className="h-8 bg-gray-50 rounded-lg" />
                <div className="h-8 bg-gray-50 rounded-lg" />
                <div className="h-8 bg-gray-50 rounded-lg" />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="h-24 flex-1 bg-gradient-to-br from-[#0A84FF]/10 to-[#5E5CE6]/10 border border-[#E5E7EB] rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Deliverability</div>
                    <div className="text-2xl font-bold text-[#111827]">99.8%</div>
                  </div>
                  <div className="h-24 flex-1 bg-gray-50 border border-[#E5E7EB] rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Emails Sent</div>
                    <div className="text-2xl font-bold text-[#111827]">12,482</div>
                  </div>
                  <div className="h-24 flex-1 bg-gray-50 border border-[#E5E7EB] rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Active Keys</div>
                    <div className="text-2xl font-bold text-[#111827]">4</div>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 border border-[#E5E7EB] rounded-xl p-6 relative">
                   <div className="text-[10px] text-gray-400 font-bold uppercase mb-4">Traffic Real-time</div>
                   <div className="w-full h-full flex items-end gap-2 overflow-hidden pb-4">
                      {[40, 70, 45, 90, 65, 80, 55, 95, 40, 60, 85, 30, 50, 75, 45, 90].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: 0.8 + (i * 0.05) }}
                          className="flex-1 bg-blue-500/20 border-t-2 border-blue-500 rounded-t-sm" 
                        />
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const AnimatedCodeSection = () => {
  const [copied, setCopied] = useState(false)
  const baseUrl = API_URL
  const code = `const response = await fetch("${baseUrl}/send", {
  method: "POST",
  headers: {
    "x-api-key": "pk_live_...",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    to: "user@startup.com",
    template: "welcome",
    variables: { name: "Builder" }
  })
});`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="developers" className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-4xl text-[#111827] mb-6">Send emails with just a single API call.</h2>
          <p className="font-body text-[#6B7280] text-lg mb-8 leading-relaxed">
            Stop fighting with legacy SMTP servers and complex SDKs. PlugMail provides a beautifully simple REST API that works anywhere you can make HTTP requests.
          </p>
          <ul className="flex flex-col gap-4">
            {['Zero configuration required', 'Global edge network', 'High deliverability through Gmail', 'Real-time error reporting'].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-[#374151]">
                <CheckCircle2 className="w-5 h-5 text-[#0A84FF]" />
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-xl blur opacity-20" />
          <div className="relative rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-2xl shadow-blue-900/5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <div className="flex gap-4">
                <span className="text-xs font-mono text-[#111827] border-b-2 border-[#0A84FF] pb-1 font-semibold">Node.js</span>
                <span className="text-xs font-mono text-[#9CA3AF] hover:text-[#374151] transition-colors cursor-pointer">cURL</span>
                <span className="text-xs font-mono text-[#9CA3AF] hover:text-[#374151] transition-colors cursor-pointer">Python</span>
              </div>
              <button onClick={copyToClipboard} className="text-[#9CA3AF] hover:text-[#374151] transition-colors">
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-6 overflow-x-auto bg-[#F8FAFC]">
              <pre className="font-mono text-sm text-[#334155] leading-relaxed">
                <code>
                  <span className="text-[#A626A4]">const</span> response = <span className="text-[#A626A4]">await</span> <span className="text-[#4078F2]">fetch</span>(<span className="text-[#50A14F]">"{baseUrl}/send"</span>, {'{'}
                  {'\n  '}method: <span className="text-[#50A14F]">"POST"</span>,
                  {'\n  '}headers: {'{'}
                  {'\n    '}<span className="text-[#50A14F]">"x-api-key"</span>: <span className="text-[#50A14F]">"pk_live_..."</span>,
                  {'\n    '}<span className="text-[#50A14F]">"Content-Type"</span>: <span className="text-[#50A14F]">"application/json"</span>
                  {'\n  }'},
                  {'\n  '}body: <span className="text-[#C18401]">JSON</span>.<span className="text-[#4078F2]">stringify</span>({'{'}
                  {'\n    '}to: <span className="text-[#50A14F]">"user@startup.com"</span>,
                  {'\n    '}template: <span className="text-[#50A14F]">"welcome"</span>,
                  {'\n    '}variables: {'{'} name: <span className="text-[#50A14F]">"Builder"</span> {'}'}
                  {'\n  }'})
                  {'\n}'});
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display font-bold text-4xl text-[#111827] mb-4">Everything you need to scale</h2>
          <p className="font-body text-[#6B7280] text-lg max-w-2xl mx-auto">
            PlugMail provides a complete suite of tools to manage, send, and analyze your transactional emails.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-8 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/0 to-[#5E5CE6]/0 group-hover:from-[#0A84FF]/5 group-hover:to-[#5E5CE6]/5 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-6 border border-[#E5E7EB]">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-xl text-[#111827] mb-3">{feature.title}</h3>
              <p className="font-body text-[#6B7280] text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AnalyticsSection = () => {
  return (
    <section id="analytics" className="py-32 relative bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            Real-time Insights
          </div>
          <h2 className="font-display font-bold text-4xl text-[#111827] mb-6 leading-tight">
            Monitor every email <br /> with surgical precision.
          </h2>
          <p className="font-body text-[#6B7280] text-lg mb-10 leading-relaxed">
            Gain deep visibility into your email infrastructure. Track delivery rates, open metrics, and bounce logs in real-time with our high-performance analytics engine.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#111827] mb-1">99.9%</div>
              <div className="text-sm text-[#6B7280]">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#111827] mb-1">&lt; 50ms</div>
              <div className="text-sm text-[#6B7280]">API Latency</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl border border-[#E5E7EB] bg-white shadow-2xl p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-[#111827]">Engagement Overview</h4>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-bold">1D</div>
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">7D</div>
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-3 pb-4 border-b border-gray-100">
              {[60, 40, 90, 70, 50, 100, 80, 60, 95, 75].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-500 rounded-t-lg"
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Opens</div>
                <div className="text-xl font-bold text-[#111827]">84.2%</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Clicks</div>
                <div className="text-xl font-bold text-[#111827]">12.5%</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Bounces</div>
                <div className="text-xl font-bold text-red-500">0.02%</div>
              </div>
            </div>
          </div>
          
          {/* Floating stat chip */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white shadow-xl border border-[#E5E7EB] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Status</div>
              <div className="text-sm font-bold text-[#111827]">Systems Nominal</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const TemplateShowcase = () => {
  return (
    <section id="templates" className="py-32 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-4xl text-[#111827] mb-4">Beautifully crafted templates</h2>
            <p className="font-body text-[#6B7280] text-lg">
              Start from professional templates or build your own with our easy-to-use editor. Responsive by default.
            </p>
          </div>
          <Link to="/login" className="flex items-center gap-2 text-[#0A84FF] font-semibold group">
            Explore All Templates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((tmpl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] mb-4 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all">
                <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl ${tmpl.color} text-white flex items-center justify-center shadow-lg`}>
                  {tmpl.icon}
                </div>
                {/* Fake template preview lines */}
                <div className="p-8 pt-20 space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-5/6 bg-gray-100 rounded" />
                  <div className="h-20 w-full bg-gray-50 rounded-lg border border-gray-100 mt-6" />
                  <div className="h-8 w-24 bg-blue-500 rounded-md mt-4" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-display font-bold text-[#111827]">{tmpl.name}</h3>
              <p className="text-xs text-[#6B7280] uppercase tracking-widest font-bold mt-1">Responsive</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FinalCTA = () => (
  <section className="py-32 relative overflow-hidden bg-white">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A84FF]/5 via-transparent to-transparent opacity-50" />
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="font-display font-bold text-5xl md:text-7xl text-[#111827] mb-8 tracking-tight">
        Stop fighting SMTP. <br /> Start shipping.
      </h2>
      <Link to="/login" className="inline-flex items-center justify-center h-14 px-8 rounded-lg bg-[#111827] text-white text-lg font-medium hover:scale-105 transition-transform shadow-xl shadow-[#111827]/10">
        Get Started for Free <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </div>
  </section>
)

const Footer = () => (
  <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="PlugMail" className="w-6 h-6 object-contain grayscale opacity-80" />
        <span className="font-display font-semibold text-[#111827] text-sm">PlugMail</span>
      </div>
      <div className="flex gap-6 text-sm text-[#6B7280]">
        <a href="#features" className="hover:text-[#111827] transition-colors">Features</a>
        <a href="#templates" className="hover:text-[#111827] transition-colors">Templates</a>
        <a href="https://github.com/atharvabaodhankar/plugmail" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">GitHub</a>
        <a href="#" className="hover:text-[#111827] transition-colors">Terms</a>
        <a href="#" className="hover:text-[#111827] transition-colors">Privacy</a>
      </div>
    </div>
  </footer>
)

// --- MAIN PAGE ---
export default function LandingPage() {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white selection:bg-[#0A84FF]/20 selection:text-[#0A84FF] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AnimatedCodeSection />
        <FeaturesSection />
        <AnalyticsSection />
        <TemplateShowcase />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
