import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { theme } from 'pages/_app'

const { mobile: mobileBreakpoint, tablet: tabletBreakpoint } = theme.breakpoints

function useResponsive() {
  const [isClient, setIsClient] = useState(false)

  const isMobile = useMediaQuery({
    maxWidth: mobileBreakpoint,
  })

  const isTablet = useMediaQuery({
    maxWidth: tabletBreakpoint,
  })

  const isDesktop = useMediaQuery({
    minWidth: tabletBreakpoint,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])

  return {
    isMobile: isClient ? isMobile : true,
    isTablet: isClient ? isTablet : false,
    isDesktop: isClient ? isDesktop : false,
  }
}

export default useResponsive
