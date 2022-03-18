import { createContext, useContext } from 'solid-js'
import { EventEmitter } from 'events'
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'

import { ChainId } from '../../constants'

import { Network } from './model'

type NetworkContextProps = [
  Network,
  {
    update: (network: Partial<Network>) => void
    reportError: (error: Error) => void
    activate: (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => Promise<void>
    deactivate: () => void
  }
]

export const NetworkContext = createContext<NetworkContextProps>([
  {
    provider: undefined,
    chainId: ChainId.Mainnet,
    accounts: [],
    errors: [],
  },
  {
    update: () => undefined,
    reportError: () => undefined,
    activate: async () => undefined,
    deactivate: () => undefined,
  },
])

export const useNetwork = () => useContext(NetworkContext)
