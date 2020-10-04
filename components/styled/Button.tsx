import styled from 'styled-components'

interface ButtonProps {
  kind?: string
}

const Button = styled.button<ButtonProps>`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  padding: 0.75em 1.5em;
  font: 600 1em 'Inconsolata', monospace;
  border: ${({ theme }) => (theme.light ? '1px' : '2.5px')} solid;
  border-radius: 8px;
  text-decoration: none; /* for use with links */
  cursor: pointer;
  transition: all ${({ theme }) => theme.animationDuration};
  ${({ theme }) =>
    theme.light
      ? 'box-shadow: 0 0 2px, inset 0 0 2px;'
      : 'box-shadow: 0 1px 8px, inset 0 0 8px;'}

  &:hover:not(:disabled) {
    ${({ theme }) =>
      theme.light
        ? 'box-shadow: 0 1px 8px, inset 0 0 1px;'
        : 'box-shadow: 0 3px 14px, inset 0 0 7px;'}
  }

  &:active {
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ kind, theme }) =>
    kind === 'secondary' && `color: ${theme.colors.secondary};`}

  ${({ kind, theme }) => kind === 'gray' && `color: ${theme.colors.gray};`}

  ${({ kind, theme }) =>
    kind === 'text' &&
    `
  color: ${theme.colors.headers};
  border-color: transparent;
  box-shadow: none !important;
  `}
`
export default Button
