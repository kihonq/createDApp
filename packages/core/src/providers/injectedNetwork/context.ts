import { Accessor, createContext, useContext } from 'solid-js'
import { Web3Provider } from '@ethersproject/providers'

export const InjectedNetworkContext = createContext<
  [
    Accessor<Web3Provider | undefined>,
    {
      connect: () => Promise<Web3Provider | undefined>
    }
  ]
>([
  () => undefined,
  {
    connect: async () => undefined,
  },
])

export const useInjectedNetwork = () => useContext(InjectedNetworkContext)
