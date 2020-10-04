import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import Navbar from 'components/shared/Navbar'
import { Container, Subtitle, Button } from 'components/styled'
import {
  Form,
  Block,
  ShortAnswer,
  LongAnswer,
  commandEnterShortcut,
} from 'components/form'

const CenteredSubtitle = styled(Subtitle)`
  text-align: center;
  margin: 0.25em 0 2.5em;
`

const CenteredText = styled.div`
  text-align: center;
`

interface FormData {
  name: string
  email: string
  message: string
}

const ENABLE_AUTOSCROLL = false

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

  const form = (
    <>
      <CenteredSubtitle>Get in Touch</CenteredSubtitle>
      <Form disableAutoscroll={!ENABLE_AUTOSCROLL} onSubmit={onSubmit}>
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
            ENABLE_AUTOSCROLL
              ? 'Use ⌘-Enter or Ctrl-Enter to continue.'
              : 'Maximum of 1500 characters'
          }
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

  return (
    <>
      <Navbar />
      <Container>{success ? successMessage : form}</Container>
    </>
  )
}
