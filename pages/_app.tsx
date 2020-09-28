import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
