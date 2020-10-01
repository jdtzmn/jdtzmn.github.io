import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import {
  RiHome2Line,
  RiRadarLine,
  RiLayoutGridFill,
  RiMenu3Line,
  RiCloseFill,
} from 'react-icons/ri'
import { Collapse } from 'react-collapse'
import Fade from 'react-reveal/Fade'
import { Container, Button } from 'components/styled'

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

const DesktopNavbarContainer = styled(Container)`
  display: none;

  @media (min-width: 481px) {
    display: flex;
    flex-flow: row wrap;
  }
`

interface MobileNavbarContainerProps {
  isOpened: boolean
}

const MobileNavbarContainer = styled(Container)<MobileNavbarContainerProps>`
  display: flex;
  justify-content: flex-end;
  padding: 24px 16px 24px 32px;
  ${({ isOpened }) => isOpened && 'background: #060929;'}
  transition: background 400ms;
  transition-delay: 100ms;

  & > :first-child {
    /* collapse content */
    flex: 1;
  }

  @media (min-width: 481px) {
    display: none;
  }
`

const LinkButton = styled(Button)`
  color: ${({ theme }) => theme.colors.gray};
  padding-left: 0;
  margin-left: 0;

  @media screen and (min-width: 481px) {
    margin-left: 0.75em;

    &:first-child {
      margin-left: 0;
    }
  }
`

const AlignRight = styled.div`
  margin-left: auto;
`

const ResumeButton = styled(Button)`
  @media screen and (max-width: 480px) {
    margin-top: 12px;
  }
`

const navbarButtonsAnimationDelay = 75

interface NavbarProps {
  animationDelay?: number
}

export default function Navbar({ animationDelay = 0 }: NavbarProps) {
  const [open, setOpen] = useState(false)

  function toggleCollapse() {
    setOpen(!open)
  }

  const collapseIcon = open ? <RiCloseFill /> : <RiMenu3Line />

  const navbarContent = (
    <IconContext.Provider value={{ size: '0.75em' }}>
      {navbarLinks.map((navbarLink, index) => (
        <Link href={navbarLink.to} passHref key={navbarLink.to}>
          <Fade delay={animationDelay + index * navbarButtonsAnimationDelay}>
            <LinkButton kind="text" forwardedAs={'a' as never}>
              {navbarLink.icon}
              {' ' + navbarLink.text}
            </LinkButton>
          </Fade>
        </Link>
      ))}
      <AlignRight>
        <Fade
          delay={
            animationDelay + navbarLinks.length * navbarButtonsAnimationDelay
          }
        >
          <ResumeButton kind="gray">Resume</ResumeButton>
        </Fade>
      </AlignRight>
    </IconContext.Provider>
  )

  return (
    <>
      <DesktopNavbarContainer>{navbarContent}</DesktopNavbarContainer>
      <MobileNavbarContainer isOpened={open}>
        <Collapse isOpened={open}>{navbarContent}</Collapse>
        <Fade delay={animationDelay}>
          <Button kind="text" onClick={toggleCollapse}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              {collapseIcon}
            </IconContext.Provider>
          </Button>
        </Fade>
      </MobileNavbarContainer>
    </>
  )
}
