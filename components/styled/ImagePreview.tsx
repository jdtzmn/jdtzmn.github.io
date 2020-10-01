import { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

interface ImagePreviewProps extends ComponentPropsWithoutRef<'img'> {
  styleImage?: boolean
}

const ImagePreview = styled.img<ImagePreviewProps>`
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
