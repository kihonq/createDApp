import { createEffect, createSignal, Show } from 'solid-js'
import { styled } from 'solid-styled-components'
import { useEthers, shortenAddress, useLookupAddress } from '@createdapp/core'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { Colors } from '../../global/styles'

import { Button } from '../base/Button'

import { AccountModal } from './AccountModal'

export const Web3ModalButton = () => {
  const { account, activate, deactivate } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = createSignal(false)
  const [activateError, setActivateError] = createSignal('')
  const { error } = useEthers()

  createEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  })

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: '14a0951f47e646c1b241aa533e150219',
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  return (
    <Account>
      <ErrorWrapper>{activateError()}</ErrorWrapper>
      <Show when={showModal()}>
        <AccountModal setShowModal={setShowModal} />
      </Show>
      <Show when={account} fallback={<LoginButton onClick={activateProvider}>Connect</LoginButton>}>
        {(value) => (
          <>
            <AccountLabel onClick={() => setShowModal(!showModal())}>{ens() ?? shortenAddress(value)}</AccountLabel>
            <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
          </>
        )}
      </Show>
    </Account>
  )
}

const ErrorWrapper = styled.div`
  color: #ff3960;
  margin-right: 40px;
  margin-left: 40px;
  overflow: auto;
`

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(Button)`
  background-color: ${Colors.Yellow[100]};
`

const AccountLabel = styled(Button)`
  height: 32px;
  margin-right: -40px;
  padding-right: 40px;
  padding-left: 8px;
  background-color: ${Colors.Yellow[100]};
  font-size: 12px;
`
