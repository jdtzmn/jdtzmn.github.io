import { createGlobalStyle } from 'styled-components'
import { readableColor, transparentize } from 'polished'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
  }

  body, input, textarea {
    font-family: 'Inter', sans-serif;
    font-size: min(max(1.1vw, 16px), 22px);
    font-weight: 300;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }

  hr {
    border-style: solid;
    border-color: ${({ theme }) => transparentize(0.9, theme.colors.text)};
  }

  a {
    color: ${({ theme }) => theme.colors.text};
  }

  .ReactCollapse--collapse {
    transition: height 400ms;
  }

  ::selection {
    background: ${({ theme }) => transparentize(0.1, theme.colors.secondary)};
    color: ${({ theme }) =>
      readableColor(theme.colors.secondary, theme.lightText, theme.darkText)}
  }
`

export default GlobalStyles
