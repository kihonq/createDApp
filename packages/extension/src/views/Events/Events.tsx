import { createSignal } from 'solid-js'

import { useEvents } from '../../hooks'
import type { Event } from '../../providers/events/State'

import { Page } from '../shared'

import { EventList } from './EventList/EventList'
import { EventPreview } from './EventPreview/EventPreview'

interface Props {
  onNavigate: (page: string) => void
}

export const Events = ({ onNavigate }: Props) => {
  const [event, setEvent] = createSignal<Event | undefined>(undefined)
  const events = useEvents()

  return (
    <Page name="events" onNavigate={onNavigate}>
      <EventList events={events} selected={event()} onSelect={(e) => setEvent(() => e)} />
      <EventPreview event={event()} />
    </Page>
  )
}
