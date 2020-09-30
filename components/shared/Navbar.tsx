import styled from 'styled-components'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { RiHome2Line, RiRadarLine, RiLayoutGridFill } from 'react-icons/ri'
import { Container, Button } from 'components/styled'
import { ReactElement } from 'react'

interface NavbarLink {
  text: string
  to: string
  icon: ReactElement
}

const navbarLinks: NavbarLink[] = [
  {
    text: 'Home',
    to: '/',
    icon: <RiHome2Line />,
  },
  {
    text: 'Status',
    to: '/status',
    icon: <RiRadarLine />,
  },
  {
    text: 'Projects',
    to: '/projects',
    icon: <RiLayoutGridFill />,
  },
]

const NavbarContainer = styled(Container)`
  display: flex;
  flex: row wrap;
`

const LinkButton = styled(Button)`
  color: ${({ theme }) => theme.colors.gray};
  padding-left: 0;
  margin-left: 0.75em;

  &:first-child {
    margin-left: 0;
  }
`

export default function Navbar() {
  return (
    <IconContext.Provider value={{ size: '0.75em' }}>
      <NavbarContainer>
        {navbarLinks.map((navbarLink) => (
          <Link href={navbarLink.to} passHref key={navbarLink.to}>
            <LinkButton kind="text" forwardedAs={'a' as never}>
              {navbarLink.icon}
              {' ' + navbarLink.text}
            </LinkButton>
          </Link>
        ))}
      </NavbarContainer>
    </IconContext.Provider>
  )
}
