import { type FormEvent, useState } from 'react'

export default function Admin() {
  const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? ''
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')

  const isConfigured = configuredPassword.length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConfigured) {
      setError('Admin password is not configured for this build.')
      return
    }

    if (password === configuredPassword) {
      setError('')
      setIsUnlocked(true)
      return
    }

    setError('Incorrect password.')
  }

  if (isUnlocked) {
    return (
      <main className="min-h-screen px-6 py-10">
          <h1 className="mt-3 text-3xl font-semibold">Admin Page</h1>
          <p className="mt-2 max-w-2xl text-sm">
            This view is unlocked for this visit only. Reloading or revisiting /adminpage will ask for the password again.
          </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
        <h1 className="mt-3 text-3xl font-semibold">Admin Page</h1>
        <p className="mt-2 text-sm">
          Enter the admin password for this visit.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              className="w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-[var(--accent)] focus:ring-2"
              placeholder="Enter password"
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}
          {!isConfigured && (
            <p className="text-sm text-amber-300">
              Set VITE_ADMIN_PASSWORD in client environment variables before using this page.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
          >
            Unlock admin page
          </button>
        </form>
      </div>
    </main>
  )
}
