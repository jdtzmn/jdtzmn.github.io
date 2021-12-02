import { ReactElement, useState, useCallback } from 'react'
import styled from 'styled-components'
import { lighten, transparentize } from 'polished'
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
import useResponsive from 'src/hooks/useResponsive'
import { Container, VerticalAlign, Button } from 'components/styled'

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

interface DesktopNavbarContainerProps {
  condensed: boolean
}

const DesktopNavbarContainer = styled(Container)<DesktopNavbarContainerProps>`
  display: flex;
  flex-flow: row wrap;

  ${({ theme, condensed }) =>
    condensed &&
    `
    width: 75%;
    padding: 12px 12.5%;
    border-bottom: 1px solid
      ${transparentize(0.9, theme.colors.headers)};
  `}
`

interface MobileNavbarContainerProps {
  isOpened: boolean
  condensed: boolean
}

const MobileNavbarContainer = styled(Container)<MobileNavbarContainerProps>`
  display: flex;
  justify-content: flex-end;
  padding: 24px 16px 24px 32px;
  ${({ isOpened, theme }) =>
    isOpened && `background: ${lighten(0.04, theme.colors.background)};`}
  ${({ condensed, theme }) =>
    condensed &&
    `
      padding: 12px 16px 12px 32px;
      border-bottom: 1px solid
        ${transparentize(0.9, theme.colors.headers)};
    `}
  transition: background 400ms;
  transition-delay: 100ms;

  & > :first-child {
    /* collapse content */
    flex: 1;
  }
`

const NameButton = styled(Button)`
  flex-grow: 0;
  text-align: left;
  white-space: nowrap;
  margin-right: auto;
  padding: 0;
`

const LinkButton = styled(Button)`
  color: ${({ theme }) => theme.colors.gray};
  padding-left: 0;
  margin-left: 0;

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.mobile + 1}px) {
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
  display: inline-block;
  color: ${({ theme }) =>
    theme.light ? theme.colors.primary : theme.colors.gray};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    margin-top: 12px;
  }
`

const navbarButtonsAnimationDelay = 75

interface NavbarProps {
  animationDelay?: number
  condensed?: boolean
}

export default function Navbar({
  animationDelay = 0,
  condensed = false,
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const { isMobile } = useResponsive()

  const toggleCollapse = useCallback(() => {
    setOpen(!open)
  }, [setOpen, open])

  const handleCollapseUpdate = useCallback(
    ({ isFullyClosed, contentHeight }) => {
      setVisible(contentHeight > 0)
      if (isFullyClosed) setVisible(false)
    },
    [setVisible]
  )

  const collapseIcon = open ? <RiCloseFill /> : <RiMenu3Line />

  const navbarContent = (
    <IconContext.Provider value={{ size: '0.75em' }}>
      {navbarLinks.map((navbarLink, index) => (
        <Fade
          delay={animationDelay + index * navbarButtonsAnimationDelay}
          key={navbarLink.to}
        >
          <Link href={navbarLink.to} passHref>
            <LinkButton tabIndex={1} kind="text" forwardedAs={'a' as never}>
              {navbarLink.icon}
              {' ' + navbarLink.text}
            </LinkButton>
          </Link>
        </Fade>
      ))}
      {!condensed && (
        <AlignRight>
          <Fade
            delay={
              animationDelay + navbarLinks.length * navbarButtonsAnimationDelay
            }
          >
            <Link href="/resume" passHref>
              <ResumeButton kind="gray" as="a" target="_blank">
                Resume
              </ResumeButton>
            </Link>
          </Fade>
        </AlignRight>
      )}
    </IconContext.Provider>
  )

  return (
    <>
      {isMobile ? (
        <MobileNavbarContainer isOpened={open} condensed={condensed}>
          {condensed && !visible && (
            <Fade delay={animationDelay + 100} duration={400}>
              <VerticalAlign style={{ height: '100%' }}>
                <Link href="/" passHref>
                  <NameButton kind="text">Jacob Daitzman</NameButton>
                </Link>
              </VerticalAlign>
            </Fade>
          )}
          <Collapse
            isOpened={open}
            onWork={handleCollapseUpdate}
            onRest={handleCollapseUpdate}
          >
            {navbarContent}
          </Collapse>
          <Fade delay={animationDelay}>
            <Button kind="text" onClick={toggleCollapse}>
              <IconContext.Provider value={{ size: '1.5em' }}>
                {collapseIcon}
              </IconContext.Provider>
            </Button>
          </Fade>
        </MobileNavbarContainer>
      ) : (
        <DesktopNavbarContainer condensed={condensed}>
          {navbarContent}
        </DesktopNavbarContainer>
      )}
    </>
  )
}
