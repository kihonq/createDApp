import type { JSXElement } from 'solid-js'
import { styled } from 'solid-styled-components'

interface PropertyProps {
  name: string
  children?: JSXElement
}

export function Property({ name, children }: PropertyProps) {
  return (
    <tr>
      <PropertyComponent>{name}</PropertyComponent>
      <td>{children}</td>
    </tr>
  )
}

const PropertyComponent = styled.td`
  text-align: right;
  font-size: 14px;
  padding-right: 8px;
  padding-top: 2px;
  vertical-align: baseline;
  font-style: italic;
`
