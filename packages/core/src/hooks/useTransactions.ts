import { createMemo } from 'solid-js'

import { useTransactionsContext } from '../providers'

import { useEthers } from './useEthers'

export function useTransactions() {
  const [ethersState] = useEthers()
  const { addTransaction, transactions } = useTransactionsContext()

  const filtered = createMemo(() => {
    const account = ethersState.account
    const chainId = ethersState.chainId
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
