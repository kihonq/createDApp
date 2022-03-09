import { createEffect, createSignal } from 'solid-js'
import { JsonRpcProvider } from '@ethersproject/providers'

import { useEthers, useLocalStorage } from '../hooks'

import { useConfig } from './config'
import { useInjectedNetwork } from './injectedNetwork'

interface NetworkActivatorProps {
  providerOverride?: JsonRpcProvider
}

export const NetworkActivator = ({ providerOverride }: NetworkActivatorProps) => {
  const { activate, activateBrowserWallet, chainId: connectedChainId } = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect, pollingInterval } = useConfig()
  const injectedProvider = useInjectedNetwork()
  const [shouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
  const [readonlyConnected, setReadonlyConnected] = createSignal(false)

  createEffect(() => {
    if (providerOverride) {
      activate(providerOverride)
    }
  })

  createEffect(() => {
    if (readOnlyChainId && readOnlyUrls && !providerOverride) {
      if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
        const provider = new JsonRpcProvider(readOnlyUrls[readOnlyChainId])
        provider.pollingInterval = pollingInterval
        activate(provider).then(() => setReadonlyConnected(true))
      }
    }
  })

  createEffect(() => {
    shouldConnectMetamask() &&
      autoConnect &&
      injectedProvider &&
      !providerOverride &&
      readonlyConnected() &&
      activateBrowserWallet()
  })

  return null
}
