import { Route, Routes } from 'solid-app-router'

import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Balance } from './pages/Balance'
import { Prices } from './pages/Prices'
import { Block } from './pages/Block'
import { Tokens } from './pages/Tokens'
import { Transactions } from './pages/Transactions'
import { SendEtherPage } from './pages/SendEtherPage'
import { NotificationsList } from './components/Transactions/History'
import { Web3Modal } from './pages/Web3Modal'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <TopBar />
      <Routes>
        <Route path="/" component={Balance} />
        <Route path="/balance" component={Balance} />
        <Route path="/prices" component={Prices} />
        <Route path="/block" component={Block} />
        <Route path="/tokens" component={Tokens} />
        <Route path="/send" component={SendEtherPage} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/web3modal" component={Web3Modal} />
      </Routes>
      <NotificationsList />
    </Page>
  )
}
