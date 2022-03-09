import { Accessor, createMemo } from 'solid-js'
import { Contract } from 'ethers'

import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'

import { useRawCalls } from './useRawCalls'

export interface Call<T extends TypedContract = Contract, MN extends ContractMethodNames<T> = ContractMethodNames<T>> {
  contract: T
  method: MN
  args: Params<T, MN>
}

export function useCall<T extends TypedContract, MN extends ContractMethodNames<T>>(
  call: Call<T, MN> | Falsy
): CallResult<T, MN> {
  return useCalls([call])()[0]
}

export function useCalls<T extends (Call | Falsy)[]>(calls: T): Accessor<CallResult<Contract, string>[]> {
  const results = useRawCalls(calls.map(encodeCallData))
  const result = createMemo(() => results().map((result, idx) => decodeCallResult(calls[idx], result)), [results])

  return result
}
