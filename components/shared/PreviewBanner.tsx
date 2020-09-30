import styled from 'styled-components'
import Link from 'next/link'

/**
 * @description A helper for page props that will have the `preview` value passed from context to the props
 * @export
 * @interface PreviewProps
 *
 * Usage:
 *   function Page(props: PreviewProps) {
 *     [...]
 *   }
 *
 */
export interface PreviewProps {
  preview: boolean
}

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`

interface PreviewBannerProps {
  isPreview: boolean
}

export default function PreviewBanner({ isPreview }: PreviewBannerProps) {
  if (!isPreview) return null

  return (
    <Banner>
      <span style={{ flex: 1 }}>You are in preview mode</span>
      <Link href="/api/exit-preview">Exit preview mode</Link>
    </Banner>
  )
}
