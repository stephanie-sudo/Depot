import ServicePage from '../components/ServicePage'
import { useTranslations } from '../lib/i18n'

const benefitIcons = ['🌀', '⚡', '🌿', '💖', '🎵', '📡', '💆‍♀️']
const offerImages = [
  '/images/angebot-1.jpg',
  '/images/angebot-2.jpg',
  '/images/tuning-hero.jpg',
  '/images/angebot-4.jpg',
]

export default function EnergyWorkPage() {
  const t = useTranslations('energyWork')

  const benefits = benefitIcons.map((icon, i) => ({
    icon,
    title: t(`intro.benefit${i + 1}.title`),
    text: t(`intro.benefit${i + 1}.text`),
  }))

  const approachItems = Array.from({ length: 5 }, (_, i) => ({
    title: t(`approach.item${i + 1}.title`),
    text: t(`approach.item${i + 1}.text`),
  }))

  const approachNotes = [t('approach.note1'), t('approach.note2')]

  const offers = offerImages.map((image, i) => ({
    image,
    title: t(`offer.item${i + 1}.title`),
    text: t(`offer.item${i + 1}.text`),
  }))

  return (
    <ServicePage
      seo={{ title: t('seo.title'), description: t('seo.description') }}
      hero={{
        image: '/images/energy-hero.jpg',
        heading: t('hero.heading'),
        text: t('hero.text'),
        cta: t('hero.cta'),
  href: '/prices#energy',
      }}
      intro={{ heading: t('intro.heading'), text: t('intro.text'), benefits }}
      approach={{ heading: t('approach.heading'), items: approachItems, notes: approachNotes }}
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
  href: '/prices#energy',
        moreHeading: t('cta.moreHeading'),
        moreText: t('cta.moreText'),
        moreButton: t('cta.moreButton'),
        moreHref: '/yoga',
      }}
      faqHook={{ text: t('faqHook.text'), linkText: t('faqHook.linkText') }}
    />
  )
}

