import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Tada from 'react-reveal/Tada'
import Fade from 'react-reveal/Fade'
import { PageTitle, Navbar, Footer, QuickLinks } from 'components/shared'
import { QuickLinkInfo } from 'components/shared/QuickLinks'
import {
  VerticalAlign,
  Container,
  Title,
  Subtitle,
  Button,
} from 'components/styled'
import BoxArtwork from 'components/homepage/BoxArtwork'
import Showcase, { ShowcaseData } from 'components/homepage/Showcase'
import Contentful from 'src/Contentful'

const AboveFoldGradient = styled.div`
  background: linear-gradient(
    ${({ theme }) => lighten(0.025, theme.colors.background)},
    ${({ theme }) => theme.colors.background}
  );
`

const ResponsiveVerticalAlign = styled(VerticalAlign)`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    min-height: calc(80vh - 152px); /* The height of the Navbar */
  }
`

const FlexContainer = styled(Container)`
  padding-top: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    display: flex;
  }
`

const Introduction = styled.div`
  flex: 3;
  margin-bottom: 1em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding-right: 96px;
  }
`

const Artwork = styled(VerticalAlign)`
  flex: 1;
`

const TitleWithoutPadding = styled(Title)`
  display: flex;
  margin-bottom: 0;
`

const BlurbSubtitle = styled(Subtitle)`
  margin-top: 5px;
`

const PaddedButton = styled(Button).attrs({
  as: 'a',
})`
  display: inline-block;
  margin-top: 3em;
`

const QuickLinksContainer = styled(Container)`
  padding-top: 0;
  padding-bottom: 2em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding-top: 2em;
    padding-bottom: 4em;
  }
`

const homepageQuickLinks: QuickLinkInfo[] = [
  {
    href: '/status',
    text: 'Learn more about me',
    kind: 'gray',
  },
  {
    href: '/projects',
    text: 'View my other projects',
  },
]

interface HomepageData {
  callToAction: string
  blurb: Document
  keywords: string
}

interface IndexProps {
  homepageData: HomepageData
  showcaseData: ShowcaseData[]
}

export default function Index({ showcaseData, homepageData }: IndexProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="I’m a primarily self-taught software engineer who started programming in second grade. Learn more about me and my projects on this portfolio website."
        />
        <meta name="keywords" content={homepageData.keywords} />
      </Head>
      <PageTitle />
      <AboveFoldGradient>
        <Navbar />
        <ResponsiveVerticalAlign>
          <FlexContainer>
            <Introduction>
              <TitleWithoutPadding>
                <Fade bottom>
                  <Tada delay={100}>👋 &nbsp;</Tada>
                </Fade>
                <Fade bottom cascade delay={200}>
                  i’m jacob
                </Fade>
              </TitleWithoutPadding>
              <BlurbSubtitle colored>
                <Fade bottom delay={600}>
                  {homepageData.callToAction}
                </Fade>
              </BlurbSubtitle>
              <Fade bottom cascade delay={1000} distance="32px">
                <div>{documentToReactComponents(homepageData.blurb)}</div>
              </Fade>
              <Fade bottom delay={1300} distance="32px">
                <Link href="/contact" passHref>
                  <PaddedButton>Get in Touch</PaddedButton>
                </Link>
              </Fade>
            </Introduction>
            <Artwork>
              <Fade delay={1800}>
                <BoxArtwork animationDelay={1900} />
              </Fade>
            </Artwork>
          </FlexContainer>
        </ResponsiveVerticalAlign>
      </AboveFoldGradient>
      <Showcase items={showcaseData} animationDelay={2000} />
      <QuickLinksContainer>
        <QuickLinks links={homepageQuickLinks} />
      </QuickLinksContainer>
      <Footer />
    </>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  let homepageData: HomepageData = null
  let showcaseData: ShowcaseData[] = null
  const [homepageEntries, showcaseEntries] = await Promise.all([
    Contentful.getEntries<HomepageData>('homepage', preview),
    Contentful.getEntries<ShowcaseData>('showcase', preview),
  ])
  homepageData = homepageEntries.items[0].fields
  showcaseData = showcaseEntries.items.map((entry) => entry.fields)

  return {
    props: {
      preview: preview || null,
      homepageData,
      showcaseData,
    },
    revalidate: 60,
  }
}
