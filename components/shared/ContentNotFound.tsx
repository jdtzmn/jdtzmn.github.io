import Head from 'next/head'
import DefaultErrorPage from 'next/error'

export default function ContentNotFound() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  )
}
