import type { AccountConnectedEvent } from '../../../providers/events/State'

import { Text } from '../../shared'

import { Property, Table } from './components'
import { Address } from './components/Address'

interface Props {
  event: AccountConnectedEvent
}

export const AccountConnectedPreview = ({ event }: Props) => (
  <>
    <Text>An account has been connected to the application. It can now be used to sign transactions.</Text>
    <Table>
      <Property name="Address">
        <Address address={event.address} network="Mainnet" />
      </Property>
    </Table>
  </>
)
