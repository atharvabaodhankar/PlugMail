# UI.md — PlugMail Design System

> **This is the law.** Every screen, every component, every color, every spacing value in PlugMail's
> frontend must comply with this document. AI agents must read this entirely before writing a single line
> of UI code.
>
> **Aesthetic direction:** Premium light theme. Think Google AI Studio / Gemini API console —
> white surfaces, precise borders, a single brand color, generous whitespace, crisp typography.
> Zero glassmorphism. Zero dark backgrounds. Zero gradient abuse.
>
> **Stack:** React + Vite + Tailwind CSS v4.2 (see Part 16 for setup).

---

## ⚠️ CRITICAL — Tailwind v4 Setup (Read First)

This project uses **Tailwind CSS v4.2+ with Vite**. Using v3 syntax causes silent failures.

```
v3 (WRONG)                        v4 (CORRECT)
──────────────────────────────────────────────────────────
tailwind.config.js                No config file needed
@tailwind base/components/utils   @import "tailwindcss";
module.exports = { theme: {} }    @theme { } block in CSS
theme.extend.colors.primary       --color-primary in @theme {}
darkMode: "class"                 @custom-variant dark (&:where(.dark, .dark *));
```

### Vite Setup

```bash
npm install tailwindcss@^4.2 @tailwindcss/vite@^4.2
```

```javascript
// vite.config.js — NO postcss.config.js needed
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```
❌ Do NOT create postcss.config.js
❌ Do NOT install autoprefixer, postcss, tailwindcss-cli
✅ @tailwindcss/vite plugin handles everything
```

---

## The Prime Directive

> "Does this look like a $10M SaaS API console, or does it look like a template from a Figma marketplace?"

Every decision must pass that test.

**What separates PlugMail UI from AI slop:**
- AI slop: dark hero with purple gradient, Inter everywhere, glassmorphism cards, rounded-2xl on everything
- PlugMail: pure white surfaces, `#0A84FF` as the singular brand color, hairline borders (`#E5E7EB`), `DM Mono` for code, strict elevation via subtle shadows — not transparency hacks

---

## Part 1 — Design Token System

### 1.1 Philosophy

PlugMail is a developer tool. Its UI communicates reliability, precision, and calm authority.
Every token exists to serve that story. No decorative tokens.

**4 color roles. No more, no less:**
```
PRIMARY   → Brand action. One blue. Buttons, links, active states, focus rings.
SECONDARY → Muted support. Chips, secondary labels, hover surfaces.
SEMANTIC  → Status. Success (green), warning (amber), error (red). Semantic only — never decorative.
NEUTRAL   → Everything else. Surfaces, text, borders, dividers.
```

### 1.2 Full Token Reference

```css
:root {
  /* ── Brand ───────────────────────────────────── */
  --primary:               #0A84FF;   /* Google Blue family. CTAs, links, active nav */
  --primary-hover:         #0071E3;   /* Hover state for primary */
  --primary-active:        #005DC0;   /* Pressed state */
  --primary-subtle:        #EBF4FF;   /* Primary tinted surface (selected rows, chips) */
  --primary-border:        #BAD8FF;   /* Border on primary-subtle containers */
  --on-primary:            #FFFFFF;   /* Text/icons on primary backgrounds */

  /* ── Neutral Surfaces (Elevation System) ─────── */
  --surface:               #FFFFFF;   /* Base page background */
  --surface-raised:        #FAFAFA;   /* Slightly elevated — sidebar, code panels */
  --surface-overlay:       #F3F4F6;   /* Hover states, striped rows, tonal areas */
  --surface-sunken:        #F9FAFB;   /* Code blocks, inset sections */
  --surface-border:        #E5E7EB;   /* Standard dividers — hairline */
  --surface-border-strong: #D1D5DB;   /* Input borders, stronger dividers */

  /* ── Text Hierarchy ──────────────────────────── */
  --text-primary:          #111827;   /* Headlines, card titles, critical labels */
  --text-secondary:        #374151;   /* Body text, descriptions */
  --text-tertiary:         #6B7280;   /* Metadata, timestamps, helper text */
  --text-disabled:         #9CA3AF;   /* Disabled inputs, placeholder text */
  --text-inverse:          #FFFFFF;   /* Text on dark/primary backgrounds */
  --text-link:             #0A84FF;   /* Inline links — same as primary */
  --text-link-hover:       #0071E3;

  /* ── Semantic: Success ───────────────────────── */
  --success:               #16A34A;
  --success-subtle:        #F0FDF4;
  --success-border:        #BBF7D0;
  --on-success:            #FFFFFF;

  /* ── Semantic: Warning ───────────────────────── */
  --warning:               #D97706;
  --warning-subtle:        #FFFBEB;
  --warning-border:        #FDE68A;
  --on-warning:            #FFFFFF;

  /* ── Semantic: Error ─────────────────────────── */
  --error:                 #DC2626;
  --error-subtle:          #FEF2F2;
  --error-border:          #FECACA;
  --on-error:              #FFFFFF;

  /* ── Code / Monospace ────────────────────────── */
  --code-bg:               #F8FAFC;   /* Code block background */
  --code-border:           #E2E8F0;   /* Code block border */
  --code-text:             #1E293B;   /* Code text */
  --code-comment:          #94A3B8;   /* Comments in code */
  --code-keyword:          #0A84FF;   /* Keywords (primary brand) */
  --code-string:           #16A34A;   /* Strings (success green) */

  /* ── Shadows (elevation — directional only) ──── */
  --shadow-xs:   0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow:      0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-md:   0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.04);
  --shadow-lg:   0 20px 25px rgba(0,0,0,0.06), 0 10px 10px rgba(0,0,0,0.03);
  --shadow-primary: 0 4px 14px rgba(10,132,255,0.25);  /* Only on primary CTA */

  /* ── Gradients ───────────────────────────────── */
  /* RULE: Max ONE gradient element per screen. Headers or hero only. */
  --gradient-brand:  linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%);
  --gradient-subtle: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);

  /* ── Radius ──────────────────────────────────── */
  --radius-sm:   0.25rem;  /* 4px  — badges, tags */
  --radius:      0.5rem;   /* 8px  — inputs, cards, buttons */
  --radius-lg:   0.75rem;  /* 12px — modals, panels, dropdowns */
  --radius-xl:   1rem;     /* 16px — large cards, featured sections */
  --radius-full: 9999px;   /* Pills — status chips, avatars */
}
```

