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
  const [ethersState] = useEthers()

  const multicall = ethersState.chainId !== undefined ? multicallAddresses[ethersState.chainId] : undefined

  createEffect(() => {
    notifyDevtools({ type: 'NETWORK_CHANGED', chainId: ethersState.chainId, multicallAddress: multicall })
  })

  createEffect(() => {
    notifyDevtools({ type: 'ACCOUNT_CHANGED', address: ethersState.account ?? undefined })
  })

  createEffect((prevUniqueCallsJSON) => {
    if (!uniqueCallsJSON || prevUniqueCallsJSON !== uniqueCallsJSON) {
      notifyDevtools({ type: 'CALLS_CHANGED', chainId: ethersState.chainId, calls: uniqueCalls })
    }

    return uniqueCallsJSON
  }, uniqueCallsJSON)

  createEffect(() => {
    if (ethersState.chainId !== undefined && blockNumber !== undefined) {
      notifyDevtools({ type: 'BLOCK_NUMBER_CHANGED', chainId: ethersState.chainId, blockNumber })
    }
  })

  createEffect(() => {
    if (ethersState.error !== undefined) {
      notifyDevtools({ type: 'GENERIC_ERROR', error: ethersState.error })
    }
  })
}
