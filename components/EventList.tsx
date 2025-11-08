import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import { useLocale } from '../lib/i18n'
import type { Event } from '../types/Event'
import { EventCard } from './EventCard'

interface Props {
  events: Event[]
  buildLink: (slug: string, mode: Event['mode']) => string
}

export function EventList({ events, buildLink }: Props) {
  const locale = useLocale()

  const uniq = Array.from(new Map(events.map(e => [e.id, e])).values())
  uniq.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const groups: { month: string; events: Event[] }[] = []
  for (const evt of uniq) {
    const monthLabel = new Date(evt.date).toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
    })
    let group = groups.find(g => g.month === monthLabel)
    if (!group) {
      group = { month: monthLabel, events: [] }
      groups.push(group)
    }
    group.events.push(evt)
  }

  return (
    <VStack align="stretch" spacing={10}>
      {groups.map(group => (
        <Box key={group.month}>
          <Heading
            as="h2"
            size="md"
            position="sticky"
            top={{ base: 14, md: 4 }}
            bg="pageBg"
            py={2}
            zIndex={1}
          >
            {group.month}
          </Heading>

          <SimpleGrid mt={4} columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {group.events.map(evt => (
              <EventCard key={evt.id} event={evt} href={buildLink(evt.slug, evt.mode)} />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  )
}
