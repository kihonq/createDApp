import { BigNumber } from '@ethersproject/bignumber'

import { MultiCallABI } from '../constants'
import { Falsy } from '../model/types'

import { useMulticallAddress } from './useMulticallAddress'
import { useContractCall } from './useContractCall'

export function useEtherBalance(address: string | Falsy): BigNumber | undefined {
  const multicallAddress = useMulticallAddress()
  const [etherBalance] =
    useContractCall(
      multicallAddress &&
        address && {
          abi: MultiCallABI,
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        }
    ) ?? []
  return etherBalance
}
