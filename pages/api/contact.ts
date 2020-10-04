import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import stripHtml from 'string-strip-html'
import { guardEnv } from 'src/utils'

sgMail.setApiKey(guardEnv('SENDGRID_API_KEY'))

function emailContent(name: string, email: string, message: string) {
  const html = `
<p>
${message}
</p>
<br/><br/>
<sub>
  <i>Click "Reply" to respond to these comments</i>
</sub>
  `

  const text = stripHtml(html).result
  return [html, text]
}

function constructEmail(name: string, email: string, message: string) {
  const [html, text] = emailContent(name, email, message)

  const msg: sgMail.MailDataRequired = {
    to: guardEnv('CONTACT_EMAIL'),
    from: {
      email: guardEnv('SENDGRID_SENDER'),
      name,
    },
    subject: `New message from ${name}`,
    text,
    html,
    replyTo: {
      email,
      name,
    },
  }

  return msg
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()
  const { name, email, message } = req.body

  // guards
  const invalidName = typeof name !== 'string' || name === ''
  const invalidEmail =
    typeof email !== 'string' ||
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) === null
  const invalidMessage = typeof message !== 'string' || message.length > 1500
  if (invalidName || invalidEmail || invalidMessage) {
    return res.status(400).end()
  }

  // send email
  try {
    const msg = constructEmail(name, email, message)
    await sgMail.send(msg)
    res.end()
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
