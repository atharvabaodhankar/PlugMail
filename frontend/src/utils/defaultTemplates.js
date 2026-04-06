export const defaultTemplates = [
  {
    name: 'Welcome Email',
    category: 'Onboarding',
    subject: 'Welcome to {{appName}}, {{name}} 🎉',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.hero{background:linear-gradient(135deg,#0A84FF 0%,#5E5CE6 100%);padding:48px 40px 40px;text-align:center}
.logo{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:rgba(255,255,255,0.2);border-radius:14px;margin-bottom:20px}
.logo svg{width:28px;height:28px}
.hero h1{font-size:26px;font-weight:700;color:#fff;letter-spacing:-0.3px;margin-bottom:8px}
.hero p{font-size:15px;color:rgba(255,255,255,0.8);line-height:1.5}
.body{padding:40px}
.greeting{font-size:17px;font-weight:600;color:#111827;margin-bottom:12px}
.text{font-size:14px;color:#4B5563;line-height:1.7;margin-bottom:20px}
.cta{display:inline-block;background:#0A84FF;color:#fff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:32px}
.divider{height:1px;background:#F3F4F6;margin:24px 0}
.features{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px}
.feat{background:#F9FAFB;border-radius:10px;padding:16px}
.feat-icon{font-size:20px;margin-bottom:8px}
.feat-title{font-size:13px;font-weight:600;color:#111827;margin-bottom:4px}
.feat-desc{font-size:12px;color:#6B7280;line-height:1.5}
.footer{background:#F9FAFB;padding:24px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.6}
</style></head><body>
<div class="wrap">
  <div class="hero">
    <div class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
    <h1>Welcome to {{appName}}</h1>
    <p>You're officially in. Let's get you started.</p>
  </div>
  <div class="body">
    <div class="greeting">Hey {{name}},</div>
    <div class="text">We're genuinely excited to have you here. {{appName}} was built for people like you — and we can't wait to show you around.<br><br>Your account is ready. Here's what you can do right now:</div>
    <a href="{{dashboardUrl}}" class="cta">Go to Dashboard →</a>
    <div class="features">
      <div class="feat"><div class="feat-icon">⚡</div><div class="feat-title">Quick Setup</div><div class="feat-desc">Connect in under 2 minutes</div></div>
      <div class="feat"><div class="feat-icon">🔑</div><div class="feat-title">API Access</div><div class="feat-desc">Your keys are ready to use</div></div>
      <div class="feat"><div class="feat-icon">📧</div><div class="feat-title">Templates</div><div class="feat-desc">Pre-built for any use case</div></div>
      <div class="feat"><div class="feat-icon">📊</div><div class="feat-title">Analytics</div><div class="feat-desc">Track every send in real time</div></div>
    </div>
    <div class="divider"></div>
    <div class="text">Any questions? Just reply to this email — it goes straight to a real person.</div>
  </div>
  <div class="footer"><p>{{appName}} · {{companyAddress}}<br>You received this because you signed up at {{signupUrl}}</p></div>
</div></body></html>`
  },
  {
    name: 'OTP Verification',
    category: 'Security',
    subject: '{{otp}} is your {{appName}} verification code',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.header{padding:32px 40px 0;display:flex;align-items:center;gap:10px}
.brand{font-size:15px;font-weight:700;color:#111827}
.body{padding:40px}
.icon-wrap{width:56px;height:56px;background:#EBF4FF;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.icon-wrap svg{width:28px;height:28px;stroke:#0A84FF;fill:none;stroke-width:1.5}
h1{font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.3px;margin-bottom:8px}
.sub{font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:32px}
.otp-box{background:#F9FAFB;border:1.5px dashed #D1D5DB;border-radius:12px;padding:28px;text-align:center;margin-bottom:32px}
.otp-label{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px}
.otp{font-size:40px;font-weight:800;color:#111827;letter-spacing:12px;font-family:'Courier New',monospace}
.expires{font-size:12px;color:#9CA3AF;margin-top:12px}
.expires span{color:#EF4444;font-weight:600}
.warning{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 16px;display:flex;gap:10px;margin-bottom:24px}
.warn-icon{font-size:16px;flex-shrink:0;margin-top:1px}
.warn-text{font-size:13px;color:#92400E;line-height:1.5}
.footer{background:#F9FAFB;padding:20px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF}
</style></head><body>
<div class="wrap">
  <div class="header"><div class="brand">{{appName}}</div></div>
  <div class="body">
    <div class="icon-wrap"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg></div>
    <h1>Verify it's you</h1>
    <div class="sub">Use the code below to complete your verification. Do not share this with anyone.</div>
    <div class="otp-box">
      <div class="otp-label">Your one-time code</div>
      <div class="otp">{{otp}}</div>
      <div class="expires">Expires in <span>10 minutes</span></div>
    </div>
    <div class="warning"><div class="warn-icon">⚠️</div><div class="warn-text">If you didn't request this code, someone may be trying to access your account. <strong>Do not share it.</strong></div></div>
    <div style="font-size:13px;color:#9CA3AF;">Requested from {{ipAddress}} · {{timestamp}}</div>
  </div>
  <div class="footer"><p>{{appName}} · Security Team</p></div>
</div></body></html>`
  },
  {
    name: 'Password Reset',
    category: 'Security',
    subject: 'Reset your {{appName}} password',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.top-bar{height:4px;background:linear-gradient(90deg,#EF4444,#F97316)}
.body{padding:48px 40px}
.icon-wrap{width:56px;height:56px;background:#FEF2F2;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.icon-wrap svg{width:26px;height:26px;stroke:#EF4444;fill:none;stroke-width:1.5}
h1{font-size:22px;font-weight:700;color:#111827;margin-bottom:8px}
.greeting{font-size:14px;color:#374151;margin-bottom:8px;font-weight:500}
.text{font-size:14px;color:#6B7280;line-height:1.7;margin-bottom:28px}
.cta-wrap{margin-bottom:28px}
.cta{display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:600}
.link-fallback{background:#F9FAFB;border-radius:8px;padding:14px 16px;margin-bottom:28px}
.link-label{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px}
.link-text{font-size:12px;color:#6B7280;word-break:break-all;font-family:monospace}
.divider{height:1px;background:#F3F4F6;margin:24px 0}
.note{font-size:13px;color:#9CA3AF;line-height:1.6}
.note strong{color:#374151}
.footer{padding:24px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF}
</style></head><body>
<div class="wrap">
  <div class="top-bar"></div>
  <div class="body">
    <div class="icon-wrap"><svg viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg></div>
    <h1>Reset your password</h1>
    <div class="greeting">Hi {{name}},</div>
    <div class="text">We received a request to reset the password for your {{appName}} account. Click below to choose a new one. This link is only valid for <strong>1 hour.</strong></div>
    <div class="cta-wrap"><a href="{{resetUrl}}" class="cta">Reset Password →</a></div>
    <div class="link-fallback">
      <div class="link-label">Or copy this link</div>
      <div class="link-text">{{resetUrl}}</div>
    </div>
    <div class="divider"></div>
    <div class="note">If you didn't request a password reset, you can safely ignore this email. Your password will <strong>not</strong> change. This request came from <strong>{{ipAddress}}</strong> at {{timestamp}}.</div>
  </div>
  <div class="footer"><p>{{appName}} · {{companyAddress}}</p></div>
</div></body></html>`
  },
  {
    name: 'Order Confirmation',
    category: 'Transactional',
    subject: 'Your order #{{orderId}} is confirmed ✓',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.header{background:#111827;padding:28px 40px;display:flex;align-items:center;justify-content:space-between}
.brand{font-size:15px;font-weight:700;color:#fff}
.order-badge{font-size:12px;color:#9CA3AF;font-family:monospace}
.status-bar{background:#F0FDF4;border-bottom:1px solid #BBF7D0;padding:14px 40px;display:flex;align-items:center;gap:10px}
.status-icon{width:20px;height:20px;background:#16A34A;border-radius:50%;display:flex;align-items:center;justify-content:center}
.status-icon svg{width:12px;height:12px;stroke:#fff;stroke-width:2.5;fill:none}
.status-text{font-size:13px;font-weight:600;color:#15803D}
.body{padding:32px 40px}
.greeting{font-size:15px;font-weight:600;color:#111827;margin-bottom:8px}
.text{font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:24px}
.items-table{width:100%;border-collapse:collapse;margin-bottom:20px}
.items-table th{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;padding:0 0 10px;text-align:left;border-bottom:1px solid #F3F4F6}
.items-table th:last-child{text-align:right}
.items-table td{padding:14px 0;font-size:14px;color:#374151;border-bottom:1px solid #F9FAFB;vertical-align:top}
.items-table td:last-child{text-align:right;font-weight:500;color:#111827}
.item-name{font-weight:500;color:#111827;margin-bottom:2px}
.item-desc{font-size:12px;color:#9CA3AF}
.totals{margin-top:4px}
.total-row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#6B7280}
.total-row.final{border-top:1px solid #F3F4F6;margin-top:8px;padding-top:14px;font-size:15px;font-weight:700;color:#111827}
.shipping-box{background:#F9FAFB;border-radius:10px;padding:16px;margin-top:24px}
.shipping-label{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px}
.shipping-text{font-size:13px;color:#374151;line-height:1.6}
.footer{background:#F9FAFB;padding:24px 40px;border-top:1px solid #F3F4F6;text-align:center}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.6}
</style></head><body>
<div class="wrap">
  <div class="header"><div class="brand">{{storeName}}</div><div class="order-badge">Order #{{orderId}}</div></div>
  <div class="status-bar"><div class="status-icon"><svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3"/></svg></div><div class="status-text">Payment confirmed — order is being prepared</div></div>
  <div class="body">
    <div class="greeting">Thanks, {{name}}!</div>
    <div class="text">Your order has been received and is being processed. We'll send you another email when it ships.</div>
    <table class="items-table">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
      <tbody>
        <tr><td><div class="item-name">{{item1Name}}</div><div class="item-desc">{{item1Variant}}</div></td><td>{{item1Qty}}</td><td>{{item1Price}}</td></tr>
        <tr><td><div class="item-name">{{item2Name}}</div><div class="item-desc">{{item2Variant}}</div></td><td>{{item2Qty}}</td><td>{{item2Price}}</td></tr>
      </tbody>
    </table>
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>{{subtotal}}</span></div>
      <div class="total-row"><span>Shipping</span><span>{{shipping}}</span></div>
      <div class="total-row"><span>Tax</span><span>{{tax}}</span></div>
      <div class="total-row final"><span>Total</span><span>{{total}}</span></div>
    </div>
    <div class="shipping-box">
      <div class="shipping-label">Shipping to</div>
      <div class="shipping-text">{{shippingName}}<br>{{shippingAddress}}<br>{{shippingCity}}, {{shippingCountry}}</div>
    </div>
  </div>
  <div class="footer"><p>{{storeName}} · Questions? Reply to this email<br>{{companyAddress}}</p></div>
</div></body></html>`
  },
  {
    name: 'Payment Receipt',
    category: 'Billing',
    subject: 'Receipt for {{amount}} — {{appName}}',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:500px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.receipt-head{padding:36px 40px 28px;border-bottom:1px solid #F3F4F6}
.receipt-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
.brand-name{font-size:15px;font-weight:700;color:#111827}
.receipt-tag{font-size:11px;font-weight:600;background:#F0FDF4;color:#16A34A;border:1px solid #BBF7D0;padding:4px 10px;border-radius:99px;letter-spacing:0.05em}
.amount-display{font-size:42px;font-weight:800;color:#111827;letter-spacing:-1px;margin-bottom:4px}
.amount-label{font-size:13px;color:#6B7280}
.meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:24px 40px;background:#F9FAFB;border-bottom:1px solid #F3F4F6}
.meta-label{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px}
.meta-value{font-size:13px;color:#374151;font-weight:500}
.meta-mono{font-family:monospace;font-size:12px}
.breakdown{padding:24px 40px}
.breakdown-title{font-size:12px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px}
.breakdown-row{display:flex;justify-content:space-between;font-size:13px;color:#374151;margin-bottom:10px}
.breakdown-row.total{border-top:1px solid #F3F4F6;padding-top:12px;margin-top:4px;font-size:14px;font-weight:700;color:#111827}
.footer{padding:20px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.6}
.dl-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:#0A84FF;text-decoration:none;margin-top:16px}
</style></head><body>
<div class="wrap">
  <div class="receipt-head">
    <div class="receipt-top"><div class="brand-name">{{appName}}</div><div class="receipt-tag">PAID</div></div>
    <div class="amount-display">{{amount}}</div>
    <div class="amount-label">Charged on {{chargeDate}} to {{cardBrand}} ····{{cardLast4}}</div>
  </div>
  <div class="meta-grid">
    <div><div class="meta-label">Invoice</div><div class="meta-value meta-mono">{{invoiceId}}</div></div>
    <div><div class="meta-label">Period</div><div class="meta-value">{{billingPeriod}}</div></div>
    <div><div class="meta-label">Plan</div><div class="meta-value">{{planName}}</div></div>
    <div><div class="meta-label">To</div><div class="meta-value">{{billingEmail}}</div></div>
  </div>
  <div class="breakdown">
    <div class="breakdown-title">Breakdown</div>
    <div class="breakdown-row"><span>{{planName}} (monthly)</span><span>{{planAmount}}</span></div>
    <div class="breakdown-row"><span>Tax ({{taxRate}}%)</span><span>{{taxAmount}}</span></div>
    <div class="breakdown-row total"><span>Total charged</span><span>{{amount}}</span></div>
  </div>
  <div class="footer">
    <p>{{appName}} · {{companyAddress}}</p>
    <a href="{{receiptUrl}}" class="dl-link">↓ Download PDF receipt</a>
  </div>
</div></body></html>`
  },
  {
    name: 'Security Alert',
    category: 'Security',
    subject: 'New sign-in to your {{appName}} account',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.alert-bar{background:#FEF2F2;border-bottom:1px solid #FECACA;padding:14px 32px;display:flex;align-items:center;gap:10px}
.alert-dot{width:8px;height:8px;background:#EF4444;border-radius:50%;flex-shrink:0}
.alert-text{font-size:13px;font-weight:600;color:#B91C1C}
.body{padding:40px}
.icon-wrap{width:56px;height:56px;background:#FEF2F2;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.icon-wrap svg{width:26px;height:26px;stroke:#EF4444;fill:none;stroke-width:1.5}
h1{font-size:21px;font-weight:700;color:#111827;margin-bottom:8px}
.greeting{font-size:14px;color:#374151;margin-bottom:16px;font-weight:500}
.text{font-size:14px;color:#6B7280;line-height:1.7;margin-bottom:24px}
.details-card{background:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;overflow:hidden;margin-bottom:28px}
.detail-row{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #F3F4F6;font-size:13px}
.detail-row:last-child{border-bottom:none}
.detail-label{color:#9CA3AF;font-weight:500}
.detail-val{color:#111827;font-weight:500;text-align:right;max-width:65%}
.cta-row{display:flex;gap:10px}
.cta-main{background:#EF4444;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:600;flex:1;text-align:center}
.cta-sec{background:#F9FAFB;color:#374151;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:500;flex:1;text-align:center;border:1px solid #E5E7EB}
.footer{background:#F9FAFB;padding:20px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.6}
</style></head><body>
<div class="wrap">
  <div class="alert-bar"><div class="alert-dot"></div><div class="alert-text">New sign-in detected on your account</div></div>
  <div class="body">
    <div class="icon-wrap"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
    <h1>Was this you?</h1>
    <div class="greeting">Hi {{name}},</div>
    <div class="text">We noticed a new sign-in to your {{appName}} account. If this was you, no action needed. If you don't recognize this, secure your account immediately.</div>
    <div class="details-card">
      <div class="detail-row"><span class="detail-label">Device</span><span class="detail-val">{{deviceName}}</span></div>
      <div class="detail-row"><span class="detail-label">Location</span><span class="detail-val">{{location}}</span></div>
      <div class="detail-row"><span class="detail-label">IP Address</span><span class="detail-val" style="font-family:monospace">{{ipAddress}}</span></div>
      <div class="detail-row"><span class="detail-label">Time</span><span class="detail-val">{{timestamp}}</span></div>
      <div class="detail-row"><span class="detail-label">Browser</span><span class="detail-val">{{browser}}</span></div>
    </div>
    <div class="cta-row"><a href="{{secureAccountUrl}}" class="cta-main">Secure my account</a><a href="{{wasmeUrl}}" class="cta-sec">Yes, that was me</a></div>
  </div>
  <div class="footer"><p>{{appName}} · Security Team<br>If you need help, reply to this email.</p></div>
</div></body></html>`
  },
  {
    name: 'Trial Ending',
    category: 'SaaS',
    subject: 'Your {{appName}} trial ends in {{daysLeft}} days',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:540px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.hero{padding:40px;background:#FFFBEB;border-bottom:1px solid #FDE68A}
.pill{display:inline-block;background:#FEF3C7;color:#92400E;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:99px;margin-bottom:16px;border:1px solid #FDE68A}
h1{font-size:24px;font-weight:800;color:#111827;letter-spacing:-0.3px;margin-bottom:8px}
.hero p{font-size:14px;color:#6B7280;line-height:1.6}
.body{padding:36px 40px}
.greeting{font-size:15px;font-weight:600;color:#111827;margin-bottom:10px}
.text{font-size:14px;color:#6B7280;line-height:1.7;margin-bottom:28px}
.usage-bar-wrap{margin-bottom:28px}
.usage-label{display:flex;justify-content:space-between;font-size:12px;font-weight:500;margin-bottom:8px}
.usage-label span:first-child{color:#374151}
.usage-label span:last-child{color:#6B7280}
.bar-bg{height:8px;background:#F3F4F6;border-radius:99px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,#F59E0B,#EF4444);border-radius:99px}
.plans{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px}
.plan-card{border:1.5px solid #E5E7EB;border-radius:10px;padding:16px}
.plan-card.featured{border-color:#0A84FF;background:#EBF4FF}
.plan-name{font-size:13px;font-weight:700;color:#111827;margin-bottom:4px}
.plan-price{font-size:22px;font-weight:800;color:#111827;margin-bottom:4px}
.plan-price span{font-size:13px;font-weight:400;color:#9CA3AF}
.plan-feat{font-size:12px;color:#6B7280;line-height:1.6}
.plan-badge{font-size:10px;font-weight:700;background:#0A84FF;color:#fff;padding:2px 8px;border-radius:99px;display:inline-block;margin-bottom:8px;letter-spacing:0.05em}
.cta{display:block;text-align:center;background:#111827;color:#fff;text-decoration:none;padding:14px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:16px}
.no-thanks{text-align:center;font-size:13px;color:#9CA3AF}
.no-thanks a{color:#6B7280}
.footer{background:#F9FAFB;padding:20px 40px;text-align:center;border-top:1px solid #F3F4F6}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.6}
</style></head><body>
<div class="wrap">
  <div class="hero">
    <div class="pill">⏳ Trial ending soon</div>
    <h1>{{daysLeft}} days left on your trial</h1>
    <p>After {{trialEndDate}}, your access to pro features will be paused. Upgrade now to keep everything running.</p>
  </div>
  <div class="body">
    <div class="greeting">Hi {{name}},</div>
    <div class="text">You've been busy — here's how you've used {{appName}} during your trial:</div>
    <div class="usage-bar-wrap">
      <div class="usage-label"><span>{{emailsSent}} emails sent</span><span>of 200 trial emails</span></div>
      <div class="bar-bg"><div class="bar-fill" style="width:{{usagePercent}}%"></div></div>
    </div>
    <div class="plans">
      <div class="plan-card"><div class="plan-name">Starter</div><div class="plan-price">$9<span>/mo</span></div><div class="plan-feat">2,000 emails/mo<br>3 Gmail accounts<br>Basic analytics</div></div>
      <div class="plan-card featured"><div class="plan-badge">RECOMMENDED</div><div class="plan-name">Pro</div><div class="plan-price">$29<span>/mo</span></div><div class="plan-feat">20,000 emails/mo<br>Unlimited accounts<br>Advanced analytics</div></div>
    </div>
    <a href="{{upgradeUrl}}" class="cta">Upgrade now — keep everything →</a>
    <div class="no-thanks">Not ready? <a href="{{extendUrl}}">Request a 7-day extension</a></div>
  </div>
  <div class="footer"><p>{{appName}} · {{companyAddress}}<br>You're on a free trial until {{trialEndDate}}</p></div>
</div></body></html>`
  },
  {
    name: 'Newsletter',
    category: 'Newsletter',
    subject: '{{issueTitle}} — {{appName}} #{{issueNumber}}',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f6f7f9;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8eaed}
.header{padding:28px 40px;border-bottom:1px solid #F3F4F6;display:flex;align-items:center;justify-content:space-between}
.brand{font-size:14px;font-weight:700;color:#111827}
.issue{font-size:12px;color:#9CA3AF;font-family:monospace}
.hero-img{height:180px;background:linear-gradient(135deg,#1e293b 0%,#334155 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #F3F4F6}
.hero-inner{text-align:center;padding:0 40px}
.issue-label{font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:12px}
.hero-title{font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.3px;line-height:1.25}
.body{padding:36px 40px}
.intro{font-size:15px;color:#374151;line-height:1.7;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #F3F4F6}
.article{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #F3F4F6}
.article:last-of-type{border-bottom:none;margin-bottom:0;padding-bottom:0}
.art-label{font-size:11px;font-weight:700;color:#0A84FF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px}
.art-title{font-size:17px;font-weight:700;color:#111827;margin-bottom:8px;line-height:1.35}
.art-body{font-size:14px;color:#6B7280;line-height:1.7;margin-bottom:12px}
.art-link{font-size:13px;font-weight:600;color:#0A84FF;text-decoration:none}
.footer{background:#F9FAFB;padding:24px 40px;border-top:1px solid #F3F4F6;text-align:center}
.footer p{font-size:12px;color:#9CA3AF;line-height:1.7}
.footer a{color:#6B7280}
</style></head><body>
<div class="wrap">
  <div class="header"><div class="brand">{{appName}}</div><div class="issue">Issue #{{issueNumber}}</div></div>
  <div class="hero-img"><div class="hero-inner"><div class="issue-label">{{issueDate}}</div><div class="hero-title">{{issueTitle}}</div></div></div>
  <div class="body">
    <div class="intro">{{introText}}</div>
    <div class="article">
      <div class="art-label">{{article1Category}}</div>
      <div class="art-title">{{article1Title}}</div>
      <div class="art-body">{{article1Summary}}</div>
      <a href="{{article1Url}}" class="art-link">Read more →</a>
    </div>
    <div class="article">
      <div class="art-label">{{article2Category}}</div>
      <div class="art-title">{{article2Title}}</div>
      <div class="art-body">{{article2Summary}}</div>
      <a href="{{article2Url}}" class="art-link">Read more →</a>
    </div>
    <div class="article">
      <div class="art-label">{{article3Category}}</div>
      <div class="art-title">{{article3Title}}</div>
      <div class="art-body">{{article3Summary}}</div>
      <a href="{{article3Url}}" class="art-link">Read more →</a>
    </div>
  </div>
  <div class="footer"><p>{{appName}} · {{companyAddress}}<br>You subscribed as {{subscriberEmail}} · <a href="{{unsubscribeUrl}}">Unsubscribe</a></p></div>
</div></body></html>`
  }
];
