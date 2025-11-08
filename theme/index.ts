import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { cardTheme } from './components/Card'
import { buttonTheme } from './components/Button'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const colors = {
  primary: {
    500: '#07191a',
    600: '#052021',
    700: '#031314',
  },
  accent: {
    500: '#ff5757',
  },
  rose: {
    200: '#fecdd3',
    300: '#fda4af',
  },
  sky: {
    700: '#0369a1',
  },
  primaryAlpha: {
    400: 'rgba(7,25,26,0.4)',
    800: 'rgba(7,25,26,0.8)',
  },
  highlight: {
    300: '#F6AD55',
    500: '#DD6B20',
    600: '#C05621',
  },
}

const theme = extendTheme({
  config,
  colors,
  semanticTokens: {
    colors: {
      pageBg: { default: 'gray.50', _dark: 'gray.800' },
      sectionBg: { default: 'gray.100', _dark: 'gray.700' },
      cardBg: { default: 'white', _dark: 'gray.700' },
      cardSectionBg: { default: 'gray.50', _dark: 'gray.800' },
      neutralBorder: { default: 'gray.200', _dark: 'gray.700' },
      textDefault: { default: 'gray.800', _dark: 'whiteAlpha.900' },
      textSecondary: { default: 'gray.700', _dark: 'gray.400' },
      tabBg: { default: 'gray.200', _dark: 'gray.600' },
      contrastText: { default: 'white', _dark: 'gray.100' },
      priceText: { default: 'gray.900', _dark: 'gray.50' },
    },
  },
  shadows: {
    serviceHover: '0 6px 12px rgba(0,0,0,0.25)',
  },
  components: {
    Card: cardTheme,
    Button: buttonTheme,
  },
})

export default theme
