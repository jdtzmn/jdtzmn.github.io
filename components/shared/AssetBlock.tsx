import Link from 'next/link'
import styled from 'styled-components'
import { RiFileLine } from 'react-icons/ri'
import { File } from 'src/Contentful'
import { Button, ImagePreview } from 'components/styled'

const MediaButton = styled(Button)`
  margin: 3em auto;
  display: inline-block;
`

const ImageBlockContainer = styled.div`
  margin: 3em auto;
`

const ImageDescription = styled.sub`
  display: block;
  text-align: center;
  margin-top: 2em;
`

const imageContentTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
]

/**
 * @description Determine whether a Contentful File is an image asset or not
 * @param {File} file The Contentful File
 * @returns {boolean}
 */
function fileIsAnImage(file: File): boolean {
  return imageContentTypes.includes(file.contentType)
}

interface AssetBlockProps {
  file: File
  // eslint-disable-next-line react/no-unused-prop-types
  description?: string
}

export function ImageBlock({ description, file }: AssetBlockProps) {
  return (
    <ImageBlockContainer>
      <ImagePreview
        src={file.url}
        alt={description}
        width={file.details.image.width}
        height={file.details.image.height}
      />
      {description && (
        <ImageDescription aria-hidden>{description}</ImageDescription>
      )}
    </ImageBlockContainer>
  )
}

export function MediaBlock({ file }: AssetBlockProps) {
  return (
    <Link href={file.url} passHref>
      <MediaButton kind="gray" as="a">
        <RiFileLine style={{ verticalAlign: 'top' }} /> {file.fileName}
      </MediaButton>
    </Link>
  )
}

export default function AssetBlock(props: AssetBlockProps) {
  const isImage = fileIsAnImage(props.file)
  if (isImage) {
    return <ImageBlock {...props} />
  } else {
    return <MediaBlock {...props} />
  }
}
