'use client'
import {
  Box,
  HStack,
  Text,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorModeValue,
  Link as ChakraLink,
  StackDivider,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ChevronDownIcon, CalendarIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from '../lib/i18n'
import { YogaIcon, EnergyIcon, OnlineIcon, InPersonIcon } from './ServiceIcons'

export default function UpcomingEvents() {
  const t = useTranslations('upcomingEvents')
  const locale = useLocale()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const bg = 'sectionBg'
  const borderColor = 'neutralBorder'


  type Event = {
    id: number
    title: string
    topic: string
    date: string
    category: 'yoga' | 'energy'
    mode: 'online' | 'inPerson'
    slug: string
    description: string
  }

  const [events, setEvents] = useState<Event[]>([])

  // In a static site, you would hardcode events or load from a static JSON file
  // For now, keeping it empty since there's no API
  useEffect(() => {
    // Events would be loaded from static data here
    setEvents([])
  }, [])

  const limitedEvents = events.slice(0, 10)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, { month: 'short', day: 'numeric' })

  const categoryIcons = {
    yoga: YogaIcon,
    energy: EnergyIcon,
  }

  const modeIcons = {
    online: OnlineIcon,
    inPerson: InPersonIcon,
  }

  if (isMobile) {
    return (
      <Box bg={bg} borderBottomWidth="1px" borderColor={borderColor} py={2} px={4}>
        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
            {t('title')}
          </MenuButton>
          <MenuList>
            {limitedEvents.map(evt => {
              const CategoryIcon = categoryIcons[evt.category]
              const ModeIcon = modeIcons[evt.mode]
              return (
                <MenuItem
                  as={ChakraLink}
                  href="#"
                  key={evt.id}
                  display="flex"
                  alignItems="center"
                >
                  <CategoryIcon boxSize={4} mr={1} />
                  <ModeIcon boxSize={4} mr={1} />
                  {evt.title} – {formatDate(evt.date)}
                </MenuItem>
              )
            })}
            <MenuItem as={NextLink} href="/event" display="flex" alignItems="center">
              <CalendarIcon boxSize={4} mr={1} />
              {t('more')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    )
  }

  return (
    <Box bg={bg} borderBottomWidth="1px" borderColor={borderColor} py={2}>
      <HStack spacing={4} maxW="7xl" mx="auto" px={4}>
        <Text fontSize="sm" fontWeight="semibold" whiteSpace="nowrap">
          {t('title')}
        </Text>
        <HStack
          spacing={4}
          divider={<StackDivider borderColor={borderColor} />}
          align="center"
          overflowX="hidden"
        >
          {limitedEvents.map(evt => {
            const CategoryIcon = categoryIcons[evt.category]
            const ModeIcon = modeIcons[evt.mode]
            return (
              <ChakraLink
                key={evt.id}
                href="#"
                display="inline-flex"
                alignItems="center"
                fontSize="sm"
                whiteSpace="nowrap"
              >
                <CategoryIcon boxSize={4} mr={1} />
                <ModeIcon boxSize={4} mr={1} />
                {evt.title} – {formatDate(evt.date)}
              </ChakraLink>
            )
          })}
        </HStack>
        <Box pl={4} borderLeftWidth="1px" borderColor={borderColor}>
          <ChakraLink
            as={NextLink}
            href="/event"
            display="inline-flex"
            alignItems="center"
            fontSize="sm"
            whiteSpace="nowrap"
          >
            <CalendarIcon boxSize={4} mr={1} />
            {t('more')}
          </ChakraLink>
        </Box>
      </HStack>
    </Box>
  )
}
