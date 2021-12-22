import styled from 'styled-components'

const Screen = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: ${(props) => props.theme.colors.background};
`

/**
 * This screen will cover the entire page and is used to
 * stop the flashing effect when the page is not ready.
 */
export default function LoadingScreen() {
  return <Screen aria-hidden="true" />
}
