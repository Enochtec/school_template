export const API_URL =
  (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}
