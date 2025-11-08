import { useEffect, useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useTranslations } from '../lib/i18n'
import { EventList } from '../components/EventList'
import type { Event } from '../types/Event'

export default function EventsPage() {
  const t = useTranslations('upcomingEvents')

  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Events would be loaded from static data here
    setEvents([])
  }, [])

  const buildLink = () => '#'

  return (
    <Box bg="pageBg" minH="100vh" py={8} px={4}>
      <Box maxW="6xl" mx="auto">
        <Heading mb={8}>{t('title')}</Heading>
        <EventList events={events} buildLink={buildLink} />
      </Box>
    </Box>
  )
}
