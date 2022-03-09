import { createEffect, createSignal, Show } from 'solid-js'
import { styled } from 'solid-styled-components'
import { useEthers, shortenAddress, useLookupAddress } from '@createdapp/core'

import { Button } from '../base/Button'
import { Colors } from '../../global/styles'

import { AccountModal } from './AccountModal'

export const AccountButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = createSignal(false)

  const [activateError, setActivateError] = createSignal('')
  const { error } = useEthers()

  createEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  })

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }

  return (
    <Account>
      <ErrorWrapper>{activateError()}</ErrorWrapper>
      {showModal() && <AccountModal setShowModal={setShowModal} />}
      <Show when={account} fallback={<LoginButton onClick={activate}>Connect</LoginButton>}>
        {(value) => (
          <>
            <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(value)}</AccountLabel>
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
