# createDapp

### Ethereum 🤝 SolidJS 
Framework for rapid Dapp development.  
Simple. Robust. Extendable. Testable.

## About
Introduces great features:
- 🏗️ **SolidJS hooks** - Uses SolidJS hooks as your primary building ingredient
- 🚅 **Auto refresh** - Refreshes on a new block, wallet change or network change
- 🛒 **Multicall** - Combines multiple blockchain calls into a single multicall

Combines the best practices:
- 🔧 **Modern stack** - Employs [ethers.js](https://github.com/ethers-io/), [multicall](https://github.com/makerdao/multicall) & [waffle](https://getwaffle.io/)
- 📚 **Extendability** - Extends easily with custom hooks
- 💡 **Testability** - Simple integration tests for UI and blockchain


## Example

```tsx
import { Mainnet } from '@createdapp/core/modal/chain/ethereum'
import { useEthers, useEtherBalance } from '@createdapp/core'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {stakingBalance && <p>ETH2 staking balance: {formatEther(stakingBalance)} ETH </p>}
      {account && <p>Account: {account}</p>}
      {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
    </div>
  )
}
```

See application [here](https://example.createdapp.io/balance).


## Documentation
For detailed feature walkthrough checkout [documentation](https://createdapp.readthedocs.io/en/latest/).

## Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](https://github.com/kihonq/createDapp/blob/master/CODE_OF_CONDUCT.md) and [contribution policy](https://github.com/kihonq/createDapp/blob/master/CONTRIBUTION.md).

### Before you issue pull request:

* Make sure all tests pass.
* Make sure linter passes.
* Make sure you have test coverage for any new features.

To install dependencies type:
```sh
yarn
```

To build project:
```sh
yarn build
```

To run tests type:
```sh
yarn test
```

To run linter type:
```sh
yarn lint
```

### Building documentation

[Install Sphinx](https://www.sphinx-doc.org/en/master/usage/installation.html) to build documentation:

```sh
cd docs
make html
```

Before building documentation for the first time you may have to install required python packages:
```sh
pip3 install -r docs/requirements.txt
```

## License

createDapp is released under the [MIT License](https://opensource.org/licenses/MIT).
