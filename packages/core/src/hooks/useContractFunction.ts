import { LogDescription } from 'ethers/lib/utils'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { createSignal } from 'solid-js'

import { addressEqual, TransactionOptions } from '../../src'

import { ContractFunctionNames, Params, TypedContract } from '../model/types'

import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

export function connectContractToSigner(contract: Contract, options?: TransactionOptions, library?: JsonRpcProvider) {
  if (contract.signer) {
    return contract
  }

  if (options?.signer) {
    return contract.connect(options.signer)
  }

  if (library?.getSigner()) {
    return contract.connect(library.getSigner())
  }

  throw new TypeError('No signer available in contract, options or library')
}

export function useContractFunction<T extends TypedContract, FN extends ContractFunctionNames<T>>(
  contract: T,
  functionName: FN,
  options?: TransactionOptions
) {
  const [ethersState] = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(ethersState.chainId, options)
  const [events, setEvents] = createSignal<LogDescription[]>()

  const send = async (...args: Params<T, FN>): Promise<void> => {
    const contractWithSigner = connectContractToSigner(contract, options, ethersState.library)
    const receipt = await promiseTransaction(contractWithSigner[functionName](...args))
    if (receipt?.logs) {
      const events = receipt.logs.reduce((accumulatedLogs, log) => {
        try {
          return addressEqual(log.address, contract.address)
            ? [...accumulatedLogs, contract.interface.parseLog(log)]
            : accumulatedLogs
        } catch (_err) {
          return accumulatedLogs
        }
      }, [] as LogDescription[])
      setEvents(events)
    }
  }

  return { send, state, events, resetState }
}
