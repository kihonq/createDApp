import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { AccountDisconnectedPreview } from '../../../views/Events/EventPreview/AccountDisconnectedPreview'

export default {
  title: 'Components/EventPreview/Account Disconnected',
  parameters: {
    component: AccountDisconnectedPreview,
  },
} as Meta

export const AccountDisconnected: Story = () =>
  (
    <>
      <GlobalStyle />
      <AccountDisconnectedPreview />
    </>
  ) as StoryFnHtmlReturnType

AccountDisconnected.parameters = {
  controls: { hideNoControlsWarning: true },
}
