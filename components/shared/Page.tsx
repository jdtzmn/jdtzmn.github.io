import { PropsWithChildren } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Container, Subtitle } from 'components/styled'
import { PageTitle, Navbar, Footer } from './'
import { constructPageTitle } from './PageTitle'
import { guardEnv } from 'src/utils'

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

// type of page for opengraph
type PageType = 'website' | 'article'

interface PageProps {
  name: string // used for the page title
  header?: string // label on the page itself
  noContainer?: boolean // whether to not wrap the page content in a container
  animationDelay?: number // the animation delay for the navbar and footer
  condensed?: boolean // whether the navbar should be condensed. Defaults to true
  image?: string // url for an image related to the current page
  description?: string // a description for the current page
  type?: PageType
}

export default function Page({
  name,
  header,
  noContainer,
  animationDelay,
  condensed = true,
  image,
  description,
  type = 'website',
  children,
}: PropsWithChildren<PageProps>) {
  const content = (
    <>
      {header && <CenteredSubtitle>{header}</CenteredSubtitle>}
      {children}
    </>
  )

  const siteUrl = guardEnv(
    'NEXT_PUBLIC_SITE_URL or VERCEL_URL',
    process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
  )

  return (
    <>
      <Head>
        <meta name="og:type" content={type} />
        <meta name="og:title" content={constructPageTitle([name])} />
        {image ? (
          <meta name="og:image" content={image} />
        ) : (
          <meta name="og:image" content={siteUrl + '/favicon.png'} />
        )}
        {description && (
          <>
            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
          </>
        )}
      </Head>
      <FlexWrapper>
        <FlexGrow>
          <PageTitle breadcrumbs={[name]} />
          <Navbar animationDelay={animationDelay} condensed={condensed} />
          {noContainer ? content : <Container>{content}</Container>}
        </FlexGrow>
        <Footer />
      </FlexWrapper>
    </>
  )
}
