# @createdapp/example

## 0.4.1

### Patch Changes

- Updated dependencies [3d1ec30]
- Updated dependencies [0029496]
  - @createdapp/core@0.11.0
  - @createdapp/coingecko@0.4.3

## 0.4.0

### Minor Changes

- fd8e924: Remove @web3-react dependency, introduce own way of provider management

### Patch Changes

- c70a76e: Support EIP-1193 providers and legacy web3-react connectors
- be413b4: Fix peer dependency conflict:
  - update @pmmmwh/react-refresh-webpack-plugin
- Updated dependencies [c70a76e]
- Updated dependencies [fd8e924]
  - @createdapp/core@0.10.0
  - @createdapp/coingecko@0.4.2

## 0.3.1

### Patch Changes

- Updated dependencies [26a4314]
- Updated dependencies [3015cbd]
  - @createdapp/core@0.9.0
  - @createdapp/coingecko@0.4.1

## 0.3.0

### Minor Changes

- ece010c: Support Node LTS v14 and v16, abandon v10 and v12

### Patch Changes

- Updated dependencies [33ade3b]
- Updated dependencies [1c257ce]
- Updated dependencies [ece010c]
- Updated dependencies [e5f0951]
  - @createdapp/core@0.8.0
  - @createdapp/coingecko@0.4.0

## 0.2.11

### Patch Changes

- 2f37156: 🛷 Add useTokenList
- Updated dependencies [45a6dc2]
- Updated dependencies [2f37156]
- Updated dependencies [2f37156]
  - @createdapp/core@0.7.0
  - @createdapp/coingecko@0.3.26

## 0.2.10

### Patch Changes

- 0365a73: 🛷 Add useTokenList
- Updated dependencies [0365a73]
  - @createdapp/core@0.6.2

## 0.2.9

### Patch Changes

- Updated dependencies [5365c19]
  - @createdapp/core@0.6.0
  - @createdapp/coingecko@0.3.25

## 0.2.8

### Patch Changes

- Updated dependencies [f5a5c47]
  - @createdapp/core@0.5.0
  - @createdapp/coingecko@0.3.24

## 0.2.7

### Patch Changes

- 9e4e4f5: Add useLookupAddress hook for ENS
- 88c5983: Refactor coingecko
- Updated dependencies [b9304cb]
- Updated dependencies [9ab6e2f]
- Updated dependencies [9e4e4f5]
- Updated dependencies [0011fe5]
- Updated dependencies [88c5983]
  - @createdapp/core@0.4.0
  - @createdapp/coingecko@0.3.22

## 0.2.6

### Patch Changes

- a98363d: Change transaction history to modal
- a087bdf: Add wallet activation error handling
- d01e07f: Change notifications to popups
- 3536be0: Add useSendTransaction to example
- Updated dependencies [b369774]
- Updated dependencies [a087bdf]
- Updated dependencies [2757d13]
  - @createdapp/core@0.3.20

## 0.2.5

### Patch Changes

- 9d4fcca: Add getStoredTransactionState and update example
- Updated dependencies [9d4fcca]
- Updated dependencies [75b6ea8]
  - @createdapp/core@0.3.19

## 0.2.4

### Patch Changes

- 8b28eae: Refactor send transaction example
- 111acee: Set TransactionStatus as interface and move it to model
- Updated dependencies [42efd99]
- Updated dependencies [21f59f6]
- Updated dependencies [111acee]
  - @createdapp/core@0.3.18

## 0.2.3

### Patch Changes

- 8018cd5: Remove git version from webpack config
- Updated dependencies [f8fe874]
  - @createdapp/core@0.3.16

## 0.2.2

### Patch Changes

- 52bf73d: 💰 Add wallet connected notification
- Updated dependencies [52bf73d]
  - @createdapp/core@0.3.12

## 0.2.1

### Patch Changes

- 99ffafd: Update yarn.lock and add missing dependencies
- Updated dependencies [99ffafd]
  - @createdapp/core@0.3.2

## 0.2.0

### Minor Changes

- 7a74be4: New features:
  ✈️ Add hook for sending transactions to blockchain
  📬 Add useNotifications and useTransactions hooks
  🥧 Add shortenTransactionHash helper

  Docs:
  🎤 Create transactions and notifications example
  📄 Add activate method in getting-started guide
  🚤 Update config example

  Breaking changes:
  🧷 Reorder token hooks arguments

  Fixes:
  💪 Move ethereum-waffle to devDependencies

### Patch Changes

- Updated dependencies [67b2dda]
- Updated dependencies [7a74be4]
  - @createdapp/core@0.3.0

## 0.1.1

### Patch Changes

- 8b8fb81: 🧹 General clean-up

  - Introduce EthersProvider and activateBrowserWallet
  - Introduce Config, ConfigProvider and useConfig
  - Fix Goerli name
  - Add missing MULTICALL_ADDRESSES
  - Update docs structure and README

- 9506ad8: Add ability to specify a background chain that will be used before wallet is connected.
- Updated dependencies [8b8fb81]
- Updated dependencies [9506ad8]
  - @createdapp/core@0.1.4
