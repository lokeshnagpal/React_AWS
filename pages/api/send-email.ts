import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log('resend', resend, process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  console.log('req', req.body)
  console.log('res', res)
  const { email, sub, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'info@ldonlineitsolutions.com',
      to: email,
      subject: sub,
      html: message,
    });

    return res.status(200).json({ message: 'Email sent', response });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
