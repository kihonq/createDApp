import type { JSXElement } from 'solid-js'

import { EventProvider } from './events/EventProvider'
import { AbiProvider } from './abi/AbiProvider'
import { GlobalStyle } from './GlobalStyle'
import { NameTagsProvider } from './nameTags/NameTagsProvider'

interface Props {
  children: JSXElement
}

export const Providers = ({ children }: Props) => {
  return (
    <NameTagsProvider>
      <EventProvider>
        <AbiProvider>
          <GlobalStyle />
          {children}
        </AbiProvider>
      </EventProvider>
    </NameTagsProvider>
  )
}
