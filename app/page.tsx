"use client"

import type React from "react"

import { useState } from "react"
import { WalletCard } from "@/components/wallet-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Balance } from "@/components/scaffold-eth"
import { cn } from "@/lib/utils"



export default function Home() {
  const [walletAddress, setWalletAddress] = useState("")
  const [displayAddress, setDisplayAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (walletAddress) {
      setDisplayAddress(walletAddress)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Wallet App</h1>
          <ThemeToggle />
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter wallet address (0x...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <Button 
                type="submit" 
                className={cn(
                  "w-full relative overflow-hidden transition-all hover:scale-105",
                  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                  "animate-gradient-slow bg-[length:200%_200%]",
                  "text-white font-medium hover:shadow-lg hover:shadow-purple-500/25",
                  "border-0"
                )}
              >
                Load Wallet
              </Button>
            </form>
          </CardContent>
        </Card>

        <WalletCard 
          address={displayAddress} 
          balance={<Balance address={displayAddress as `0x${string}`} />}
        />
      </div>
    </main>
  )
}
