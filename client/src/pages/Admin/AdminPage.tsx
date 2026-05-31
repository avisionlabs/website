import { useState, useEffect } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { apiUrl } from '../../lib/api'
import { useDebounce } from '../../hooks/useDebounce'

type AdminProduct = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean
  onWebsite: boolean
  category: string
  subcategory: string
  series: string
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

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'model', label: 'Model' },
  { key: 'category', label: 'Category' },
  { key: 'subcategory', label: 'Type' },
  { key: 'series', label: 'Series' },
  { key: 'inStock', label: 'In Stock' },
  { key: 'onWebsite', label: 'On Website' },
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
    // tiebreakers: inStock desc → onWebsite desc → model asc
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
    <main className="mx-auto max-w-7xl px-6 lg:px-0">
      {/* Header */}
      <div className="pt-16 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Admin Page</h1>
        <p className="mt-2 text-md text-gray-500">
          Add, edit, and hide products here. Make sure to save edits to see changes.
        </p>
        <hr className="mt-6 border-gray-200" />
      </div>

      {/* Filters + search + count */}
      <div className="mb-0 flex items-end gap-0 border-b border-gray-200">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleFilterChange(key)}
            className={`px-5 py-2.5 text-sm font-medium transition border-x border-t rounded-t-lg -mb-px ${
              filter === key
                ? 'border-gray-200 bg-white text-[var(--accent)] border-b-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 pb-1.5">
          <input
            type="search"
            placeholder="Search model, type, series…"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              debouncedSearch(e.target.value)
            }}
            className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {loading ? '…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-b-xl rounded-tr-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-16 px-4 py-3" />
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:text-gray-800 whitespace-nowrap"
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3"><div className="h-10 w-10 rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-10 rounded-full bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-14 rounded-full bg-gray-200" /></td>
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-sm text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              paginated.map(p => (
                <tr
                  key={p.id}
                  className="cursor-pointer select-none hover:bg-gray-50"
                  onDoubleClick={() => {/* drawer — coming soon */}}
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
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.inStock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {p.inStock ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.onWebsite ? 'bg-blue-50 text-[var(--accent)]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {p.onWebsite ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between pb-12">
        <p className="text-sm text-gray-500">
          {loading ? '' : `Page ${page} of ${totalPages} · ${filtered.length} total`}
        </p>
        <div className="flex gap-2">
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
    </main>
  )
}
