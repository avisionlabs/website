'use client'

import { useEffect, useMemo, useState } from 'react'

type Printer = {
  id: number
  name: string
  color: string
  category: string
  inStock: boolean
  price?: number
  description?: string
}


const colorOptions = [
  { value: 'white', label: 'White', color: '#FFFFFF' },
  { value: 'black', label: 'Black', color: '#000000' },
]

const categoryOptions = [
  { value: 'all-new-arrivals', label: 'All New Arrivals' },
  { value: 'tees', label: 'Tees' },
  { value: 'crewnecks', label: 'Crewnecks' },
  { value: 'sweatshirts', label: 'Sweatshirts' },
  { value: 'pants-shorts', label: 'Pants & Shorts' },
]

export default function Printers() {
  const [printers, setPrinters] = useState<Printer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filteredPrinters = useMemo(() => {
    let items = printers
    if (search.trim()) {
      const term = search.toLowerCase()
      items = items.filter((printer) =>
        [printer.name, printer.category, printer.color, printer.description ?? '']
          .join(' ')
          .toLowerCase()
          .includes(term)
      )
    }
    return items
  }, [printers, search])

  useEffect(() => {
    const controller = new AbortController()

    async function loadPrinters() {
      setLoading(true)
      setError(null)

      try {
        const url = new URL('http://localhost:3000/api/printers')
        if (selectedColor) url.searchParams.set('color', selectedColor)
        if (selectedCategory) url.searchParams.set('category', selectedCategory)

        const response = await fetch(url.toString(), { signal: controller.signal })
        if (!response.ok) throw new Error(`Failed to load printers: ${response.status}`)

        const data = (await response.json()) as Printer[]
        setPrinters(data)
      } catch (err) {
        if ((err as DOMException).name !== 'AbortError') {
          setError((err as Error).message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadPrinters()

    return () => controller.abort()
  }, [selectedColor, selectedCategory])

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* Header */}
        <div className="pt-16 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Printers</h1>
          <p className="mt-2 text-md text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with four openings!
          </p>
          <hr className="mt-6 border-gray-200" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-x-8 pb-24 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            {/* Color */}
            <div className="py-6">
              <h3 className="mb-4 text-md font-semibold text-gray-900">Color</h3>
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`rounded border px-2 py-1 text-sm ${
                      selectedColor === opt.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedColor(selectedColor === opt.value ? null : opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Category */}
            <div className="py-6">
              <h3 className="mb-4 text-md font-semibold text-gray-900">Category</h3>
              <div className="grid grid-cols-1 gap-2">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`rounded border px-2 py-1 text-sm ${
                      selectedCategory === opt.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === opt.value ? null : opt.value)}
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search printers..."
                className="w-full rounded border-gray-300 px-3 py-2 focus:ring-indigo-500"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Clear filter */}
            <div className="py-6">
              <button
                onClick={() => {
                  setSelectedColor(null)
                  setSelectedCategory(null)
                  setSearch('')
                }}
                className="rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {loading && <p className="text-lg text-gray-600">Loading printers...</p>}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}
            {!loading && !error && filteredPrinters.length === 0 && (
              <p className="text-lg text-gray-600">No printers found.</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrinters.map((printer) => (
                <div key={printer.id} className="rounded-lg border p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{printer.name}</h3>
                  <p className="text-sm text-gray-600">Category: {printer.category}</p>
                  <p className="text-sm text-gray-600">Color: {printer.color}</p>
                  <p className="text-sm text-gray-600">In stock: {printer.inStock ? 'Yes' : 'No'}</p>
                  {printer.price != null && <p className="text-sm text-gray-900">${printer.price}</p>}
                  {printer.description && <p className="text-sm text-gray-700">{printer.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
