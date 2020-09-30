import { ComponentPropsWithRef } from 'react'
import styled from 'styled-components'

// styled buttons
const DefaultButton = styled.button`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  padding: 0.75em 1.5em;
  font: 600 0.9em 'Fira Code', monospace;
  border: 2.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 1px 8px ${({ theme }) => theme.colors.primary},
    inset 0 0 8px ${({ theme }) => theme.colors.primary};
  text-decoration: none; /* for use with links */
  cursor: pointer;
`

const SecondaryButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 1px 8px ${({ theme }) => theme.colors.secondary},
    inset 0 0 8px ${({ theme }) => theme.colors.secondary};
`

const GrayButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.gray};
  border-color: ${({ theme }) => theme.colors.gray};
  box-shadow: 0 1px 8px ${({ theme }) => theme.colors.gray},
    inset 0 0 8px ${({ theme }) => theme.colors.gray};
`

const TextButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.surface};
  border-color: transparent;
  box-shadow: none;
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
