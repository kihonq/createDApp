import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { NetworkConnectedPreview } from '../../../views/Events/EventPreview/NetworkConnectedPreview'
import { NETWORK_ARGTYPE } from '../../args'

export default {
  title: 'Components/EventPreview/Network Connected',
  argTypes: {
    network: NETWORK_ARGTYPE,
  },
  args: {
    network: 'Mainnet',
    chainId: 1,
  },
} as Meta

interface Args {
  network: string
  chainId: number
  blockNumber: number
}

export const NetworkConnected: Story<Args> = (args) =>
  (
    <>
      <GlobalStyle />
      <NetworkConnectedPreview
        event={{
          type: 'NETWORK_CONNECTED',
          time: '+03:10.497',
          chainId: args.chainId,
          network: args.network,
        }}
      />
    </>
  ) as StoryFnHtmlReturnType
