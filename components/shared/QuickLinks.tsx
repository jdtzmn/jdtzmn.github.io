import Link from 'next/link'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { Button } from 'components/styled'

const QuickLinksContainer = styled.div`
  padding-top: 32px;
  text-align: center;

  & > * {
    margin: 1em 0;
    width: 100%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: flex;
    justify-content: center;
    padding: 3em 0 2em;

    & > * {
      margin: 1em;
      width: auto;
    }
  }
`

export interface QuickLinkInfo {
  href: string
  text: string
  kind?: string
}

function constructQuickLink(linkInfo: QuickLinkInfo, index: number) {
  return (
    <Fade delay={index * 100} key={linkInfo.href}>
      <Link href={linkInfo.href} passHref>
        <Button kind={linkInfo.kind} as="a">
          {linkInfo.text}
        </Button>
      </Link>
    </Fade>
  )
}

interface QuickLinksProps {
  links: QuickLinkInfo[]
}

export default function QuickLinks({ links }: QuickLinksProps) {
  return (
    <QuickLinksContainer>{links.map(constructQuickLink)}</QuickLinksContainer>
  )
}
