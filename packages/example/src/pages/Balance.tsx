import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@createdapp/core'

import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'

import { AccountButton } from '../components/account/AccountButton'
import { Show } from 'solid-js'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function Balance() {
  const { account } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)
  
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Balance</Title>
            <AccountButton />
          </SectionRow>
          <ContentBlock>
            <Show when={stakingBalance}>
              {(value) => (
                <ContentRow>
                  <Label>ETH2 staking contract holds:</Label> <TextInline>{formatEther(value)}</TextInline>{' '}
                  <Label>ETH</Label>
                </ContentRow>
              )}
            </Show>
            <Show when={account}>
              <ContentRow>
                <Label>Account:</Label> <TextInline>{account}</TextInline>
              </ContentRow>
            </Show>
            <Show when={userBalance}>
              {(value) => (
                <ContentRow>
                  <Label>Ether balance:</Label> <TextInline>{formatEther(value)}</TextInline> <Label>ETH</Label>
                </ContentRow>
              )}
            </Show>
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
