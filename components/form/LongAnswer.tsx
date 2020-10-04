import { transparentize, lighten } from 'polished'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'

const LongAnswer = styled(TextareaAutosize).attrs(() => ({
  rows: 3,
}))`
  display: block;
  width: calc(100% - 2em - 3px);
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1em;
  padding: 1em;
  border: 1.5px solid;
  border-color: ${({ theme }) =>
    transparentize(0.6, theme.light ? theme.darkText : theme.lightText)};
  border-radius: 8px;
  outline: 0;
  resize: none;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }

  &:focus {
    background: ${({ theme }) => lighten(0.05, theme.colors.background)};
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary};

    &::placeholder {
      color: ${({ theme }) => (theme.light ? theme.darkText : theme.lightText)};
    }
  }
`

export default LongAnswer
