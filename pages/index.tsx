import { GetStaticPropsContext } from 'next'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Tada from 'react-reveal/Tada'
import Fade from 'react-reveal/Fade'
import { PageTitle, Navbar, Footer } from 'components/shared'
import { VerticalAlign, Container, Title, Subtitle } from 'components/styled'
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

interface HomepageData {
  callToAction: string
  blurb: Document
}

interface IndexProps {
  homepageData: HomepageData
  showcaseData: ShowcaseData[]
}

export default function Index({ showcaseData, homepageData }: IndexProps) {
  return (
    <>
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
      <Footer />
    </>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  let homepageData: HomepageData = null
  let showcaseData: ShowcaseData[] = null
  try {
    const [homepageEntries, showcaseEntries] = await Promise.all([
      Contentful.getEntries('homepage', preview),
      Contentful.getEntries('showcase', preview),
    ])
    homepageData = homepageEntries.items[0].fields as HomepageData
    showcaseData = showcaseEntries.items.map(
      (entry) => entry.fields
    ) as ShowcaseData[]
  } catch (err) {
    console.error(err)
    throw err
  }

  return {
    props: {
      preview: preview || null,
      homepageData,
      showcaseData,
    },
    revalidate: 60,
  }
}
