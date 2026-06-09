import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Sprout, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/payments', label: 'Payments' },
]

const navLinkClass = ({ isActive }) =>
  `block px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'text-white bg-orange-900'
      : 'text-orange-100 hover:text-white hover:bg-orange-900'
  }`

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 bg-orange-800 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Sprout size={20} strokeWidth={2} />
          </div>
          <div>
            <span className="block font-bold text-white text-base leading-tight">Sunshine ECDE</span>
            <span className="block text-[10px] text-orange-100 font-semibold uppercase tracking-widest">Learning & Growing</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/pay" className="ml-2 px-5 py-2 bg-white text-orange-900 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors">
              Pay School Fees
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white rounded-lg hover:bg-orange-900 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-900 px-6 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link
            to="/pay"
            className="mt-2 px-4 py-2.5 bg-white text-orange-900 rounded-xl text-sm font-bold hover:bg-orange-50 transition-colors text-center"
            onClick={() => setMenuOpen(false)}
          >
            Pay School Fees
          </Link>
        </div>
      )}
    </nav>
  )
}
