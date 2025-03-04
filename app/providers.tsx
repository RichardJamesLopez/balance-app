'use client'

import { ThemeProvider } from "next-themes"
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DuneProvider } from "@duneanalytics/hooks"

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {process.env.NEXT_PUBLIC_DUNE_API_KEY ? (
          <DuneProvider duneApiKey={process.env.NEXT_PUBLIC_DUNE_API_KEY}>
            <WagmiProvider config={config}>
              {children}
            </WagmiProvider>
          </DuneProvider>
        ) : (
          <div>Missing Dune API Key</div>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}