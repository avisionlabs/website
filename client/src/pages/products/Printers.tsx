'use client'

import ProductsTable from '../../components/ProductsTable'
import { useEffect, useMemo, useState } from 'react'
import { useProductFilters } from '../../hooks/useProductFilters'
import { apiUrl } from '../../lib/api'

type Product = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean | null
  category: string | null
  subcategory: string | null
}

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

function ProductsSkeleton({ view }: { view: 'grid' | 'list' }) {
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

export default function Printers() {
  const {
    search,
    view,
    handleSearchChange,
    handleViewChange,
    handleClear,
  } = useProductFilters()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (!p.inStock) return false
      if (!search.trim()) return true
      const term = search.toLowerCase()
      return [p.model, p.subcategory ?? ''].join(' ').toLowerCase().includes(term)
    })
  }, [products, search])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoading(true)
    setError(null)

    async function load() {
      try {
        const params = new URLSearchParams({ category: 'Printers and MFPs' })

        const res = await fetch(apiUrl(`/api/products?${params}`), { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`)

        const data: Product[] = await res.json()
        if (active) setProducts(data)
      } catch (err) {
        if (active && (err as DOMException).name !== 'AbortError') {
          setError((err as Error).message)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => { active = false; controller.abort() }
  }, [])

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* Header */}
        <div className="pt-16 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Printers & MFPs</h1>
          <p className="mt-2 text-md text-gray-500">
            Browse our full lineup of printers and multifunction devices.
          </p>
          <hr className="mt-6 border-gray-200" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-x-8 pb-24 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            {/* Search */}
            <div className="pb-6">
              <h3 className="mb-4 text-md font-semibold text-gray-900">Search</h3>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by model..."
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Clear filters */}
            <div className="py-6">
              <button
                onClick={handleClear}
                className="rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {loading && <ProductsSkeleton view={view} />}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}
            {!loading && !error && filtered.length === 0 && (
              <p className="text-lg text-gray-600">No products found.</p>
            )}

            <ProductsTable products={filtered} view={view} onViewChange={handleViewChange}/>
          </div>
        </div>
      </main>
    </div>
  )
}
