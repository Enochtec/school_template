# Sunshine ECDE School

A 5-page React + Vite website for Sunshine ECDE School, with M-Pesa school-fees payments powered by Safaricom **Daraja STK Push** and an automatic email receipt.

Live: https://sunshineecde.vercel.app/

## Project layout

```
school/
├── src/                 # React app (Vite)
│   ├── pages/
│   │   ├── Payment.jsx        ← /pay  — STK Push form
│   │   └── Payments.jsx       ← /payments — list of confirmed payments
│   ├── components/Navbar.jsx  ← "Pay School Fees" CTA
│   └── lib/api.js             ← fetch helper using VITE_API_URL
└── server/              # Node.js + Express backend
    ├── index.js               ← API routes
    ├── services/daraja.js     ← STK Push + token caching
    ├── services/email.js      ← Nodemailer receipt
    └── services/storage.js    ← JSON file storage
```

The frontend (Vite/React) deploys on Vercel; the backend deploys separately (Render, Railway, Fly, etc.) because Daraja needs a long-running HTTPS endpoint for callbacks.

## 1 — Run the backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: PUBLIC_BASE_URL, SMTP_*, CORS_ORIGINS
npm run dev
```

For **local dev**, expose port 5000 via ngrok so Daraja can call back:

```bash
ngrok http 5000
# copy the https URL into server/.env as PUBLIC_BASE_URL
```

The Daraja sandbox credentials are already prefilled in `server/.env.example`:

- Consumer Key: `PGMmWexRhsx9s910XvNApB0qCfJEPQG39mDip4KVvObz6ZCY`
- Consumer Secret: `I2CXDPheR8GBaGErIr8ALLxsrV4S305A2Ga0c2SaLSwOn0AG5OK8TDXXzFNBmMMG`
- Sandbox shortcode `174379` and the standard sandbox passkey.

## 2 — Run the frontend

```bash
# from project root
npm install
cp .env.example .env
# set VITE_API_URL — http://localhost:5000 for dev
npm run dev
```

Visit http://localhost:5173/pay to try it.

## 3 — Deploy

### Backend (Render free tier — recommended)

1. Push this repo to GitHub.
2. On Render, create a new **Web Service** pointing at `/server`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add env vars from `server/.env.example` (use real SMTP creds).
5. Set `PUBLIC_BASE_URL` to the Render URL (e.g. `https://sunshineecde-api.onrender.com`).
6. Set `CORS_ORIGINS=https://sunshineecde.vercel.app`.

### Frontend (Vercel)

Already deployed at https://sunshineecde.vercel.app. Add one env var in Vercel dashboard:

```
VITE_API_URL=https://sunshineecde-api.onrender.com
```

Then redeploy.

## How the payment flow works

1. User opens `/pay`, fills name / phone / amount / email, clicks **Pay with M-Pesa**.
2. Frontend → `POST /api/pay` on backend.
3. Backend obtains a Daraja access token, sends an **STK Push** request, stores a `pending` payment row, returns the `CheckoutRequestID`.
4. User receives the M-Pesa prompt and enters their PIN.
5. Safaricom POSTs the result to `/api/mpesa/callback`. Backend marks the payment `paid`, saves the M-Pesa receipt number, and sends an HTML email receipt via Nodemailer.
6. Frontend polls `/api/status/:checkoutRequestId` every 3s and shows success/failure.
7. `/payments` lists all confirmed payments (with PII masked) — backed by `GET /api/payments`.

## Notes

- Storage is a JSON file (`server/data/payments.json`). For production scale, swap `services/storage.js` for a real DB.
- Phone numbers are normalised to `2547XXXXXXXX` / `2541XXXXXXXX` server-side.
- The sandbox always charges `KES 1` regardless of the amount you send, and only accepts Safaricom test numbers.
