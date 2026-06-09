# Sunshine ECDE — Payment Backend

Node.js + Express backend that handles M-Pesa Daraja **STK Push** payments and sends email receipts.

## Endpoints

| Method | Path                                | Purpose                                       |
| ------ | ----------------------------------- | --------------------------------------------- |
| GET    | `/api/health`                       | Health check                                  |
| POST   | `/api/pay`                          | Initiate STK Push                             |
| POST   | `/api/mpesa/callback`               | Daraja callback (called by Safaricom)         |
| GET    | `/api/status/:checkoutRequestId`    | Poll payment status from the frontend         |
| GET    | `/api/payments`                     | List all paid users (masked PII)              |

## Setup

```bash
cd server
npm install
cp .env.example .env
# fill in PUBLIC_BASE_URL, SMTP_*, etc.
npm run dev
```

## Local development — exposing the callback URL

Daraja must reach the `/api/mpesa/callback` endpoint over HTTPS. For local dev, use **ngrok**:

```bash
ngrok http 5000
# copy the https URL into .env as PUBLIC_BASE_URL
```

## Deployment options

The Vercel frontend (`sunshineecde.vercel.app`) cannot host this server long-running, so deploy the API separately:

- **Render** (free): create a Web Service, point at `/server`, build = `npm install`, start = `npm start`
- **Railway**: similar one-click Node deploy
- **Fly.io**, **Heroku**, your own VPS, etc.

Then set `PUBLIC_BASE_URL` to that deployed URL and add the frontend origin to `CORS_ORIGINS`.

## Email receipts

Uses Nodemailer with SMTP. For Gmail:

1. Enable 2-Step Verification on the Google account.
2. Generate an [App Password](https://myaccount.google.com/apppasswords).
3. Put the 16-char password in `SMTP_PASS`.

If SMTP is not configured, payments still succeed; the email is skipped with a console warning.

## Storage

Payments are stored in `server/data/payments.json`. For production, replace `services/storage.js` with a real DB (Postgres, MongoDB, Vercel KV).
