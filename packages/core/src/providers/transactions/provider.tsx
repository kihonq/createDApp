import { JSXElement, createEffect } from 'solid-js'

import { useEthers, useLocalStorage, useReducer } from '../../hooks'

import { useConfig } from '../config'
import { useBlockNumber } from '../blockNumber'
import { useNotificationsContext } from '../notifications/context'

import { TransactionsContext } from './context'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction } from './model'
import { transactionReducer } from './reducer'

interface Props {
  children: JSXElement
}

export const TransactionProvider = (props: Props) => {
  const [ethersState] = useEthers()
  const blockNumber = useBlockNumber()
  const { localStorage } = useConfig()
  const [storage, setStorage] = useLocalStorage(localStorage.transactionPath)
  const [transactions, dispatch] = useReducer(transactionReducer, storage() ?? DEFAULT_STORED_TRANSACTIONS)
  const { addNotification } = useNotificationsContext()

  createEffect(() => {
    setStorage(transactions)
  })

  const addTransaction = (payload: StoredTransaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload,
    })
    addNotification({
      notification: {
        type: 'transactionStarted',
        transaction: payload.transaction,
        submittedAt: payload.submittedAt,
        transactionName: payload.transactionName,
      },
      chainId: payload.transaction.chainId,
    })
  }

  createEffect(() => {
    const library = ethersState.library
    const chainId = ethersState.chainId
    
    const updateTransactions = async () => {
      if (!chainId || !library || !blockNumber) {
        return
      }

      const checkTransaction = async (tx: StoredTransaction) => {
        if (tx.receipt || !shouldCheck(blockNumber, tx)) {
          return tx
        }

        try {
          const receipt = await library.getTransactionReceipt(tx.transaction.hash)
          if (receipt) {
            const type = receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed'
            addNotification({
              notification: {
                type,
                submittedAt: Date.now(),
                transaction: tx.transaction,
                receipt,
                transactionName: tx.transactionName,
              },
              chainId,
            })

            return { ...tx, receipt }
          } else {
            return { ...tx, lastCheckedBlockNumber: blockNumber }
          }
        } catch (error) {
          console.error(`failed to check transaction hash: ${tx.transaction.hash}`, error)
        }

        return tx
      }

      const chainTransactions = transactions[chainId] ?? []
      const newTransactions: StoredTransaction[] = []
      for (const tx of chainTransactions) {
        const newTransaction = await checkTransaction(tx)
        newTransactions.push(newTransaction)
      }

      dispatch({ type: 'UPDATE_TRANSACTIONS', chainId, transactions: newTransactions })
    }

    updateTransactions()
  })

  return <TransactionsContext.Provider value={{ transactions, addTransaction }} children={props.children} />
}

const shouldCheck = (blockNumber: number, tx: StoredTransaction): boolean => {
  if (tx.receipt) {
    return false
  }

  if (!tx.lastCheckedBlockNumber) {
    return true
  }

  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) {
    return false
  }

  const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }

  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }

  // otherwise every block
  return true
}
