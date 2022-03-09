import { useContext } from 'solid-js'
import { EventContext } from '../providers/events/EventProvider'

export function useEvents() {
  return useContext(EventContext)
}
