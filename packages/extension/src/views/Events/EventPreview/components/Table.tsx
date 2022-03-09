import type { JSXElement } from 'solid-js'
import { styled } from 'solid-styled-components'

interface TableProps {
  className?: string
  children: JSXElement
}

export function Table({ className, children }: TableProps) {
  return (
    <TableComponent className={className}>
      <tbody>{children}</tbody>
    </TableComponent>
  )
}

const TableComponent = styled.table`
  display: block;
  border-collapse: collapse;
`
