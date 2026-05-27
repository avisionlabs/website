function GridCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-square w-full xl:aspect-7/8 rounded-lg bg-gray-200" />
      <div className="mt-4 flex justify-between">
        <div className="space-y-2">
          <div className="h-3.5 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-100" />
        </div>
        <div className="h-5 w-14 rounded-full bg-gray-200 self-start" />
      </div>
    </div>
  )
}

function ListRowSkeleton() {
  return (
    <li className="animate-pulse flex items-center gap-4 py-4 px-3">
      <div className="h-16 w-16 rounded-md bg-gray-200 shrink-0" />
      <div className="flex flex-1 justify-between">
        <div className="space-y-2">
          <div className="h-3.5 w-40 rounded bg-gray-200" />
          <div className="h-3 w-28 rounded bg-gray-100" />
        </div>
        <div className="h-5 w-14 rounded-full bg-gray-200 self-center" />
      </div>
    </li>
  )
}

export function ProductsSkeleton({ view }: { view: 'grid' | 'list' }) {
  return (
    <div>
      <div className="h-9 mb-4" />
      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {Array.from({ length: 6 }).map((_, i) => <GridCardSkeleton key={i} />)}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {Array.from({ length: 6 }).map((_, i) => <ListRowSkeleton key={i} />)}
        </ul>
      )}
    </div>
  )
}

export function ProductOverviewSkeleton() {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-0">
        <div className="mb-8 h-4 w-12 rounded bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-10 w-10 animate-spin text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col animate-pulse">
            <div className="mb-2 h-3 w-36 rounded bg-gray-100" />
            <div className="h-8 w-64 rounded bg-gray-200" />
            <div className="mt-3 h-5 w-16 rounded-full bg-gray-200" />
            <div className="mt-8 space-y-2">
              <div className="h-3.5 w-full rounded bg-gray-100" />
              <div className="h-3.5 w-full rounded bg-gray-100" />
              <div className="h-3.5 w-5/6 rounded bg-gray-100" />
              <div className="h-3.5 w-4/6 rounded bg-gray-100" />
            </div>
            <div className="mt-8 h-11 w-36 rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="mt-16 animate-pulse">
          <div className="flex gap-6 border-b border-gray-200 pb-3">
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-4 w-36 rounded bg-gray-100" />
          </div>
          <div className="mt-6 grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
                <div className="h-3 rounded bg-gray-100" style={{ width: `${90 + (i % 4) * 20}px` }} />
                <div className="h-3 rounded bg-gray-200" style={{ width: `${60 + (i % 3) * 15}px` }} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
