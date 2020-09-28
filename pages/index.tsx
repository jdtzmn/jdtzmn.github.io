import styled from 'styled-components'

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`

export default function Index() {
  return <Header>Hello World</Header>
}
