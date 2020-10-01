import { ThemeProvider } from 'styled-components'
import PreviewBanner from 'components/shared/PreviewBanner'
import { defaultTheme } from 'styles/themes'
import GlobalStyles from 'styles/global'

export const theme = defaultTheme

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <PreviewBanner isPreview={pageProps.preview} />
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}
