import Image from 'next/image'
import styled from 'styled-components'
import { addHttpsIfNecessary } from 'src/utils'

interface StyledNextImageProps {
  styleImage?: boolean
}

const StyledNextImage = styled(Image).attrs(({ src }) => ({
  src: addHttpsIfNecessary(src), // fix `//domain.com` urls
}))<StyledNextImageProps>`
  ${({ styleImage, theme }) =>
    styleImage
      ? `
        border-radius: 16px;
        box-shadow: 0 5px 30px ${theme.colors.black};
      `
      : ''}
`

export const ImagePreviewContainer = styled.div`
  & > div {
    overflow: visible !important;
  }
`

export default StyledNextImage
