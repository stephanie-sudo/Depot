import {
  Box,
  HStack,
  VStack,
  Text,
  Tag,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useTranslations } from '../lib/i18n'
import { YogaIcon, EnergyIcon, OnlineIcon, InPersonIcon } from './ServiceIcons'
import type { Event } from '../types/Event'

const categoryIconMap = {
  yoga: YogaIcon,
  energy: EnergyIcon,
} as const

const modeIconMap = {
  online: OnlineIcon,
  inPerson: InPersonIcon,
} as const

interface Props {
  event: Event
  href: string
}

export function EventCard({ event, href }: Props) {
  const t = useTranslations('upcomingEvents')
  const accent = 'accent.500'

  const date = new Date(event.date)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleDateString(undefined, { month: 'short' })

  const CategoryIcon = categoryIconMap[event.category]
  const ModeIcon = modeIconMap[event.mode]

  return (
    <ChakraLink href={href} _hover={{ textDecoration: 'none' }} isExternal role="group">
      <Box
        as="article"
        bg="cardBg"
        borderRadius="lg"
        shadow="sm"
        _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
        transition="all .15s ease"
        p={4}
      >
        <HStack align="flex-start" spacing={4}>
          <VStack
            bg={accent}
            color="white"
            borderRadius="md"
            px={3}
            py={2}
            minW="56px"
            spacing={0}
          >
            <Text fontSize="lg" fontWeight="bold" lineHeight="1">
              {day}
            </Text>
            <Text fontSize="sm" textTransform="uppercase">
              {month}
            </Text>
          </VStack>

          <VStack align="start" spacing={1} flex={1}>
            <HStack>
              <Icon as={CategoryIcon} color={accent} boxSize={5} />
              <Text fontWeight="semibold" _groupHover={{ textDecoration: 'underline' }}>
                {event.title}
              </Text>
            </HStack>

            <Text fontSize="sm" color="textSecondary">
              {event.topic}
            </Text>

            <HStack fontSize="sm" color="textSecondary">
              <Icon as={ModeIcon} boxSize={4} />
              <Text>{t(event.mode)}</Text>
            </HStack>

            <Tag size="sm" variant="solid" colorScheme="primary">
              {t(`categories.${event.category}`)}
            </Tag>

            <Text fontSize="sm" color="textSecondary" pt={1}>
              {event.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </ChakraLink>
  )
}
