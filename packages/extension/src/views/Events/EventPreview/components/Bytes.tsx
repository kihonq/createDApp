import { For } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Font } from '../../../../design'

interface Props {
  value: string
}

export function Bytes({ value }: Props) {
  if (value === '') {
    return <Empty>&lt;zero bytes&gt;</Empty>
  }
  const split = splitIntoSegments(value).map(splitIntoBytes)
  return (
    <Block>
      <For each={split}>
        {(segment) => (
          <Segment>
            <For each={segment}>{(byte) => <Byte>{byte}</Byte>}</For>
          </Segment>
        )}
      </For>
    </Block>
  )
}

const Empty = styled.span`
  font-family: ${Font.Code};
  font-style: italic;
`

const Block = styled.span`
  display: inline-block;
`

const Segment = styled.span`
  font-family: ${Font.Code};
  display: block;
`

const Byte = styled.span``

function splitIntoSegments(value: string): string[] {
  return value.match(/.{1,32}/g) ?? []
}

function splitIntoBytes(value: string): string[] {
  return value.match(/.{1,2}/g) ?? []
}
