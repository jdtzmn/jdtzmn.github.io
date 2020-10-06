import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Container, Subtitle } from 'components/styled'
import { PageTitle, Navbar, Footer } from './'

const CenteredSubtitle = styled(Subtitle)`
  text-align: center;
  margin: 0.25em 0 2.5em;
`

interface PageProps {
  name: string // used for the page title
  header?: string // label on the page itself
  noContainer?: boolean // whether to not wrap the page content in a container
  animationDelay?: number // the animation delay for the navbar and footer
}

export default function Page({
  name,
  header,
  noContainer,
  animationDelay,
  children,
}: PropsWithChildren<PageProps>) {
  const content = (
    <>
      {header && <CenteredSubtitle>{header}</CenteredSubtitle>}
      {children}
    </>
  )

  return (
    <>
      <PageTitle breadcrumbs={[name]} />
      <Navbar animationDelay={animationDelay} />
      {noContainer ? content : <Container>{content}</Container>}
      <Footer />
    </>
  )
}
