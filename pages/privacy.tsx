import { useTranslations } from '../lib/i18n'
import { Container, Heading } from '@chakra-ui/react'
import PrivacyContent from '../components/PrivacyContent'

export default function Privacy() {
  const t = useTranslations('privacy')

  return (
    <Container as="main" maxW="2xl" py={20}>
      <Heading mb={6} textAlign="center">{t('title')}</Heading>
      <PrivacyContent />
    </Container>
  )
}
