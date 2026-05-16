import React from 'react'
import { API_URL } from '../lib/api'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { signInWithGoogle, error } = useAuth()
  const baseUrl = API_URL

  const sampleCode = `const response = await fetch("${baseUrl}/send", {
  method: "POST",
  headers: { "x-api-key": "pk_live_••••••••" },
  body: JSON.stringify({
    to: "user@example.com",
    template: "welcome",
    variables: { name: "Builder" }
  })
});`

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left panel — branding/info */}
      <div className="hidden lg:flex w-7/12 flex-col bg-[#FAFAFA] border-r border-[#E5E7EB] p-16 relative">
        {/* Ambient Glows for premium feel */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#0A84FF]/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#5E5CE6]/5 rounded-full blur-[80px] -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-20"
        >
          <img src="/logo.png" alt="PlugMail" className="w-8 h-8 object-contain" />
          <span className="font-display font-semibold text-[#111827] text-lg tracking-tight">PlugMail</span>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-5xl text-[#111827] leading-[1.1] mb-6"
          >
            Email infrastructure <br />
            built for <span className="text-[#0A84FF]">developers.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-[#6B7280] text-lg leading-relaxed mb-10"
          >
            Connect your Gmail, use our REST API, and start sending transactional emails in minutes. No complex SMTP setup required.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 mb-12"
          >
            {[
              "Send up to 2,000 emails per day for free",
              "Author responsive templates with variables",
              "Real-time analytics and open tracking",
              "Developer-first API and documentation"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-[#374151] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0A84FF]" />
                {feature}
              </div>
            ))}
          </motion.div>

          {/* Code Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-2xl shadow-blue-900/5 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-[10px] font-mono text-[#9CA3AF] uppercase tracking-widest">example_request.js</span>
            </div>
            <div className="p-6 bg-[#F8FAFC]">
              <pre className="font-mono text-xs text-[#334155] leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-[#A626A4]">const</span> response = <span className="text-[#A626A4]">await</span> <span className="text-[#4078F2]">fetch</span>(<span className="text-[#50A14F]">"{baseUrl}/send"</span>, {'{'}
                  {'\n  '}method: <span className="text-[#50A14F]">"POST"</span>,
                  {'\n  '}headers: {'{'} <span className="text-[#50A14F]">"x-api-key"</span>: <span className="text-[#50A14F]">"pk_live_..."</span> {'}'},
                  {'\n  '}body: <span className="text-[#C18401]">JSON</span>.<span className="text-[#4078F2]">stringify</span>({'{'}
                  {'\n    '}to: <span className="text-[#50A14F]">"user@example.com"</span>,
                  {'\n    '}template: <span className="text-[#50A14F]">"welcome"</span>
                  {'\n  }'})
                  {'\n}'});
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-auto text-xs font-body text-[#9CA3AF] flex items-center gap-6"
        >
          <span>© 2026 PlugMail Inc.</span>
          <a href="#" className="hover:text-[#111827] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#111827] transition-colors">Terms</a>
        </motion.div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:hidden flex flex-col items-center mb-12"
          >
            <img src="/logo.png" alt="PlugMail" className="w-12 h-12 mb-4" />
            <h1 className="font-display font-bold text-2xl text-[#111827]">PlugMail</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display font-bold text-3xl text-[#111827] mb-2">Welcome back</h2>
            <p className="font-body text-[#6B7280] mb-10 text-lg">Continue with your developer account.</p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">!</div>
                <p className="text-sm font-medium text-red-800">{error}</p>
              </motion.div>
            )}

            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-4 h-14 px-6
                         bg-white border border-[#E5E7EB] rounded-xl
                         text-base font-body font-semibold text-[#111827]
                         hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow-lg hover:shadow-blue-900/5
                         active:scale-[0.98] active:bg-[#F3F4F6]
                         transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9082c1.7018-1.5668 2.6841-3.874 2.6841-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9082-2.2581c-.8059.54-1.8368.859-3.0482.859-2.344 0-4.3282-1.5836-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9573C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
                <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1632 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#0A84FF] tracking-widest uppercase">
                <div className="w-1 h-1 rounded-full bg-[#0A84FF]" />
                Security First
              </div>
              <p className="text-sm font-body text-[#6B7280] leading-relaxed">
                PlugMail never stores your Google password. We use industry-standard OAuth 2.0 to securely access only the Gmail scopes required to send emails on your behalf.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