### 1.3 Color Rules — No Exceptions

```
RULE 1: Primary blue (#0A84FF) is the ONLY action color. No green CTAs, no purple CTAs.
RULE 2: Semantic colors (success/warning/error) are for status ONLY. Never use green as decoration.
RULE 3: No color has opacity lower than /60 in UI elements. Faint colors signal brokenness.
RULE 4: Gradient brand is used on: top nav accent stripe, OR hero/empty-state illustration only.
RULE 5: White (#FFFFFF) is the primary surface. Never use off-white (#FAFAFA) as a base page bg.
RULE 6: Text hierarchy must be visible: primary > secondary > tertiary. Never two adjacent gray texts
         at the same weight and opacity.
```

---

## Part 2 — Typography System

### 2.1 Font Pairing

```
DISPLAY FONT  → "DM Sans" — weight 500–700
                Used for: Dashboard titles, hero headings, sidebar product name
                Why: Clean, slightly geometric, confident at any size. Gemini-adjacent.

BODY FONT     → "Inter" — weight 400–600
                Used for: Body text, labels, table cells, nav items, captions, inputs

CODE FONT     → "DM Mono" — weight 400–500
                Used for: API keys, code blocks, endpoint paths, variable names, JSON
                Why: Distinct from body text. Signals code context immediately.
```

```css
/* In globals.css — Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
```

### 2.2 Type Scale

```
SIZE      USAGE
──────────────────────────────────────────────────────────────
32px / 2rem     → Page hero title (welcome screen H1 only)
24px / 1.5rem   → Section titles ("API Keys", "Analytics")
20px / 1.25rem  → Card titles, modal headings
16px / 1rem     → Primary body, form labels, nav items
14px / 0.875rem → Secondary body, table cells, helper text
12px / 0.75rem  → Captions, timestamps, badge labels
10px / 0.625rem → ALL CAPS section labels, tracking-[0.15em]
```

### 2.3 Typography Rules

```
RULE 1: Display font (DM Sans) for headings only. Body text always Inter.
RULE 2: Code font (DM Mono) for any API key, endpoint path, code snippet, or variable.
RULE 3: Section labels (10px ALL CAPS) always have tracking-[0.15em]. Always text-tertiary.
RULE 4: Max font-weight 700. No 800/900 weights in a developer dashboard — it reads as aggression.
RULE 5: Never center-align body paragraphs longer than 2 lines.
RULE 6: Heading line-height: 1.2. Body line-height: 1.6. Never swap these.
RULE 7: In tables, all cells use the same size (14px) and weight (400). Only the header is 500.
```

### 2.4 Tailwind Token Classes (v4)

```
@theme token                  → Tailwind class
──────────────────────────────────────────────
--font-display: "DM Sans"     → font-display
--font-body: "Inter"          → font-body
--font-mono: "DM Mono"        → font-mono
```

---

## Part 3 — Spacing System

### 3.1 The Scale

**Everything is a multiple of 4px. Arbitrary values are forbidden.**

