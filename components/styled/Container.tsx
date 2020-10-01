import styled from 'styled-components'

export default styled.div`
  margin: 0 auto;
  padding: 32px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: 75%;
  }
`
