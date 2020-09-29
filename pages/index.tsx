import styled from 'styled-components'
import { VerticalAlign, Container, Title, Subtitle } from 'components/styled'
import BoxArtwork from 'components/homepage/BoxArtwork'

const ResponsiveVerticalAlign = styled(VerticalAlign)`
  @media (min-width: 768px) {
    min-height: 80vh;
  }
`

const FlexContainer = styled(Container)`
  @media (min-width: 768px) {
    display: flex;
  }
`

const Introduction = styled.div`
  flex: 3;

  @media (min-width: 768px) {
    padding-right: 96px;
  }
`

const Artwork = styled(VerticalAlign)`
  flex: 1;
`

const TitleWithoutPadding = styled(Title)`
  margin-bottom: 0;
`

const ColoredSubtitle = styled(Subtitle)`
  margin-top: 5px;
  color: #91cdf8;
`

export default function Index() {
  return (
    <ResponsiveVerticalAlign>
      <FlexContainer>
        <Introduction>
          <TitleWithoutPadding>👋 &nbsp;i’m jacob</TitleWithoutPadding>
          <ColoredSubtitle>
            I like making apps that improve lives
          </ColoredSubtitle>
          <p>
            I’m a primarily self-taught software engineer who started
            programming in second grade.
            <br />
            <br />
            I’ve worked on over 30 personal and professional projects including
            web-based developer dashboards, native mobile applications, desktop
            applications, sound-based data transmission libraries, cryptographic
            protocols, and cemetery websites.
          </p>
        </Introduction>
        <Artwork>
          <BoxArtwork />
        </Artwork>
      </FlexContainer>
    </ResponsiveVerticalAlign>
  )
}
