import { Text } from '../../shared'

import { Link } from './components'

export const InitializedPreview = () => {
  return (
    <>
      <Text>createDApp was detected on the page and the DevTools extension was initialized.</Text>
      <Link block href="https://createdapp.readthedocs.io/en/latest/">
        Read the official documentation
      </Link>
      <Link block href="https://github.com/kihonq/createDApp/issues">
        Browse issues on Github
      </Link>
    </>
  )
}
