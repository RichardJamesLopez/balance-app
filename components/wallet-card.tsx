'use client'

import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Balance } from "@/components/scaffold-eth"
import { useEnsName, useTransactionCount } from 'wagmi'

interface WalletCardProps {
  address: string
  balance: React.ReactNode
}

export function WalletCard({ address, balance }: WalletCardProps) {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` })
  const { data: txCount } = useTransactionCount({ address: address as `0x${string}` })

  // Function to truncate wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Function to copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        // You could add a toast notification here
        console.log("Address copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err)
      })
  }

  // Get the first letter for the avatar
  const getAvatarLetter = () => {
    if (ensName) return ensName.charAt(0).toUpperCase()
    // Use first character after "0x" from the address
    return address.slice(2, 3).toUpperCase()
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="text-primary">{getAvatarLetter()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium leading-none">{ensName || truncateAddress(address)}</h3>
            <p className="text-sm text-muted-foreground mt-1">{truncateAddress(address)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-3xl font-bold">{balance}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-3xl font-bold">{txCount?.toString() || '0'}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="text-xs" onClick={copyToClipboard}>
          <Copy className="mr-2 h-3 w-3" />
          Copy Address
        </Button>
      </CardFooter>
    </Card>
  )
}

