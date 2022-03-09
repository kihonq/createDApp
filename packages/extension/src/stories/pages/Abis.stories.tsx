import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { Abis as AbisComponent } from '../../views/Abis/Abis'
import { AbiProvider } from '../../providers/abi/AbiProvider'

export default {
  title: 'Pages/Abis',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Abis: Story = () =>
  (
    <AbiProvider>
      <GlobalStyle />
      <AbisComponent onNavigate={() => undefined} />
    </AbiProvider>
  ) as StoryFnHtmlReturnType
  
Abis.parameters = {
  controls: { hideNoControlsWarning: true },
}
