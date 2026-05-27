import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSearchChange = useDebounce((value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value.trim()) {
        next.set('q', value)
      } else {
        next.delete('q')
      }
      return next
    }, { replace: true })
  }, 300)
  
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
    handleSearchChange.cancel()
    setSearchParams(
      view === 'list' ? { view: 'list' } : {},
      { replace: true }
    )
  }

  return {
    selectedSubcategory,
    search,
    view,
    handleSubcategoryChange,
    handleSearchChange,
    handleViewChange,
    handleClear,
  }
}