import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { lighten } from 'polished'
import Fade from 'react-reveal/Fade'
import Page from 'components/shared/Page'
import { Document } from '@contentful/rich-text-types'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import Contentful from 'src/Contentful'
import useResponsive from 'src/hooks/useResponsive'
import { Heading, Button } from 'components/styled'

const CenteredHeading = styled(Heading)`
  color: ${({ theme }) => lighten(0.05, theme.colors.gray)};
  text-align: center;
  margin: 2em 0;
`

const Details = styled.div`
  margin-top: 3em;
`

const QuickLinks = styled.div`
  padding-top: 32px;

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

const documentRendererOptions: Options = {
  renderText: (text) => {
    // replace new lines with break elements
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
}

interface StatusData {
  brief: string
  details: Document
  contactDetails: Document
}

interface StatusProps {
  statusData: StatusData
}

export default function Status({ statusData }: StatusProps) {
  const { isDesktop } = useResponsive()
  return (
    <Page name="Status" header="Status">
      <CenteredHeading>
        <Fade bottom cascade={isDesktop} distance="56px">
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
      <hr />
      <QuickLinks>
        <Fade>
          <Link href="/projects" passHref>
            <Button kind="gray" as="a">
              View Projects
            </Button>
          </Link>
        </Fade>
        <Fade delay={100}>
          <Link href="/contact" passHref>
            <Button as="a">Get in Touch</Button>
          </Link>
        </Fade>
      </QuickLinks>
    </Page>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  let statusData: StatusData = null
  try {
    const statusEntries = Contentful.getEntries('status', preview)
    statusData = (await statusEntries).items[0]?.fields as StatusData
  } catch (err) {
    console.error(err)
    throw err
  }

  return {
    props: {
      preview: preview || null,
      statusData: statusData || null,
    },
    revalidate: 60,
  }
}
