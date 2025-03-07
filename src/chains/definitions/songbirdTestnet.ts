import { defineChain } from '../../utils/chain/defineChain.js'

export const songbirdTestnet = /*#__PURE__*/ defineChain({
  id: 16,
  name: 'Coston',
  nativeCurrency: {
    decimals: 18,
    name: 'costonflare',
    symbol: 'CFLR',
  },
  rpcUrls: {
    default: { http: ['https://coston-api.flare.network/ext/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Coston Explorer',
      url: 'https://coston-explorer.flare.network',
    },
  },
  testnet: true,
})
