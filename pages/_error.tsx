import Link from 'next/link'
import Page from 'components/shared/Page'

interface ErrorProps {
  statusCode: string
}

export default function Error({ statusCode }: ErrorProps) {
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
