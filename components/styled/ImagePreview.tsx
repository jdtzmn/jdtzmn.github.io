// eslint-disable-next-line import/no-named-default
import { default as NextImage, ImageLoaderProps } from 'next/image'
import styled from 'styled-components'
import { addHttpsIfNecessary } from 'src/utils'

const defaultImageQuality = 75
const lowQualityImage = { width: 11, height: 8 }

function contentfulLoader({ src, width, quality }: ImageLoaderProps) {
  // Guard against gif, since resizing a gif takes more time than it saves
  if (src.includes('.gif')) {
    return src
  }

  // Customize image width and quality if not customized already
  const srcUrl = new URL(src)
  if (!srcUrl.searchParams.has('w')) {
    srcUrl.searchParams.set('w', width.toString())
  }
  if (!srcUrl.searchParams.has('q')) {
    srcUrl.searchParams.set('q', (quality || defaultImageQuality).toString())
  }

  // Use webp when available
  if (!srcUrl.searchParams.has('fm')) {
    srcUrl.searchParams.set('fm', 'webp')
  }

  return srcUrl.toString()
}

interface StyledNextImageProps {
  $styleImage?: boolean
}

export const StyledNextImage = styled(NextImage).attrs(({ src }) => {
  const srcIsString = typeof src === 'string'
  let srcUrl: string | undefined
  let blurDataURL: string | undefined

  // If the src is a url, then ensure it has https and define a blur data url
  if (srcIsString) {
    srcUrl = addHttpsIfNecessary(src)

    const urlObj = new URL(srcUrl)
    urlObj.searchParams.set('w', lowQualityImage.width.toString())
    urlObj.searchParams.set('h', lowQualityImage.height.toString())

    blurDataURL = urlObj.toString()
  }

  return {
    loader: contentfulLoader,
    layout: 'responsive',
    src: srcIsString ? srcUrl : src,
    placeholder: 'blur',
    blurDataURL,
  }
})<StyledNextImageProps>`
  ${({ $styleImage, theme }) =>
    $styleImage
      ? `
        border-radius: 16px;
        box-shadow: 0 5px 30px ${theme.colors.black};
      `
      : ''}
`

export default StyledNextImage

export const ImagePreviewContainer = styled.div`
  & > div {
    overflow: visible !important;
  }
`
