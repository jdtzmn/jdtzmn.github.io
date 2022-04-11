import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer, { SendMailOptions } from 'nodemailer'
import { stripHtml } from 'string-strip-html'
import axios from 'axios'
import { withSentry } from '@sentry/nextjs'
import { guardEnv } from 'src/utils'

// Cache transporter
let transporter: nodemailer.Transporter
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: guardEnv('CONTACT_SMTP_HOST'),
      port: Number(guardEnv('CONTACT_SMTP_PORT')),
      secure: true,
      auth: {
        user: guardEnv('CONTACT_SMTP_USER'),
        pass: guardEnv('CONTACT_SMTP_PASS'),
      },
    })
  }

  return transporter
}

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

  const msg: SendMailOptions = {
    to: guardEnv('NEXT_PUBLIC_CONTACT_EMAIL'),
    from: {
      address: guardEnv('CONTACT_SMTP_USER'),
      name: 'Portfolio Website Contact Form',
    },
    subject: `New message from ${name}`,
    text,
    html,
    replyTo: {
      address: email,
      name,
    },
  }

  return msg
}

/**
 * Check whether a captcha is valid
 * @returns True if valid or the response otherwise
 */
async function isCaptchaValid(
  captcha: string
): Promise<[isValid: boolean, errorResponse?: any]> {
  const verifyUrl = 'https://hcaptcha.com/siteverify'
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
    new URLSearchParams(requestBody).toString(),
    config
  )

  if (response.data.success) {
    return [true, undefined]
  } else {
    return [false, response.data]
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()
  const { name, email, message, captcha, from } = req.body

  // guards against common form fields
  const invalidName = typeof name !== 'string' || name === ''
  const invalidEmail =
    typeof email !== 'string' ||
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) === null
  const invalidMessage = typeof message !== 'string' || message.length > 1500
  if (invalidName || invalidEmail || invalidMessage) {
    return res.status(400).end()
  }

  // verify captcha, if in a production environment
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    // confirm it is present
    const invalidCaptcha = typeof captcha !== 'string'
    if (invalidCaptcha) {
      return res.status(400).end()
    }

    // verify it is valid
    const [captchaIsValid, errorResponse] = await isCaptchaValid(captcha)

    if (!captchaIsValid) {
      console.error(errorResponse)
      return res.status(400).end()
    }
  }

  // send email
  const msg = constructEmail(name, email, message, from)
  await getTransporter().sendMail(msg)
  res.end()
}

export default withSentry(handler)
