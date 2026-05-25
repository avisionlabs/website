import { useEffect, useMemo, useState } from 'react'
import ProductsTable from '../../components/ProductsTable'
import { ProductsSkeleton } from '../../components/Skeletons'
import { apiUrl } from '../../lib/api'

type Product = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean | null
  category: string | null
  subcategory: string | null
}

function getLink(p: Product): string {
  const base = p.category === 'Scanners' ? '/scanners' : '/printers'
  return `${base}/${encodeURIComponent(p.model)}`
}

const CATEGORY_OPTIONS = [
  { label: 'All Products',    value: '' },
  { label: 'Scanners',        value: 'Scanners' },
  { label: 'Printers & MFPs', value: 'Printers and MFPs' },
]

const SUBCATEGORY_LABELS: Record<string, string> = {
  DocumentScanner:  'Document Scanner',
  'Flatbed Scanner': 'Flatbed Scanner',
  'Network Scanner': 'Network Scanner',
  'Mobile Scanner':  'Mobile Scanner',
  'PaperAir Series': 'PaperAir Series',
}

function subcategoryLabel(s: string): string {
  return SUBCATEGORY_LABELS[s] ?? s.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export default function Catalogue({ search }: { search: string }) {
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams()
        if (category) params.set('category', category)

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
  }, [category])

  const availableSubcategories = useMemo(() =>
    Array.from(new Set(products.map(p => p.subcategory).filter(Boolean) as string[]))
  , [products])

  const filtered = useMemo(() => {
    let result = products
    if (subcategory) result = result.filter(p => p.subcategory === subcategory)
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(p =>
        [p.model, p.subcategory ?? '', p.category ?? ''].join(' ').toLowerCase().includes(term)
      )
    }
    if (inStockOnly) result = result.filter(p => p.inStock === true)
    return [...result].sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0))
  }, [products, subcategory, search, inStockOnly])

  function handleCategoryChange(val: string) {
    setCategory(val)
    setSubcategory('')
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-4">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        {/* Product type */}
        <div className="pb-6">
          <h3 className="mb-4 text-md font-semibold text-gray-900">Product</h3>
          <div className="grid grid-cols-1 gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleCategoryChange(opt.value)}
                className={`rounded border px-2 py-1 text-sm text-left ${
                  category === opt.value
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Subcategory */}
        {availableSubcategories.length > 0 && (
          <>
            <div className="py-6">
              <h3 className="mb-4 text-md font-semibold text-gray-900">Type</h3>
              <div className="grid grid-cols-1 gap-2">
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubcategory(subcategory === sub ? '' : sub)}
                    className={`rounded border px-2 py-1 text-sm text-left ${
                      subcategory === sub
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {subcategoryLabel(sub)}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />
          </>
        )}

        {/* In Stock */}
        <div className="py-6">
          <h3 className="mb-4 text-md font-semibold text-gray-900">Availability</h3>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
            />
            <span className="text-sm text-gray-800">In Stock Only</span>
          </label>
        </div>

        <hr className="border-gray-200" />

        {/* Clear */}
        <div className="py-6">
          <button
            onClick={() => { setCategory(''); setSubcategory(''); setInStockOnly(false) }}
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
          <p className="text-lg text-gray-500">No products found.</p>
        )}
        {!loading && !error && filtered.length > 0 && (
          <ProductsTable
            products={filtered}
            view={view}
            onViewChange={setView}
            getProductLink={getLink}
          />
        )}
      </div>
    </div>
  )
}
