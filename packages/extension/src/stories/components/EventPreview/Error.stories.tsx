import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { ErrorPreview } from '../../../views/Events/EventPreview/ErrorPreview'
import { AbiProvider } from '../../../providers/abi/AbiProvider'

export default {
  title: 'Components/EventPreview/Error',
} as Meta

export const Error: Story = () => (
  <AbiProvider>
    <GlobalStyle />
    <ErrorPreview
      event={{
        type: 'ERROR',
        time: '+03:10.497',
        error: 'Something went wrong',
      }}
    />
  </AbiProvider>
) as StoryFnHtmlReturnType

Error.parameters = {
  controls: { hideNoControlsWarning: true },
}
