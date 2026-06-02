import { useState, useEffect, useMemo } from 'react'
import { ChevronUpIcon, ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline'
import { apiUrl } from '../../lib/api'
import { useDebounce } from '../../hooks/useDebounce'
import AdminDrawer from './AdminDrawer'
import { AdminTableSkeleton } from '../../components/Skeletons'

export type AdminProduct = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean
  onWebsite: boolean
  category: string
  subcategory: string
  series: string
  url: string
  description: string | null
}

export type DrawerProduct = {
  id: number
  model: string
  category: string
  series: string
  url: string
  imageUrl: string | null
  description: string | null
  inStock: boolean
  onWebsite: boolean
}

type FilterType = 'all' | 'scanner' | 'printer' | 'mfp'
type SortKey = 'model' | 'category' | 'subcategory' | 'series' | 'inStock' | 'onWebsite'
type SortDir = 'asc' | 'desc'

const PAGE_SIZE = 50

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'scanner', label: 'Scanner' },
  { key: 'printer', label: 'Printer' },
  { key: 'mfp', label: 'MFP' },
]

const COLUMNS: { key: SortKey; label: string; center?: boolean }[] = [
  { key: 'model', label: 'Model' },
  { key: 'category', label: 'Category' },
  { key: 'subcategory', label: 'Type' },
  { key: 'series', label: 'Series' },
  { key: 'inStock', label: 'In Stock', center: true },
  { key: 'onWebsite', label: 'On Website', center: true },
]

function formatSubcategory(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, '$1 $2')
}

function matchesFilter(p: AdminProduct, filter: FilterType): boolean {
  if (filter === 'all') return true
  if (filter === 'scanner') return p.category === 'Scanners'
  const isMfp = p.subcategory.toLowerCase().includes('mfp')
  if (filter === 'mfp') return isMfp
  if (filter === 'printer') return p.category !== 'Scanners' && !isMfp
  return true
}

function sortProducts(products: AdminProduct[], key: SortKey, dir: SortDir): AdminProduct[] {
  return [...products].sort((a, b) => {
    const av = String(a[key] ?? '').toLowerCase()
    const bv = String(b[key] ?? '').toLowerCase()
    const primary = av < bv ? -1 : av > bv ? 1 : 0
    if (primary !== 0) return dir === 'asc' ? primary : -primary
    const stockCmp = (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)
    if (stockCmp !== 0) return stockCmp
    const webCmp = (b.onWebsite ? 1 : 0) - (a.onWebsite ? 1 : 0)
    if (webCmp !== 0) return webCmp
    return a.model.toLowerCase() < b.model.toLowerCase() ? -1 : 1
  })
}