```
4px  / 0.25rem  → gap-1  — icon-to-text
8px  / 0.5rem   → gap-2  — tight internal padding, badge padding
12px / 0.75rem  → gap-3  — input vertical padding, small card gap
16px / 1rem     → gap-4  — card padding, list item gap
20px / 1.25rem  → gap-5  — card inner comfortable padding
24px / 1.5rem   → gap-6  — section gap (mobile), sidebar padding
32px / 2rem     → gap-8  — section gap (desktop)
40px / 2.5rem   → gap-10 — large section separation
48px / 3rem     → gap-12 — hero spacing
```

### 3.2 Dashboard Layout Grid

```
Sidebar width:     240px (fixed, desktop) / hidden (mobile)
Content gutter:    32px left+right on desktop, 16px on mobile
Content max-width: 1152px (max-w-6xl)
Card inner pad:    24px (p-6)
Table row height:  52px min
Header height:     64px (h-16)
```

---

## Part 4 — Border Radius

```
4px  (rounded-sm)   → Status badges, micro tags
8px  (rounded)      → Buttons, inputs, cards, dropdowns (DEFAULT)
12px (rounded-lg)   → Modals, panel containers, code blocks
16px (rounded-xl)   → Large feature cards, hero sections
9999px (rounded-full) → Avatar, status pills, live indicator dot
```

**Rule: All cards use `rounded-lg` (12px). All buttons and inputs use `rounded` (8px).
Never mix radius families on the same component type.**

---

## Part 5 — Layout Architecture

### 5.1 Dashboard Shell

```jsx
<div className="min-h-screen bg-white flex">

  {/* Sidebar — 240px fixed */}
  <aside className="w-60 flex-shrink-0 border-r border-[#E5E7EB] bg-[#FAFAFA]
                    flex flex-col fixed inset-y-0 left-0 z-40">
    {/* Product wordmark */}
    {/* Nav items */}
    {/* Bottom: user/plan */}
  </aside>

  {/* Main area */}
  <div className="ml-60 flex-1 flex flex-col min-h-screen">

    {/* Top bar */}
    <header className="h-16 border-b border-[#E5E7EB] bg-white
                       flex items-center px-8 gap-4 sticky top-0 z-30">
      {/* Page title + actions */}
    </header>

    {/* Page content */}
    <main className="flex-1 p-8 max-w-6xl">
      {/* Page content here */}
    </main>

  </div>
</div>
```

### 5.2 Sidebar Structure

```jsx
<aside className="w-60 border-r border-[#E5E7EB] bg-[#FAFAFA] flex flex-col">

  {/* Logo + wordmark */}
  <div className="h-16 border-b border-[#E5E7EB] px-5 flex items-center gap-2.5">
    <div className="w-7 h-7 rounded bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6]
                    flex items-center justify-center">
      <span className="text-white text-xs font-display font-bold">P</span>
    </div>
    <span className="font-display font-semibold text-[#111827] text-base">PlugMail</span>
  </div>

  {/* Nav section */}
  <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
    {/* Active nav item */}
    <NavItem icon="dashboard" label="Overview" active />
    <NavItem icon="vpn_key" label="API Keys" />
    <NavItem icon="alternate_email" label="Gmail Accounts" />
    <NavItem icon="description" label="Templates" />
    <NavItem icon="science" label="Playground" />
    <NavItem icon="bar_chart" label="Analytics" />

    {/* Divider */}
    <div className="my-3 border-t border-[#E5E7EB]" />
    <NavItem icon="settings" label="Settings" />
    <NavItem icon="help_outline" label="Documentation" />
  </nav>

  {/* Plan badge + user */}
  <div className="px-3 py-4 border-t border-[#E5E7EB]">
    <div className="px-3 py-2.5 rounded-lg bg-white border border-[#E5E7EB]">
      <p className="text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-[#6B7280]">
        Free Plan
      </p>
      <p className="text-xs font-body text-[#374151] mt-0.5">142 / 200 emails today</p>
      <div className="mt-2 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className="h-full w-[71%] bg-[#0A84FF] rounded-full" />
      </div>
    </div>
  </div>
</aside>
```

### 5.3 NavItem Component

```jsx
// Active: blue bg, blue text, filled icon
// Inactive: transparent bg, gray text, outlined icon, hover: #F3F4F6 bg

const NavItem = ({ icon, label, active }) => (
  <button className={`
    w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-body
    transition-colors duration-150 text-left
    ${active
      ? "bg-[#EBF4FF] text-[#0A84FF] font-medium"
      : "text-[#374151] hover:bg-[#F3F4F6] font-normal"
    }
  `}>
    <span
      className={`material-symbols-outlined text-[20px]`}
      style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
    >
      {icon}
    </span>
    {label}
  </button>
);
```

---

## Part 6 — Component Patterns

### 6.1 Primary CTA Button

```jsx
<button className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-[#0A84FF] hover:bg-[#0071E3] active:bg-[#005DC0]
  text-white text-sm font-body font-medium
  rounded
  shadow-[0_4px_14px_rgba(10,132,255,0.25)]
  transition-all duration-150
  active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/50
">
  <span className="material-symbols-outlined text-[18px]">add</span>
  Create API Key
</button>
```

