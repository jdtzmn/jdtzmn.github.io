import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import useResponsive from 'src/hooks/useResponsive'
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

const CenteredText = styled.div`
  text-align: center;
`

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { isTablet } = useResponsive()

  const { register, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(async ({ name, email, message }) => {
    setSubmitting(true)
    try {
      await axios.post('/api/contact', {
        name,
        email,
        message,
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

  const form = (
    <>
      <p>
        Send me an email at{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or submit the
        following form:
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
          helpText="Maximum of 1500 characters"
          error={errors.message}
        >
          <LongAnswer
            name="message"
            placeholder="Type your message here..."
            ref={register({
              required: 'Message is required',
              maxLength: {
                value: 1500,
                message: '1500 characters or less please',
              },
            })}
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
