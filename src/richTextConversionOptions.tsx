import Link from 'next/link'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { File } from 'src/Contentful'
import AssetBlock from 'components/shared/AssetBlock'

interface HyperlinkTarget {
  fields: Record<string, any>
  sys: Record<string, any>
}

/**
 * @description Determine the href of a target entry if possible, otherwise return null
 * @param {HyperlinkTarget} target The target entry to link to
 * @returns {(string | null)} Either an href string or null
 */
function constructHrefFromTarget(target: HyperlinkTarget): string | null {
  try {
    const targetType = target.sys.contentType.sys.id
    const targetFields = target.fields

    switch (targetType) {
      case 'project':
        return `/project/${targetFields.slug as string}`
      default:
        return null
    }
  } catch {
    return null
  }
}

/**
 * A set of render options used when rendering contentful rich text as react components
 *
 * Example:
 *   import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
 *   documentToReactComponents(document, richTextConversionOptions)
 */
const richTextConversionOptions: Options = {
  renderText: (text) => {
    // replace new lines with break elements
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { description, file } = node.data.target.fields as {
        description: string
        file: File
      }
      return <AssetBlock description={description} file={file} />
    },
    [INLINES.ENTRY_HYPERLINK]: (node) => {
      const hyperlinkContent = node.content
      const hyperlinkTarget = node.data.target
      const hyperlinkHref = constructHrefFromTarget(hyperlinkTarget)

      // to render the hyperlink's content
      const hyperlinkDocument = {
        content: hyperlinkContent,
        data: {},
        nodeType: BLOCKS.DOCUMENT,
      }

      return (
        <Link href={hyperlinkHref} passHref>
          <a>
            {documentToReactComponents(
              hyperlinkDocument as any,
              richTextConversionOptions
            )}
          </a>
        </Link>
      )
    },
  },
}

export default richTextConversionOptions
