const base = import.meta.env.VITE_API_URL ?? ''

export function apiUrl(path: string) {
  return `${base}${path}`
}
