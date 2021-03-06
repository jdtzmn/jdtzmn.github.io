import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import PreviewBanner from 'components/shared/PreviewBanner'
import { defaultTheme } from 'styles/themes'
import GlobalStyles from 'styles/global'
import { guardEnv } from 'src/utils'

export const theme = defaultTheme

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const siteURL = guardEnv(
    'NEXT_PUBLIC_SITE_URL or VERCEL_URL',
    process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
  )

  const contentURL = new URL(router.pathname, siteURL)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/ico" />
        <meta name="og:site_name" content="Jacob Daitzman" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="Jacob Daitzman" />
        <meta name="og:url" content={contentURL.toString()} />
        <script
          async
          defer
          data-domain={contentURL.hostname}
          src="https://plausible.io/js/plausible.js"
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
