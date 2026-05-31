import { type FormEvent, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import AdminPage from "./AdminPage";

export default function Admin() {
  const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "";
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const isConfigured = configuredPassword.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setError("Admin password is not configured for this build.");
      return;
    }

    if (password === configuredPassword) {
      setError("");
      setIsUnlocked(true);
      return;
    }

    setError("Incorrect password.");
  }

  if (isUnlocked) {
    return (
      <AdminPage />
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]">
            <LockClosedIcon className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="mt-4 text-center text-3xl font-semibold">Admin Page</h1>
        <p className="mt-2 text-center text-sm">
          Enter the admin password for this visit.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-[var(--accent)] focus:ring-1"
              placeholder="Enter password"
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}
          {!isConfigured && (
            <p className="text-sm text-amber-300">
              Set VITE_ADMIN_PASSWORD in client environment variables before
              using this page.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary)]"
          >
            Unlock admin page
          </button>
        </form>
      </div>
    </main>
  );
}
