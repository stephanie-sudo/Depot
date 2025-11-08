// @vitest-environment jsdom
import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { describe, it, expect, beforeAll } from 'vitest'
import ServicePage, { type ServicePageProps } from '../components/ServicePage'
import theme from '../theme'
import { TranslationProvider } from '../lib/i18n'

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

const props: ServicePageProps = {
  seo: { title: 't', description: 'd' },
  hero: {
    image: '',
    heading: 'Heading',
    text: 'text',
    cta: 'Book',
    href: '/book',
  },
  intro: { heading: 'Intro', text: 'intro text', benefits: [] },
  offer: { heading: 'Offer', subheading: '', learnMore: '', items: [] },
  cta: {
    heading: 'h',
    text: 't',
    button: 'b',
    href: '/h',
    moreHeading: 'mh',
    moreText: 'mt',
    moreButton: 'mb',
    moreHref: '/mh',
  },
}

const messages = { testimonial: { link: 'More stories' } }

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
  // React 19 uses ShadowRoot checks; jsdom lacks ShadowRoot which causes instanceof errors
  ;(window as any).ShadowRoot = (window as any).ShadowRoot || function ShadowRoot() {}
})

describe('ServicePage hero button', () => {
  it('uses primary background and contrast text with hover & active styles', () => {
    const { getByRole, unmount } = render(
      <ChakraProvider theme={theme}>
        <TranslationProvider locale="en" messages={messages}>
          <ServicePage {...props} />
        </TranslationProvider>
      </ChakraProvider>,
    )
    const btn = getByRole('link', { name: props.hero.cta }) as HTMLAnchorElement
    const classes = Array.from(btn.classList)
    const styles = Array.from(document.querySelectorAll('style'))
      .map(tag => tag.textContent ?? '')
      .join('')
    const matchClass = classes.find(cls => styles.includes(cls)) || ''
    expect(styles).toContain(`.${matchClass}{`)
    expect(styles).toContain('background:var(--chakra-colors-primary-500)')
    expect(styles).toContain('color:var(--chakra-colors-contrastText)')
    expect(styles).toContain(`.${matchClass}:hover`)
    expect(styles).toContain(`.${matchClass}:active`)
    expect(styles).toContain('--chakra-colors-primary-600')
    unmount()
  })
})

describe('ServicePage testimonials link', () => {
  it('renders link to testimonials page', () => {
    const { getByRole, unmount } = render(
      <ChakraProvider theme={theme}>
        <TranslationProvider locale="en" messages={messages}>
          <ServicePage {...props} testimonials={{ heading: 't', items: [] }} />
        </TranslationProvider>
      </ChakraProvider>,
    )
    const link = getByRole('link', { name: messages.testimonial.link }) as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/testimonials')
    unmount()
  })

  it('does not wrap testimonial cards in a link', () => {
    const { getByText, unmount } = render(
      <ChakraProvider theme={theme}>
        <TranslationProvider locale="en" messages={messages}>
          <ServicePage
            {...props}
            testimonials={{ heading: 't', items: [{ quote: 'Great', name: 'A' }] }}
          />
        </TranslationProvider>
      </ChakraProvider>,
    )
    expect(getByText('Great').closest('a')).toBeNull()
    unmount()
  })
})
