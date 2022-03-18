import { createEffect, createSignal } from 'solid-js'
import { JsonRpcProvider } from '@ethersproject/providers'

import { useEthers, useLocalStorage } from '../hooks'

import { useConfig } from './config'
import { useInjectedNetwork } from './injectedNetwork'

interface NetworkActivatorProps {
  providerOverride?: JsonRpcProvider
}

export const NetworkActivator = (props: NetworkActivatorProps) => {
  const [ethersState, { activate, activateBrowserWallet }] = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect, pollingInterval } = useConfig()
  const injectedProvider = useInjectedNetwork()
  const [shouldConnectMetamask] = useLocalStorage<boolean>('shouldConnectMetamask')
  const [readonlyConnected, setReadonlyConnected] = createSignal(false)

  createEffect(() => {
    if (props.providerOverride) {
      activate(props.providerOverride)
    }
  })

  createEffect(() => {
    if (readOnlyChainId && readOnlyUrls && !props.providerOverride) {
      if (readOnlyUrls[readOnlyChainId] && ethersState.chainId !== readOnlyChainId) {
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
      !props.providerOverride &&
      readonlyConnected() &&
      activateBrowserWallet()
  })

  return null
}
