import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: min(max(1.1vw, 16px), 22px);
    font-weight: 300;
    line-height: 1.5;
    background: #060929;
    color: ${({ theme }) => theme.colors.text};
  }

  .ReactCollapse--collapse {
    transition: height 400ms;
  }
`

export default GlobalStyles
