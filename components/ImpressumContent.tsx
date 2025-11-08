import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'
import { useTranslations } from '../lib/i18n'

export default function ImpressumContent() {
  const t = useTranslations('impressum')

  const name = process.env.NEXT_PUBLIC_IMPRESSUM_NAME ?? ''
  const street = process.env.NEXT_PUBLIC_IMPRESSUM_STREET ?? ''
  const zipCity = process.env.NEXT_PUBLIC_IMPRESSUM_ZIP_CITY ?? ''
  const country = process.env.NEXT_PUBLIC_IMPRESSUM_COUNTRY
  const phone = process.env.NEXT_PUBLIC_IMPRESSUM_PHONE
  const email = process.env.NEXT_PUBLIC_IMPRESSUM_EMAIL ?? ''
  const website = process.env.NEXT_PUBLIC_IMPRESSUM_WEBSITE ?? ''

  return (
    <Box textAlign="left">
      <Text>
        <strong>{t('providerLabel')}</strong><br />
        {name}<br />
        {street}<br />
        {zipCity}
        {country ? `, ${country}` : ''}
      </Text>

      <Box mt={4}>
        <Text><strong>{t('contactLabel')}</strong></Text>
        {phone && <Text>{t('phoneLabel')}: {phone}</Text>}
        <Text>
          {t('emailLabel')}: <ChakraLink href={`mailto:${email}`}>{email}</ChakraLink>
        </Text>
        <Text>
          {t('websiteLabel')}: <ChakraLink href={website}>{website}</ChakraLink>
        </Text>
      </Box>

      <Box mt={4}>
        <Text><strong>{t('ustLabel')}</strong></Text>
        <Text>{t('ustValue')}</Text>
      </Box>

      <Box mt={4}>
        <Text><strong>{t('dlinfoLabel')}</strong></Text>
        <Text>{t('dlinfoText')}</Text>
      </Box>

      <Box mt={4}>
        <Text><strong>{t('adrLabel')}</strong></Text>
        <Text>{t('adrText')}</Text>
      </Box>

      <Box mt={4}>
        <Text><strong>{t('disclaimerLabel')}</strong></Text>
        <Text>{t('disclaimerText')}</Text>
      </Box>
    </Box>
  )
}
