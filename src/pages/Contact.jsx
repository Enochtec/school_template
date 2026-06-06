import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, HelpCircle, PhoneCall } from 'lucide-react'

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
    {children}
  </span>
)

const infoCards = [
  { icon: <MapPin size={22} />, title: 'Visit Us', lines: ['123 School Lane, Westlands', 'Nairobi, Kenya'] },
  { icon: <Phone size={22} />, title: 'Call Us', lines: ['+254 700 000 000', '+254 711 111 111'] },
  { icon: <Mail size={22} />, title: 'Email Us', lines: ['info@sunshineecde.ac.ke', 'admissions@sunshineecde.ac.ke'] },
  { icon: <Clock size={22} />, title: 'School Hours', lines: ['Mon – Fri: 7:00 AM – 5:30 PM', 'Sat: 9:00 AM – 1:00 PM (visits)'] },
]

const faqs = [
  { q: 'When does the school year begin?', a: 'Our academic year follows the Kenyan school calendar — January, May, and September terms.' },
  { q: 'What is the admission process?', a: 'Fill out our contact form or call us to schedule a visit. Admission is confirmed upon payment of registration fee and completion of admission forms.' },
  { q: 'Do you offer scholarships or bursaries?', a: 'Yes, we have a limited number of bursaries for deserving families. Contact us to learn more about eligibility.' },
  { q: 'What languages are used for instruction?', a: 'We teach in both English and Kiswahili, following CBC guidelines.' },
  { q: 'Is the school CBC compliant?', a: 'Yes, we are fully certified and our curriculum is aligned with KICD guidelines for the CBC.' },
  { q: 'What meals do you provide?', a: 'We provide a healthy morning snack and a hot lunch daily. Menus are available on request.' },
]

const inputClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border-2 text-sm text-stone-800 bg-white outline-none transition-colors ${
    hasError ? 'border-red-400' : 'border-stone-200 focus:border-orange-600'
  }`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.message.trim()) e.message = 'Message is required'
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
    <div>
      {/* Hero */}
      <section className="bg-stone-950 text-white py-20 text-center px-6">
        <Tag>Contact Us</Tag>
        <h1 className="text-4xl font-extrabold text-white mb-3">We'd Love to Hear From You</h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto">Have questions about enrollment? Reach out and we'll get back to you within 24 hours.</p>
      </section>

      {/* Info cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((c) => (
            <div key={c.title} className="bg-white border border-stone-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mx-auto mb-3">{c.icon}</div>
              <h3 className="font-bold text-stone-900 mb-2">{c.title}</h3>
              {c.lines.map((l) => <p key={l} className="text-stone-500 text-sm">{l}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-3 bg-white border border-stone-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">Send Us a Message</h2>
            <p className="text-stone-500 text-sm mb-6">Fill in the form below and our team will respond promptly.</p>

            {submitted ? (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
                <CheckCircle size={48} className="text-orange-600 mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-orange-700 mb-2">Message Received!</h3>
                <p className="text-stone-500 mb-5">Thank you, <strong>{form.name}</strong>! We'll get back to you at {form.email} within 24 hours.</p>
                <button
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', program: '', message: '' }) }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Parent/Guardian Name *</label>
                    <input name="name" type="text" placeholder="e.g. Mary Wanjiku" value={form.name} onChange={handleChange} className={inputClass(errors.name)} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass(errors.email)} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Phone Number *</label>
                    <input name="phone" type="tel" placeholder="+254 700 000 000" value={form.phone} onChange={handleChange} className={inputClass(errors.phone)} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Interested Program</label>
                    <select name="program" value={form.program} onChange={handleChange} className={inputClass(false)}>
                      <option value="">Select a program…</option>
                      <option value="playgroup">Playgroup (Ages 2–3)</option>
                      <option value="pp1">PP1 (Ages 4–5)</option>
                      <option value="pp2">PP2 (Ages 5–6)</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your child or questions you have…" value={form.message} onChange={handleChange} className={`${inputClass(errors.message)} resize-none`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-7 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm">
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
              <MapPin size={48} className="text-orange-600 mx-auto mb-3" strokeWidth={1.2} />
              <h3 className="font-bold text-stone-900 mb-1">Find Us Here</h3>
              <p className="text-stone-500 text-sm mb-4">123 School Lane, Westlands, Nairobi</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-orange-600 text-white rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors">
                Open in Google Maps
              </a>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <h3 className="font-bold text-stone-900 mb-2">Schedule a Visit</h3>
              <p className="text-stone-500 text-sm mb-4">School tours are available Monday to Saturday by appointment.</p>
              <ul className="space-y-2 mb-5">
                {['See classrooms and play areas', 'Meet our teachers', 'Get enrollment questions answered', 'Free and no-obligation'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-stone-700">
                    <CheckCircle size={14} className="text-orange-600 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <a href="tel:+254700000000" className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors">
                <PhoneCall size={15} /> Call to Book a Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>FAQ</Tag>
            <h2 className="text-3xl font-bold text-stone-900">Common Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-orange-50 border border-stone-200 rounded-2xl p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <HelpCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <h4 className="font-bold text-stone-900 text-sm">{q}</h4>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed pl-6">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
