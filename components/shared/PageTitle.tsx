import Head from 'next/head'

const pageTitle = 'Jacob Daitzman'
export function constructPageTitle(breadcrumbs: string[] = []) {
  return breadcrumbs.concat([pageTitle]).join(' – ')
}

interface PageTitleProps {
  breadcrumbs?: string[]
}

function PageTitle(props: PageTitleProps) {
  const { breadcrumbs } = props
  const pageTitle = constructPageTitle(breadcrumbs)

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  )
}

export default PageTitle
