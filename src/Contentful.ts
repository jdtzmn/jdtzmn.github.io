import * as contentful from 'contentful'
import { guardEnv } from './utils'

export interface File {
  contentType: string
  details: Record<string, any>
  fileName: string
  url: string
  title: string
}

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

  static async getAssetByFileName(
    fileName: string
  ): Promise<null | contentful.Asset> {
    const { items, total } = await Contentful.createClient(false).getAssets({
      'fields.file.fileName': fileName,
    })

    if (total === 0) {
      return null
    }

    return items[0]
  }
}
