'use client'
import NextLink from 'next/link'
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  useColorModeValue,
  AspectRatio,            // <-- add
} from '@chakra-ui/react'
import { useTranslations } from '../../lib/i18n'
import ButtonLink from '../Button'
import AiImage from '../AiImage'

export default function HeroSection() {
  const t = useTranslations('hero')
  const bg = useColorModeValue('gray.200', 'gray.800')

  return (
    <Box bg={bg} mt={{ base: 4, md: 8 }}>
      <Box maxW="7xl" mx="auto">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
          {/* Left: text */}
          <Flex direction="column" justify="center" px={{ base: 4, sm: 6, lg: 12 }} py={{ base: 12, md: 16 }}>
            <chakra.h1
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
              letterSpacing="tight"
              lineHeight="short"
              fontWeight="extrabold"
              color="gray.900"
              _dark={{ color: 'white' }}
            >
              {t('tagline')}
            </chakra.h1>

            <chakra.p
              mt={{ base: 3, sm: 5 }}
              fontSize={{ sm: 'lg', md: 'xl' }}
              maxW={{ sm: 'xl' }}
              color="gray.600"
              _dark={{ color: 'gray.300' }}
            >
              {t('subline1')}<br/>
              {t('subline2')} 
            </chakra.p>

            <Stack mt={{ base: 5, sm: 8 }} direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <ButtonLink as={NextLink} href="/sessions" w={{ base: 'full', sm: 'auto' }}>
                {t('cta')}
              </ButtonLink>
              <ButtonLink
                as={NextLink}
                href="/sessions?discovery=1"
                variant="secondary"
                w={{ base: 'full', sm: 'auto' }}
                whiteSpace="normal"
              >
                {t('secondaryCta')}
              </ButtonLink>
            </Stack>
          </Flex>

          {/* Right: image with 2:3 ratio */}
          <AspectRatio ratio={3 / 2} w="full" bg="gray.100">
            <AiImage
              //src="/hero.webp"
              src="/hero_squared.png"
              alt=""
              objectFit="cover"       // use "contain" if you want zero cropping
              loading="lazy"
              className="hero-img"
            />
          </AspectRatio>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
