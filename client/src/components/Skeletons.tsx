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
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 h-4 w-16 rounded bg-gray-200 animate-pulse" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 animate-pulse" />

          <div className="flex flex-col animate-pulse">
            <div className="mb-2 h-3 w-40 rounded bg-gray-100" />
            <div className="h-9 w-3/4 rounded bg-gray-200" />
            <div className="mt-4 space-y-2">
              <div className="h-3.5 w-full rounded bg-gray-100" />
              <div className="h-3.5 w-full rounded bg-gray-100" />
              <div className="h-3.5 w-5/6 rounded bg-gray-100" />
              <div className="h-3.5 w-4/6 rounded bg-gray-100" />
            </div>
            <div className="mt-8 h-10 w-40 rounded-lg bg-gray-200" />
          </div>
        </div>

        <div className="mt-16 animate-pulse">
          <div className="flex gap-6 border-b border-gray-200 pb-3">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-100" />
            <div className="h-4 w-28 rounded bg-gray-100" />
          </div>

          <div className="mt-6 space-y-6">
            {[8, 5, 4].map((rowCount, groupIdx) => (
              <div
                key={groupIdx}
                className="overflow-hidden rounded-lg border border-gray-200"
              >
                <div className="h-9 w-full bg-gray-200" />
                {Array.from({ length: rowCount }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-2.5 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className="h-3 rounded bg-gray-200"
                      style={{ width: `${100 + (i % 3) * 24}px` }}
                    />
                    <div
                      className="h-3 rounded bg-gray-100"
                      style={{ width: `${80 + (i % 4) * 16}px` }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
