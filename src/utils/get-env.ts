import { Context } from 'hono'
import { env } from 'hono/adapter'
import { SolanaConfig } from '../solana/lib'
import { normalizeRpcUrls } from './normalize-rpc-urls'

export function getEnv(c: Context): SolanaConfig {
  const vars = env<{
    SIGNER_SECRET_KEY: string
    SOLANA_RPC_URL: string
    SOLANA_RPC_URL_SUBSCRIPTIONS?: string | undefined
  }>(c)
  const { rpcUrl, rpcUrlSubscriptions } = normalizeRpcUrls({
    rpcUrl: vars.SOLANA_RPC_URL,
    rpcUrlSubscriptions: vars.SOLANA_RPC_URL_SUBSCRIPTIONS,
  })

  return {
    signerSecretKey: vars.SIGNER_SECRET_KEY,
    rpcUrl,
    rpcUrlSubscriptions,
  }
}
