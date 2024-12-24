import { describe, expect, it } from 'bun:test'

import { normalizeRpcUrls } from './normalize-rpc-urls'

const DEVNET_RPC = 'https://api.devnet.solana.com'
const DEVNET_RPC_SUBS = 'wss://api.devnet.solana.com'
const LOCAL_RPC = 'http://localhost:8899'
const LOCAL_RPC_SUBS = 'ws://localhost:8900'

describe('normalizeRpcUrls', () => {
  it.each([
    [DEVNET_RPC, DEVNET_RPC_SUBS, DEVNET_RPC_SUBS],
    [DEVNET_RPC, undefined, DEVNET_RPC_SUBS],
    [LOCAL_RPC, LOCAL_RPC_SUBS, LOCAL_RPC_SUBS],
    [LOCAL_RPC, undefined, LOCAL_RPC_SUBS],
    ['http://localhost:9900', '', 'ws://localhost:9900'],
  ])('should normalize rpc urls "%s" / "%s" => %o', (rpcUrl, rpcUrlSubscriptions, expected) => {
    expect(normalizeRpcUrls({ rpcUrl, rpcUrlSubscriptions })).toEqual({ rpcUrl, rpcUrlSubscriptions: expected })
  })

  it('should throw an error if rpcUrl is not provided', () => {
    expect(() => normalizeRpcUrls({ rpcUrl: '' })).toThrow('normalizeRpcUrls: rpcUrl is required')
  })
})
