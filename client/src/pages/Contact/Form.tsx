import React from 'react'
import Button from '../../components/Button'

type ResultState = 'idle' | 'loading' | 'success' | 'error'

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void
  result: ResultState
  defaultModel?: string
}

export function GeneralForm({ onSubmit, result }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">First Name</label>
          <div className="mt-2.5">
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">Last Name</label>
          <div className="mt-2.5">
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email Address</label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">Phone</label>
          <div className="mt-2.5">
            <input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">Subject</label>
          <div className="mt-2.5">
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Messages / Comments</label>
          <div className="mt-2.5">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              defaultValue={''}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        {result === 'success' && <p className="text-sm text-green-600">Message sent!</p>}
        {result === 'error' && <p className="text-sm text-red-500">Something went wrong. Try again.</p>}
        <Button variant="outline" style={{ fontSize: '16px', padding: '4px 12px' }}>{result === 'loading' ? 'Sending...' : 'Send message'}</Button>
      </div>
    </form>
  )
}

export function SalesForm({ onSubmit, result, defaultModel }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">First Name</label>
          <div className="mt-2.5">
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">Last Name</label>
          <div className="mt-2.5">
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email Address</label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-900">Company Name</label>
          <div className="mt-2.5">
            <input
              id="company"
              name="company"
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-900">Company Address</label>
          <div className="mt-2.5">
            <input
              id="address"
              name="address"
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">Phone</label>
          <div className="mt-2.5">
            <input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="model-needed" className="block text-sm font-semibold text-gray-900">Model Needed</label>
          <div className="mt-2.5">
            <input
              id="model-needed"
              name="model-needed"
              type="text"
              defaultValue={defaultModel}
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900">Quantity</label>
          <div className="mt-2.5">
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="date-needed" className="block text-sm font-semibold text-gray-900">Date Needed (MM/DD/YYYY)</label>
          <div className="mt-2.5">
            <input
              id="date-needed"
              name="date-needed"
              type="text"
              placeholder="MM/DD/YYYY"
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="comments" className="block text-sm font-semibold text-gray-900">Other Comments</label>
          <div className="mt-2.5">
            <textarea
              id="comments"
              name="comments"
              rows={4}
              className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              defaultValue={''}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        {result === 'success' && <p className="text-sm text-green-600">Message sent!</p>}
        {result === 'error' && <p className="text-sm text-red-500">Something went wrong. Try again.</p>}
        <Button variant="outline" style={{ fontSize: '16px', padding: '4px 12px' }}>{result === 'loading' ? 'Sending...' : 'Send message'}</Button>
      </div>
    </form>
  )
}

export default null as unknown as never
