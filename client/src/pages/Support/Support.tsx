import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Catalogue from './Catalogue'
import { useDebounce } from '../../hooks/useDebounce'

export default function Support() {
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const debouncedSetSearch = useDebounce(setSearch, 300)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-20 pb-14 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-[var(--text-h)] sm:text-5xl">
            Search by model.<br />Get manuals, brochures, and support docs instantly.
          </h2>

          {/* Search bar */}
          <div className="mt-10 flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-[0_4px_24px_rgba(15,49,146,0.25)] border border-gray-100">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value
                setSearchInput(value)
                debouncedSetSearch(value)
              }}
              placeholder="Which model are you looking for?"
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-base focus:outline-none min-w-0"
            />
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-7xl px-6 lg:px-0 pb-24 pt-8">
        <Catalogue search={search} />
      </section>
    </div>
  )
}
