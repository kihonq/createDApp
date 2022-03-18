import { createEffect, createSignal } from 'solid-js'
import { BigNumber } from 'ethers'

import { useBlockNumber } from '../providers/blockNumber/context'

import { useEthers } from './useEthers'

export const useGasPrice = () => {
  const [ethersState] = useEthers()
  const blockNumber = useBlockNumber()
  const [gasPrice, setGasPrice] = createSignal<BigNumber>()

  async function updateGasPrice() {
    setGasPrice(await ethersState.library?.getGasPrice())
  }

  createEffect((prevBlockNumber) => {
    if (!blockNumber || blockNumber !== prevBlockNumber) {
      updateGasPrice()
    }
  }, blockNumber)

  return gasPrice
}
