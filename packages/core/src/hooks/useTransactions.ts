import { createMemo } from 'solid-js'

import { useTransactionsContext } from '../providers'

import { useEthers } from './useEthers'

export function useTransactions() {
  const { chainId, account } = useEthers()
  const { addTransaction, transactions } = useTransactionsContext()

  const filtered = createMemo(() => {
    if (chainId === undefined || !account) {
      return []
    }

    return (transactions[chainId] ?? []).filter((x) => x.transaction.from === account)
  })

  return {
    transactions: filtered,
    addTransaction,
  }
}
