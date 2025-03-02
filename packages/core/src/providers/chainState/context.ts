import { createContext, useContext } from 'solid-js'

import { Action } from './callsReducer'
import { ChainState } from './model'

export const ChainStateContext = createContext<{
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  multicallAddress: string | undefined
  dispatchCalls: (action: Action) => void
}>({
  multicallAddress: '',
  dispatchCalls: () => {
    // empty
  },
})

export const useChainState = () => useContext(ChainStateContext)
