import { ClockIcon, EnvelopeIcon, PhoneIcon, WrenchIcon, ShieldCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { GeneralForm, SalesForm } from './Contact/Form'

export default function Contact() {
  const [result, setResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [tab, setTab] = useState<'general' | 'sales'>('general')

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult('loading')
    const formEl = e.currentTarget as HTMLFormElement
    const formData = new FormData(formEl)
    formData.append('access_key', '8acb327a-7250-40c3-9885-246fafde833a')

    const userEmail = formData.get('email')
    if (userEmail) formData.append('reply_to', String(userEmail))

    if (tab === 'general') {
      const userSubject = formData.get('subject')
      const subjectLine = userSubject ? `General Inquiry: ${String(userSubject)}` : 'General Inquiry'
      formData.set('subject', subjectLine)
    } else {
      const company = formData.get('company')
      const model = formData.get('model-needed')
      const subjectLine = company
        ? `Sales Inquiry: ${String(company)}`
        : model
        ? `Sales Inquiry: ${String(model)}`
        : 'Sales Inquiry'
      formData.set('subject', subjectLine)
    }

    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.success) {
      formEl.reset()
      setResult('success')
    } else {
      setResult('error')
    }
  }

  return (
    <div className="isolate relative bg-slate-100 px-6 py-24 sm:py-32 lg:px-8">
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
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Get in Touch.</h2>
            <h3 className="mt-4 text-base leading-relaxed text-gray-700">
              Please call us during our office hours or send us an inquiry. We'll get back to you promptly. Thank you!
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

          {/* Right — form with tabs */}
          <div className="flex flex-col rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div
              className="inline-flex w-full gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-1 shadow-sm"
            >
              <button
                type="button"
                onClick={() => setTab('general')}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === 'general'
                    ? 'bg-white text-blue-900 shadow-sm ring-1 ring-blue-100'
                    : 'text-blue-800 hover:bg-blue-100'
                }`}
              >
                General Inquiry
              </button>
              <button
                type="button"
                onClick={() => setTab('sales')}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === 'sales'
                    ? 'bg-white text-blue-900 shadow-sm ring-1 ring-blue-100'
                    : 'text-blue-800 hover:bg-blue-100'
                }`}
              >
                Sales Inquiry
              </button>
            </div>

            <div className="mt-6">
              {tab === 'general' && <GeneralForm onSubmit={onSubmit} result={result} />}
              {tab === 'sales' && <SalesForm onSubmit={onSubmit} result={result} />}
            </div>
          </div>
        </div>
      </div>

      {/* Support tiles — full width */}
      
      <div className="mt-24 bg-slate-100 px-6 py-8 lg:px-0">
        <h2 className="mx-auto max-w-7xl text-4xl font-semibold tracking-tight text-gray-900 mb-8">We're with you after the sale.</h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              icon: WrenchIcon,
              accent: 'var(--primary)',
              title: 'Technical Support & Services',
              description: 'If you need help with our products, please call or email our technical support team.',
              phone: '510-739-2369',
              email: 'support@avision-labs.com',
            },
            {
              icon: ShieldCheckIcon,
              accent: 'var(--secondary)',
              title: 'Manufacturer Warranty',
              description: 'All Avision products include a 1-Year Parts & Labor Warranty. Contact our warranty support team for claims and assistance.',
              phone: '510-739-2369',
              email: 'support@avision-labs.com',
            },
            {
              icon: CpuChipIcon,
              accent: 'var(--text)',
              title: 'Parts & Extended Warranty',
              description: 'Looking to purchase replacement parts or extend your coverage beyond the standard warranty? Get in touch with our sales team.',
              phone: '510-739-2369',
              email: 'sales@avision-labs.com',
            },
          ].map((tile) => (
            <div key={tile.title} className="flex gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-6" style={{ borderLeft: `3px solid ${tile.accent}` }}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-base">
                <tile.icon className="h-5 w-5" style={{ color: tile.accent }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{tile.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{tile.description}</p>
                <div className="mt-3 flex gap-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Phone</p>
                    <a href={`tel:${tile.phone}`} className="mt-0.5 block text-xs font-bold text-gray-900 hover:underline">{tile.phone}</a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
                    <a href={`mailto:${tile.email}`} className="mt-0.5 block text-xs font-bold text-gray-900 hover:underline">{tile.email}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
