import { useState, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import Fade from 'react-reveal/Fade'
import { File } from 'src/Contentful'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Container,
  ImagePreview,
  ImagePreviewContainer,
  VerticalAlign,
  Subtitle,
} from 'components/styled'
import useResponsive from 'src/hooks/useResponsive'
import { ProjectData } from 'pages/project/[projectSlug]'

export interface ShowcaseData {
  image: {
    fields: {
      file: File
      title: string
    }
    sys: any
  }
  roundCorners: boolean
  name: string
  summary: Document
  project?: {
    fields: ProjectData
    sys: any
  }
  order: number
}

interface FlexRowProps {
  isOddRow: boolean
}

const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  padding-${({ isOddRow }) => (isOddRow ? 'left' : 'right')}: 12.5%;
  overflow-x: hidden;
`

const ClickySubtitle = styled(Subtitle).attrs({
  as: 'a',
})`
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) =>
      theme.light
        ? lighten(0.25, theme.colors.headers)
        : darken(0.2, theme.colors.headers)};
  }
`

const ShowcaseInfo = styled(VerticalAlign)`
  flex: 40;
`

const ShowcasePreview = styled(VerticalAlign)`
  flex: 60;
  padding: 5%;
`

const PreviewContainer = styled(ImagePreviewContainer)`
  max-width: 75%;
  margin: 2em auto 2em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    margin: 0 auto;
  }
`

const Hr = styled.hr`
  margin-top: 64px;
`

interface ShowcaseTitleProps {
  showcaseData: ShowcaseData
}

function ShowcaseTitle({ showcaseData }: ShowcaseTitleProps) {
  const { project } = showcaseData
  if (typeof project === 'undefined') {
    return <Subtitle>{showcaseData.name}</Subtitle>
  }

  const projectURL = `/project/${showcaseData.project.fields.slug}`

  return (
    <Link href={projectURL} passHref>
      <ClickySubtitle>{showcaseData.name}</ClickySubtitle>
    </Link>
  )
}

/**
 * The number of milliseconds to wait after the information is revealed before showing the preview
 */
const previewRevealDelay = 600 // ms

interface ShowcaseItemProps {
  item: ShowcaseData
  /* eslint-disable react/no-unused-prop-types */
  index?: number
  animationDelay?: number
  /* eslint-enable react/no-unused-prop-types */
}

function ShowcaseTabletItem({ item }: ShowcaseItemProps) {
  const imageFile = item.image.fields.file

  return (
    <Container>
      <Fade bottom distance="48px" duration={500}>
        <div>
          <ShowcaseTitle showcaseData={item} />
          <PreviewContainer>
            <ImagePreview
              $styleImage={item.roundCorners}
              src={imageFile.url}
              alt={imageFile.title}
              width={imageFile.details.image.width}
              height={imageFile.details.image.height}
              priority
            />
          </PreviewContainer>
          {documentToReactComponents(item.summary)}
        </div>
      </Fade>
      <Hr />
    </Container>
  )
}

function ShowcaseDesktopItem({
  item,
  index,
  animationDelay,
}: ShowcaseItemProps) {
  const [infoRevealed, setInfoRevealed] = useState(false)
  const imageFile = item.image.fields.file
  const isOddRow = index % 2 === 0

  const isFirstRow = index === 0
  const hasNotScrolled = typeof window !== 'undefined' && window.scrollY === 0
  const fadeDelay = isFirstRow && hasNotScrolled ? animationDelay : 0

  const onInfoRevealed = useCallback(() => {
    setInfoRevealed(true)
  }, [setInfoRevealed])

  const showcaseContent = [
    <ShowcaseInfo key={item.name + '-info'}>
      <Fade
        bottom
        delay={fadeDelay}
        distance="50%"
        wait={fadeDelay}
        onReveal={onInfoRevealed}
        when={isFirstRow ? true : undefined}
      >
        <div>
          <ShowcaseTitle showcaseData={item} />
          {documentToReactComponents(item.summary)}
        </div>
      </Fade>
    </ShowcaseInfo>,
    <ShowcasePreview key={item.name + '-preview'}>
      <Fade
        right={isOddRow}
        left={!isOddRow}
        delay={previewRevealDelay}
        distance="10%"
        duration={800}
        when={infoRevealed}
      >
        <PreviewContainer>
          <ImagePreview
            $styleImage={item.roundCorners}
            src={imageFile.url}
            alt={imageFile.title}
            width={imageFile.details.image.width}
            height={imageFile.details.image.height}
            priority
          />
        </PreviewContainer>
      </Fade>
    </ShowcasePreview>,
  ]

  return (
    <FlexRow isOddRow={isOddRow}>
      {isOddRow ? showcaseContent : showcaseContent.reverse()}
    </FlexRow>
  )
}

function byOrder(itemA: ShowcaseData, itemB: ShowcaseData) {
  return itemA.order - itemB.order
}

interface ShowcaseProps {
  items: ShowcaseData[]
  animationDelay?: number
}

export default function Showcase({ items, animationDelay = 0 }: ShowcaseProps) {
  const { isDesktop } = useResponsive()

  return (
    <div style={{ overflowY: 'hidden' }}>
      {!isDesktop &&
        items
          .sort(byOrder)
          .map((item) => (
            <ShowcaseTabletItem item={item} key={item.name + '-tablet'} />
          ))}
      {isDesktop &&
        items
          .sort(byOrder)
          .map((item, index) => (
            <ShowcaseDesktopItem
              item={item}
              index={index}
              animationDelay={animationDelay}
              key={item.name + '-desktop'}
            />
          ))}
    </div>
  )
}
