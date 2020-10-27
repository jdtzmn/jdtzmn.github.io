import Image from 'next/image'
import styled from 'styled-components'
import { addHttpsIfNecessary } from 'src/utils'

interface ImagePreviewProps {
  styleImage?: boolean
}

const ImagePreview = styled(Image).attrs(({ src }) => ({
  src: addHttpsIfNecessary(src), // fix `//domain.com` urls
}))<ImagePreviewProps>`
  display: block;
  width: 100%;

  ${({ styleImage, theme }) =>
    styleImage
      ? `
    box-shadow: 0 5px 30px ${theme.colors.black};
    border-radius: 16px;
  `
      : ''}
`

export default ImagePreview
