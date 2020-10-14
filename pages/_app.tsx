import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import PreviewBanner from 'components/shared/PreviewBanner'
import { defaultTheme } from 'styles/themes'
import GlobalStyles from 'styles/global'

export const theme = defaultTheme

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <PreviewBanner isPreview={pageProps.preview} />
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </>
  )
}
