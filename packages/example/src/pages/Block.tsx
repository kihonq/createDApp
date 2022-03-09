import { useBlockMeta, useBlockNumber, useEthers } from '@createdapp/core'
import { Show } from 'solid-js'

import { Container, ContentBlock, ContentRow, MainContent, Section } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'

export function Block() {
  const blockNumber = useBlockNumber()
  const { chainId } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()

  return (
    <MainContent>
      <Container>
        <Section>
          <ContentBlock>
            <ContentRow>
              <Label>Chain id:</Label> <TextInline>{chainId}</TextInline>
            </ContentRow>
            <ContentRow>
              <Label>Current block:</Label> <TextInline>{blockNumber}</TextInline>
            </ContentRow>
            <Show when={difficulty}>
              {(value) => (
                <ContentRow>
                  <Label>Current difficulty:</Label> <TextInline>{value.toString()}</TextInline>
                </ContentRow>
              )}
            </Show>
            <Show when={timestamp}>
              {(value) => (
                <ContentRow>
                  <Label>Current block timestamp:</Label> <TextInline>{value.toLocaleString()}</TextInline>
                </ContentRow>
              )}
            </Show>
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
