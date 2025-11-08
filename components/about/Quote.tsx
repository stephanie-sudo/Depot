import { Container, Text } from '@chakra-ui/react'
import { useTranslations } from '../../lib/i18n'

export default function QuoteSection() {
  const t = useTranslations('about')
  return (
    <Container maxW="800px" py={16}>
      <Text fontSize="2xl" fontStyle="italic" textAlign="center">
        “{t('quote')}”
      </Text>
    </Container>
  )
}
