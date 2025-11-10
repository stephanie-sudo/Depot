import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { cardTheme } from './components/Card'
import { buttonTheme } from './components/Button'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const colors = {
  // Primary (Teal) palette
  primary: {
    50: '#E6F3F4',
    100: '#CFE9EA',
    200: '#9FD8DB',
    300: '#6FC7CC',
    400: '#4FB7BD',
    500: '#1A2E32', // main
    600: '#2A6E79', // active
    700: '#235961',
  },
  // Accent / CTA (Orange)
  accent: {
    50: '#FFF4EC',
    100: '#FFE7D8',
    200: '#FFCFB1',
    300: '#FFB089',
    400: '#F17A36',
    500: '#DD6420', // main
    600: '#BE4F12', // active
  },
  // Secondary (Oliv)
  secondary: {
    50: '#F4F7EA',
    100: '#E9EFCF',
    200: '#D3E69F',
    300: '#AFC360',
    400: '#8EA23E',
    500: '#657330', // main
    600: '#56702A',
  },
  // Borders / neutrals
  neutral: {
    100: '#E2E8E5',
    200: '#CBD6D2',
  },
  // Tints
  tint: {
    primary: '#E6F3F4',
    secondary: '#F4F7EA',
    accent: '#FFE7D8',
  },
  // Utility tokens used previously
  primaryAlpha: {
    400: 'rgba(48,126,138,0.4)',
    800: 'rgba(48,126,138,0.8)',
  },
  // map legacy highlight to accent for button usage
  highlight: {
    300: '#F17A36',
    500: '#DD6420',
    600: '#BE4F12',
  },
}

const theme = extendTheme({
  config,
  colors,
  semanticTokens: {
    colors: {
      // Backgrounds
      pageBg: { default: '#F7FAF8', _dark: '#0F1518' },
      sectionBg: { default: '#FFFFFF', _dark: '#131B1F' },
      cardBg: { default: '#FFFFFF', _dark: '#131B1F' },
      cardSectionBg: { default: '#F7FAF8', _dark: '#1A2328' },

      // Text
      textDefault: { default: '#0E1714', _dark: '#E7ECEA' },
      textSecondary: { default: '#4A5A5E', _dark: '#B5C1BD' },

      // Brand tokens
      primary: { default: colors.primary[500], _dark: '#53A9B6' },
      primaryHover: { default: '#3995A0', _dark: '#3E9CAA' },
      primaryActive: { default: '#2A6E79', _dark: '#2B7F8A' },

      accent: { default: colors.accent[500], _dark: '#FF8A4C' },
      accentHover: { default: '#F17A36', _dark: '#FF7A2C' },
      accentActive: { default: '#BE4F12', _dark: '#D86114' },

      secondary: { default: colors.secondary[500], _dark: '#98B04C' },
      secondaryHover: { default: '#7F8B3E', _dark: '#86A23F' },

      // Borders
      neutralBorder: { default: colors.neutral[100], _dark: '#2A343B' },

      // Tints
      tintPrimary: { default: colors.tint.primary, _dark: 'rgba(83,169,182,0.06)' },
      tintSecondary: { default: colors.tint.secondary, _dark: 'rgba(152,176,76,0.04)' },
      tintAccent: { default: colors.tint.accent, _dark: 'rgba(255,138,76,0.04)' },

      contrastText: { default: 'white', _dark: 'white' },
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
