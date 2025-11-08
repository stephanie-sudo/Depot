import { defineStyleConfig } from '@chakra-ui/react'

export const buttonTheme = defineStyleConfig({
  variants: {
    submit: {
      bg: 'highlight.500',
      color: 'contrastText',
      _hover: { bg: 'highlight.600', cursor: 'pointer' },
      _active: { bg: 'highlight.600' },
    },
    cta: {
      bg: 'primary.500',
      color: 'contrastText',
      rounded: 'full',
      _dark: { bg: 'primary.600' },
      _hover: {
        bg: 'primary.600',
        _dark: { bg: 'primary.500' },
        cursor: 'pointer',
      },
      _active: { bg: 'primary.600', _dark: { bg: 'primary.500' } },
    },
    cardCta: {
      bg: 'primary.500',
      color: 'contrastText',
      rounded: 'full',
      _dark: { bg: 'highlight.500' },
      _hover: {
        bg: 'primary.600',
        _dark: { bg: 'highlight.600' },
        cursor: 'pointer',
      },
      _active: { bg: 'primary.600', _dark: { bg: 'highlight.600' } },
    },
    tab: {
      bg: 'primary.500',
      color: 'contrastText',
      _dark: { bg: 'highlight.300', color: 'primary.700' },
      _hover: {
        bg: 'primary.600',
        _dark: { bg: 'highlight.500', color: 'contrastText' },
        cursor: 'pointer',
      },
      _active: { bg: 'primary.600', _dark: { bg: 'highlight.600', color: 'contrastText' } },
    },
  },
})

