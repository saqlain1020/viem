---
head:
  - - meta
    - property: og:title
      content: Migration Guide
  - - meta
    - name: description
      content: Guide to migrate to newer versions of viem.
  - - meta
    - property: og:description
      content: Guide to migrate to newer versions of viem.
---

# Migration Guide

If you are coming from an earlier version of `viem`, you will need to make sure to update the following APIs listed below.

## 2.x.x Breaking changes

The 2.x.x release includes very minor breaking changes to the Contract Instances API, entrypoints, chain modules, and miscellaneous actions + utilities listed below.

Not ready to migrate? [Head to the 1.x.x docs.](https://v1.viem.sh)

### Actions: Modified `getContract` Client API

The `publicClient` and `walletClient` parameters of the `getContract` API has been removed in favour of `client` to support Client's that [extend](/docs/clients/wallet.html#optional-extend-with-public-actions) (ie. [a Wallet Client extended with Public Actions](/docs/clients/wallet.html#optional-extend-with-public-actions)).

[Read more.](/docs/contract/getContract)

```tsx
import { getContract } from 'viem'
import { publicClient, walletClient } from './client'

const contract = getContract({
  abi,
  address,
  publicClient, // [!code --]
  walletClient, // [!code --]
  client: { // [!code ++]
    public: publicClient, // [!code ++]
    wallet: walletClient, // [!code ++]
  } // [!code ++]
})
```

### Removed entrypoints

The following entrypoints have been removed:

- `viem/abi`
- `viem/contract`
- `viem/public`
- `viem/test`
- `viem/wallet`

You can import the entrypoints directly from `viem`:

```ts
import { encodeAbiParameters } from 'viem/abi' // [!code --]
import { getContract } from 'viem/contract' // [!code --]
import { getBlock } from 'viem/public' // [!code --]
import { mine } from 'viem/test' // [!code --]
import { sendTransaction } from 'viem/wallet' // [!code --]
import { // [!code ++]
  encodeAbiParameters, // [!code ++] 
  getContract, // [!code ++]
  getBlock, // [!code ++]
  mine, // [!code ++]
  sendTransaction, // [!code ++]
} from 'viem' // [!code ++]
```

### Moved chain-specific exports in `viem/chains/utils`

Chain-specific exports in `viem/chains/utils` have been moved to `viem/{celo|op-stack|zksync}`:

```ts
import {
  parseTransactionCelo,
  parseTransaction // [!code ++]
  serializeTransactionCelo, // [!code --]
  serializeTransaction // [!code ++]
  // ...
} from 'viem/chains/utils' // [!code --]
} from 'viem/celo' // [!code ++]

import {
  // ...
} from 'viem/chains/utils'  // [!code --]
} from 'viem/op-stack' // [!code ++]

import {
  parseTransactionZkSync, // [!code --]
  parseTransaction, // [!code ++]
  serializeTransactionZkSync, // [!code --]
  serializeTransaction, // [!code ++]
  // ...
} from 'viem/chains/utils'  // [!code --]
} from 'viem/zksync' // [!code ++]
```

### Actions: `getBlockNumber`

The `maxAge` parameter has been removed in favor of `cacheTime`.

```ts
const blockNumber = await client.getBlockNumber({
  maxAge: 84_600 // [!code --]
  cacheTime: 84_600 // [!code ++]
})
```

### Actions: `OnLogFn` & `OnLogParameter` types

The `OnLogFn` & `OnLogParameter` types have been renamed.

```ts
import {
  OnLogFn, // [!code --]
  WatchEventOnLogsFn, // [!code ++]
  OnLogParameter, // [!code --]
  WatchEventOnLogsParameter, // [!code ++]
} from 'viem' 
```

### Actions: `prepareRequest`

The `prepareRequest` Action has been renamed to `prepareTransactionRequest` and moved to `viem/actions` entrypoint.

```ts
import {
  prepareRequest, // [!code --]
  prepareTransactionRequest, // [!code ++]
} from 'viem' // [!code --]
} from 'viem/actions' // [!code ++]
```

### Actions: `SimulateContractParameters` & `SimulateContractReturnType` types

Note the following breaking generic slot changes:

```ts
type SimulateContractParameters<
  TAbi,
  TFunctionName,
  TArgs, // Args added to Slot 2 // [!code ++]
  TChain,
  TChainOverride,
  TAccountOverride,
>

type SimulateContractReturnType<
  TAbi,
  TFunctionName,
  TArgs, // Args added to Slot 2 // [!code ++]
  TChain,
  TAccount, // Account added to Slot 4 // [!code ++]
  TChainOverride,
  TAccountOverride,
>
```

### Utilities: Removed `extractFunctionParts`, `extractFunctionName`, `extractFunctionParams`, `extractFunctionType`

The `extractFunctionParts`, `extractFunctionName`, `extractFunctionParams`, `extractFunctionType` utility functions have been removed. You can use the [`parseAbiItem` utility function from abitype](https://abitype.dev/api/human#parseabiitem-1) instead.

### Utilities: Renamed `bytesToBigint`

The `bytesToBigint` utility function has been renamed to `bytesToBigInt`.

```ts
import {
  bytesToBigint, // [!code --]
  bytesToBigInt, // [!code ++]
} from 'viem'
```

### Utilities: Renamed chain types

The following chain types have been renamed:

```ts
import {
  Formatter, // [!code --]
  ChainFormatter, // [!code ++]
  Formatters, // [!code --]
  ChainFormatters, // [!code ++]
  Serializers, // [!code --]
  ChainSerializers, // [!code ++]
  ExtractFormatterExclude, // [!code --]
  ExtractChainFormatterExclude, // [!code ++]
  ExtractFormatterParameters, // [!code --]
  ExtractChainFormatterParameters, // [!code ++]
  ExtractFormatterReturnType, // [!code --]
  ExtractChainFormatterReturnType, // [!code ++]
} from 'viem'
```

## 1.x.x Breaking changes

The 1.x.x release only includes very minor changes to the behavior in event log decoding, and removes the redundant ethers.js Wallet Adapter. If you do not directly use these APIs, you do not need to update any of your code for this version.

### Removed `ethersWalletToAccount`

The `ethersWalletToAccount` adapter has been removed.

This adapter was introduced when viem did not have Private Key & HD Accounts. Since 0.2, viem provides all the utilities needed to create and import [Private Key](https://viem.sh/docs/accounts/privateKey.html) & [HD Accounts](https://viem.sh/docs/accounts/mnemonic.html).

If you still need it, you can copy + paste the [old implementation](https://github.com/wevm/viem/blob/a9a71507032db896295fa1f3fa2dd6c2bdc85137/src/adapters/ethers.ts).

### `logIndex` & `transactionIndex` on Logs

`logIndex` & `transactionIndex` on `Log` now return a `number` instead of a `bigint`.

```ts
const log: Log = {
  ...
  logIndex: 1n, // [!code --]
  logIndex: 1, // [!code ++]
  transactionIndex: 1n, // [!code --]
  transactionIndex: 1, // [!code ++]
  ...
}
```

### Minor: `decodeEventLog` behavior change

`decodeEventLog` no longer attempts to partially decode events. If the Log does not conform to the ABI (mismatch between the number of indexed/non-indexed arguments to topics/data), it will throw an error. 

For example, the following Log will throw an error as there is a mismatch in non-`indexed` arguments & `data` length.

```ts {2-4}
decodeEventLog({
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']),
  // `data` should be 64 bytes, but is only 32 bytes.
  data: '0x0000000000000000000000000000000000000000000000000000000000000001'
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  ]
})
```

Previously, the above would only decode the `indexed` arguments. 

If you would like to partially decode event logs (previous behavior), you can turn off `strict` mode:

```ts 
decodeEventLog({
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']),
  data: '0x0000000000000000000000000000000000000000000000000000000000000001'
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  ],
  strict: false // [!code ++]
})
```

## 0.3.x Breaking changes

The 0.3.x release only includes breaking changes around RPC errors. If you do not directly use the APIs listed below, you do not need to update any of your code for this version.

### Renamed `RequestError` to `RpcError`

`RequestError` was renamed `RpcError` for clarity.

```ts
import { RequestError } from 'viem'  // [!code --]
import { RpcError } from 'viem'  // [!code ++]

throw new RequestError(new Error('An error occurred.'))  // [!code --]
throw new RpcError(new Error('An error occurred.'))  // [!code ++]
```

### Removed `RpcRequestError`

`RpcRequestError` was removed. Use `RpcError` instead.

```ts
import { RpcRequestError } from 'viem' // [!code --]
import { RpcError } from 'viem'  // [!code ++]

throw new RpcRequestError(new Error('An error occurred.')) // [!code --]
throw new RpcError(new Error('An error occurred.')) // [!code ++]
```

### Renamed `RpcError` to `RpcRequestError`

`RpcError` was renamed `RpcRequestError` for consistency.

```ts
import { RpcError } from 'viem' // [!code --]
import { RpcRequestError } from 'viem'  // [!code ++]

const err = new RpcError({ // [!code --]
const err = new RpcRequestError({  // [!code ++]
  body: { foo: 'bar' },
  error: { code: 420, message: 'Error' },
  url: 'https://example-rpc.com',
})
```

## 0.2.x Breaking changes

### `chain` is required for `sendTransaction`, `writeContract`, `deployContract`

A chain is now required for the `sendTransaction`, `writeContract`, `deployContract` Actions.

You can hoist the Chain on the Client:

```ts
import { createWalletClient, custom, getAccount } from 'viem'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet, // [!code ++]
  transport: custom(window.ethereum)
})
 
const account = getAccount('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
 
const hash = await walletClient.sendTransaction({ 
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

Alternatively, you can pass the Chain directly to the Action:

```ts
import { createWalletClient, custom, getAccount } from 'viem'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet, // [!code --]
  transport: custom(window.ethereum)
})
 
const account = getAccount('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
 
const hash = await walletClient.sendTransaction({ 
  account,
  chain: mainnet, // [!code ++]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### `recoverAddress`, `recoverMessageAddress`, `verifyMessage` are now async

he following functions are now `async` functions instead of synchronous functions:

- `recoverAddress`
- `recoverMessageAddress`
- `verifyMessage`

```ts
import { recoverMessageAddress } from 'viem'

recoverMessageAddress({ message: 'hello world', signature: '0x...' }) // [!code --]
await recoverMessageAddress({ message: 'hello world', signature: '0x...' }) // [!code ++]
```

### `assertChain` removed from `sendTransaction`

Removed `assertChain` argument on `sendTransaction`, `writeContract` & `deployContract`. If you wish to bypass the chain check (not recommended unless for testing purposes), you can pass `chain: null`.

```ts
await walletClient.sendTransaction({
  assertChain: false, // [!code --]
  chain: null, // [!code ++]
  ...
})
```

### `getAccount` removed

Removed the `getAccount` function.

#### For JSON-RPC Accounts, use the address itself.

You can now pass the address directly to the `account` option.

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const address = '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'

const client = createWalletClient({
  account: getAccount(address), // [!code --]
  account: address, // [!code ++]
  chain: mainnet,
  transport: custom(window.ethereum)
})
```

#### For Ethers Wallet Adapter, use `ethersWalletToAccount`.

If you were using the Ethers Wallet adapter, you can use the `ethersWalletToAccount` function.

> Note: viem 0.2.0 now has a [Private Key](/docs/accounts/privateKey.html) & [Mnemonic Account](/docs/accounts/mnemonic.html) implementation. You probably do not need this adapter anymore. This adapter may be removed in a future version.

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { getAccount } from 'viem/ethers' // [!code --]
import { ethersWalletToAccount } from 'viem/ethers' // [!code ++]
import { Wallet } from 'ethers'

const account = getAccount(new Wallet('0x...')) // [!code --]
const account = ethersWalletToAccount(new Wallet('0x...')) // [!code ++]

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
})
```

#### For Local Accounts, use `toAccount`.

If you are using a custom signing implementation, you can use the `toAccount` function.

```ts
import { createWalletClient, http, getAccount } from 'viem' // [!code --]
import { createWalletClient, http } from 'viem' // [!code ++]
import { toAccount } from 'viem/accounts' // [!code ++]
import { mainnet } from 'viem/chains'
import { getAddress, signMessage, signTransaction } from './sign-utils' 

const privateKey = '0x...' 
const account = getAccount({ // [!code --]
const account = toAccount({ // [!code ++]
  address: getAddress(privateKey),
  signMessage(message) {
    return signMessage(message, privateKey)
  },
  signTransaction(transaction) {
    return signTransaction(transaction, privateKey)
  },
  signTypedData(typedData) {
    return signTypedData(typedData, privateKey)
  }
})

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
})
```

### `data` renamed in `signMessage`

Renamed the `data` parameter in `signMessage` to `message`.

```ts
walletClient.signMessage({
  data: 'hello world', // [!code --]
  message: 'hello world', // [!code ++]
})
```
