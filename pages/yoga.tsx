import ServicePage from '../components/ServicePage'
import { useTranslations } from '../lib/i18n'

const benefitIcons = ['🧘', '💪', '🌙', '🌬️', '🕊️']
const offerImages = ['/images/angebot-1.jpg', '/images/angebot-2.jpg']

export default function YogaPage() {
  const t = useTranslations('yoga')

  const benefits = benefitIcons.map((icon, i) => ({
    icon,
    title: t(`intro.benefit${i + 1}.title`),
    text: t(`intro.benefit${i + 1}.text`),
  }))

  const approachItems = Array.from({ length: 4 }, (_, i) => ({
    title: t(`approach.item${i + 1}.title`),
    text: t(`approach.item${i + 1}.text`),
  }))

  const offers = offerImages.map((image, i) => ({
    image,
    title: t(`offer.item${i + 1}.title`),
    text: t(`offer.item${i + 1}.text`),
  }))

  return (
    <ServicePage
      seo={{ title: t('seo.title'), description: t('seo.description') }}
      hero={{
        image: '/images/yoga-hero.jpg',
        heading: t('hero.heading'),
        text: t('hero.text'),
        cta: t('hero.cta'),
  href: '/prices#yoga',
      }}
      intro={{ heading: t('intro.heading'), text: t('intro.text'), benefits }}
      approach={{ heading: t('approach.heading'), items: approachItems }}
      offer={{
        heading: t('offer.heading'),
        subheading: t('offer.subheading'),
        learnMore: t('offer.learnMore'),
        items: offers,
      }}
      cta={{
        heading: t('cta.heading'),
        text: t('cta.text'),
        button: t('cta.button'),
  href: '/prices#yoga',
        moreHeading: t('cta.moreHeading'),
        moreText: t('cta.moreText'),
        moreButton: t('cta.moreButton'),
        moreHref: '/energy-work',
      }}
      faqHook={{ text: t('faqHook.text'), linkText: t('faqHook.linkText') }}
    />
  )
}

