import axios from 'axios'

const baseUrl =
  (process.env.DARAJA_ENV || 'sandbox') === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke'

let cachedToken = null
let tokenExpiresAt = 0

export async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken
  }

  const key = process.env.DARAJA_CONSUMER_KEY
  const secret = process.env.DARAJA_CONSUMER_SECRET
  if (!key || !secret) throw new Error('Daraja consumer key/secret not configured')

  const auth = Buffer.from(`${key}:${secret}`).toString('base64')
  const { data } = await axios.get(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  )

  cachedToken = data.access_token
  tokenExpiresAt = Date.now() + Number(data.expires_in || 3599) * 1000
  return cachedToken
}

function timestampNow() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

export function normalizePhone(raw) {
  let p = String(raw || '').replace(/\D/g, '')
  if (p.startsWith('0')) p = '254' + p.slice(1)
  if (p.startsWith('7') || p.startsWith('1')) p = '254' + p
  if (p.startsWith('+')) p = p.slice(1)
  return p
}

export async function stkPush({ phone, amount, accountRef, description }) {
  const token = await getAccessToken()
  const shortCode = process.env.DARAJA_SHORTCODE
  const passkey = process.env.DARAJA_PASSKEY
  const timestamp = timestampNow()
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

  const callbackUrl = `${process.env.PUBLIC_BASE_URL.replace(/\/$/, '')}/api/mpesa/callback`

  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: process.env.DARAJA_TRANSACTION_TYPE || 'CustomerPayBillOnline',
    Amount: Math.max(1, Math.floor(Number(amount))),
    PartyA: normalizePhone(phone),
    PartyB: shortCode,
    PhoneNumber: normalizePhone(phone),
    CallBackURL: callbackUrl,
    AccountReference: (accountRef || 'SunshineECDE').slice(0, 12),
    TransactionDesc: (description || 'School Fees').slice(0, 13),
  }

  const { data } = await axios.post(
    `${baseUrl}/mpesa/stkpush/v1/processrequest`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return data
}
