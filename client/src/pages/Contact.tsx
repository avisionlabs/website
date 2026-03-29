import { ClockIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Contact() {
  const [result, setResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult('loading')

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', '8acb327a-7250-40c3-9885-246fafde833a')

    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
    const data = await res.json()
    setResult(data.success ? 'success' : 'error')
  }

  return (
    <div className="isolate relative bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Blobs */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[var(--primary)] to-[var(--secondary)] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left — info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Get in touch.</h2>
            <h3 className="mt-4 text-base leading-relaxed text-gray-700">
              Please call us during our office hours or send us an inquiry. We'll get back to you promptly.
            </h3>

            <dl className="mt-10 space-y-4 text-base text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <ClockIcon className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <span className="font-semibold">Our Office Hours</span><br />
                  Weekdays: 9 AM - 5 PM<br />
                  Weekends: Closed<br />
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <PhoneIcon className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="tel:+18886282209" className="hover:text-gray-900">+1 (888) 628-2209</a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <EnvelopeIcon className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="mailto:service@avision.com.tw" className="hover:text-gray-900">service@avision.com.tw</a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right — form */}
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">First name</label>
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
                <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">Last name</label>
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
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
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
                <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">Phone number</label>
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
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              {result === 'success' && <p className="text-sm text-green-600">Message sent!</p>}
              {result === 'error' && <p className="text-sm text-red-500">Something went wrong. Try again.</p>}
              <button
                type="submit"
                disabled={result === 'loading'}
                className="rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
                style={{ background: 'var(--primary)' }}
              >
                {result === 'loading' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
