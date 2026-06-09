import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import { stkPush, normalizePhone } from './services/daraja.js'
import { sendReceiptEmail } from './services/email.js'
import {
  createPayment,
  updatePaymentByCheckoutId,
  getPaymentByCheckoutId,
  listPaidPayments,
} from './services/storage.js'

const app = express()
app.use(express.json({ limit: '1mb' }))

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true)
      }
      return cb(new Error(`CORS blocked: ${origin}`))
    },
  })
)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'sunshine-ecde-api', time: new Date().toISOString() })
})

app.post('/api/pay', async (req, res) => {
  try {
    const { name, email, phone, amount, method } = req.body || {}

    if (!name || !email || !phone || !amount) {
      return res.status(400).json({ ok: false, error: 'name, email, phone, and amount are required' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }
    const amt = Number(amount)
    if (!Number.isFinite(amt) || amt < 1) {
      return res.status(400).json({ ok: false, error: 'Amount must be at least KES 1' })
    }
    const phoneNorm = normalizePhone(phone)
    if (!/^254(7|1)\d{8}$/.test(phoneNorm)) {
      return res.status(400).json({ ok: false, error: 'Invalid Kenyan phone number' })
    }

    const stkRes = await stkPush({
      phone: phoneNorm,
      amount: amt,
      accountRef: 'SunshineECDE',
      description: 'School Fees',
    })

    if (stkRes.ResponseCode !== '0') {
      return res.status(502).json({
        ok: false,
        error: stkRes.ResponseDescription || stkRes.errorMessage || 'STK push failed',
      })
    }

    const id = crypto.randomUUID()
    const record = {
      id,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phoneNorm,
      amount: amt,
      method: method || 'M-Pesa',
      status: 'pending',
      checkoutRequestId: stkRes.CheckoutRequestID,
      merchantRequestId: stkRes.MerchantRequestID,
      createdAt: new Date().toISOString(),
    }
    await createPayment(record)

    res.json({
      ok: true,
      checkoutRequestId: stkRes.CheckoutRequestID,
      customerMessage: stkRes.CustomerMessage,
    })
  } catch (err) {
    console.error('[/api/pay] error:', err?.response?.data || err.message)
    res.status(500).json({ ok: false, error: 'Failed to initiate payment' })
  }
})

app.post('/api/mpesa/callback', async (req, res) => {
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' })

  try {
    const stk = req.body?.Body?.stkCallback
    if (!stk) return

    const checkoutRequestId = stk.CheckoutRequestID
    const resultCode = stk.ResultCode

    if (resultCode === 0) {
      const items = stk.CallbackMetadata?.Item || []
      const get = (name) => items.find((i) => i.Name === name)?.Value
      const mpesaReceipt = get('MpesaReceiptNumber')
      const amountPaid = get('Amount')
      const phoneUsed = get('PhoneNumber')
      const txDate = get('TransactionDate')

      const updated = await updatePaymentByCheckoutId(checkoutRequestId, {
        status: 'paid',
        mpesaReceipt: mpesaReceipt ? String(mpesaReceipt) : undefined,
        amount: amountPaid != null ? Number(amountPaid) : undefined,
        phone: phoneUsed ? String(phoneUsed) : undefined,
        paidAt: parseDarajaDate(txDate),
      })

      if (updated) {
        try {
          await sendReceiptEmail(updated)
        } catch (e) {
          console.error('[callback] email error:', e.message)
        }
      }
    } else {
      await updatePaymentByCheckoutId(checkoutRequestId, {
        status: 'failed',
        failureReason: stk.ResultDesc || 'Cancelled or failed',
      })
    }
  } catch (err) {
    console.error('[/api/mpesa/callback] processing error:', err.message)
  }
})

app.get('/api/status/:checkoutRequestId', async (req, res) => {
  const record = await getPaymentByCheckoutId(req.params.checkoutRequestId)
  if (!record) return res.status(404).json({ ok: false, error: 'Not found' })
  res.json({
    ok: true,
    status: record.status,
    mpesaReceipt: record.mpesaReceipt || null,
    failureReason: record.failureReason || null,
  })
})

app.get('/api/payments', async (_req, res) => {
  const list = await listPaidPayments()
  res.json({
    ok: true,
    count: list.length,
    payments: list.map((p) => ({
      id: p.id,
      name: p.name,
      email: maskEmail(p.email),
      phone: maskPhone(p.phone),
      amount: p.amount,
      method: p.method,
      mpesaReceipt: p.mpesaReceipt,
      paidAt: p.paidAt || p.createdAt,
    })),
  })
})

function parseDarajaDate(num) {
  if (!num) return new Date().toISOString()
  const s = String(num)
  if (s.length !== 14) return new Date().toISOString()
  const iso = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(8, 10)}:${s.slice(10, 12)}:${s.slice(12, 14)}+03:00`
  return new Date(iso).toISOString()
}

function maskPhone(p) {
  if (!p) return ''
  const s = String(p)
  if (s.length < 6) return s
  return s.slice(0, 6) + '***' + s.slice(-2)
}

function maskEmail(e) {
  if (!e) return ''
  const [user, domain] = String(e).split('@')
  if (!domain) return e
  const u = user.length <= 2 ? user[0] + '*' : user.slice(0, 2) + '***'
  return `${u}@${domain}`
}

const port = Number(process.env.PORT || 5000)
app.listen(port, () => {
  console.log(`Sunshine ECDE API listening on http://localhost:${port}`)
  if (!process.env.PUBLIC_BASE_URL) {
    console.warn('⚠  PUBLIC_BASE_URL not set — STK callbacks will fail. Set this in .env.')
  }
})
