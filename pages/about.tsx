import Head from 'next/head'
import { useTranslations } from '../lib/i18n'
import AboutHero from '../components/about/Hero'
import StorySection from '../components/about/Story'
import CertificatesSection from '../components/about/Certificates'
import QuoteSection from '../components/about/Quote'
import CallToActionSection from '../components/about/CallToAction'

export default function About() {
  const t = useTranslations('about')
  return (
    <>
      <Head>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
      </Head>
      <main>
        <AboutHero />
        <StorySection />
        <CertificatesSection />
        <QuoteSection />
        <CallToActionSection />
      </main>
    </>
  )
}

