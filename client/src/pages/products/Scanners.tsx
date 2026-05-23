'use client'

import ProductsTable from '../../components/ProductsTable'
import { useEffect, useMemo, useState } from 'react'
import { useProductFilters } from "../../hooks/useProductFilters"
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
  { value: 'DocumentScanner',  label: 'Document Scanner' },
  { value: 'Flatbed Scanner',  label: 'Flatbed Scanner' },
  { value: 'Network Scanner',  label: 'Network Scanner' },
  { value: 'Mobile Scanner',   label: 'Mobile Scanner' },
  { value: 'PaperAir Series',  label: 'PaperAir Series' },
]

export default function Scanners() {
  const {
    selectedSubcategory,
    search,
    view,
    handleSubcategoryChange,
    handleSearchChange,
    handleViewChange,
    handleClear,
  } = useProductFilters()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [availableSubcategories, setAvailableSubcategories] = useState<Set<string> | null>(null)

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

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({ category: 'Scanners' })
        if (selectedSubcategory) params.set('subcategory', selectedSubcategory)

        const res = await fetch(apiUrl(`/api/products?${params}`), { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`)

        const data: Product[] = await res.json()
        if (active) {
          setProducts(data)
          if (!selectedSubcategory) {
            setAvailableSubcategories(
              new Set(data.filter(p => p.inStock).map(p => p.subcategory).filter(Boolean) as string[])
            )
          }
        }
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
  }, [selectedSubcategory])

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* Header */}
        <div className="pt-16 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Scanners</h1>
          <p className="mt-2 text-md text-gray-500">
            Browse our full lineup of document, flatbed, network, mobile, and PaperAir scanners.
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
                {subcategoryOptions.filter(opt => !availableSubcategories || availableSubcategories.has(opt.value)).map((opt) => (
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

            <ProductsTable products={filtered} view={view} onViewChange={handleViewChange} />
          </div>
        </div>
      </main>
    </div>
  )
}
