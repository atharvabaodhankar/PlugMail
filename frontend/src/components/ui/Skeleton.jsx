export default function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export function SkeletonStatCard() {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-8 w-28 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#E5E7EB] px-6">
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-1.5" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-7 w-40 rounded" />
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-5 w-5 rounded" />
    </div>
  )
}
