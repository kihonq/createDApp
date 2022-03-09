import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { NetworkDisconnectedPreview } from '../../../views/Events/EventPreview/NetworkDisconnectedPreview'

export default {
  title: 'Components/EventPreview/Network Disconnected',
  parameters: {
    component: NetworkDisconnectedPreview,
  },
} as Meta

export const NetworkDisconnected: Story = () =>
  (
    <>
      <GlobalStyle />
      <NetworkDisconnectedPreview />
    </>
  ) as StoryFnHtmlReturnType

NetworkDisconnected.parameters = {
  controls: { hideNoControlsWarning: true },
}
