'use client'

import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (<QueryClientProvider client={queryClient}>
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  </QueryClientProvider>)
}