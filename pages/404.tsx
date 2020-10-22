import { useRouter } from 'next/router'
import Link from 'next/link'
import Page from 'components/shared/Page'

export default function Error() {
  const router = useRouter()
  const handleReturn = () => router.back()

  return (
    <Page name="Not Found" header="Page not found">
      <h2 style={{ textAlign: 'center' }}>
        We couldn't find the page you were looking for.
      </h2>
      <p style={{ textAlign: 'center' }}>
        You could{' '}
        <a href="#" onClick={handleReturn}>
          {' '}
          return to the last page you visited
        </a>{' '}
        or{' '}
        <Link href="/" passHref>
          <a>go to the homepage</a>
        </Link>
        .
      </p>
    </Page>
  )
}
