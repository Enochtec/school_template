import { Link } from 'react-router-dom'
import { Sprout, MapPin, Phone, Mail, Clock, Globe, MessageSquare, Camera, MessageCircle } from 'lucide-react'

const social = [
  { icon: <Globe size={16} />, label: 'Facebook' },
  { icon: <MessageSquare size={16} />, label: 'Twitter' },
  { icon: <Camera size={16} />, label: 'Instagram' },
  { icon: <MessageCircle size={16} />, label: 'WhatsApp' },
]

const contactInfo = [
  { icon: <MapPin size={14} />, text: '123 School Lane, Nairobi, Kenya' },
  { icon: <Phone size={14} />, text: '+254 700 000 000' },
  { icon: <Mail size={14} />, text: 'info@sunshineecde.ac.ke' },
  { icon: <Clock size={14} />, text: 'Mon–Fri: 7:00 AM – 5:00 PM' },
]

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-stone-800">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <Sprout size={16} />
              </div>
              <span className="font-bold text-white text-base">Sunshine ECDE School</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 mb-5">
              Nurturing young minds and building strong foundations for a brighter tomorrow.
            </p>
            <div className="flex gap-2">
              {social.map(({ icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-700 hover:text-white transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 pb-2 border-b-2 border-orange-600 inline-block">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['/', 'Home'], ['/about', 'About Us'], ['/programs', 'Programs'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-stone-400 hover:text-orange-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 pb-2 border-b-2 border-orange-600 inline-block">Programs</h4>
            <ul className="space-y-2.5">
              {['Playgroup (Ages 2–3)', 'PP1 (Ages 4–5)', 'PP2 (Ages 5–6)', 'After-School Care'].map((p) => (
                <li key={p}>
                  <Link to="/programs" className="text-sm text-stone-400 hover:text-orange-400 transition-colors">{p}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 pb-2 border-b-2 border-orange-600 inline-block">Contact Info</h4>
            <ul className="space-y-3">
              {contactInfo.map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="text-sm text-stone-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Sunshine ECDE School. All rights reserved.</p>
          <p>Licensed by the Ministry of Education, Kenya</p>
        </div>
      </div>
    </footer>
  )
}
