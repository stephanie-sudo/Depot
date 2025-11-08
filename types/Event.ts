export type EventCategory = 'yoga' | 'energy'
export type EventMode = 'online' | 'inPerson'

export interface Event {
  id: number
  title: string
  topic: string
  date: string // ISO 8601
  category: EventCategory
  mode: EventMode
  slug: string
  description: string
}