### 6.2 Secondary Button

```jsx
<button className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6]
  text-[#374151] text-sm font-body font-medium
  border border-[#D1D5DB]
  rounded
  transition-all duration-150
  active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/40
">
  <span className="material-symbols-outlined text-[18px] text-[#6B7280]">content_copy</span>
  Copy
</button>
```

### 6.3 Danger Button

```jsx
<button className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-white hover:bg-[#FEF2F2] active:bg-[#FEE2E2]
  text-[#DC2626] text-sm font-body font-medium
  border border-[#FECACA] hover:border-[#FCA5A5]
  rounded
  transition-all duration-150
  active:scale-[0.98]
">
  <span className="material-symbols-outlined text-[18px]">delete</span>
  Revoke
</button>
```

### 6.4 Input Field

```jsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-body font-medium text-[#374151]">
    Gmail Address
  </label>
  <input
    type="email"
    placeholder="you@gmail.com"
    className="
      w-full h-10 px-3
      bg-white
      border border-[#D1D5DB]
      rounded
      text-sm font-body text-[#111827]
      placeholder:text-[#9CA3AF]
      transition-all duration-150
      hover:border-[#9CA3AF]
      focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20
    "
  />
  <p className="text-xs font-body text-[#6B7280]">
    Helper text or error message goes here.
  </p>
</div>
```

### 6.5 Card / Panel

```jsx
{/* Standard card — white surface, hairline border, subtle shadow */}
<div className="bg-white border border-[#E5E7EB] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
  {/* Card header */}
  <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
    <div>
      <h3 className="font-display font-semibold text-[#111827] text-base">API Keys</h3>
      <p className="text-sm font-body text-[#6B7280] mt-0.5">Manage your access tokens</p>
    </div>
    <button className="...">Create Key</button>
  </div>
  {/* Card body */}
  <div className="px-6 py-5">
    {/* content */}
  </div>
</div>
```

### 6.6 API Key Row

```jsx
{/* Key row — table-like list item */}
<div className="flex items-center gap-4 py-4 border-b border-[#E5E7EB] last:border-0
                hover:bg-[#F9FAFB] transition-colors duration-150 px-6 -mx-6">

  {/* Key info */}
  <div className="flex-1 min-w-0">
    <p className="text-sm font-body font-medium text-[#111827]">Production Key</p>
    <p className="text-xs font-body text-[#6B7280] mt-0.5">Created May 9, 2025</p>
  </div>

  {/* API Key value */}
  <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded px-3 py-1.5">
    <code className="font-mono text-xs text-[#1E293B] tracking-wide">
      pk_live_••••••••••••3f9a
    </code>
    <button className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
      <span className="material-symbols-outlined text-[16px]">content_copy</span>
    </button>
  </div>

  {/* Status */}
  <span className="px-2.5 py-1 bg-[#F0FDF4] border border-[#BBF7D0]
                   text-[#16A34A] text-[10px] font-body font-semibold
                   tracking-[0.1em] uppercase rounded-full">
    Active
  </span>

  {/* Actions */}
  <button className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors">
    <span className="material-symbols-outlined text-[20px]">delete</span>
  </button>
</div>
```

### 6.7 Stat Card (Analytics)

```jsx
<div className="bg-white border border-[#E5E7EB] rounded-lg p-6
                shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-[#6B7280]">
        Emails Sent
      </p>
      <p className="text-2xl font-display font-semibold text-[#111827] mt-1">1,482</p>
      <p className="text-xs font-body text-[#6B7280] mt-1">
        <span className="text-[#16A34A] font-medium">↑ 12%</span> vs yesterday
      </p>
    </div>
    <div className="w-10 h-10 rounded-lg bg-[#EBF4FF] flex items-center justify-center">
      <span className="material-symbols-outlined text-[20px] text-[#0A84FF]"
            style={{ fontVariationSettings: "'FILL' 1" }}>
        mail
      </span>
    </div>
  </div>
</div>
```

### 6.8 Status Badge

```jsx
{/* Active */}
<span className="inline-flex items-center gap-1 px-2.5 py-1
                 bg-[#F0FDF4] border border-[#BBF7D0]
                 text-[#16A34A] text-[10px] font-body font-semibold
                 tracking-[0.1em] uppercase rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
  Sent
</span>

{/* Failed */}
<span className="inline-flex items-center gap-1 px-2.5 py-1
                 bg-[#FEF2F2] border border-[#FECACA]
                 text-[#DC2626] text-[10px] font-body font-semibold
                 tracking-[0.1em] uppercase rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] inline-block" />
  Failed
</span>

{/* Pending */}
<span className="inline-flex items-center gap-1 px-2.5 py-1
                 bg-[#FFFBEB] border border-[#FDE68A]
                 text-[#D97706] text-[10px] font-body font-semibold
                 tracking-[0.1em] uppercase rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] inline-block" />
  Pending
</span>
```

