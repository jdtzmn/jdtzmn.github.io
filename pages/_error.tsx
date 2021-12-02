import NextErrorComponent from 'next/error'
import Link from 'next/link'
import Page from 'components/shared/Page'
import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode: string
}

// Custom Error Page
function CustomError({ statusCode }: ErrorProps) {
  return (
    <Page name="Error" header={`Error ${statusCode}`}>
      <h2 style={{ textAlign: 'center' }}>
        Something didn't work quite right.
      </h2>
      <p style={{ textAlign: 'center' }}>
        You could try again or{' '}
        <Link href={`contact?from=/${statusCode}error`} passHref>
          <a>get in touch</a>
        </Link>{' '}
        if the issue persists.
      </p>
    </Page>
  )
}

// Sentry Wrapper
const SentryError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err)
    // Flushing is not required in this case as it only happens on the client
  }

  return <CustomError statusCode={statusCode} />
}

SentryError.getInitialProps = async ({ res, err, asPath }) => {
  const pageContext: NextPageContext = {
    res,
    err,
    pathname: undefined,
    query: undefined,
    AppTree: undefined,
  }
  const errorInitialProps = await NextErrorComponent.getInitialProps(
    pageContext
  )

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  const errorInitialPropsWithFlag = {
    ...errorInitialProps,
    hasGetInitialPropsRun: true,
  }

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (err) {
    Sentry.captureException(err)

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000)

    return errorInitialPropsWithFlag
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(
      `_error.tsx getInitialProps missing data at path: ${asPath as string}`
    )
  )
  await Sentry.flush(2000)

  return errorInitialPropsWithFlag
}

export default SentryError
