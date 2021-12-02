import { useState, useEffect, useRef } from 'react'
// eslint-disable-next-line import/no-named-default
import { default as NextImage, ImageLoaderProps, ImageProps } from 'next/image'
import { useIntersection } from 'next/dist/client/use-intersection'
import styled from 'styled-components'
import { addHttpsIfNecessary, mergeRefs } from 'src/utils'

const defaultImageQuality = 75
const lowQualityImageQuery = 'w=11&h=8'

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

export const StyledNextImage = styled(NextImage).attrs(({ src }) => ({
  loader: contentfulLoader,
  layout: 'responsive',
  src: typeof src === 'string' ? addHttpsIfNecessary(src) : src, // fix `//domain.com` urls, where `https` is missing
}))<StyledNextImageProps>`
  ${({ $styleImage, theme }) =>
    $styleImage
      ? `
        border-radius: 16px;
        box-shadow: 0 5px 30px ${theme.colors.black};
      `
      : ''}
`

interface LoadingContainerProps {
  loaded: boolean
}

const LoadingContainer = styled.div<LoadingContainerProps>`
  position: relative;
  transition: filter 0.3s;
  ${({ loaded }) => !loaded && 'filter: blur(10px);'}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

type LoadingImageProps = Omit<ImageProps & StyledNextImageProps, 'layout'>

export function LoadingImage(props: LoadingImageProps) {
  const imgParentRef = useRef<HTMLDivElement>()

  const [loaded, setLoaded] = useState(false)

  // Use the intersection hook that next.js uses for image detection
  const [setRef, isIntersected] = useIntersection<HTMLDivElement>({
    rootMargin: '200px',
    disabled: props.priority,
  })

  function handleImageLoad(img: HTMLImageElement) {
    // Mark the image as loaded
    setLoaded(true)

    // Delete the image element
    img.remove()
  }

  useEffect(() => {
    // Only load images once intersected
    if (isIntersected || props.priority) {
      // Get the image src of the image element that is being loaded
      const imgParentEl = imgParentRef.current

      // Short circuit if the parent element is undefined
      if (typeof imgParentEl === 'undefined') return
      const imgEl = imgParentEl.querySelector('img')

      // Create an image element to track the loading
      const img = new Image()
      img.addEventListener('load', () => handleImageLoad(img), false)
      img.src = imgEl.src
    }
  }, [isIntersected])

  const lowQualityImage =
    typeof props.src === 'string'
      ? `${props.src}?${lowQualityImageQuery}`
      : props.src

  return (
    <LoadingContainer loaded={loaded} ref={mergeRefs(setRef, imgParentRef)}>
      <StyledNextImage {...props} />
      {!loaded && (
        <Overlay>
          <StyledNextImage {...props} priority src={lowQualityImage} />
        </Overlay>
      )}
    </LoadingContainer>
  )
}

interface ImagePreviewProps {
  loadIn?: boolean
}

export default function ImagePreview(
  props: LoadingImageProps & ImagePreviewProps
) {
  // By default, load in if `priority` prop is not set
  const loadInSet = typeof props.loadIn === 'boolean'
  const shouldLoadIn = !loadInSet || props.loadIn

  // Load in the image
  if (shouldLoadIn) {
    return <LoadingImage {...props} />
    // Or don't if `loadIn` is false
  } else {
    return <StyledNextImage {...props} />
  }
}

export const ImagePreviewContainer = styled.div`
  & > div {
    overflow: visible !important;
  }
`
