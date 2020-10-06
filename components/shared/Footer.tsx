import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { Container, Button } from 'components/styled'
import Link from 'next/link'

const Background = styled.footer`
  background: ${({ theme }) => darken(0.025, theme.colors.background)};
  padding: 64px;
  padding-bottom: 48px;
`

const FooterContainer = styled(Container)`
  max-width: 800px;
`

const FooterSections = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0.5em 0 1.5em;
`

const FooterSection = styled.div`
  flex: 1;
  min-width: 7em;
  margin: 0.6em 0;
  &:not(:last-child) {
    margin-right: 2.5em;
  }
`

const FooterSectionTitle = styled.p`
  color: ${({ theme }) =>
    theme.light
      ? lighten(0.2, theme.colors.text)
      : darken(0.05, theme.colors.text)};
  font-size: 0.9em;
  font-weight: 400;
`

const FooterAnchor = styled(Button)`
  color: ${({ theme }) =>
    theme.light
      ? lighten(0.5, theme.colors.text)
      : darken(0.3, theme.colors.text)};
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  font-weight: 500;
  padding: 0;
  border: 0;
  margin: 0.75em 0;
`

const Copyright = styled.p`
  text-align: center;
  font-size: 0.7em;
`

type FooterLink = [label: string, link: string]

interface FooterSection {
  name: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    name: 'Links',
    links: [
      ['Home', '/'],
      ['Status', '/status'],
      ['Projects', '/projects'],
    ],
  },
  {
    name: 'Social',
    links: [
      ['GitHub', 'https://github.com/jdtzmn'],
      ['LinkedIn', 'https://linkedin.com/in/jdtzmn'],
    ],
  },
  {
    name: 'Contact',
    links: [['Get in Touch', '/contact']],
  },
]

const Footer = () => {
  const sections = footerSections.map(({ name, links }) => {
    const footerSectionLinks = links.map(([label, link]) => {
      return (
        <Link href={link} passHref key={`footer-${link}`}>
          <FooterAnchor kind="text" as="a">
            {label}
          </FooterAnchor>
        </Link>
      )
    })

    return (
      <FooterSection key={`footer-${name}`}>
        <FooterSectionTitle as="h2">{name}</FooterSectionTitle>
        {footerSectionLinks}
      </FooterSection>
    )
  })

  return (
    <Background role="contentinfo">
      <FooterContainer>
        <FooterSections>{sections}</FooterSections>
      </FooterContainer>
      <Copyright>© 2020 Jacob Daitzman. All rights reserved.</Copyright>
    </Background>
  )
}

export default Footer
