'use client'
import NextLink from 'next/link'
import { Box, Container, Flex, Avatar, Text, Link } from '@chakra-ui/react'
import { useTranslations } from '../../lib/i18n'

export default function AboutTeaser() {
  const t = useTranslations('aboutTeaser')
  return (
    <Box bg="sectionBg" py={12}>
      <Container maxW="3xl">
        <Flex align="center" direction={{ base: 'column', md: 'row' }} gap={4} textAlign={{ base: 'center', md: 'left' }}>
          <Avatar name="Julia" size="lg" src="/logo_small.png" />
          <div>
            <Text mb={2}>{t('text')}</Text>
            <Link
              as={NextLink}
              href="/about"
              color="accent.500"
              textDecoration="underline"
            >
              {t('link')}
            </Link>
          </div>
        </Flex>
      </Container>
    </Box>
  )
}
