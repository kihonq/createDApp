import { JSXElement, onMount, createSignal } from 'solid-js'
import { Web3Provider } from '@ethersproject/providers'

import { getInjectedProvider } from '../../helpers/injectedProvider'

import { useNetwork } from '../network'
import { useConfig } from '../config'

import { InjectedNetworkContext } from './context'

interface InjectedNetworkProviderProps {
  children: JSXElement
}

export const InjectedNetworkProvider = (props: InjectedNetworkProviderProps) => {
  const [, { reportError }] = useNetwork()
  const { pollingInterval } = useConfig()
  const [injectedProvider, setInjectedProvider] = createSignal<Web3Provider | undefined>()

  onMount(() => {
    getInjectedProvider(pollingInterval).then(setInjectedProvider)
  })

  const connect = async () => {
    if (!injectedProvider()) {
      reportError(new Error('No injected provider available'))
      return
    }
    try {
      await injectedProvider()?.send('eth_requestAccounts', [])
      return injectedProvider()
    } catch (e) {
      if (e instanceof Error) {
        reportError(e)
      }
    }
  }

  return (
    <InjectedNetworkContext.Provider
      value={[
        injectedProvider,
        {
          connect,
        },
      ]}
    >
      {props.children}
    </InjectedNetworkContext.Provider>
  )
}
