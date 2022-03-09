import { createEffect } from 'solid-js'

import { useEthers } from '../../hooks'

import { notifyDevtools } from '../devtools'

import { RawCall } from './callsReducer'

export const useDevtoolsReporting = (
  uniqueCallsJSON: string,
  uniqueCalls: RawCall[],
  blockNumber: number | undefined,
  multicallAddresses: { [network: string]: string }
) => {
  const { chainId, account, error } = useEthers()

  const multicall = chainId !== undefined ? multicallAddresses[chainId] : undefined

  createEffect(() => {
    notifyDevtools({ type: 'NETWORK_CHANGED', chainId, multicallAddress: multicall })
  })

  createEffect(() => {
    notifyDevtools({ type: 'ACCOUNT_CHANGED', address: account ?? undefined })
  })

  createEffect((prevUniqueCallsJSON) => {
    if (!uniqueCallsJSON || prevUniqueCallsJSON !== uniqueCallsJSON) {
      notifyDevtools({ type: 'CALLS_CHANGED', chainId, calls: uniqueCalls })
    }

    return uniqueCallsJSON
  }, uniqueCallsJSON)

  createEffect(() => {
    if (chainId !== undefined && blockNumber !== undefined) {
      notifyDevtools({ type: 'BLOCK_NUMBER_CHANGED', chainId, blockNumber })
    }
  })

  createEffect(() => {
    if (error !== undefined) {
      notifyDevtools({ type: 'GENERIC_ERROR', error })
    }
  })
}
