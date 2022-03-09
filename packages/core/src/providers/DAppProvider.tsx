import { JSXElement, createMemo } from 'solid-js'

import { Config, Chain } from '../constants'

import { ConfigProvider } from './config'
import { BlockNumberProvider } from './blockNumber'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { NotificationsProvider } from './notifications/provider'
import { NetworkActivator } from './NetworkActivator'
import { TransactionProvider } from './transactions/provider'
import { LocalMulticallProvider } from './LocalMulticallProvider'
import { NetworkProvider } from './network'
import { InjectedNetworkProvider } from './injectedNetwork'

interface DAppProviderProps {
  children: JSXElement
  config: Config
}

interface WithConfigProps {
  children: JSXElement
}

export const DAppProvider = (props: DAppProviderProps) => {
  return (
    <ConfigProvider config={props.config}>
      <DAppProviderWithConfig>{props.children}</DAppProviderWithConfig>
    </ConfigProvider>
  )
}

const getMulticallAddresses = (networks: Chain[] | undefined) => {
  const result: { [index: number]: string } = {}
  networks?.forEach((network) => (result[network.chainId] = network.multicallAddress))
  return result
}

const getMulticall2Addresses = (networks: Chain[] | undefined) => {
  const result: { [index: number]: string } = {}
  networks?.forEach((network) => {
    if (network.multicall2Address) {
      result[network.chainId] = network.multicall2Address
    }
  })
  return result
}

const DAppProviderWithConfig = (props: WithConfigProps) => {
  const { multicallAddresses, networks, multicallVersion } = useConfig()
  const defaultAddresses = createMemo(
    () => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks))
  )
  const multicallAddressesMerged = () => ({ ...defaultAddresses(), ...multicallAddresses })

  return (
    <NetworkProvider>
      <InjectedNetworkProvider>
        <BlockNumberProvider>
          <NetworkActivator />
          <LocalMulticallProvider>
            <ChainStateProvider multicallAddresses={multicallAddressesMerged()}>
              <NotificationsProvider>
                <TransactionProvider>{props.children}</TransactionProvider>
              </NotificationsProvider>
            </ChainStateProvider>
          </LocalMulticallProvider>
        </BlockNumberProvider>
      </InjectedNetworkProvider>
    </NetworkProvider>
  )
}
