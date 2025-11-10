'use client'
import NextLink from 'next/link'
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Stack,
} from '@chakra-ui/react'
import { useTranslations } from '../../lib/i18n'
import ButtonLink from '../Button'

interface Service {
  title: string
  subtitle: string
  blurb: string
  price: string
  anchor: string
  detailHref: string
}

export default function ServiceTeasers() {
  const t = useTranslations('serviceTeasers')
  
  // Static pricing - replace with actual prices
  const energyBase = '€60'
  const yogaBase = '€60'
  
  const services: Service[] = [
    {
      title: t('energyTitle'),
      subtitle: t('energySubtitle'),
      blurb: t('energyBlurb'),
      price: `${t('pricePrefix')}${energyBase}`,
      anchor: '#energy',
      detailHref: '/energy-work',
    },
    {
      title: t('yogaTitle'),
      subtitle: t('yogaSubtitle'),
      blurb: t('yogaBlurb'),
      price: `${t('pricePrefix')}${yogaBase}`,
      anchor: '#yoga',
      detailHref: '/yoga',
    },
  ]

  return (
    <Box bg="pageBg" py={12}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {services.map(s => (
            <Card
              key={s.title}
              className="service-card"
              bg="cardBg"
              borderWidth="1px"
              borderColor="neutralBorder"
              transition="transform .15s ease, box-shadow .15s ease"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: 'serviceHover',
                borderColor: 'accent',
              }}
            >
              <CardHeader>
                <Text color="primary" fontSize="xs" textTransform="uppercase" letterSpacing="wider" mb={1}>
                  {s.subtitle}
                </Text>
                <Heading size="md">{s.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text mb={2} color="textSecondary">{s.blurb}</Text>
                <Text fontWeight="bold" mb={4}>{s.price}</Text>
                <Stack spacing={2}>
                  <ButtonLink as={NextLink} href={`/sessions${s.anchor}`} w="full">
                    {t('cta')}
                  </ButtonLink>
                  <ButtonLink
                    as={NextLink}
                    href={s.detailHref}
                    variant="secondary"
                    w="full"
                    showArrow={false}
                  >
                    {t('learnMore')}
                  </ButtonLink>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
        <Text mt={6} fontSize="sm" textAlign="center" color="textSecondary">
          {t('solidarityLine')}
        </Text>
      </Container>
    </Box>
  )
}
