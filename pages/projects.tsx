import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'
import randomColor from 'randomcolor'
import Fade from 'react-reveal/Fade'
import useResponsive from 'src/hooks/useResponsive'
import {
  Container,
  Subtitle,
  VerticalAlign,
  ImagePreview,
} from 'components/styled'
import Page from 'components/shared/Page'
import Contentful from 'src/Contentful'
import { ProjectData } from './project/[projectSlug]'

const ProjectsContainer = styled(Container)`
  padding: 0;
  padding-bottom: 4em;
`

const NoUnderlineAnchor = styled.a`
  text-decoration: none;
`

const Project = styled.div`
  padding: 1.5em 1em;
  border-radius: 16px;
  transition: background 0.2s;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: flex;
    padding: 2em;

    &:hover {
      background: ${({ theme }) =>
        transparentize(0.95, lighten(0.9, theme.colors.background))};
    }
  }
`

const ImageContainer = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: 200px;
    min-width: 200px;
    height: auto;
  }
`

const Details = styled(VerticalAlign)`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding-left: 64px;
  }
`

const Cover = styled(ImagePreview)`
  box-shadow: 0 5px 5px
    ${({ theme }) => transparentize(0.8, theme.colors.black)};
  border-radius: 16px;
  margin-bottom: 2em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: 100%;
    max-height: 140px;
    object-fit: cover;
    margin-bottom: 0;
  }
`

interface ColorTileProps {
  slug: string
}

const ColorTile = styled.div<ColorTileProps>`
  height: 100%;
  min-height: 120px;
  width: 100%;
  background: ${({ slug }) => randomColor({ seed: slug })};
  box-shadow: 0 5px 5px
    ${({ theme }) => transparentize(0.8, theme.colors.black)};
  border-radius: 16px;
`

const Name = styled(Subtitle)`
  font-family: 'Roboto Slab', serif;
  font-weight: 500;
  text-decoration: none;
  margin: 0.2em 0;
`

const projectFadeInDelay = 150 // delay in ms between revealing each project

interface ProjectsProps {
  projectsData: ProjectData[]
}

export default function Projects({ projectsData }: ProjectsProps) {
  const { isMobile } = useResponsive()

  const projects = projectsData.map((projectData, index) => {
    const { slug, name, description } = projectData

    const baseDelay = index * projectFadeInDelay

    const cover = projectData.cover?.fields
    const progressiveCoverUrl =
      cover && cover.file.url + '?fm=jpg&fl=progressive'

    return (
      <Link href={`/project/${slug}`} passHref key={slug}>
        <NoUnderlineAnchor>
          <Project>
            <ImageContainer>
              <VerticalAlign style={{ height: '100%' }}>
                <Fade delay={baseDelay + 100}>
                  {cover ? (
                    <Cover src={progressiveCoverUrl} />
                  ) : (
                    !isMobile && <ColorTile slug={slug} />
                  )}
                </Fade>
              </VerticalAlign>
            </ImageContainer>
            <Details>
              <Fade delay={baseDelay}>
                <Name>{name}</Name>
              </Fade>
              {description && (
                <Fade delay={baseDelay + 50}>
                  <p>{description}</p>
                </Fade>
              )}
            </Details>
          </Project>
          {isMobile && <hr />}
        </NoUnderlineAnchor>
      </Link>
    )
  })

  return (
    <Page name="Projects" header="Projects">
      <ProjectsContainer>{projects}</ProjectsContainer>
    </Page>
  )
}

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const projectEntries = await Contentful.getEntries<ProjectData>(
    'project',
    preview
  )
  const projectsData = projectEntries.items.map((entry) => entry.fields)

  return {
    props: {
      preview: preview || null,
      projectsData: projectsData || null,
    },
    revalidate: 60,
  }
}
