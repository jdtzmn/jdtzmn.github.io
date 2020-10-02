import { createGlobalStyle } from 'styled-components'
import { transparentize } from 'polished'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: min(max(1.1vw, 16px), 22px);
    font-weight: 300;
    line-height: 1.5;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  hr {
    border-style: solid;
    border-color: ${({ theme }) => transparentize(0.9, theme.colors.text)};
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.gray};
  }

  .ReactCollapse--collapse {
    transition: height 400ms;
  }
`

export default GlobalStyles
