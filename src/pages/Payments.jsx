import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Receipt, Search, RefreshCw, Loader2, AlertCircle, CheckCircle2,
  Users, Wallet, Calendar,
} from 'lucide-react'
import { apiGet } from '../lib/api'

const formatKES = (n) => 'KES ' + Number(n || 0).toLocaleString('en-KE')

const formatDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await apiGet('/api/payments')
      setPayments(data.payments || [])
    } catch (err) {
      setError(err.message || 'Could not load payments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await apiGet('/api/payments')
        if (!cancelled) setPayments(data.payments || [])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load payments')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return payments
    const q = query.toLowerCase()
    return payments.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.mpesaReceipt?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        String(p.amount || '').includes(q)
    )
  }, [payments, query])

  const stats = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
    return {
      count: payments.length,
      total,
      latest: payments[0]?.paidAt,
    }
  }, [payments])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-stone-50 to-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold text-orange-900 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
              Confirmed Payments
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
              Who Has Paid School Fees
            </h1>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              A live list of all confirmed M-Pesa school fee payments. Phone numbers and emails are
              partially masked for privacy.
            </p>
          </div>
          <Link
            to="/pay"
            className="self-start sm:self-auto px-5 py-2.5 bg-orange-800 text-white rounded-full font-bold hover:bg-orange-900 transition-colors text-sm whitespace-nowrap"
          >
            Pay School Fees →
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Users size={20} />} label="Total Payments" value={stats.count} />
          <StatCard
            icon={<Wallet size={20} />}
            label="Total Collected"
            value={formatKES(stats.total)}
          />
          <StatCard
            icon={<Calendar size={20} />}
            label="Latest Payment"
            value={stats.latest ? formatDate(stats.latest) : '—'}
            small
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3 p-5 border-b border-stone-100">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, receipt no., or amount…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-stone-200 text-sm bg-white outline-none focus:border-orange-800 transition-colors"
              />
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              Refresh
            </button>
          </div>

          {error ? (
            <div className="p-10 text-center">
              <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
              <p className="text-stone-700 font-semibold">Couldn't load payments</p>
              <p className="text-stone-500 text-sm mt-1">{error}</p>
              <button
                onClick={load}
                className="mt-5 px-5 py-2 bg-orange-800 text-white rounded-full font-semibold text-sm hover:bg-orange-900 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : loading && payments.length === 0 ? (
            <div className="p-16 text-center text-stone-500">
              <Loader2 size={28} className="mx-auto mb-3 animate-spin text-orange-800" />
              Loading payments…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-stone-500">
              <Receipt size={32} className="mx-auto mb-3 text-stone-300" />
              <p className="font-semibold text-stone-700">
                {query ? 'No payments match your search.' : 'No payments yet.'}
              </p>
              {!query && (
                <p className="text-sm mt-1">
                  Be the first —{' '}
                  <Link to="/pay" className="text-orange-800 font-semibold hover:underline">
                    pay school fees now
                  </Link>
                  .
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wide">
                    <tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Amount</Th>
                      <Th>Receipt</Th>
                      <Th>Paid On</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-t border-stone-100 hover:bg-orange-50/40">
                        <Td className="font-semibold text-stone-900">{p.name}</Td>
                        <Td className="text-stone-600">{p.email}</Td>
                        <Td className="text-stone-600">{p.phone}</Td>
                        <Td className="font-semibold text-stone-900">{formatKES(p.amount)}</Td>
                        <Td className="font-mono text-xs text-stone-700">{p.mpesaReceipt || '—'}</Td>
                        <Td className="text-stone-600">{formatDate(p.paidAt)}</Td>
                        <Td>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-800 bg-orange-100 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} /> Paid
                          </span>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="md:hidden divide-y divide-stone-100">
                {filtered.map((p) => (
                  <li key={p.id} className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-stone-900">{p.name}</p>
                        <p className="text-stone-500 text-xs">{p.email}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-1 rounded-full">
                        <CheckCircle2 size={10} /> Paid
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <Detail label="Amount" value={formatKES(p.amount)} bold />
                      <Detail label="Phone" value={p.phone} />
                      <Detail label="Receipt" value={p.mpesaReceipt || '—'} mono />
                      <Detail label="Paid" value={formatDate(p.paidAt)} />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, small }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-stone-500 uppercase tracking-wide font-semibold">{label}</p>
        <p className={`font-extrabold text-stone-900 truncate ${small ? 'text-sm' : 'text-xl'}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

function Th({ children }) {
  return <th className="text-left font-semibold px-5 py-3">{children}</th>
}
function Td({ children, className = '' }) {
  return <td className={`px-5 py-4 align-middle ${className}`}>{children}</td>
}
function Detail({ label, value, bold, mono }) {
  return (
    <div>
      <p className="text-stone-400 uppercase font-semibold tracking-wide">{label}</p>
      <p
        className={`text-stone-700 ${bold ? 'font-bold text-stone-900' : ''} ${
          mono ? 'font-mono' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}
