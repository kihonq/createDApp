import { render } from 'solid-js/web'

import { Providers } from './providers/Providers'
import { App } from './views/App'

render(
  () => (
    <Providers>
      <App />
    </Providers>
  ),
  document.getElementById('root') as HTMLElement
)
