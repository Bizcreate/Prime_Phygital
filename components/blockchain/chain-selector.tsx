"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { CHAIN_CONFIGS, type SupportedChain } from "@/services/blockchain-service"

interface ChainSelectorProps {
  selectedChain: SupportedChain
  onChainChange: (chain: SupportedChain) => void
  className?: string
}

export function ChainSelector({ selectedChain, onChainChange, className }: ChainSelectorProps) {
  const currentConfig = CHAIN_CONFIGS[selectedChain]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <span className="mr-2">{currentConfig.logo}</span>
          {currentConfig.name}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {Object.entries(CHAIN_CONFIGS).map(([chainId, config]) => (
          <DropdownMenuItem
            key={chainId}
            onClick={() => onChainChange(chainId as SupportedChain)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{config.logo}</span>
              <span>{config.name}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {config.nativeCurrency.symbol}
            </Badge>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
