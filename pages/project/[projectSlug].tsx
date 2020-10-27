import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { transparentize } from 'polished'
import Page from 'components/shared/Page'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Contentful from 'src/Contentful'
import ContentNotFound from 'pages/404'
import {
  Heading,
  Subtitle,
  ImagePreview,
  ReadingInset,
} from 'components/styled'
import ContactIfError from 'components/shared/ContactIfError'
import { Asset } from 'contentful'

const PageIndicator = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Inconsolata', monospace;
  font-weight: 700;
  margin-bottom: 0;
`

const ProjectName = styled(Heading)`
  font-family: 'Roboto Slab', serif;
  font-weight: 500;
  margin: 0 48px 0 0;
  flex-grow: 1;
`

const ProjectDate = styled(Subtitle)`
  font-size: 1em;
  font-weight: 300;
  color: ${({ theme }) => transparentize(0.3, theme.colors.gray)};
  margin-bottom: 0.4em;
`

const CoverContainer = styled.div`
  margin: 3em 0;

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet + 1}px) {
    margin: 3.5em 0;
  }
`

const Cover = styled(ImagePreview)`
  display: block;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 5px 30px
    ${({ theme }) => transparentize(0.8, theme.colors.black)};
`

const PaddedHr = styled.hr`
  margin: 1.25em 0 2em;
`

export interface ProjectData {
  cover: Asset
  name: string
  description?: string
  date?: string
  slug: string
  synopsis: Document
}

interface ProjectProps {
  projectData: ProjectData
}

export default function Project({ projectData }: ProjectProps) {
  const router = useRouter()

  if (!projectData || router.isFallback) {
    return <ContentNotFound />
  }

  const cover = projectData.cover?.fields

  return (
    <Page name={projectData.name} image={cover.file.url} type="article">
      <ReadingInset>
        <PageIndicator>Project</PageIndicator>
        <ProjectName>{projectData.name}</ProjectName>
        {projectData.date && <ProjectDate>{projectData.date}</ProjectDate>}
        {cover ? (
          <CoverContainer>
            <Cover
              styleImage
              src={cover.file.url}
              alt={`${cover.title} Cover Image`}
              width={cover.file.details.image.width}
              height={cover.file.details.image.height}
              priority
            />
          </CoverContainer>
        ) : (
          <PaddedHr />
        )}
        {documentToReactComponents(projectData.synopsis)}
        <hr />
        <ContactIfError />
      </ReadingInset>
    </Page>
  )
}

export async function getStaticProps({
  preview,
  params,
}: GetStaticPropsContext) {
  const projectEntries = await Contentful.getEntries<ProjectData>(
    'project',
    preview,
    {
      'fields.slug': params.projectSlug,
    }
  )
  const projectData = projectEntries.items[0]?.fields

  return {
    props: {
      preview: preview || null,
      projectData: projectData || null,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const projectEntries = await Contentful.getEntries<ProjectData>('project')
  const paths = projectEntries.items.map((projectEntry) => {
    const { slug } = projectEntry.fields
    return {
      params: { projectSlug: slug },
    }
  })

  return { paths, fallback: true }
}
