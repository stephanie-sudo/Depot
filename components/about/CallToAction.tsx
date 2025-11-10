import Link from 'next/link'
import { Box, Container, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { useTranslations } from '../../lib/i18n'

export default function CallToActionSection() {
  const t = useTranslations('about')
  const bg = useColorModeValue('primaryAlpha.400', 'primaryAlpha.800')
  const color = useColorModeValue('textDefault', 'contrastText')
  const textColor = 'textSecondary'

  return (
    <Box bg={bg} color={color} py={20}>
      <Container maxW="800px" textAlign="center">
        <Heading as="h2" mb={4}>
          {t('ctaHeading')}
        </Heading>
        <Text mb={8} color={textColor}>
          {t('ctaText')}
        </Text>
        <Button
          as={Link}
          href="/prices"
          variant="cardCta"
          size="lg"
        >
          {t('ctaButton')}
        </Button>
      </Container>
    </Box>
  )
}
