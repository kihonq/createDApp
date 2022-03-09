import { For } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Colors, Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'

import { ValueItem } from './ValueItem'

interface Props {
  values: ParsedValue[]
  network: string | undefined
}

export function ValueList({ values, network }: Props) {
  return (
    <List>
      <For each={values}>
        {(v) => (
          <Item data-type={v.type}>
            <Key>{v.name}:&nbsp;</Key>
            <ValueItem value={v} network={network} />
          </Item>
        )}
      </For>
    </List>
  )
}

const List = styled.ol`
  padding-left: 2ch;
  margin: 0;
  list-style-type: none;
`

const Item = styled.li`
  &[data-type='bytes'] {
    display: flex;
    align-items: baseline;
  }
`

const Key = styled.span`
  font-family: ${Font.Code};
  color: ${Colors.Text2};
  font-size: 14px;
`
