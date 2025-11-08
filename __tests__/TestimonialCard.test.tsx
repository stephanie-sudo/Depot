// @vitest-environment jsdom
import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { describe, it, expect, beforeAll } from 'vitest'
import theme from '../theme'
import TestimonialCard from '../components/TestimonialCard'
import { TranslationProvider } from '../lib/i18n'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => ({
      media: query,
      matches: false,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

describe('TestimonialCard', () => {
  it('renders with a visible border', () => {
    const { getByTestId, unmount } = render(
      <ChakraProvider theme={theme}>
        <TranslationProvider locale="en" messages={{ testimonialsPage: {} }}>
          <TestimonialCard quote="Great" name="Alice" />
        </TranslationProvider>
      </ChakraProvider>,
    )
    const card = getByTestId('testimonial-card') as HTMLElement
    expect(getComputedStyle(card).borderWidth).toBe('1px')
    unmount()
  })

  it('defines a distinct dark card background token', () => {
    expect(theme.semanticTokens.colors?.cardBg?._dark).toBe('gray.700')
  })
})
