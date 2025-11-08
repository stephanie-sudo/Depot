import { Container, Heading, VStack, HStack, Icon, Box, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useTranslations } from '../../lib/i18n'

export default function CertificatesSection() {
  const t = useTranslations('about')
  return (
    <Container maxW="1200px" py={16}>
      <Heading as="h2" textAlign="center" mb={8}>
        {t('certsHeading')}
      </Heading>
      <VStack align="start" spacing={4}>
        {[1, 2, 3].map((i) => (
          <HStack key={i} align="start" spacing={3}>
            <Icon as={CheckCircleIcon} boxSize={5} color="primary.500" mt={1} aria-hidden />
            <Box>
              <Text fontWeight="bold">{t(`cert${i}Title`)}</Text>
              <Text fontSize="sm" color="textSecondary">
                {t(`cert${i}Desc`)}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Container>
  )
}
