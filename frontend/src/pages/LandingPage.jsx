import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Zap, LayoutTemplate, BarChart3, Globe, Shield, ArrowRight, CheckCircle2, Copy } from 'lucide-react'
import Lenis from 'lenis'

// --- CONSTANTS & DATA ---
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' },
]

const FEATURES = [
  { title: 'API-first architecture', desc: 'Seamlessly integrate email sending into any codebase with simple REST APIs.', icon: <Terminal className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Gmail integration', desc: 'Connect your own Google accounts to send emails with extremely high deliverability.', icon: <Globe className="w-6 h-6 text-[#5E5CE6]" /> },
  { title: 'Template management', desc: 'Author responsive HTML emails with variables and real-time previews.', icon: <LayoutTemplate className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Analytics dashboard', desc: 'Track opens, clicks, bounces, and delivery rates in real-time.', icon: <BarChart3 className="w-6 h-6 text-[#5E5CE6]" /> },
  { title: 'Secure API keys', desc: 'Granular API keys with prefix security and immediate rotation capabilities.', icon: <Shield className="w-6 h-6 text-[#0A84FF]" /> },
  { title: 'Test instantly', desc: 'Use our Playground to verify payload data and template variables before shipping.', icon: <Zap className="w-6 h-6 text-[#5E5CE6]" /> },
]

// --- COMPONENTS ---

const Navbar = () => (
  <motion.nav 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#050816]/60 backdrop-blur-xl"
  >
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="PlugMail" className="w-8 h-8 object-contain" />
      <span className="font-display font-semibold text-white text-lg tracking-tight">PlugMail</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map(link => (
        <a key={link.label} href={link.href} className="text-sm font-body text-white/60 hover:text-white transition-colors">
          {link.label}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-4">
      <Link to="/login" className="text-sm font-body text-white/80 hover:text-white transition-colors">
        Sign in
      </Link>
      <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-[#050816] text-sm font-medium hover:bg-white/90 transition-colors">
        Start Free
      </Link>
    </div>
  </motion.nav>
)

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0A84FF]/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5E5CE6]/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#0A84FF] shadow-[0_0_8px_#0A84FF]" />
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">v1.0 is now live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-6xl md:text-8xl tracking-tight text-white mb-6 leading-[1.1]"
        >
          Email infrastructure <br className="hidden md:block" />
          built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6]">developers.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Send transactional emails instantly using your own Gmail with powerful APIs, templates, analytics, and testing tools.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/login" className="h-12 px-6 rounded-lg bg-white text-[#050816] text-sm font-medium flex items-center justify-center hover:scale-105 transition-transform w-full sm:w-auto shadow-[0_0_40px_rgba(10,132,255,0.3)]">
            Start Free <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <a href="#developers" className="h-12 px-6 rounded-lg border border-white/20 bg-white/5 text-white text-sm font-medium flex items-center justify-center hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-md">
            View Documentation
          </a>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0B1020]/80 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-[16/9] relative">
            {/* Fake macOS window header */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Fake dashboard content */}
            <div className="p-8 flex h-[calc(100%-3rem)] gap-8">
              <div className="w-48 flex flex-col gap-4">
                <div className="h-8 bg-white/10 rounded" />
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="h-24 flex-1 bg-gradient-to-br from-[#0A84FF]/20 to-[#5E5CE6]/20 border border-white/10 rounded-xl" />
                  <div className="h-24 flex-1 bg-white/5 border border-white/10 rounded-xl" />
                  <div className="h-24 flex-1 bg-white/5 border border-white/10 rounded-xl" />
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const AnimatedCodeSection = () => {
  const [copied, setCopied] = useState(false)
  const code = `const response = await fetch("https://api.plugmail.dev/api/send", {
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
    <section id="developers" className="py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-4xl text-white mb-6">Send emails with just a single API call.</h2>
          <p className="font-body text-white/60 text-lg mb-8 leading-relaxed">
            Stop fighting with legacy SMTP servers and complex SDKs. PlugMail provides a beautifully simple REST API that works anywhere you can make HTTP requests.
          </p>
          <ul className="flex flex-col gap-4">
            {['Zero configuration required', 'Global edge network', 'High deliverability through Gmail', 'Real-time error reporting'].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
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
          <div className="relative rounded-xl border border-white/10 bg-[#0B1020] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-4">
                <span className="text-xs font-mono text-white/80 border-b border-[#0A84FF] pb-1">Node.js</span>
                <span className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors cursor-pointer">cURL</span>
                <span className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors cursor-pointer">Python</span>
              </div>
              <button onClick={copyToClipboard} className="text-white/40 hover:text-white transition-colors">
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-[#E2E8F0] leading-relaxed">
                <code>
                  <span className="text-[#C678DD]">const</span> response = <span className="text-[#C678DD]">await</span> <span className="text-[#61AFEF]">fetch</span>(<span className="text-[#98C379]">"https://api.plugmail.dev/api/send"</span>, {'{'}
                  {'\n  '}method: <span className="text-[#98C379]">"POST"</span>,
                  {'\n  '}headers: {'{'}
                  {'\n    '}<span className="text-[#98C379]">"x-api-key"</span>: <span className="text-[#98C379]">"pk_live_..."</span>,
                  {'\n    '}<span className="text-[#98C379]">"Content-Type"</span>: <span className="text-[#98C379]">"application/json"</span>
                  {'\n  }'},
                  {'\n  '}body: <span className="text-[#E5C07B]">JSON</span>.<span className="text-[#61AFEF]">stringify</span>({'{'}
                  {'\n    '}to: <span className="text-[#98C379]">"user@startup.com"</span>,
                  {'\n    '}template: <span className="text-[#98C379]">"welcome"</span>,
                  {'\n    '}variables: {'{'} name: <span className="text-[#98C379]">"Builder"</span> {'}'}
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
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Everything you need to scale</h2>
          <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
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
              className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/0 to-[#5E5CE6]/0 group-hover:from-[#0A84FF]/10 group-hover:to-[#5E5CE6]/10 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">{feature.title}</h3>
              <p className="font-body text-white/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Simple, transparent pricing</h2>
          <p className="font-body text-white/60 text-lg">Start for free. Scale when you need to.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative"
          >
            <h3 className="font-display text-2xl font-semibold text-white mb-2">Hobby</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-white/60">/month</span>
            </div>
            <p className="text-white/60 text-sm mb-8">Perfect for side projects and testing.</p>
            <Link to="/login" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors text-white text-center font-medium rounded-lg mb-8">
              Start Free
            </Link>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/40" /> Up to 200 emails / day</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/40" /> 1 Gmail Account</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/40" /> Core Templates</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/40" /> Basic Analytics</li>
            </ul>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-[#0A84FF]/50 bg-gradient-to-b from-[#0A84FF]/10 to-transparent backdrop-blur-xl relative shadow-[0_0_40px_rgba(10,132,255,0.15)]"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full text-xs font-bold text-white shadow-lg">
              MOST POPULAR
            </div>
            <h3 className="font-display text-2xl font-semibold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$15</span>
              <span className="text-white/60">/month</span>
            </div>
            <p className="text-white/60 text-sm mb-8">For serious creators and growing SaaS.</p>
            <Link to="/login" className="block w-full py-3 px-4 bg-white text-[#050816] hover:bg-white/90 transition-colors text-center font-medium rounded-lg mb-8">
              Upgrade to Pro
            </Link>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0A84FF]" /> Unlimited emails</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0A84FF]" /> Unlimited Gmail Accounts</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0A84FF]" /> Custom Templates</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0A84FF]" /> Priority Support</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const FinalCTA = () => (
  <section className="py-32 relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#050816] to-[#0B1020]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A84FF]/20 via-transparent to-transparent opacity-50" />
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-8 tracking-tight">
        Stop fighting SMTP. <br /> Start shipping.
      </h2>
      <Link to="/login" className="inline-flex items-center justify-center h-14 px-8 rounded-lg bg-white text-[#050816] text-lg font-medium hover:scale-105 transition-transform shadow-[0_0_40px_rgba(10,132,255,0.4)]">
        Get Started for Free <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </div>
  </section>
)

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#050816] py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="PlugMail" className="w-6 h-6 object-contain opacity-80" />
        <span className="font-display font-semibold text-white/80 text-sm">PlugMail</span>
      </div>
      <div className="flex gap-6 text-sm text-white/50">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="https://github.com/atharvabaodhankar/plugmail" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
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
    <div className="min-h-screen bg-[#050816] selection:bg-[#0A84FF]/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AnimatedCodeSection />
        <FeaturesSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
