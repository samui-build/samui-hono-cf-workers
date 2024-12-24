export function normalizeRpcUrls({ rpcUrl, rpcUrlSubscriptions }: { rpcUrl: string; rpcUrlSubscriptions?: string }) {
  // Throw an error if rpcUrl is not provided
  if (!rpcUrl.length) {
    throw new Error('normalizeRpcUrls: rpcUrl is required')
  }

  // Return if both rpcUrl and rpcUrlSubscriptions are provided
  if (rpcUrlSubscriptions?.length) {
    return { rpcUrl, rpcUrlSubscriptions }
  }

  // Return the rpcUrl and rpcUrlSubscriptions, replacing the protocol and port
  return { rpcUrl, rpcUrlSubscriptions: rpcUrl.replace('http', 'ws').replace(':8899', ':8900') }
}