### 6.9 Code Block

```jsx
{/* API key / code snippet display */}
<div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden">
  {/* Header bar */}
  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E8F0]">
    <span className="text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-[#94A3B8]">
      Node.js
    </span>
    <button className="text-[10px] font-body font-medium text-[#0A84FF] hover:text-[#0071E3]
                       transition-colors flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px]">content_copy</span>
      Copy
    </button>
  </div>
  {/* Code */}
  <pre className="px-4 py-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#1E293B]">
    <code>{`const response = await fetch("https://api.plugmail.dev/api/send", {
  method: "POST",
  headers: { "x-api-key": "pk_live_••••••••" },
  body: JSON.stringify({
    to: "user@example.com",
    template: "welcome",
    variables: { name: "Atharva" }
  })
});`}
    </code>
  </pre>
</div>
```

### 6.10 Empty State

```jsx
<div className="flex flex-col items-center justify-center py-16 px-6 text-center">
  <div className="w-14 h-14 rounded-xl bg-[#EBF4FF] flex items-center justify-center mb-4">
    <span className="material-symbols-outlined text-[28px] text-[#0A84FF]"
          style={{ fontVariationSettings: "'FILL' 0" }}>
      vpn_key
    </span>
  </div>
  <h3 className="font-display font-semibold text-[#111827] text-base">No API keys yet</h3>
  <p className="font-body text-sm text-[#6B7280] mt-1.5 max-w-[280px] leading-relaxed">
    Create your first API key to start sending emails from your apps.
  </p>
  <button className="mt-5 ...primary button...">Create API Key</button>
</div>
```

### 6.11 Toast / Alert Banner

```jsx
{/* Success toast */}
<div className="flex items-start gap-3 px-4 py-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
  <span className="material-symbols-outlined text-[20px] text-[#16A34A] flex-shrink-0 mt-0.5"
        style={{ fontVariationSettings: "'FILL' 1" }}>
    check_circle
  </span>
  <div>
    <p className="text-sm font-body font-medium text-[#15803D]">Email sent successfully</p>
    <p className="text-xs font-body text-[#16A34A] mt-0.5">Delivered to user@example.com</p>
  </div>
</div>

{/* Error toast */}
<div className="flex items-start gap-3 px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
  <span className="material-symbols-outlined text-[20px] text-[#DC2626] flex-shrink-0 mt-0.5"
        style={{ fontVariationSettings: "'FILL' 1" }}>
    error
  </span>
  <div>
    <p className="text-sm font-body font-medium text-[#B91C1C]">Gmail authentication failed</p>
    <p className="text-xs font-body text-[#DC2626] mt-0.5">Check your App Password and try again.</p>
  </div>
</div>
```

### 6.12 Table (Email Logs)

```jsx
<table className="w-full">
  <thead>
    <tr className="border-b border-[#E5E7EB]">
      <th className="text-left px-6 py-3 text-[10px] font-body font-semibold
                     tracking-[0.15em] uppercase text-[#6B7280]">
        Recipient
      </th>
      <th className="text-left px-6 py-3 text-[10px] font-body font-semibold
                     tracking-[0.15em] uppercase text-[#6B7280]">
        Template
      </th>
      <th className="text-left px-6 py-3 text-[10px] font-body font-semibold
                     tracking-[0.15em] uppercase text-[#6B7280]">
        Status
      </th>
      <th className="text-left px-6 py-3 text-[10px] font-body font-semibold
                     tracking-[0.15em] uppercase text-[#6B7280]">
        Sent At
      </th>
    </tr>
  </thead>
  <tbody>
    {/* Row */}
    <tr className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors duration-100">
      <td className="px-6 py-[14px] text-sm font-body text-[#111827]">user@gmail.com</td>
      <td className="px-6 py-[14px] text-sm font-body text-[#374151]">welcome</td>
      <td className="px-6 py-[14px]"><StatusBadge status="sent" /></td>
      <td className="px-6 py-[14px] text-xs font-body text-[#6B7280]">May 9, 2025 · 14:22</td>
    </tr>
  </tbody>
</table>
```

### 6.13 Modal / Dialog

```jsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">

  {/* Dialog */}
  <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-[0_20px_25px_rgba(0,0,0,0.08)]
                  w-full max-w-md">

    {/* Header */}
    <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-start justify-between">
      <div>
        <h2 className="font-display font-semibold text-[#111827] text-lg">Create API Key</h2>
        <p className="text-sm font-body text-[#6B7280] mt-1">Give it a name to remember it by.</p>
      </div>
      <button className="text-[#9CA3AF] hover:text-[#374151] transition-colors -mt-0.5">
        <span className="material-symbols-outlined text-[22px]">close</span>
      </button>
    </div>

    {/* Body */}
    <div className="px-6 py-5">
      {/* form fields */}
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
      <button className="...secondary button...">Cancel</button>
      <button className="...primary button...">Create Key</button>
    </div>
  </div>
</div>
```

