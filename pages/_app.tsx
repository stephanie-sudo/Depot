import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { TranslationProvider } from '../lib/i18n'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UpcomingEvents from '../components/UpcomingEvents'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

// Import messages statically
import enMessages from '../messages/en.json'
import deMessages from '../messages/de.json'

const messages = {
  en: enMessages,
  de: deMessages
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const locale = router.locale || 'en'
  const currentMessages = messages[locale as keyof typeof messages] || messages.en
  const hideLayout = router.pathname.startsWith('/user')

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <TranslationProvider messages={currentMessages} locale={locale}>
        {!hideLayout && <Header />}
        {!hideLayout && router.pathname !== '/' && <UpcomingEvents />}
        <Component {...pageProps} />
        {!hideLayout && <Footer />}
      </TranslationProvider>
    </ChakraProvider>
  )
}
