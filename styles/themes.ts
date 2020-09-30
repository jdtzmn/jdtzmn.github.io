// Themes

export const defaultTheme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    surface: '#F7F7F7',
    gray: '#BCBFCC',
    text: '#C1C1C1',
    background: '#081338',
    primary: '#4AAFF7',
    secondary: '#EE5185',
  },
}

// Type Definitions

type Theme = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