---

## Part 7 — Page Layouts

### 7.1 Overview / Dashboard Page

```
Layout: 4-column stat cards (gap-4) → full-width chart card → 2-column (logs table + quick send)
Header: "Good morning, Atharva. 👋" + date label
Stat cards: Emails Sent / Failed / Success Rate / Active Templates
```

### 7.2 API Keys Page

```
Layout: Page title + description + Create button → card with key list
Each row: Name / Masked key + copy / Status chip / Created date / Revoke button
Empty state: Icon + copy + CTA
```

### 7.3 Connected Gmail Accounts Page

```
Layout: Page title → Add Account button → account card list
Each account card: Gmail avatar (first letter) / email / Default badge / Remove button
Add modal: Gmail address input + App Password input (masked) + connect button
Warning banner: AES-256 encryption notice (info style)
```

### 7.4 Templates Page

```
Layout: Tabs (My Templates / Premade) → grid (3 cols desktop, 2 tablet, 1 mobile)
Template card: Category chip + name + subject preview + Use / Edit / Delete actions
Premade templates: Category filter chips at top (Welcome / OTP / Password Reset / etc.)
```

### 7.5 Playground Page

```
Layout: 2-column (editor left, preview right) on desktop / stacked on mobile
Left: Template selector dropdown + variables JSON editor (code font, line numbers) + Send Test button
Right: Rendered HTML preview in an iframe / preview panel + delivery status toast
```

### 7.6 Analytics Page

```
Layout: Date range picker (Last 7 / 30 / 90 days) → 4 stat cards → chart (area/bar) → logs table
Chart: Blue (#0A84FF) fill area chart for sent, red (#DC2626) line for failed
```

---

## Part 8 — Icon System

**Library: Material Symbols Outlined** (Google Fonts icon font).

```jsx
{/* Always set font-variation-settings explicitly */}
{/* Outlined — inactive/secondary states */}
<span className="material-symbols-outlined text-[#6B7280] text-[20px]">settings</span>

{/* Filled — active states, primary actions */}
<span className="material-symbols-outlined text-[#0A84FF] text-[20px]"
      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
  dashboard
</span>
```

**Icon size by context:**
```
16px → inside code blocks, inline with monospace text
18px → button icons
20px → nav icons, list item icons
24px → card feature icons, section icons
28px → empty state icons (in a container)
```

**Icon color rules:**
```
Active nav icon → text-[#0A84FF] filled
Inactive nav icon → text-[#6B7280] outlined
Button icon (primary) → text-white
Button icon (secondary) → text-[#6B7280]
Danger icon → text-[#DC2626] on hover
Metadata icon → text-[#9CA3AF]
```

---

## Part 9 — Animation System

### 9.1 Principles

```
RULE 1: Only animate transform and opacity. Never width, height, padding, margin.
RULE 2: Duration ladder:
         100ms → hover state changes (bg color, border)
         150ms → button press (active:scale-[0.98])
         200ms → component show/hide
         300ms → modal open/close
         Never exceed 400ms for any dashboard interaction.
RULE 3: Easing: ease-out for elements entering, ease-in for leaving, ease-in-out for repositioning.
RULE 4: No "bounce" or spring physics in a developer tool. It reads as unprofessional.
RULE 5: Stagger list items 40ms apart. Maximum 8 items staggered.
```

### 9.2 Standard Patterns

```css
/* Page content reveal */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-reveal { animation: fadeSlideUp 300ms ease-out forwards; }

/* Stagger utilities */
.stagger-1 { animation-delay: 40ms; }
.stagger-2 { animation-delay: 80ms; }
.stagger-3 { animation-delay: 120ms; }
.stagger-4 { animation-delay: 160ms; }
.stagger-5 { animation-delay: 200ms; }

/* Skeleton loading */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

### 9.3 Loading States

```jsx
{/* Skeleton card */}
<div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
  <div className="skeleton h-4 w-24 rounded mb-3" />
  <div className="skeleton h-8 w-32 rounded mb-2" />
  <div className="skeleton h-3 w-20 rounded" />
</div>

{/* Button spinner */}
<button disabled className="... opacity-70 cursor-not-allowed">
  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
  Sending...
