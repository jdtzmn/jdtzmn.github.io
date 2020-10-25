import { GetStaticPropsContext } from 'next'
import styled from 'styled-components'
import { lighten } from 'polished'
import Fade from 'react-reveal/Fade'
import { Page, QuickLinks } from 'components/shared'
import { QuickLinkInfo } from 'components/shared/QuickLinks'
import { Document } from '@contentful/rich-text-types'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import Contentful from 'src/Contentful'
import useResponsive from 'src/hooks/useResponsive'
import { Heading } from 'components/styled'
import ContactIfError from 'components/shared/ContactIfError'

const CenteredHeading = styled(Heading)`
  color: ${({ theme }) => lighten(0.05, theme.colors.gray)};
  text-align: center;
  margin: 2em 0;
`

const Details = styled.div`
  margin-top: 3em;
`

const documentRendererOptions: Options = {
  renderText: (text) => {
    // replace new lines with break elements
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
}

// several links to put at the bottom of the status page
const statusQuickLinks: QuickLinkInfo[] = [
  {
    text: 'View Projects',
    href: '/projects',
    kind: 'gray',
  },
  {
    text: 'Get in Touch',
    href: '/contact',
  },
]

interface StatusData {
  brief: string
  details: Document
  contactDetails: Document
}

interface StatusProps {
  statusData: StatusData
  updatedAt: string // date string
}

export default function Status({ statusData, updatedAt }: StatusProps) {
  const { isCustom } = useResponsive(1160)

  const dateLocaleOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const lastUpdated = new Date(updatedAt).toLocaleDateString(
    undefined,
    dateLocaleOptions
  )

  return (
    <Page name="Status" header="Status">
      <CenteredHeading>
        <Fade bottom cascade={isCustom} distance="56px">
          {statusData.brief}
        </Fade>
      </CenteredHeading>
      <hr />
      <Fade bottom cascade distance="56px" delay={500}>
        <Details>
          {documentToReactComponents(
            statusData.details,
            documentRendererOptions
          )}
        </Details>
      </Fade>
      <sub>Last updated {lastUpdated}.</sub>
      <ContactIfError />
      <hr />
      <QuickLinks links={statusQuickLinks} />
    </Page>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const statusEntries = await Contentful.getEntries<StatusData>(
    'status',
    preview
  )
  const statusData = statusEntries.items[0]?.fields
  const updatedAt = statusEntries.items[0]?.sys.updatedAt

  return {
    props: {
      preview: preview || null,
      statusData: statusData || null,
      updatedAt: updatedAt || null,
    },
    revalidate: 60,
  }
}
