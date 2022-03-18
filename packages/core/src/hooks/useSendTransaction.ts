import { TransactionRequest } from '@ethersproject/abstract-provider'

import { TransactionOptions } from '../model'

import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

export function useSendTransaction(options?: TransactionOptions) {
  const [ethersState] = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(ethersState.chainId, options)

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || ethersState.library?.getSigner()
    if (signer) {
      await promiseTransaction(signer.sendTransaction(transactionRequest))
    }
  }

  return { sendTransaction, state, resetState }
}
