import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { transparentize } from 'polished'
import Fade from 'react-reveal/Fade'
import { RiErrorWarningLine } from 'react-icons/ri'
import { Button } from 'components/styled'

const ContactButton = styled(Button).attrs({
  as: 'a',
})`
  color: ${({ theme }) => transparentize(0.15, theme.colors.secondary)};
  font-size: 0.9em;
  font-weight: 400;
  border-color: transparent;
  box-shadow: none !important;
  padding-left: 0;
`

export default function ContactIfError() {
  const router = useRouter()

  return (
    <Fade duration={600}>
      <Link href={`/contact?from=${router.asPath}`}>
        <ContactButton>
          <RiErrorWarningLine style={{ verticalAlign: 'bottom' }} /> Something
          wrong? Let me know.
        </ContactButton>
      </Link>
    </Fade>
  )
}
