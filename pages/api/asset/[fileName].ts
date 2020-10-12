import { NextApiRequest, NextApiResponse } from 'next'
import Contentful from 'src/Contentful'
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
}
