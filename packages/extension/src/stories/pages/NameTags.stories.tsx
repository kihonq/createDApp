import type { Story, Meta } from '@storybook/html'
import type { StoryFnHtmlReturnType } from '@storybook/html/dist/ts3.9/client/preview/types'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { NameTags as NameTagsComponent } from '../../views/NameTags/NameTags'
import { NameTagsProvider } from '../../providers/nameTags/NameTagsProvider'

export default {
  title: 'Pages/Name Tags',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const NameTags: Story = () => (
  <NameTagsProvider>
    <GlobalStyle />
    <NameTagsComponent onNavigate={() => undefined} />
  </NameTagsProvider>
) as StoryFnHtmlReturnType

NameTags.parameters = {
  controls: { hideNoControlsWarning: true },
}
