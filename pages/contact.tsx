import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import useResponsive from 'src/hooks/useResponsive'
import useWordCount, { calculateWordCount } from 'src/hooks/useWordCount'
import { Subtitle, Button } from 'components/styled'
import {
  Form,
  Block,
  ShortAnswer,
  LongAnswer,
  commandEnterShortcut,
} from 'components/form'
import Page from 'components/shared/Page'
import { guardEnv } from 'src/utils'
import { theme } from './_app'

const MAX_WORD_COUNT = 400

declare global {
  interface Window {
    grecaptcha: any
  }
}

const CenteredText = styled.div`
  text-align: center;
`

interface FormData {
  name: string
  email: string
  message: string
  captcha: string
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const { isTablet } = useResponsive()
  const [count, handleChange] = useWordCount()

  const { register, handleSubmit, setValue, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(async ({ name, email, message, captcha }) => {
    setSubmitting(true)

    const { from } = router.query

    try {
      await axios.post('/api/contact', {
        name,
        email,
        message,
        captcha,
        from,
      })
      setSuccess(true)
    } catch (err) {
      console.error(err)

      if (err.response?.status === 400) {
        setFormError(
          "Something didn't look right. Try fixing the fields above or try again later."
        )
      } else {
        setFormError('An unknown error occured. Please try again later.')
      }
    } finally {
      setSubmitting(false)
    }
  })

  // register recaptcha with react-hook-form
  useEffect(() => {
    register(
      { name: 'captcha' },
      {
        required: 'Please prove you are a human',
      }
    )
  })

  function handleRecaptchaToken(token: string) {
    setValue('captcha', token)
  }

  const successMessage = (
    <Fade>
      <CenteredText>
        <Subtitle>Message Received 🎉</Subtitle>
        <p>I'll try to get back to you within a few days</p>
      </CenteredText>
    </Fade>
  )

  const contactEmail = guardEnv(
    'NEXT_PUBLIC_CONTACT_EMAIL',
    process.env.NEXT_PUBLIC_CONTACT_EMAIL
  )

  const mailtoHref =
    router.query.from && !Array.isArray(router.query.from)
      ? `mailto:${contactEmail}?subject=I found an issue on the ${router.query.from} page`
      : `mailto:${contactEmail}`

  const form = (
    <>
      <p>
        Send me an email at <a href={mailtoHref}>{contactEmail}</a> or submit
        the following form:
      </p>
      <br />
      <Form disableAutoscroll={!isTablet} onSubmit={onSubmit}>
        <Block
          prompt="What is your name?"
          required
          helpText="Last names optional."
          error={errors.name}
        >
          <ShortAnswer
            name="name"
            placeholder="Type your answer here..."
            ref={register({
              required: 'Name is required',
            })}
          />
        </Block>
        <Block
          prompt="What is the best email for you?"
          required
          helpText="I'll use this email for responses only. You will never receive newsletters or spam."
          error={errors.email}
        >
          <ShortAnswer
            name="email"
            type="email"
            placeholder="Type your answer here..."
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </Block>
        <Block
          prompt="What's your message?"
          required
          nextShortcut={commandEnterShortcut}
          helpText={
            MAX_WORD_COUNT - count >= 0
              ? `${MAX_WORD_COUNT - count} words remaining.`
              : `${
                  count - MAX_WORD_COUNT
                } words too many. Please cut down your message to ${MAX_WORD_COUNT} words before submitting.`
          }
          error={errors.message}
        >
          <LongAnswer
            name="message"
            placeholder="Type your message here..."
            onChange={handleChange}
            ref={register({
              required: 'Message is required',
              validate: {
                wordCount: (value) =>
                  calculateWordCount(value) < MAX_WORD_COUNT ||
                  'Word count exceeded',
              },
            })}
          />
        </Block>
        <Block error={errors.captcha}>
          <ReCAPTCHA
            sitekey={guardEnv(
              'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
            )}
            theme={theme.light ? 'light' : 'dark'}
            onChange={handleRecaptchaToken}
          />
        </Block>
        <Block error={formError}>
          <Button type="submit" disabled={submitting}>
            Send Message
          </Button>
        </Block>
      </Form>
    </>
  )

  const header = !success && 'Get in Touch'

  return (
    <Page name="Contact" header={header}>
      {success ? successMessage : form}
    </Page>
  )
}
