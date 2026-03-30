const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export function apiUrl(path: string) {
  // console.log(`${base}${path}`);
  return `${base}${path}`;
}
