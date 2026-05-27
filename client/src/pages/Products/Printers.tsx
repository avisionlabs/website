'use client'

import ProductsTable from '../../components/ProductsTable'
import { ProductsSkeleton } from '../../components/Skeletons'
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

export default function Printers() {
  const {
    search,
    view,
    handleSearchChange,
    handleViewChange,
    handleClear,
  } = useProductFilters()

  const [searchInput, setSearchInput] = useState(search)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSearchInput(search)
  }, [search])

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
                value={searchInput}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchInput(value)
                  handleSearchChange(value)
                }}
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
            <ProductsTable products={filtered} view={view} onViewChange={handleViewChange}/>
          </div>
        </div>
      </main>
    </div>
  )
}
