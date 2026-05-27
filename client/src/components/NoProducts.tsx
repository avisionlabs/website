import { WrenchIcon } from '@heroicons/react/24/outline'

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <WrenchIcon className="h-12 w-12 mb-4" />
      <p className="text-lg font-normal text-gray-500">No products found.</p>
    </div>
  )
}
