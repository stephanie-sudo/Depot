import { Box, Heading, Text } from '@chakra-ui/react'
import { useTranslations } from '../lib/i18n'

function replacePlaceholders(text: string): string {
  const placeholders: Record<string, string> = {
    NAME: process.env.NEXT_PUBLIC_IMPRESSUM_NAME ?? '',
    ADDRESS: [
      process.env.NEXT_PUBLIC_IMPRESSUM_STREET,
      process.env.NEXT_PUBLIC_IMPRESSUM_ZIP_CITY,
      process.env.NEXT_PUBLIC_IMPRESSUM_COUNTRY
    ].filter(Boolean).join('\n'),
    EMAIL:
      process.env.NEXT_PUBLIC_IMPRESSUM_EMAIL ??
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
      '',
    PHONE:
      process.env.NEXT_PUBLIC_IMPRESSUM_PHONE ??
      process.env.NEXT_PUBLIC_CONTACT_PHONE ??
      '',
    LOG_RETENTION_DAYS: process.env.NEXT_PUBLIC_LOG_RETENTION_DAYS ?? '',
    NEWSLETTER_PROVIDER: process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER ?? ''
  }

  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => placeholders[key] || '')
}

function Section({ headingKey, textKey }: { headingKey: string; textKey: string }) {
  const t = useTranslations('privacy')
  return (
    <Box mt={8}>
      <Heading as="h2" size="md" mb={2}>
        {t(headingKey)}
      </Heading>
      <Text whiteSpace="pre-line">{replacePlaceholders(t(textKey))}</Text>
    </Box>
  )
}

export default function PrivacyContent() {
  return (
    <Box textAlign="left">
      <Section headingKey="responsibleHeading" textKey="responsibleText" />
      <Section headingKey="hostingHeading" textKey="hostingText" />
      <Section headingKey="contactHeading" textKey="contactText" />
      <Section headingKey="bookingHeading" textKey="bookingText" />
      <Section headingKey="paymentHeading" textKey="paymentText" />
      <Section headingKey="billingHeading" textKey="billingText" />
      <Section headingKey="testimonialsHeading" textKey="testimonialsText" />
      <Section headingKey="cookiesHeading" textKey="cookiesText" />
      <Section headingKey="newsletterHeading" textKey="newsletterText" />
      <Section headingKey="legalHeading" textKey="legalText" />
      <Section headingKey="rightsHeading" textKey="rightsText" />
      <Section headingKey="dpoHeading" textKey="dpoText" />
    </Box>
  )
}
