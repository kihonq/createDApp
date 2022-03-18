import { JSXElement, createEffect, createSignal, Show } from 'solid-js'

import { getChainById } from '../helpers'
import { deployContract } from '../helpers/contract'
import { useEthers } from '../hooks'
import multicallABI from '../constants/abi/MultiCall.json'

import { useBlockNumber } from './blockNumber'
import { useConfig, useUpdateConfig } from './config'

interface LocalMulticallProps {
  children: JSXElement
}

enum LocalMulticallState {
  Unknown,
  NonLocal,
  Deploying,
  Deployed,
  Error,
}

export function LocalMulticallProvider(props: LocalMulticallProps) {
  const updateConfig = useUpdateConfig()
  const { multicallAddresses } = useConfig()
    const [ethersState] = useEthers()
  const [localMulticallState, setLocalMulticallState] = createSignal(LocalMulticallState.Unknown)
  const [multicallBlockNumber, setMulticallBlockNumber] = createSignal<number>()
  const blockNumber = useBlockNumber()

  createEffect(() => {
    const library = ethersState.library
    const chainId = ethersState.chainId
    if (!library || !chainId) {
      setLocalMulticallState(LocalMulticallState.Unknown)
    } else if (!getChainById(chainId)?.isLocalChain) {
      setLocalMulticallState(LocalMulticallState.NonLocal)
    } else if (multicallAddresses && multicallAddresses[chainId]) {
      setLocalMulticallState(LocalMulticallState.Deployed)
    } else if (localMulticallState() !== LocalMulticallState.Deploying) {
      const signer = library.getSigner()
      if (!signer) {
        setLocalMulticallState(LocalMulticallState.Error)
        return
      }

      setLocalMulticallState(LocalMulticallState.Deploying)

      const deployMulticall = async () => {
        try {
          const { contractAddress, blockNumber } = await deployContract(multicallABI, signer)
          updateConfig({ multicallAddresses: { [chainId]: contractAddress } })
          setMulticallBlockNumber(blockNumber)
          setLocalMulticallState(LocalMulticallState.Deployed)
        } catch {
          setLocalMulticallState(LocalMulticallState.Error)
        }
      }

      deployMulticall()
    }
  })

  const awaitingMulticallBlock = () =>
    Boolean(multicallBlockNumber()) && blockNumber && blockNumber < Number(multicallBlockNumber())
  const isDeploying = () =>
    localMulticallState() === LocalMulticallState.Deploying ||
    (localMulticallState() === LocalMulticallState.Deployed && awaitingMulticallBlock())
  const isError = () => localMulticallState() === LocalMulticallState.Error

  return (
    <Show when={!isDeploying()} fallback={<div>Deploying multicall...</div>}>
      <Show when={!isError()} fallback={<div>Error deploying multicall contract</div>}>
        {props.children}
      </Show>
    </Show>
  )
}
