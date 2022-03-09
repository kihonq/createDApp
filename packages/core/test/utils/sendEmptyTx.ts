import { Wallet } from '@ethersproject/wallet'
import { AddressZero } from '@ethersproject/constants'

export const sendEmptyTx = (wallet: Wallet) => wallet.signTransaction({ to: AddressZero })
