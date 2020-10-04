import { getLuminance, invert } from 'polished'

// Breakpoints

export const breakpoints = {
  mobile: 576, // px
  tablet: 780, // px
}

// Themes

class DefaultTheme {
  get light() {
    return getLuminance(this.colors.background) > 0.5
  }

  get lightText() {
    const textColorIsLight = getLuminance(this.colors.text) > 0.5
    if (textColorIsLight) return this.colors.text
    return invert(this.colors.text)
  }

  get darkText() {
    const textColorIsDark = getLuminance(this.colors.text) < 0.5
    if (textColorIsDark) return this.colors.text
    return invert(this.colors.text)
  }

  public colors = {
    white: '#FFFFFF',
    black: '#000000',
    surface: '#F7F7F7',
    gray: '#BCBFCC',
    headers: '#FFFFFF',
    text: '#C1C1C1',
    background: '#081338',
    primary: '#4AAFF7',
    secondary: '#EE5185',
    danger: 'red',
  }

  public animationDuration = '0.3s'

  public breakpoints = breakpoints
}

export const defaultTheme = new DefaultTheme()

export const lightTheme = new DefaultTheme()
lightTheme.colors = {
  white: '#FFFFFF',
  black: '#000000',
  surface: '#FFFFFF',
  gray: '#575757',
  headers: '#2f2f2f',
  text: '#000000',
  background: '#ecf3f8',
  primary: '#2176FF',
  secondary: '#fb683c',
  danger: 'red',
}

// Type Definitions

type Theme = DefaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
