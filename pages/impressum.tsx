import { useTranslations } from '../lib/i18n'
import { Container, Heading } from '@chakra-ui/react'
import ImpressumContent from '../components/ImpressumContent'

export default function Impressum() {
  const t = useTranslations('impressum')

  return (
    <Container as="main" maxW="2xl" py={20}>
      <Heading mb={6} textAlign="center">
        {t('title')}
      </Heading>
      <ImpressumContent />
    </Container>
  )
}
