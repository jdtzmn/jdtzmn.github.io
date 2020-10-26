import qs from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import stripHtml from 'string-strip-html'
import axios from 'axios'
import { guardEnv } from 'src/utils'

sgMail.setApiKey(guardEnv('SENDGRID_API_KEY'))

function emailContent(message: string, from: string) {
  const html = `
<p>
${message}
</p>
<br/><br/>
<sub>
  <b>${
    from
      ? `This message is from your portfolio website, specifically the ${from} page.`
      : 'This message is from your portfolio website.'
  }</b>
  <br/>
  <i>Click "Reply" to respond to these comments.</i>
</sub>
  `

  const text = stripHtml(html).result
  return [html, text]
}

function constructEmail(
  name: string,
  email: string,
  message: string,
  from?: string
) {
  const [html, text] = emailContent(message, from)

  const msg: sgMail.MailDataRequired = {
    to: guardEnv('NEXT_PUBLIC_CONTACT_EMAIL'),
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
  const { name, email, message, captcha, from } = req.body

  // guards
  const invalidName = typeof name !== 'string' || name === ''
  const invalidEmail =
    typeof email !== 'string' ||
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) === null
  const invalidMessage = typeof message !== 'string' || message.length > 1500
  const invalidCaptcha = typeof captcha !== 'string'
  if (invalidName || invalidEmail || invalidMessage || invalidCaptcha) {
    return res.status(400).end()
  }

  // verify captcha
  const verifyUrl = 'https://hcaptcha.com/siteverify'
  try {
    const requestBody = {
      secret: guardEnv('HCAPTCHA_SECRET_KEY'),
      response: captcha,
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await axios.post(
      verifyUrl,
      qs.stringify(requestBody),
      config
    )
    if (!response.data.success) {
      console.error(response.data)
      return res.status(400).end()
    }
  } catch (err) {
    console.error(err)

    return res.status(500).end()
  }

  // send email
  try {
    const msg = constructEmail(name, email, message, from)
    await sgMail.send(msg)
    res.end()
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
