import { useState } from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { File } from 'src/Contentful'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ImagePreview, VerticalAlign, Subtitle } from 'components/styled'
import useResponsive from 'src/hooks/useResponsive'

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
  order: number
}

interface FlexRowProps {
  isOddRow: boolean
}

const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  padding-${({ isOddRow }) => (isOddRow ? 'left' : 'right')}: 12.5%;
`

const ShowcaseInfo = styled(VerticalAlign)`
  flex: 40;
`

const ShowcasePreview = styled(VerticalAlign)`
  flex: 60;
  padding: 5%;
`

const Preview = styled(ImagePreview)`
  max-width: 80%;
  max-height: 800px;
  width: auto;
  margin: 0 auto;
`

/**
 * The number of milliseconds to wait after the information is revealed before showing the preview
 */
const previewRevealDelay = 600 // ms

interface ShowcaseItemProps {
  item: ShowcaseData
  index: number
  animationDelay: number
}

function ShowcaseItem({ item, index, animationDelay }: ShowcaseItemProps) {
  const [infoRevealed, setInfoRevealed] = useState(false)
  const imageFile = item.image.fields.file
  const isOddRow = index % 2 === 0

  const isFirstRow = index === 0
  const hasNotScrolled = typeof window !== 'undefined' && window.scrollY === 0
  const fadeDelay = isFirstRow && hasNotScrolled ? animationDelay : 0

  function onInfoRevealed() {
    setInfoRevealed(true)
  }

  const showcaseContent = [
    <ShowcaseInfo key={item.name + '-info'}>
      <Fade
        bottom
        delay={fadeDelay}
        distance="50%"
        wait={fadeDelay}
        onReveal={onInfoRevealed}
      >
        <div>
          <Subtitle>{item.name}</Subtitle>
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
        duration={500}
        when={infoRevealed}
      >
        <Preview
          styleImage={item.roundCorners}
          src={imageFile.url}
          alt={imageFile.title}
        />
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
  const { isTablet } = useResponsive()

  return (
    <div>
      {!isTablet &&
        items
          .sort(byOrder)
          .map((item, index) => (
            <ShowcaseItem
              item={item}
              index={index}
              animationDelay={animationDelay}
              key={item.name}
            />
          ))}
    </div>
  )
}
