import { For } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Colors } from '../../../../design'
import { Call, GeneralizedCall } from './Call'

interface Props {
  calls: GeneralizedCall[]
  network: string | undefined
}

export function CallList({ calls, network }: Props) {
  return (
    <List>
      <For each={calls}>
        {(call) => (
          <Item>
            <Call call={call} network={network} />
          </Item>
        )}
      </For>
    </List>
  )
}

const List = styled.ul`
  list-style-type: none;
  margin: 0 0 15px 0;
  padding: 0;
`

const Item = styled.li`
  margin: 0 0 15px 0;

  &:not(:last-child) {
    padding-bottom: 15px;
    border-bottom: 1px solid ${Colors.Border};
  }
`
