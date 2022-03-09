import { createSignal } from 'solid-js'
import { errors } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions } from '../../src'
import { TransactionState } from '../model'

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED && e?.replacement && (e?.reason === 'repriced' || e?.cancelled === false)

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = createSignal<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()
  const { addNotification } = useNotificationsContext()

  const resetState = () => {
    setState({ status: 'None' })
  }

  const promiseTransaction = async (transactionPromise: Promise<TransactionResponse>) => {
    if (!chainId) {
      return
    }

    let transaction: TransactionResponse | undefined = undefined

    try {
      setState({ status: 'PendingSignature', chainId })

      transaction = await transactionPromise

      setState({ transaction, status: 'Mining', chainId })
      addTransaction({
        transaction: {
          ...transaction,
          chainId: chainId,
        },
        submittedAt: Date.now(),
        transactionName: options?.transactionName,
      })
      const receipt = await transaction.wait()
      setState({ receipt, transaction, status: 'Success', chainId })
      return receipt
    } catch (e: any) {
      const errorMessage = e.error?.message ?? e.reason ?? e.data?.message ?? e.message
      if (transaction) {
        const droppedAndReplaced = isDroppedAndReplaced(e)

        if (droppedAndReplaced) {
          const status: TransactionState = e.receipt.status === 0 ? 'Fail' : 'Success'
          const type = status === 'Fail' ? 'transactionFailed' : 'transactionSucceed'

          addNotification({
            notification: {
              type,
              submittedAt: Date.now(),
              transaction: e.replacement,
              receipt: e.receipt,
              transactionName: e.replacement?.transactionName,
              originalTransaction: transaction,
            },
            chainId,
          })

          setState({
            status,
            transaction: e.replacement,
            originalTransaction: transaction,
            receipt: e.receipt,
            errorMessage,
            chainId,
          })
        } else {
          setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId })
        }
      } else {
        setState({ status: 'Exception', errorMessage, chainId })
      }
      return undefined
    }
  }

  return { promiseTransaction, state, resetState }
}
