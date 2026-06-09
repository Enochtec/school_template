import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataFile = path.join(__dirname, '..', 'data', 'payments.json')

async function ensureFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf8')
  }
}

async function readAll() {
  await ensureFile()
  const raw = await fs.readFile(dataFile, 'utf8')
  try {
    return JSON.parse(raw) || []
  } catch {
    return []
  }
}

async function writeAll(list) {
  await ensureFile()
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), 'utf8')
}

export async function createPayment(record) {
  const list = await readAll()
  list.unshift(record)
  await writeAll(list)
  return record
}

export async function updatePaymentByCheckoutId(checkoutRequestId, patch) {
  const list = await readAll()
  const idx = list.findIndex((p) => p.checkoutRequestId === checkoutRequestId)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...patch }
  await writeAll(list)
  return list[idx]
}

export async function getPaymentByCheckoutId(checkoutRequestId) {
  const list = await readAll()
  return list.find((p) => p.checkoutRequestId === checkoutRequestId) || null
}

export async function listPaidPayments() {
  const list = await readAll()
  return list.filter((p) => p.status === 'paid')
}

export async function listAllPayments() {
  return readAll()
}