</button>
```

---

## Part 10 — States & Interactions

Every interactive element must implement all five states:

```
DEFAULT  → White/transparent bg, standard border (#D1D5DB)
HOVER    → bg-[#F9FAFB], border darkens to #9CA3AF
FOCUS    → ring-2 ring-[#0A84FF]/30, border becomes #0A84FF
ACTIVE   → scale-[0.98], brief bg darken
DISABLED → opacity-50, cursor-not-allowed, no hover/active
```

```jsx
// Complete interactive pattern
<button className="
  px-4 py-2 rounded text-sm font-body font-medium
  bg-white border border-[#D1D5DB] text-[#374151]
  hover:bg-[#F9FAFB] hover:border-[#9CA3AF]
  active:scale-[0.98] active:bg-[#F3F4F6]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/30
  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  transition-all duration-150
">
```

---

## Part 11 — Responsive Rules

```
MOBILE (default):
  - Sidebar hidden (hamburger menu → slide-in drawer)
  - Single column layout
  - Cards stack vertically
  - px-4 (16px) horizontal gutter
  - Stat cards: 2-column grid, compact padding (p-4)
  - Tables become scrollable (overflow-x-auto)

TABLET (md: 768px):
  - Sidebar visible at 200px, icons + labels
  - 2-column stat grid
  - px-6 gutter

DESKTOP (lg: 1024px+):
  - Full sidebar (240px)
  - 4-column stat grid
  - px-8 gutter
  - 2-column playground
  - 3-column template grid
```

---

## Part 12 — Anti-Patterns (Never Do This)

```
❌ Dark backgrounds anywhere in the dashboard — this is a LIGHT theme
❌ Glassmorphism (backdrop-blur on content cards)
❌ Purple gradient CTAs — primary is blue only
❌ Gradient text on body copy
❌ More than 1 primary CTA button visible at once per section
❌ Shadows going in all directions (0 0 20px) — shadows are directional only
❌ Font-weight 800/900 — max 700 in developer UIs
❌ Centering body paragraphs longer than 2 lines
❌ Colored section backgrounds (no pink sections, no blue sections, no dark sections)
❌ Decorative blobs or ambient glows — this is not a consumer app
❌ Rainbow status colors — only the defined semantic palette (green/amber/red/blue)
❌ ALL CAPS text without tracking-[0.15em] — always spaced when uppercase
❌ Inline code in body text without DM Mono font
❌ Multiple shadows stacked on white cards — one subtle shadow only
❌ Placeholder icons (generic rocket, star) — use context-specific Material Symbols
```

---

## Part 13 — Production Signals

```
✅ DM Mono for every API key, endpoint path, code value — instantly signals "developer tool"
✅ Hairline borders (#E5E7EB) that define space without adding weight
✅ Typography: headline (DM Sans) + body (Inter) + code (DM Mono) — 3 fonts, each with a job
✅ Status badges: always color + dot + text — never color alone
✅ Table headers: ALL CAPS, 10px, tracking-[0.15em], text-[#6B7280] — not bold or prominent
✅ Empty states with a specific icon, specific copy, and a CTA — not "No data"
✅ Skeleton loading matches the shape of the real content exactly
✅ One shadow weight per elevation level — don't mix shadow-sm and shadow-lg on sibling cards
✅ Every card has a header with title + subtitle + action — three-level hierarchy
✅ Nav active state: filled icon + blue text + blue tinted bg — all three signals at once
✅ Masking API keys by default with toggle to reveal (eye icon)
✅ Success/error feedback appears within 300ms of action — no dead silence
```

---

## Part 14 — Hierarchy Verification

Before shipping any screen, confirm:

```
1. Is there ONE thing the eye goes to first? (Primary CTA, or main data headline)
2. Is the sidebar clearly subordinate to the content area?
3. Do stat cards use 3 levels: label (10px) → number (24px) → delta (12px)?
4. Are all interactive elements at least 36px tall (40px preferred)?
5. Is there breathing room between sections (32–40px gap)?
6. Does every color token serve a role — no decorative colors present?
7. Would a Vercel or Google engineer call this "clean and intentional"?
```

---

## Part 15 — globals.css (Full Token Setup)

```css
/* ─── globals.css ──────────────────────────────────────────────────── */

/* 1. Tailwind v4 import */
@import "tailwindcss";

/* 2. Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* 3. Source scanning */
@source "../src/**/*.{js,jsx,ts,tsx,html}";

/* 4. Dark mode (opt-in, not used by default in PlugMail) */
@custom-variant dark (&:where(.dark, .dark *));

/* 5. Design tokens */
@theme {
  /* Fonts */
  --font-display: "DM Sans", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "DM Mono", "Fira Code", monospace;

  /* Radius */
  --radius-sm:   0.25rem;
  --radius:      0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs:      0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:      0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow:         0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-md:      0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.04);
  --shadow-lg:      0 20px 25px rgba(0,0,0,0.06), 0 10px 10px rgba(0,0,0,0.03);
  --shadow-primary: 0 4px 14px rgba(10,132,255,0.25);

  /* Brand colors */
  --color-primary:         #0A84FF;
  --color-primary-hover:   #0071E3;
  --color-primary-active:  #005DC0;
  --color-primary-subtle:  #EBF4FF;
  --color-primary-border:  #BAD8FF;
  --color-on-primary:      #FFFFFF;

  /* Surfaces */
  --color-surface:         #FFFFFF;
  --color-surface-raised:  #FAFAFA;
  --color-surface-overlay: #F3F4F6;
  --color-surface-sunken:  #F8FAFC;
  --color-surface-border:  #E5E7EB;
  --color-surface-border-strong: #D1D5DB;

  /* Text */
  --color-text-primary:    #111827;
  --color-text-secondary:  #374151;
  --color-text-tertiary:   #6B7280;
  --color-text-disabled:   #9CA3AF;
  --color-text-inverse:    #FFFFFF;
  --color-text-link:       #0A84FF;

  /* Semantic */
  --color-success:         #16A34A;
  --color-success-subtle:  #F0FDF4;
  --color-success-border:  #BBF7D0;
  --color-warning:         #D97706;
  --color-warning-subtle:  #FFFBEB;
  --color-warning-border:  #FDE68A;
  --color-error:           #DC2626;
  --color-error-subtle:    #FEF2F2;
  --color-error-border:    #FECACA;

  /* Code */
  --color-code-bg:         #F8FAFC;
  --color-code-border:     #E2E8F0;
  --color-code-text:       #1E293B;
  --color-code-comment:    #94A3B8;

  /* Animations */
  --animate-reveal:  fadeSlideUp 300ms ease-out forwards;
  --animate-fade-in: fadeIn 200ms ease-out forwards;
}

/* Keyframes */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* Plugin */
@plugin "@tailwindcss/forms";

/* Global resets */
@layer base {
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  html { background-color: #FFFFFF; }
  body {
    font-family: var(--font-body);
    color: #111827;
    min-height: 100dvh;
  }
  ::selection {
    background: rgba(10,132,255,0.15);
    color: #111827;
  }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 9999px; }
  ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
}

/* Component utilities */
@layer components {
  .skeleton {
    background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 0.375rem;
  }
  .animate-reveal { animation: fadeSlideUp 300ms ease-out forwards; }
  .stagger-1 { animation-delay: 40ms; }
  .stagger-2 { animation-delay: 80ms; }
  .stagger-3 { animation-delay: 120ms; }
  .stagger-4 { animation-delay: 160ms; }
  .stagger-5 { animation-delay: 200ms; }
  .section-label {
    @apply font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-text-tertiary;
  }
  .card {
    @apply bg-white border border-surface-border rounded-lg
           shadow-[0_1px_3px_rgba(0,0,0,0.08)];
  }
  .btn-primary {
    @apply inline-flex items-center gap-2 px-4 py-2
           bg-primary hover:bg-primary-hover active:bg-primary-active
           text-on-primary text-sm font-body font-medium
           rounded shadow-[0_4px_14px_rgba(10,132,255,0.25)]
           transition-all duration-150 active:scale-[0.98]
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40;
  }
  .btn-secondary {
    @apply inline-flex items-center gap-2 px-4 py-2
           bg-white hover:bg-surface-raised active:bg-surface-overlay
           text-text-secondary text-sm font-body font-medium
           border border-surface-border-strong
           rounded transition-all duration-150 active:scale-[0.98]
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30;
  }
}
```

---

## Part 16 — package.json

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.9",
    "@tailwindcss/vite": "^4.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^4.2.0",
    "vite": "^6.0.0"
  }
}
```

```
❌ Do NOT install: autoprefixer, postcss, tailwindcss-cli
   The @tailwindcss/vite plugin replaces all of these.
```

---

## Part 17 — Agent Decision Tree

When building any PlugMail screen:

```
1. TOKENS FIRST
   → Use globals.css from Part 15. No hardcoded hex values outside the token file.

2. LAYOUT
   → Sidebar shell (Part 5.1) + correct page layout from Part 7.

3. SURFACES
   → White cards (#FFFFFF) with border-[#E5E7EB] and shadow-[0_1px_3px_rgba(0,0,0,0.08)].
   → No glassmorphism. No dark surfaces. No gradient backgrounds.

4. TYPOGRAPHY HIERARCHY
   → Heading: font-display (DM Sans), font-semibold/bold
   → Body: font-body (Inter), font-normal or font-medium
   → Code/Keys: font-mono (DM Mono) — no exceptions
   → Labels: 10px ALL CAPS, tracking-[0.15em], text-text-tertiary

5. COMPONENTS
   → Use exact patterns from Part 6. No improvising button shapes or card styles.

6. STATES
   → Every interactive element: hover / active / focus / disabled defined.

7. ANIMATIONS
   → Page reveal: animate-reveal (300ms fadeSlideUp)
   → Button press: active:scale-[0.98]
   → No bounce, no spring, no ambient blobs.

8. FINAL CHECK (Part 14)
   → Would a Vercel engineer ship this? If yes — done.
```

---

*This document defines the PlugMail frontend standard. Every screen, every component, every pixel
must comply. No exceptions for "quick builds" — the token system makes speed and quality coexist.*