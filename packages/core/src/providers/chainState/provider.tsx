import { JSXElement, createEffect } from 'solid-js'

import { useDebouncePair, useEthers, useReducer } from '../../hooks'
import { useNetwork } from '../../providers'
import { getUniqueCalls } from '../../helpers'

import { useBlockNumber } from '../blockNumber/context'
import { notifyDevtools } from '../devtools'
import { useConfig } from '../config'

import { callsReducer } from './callsReducer'
import { multicall as multicall1 } from './multicall'
import { useDevtoolsReporting } from './useDevtoolsReporting'
import { multicall2 } from './multicall2'
import { chainStateReducer } from './chainStateReducer'
import { ChainStateContext } from './context'

interface Props {
  children: JSXElement
  multicallAddresses: {
    [chainId: number]: string
  }
}

export const ChainStateProvider = (props: Props) => {
  const { multicallVersion } = useConfig()
  const multicall = multicallVersion === 1 ? multicall1 : multicall2
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const { reportError } = useNetwork()
  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const [debouncedCalls, debouncedId] = (useDebouncePair(calls, chainId, 50))()
  const uniqueCalls = debouncedId === chainId ? getUniqueCalls(debouncedCalls) : []
  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(uniqueCalls)
  const multicallAddresses = () => props.multicallAddresses

  const multicallAddress = chainId !== undefined ? multicallAddresses()[chainId] : undefined

  useDevtoolsReporting(uniqueCallsJSON, uniqueCalls, blockNumber, multicallAddresses())

  createEffect(() => {
    if (library && blockNumber !== undefined && chainId !== undefined) {
      if (!multicallAddress) {
        console.error(`Missing multicall address for chain id ${chainId}`)
        return
      }
      const start = Date.now()
      multicall(library, multicallAddress, blockNumber, uniqueCalls)
        .then((state) => {
          dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state })
          notifyDevtools({
            type: 'MULTICALL_SUCCESS',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            state,
          })
        })
        .catch((error) => {
          reportError(error)
          dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error })
          notifyDevtools({
            type: 'MULTICALL_ERROR',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            calls: uniqueCalls,
            error,
          })
        })
    }
  })

  const value = chainId !== undefined ? state[chainId] : undefined
  const provided = { value, multicallAddress, dispatchCalls }

  return <ChainStateContext.Provider value={provided} children={props.children} />
}
