import React from 'react'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import QuoteIcon from './QuoteIcon'
import AiImage from './AiImage'
import { useTranslations, useLocale } from '../lib/i18n'

export interface TestimonialCardProps {
  quote: string
  name: string
  avatar?: string | null
  rating?: number
  showRating?: boolean
  createdAt?: string
  showDate?: boolean
}

export default function TestimonialCard({
  quote,
  name,
  avatar,
  rating,
  showRating = true,
  createdAt,
  showDate = false,
}: TestimonialCardProps) {
  const t = useTranslations('testimonialsPage')
  const locale = useLocale()
  const outlineColor = useColorModeValue('primaryAlpha.800', 'whiteAlpha.800')
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(locale)
    : null
  return (
    <Box
      data-testid="testimonial-card"
      maxW="md"
      w="full"
      mx={4}
      my={6}
      bg="cardBg"
      shadow="lg"
      position="relative"
      borderWidth={1}
      borderColor={outlineColor}
      rounded="lg"
    >
      {avatar && (
        <AiImage
          src={avatar}
          alt={name}
          w={20}
          h={20}
          borderWidth={2}
          borderStyle="solid"
          borderColor="primary.500"
          rounded="full"
          objectFit="cover"
          bg="cardBg"
          position="absolute"
          top={0}
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
      <Box
        px={{ base: 4, sm: 8, md: 12 }}
        pt={16}
        pb={12}
        bg="cardSectionBg"
        roundedTop="lg"
      >
        <Flex align="center" mt={6} gap={4}>
          <QuoteIcon boxSize={8} transform="scaleX(-1)" flexShrink={0} />
          <Text
            fontSize="lg"
            fontStyle="italic"
            textAlign="center"
            color="textDefault"
            flex={1}
          >
            {quote}
          </Text>
          <QuoteIcon boxSize={8} flexShrink={0} />
        </Flex>
      </Box>
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={8}
        bg="primary.500"
        color="contrastText"
        roundedBottom="lg"
      >
        <Text fontSize="xl" fontWeight="semibold" textAlign="center">
          {name}
        </Text>
        {showRating && typeof rating === 'number' && (
          <Text mt={2} color="yellow.300" aria-label={`${rating} stars`}>
            {'★'.repeat(rating)}
          </Text>
        )}
        {showDate && formattedDate && (
          <Text mt={2} fontSize="sm" color="contrastText">
            {t('submittedOn')} {formattedDate}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
