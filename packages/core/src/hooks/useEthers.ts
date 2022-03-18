import { JsonRpcProvider } from '@ethersproject/providers'
import { EventEmitter } from 'events'
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

import { ChainId } from '../constants'
import { useInjectedNetwork, useNetwork } from '../providers'

import { useLocalStorage } from './useLocalStorage'

type SupportedProviders =
  | JsonRpcProvider
  | EventEmitter
  | { getProvider: () => JsonRpcProvider | EventEmitter; activate: () => Promise<void> }

type Web3EthersState = {
  connector: undefined
  chainId?: ChainId
  account?: null | string
  error?: Error
  library?: JsonRpcProvider
  active: boolean
}

export type Web3Ethers = [
  Web3EthersState,
  {
    activate: (provider: SupportedProviders) => Promise<void>
    setError: (error: Error) => void
    deactivate: () => void
    activateBrowserWallet: () => void
  }
]

export const useEthers = (): Web3Ethers => {
  const [network, { deactivate, activate: activateNetwork }] = useNetwork()
  const [injectedProvider, { connect }] = useInjectedNetwork()
  const [, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
  const [ethersState, setEthersState] = createStore<Web3EthersState>({ active: false, connector: undefined })

  createEffect(() => {
    setEthersState({
      active: !!network.provider,
      library: network.provider,
      chainId: network.chainId,
      account: network.accounts[0],
      error: network.errors[network.errors.length - 1],
    })
  })

  const activate = async (providerOrConnector: SupportedProviders) => {
    if ('getProvider' in providerOrConnector) {
      console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
      await providerOrConnector.activate()
      return activateNetwork(await providerOrConnector.getProvider())
    }
    return activateNetwork(providerOrConnector)
  }

  const handlers = {
    activate,
    deactivate: () => {
      deactivate()
      setShouldConnectMetamask(false)
    },
    activateBrowserWallet: async () => {
      const injected = injectedProvider()
      if (!injected) {
        return
      }
      await connect()
      await activate(injected)
      setShouldConnectMetamask(true)
    },
    setError: () => {
      throw new Error('setError is deprecated')
    },
  }

  return [ethersState as Web3EthersState, handlers]
}
