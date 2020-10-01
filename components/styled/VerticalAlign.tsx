import { Children, ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const VerticalFlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function VerticalAlign({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <VerticalFlexCenter {...props}>
      {Children.count(children) > 1 ? <div>{children}</div> : children}
    </VerticalFlexCenter>
  )
}
