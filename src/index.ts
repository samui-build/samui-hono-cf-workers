import { getBalanceFormatted, getSolanaContext, getVersion } from '@samui/solana'
import { Hono } from 'hono'
import { getEnv } from './utils/get-env'

const app = new Hono()

app.get('/', (c) => {
  return c.text('samui-hono-cf-workers')
})

app.get('/env', async (c) => {
  const { signer, explorerUrl, cluster } = await getSolanaContext(getEnv(c))

  return c.json({
    cluster,
    signer: signer.address,
    signerExplorerUrl: explorerUrl(signer.address),
  })
})

app.get('/explorer/:path?', async (c) => {
  const { explorerUrl, signer } = await getSolanaContext(getEnv(c))

  const path = c.req.param('path') ?? signer.address

  return c.text(`${explorerUrl(path)}\n`)
})

app.get('/solana/balance/:address?', async (c) => {
  const { client, cluster, signer } = await getSolanaContext(getEnv(c))

  const address = c.req.param('address') ?? signer.address
  const balance = await getBalanceFormatted({ address, client })

  return c.json({ address, balance, cluster })
})

app.get('/solana/genesis-hash', async (c) => {
  const { cluster, genesisHash } = await getSolanaContext(getEnv(c))

  return c.json({ genesisHash, cluster })
})

app.get('/solana/version', async (c) => {
  const { cluster, client } = await getSolanaContext(getEnv(c))

  const version = await getVersion({ client })

  return c.json({ cluster, version: version['solana-core'], features: version['feature-set'] })
})

export default app
