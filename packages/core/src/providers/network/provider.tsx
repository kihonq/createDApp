import { JSXElement, createSignal } from 'solid-js'
import { JsonRpcProvider, Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { EventEmitter } from 'events'

import { subscribeToProviderEvents } from '../../helpers/eip1193'
import { useReducer } from '../../hooks'

import { defaultNetworkState, networksReducer } from './reducer'
import { NetworkContext } from './context'
import { Network } from './model'

interface NetworkProviderProps {
  children: JSXElement
}

async function tryToGetAccount(provider: JsonRpcProvider) {
  try {
    return await provider.getSigner().getAddress()
  } catch (e: any) {
    if (e.code === 'UNSUPPORTED_OPERATION') {
      // readonly provider
      return undefined
    }

    throw e
  }
}

export function NetworkProvider(props: NetworkProviderProps) {
  const [network, dispatch] = useReducer(networksReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = createSignal<() => void>(() => () => undefined)

  const update = (newNetwork: Partial<Network>) => {
    dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
  }

  const reportError = (error: Error) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }

  const deactivate = () => {
    update({
      accounts: [],
    })
  }

  const onDisconnect = (error: Error) => {
    deactivate()
    reportError(error)
  }

  const activate = async (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => {
    const wrappedProvider = provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider)
    try {
      const account = await tryToGetAccount(wrappedProvider)
      const chainId = (await wrappedProvider.getNetwork())?.chainId
      onUnsubscribe()()
      const clearSubscriptions = subscribeToProviderEvents((wrappedProvider as any).provider, update, onDisconnect)
      setOnUnsubscribe(() => clearSubscriptions)
      update({
        provider: wrappedProvider,
        chainId,
        accounts: account ? [account] : [],
      })
    } catch (e) {
      reportError(e as Error)
    }
  }

  return (
    <NetworkContext.Provider value={[network, { update, activate, deactivate, reportError }]}>
      {props.children}
    </NetworkContext.Provider>
  )
}
