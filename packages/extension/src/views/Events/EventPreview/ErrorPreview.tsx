import type { ErrorEvent } from '../../../providers/events/State'

import { Text, Title } from '../../shared'

interface Props {
  event: ErrorEvent
}

export const ErrorPreview = ({ event }: Props) => (
  <>
    <Title>Error message:</Title>
    <Text>{event.error}</Text>
  </>
)
