import { Accessor, createMemo } from 'solid-js'
import { Interface } from '@ethersproject/abi'

import { Falsy } from '../model/types'
import { RawCall } from '../providers/chainState/callsReducer'

import { useChainCalls } from './useChainCalls'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
  )
}

function encodeCallData(call: ContractCall | Falsy): RawCall | Falsy {
  if (!call) {
    return undefined
  }
  if (!call.address || !call.method) {
    warnOnInvalidContractCall(call)
    return undefined
  }
  try {
    return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args) }
  } catch {
    warnOnInvalidContractCall(call)
    return undefined
  }
}

export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

export function useContractCall(call: ContractCall | Falsy): any[] | undefined {
  return useContractCalls([call])()[0]
}

export function useContractCalls(calls: (ContractCall | Falsy)[]): Accessor<(any[] | undefined)[]> {
  const results = useChainCalls(calls.map(encodeCallData))

  const accessor = createMemo(() =>
    results.map((result, idx) => {
      const call = calls[idx]
      if (result === '0x') {
        warnOnInvalidContractCall(call)
        return undefined
      }
      return call && result ? (call.abi.decodeFunctionResult(call.method, result) as any[]) : undefined
    })
  )

  return accessor
}
