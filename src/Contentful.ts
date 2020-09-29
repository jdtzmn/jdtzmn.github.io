import * as contentful from 'contentful'
import { guardEnv } from './utils'

export default class Contentful {
  static createClient(preview: boolean) {
    const space = guardEnv('CONTENTFUL_SPACE_ID')
    let accessToken = guardEnv('CONTENTFUL_ACCESS_TOKEN')

    let host: string
    if (preview) {
      host = 'preview.contentful.com'
      accessToken = guardEnv('CONTENTFUL_PREVIEW_TOKEN')
    }

    const client = contentful.createClient({
      space,
      accessToken,
      host,
    })

    return client
  }

  static async getEntries(contentType: string, preview: boolean, query = {}) {
    return await Contentful.createClient(preview).getEntries({
      content_type: contentType,
      ...query,
    })
  }
}
