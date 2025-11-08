'use client'

import React, { type ReactNode } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Stack,
  Button as ChakraButton,
  Text,
  Icon,
  chakra,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useDisclosure,
  Link,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useTranslations } from '../lib/i18n'
import NextLink from 'next/link'

interface Tier {
  title: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
  link: string
  popular?: boolean
}

interface TierCardProps {
  pkg: Tier
  onBook: (pkg: Tier) => void
  bookLabel: string
  disabled?: boolean
}

export default function TierCard({ pkg, onBook, bookLabel, disabled }: TierCardProps) {
  const t = useTranslations('sessions')
  const borderColor = pkg.highlight ? 'highlight.500' : 'neutralBorder'
  const heartColor = useColorModeValue('red.400', 'red.300')
  const ribbonBg = useColorModeValue('highlight.500', 'highlight.300')
  const ribbonTriangle = useColorModeValue('highlight.600', 'highlight.500')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Feature = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
    <Flex align="center">
      <Flex shrink={0} mr={2} mt={1}>
        {icon ?? <Icon as={CheckIcon} boxSize={5} color="accent.500" />}
      </Flex>
      <Box ml={4}>
        <chakra.span mt={2} color="textSecondary">
          {children}
        </chakra.span>
      </Box>
    </Flex>
  )

  const card = (
    <Box
      w="full"
      h="full"
      role="group"
      position="relative"
      data-highlight={pkg.highlight ? 'true' : undefined}
      data-popular={pkg.popular ? 'true' : undefined}
    >
      <Card
        maxW="330px"
        w="full"
        h="full"
        bg="cardBg"
        color="textDefault"
        boxShadow={
          pkg.highlight
            ? '0 0 0 3px var(--chakra-colors-highlight-500), 0 0 15px var(--chakra-colors-highlight-500)'
            : '2xl'
        }
        rounded="md"
        overflow="hidden"
        position="relative"
        borderWidth={pkg.highlight ? '2px' : '1px'}
        borderColor={borderColor}
        zIndex={1}
        opacity={disabled ? 0.6 : 1}
        filter={disabled ? 'grayscale(100%)' : undefined}
      >
        {pkg.popular && (
          <Box
            position="absolute"
            top="14px"
            right="-64px"
            transform="rotate(45deg)"
            bg={ribbonBg}
            color="white"
            textTransform="uppercase"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            px="20"
            py="2"
            boxShadow="lg"
            zIndex={1}
            _before={{
              content: '""',
              position: 'absolute',
              left: 0,
              top: '100%',
              borderTop: '6px solid',
              borderTopColor: ribbonTriangle,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
            }}
            _after={{
              content: '""',
              position: 'absolute',
              right: 0,
              top: '100%',
              borderTop: '6px solid',
              borderTopColor: ribbonTriangle,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
            }}
          >
            {t('popularBadge')}
          </Box>
        )}
        <CardHeader p={6} pb={4} borderBottomWidth="1px" color="textSecondary">
          <Flex justify="space-between" align="center" mb={1}>
            <chakra.p fontSize="lg" fontWeight="semibold" color="textSecondary">
              {pkg.title}
            </chakra.p>
          </Flex>
          <Text
            mb={2}
            fontSize="5xl"
            fontWeight="extrabold"
            color="priceText"
            lineHeight="tight"
          >
            {pkg.price}
          </Text>
          <ChakraButton
            w="full"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            py={3}
            border="solid transparent"
            fontWeight="bold"
            rounded="md"
            shadow="md"
            variant="cardCta"
            onClick={() => {
              if (!disabled) onBook(pkg)
            }}
            isDisabled={disabled}
            _disabled={{
              bg: 'neutralBorder',
              color: 'textSecondary',
              cursor: 'not-allowed',
              pointerEvents: 'none',
            }}
          >
            {bookLabel}
          </ChakraButton>
        </CardHeader>
        <CardBody bg="cardSectionBg" px={6} py={10} flexGrow={1}>
          <Stack direction="column" spacing={3} flexGrow={1}>
            {pkg.features.map((feat, i) => (
              <Feature key={i}>
                {feat}
              </Feature>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )

  if (disabled) {
    return (
      <Box w="full" h="full">
        <Popover
          trigger="hover"
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          openDelay={100}
        >
          <PopoverTrigger>
            <Box onClick={onOpen} w="full" h="full">
              {card}
            </Box>
          </PopoverTrigger>
          <PopoverContent
            maxW="xs"
            bg="cardBg"
            borderColor="neutralBorder"
            _focus={{ boxShadow: 'none' }}
          >
            <PopoverArrow bg="cardBg" />
            <PopoverBody>
              <Stack spacing={3} fontSize="sm">
                <Text>
                  {t('noCredits.info')}{' '}
                  <Link
                    as={NextLink}
                    href="/solidarity"
                    color="accent.500"
                    textDecoration="underline"
                  >
                    {t('noCredits.infoLink')}
                  </Link>
                </Text>
                <Text>{t('noCredits.supporterCta')}</Text>
                <Text>
                  {t('noCredits.contact.prefix')}{' '}
                  <Link
                    as={NextLink}
                    href="/contact"
                    color="accent.500"
                    textDecoration="underline"
                  >
                    {t('noCredits.contact.link')}
                  </Link>{' '}
                  {t('noCredits.contact.suffix')}
                </Text>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    )
  }

  return card
}
