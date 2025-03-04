'use client'

import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
//import { Balance } from "@/components/scaffold-eth"
import { useEnsName, useTransactionCount } from 'wagmi'
import { useTransactions } from "@duneanalytics/hooks"
import { useState } from "react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface WalletCardProps {
  address: string
  balance: React.ReactNode
}

export function WalletCard({ address, balance }: WalletCardProps) {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` })
  const { data: txCount } = useTransactionCount({ address: address as `0x${string}` })
  const [pageSize] = useState(10) // Number of transactions per page
  
  // Add pagination hooks
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  const currentPage = Number(searchParams.get('page')) || 1
  const totalPages = txCount ? Math.ceil(Number(txCount) / pageSize) : 0

  // Create URL for pagination
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Navigation handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      replace(createPageURL(page))
    }
  }

  const {
    data: transactionData,
    isLoading,
    error,
    nextPage,
    previousPage,
    currentPage: useTransactionsCurrentPage,
    setPage // Add this if available from useTransactions
  } = useTransactions(address, { pageSize })

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
    <div className="space-y-4">
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

      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-medium">Recent Transactions</h3>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading transactions...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error loading transactions</p>
          ) : transactionData?.transactions?.length ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {transactionData.transactions.map((tx: any) => (
                  <li key={tx.hash} className="text-sm p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        <b>Chain:</b> {tx.chain}
                      </span>
                      <span className="text-muted-foreground">
                        <b>Time:</b>{tx.block_time ? new Date(tx.block_time).toLocaleString() : 'Unknown time'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(1)} 
                    disabled={currentPage === 1}
                  >
                    First
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 min-w-[32px] hover:bg-accent"
                    onClick={() => goToPage(currentPage)}
                  >
                    {currentPage}
                  </Button>
                  <span className="text-muted-foreground">/</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 min-w-[32px] hover:bg-accent"
                    onClick={() => goToPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(currentPage + 1)} 
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(totalPages)} 
                    disabled={currentPage >= totalPages}
                  >
                    Last
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No transactions found</p>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground pt-4 opacity-75 hover:opacity-100 transition-opacity">
        Made with <span className="text-red-500">❤️</span> by RCL
      </div>
    </div>
  )
}
