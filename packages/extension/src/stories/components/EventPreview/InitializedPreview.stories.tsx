import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { InitializedPreview } from '../../../views/Events/EventPreview/InitializedPreview'

export default {
  title: 'Components/EventPreview/Initialized',
  parameters: {
    component: InitializedPreview,
  },
} as Meta

export const Initialized: Story = () =>
  (
    <>
      <GlobalStyle />
      <InitializedPreview />
    </>
  ) as StoryFnHtmlReturnType

Initialized.parameters = {
  controls: { hideNoControlsWarning: true },
}
