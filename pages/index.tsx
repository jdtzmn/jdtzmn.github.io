import { GetStaticPropsContext } from 'next'
import styled from 'styled-components'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Navbar from 'components/shared/Navbar'
import PreviewBanner, { PreviewProps } from 'components/shared/PreviewBanner'
import { VerticalAlign, Container, Title, Subtitle } from 'components/styled'
import BoxArtwork from 'components/homepage/BoxArtwork'
import Contentful from 'src/Contentful'

const ResponsiveVerticalAlign = styled(VerticalAlign)`
  @media screen and (min-width: 768px) {
    min-height: calc(80vh - 152px); /* The height of the Navbar */
  }
`

const FlexContainer = styled(Container)`
  padding-top: 0;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`

const Introduction = styled.div`
  flex: 3;

  @media screen and (min-width: 768px) {
    padding-right: 96px;
  }
`

const Artwork = styled(VerticalAlign)`
  flex: 1;
`

const TitleWithoutPadding = styled(Title)`
  margin-bottom: 0;
`

const ColoredSubtitle = styled(Subtitle)`
  margin-top: 5px;
  color: #91cdf8;
`

interface HomepageData {
  callToAction: string
  blurb: Document
}

interface IndexProps extends PreviewProps {
  homepageData: HomepageData
}

export default function Index({ preview, homepageData }: IndexProps) {
  return (
    <>
      <Navbar />
      <ResponsiveVerticalAlign>
        <FlexContainer>
          <Introduction>
            <TitleWithoutPadding>👋 &nbsp;i’m jacob</TitleWithoutPadding>
            <ColoredSubtitle>{homepageData.callToAction}</ColoredSubtitle>
            {documentToReactComponents(homepageData.blurb)}
          </Introduction>
          <Artwork>
            <BoxArtwork />
          </Artwork>
        </FlexContainer>
        <PreviewBanner isPreview={preview} />
      </ResponsiveVerticalAlign>
    </>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  let homepageData: HomepageData = null
  try {
    const homepageEntries = await Contentful.getEntries('homepage', preview)
    homepageData = homepageEntries.items[0].fields as HomepageData
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      preview: preview || null,
      homepageData,
    },
    revalidate: 60,
  }
}
