'use client'

import PrintersTable from '../../components/PrintersTable'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiUrl } from '../../lib/api'

type Product = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean | null
  category: string | null
  subcategory: string | null
}

const subcategoryOptions = [
  { value: 'Document Scanners',  label: 'Document Scanners' },
  { value: 'Book Scanners',      label: 'Book Scanners' },
  { value: 'Network Scanners',   label: 'Network Scanners' },
  { value: 'Production Scanners', label: 'Production Scanners' },
]

export default function Scanners() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const selectedSubcategory = searchParams.get('subcategory')
  const search = searchParams.get('q') ?? ''
  const view = (searchParams.get('view') ?? 'grid') as 'grid' | 'list'

  const handleSubcategoryChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (next.get('subcategory') === value) {
        next.delete('subcategory')
      } else {
        next.set('subcategory', value)
      }
      return next
    }, { replace: true })
  }

  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value.trim()) {
        next.set('q', value)
      } else {
        next.delete('q')
      }
      return next
    }, { replace: true })
  }
  
  const handleViewChange = (value: 'grid' | 'list') => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value === 'list') {
        next.set('view', 'list')
      } else {
        next.delete('view')
      }
      return next
    }, { replace: true })
  }

  const handleClear = () => {
    setSearchParams(
      view === 'list' ? { view: 'list' } : {},
      { replace: true }
    )
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const term = search.toLowerCase()
    return products.filter((p) =>
      [p.model, p.subcategory ?? ''].join(' ').toLowerCase().includes(term)
    )
  }, [products, search])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({ category: 'Scanners' })
        if (selectedSubcategory) params.set('subcategory', selectedSubcategory)

        const res = await fetch(apiUrl(`/api/products?${params}`), { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`)

        setProducts(await res.json())
      } catch (err) {
        if ((err as DOMException).name !== 'AbortError') {
          setError((err as Error).message)
        }
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [selectedSubcategory])

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* Header */}
        <div className="pt-16 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Scanners</h1>
          <p className="mt-2 text-md text-gray-500">
            Browse our full lineup of document, book, network, and production scanners.
          </p>
          <hr className="mt-6 border-gray-200" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-x-8 pb-24 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            {/* Subcategory */}
            <div className="pb-6">
              <h3 className="mb-4 text-md font-semibold text-gray-900">Type</h3>
              <div className="grid grid-cols-1 gap-2">
                {subcategoryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`rounded border px-2 py-1 text-sm ${
                      selectedSubcategory === opt.value
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSubcategoryChange(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Search */}
            <div className="py-6">
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
            {loading && <p className="text-lg text-gray-600">Loading...</p>}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}
            {!loading && !error && filtered.length === 0 && (
              <p className="text-lg text-gray-600">No products found.</p>
            )}

            <PrintersTable products={filtered} view={view} onViewChange={handleViewChange} />
          </div>
        </div>
      </main>
    </div>
  )
}
