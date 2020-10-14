import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Container, Subtitle } from 'components/styled'
import { PageTitle, Navbar, Footer } from './'

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

export const CenteredSubtitle = styled(Subtitle)`
  text-align: center;
  margin: 2.5em 0 2.5em;
`

interface PageProps {
  name: string // used for the page title
  header?: string // label on the page itself
  noContainer?: boolean // whether to not wrap the page content in a container
  animationDelay?: number // the animation delay for the navbar and footer
  condensed?: boolean // whether the navbar should be condensed. Defaults to true
}

export default function Page({
  name,
  header,
  noContainer,
  animationDelay,
  condensed = true,
  children,
}: PropsWithChildren<PageProps>) {
  const content = (
    <>
      {header && <CenteredSubtitle>{header}</CenteredSubtitle>}
      {children}
    </>
  )

  return (
    <FlexWrapper>
      <FlexGrow>
        <PageTitle breadcrumbs={[name]} />
        <Navbar animationDelay={animationDelay} condensed={condensed} />
        {noContainer ? content : <Container>{content}</Container>}
      </FlexGrow>
      <Footer />
    </FlexWrapper>
  )
}
