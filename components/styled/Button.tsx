import { ComponentPropsWithRef } from 'react'
import styled from 'styled-components'

// styled buttons
const DefaultButton = styled.button`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  padding: 0.75em 1.5em;
  font: 600 1em 'Inconsolata', monospace;
  border: ${({ theme }) => (theme.light ? '1px' : '2.5px')} solid;
  border-radius: 8px;
  text-decoration: none; /* for use with links */
  cursor: pointer;
  transition: all 0.2s;
  ${({ theme }) =>
    theme.light
      ? 'box-shadow: 0 0 2px, inset 0 0 2px;'
      : 'box-shadow: 0 1px 8px, inset 0 0 8px;'}

  &:hover {
    ${({ theme }) =>
      theme.light
        ? 'box-shadow: 0 1px 8px, inset 0 0 1px;'
        : 'box-shadow: 0 3px 14px, inset 0 0 7px;'}
  }

  &:active {
    box-shadow: none;
  }
`

const SecondaryButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.secondary};
`

const GrayButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.gray};
`

const TextButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.headers};
  border-color: transparent;
  box-shadow: none !important;
`

// button component

type ButtonType = 'primary' | 'secondary' | 'gray' | 'text'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  kind?: ButtonType
  as?: never
}

export default function Button({ kind, children, ...props }: ButtonProps) {
  switch (kind) {
    case 'secondary':
      return <SecondaryButton {...props}>{children}</SecondaryButton>
    case 'gray':
      return <GrayButton {...props}>{children}</GrayButton>
    case 'text':
      return <TextButton {...props}>{children}</TextButton>
    case 'primary':
    default:
      return <DefaultButton {...props}>{children}</DefaultButton>
  }
}
