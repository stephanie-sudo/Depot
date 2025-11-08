import { Container, VStack, Heading, Text } from '@chakra-ui/react'
import AiImage from '../AiImage'
import { useTranslations } from '../../lib/i18n'

export default function AboutHero() {
  const t = useTranslations('about')
  return (
    <Container maxW="800px" textAlign="center" py={16}>
      <VStack spacing={6}>
        <AiImage
          src="/images/profile.jpg"
          alt={t('heroImageAlt')}
          borderRadius="full"
          w="200px"
          h="200px"
          objectFit="cover"
          mx="auto"
        />
        <Heading as="h1">{t('heroHeading')}</Heading>
        <Text color="textSecondary">{t('heroIntro')}</Text>
      </VStack>
    </Container>
  )
}
