import { NextApiRequest, NextApiResponse } from 'next'

function determineRedirectURL(contentType: string, slug: string) {
  switch (contentType) {
    case 'homepage':
      return '/'
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // check the secret and next parameters
  const previewSecret = process.env.PREVIEW_SECRET

  const { secret, contentType, slug } = req.query
  const invalidToken = previewSecret && secret !== previewSecret
  const invalidType = !contentType || Array.isArray(contentType)
  const invalidSlug = Array.isArray(slug)

  if (invalidToken || invalidType || invalidSlug) {
    if (invalidToken) console.error('Invalid preview token')
    if (invalidType) console.error('Invalid content type')
    if (invalidSlug) console.error('Invalid slug')

    return res.status(400).end()
  }

  // enable Preview Mode by setting the cookies
  res.setPreviewData({})

  const redirectURL = determineRedirectURL(
    contentType as string,
    slug as string
  )

  // redirect to the slug
  res.redirect(redirectURL)
}
