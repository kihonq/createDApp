import { createSignal } from 'solid-js'

import { Abis } from './Abis/Abis'
import { Events } from './Events/Events'
import { NameTags } from './NameTags/NameTags'

export const App = () => {
  const [page, setPage] = createSignal('events')

  if (page() === 'events') {
    return <Events onNavigate={setPage} />
  } else if (page() === 'abis') {
    return <Abis onNavigate={setPage} />
  } else if (page() === 'nameTags') {
    return <NameTags onNavigate={setPage} />
  }

  return null
}