export default function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>('inStock')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedProduct, setSelectedProduct] = useState<DrawerProduct | null>(null)

  const debouncedSearch = useDebounce((value: string) => {
    setSearchQuery(value)
    setPage(1)
  }, 300)

  useEffect(() => {
    fetch(apiUrl('/api/admin/products'))
      .then(r => r.json())
      .then((data: AdminProduct[]) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categoryOptions = useMemo(
    () => [...new Set(products.map(p => p.subcategory))].sort(),
    [products],
  )
  const seriesOptions = useMemo(
    () => [...new Set(products.map(p => p.series).filter(Boolean))].sort(),
    [products],
  )

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  function handleFilterChange(f: FilterType) {
    setFilter(f)
    setPage(1)
  }

  function handleRowDoubleClick(p: AdminProduct) {
    openEditor(p)
  }

  function openEditor(p: AdminProduct) {
    setSelectedProduct({
      id: p.id,
      model: p.model,
      category: p.subcategory,
      series: p.series,
      url: p.url,
      imageUrl: p.imageUrl,
      description: p.description,
      inStock: p.inStock,
      onWebsite: p.onWebsite,
    })
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  function handleAddProduct() {
    setSelectedProduct(null)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  function handleProductSaved(saved: AdminProduct) {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === saved.id)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = saved
        return next
      }
      return [...prev, saved]
    })
  }

  function handleToggle(e: React.MouseEvent, p: AdminProduct, field: 'inStock' | 'onWebsite') {
    e.stopPropagation()
    const newValue = !p[field]
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, [field]: newValue } : x))
    fetch(apiUrl(`/api/admin/products/${p.id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: newValue }),
    }).then(r => {
      if (!r.ok) setProducts(prev => prev.map(x => x.id === p.id ? { ...x, [field]: p[field] } : x))
    }).catch(() => {
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, [field]: p[field] } : x))
    })
  }

  const filtered = sortProducts(
    products.filter(p => {
      if (!matchesFilter(p, filter)) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          p.model.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q)
        )
      }
      return true
    }),
    sortKey,
    sortDir,
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="pt-10 pb-6 sm:pt-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Page</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-md">
          Add, edit, and hide products here. Make sure to save edits to see changes.
        </p>
        <hr className="mt-6 border-gray-200" />
      </div>

      {/* Filters + search + count */}
      <div className="mb-0 flex flex-col gap-3 border-b border-gray-200 sm:flex-row sm:items-end sm:gap-0">
        <div className="flex flex-wrap gap-2 overflow-x-auto sm:gap-0">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleFilterChange(key)}
              className={`px-4 py-2 text-sm font-medium transition border rounded-t-lg sm:px-5 sm:py-2.5 sm:border-x sm:border-t sm:-mb-px ${
                filter === key
                  ? 'border-gray-200 bg-white text-[var(--accent)] sm:border-b-white'
                  : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 sm:border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-3 pb-3 sm:ml-auto sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:pb-1.5 sm:mb-3">
          <input
            type="search"
            placeholder="Search model, type, series…"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              debouncedSearch(e.target.value)
            }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] sm:max-w-md sm:py-1.5"
          />
          <button
            type="button"
            onClick={handleAddProduct}
            className="shrink-0 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary)] sm:py-1.5"
          >
            + Add product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-xl rounded-tr-xl border border-gray-200 bg-white sm:-mx-4">
        <table className="min-w-[920px] divide-y divide-gray-200 sm:min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-16 px-4 py-3" />
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:text-gray-800 whitespace-nowrap ${col.center ? 'text-center' : 'text-left'}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <span className="flex flex-col leading-none">
                      <ChevronUpIcon className={`h-2.5 w-2.5 ${sortKey === col.key && sortDir === 'asc' ? 'text-[var(--accent)]' : 'text-gray-300'}`} />
                      <ChevronDownIcon className={`h-2.5 w-2.5 ${sortKey === col.key && sortDir === 'desc' ? 'text-[var(--accent)]' : 'text-gray-300'}`} />
                    </span>
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 sm:hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <AdminTableSkeleton />
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center text-sm text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              paginated.map(p => (
                <tr
                  key={p.id}
                  className="cursor-pointer select-none hover:bg-gray-50"
                  onDoubleClick={() => handleRowDoubleClick(p)}
                >
                  <td className="px-4 py-3">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.model}
                        loading="lazy"
                        className="h-10 w-10 rounded bg-gray-100 object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.model}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatSubcategory(p.subcategory)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.series || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={p.inStock}
                      onClick={e => handleToggle(e, p, 'inStock')}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                        p.inStock ? 'bg-[var(--secondary)]' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
                        p.inStock ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={p.onWebsite}
                      onClick={e => handleToggle(e, p, 'onWebsite')}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                        p.onWebsite ? 'bg-[var(--accent)]' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
                        p.onWebsite ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right sm:hidden">
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation()
                        openEditor(p)
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      aria-label={`Edit ${p.model}`}
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-3 pb-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          {loading ? '' : `Page ${page} of ${totalPages} · ${filtered.length} total`}
        </p>
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <AdminDrawer
        mode={drawerMode}
        product={selectedProduct}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={handleProductSaved}
        categoryOptions={categoryOptions}
        seriesOptions={seriesOptions}
      />
    </main>
  )
}
