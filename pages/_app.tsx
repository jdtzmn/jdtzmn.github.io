import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/themes'
import GlobalStyles from 'styles/global'

export const theme = defaultTheme

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}
