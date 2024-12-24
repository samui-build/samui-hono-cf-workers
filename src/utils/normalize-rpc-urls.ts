export function normalizeRpcUrls({ rpcUrl, rpcUrlSubscriptions }: { rpcUrl: string; rpcUrlSubscriptions?: string }) {
  if (!rpcUrl.length) {
    throw new Error('normalizeRpcUrls: rpcUrl is required')
  }
  // Return if both rpcUrl and rpcUrlSubscriptions are provided
  if (rpcUrlSubscriptions?.length) {
    return { rpcUrl, rpcUrlSubscriptions }
  }
  // Use the default rpcUrlSubscriptions if rpcUrl is provided for localhost
  if (rpcUrl === 'http://localhost:8899') {
    return { rpcUrl, rpcUrlSubscriptions: rpcUrl.replace('http', 'ws').replace('8899', '8900') }
  }
  // In all other cases, replace the protocol
  return { rpcUrl, rpcUrlSubscriptions: rpcUrl.replace('http', 'ws') }
}
