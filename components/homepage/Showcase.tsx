import styled from 'styled-components'
import { File } from 'src/Contentful'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ImagePreview, VerticalAlign, Subtitle } from 'components/styled'

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

interface ShowcaseProps {
  items: ShowcaseData[]
}

interface ShowcaseItemProps {
  item: ShowcaseData
  index: number
}

function ShowcaseItem({ item, index }: ShowcaseItemProps) {
  const imageFile = item.image.fields.file
  const isOddRow = index % 2 === 0

  const showcaseContent = [
    <ShowcaseInfo key={item.name + '-info'}>
      <Subtitle>{item.name}</Subtitle>
      {documentToReactComponents(item.summary)}
    </ShowcaseInfo>,
    <ShowcasePreview key={item.name + '-preview'}>
      <Preview
        styleImage={item.roundCorners}
        src={imageFile.url}
        alt={imageFile.title}
      />
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

export default function Showcase({ items }: ShowcaseProps) {
  return (
    <div>
      {items.sort(byOrder).map((item, index) => (
        <ShowcaseItem item={item} index={index} key={item.title} />
      ))}
    </div>
  )
}
