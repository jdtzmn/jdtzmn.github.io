import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData()
  res.redirect(req.headers.referer || '/')
}
