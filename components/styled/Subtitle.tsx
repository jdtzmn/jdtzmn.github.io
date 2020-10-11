import styled from 'styled-components'
import { tint } from 'polished'

interface SubtitleProps {
  colored?: boolean
}

export default styled.h3<SubtitleProps>`
  color: ${({ theme }) => theme.colors.headers};
  font-size: 1.8em;
  line-height: 1.5em;
  font-weight: 500;

  ${({ theme, colored }) =>
    colored && `color: ${tint(0.2, theme.colors.primary)};`}
`
