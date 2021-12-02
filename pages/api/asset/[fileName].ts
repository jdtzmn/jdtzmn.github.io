import { NextApiRequest, NextApiResponse } from 'next'
import Contentful from 'src/Contentful'
import axios from 'axios'
import { withSentry } from '@sentry/nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName } = req.query
  if (Array.isArray(fileName)) return res.status(400).end()
  const asset = await Contentful.getAssetByFileName(fileName)
  if (!asset) {
    res.status(404).end()
  }

  const { url } = asset.fields.file
  const fileURL = url.includes('http') ? url : 'https:' + url
  const response = await axios.get(fileURL, { responseType: 'stream' })
  response.data.pipe(res)

  await new Promise((resolve, reject) => {
    response.data.on('end', resolve)
    response.data.on('error', reject)
  })
}

export default withSentry(handler)
