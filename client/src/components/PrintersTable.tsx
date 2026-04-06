import { Link } from 'react-router-dom'
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline'

type Product = {
  id: number
  model: string
  imageUrl: string | null
  inStock: boolean | null
  category: string | null
  subcategory: string | null
}

export default function PrintersTable({ 
  products,
  view,
  onViewChange,
 }: { 
  products: Product[]
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}) {
  return (
    <div className="bg-white">
      {/* toggle */}
      <div className="flex justify-front gap-1 mb-4">
        <button
          type="button"
          onClick={() => onViewChange('grid')}
          className={`rounded p-1.5 ${view === 'grid' ? 'bg-[var(--accent)] text-white' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Grid view"
        >
          <Squares2X2Icon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onViewChange('list')}
          className={`rounded p-1.5 ${view === 'list' ? 'bg-[var(--accent)] text-white' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="List view"
        >
          <ListBulletIcon className="h-5 w-5" />
        </button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} to={`/printers/${encodeURIComponent(product.model)}`} className="group relative block">
              {product.imageUrl && (
                <div className="relative aspect-square w-full xl:aspect-7/8">
                  <img
                    alt={product.model}
                    src={product.imageUrl}
                    className="h-full w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 rounded-b-lg bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.model}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.subcategory}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <Link key={product.id} to={`/printers/${encodeURIComponent(product.model)}`} className="flex items-center gap-4 py-4 hover:bg-gray-50">
              {product.imageUrl ? (
                <img
                  alt={product.model}
                  src={product.imageUrl}
                  className="h-16 w-16 rounded-md bg-gray-200 object-cover shrink-0"
                />
              ) : (
                <div className="h-16 w-16 rounded-md bg-gray-100 shrink-0" />
              )}
              <div className="flex flex-1 justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{product.model}</h3>
                  <p className="text-sm text-gray-500">{product.subcategory}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 self-center">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}
