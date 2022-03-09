import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'
import { Mainnet, DAppProvider, Config } from '@createdapp/core'

import { App } from './App'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/14a0951f47e646c1b241aa533e150219',
  },
  multicallVersion: 2 as const,
}

render(
  () => (
    <Router>
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
)
