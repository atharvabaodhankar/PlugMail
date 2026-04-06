export default function Input({ label, helper, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-body font-medium text-[#374151]">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full h-10 px-3
          bg-white
          border rounded
          text-sm font-body text-[#111827]
          placeholder:text-[#9CA3AF]
          transition-all duration-150
          hover:border-[#9CA3AF]
          focus:outline-none focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F9FAFB]
          ${error ? 'border-[#FECACA] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : 'border-[#D1D5DB]'}
        `}
      />
      {error && <p className="text-xs font-body text-[#DC2626]">{error}</p>}
      {!error && helper && <p className="text-xs font-body text-[#6B7280]">{helper}</p>}
    </div>
  )
}
