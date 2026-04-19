import { useAuth } from '../context/AuthContext'
import CodeBlock from '../components/ui/CodeBlock'

const SAMPLE_CODE = `const response = await fetch("https://api.plugmail.dev/api/send", {
  method: "POST",
  headers: { "x-api-key": "pk_live_••••••••" },
  body: JSON.stringify({
    to: "user@example.com",
    template: "welcome",
    variables: { name: "Atharva" }
  })
});`

export default function LoginPage() {
  const { signInWithGoogle, error } = useAuth()

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex w-1/2 flex-col bg-[#FAFAFA] border-r border-[#E5E7EB] p-12">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="PlugMail Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-semibold text-[#111827] text-lg">PlugMail</span>
        </div>

        <div className="mt-auto mb-auto pt-20">
          <h1 className="font-display font-bold text-[#111827] text-4xl leading-tight mb-4">
            Email infrastructure<br />
            <span className="text-[#0A84FF]">built for developers.</span>
          </h1>
          <p className="font-body text-[#374151] text-lg leading-relaxed max-w-sm">
            Send transactional emails via REST API using your own Gmail credentials. No SMTP setup. No complexity.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {[
              { icon: 'vpn_key',    text: 'API key management in seconds' },
              { icon: 'description',text: 'Reusable email templates with variables' },
              { icon: 'bar_chart',  text: 'Analytics and delivery tracking' },
              { icon: 'science',    text: 'Live testing playground' },
            ].map((item) => (
              <li key={item.icon} className="flex items-center gap-3 text-sm font-body text-[#374151]">
                <div className="w-7 h-7 rounded-md bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-[#0A84FF]"
                    style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <CodeBlock lang="Node.js" code={SAMPLE_CODE} />
        </div>
      </div>

      {/* Right panel — sign in */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <img src="/logo.png" alt="PlugMail Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-semibold text-[#111827] text-lg">PlugMail</span>
        </div>

        <div className="w-full max-w-sm animate-reveal">
          <h2 className="font-display font-semibold text-[#111827] text-2xl mb-1">
            Sign in to PlugMail
          </h2>
          <p className="font-body text-[#6B7280] text-sm mb-8">
            Connect your Google account to get started.
          </p>

          {/* Error banner */}
          {error && (
            <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
              <span className="material-symbols-outlined text-[18px] text-[#DC2626] flex-shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <p className="text-sm font-body text-[#B91C1C]">{error}</p>
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 h-11 px-4
                       bg-white border border-[#D1D5DB] rounded
                       text-sm font-body font-medium text-[#374151]
                       hover:bg-[#F9FAFB] hover:border-[#9CA3AF]
                       active:scale-[0.98] active:bg-[#F3F4F6]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/30
                       transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9082c1.7018-1.5668 2.6841-3.874 2.6841-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9082-2.2581c-.8059.54-1.8368.859-3.0482.859-2.344 0-4.3282-1.5836-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9573C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
              <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1632 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <p className="text-xs font-body text-[#9CA3AF] text-center leading-relaxed">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#0A84FF] hover:text-[#0071E3] transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#0A84FF] hover:text-[#0071E3] transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
