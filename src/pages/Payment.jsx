import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Smartphone, User, Mail, Phone, Banknote, CreditCard, Loader2,
  CheckCircle2, XCircle, ShieldCheck, Receipt,
} from 'lucide-react'
import { apiGet, apiPost } from '../lib/api'

const inputClass = (hasError) =>
  `w-full pl-11 pr-4 py-3 rounded-xl border-2 text-sm text-stone-800 bg-white outline-none transition-colors ${
    hasError ? 'border-red-400' : 'border-stone-200 focus:border-orange-600'
  }`

const PAYMENT_METHODS = [
  { id: 'mpesa', label: 'M-Pesa (STK Push)', icon: <Smartphone size={16} /> },
  { id: 'card', label: 'Card (coming soon)', icon: <CreditCard size={16} />, disabled: true },
]

export default function Payment() {
  const [form, setForm] = useState({
    method: 'mpesa',
    name: '',
    email: '',
    phone: '',
    amount: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [stage, setStage] = useState('idle') // idle | waiting | paid | failed
  const [statusInfo, setStatusInfo] = useState(null) // { mpesaReceipt, failureReason }
  const [error, setError] = useState('')
  const pollRef = useRef(null)

  useEffect(() => () => clearInterval(pollRef.current), [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!/^(\+?254|0)?(7|1)\d{8}$/.test(form.phone.replace(/\s/g, ''))) {
      e.phone = 'Use a valid Safaricom number (e.g. 0712345678)'
    }
    const amt = Number(form.amount)
    if (!Number.isFinite(amt) || amt < 1) e.amount = 'Amount must be at least KES 1'
    return e
  }

  const pollStatus = (checkoutRequestId) => {
    let tries = 0
    const maxTries = 40 // ~2 minutes at 3s
    pollRef.current = setInterval(async () => {
      tries++
      try {
        const data = await apiGet(`/api/status/${checkoutRequestId}`)
        if (data.status === 'paid') {
          clearInterval(pollRef.current)
          setStatusInfo({ mpesaReceipt: data.mpesaReceipt })
          setStage('paid')
        } else if (data.status === 'failed') {
          clearInterval(pollRef.current)
          setStatusInfo({ failureReason: data.failureReason })
          setStage('failed')
        }
      } catch {
        // keep polling; transient errors are fine
      }
      if (tries >= maxTries) {
        clearInterval(pollRef.current)
        setStage('failed')
        setStatusInfo({ failureReason: 'Timed out waiting for confirmation. Please try again.' })
      }
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const data = await apiPost('/api/pay', {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        amount: Number(form.amount),
        method: 'M-Pesa',
      })
      setStage('waiting')
      pollStatus(data.checkoutRequestId)
    } catch (err) {
      setError(err.message || 'Could not start payment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    clearInterval(pollRef.current)
    setStage('idle')
    setStatusInfo(null)
    setError('')
    setForm({ method: 'mpesa', name: '', email: '', phone: '', amount: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-stone-50 to-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <header className="text-center mb-10">
          <span className="inline-block px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
            Secure Payment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Pay School Fees</h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Pay securely with M-Pesa. You'll receive an STK Push prompt on your phone, and a
            receipt will be emailed to you after confirmation.
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="bg-orange-600 px-6 sm:px-8 py-5 text-white flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">Sunshine ECDE School</h2>
              <p className="text-orange-100 text-xs">Daraja sandbox · M-Pesa STK Push</p>
            </div>
            <ShieldCheck size={28} className="opacity-90" />
          </div>

          <div className="p-6 sm:p-8">
            {stage === 'idle' && (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        disabled={m.disabled}
                        onClick={() => !m.disabled && setForm((f) => ({ ...f, method: m.id }))}
                        className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                          m.disabled
                            ? 'border-stone-100 text-stone-300 cursor-not-allowed'
                            : form.method === m.id
                            ? 'border-orange-600 bg-orange-50 text-orange-700'
                            : 'border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Field
                  label="Full Name"
                  icon={<User size={16} />}
                  error={errors.name}
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g. Mary Wanjiku"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass(errors.name)}
                  />
                </Field>

                <Field
                  label="Phone Number (M-Pesa)"
                  icon={<Phone size={16} />}
                  error={errors.phone}
                  hint="Format: 0712345678 or 254712345678"
                >
                  <input
                    name="phone"
                    type="tel"
                    placeholder="0712345678"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass(errors.phone)}
                  />
                </Field>

                <Field
                  label="Amount (KES)"
                  icon={<Banknote size={16} />}
                  error={errors.amount}
                >
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    placeholder="5000"
                    value={form.amount}
                    onChange={handleChange}
                    className={inputClass(errors.amount)}
                  />
                </Field>

                <Field
                  label="Email Address (for receipt)"
                  icon={<Mail size={16} />}
                  error={errors.email}
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass(errors.email)}
                  />
                </Field>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Smartphone size={18} />}
                  {submitting ? 'Sending STK Push…' : 'Pay with M-Pesa'}
                </button>

                <p className="text-xs text-stone-500 text-center">
                  By proceeding you agree to receive a payment receipt at the email above.
                </p>
              </form>
            )}

            {stage === 'waiting' && (
              <div className="py-10 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                  <Smartphone size={36} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  Check your phone for the M-Pesa prompt
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                  We've sent an STK Push to <strong>{form.phone}</strong>. Enter your M-Pesa PIN
                  to complete the payment of <strong>KES {Number(form.amount).toLocaleString()}</strong>.
                </p>
                <div className="inline-flex items-center gap-2 text-orange-700 text-sm font-semibold">
                  <Loader2 size={16} className="animate-spin" />
                  Waiting for confirmation…
                </div>
              </div>
            )}

            {stage === 'paid' && (
              <div className="py-10 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <CheckCircle2 size={42} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Payment Successful!</h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-2">
                  Thank you, <strong>{form.name}</strong>. We've emailed your receipt to
                  <strong> {form.email}</strong>.
                </p>
                {statusInfo?.mpesaReceipt && (
                  <p className="inline-flex items-center gap-2 mt-3 text-sm bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full">
                    <Receipt size={14} /> M-Pesa Ref: <strong>{statusInfo.mpesaReceipt}</strong>
                  </p>
                )}
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={reset}
                    className="px-6 py-2.5 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition-colors text-sm"
                  >
                    Make Another Payment
                  </button>
                  <Link
                    to="/payments"
                    className="px-6 py-2.5 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm"
                  >
                    View All Payments
                  </Link>
                </div>
              </div>
            )}

            {stage === 'failed' && (
              <div className="py-10 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-5">
                  <XCircle size={42} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Payment not completed</h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                  {statusInfo?.failureReason || 'The payment was cancelled or timed out.'}
                </p>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-stone-500 text-center mt-6">
          Powered by Safaricom Daraja · Sandbox environment
        </p>
      </div>
    </div>
  )
}

function Field({ label, icon, error, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">{icon}</span>
        {children}
      </div>
      {error ? (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      ) : hint ? (
        <p className="text-stone-400 text-xs mt-1">{hint}</p>
      ) : null}
    </div>
  )
}
