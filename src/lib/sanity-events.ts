import {client} from '../../sanity/lib/client'
import {eventsQuery} from '../../sanity/lib/queries'

interface SanityImageAsset {
  _id: string;
  url: string;
}

interface SanityImage {
  asset?: SanityImageAsset;
  hotspot?: {
    _type: string;
    height: number;
    width: number;
    x: number;
    y: number;
  };
  crop?: {
    _type: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
}

export type EventCategory = "Weekly" | "Monthly" | "Youth & Young Adult" | "Special Events";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: SanityImage | null;
  imageFallback?: string;
  category: EventCategory;
  description: string;
  location?: string;
  isRecurring?: boolean;
  priority?: number;
  registrationUrl?: string;
  linkText?: string;
}

// Fetch all events from Sanity
export async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch(eventsQuery)
    return events
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events from Sanity:', error)
    }
    return []
  }
}

// Helper function to parse dates (handles both ISO dates and recurring events)
export function parseEventDate(event: Event): Date {
  if (event.isRecurring) {
    return new Date()
  }

  if (event.date.includes('-') && event.date.length === 10) {
    return new Date(event.date)
  }

  return new Date()
}

// Get upcoming events sorted by priority
export function getUpcomingEvents(events: Event[], limit?: number): Event[] {
  const now = new Date()

  const upcoming = events
    .filter(event => {
      if (event.isRecurring) return true

      const eventDate = parseEventDate(event)
      return eventDate >= now
    })
    .sort((a, b) => {
      if (!a.isRecurring && !b.isRecurring) {
        const dateA = parseEventDate(a)
        const dateB = parseEventDate(b)
        return dateA.getTime() - dateB.getTime()
      }

      if (!a.isRecurring && b.isRecurring) return -1
      if (a.isRecurring && !b.isRecurring) return 1

      return (a.priority || 0) - (b.priority || 0)
    })

  return limit ? upcoming.slice(0, limit) : upcoming
}

// Determine if a single event is in the past
export function isPastEvent(event: Event): boolean {
  if (event.isRecurring) return false;
  return parseEventDate(event) < new Date();
}

// Get past events
export function getPastEvents(events: Event[]): Event[] {
  const now = new Date()

  return events
    .filter(event => {
      if (event.isRecurring) return false

      const eventDate = parseEventDate(event)
      return eventDate < now
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a)
      const dateB = parseEventDate(b)
      return dateB.getTime() - dateA.getTime()
    })
}