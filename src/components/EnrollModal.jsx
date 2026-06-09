import { useState, useEffect } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'

const inputClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border-2 text-sm text-stone-800 bg-white outline-none transition-colors ${
    hasError ? 'border-red-400' : 'border-stone-200 focus:border-orange-800'
  }`

export default function EnrollModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.program) e.program = 'Please select a program'
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-stone-950/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-orange-800 rounded-t-3xl px-8 py-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Enroll Your Child</h2>
            <p className="text-orange-100 text-sm mt-1">We'll confirm your spot within 24 hours.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle size={56} className="text-orange-800 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-stone-900 mb-2">Application Received!</h3>
              <p className="text-stone-500 mb-6">
                Thank you, <strong>{form.name}</strong>! Our admissions team will contact you at{' '}
                <strong>{form.phone}</strong> within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="px-7 py-2.5 bg-orange-800 text-white rounded-full font-semibold hover:bg-orange-900 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
                  Parent / Guardian Name *
                </label>
                <input name="name" type="text" placeholder="e.g. Mary Wanjiku"
                  value={form.name} onChange={handleChange} className={inputClass(errors.name)} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input name="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange} className={inputClass(errors.email)} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
                    Phone Number *
                  </label>
                  <input name="phone" type="tel" placeholder="+254 700 000 000"
                    value={form.phone} onChange={handleChange} className={inputClass(errors.phone)} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Program */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
                  Program *
                </label>
                <select name="program" value={form.program} onChange={handleChange} className={inputClass(errors.program)}>
                  <option value="">Select a program…</option>
                  <option value="playgroup">Playgroup (Ages 2–3)</option>
                  <option value="pp1">PP1 (Ages 4–5)</option>
                  <option value="pp2">PP2 (Ages 5–6)</option>
                </select>
                {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">
                  Message <span className="text-stone-400 font-normal normal-case">(optional)</span>
                </label>
                <textarea name="message" rows={3} placeholder="Any questions or information about your child…"
                  value={form.message} onChange={handleChange}
                  className={`${inputClass(false)} resize-none`} />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-orange-800 text-white rounded-full font-bold hover:bg-orange-900 transition-colors">
                <Send size={15} /> Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
