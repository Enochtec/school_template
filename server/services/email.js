import nodemailer from 'nodemailer'

let cachedTransporter = null

function getTransporter() {
  if (cachedTransporter) return cachedTransporter
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return null
  }
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return cachedTransporter
}

function formatKES(n) {
  return 'KES ' + Number(n).toLocaleString('en-KE')
}

export async function sendReceiptEmail(payment) {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('[email] SMTP not configured — skipping receipt for', payment.email)
    return { skipped: true }
  }

  const paidOn = new Date(payment.paidAt || Date.now()).toLocaleString('en-KE', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const html = `
  <div style="font-family: Segoe UI, Tahoma, sans-serif; background:#FFFBF5; padding:32px; color:#1c1917;">
    <div style="max-width:580px; margin:0 auto; background:#fff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,.06)">
      <div style="background:#EA580C; padding:28px 32px; color:#fff;">
        <h1 style="margin:0; font-size:22px; letter-spacing:.3px;">Sunshine ECDE School</h1>
        <p style="margin:6px 0 0; opacity:.9; font-size:13px;">Official Payment Receipt</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="margin:0 0 6px; font-size:14px; color:#57534e;">Dear <strong>${escapeHtml(payment.name)}</strong>,</p>
        <p style="margin:0 0 18px; font-size:14px; line-height:1.55; color:#44403c;">
          We have received your school fees payment. Thank you for trusting Sunshine ECDE School with your child's early years education.
        </p>

        <div style="background:#FFF7ED; border:1px solid #FED7AA; border-radius:14px; padding:18px 20px; margin-bottom:18px;">
          <h2 style="margin:0 0 12px; font-size:14px; color:#9A3412; text-transform:uppercase; letter-spacing:.5px;">Receipt Details</h2>
          <table style="width:100%; font-size:14px; color:#292524; border-collapse:collapse;">
            ${row('Receipt No.', payment.mpesaReceipt || payment.id)}
            ${row('Amount Paid', `<strong>${formatKES(payment.amount)}</strong>`)}
            ${row('Payment Method', payment.method || 'M-Pesa')}
            ${row('Phone Number', payment.phone)}
            ${row('Paid On', paidOn)}
            ${row('Status', '<span style="color:#15803D; font-weight:600;">Confirmed</span>')}
          </table>
        </div>

        <p style="margin:0 0 6px; font-size:13px; color:#57534e;">
          Keep this email as proof of payment. If you have any questions, reply to this email or call us on
          <a href="tel:+254700000000" style="color:#EA580C; text-decoration:none;">+254 700 000 000</a>.
        </p>
      </div>
      <div style="background:#1C1917; padding:18px 32px; color:#a8a29e; font-size:12px;">
        © ${new Date().getFullYear()} Sunshine ECDE School · Nairobi, Kenya
      </div>
    </div>
  </div>`

  const text = `Sunshine ECDE School — Payment Receipt

Dear ${payment.name},

We've received your school fees payment.

Receipt No.: ${payment.mpesaReceipt || payment.id}
Amount: ${formatKES(payment.amount)}
Payment Method: ${payment.method || 'M-Pesa'}
Phone: ${payment.phone}
Paid On: ${paidOn}
Status: Confirmed

Thank you for trusting Sunshine ECDE School.`

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: payment.email,
    subject: `Payment Receipt · ${formatKES(payment.amount)} · Sunshine ECDE`,
    html,
    text,
  })
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 0; color:#78716c; width:42%;">${label}</td>
    <td style="padding:6px 0; text-align:right;">${value}</td>
  </tr>`
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c])
}
