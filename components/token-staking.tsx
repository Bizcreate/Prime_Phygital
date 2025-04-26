"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  CoinsIcon,
  Clock,
  PiggyBank,
  TrendingUp,
  CircleDollarSign,
  HistoryIcon,
  LockIcon,
  UnlockIcon,
  Award,
  AlertCircle,
  InfoIcon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

// Staking tiers with their respective APY rates and minimum staking amounts
const STAKING_TIERS = [
  { name: "Bronze", minAmount: 100, apy: 5, lockPeriod: 30, color: "from-amber-700 to-amber-500" },
  { name: "Silver", minAmount: 500, apy: 8, lockPeriod: 60, color: "from-slate-400 to-slate-300" },
  { name: "Gold", minAmount: 1000, apy: 12, lockPeriod: 90, color: "from-yellow-500 to-yellow-300" },
  { name: "Platinum", minAmount: 5000, apy: 15, lockPeriod: 180, color: "from-cyan-500 to-blue-400" },
  { name: "Diamond", minAmount: 10000, apy: 20, lockPeriod: 365, color: "from-purple-600 to-blue-500" },
]

// Mock transaction history
const INITIAL_HISTORY = [
  {
    id: "tx1",
    type: "stake",
    amount: 500,
    tier: "Silver",
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    lockPeriod: 60,
    releaseDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    rewards: 0,
    status: "active",
  },
  {
    id: "tx2",
    type: "reward",
    amount: 10,
    tier: "Silver",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    status: "completed",
  },
  {
    id: "tx3",
    type: "unstake",
    amount: 200,
    tier: "Bronze",
    timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    status: "completed",
  },
]

interface TokenStakingProps {
  userTokenBalance?: number
  tokenSymbol?: string
  tokenName?: string
  tokenLogo?: string
}

export function TokenStaking({
  userTokenBalance = 12500,
  tokenSymbol = "PRIME",
  tokenName = "Prime Token",
  tokenLogo = "/prime-token-logo.png",
}: TokenStakingProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [stakingAmount, setStakingAmount] = useState(0)
  const [selectedTier, setSelectedTier] = useState(STAKING_TIERS[0])
  const [autoCompound, setAutoCompound] = useState(true)
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [totalStaked, setTotalStaked] = useState(500) // Initial staked amount
  const [earnedRewards, setEarnedRewards] = useState(10) // Initial rewards
  const [estimatedRewards, setEstimatedRewards] = useState(0)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [stakingLockTime, setStakingLockTime] = useState(selectedTier.lockPeriod)

  // Calculate estimated rewards based on staking amount, APY, and lock period
  useEffect(() => {
    if (stakingAmount > 0) {
      // Simple calculation: principal * (APY/100) * (lockPeriod/365)
      const annualReward = stakingAmount * (selectedTier.apy / 100)
      const periodReward = annualReward * (stakingLockTime / 365)
      setEstimatedRewards(periodReward)
    } else {
      setEstimatedRewards(0)
    }
  }, [stakingAmount, selectedTier.apy, stakingLockTime])

  // Update selected tier based on staking amount
  useEffect(() => {
    // Find the highest tier that the staking amount qualifies for
    const qualifiedTier = [...STAKING_TIERS].reverse().find((tier) => stakingAmount >= tier.minAmount)

    if (qualifiedTier) {
      setSelectedTier(qualifiedTier)
      setStakingLockTime(qualifiedTier.lockPeriod)
    } else if (stakingAmount > 0) {
      // If amount is positive but doesn't qualify for any tier, set to lowest tier
      setSelectedTier(STAKING_TIERS[0])
      setStakingLockTime(STAKING_TIERS[0].lockPeriod)
    }
  }, [stakingAmount])

  // Handle staking submission
  const handleStake = () => {
    if (stakingAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a staking amount greater than zero.",
        variant: "destructive",
      })
      return
    }

    if (stakingAmount > userTokenBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${tokenSymbol} tokens for this staking amount.`,
        variant: "destructive",
      })
      return
    }

    // Create a new staking transaction
    const newStake = {
      id: `tx${Date.now()}`,
      type: "stake",
      amount: stakingAmount,
      tier: selectedTier.name,
      timestamp: new Date().toISOString(),
      lockPeriod: stakingLockTime,
      releaseDate: new Date(Date.now() + stakingLockTime * 24 * 60 * 60 * 1000).toISOString(),
      rewards: 0,
      status: "active",
    }

    // Update state
    setHistory([newStake, ...history])
    setTotalStaked(totalStaked + stakingAmount)
    setStakingAmount(0)
    setIsConfirmDialogOpen(false)

    toast({
      title: "Tokens Staked Successfully",
      description: `You have staked ${stakingAmount} ${tokenSymbol} tokens in the ${selectedTier.name} tier.`,
    })
  }

  // Handle unstaking
  const handleUnstake = (transactionId: string) => {
    const stakeTransaction = history.find((tx) => tx.id === transactionId && tx.type === "stake")

    if (!stakeTransaction) {
      toast({
        title: "Transaction Not Found",
        description: "The selected staking transaction could not be found.",
        variant: "destructive",
      })
      return
    }

    // Check if lock period has ended
    const releaseDate = new Date(stakeTransaction.releaseDate)
    const now = new Date()
    const isLocked = now < releaseDate

    if (isLocked) {
      toast({
        title: "Tokens Locked",
        description: `These tokens are locked until ${releaseDate.toLocaleDateString()}. Early unstaking may incur penalties.`,
        variant: "destructive",
      })
      return
    }

    // Calculate rewards earned during the staking period
    const stakingStartDate = new Date(stakeTransaction.timestamp)
    const daysPassed = Math.floor((now.getTime() - stakingStartDate.getTime()) / (1000 * 60 * 60 * 24))
    const tier = STAKING_TIERS.find((t) => t.name === stakeTransaction.tier) || STAKING_TIERS[0]
    const rewards = stakeTransaction.amount * (tier.apy / 100) * (daysPassed / 365)

    // Create unstake transaction
    const unstakeTransaction = {
      id: `tx${Date.now()}-unstake`,
      type: "unstake",
      amount: stakeTransaction.amount,
      tier: stakeTransaction.tier,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    // Create reward transaction
    const rewardTransaction = {
      id: `tx${Date.now()}-reward`,
      type: "reward",
      amount: rewards,
      tier: stakeTransaction.tier,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    // Update state
    setHistory([unstakeTransaction, rewardTransaction, ...history])
    setTotalStaked(totalStaked - stakeTransaction.amount)
    setEarnedRewards(earnedRewards + rewards)

    // Mark original stake as completed
    setHistory(history.map((tx) => (tx.id === transactionId ? { ...tx, status: "completed" } : tx)))

    toast({
      title: "Tokens Unstaked Successfully",
      description: `You have unstaked ${stakeTransaction.amount} ${tokenSymbol} tokens and earned ${rewards.toFixed(2)} ${tokenSymbol} in rewards.`,
    })
  }

  // Claim rewards
  const handleClaimRewards = () => {
    if (earnedRewards <= 0) {
      toast({
        title: "No Rewards Available",
        description: "You don't have any rewards to claim.",
        variant: "destructive",
      })
      return
    }

    // Create reward claim transaction
    const claimTransaction = {
      id: `tx${Date.now()}-claim`,
      type: "claim",
      amount: earnedRewards,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    // Update state
    setHistory([claimTransaction, ...history])
    toast({
      title: "Rewards Claimed",
      description: `You have claimed ${earnedRewards.toFixed(2)} ${tokenSymbol} rewards.`,
    })

    // Reset rewards
    setEarnedRewards(0)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get transaction icon
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "stake":
        return <LockIcon className="h-5 w-5 text-green-500" />
      case "unstake":
        return <UnlockIcon className="h-5 w-5 text-amber-500" />
      case "reward":
      case "claim":
        return <Award className="h-5 w-5 text-purple-500" />
      default:
        return <CircleDollarSign className="h-5 w-5" />
    }
  }

  // Get active stakes
  const activeStakes = history.filter((tx) => tx.type === "stake" && tx.status === "active")

  // Get tier info based on amount
  const getTierInfo = (amount: number) => {
    return [...STAKING_TIERS].reverse().find((tier) => amount >= tier.minAmount) || STAKING_TIERS[0]
  }

  // Calculate APY based on amount and lock period
  const calculateAPY = (amount: number, lockDays: number) => {
    const baseTier = getTierInfo(amount)
    // Bonus APY for longer lock periods (up to 5% additional)
    const lockBonus = Math.min(5, (lockDays / 365) * 10)
    return baseTier.apy + (autoCompound ? lockBonus : 0)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Token Staking</CardTitle>
              <CardDescription>Stake your tokens to earn passive rewards</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white/10">
                <img src={tokenLogo || "/placeholder.svg"} alt={tokenName} className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-bold">{tokenSymbol}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Available Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{userTokenBalance.toLocaleString()}</span>
                      <span className="text-white/70">{tokenSymbol}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">{tokenName}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Staked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{totalStaked.toLocaleString()}</span>
                      <span className="text-white/70">{tokenSymbol}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      {activeStakes.length} active staking position{activeStakes.length !== 1 ? "s" : ""}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Earned Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{earnedRewards.toFixed(2)}</span>
                      <span className="text-white/70">{tokenSymbol}</span>
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 w-full"
                      disabled={earnedRewards <= 0}
                      onClick={handleClaimRewards}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Claim Rewards
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {activeStakes.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">Active Staking Positions</h3>
                  <div className="space-y-4">
                    {activeStakes.map((stake) => {
                      const tier = getTierInfo(stake.amount)
                      const releaseDate = new Date(stake.releaseDate)
                      const now = new Date()
                      const timeLeft = Math.max(
                        0,
                        Math.floor((releaseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
                      )
                      const progress = Math.min(100, Math.max(0, 100 - (timeLeft / stake.lockPeriod) * 100))

                      return (
                        <Card key={stake.id} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <h4 className="font-medium flex items-center gap-2">
                                  <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${tier.color}`}></div>
                                  {tier.name} Tier Staking
                                </h4>
                                <p className="text-sm text-white/70">Staked on {formatDate(stake.timestamp)}</p>
                              </div>
                              <div className="flex items-center">
                                <div className="text-right mr-4">
                                  <p className="font-bold">
                                    {stake.amount.toLocaleString()} {tokenSymbol}
                                  </p>
                                  <p className="text-xs text-white/70">{tier.apy}% APY</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-white/10"
                                  disabled={timeLeft > 0}
                                  onClick={() => handleUnstake(stake.id)}
                                >
                                  {timeLeft > 0 ? <LockIcon className="h-4 w-4" /> : <UnlockIcon className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Lock Period:</span>
                                <span>{stake.lockPeriod} days</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Unlock Date:</span>
                                <span>{formatDate(stake.releaseDate)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Time Remaining:</span>
                                <span>{timeLeft} days</span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>{progress.toFixed(0)}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white/5 rounded-lg">
                  <PiggyBank className="h-12 w-12 mx-auto text-white/30 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Stakes</h3>
                  <p className="text-white/70 max-w-md mx-auto mb-6">
                    You don't have any active staking positions. Start staking your tokens to earn rewards.
                  </p>
                  <Button
                    onClick={() => setActiveTab("stake")}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                  >
                    <CoinsIcon className="h-4 w-4 mr-2" />
                    Stake Tokens
                  </Button>
                </div>
              )}

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Staking Tiers</CardTitle>
                  <CardDescription>Higher tiers offer better rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {STAKING_TIERS.map((tier) => (
                      <div key={tier.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-6 w-6 rounded-full bg-gradient-to-r ${tier.color}`}></div>
                          <div>
                            <h4 className="font-medium">{tier.name}</h4>
                            <p className="text-xs text-white/70">
                              Min. {tier.minAmount.toLocaleString()} {tokenSymbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{tier.apy}% APY</p>
                          <p className="text-xs text-white/70">{tier.lockPeriod} days lock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stake" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle>Stake Your Tokens</CardTitle>
                  <CardDescription>Earn passive income with your {tokenSymbol} tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="stake-amount">Amount to Stake</Label>
                      <span className="text-sm text-white/70">
                        Balance: {userTokenBalance.toLocaleString()} {tokenSymbol}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="stake-amount"
                        type="number"
                        min="0"
                        max={userTokenBalance}
                        value={stakingAmount || ""}
                        onChange={(e) => setStakingAmount(Number(e.target.value))}
                        className="bg-white/5 border-white/10"
                      />
                      <Button
                        variant="outline"
                        className="whitespace-nowrap border-white/10"
                        onClick={() => setStakingAmount(userTokenBalance)}
                      >
                        Max
                      </Button>
                    </div>
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-0 px-2 text-white/70"
                        onClick={() => setStakingAmount(Math.max(0, Math.min(userTokenBalance, 100)))}
                      >
                        100
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-0 px-2 text-white/70"
                        onClick={() => setStakingAmount(Math.max(0, Math.min(userTokenBalance, 500)))}
                      >
                        500
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-0 px-2 text-white/70"
                        onClick={() => setStakingAmount(Math.max(0, Math.min(userTokenBalance, 1000)))}
                      >
                        1000
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-0 px-2 text-white/70"
                        onClick={() => setStakingAmount(Math.max(0, Math.min(userTokenBalance, 5000)))}
                      >
                        5000
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${selectedTier.color}`}></div>
                        {selectedTier.name} Tier
                      </h4>
                      <p className="font-bold text-sm">{calculateAPY(stakingAmount, stakingLockTime)}% APY</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Lock Period (days)</Label>
                          <span className="text-sm">{stakingLockTime} days</span>
                        </div>
                        <Slider
                          defaultValue={[selectedTier.lockPeriod]}
                          min={selectedTier.lockPeriod}
                          max={365}
                          step={30}
                          onValueChange={(value) => setStakingLockTime(value[0])}
                        />
                        <div className="flex justify-between text-xs text-white/70">
                          <span>{selectedTier.lockPeriod} days</span>
                          <span>365 days</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="auto-compound" className="flex items-center gap-2 cursor-pointer">
                            <TrendingUp className="h-4 w-4 text-neon-purple" />
                            Auto-Compound Rewards
                          </Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="h-4 w-4 text-white/50" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Auto-compounding automatically reinvests your earned rewards to maximize your returns.
                                  This feature adds up to 5% bonus APY.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Switch id="auto-compound" checked={autoCompound} onCheckedChange={setAutoCompound} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Available for staking:</span>
                      <span>
                        {userTokenBalance.toLocaleString()} {tokenSymbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Staking amount:</span>
                      <span>
                        {stakingAmount.toLocaleString()} {tokenSymbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Lock period:</span>
                      <span>{stakingLockTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Estimated rewards:</span>
                      <span>
                        {estimatedRewards.toFixed(2)} {tokenSymbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Reward rate:</span>
                      <span>{calculateAPY(stakingAmount, stakingLockTime)}% APY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Unlock date:</span>
                      <span>
                        {formatDate(new Date(Date.now() + stakingLockTime * 24 * 60 * 60 * 1000).toISOString())}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 border-t border-white/10 pt-4">
                  <div className="text-sm text-white/70 flex items-center gap-2 w-full justify-center">
                    <AlertCircle className="h-4 w-4" />
                    Staked tokens are locked for the selected period
                  </div>
                  <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                        disabled={stakingAmount <= 0 || stakingAmount > userTokenBalance}
                      >
                        <LockIcon className="h-4 w-4 mr-2" />
                        Stake Tokens
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Staking</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to stake {stakingAmount.toLocaleString()} {tokenSymbol} tokens for{" "}
                          {stakingLockTime} days. Your tokens will be locked until{" "}
                          {formatDate(new Date(Date.now() + stakingLockTime * 24 * 60 * 60 * 1000).toISOString())}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="p-4 bg-white/5 rounded-lg space-y-2 my-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Staking amount:</span>
                          <span>
                            {stakingAmount.toLocaleString()} {tokenSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Lock period:</span>
                          <span>{stakingLockTime} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">APY:</span>
                          <span>{calculateAPY(stakingAmount, stakingLockTime)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Estimated rewards:</span>
                          <span>
                            {estimatedRewards.toFixed(2)} {tokenSymbol}
                          </span>
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                          onClick={handleStake}
                        >
                          <LockIcon className="h-4 w-4 mr-2" />
                          Confirm Staking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((transaction) => (
                    <Card key={transaction.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-white/10 p-2 mt-1">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <h4 className="font-medium capitalize">
                                {transaction.type === "stake"
                                  ? "Tokens Staked"
                                  : transaction.type === "unstake"
                                    ? "Tokens Unstaked"
                                    : transaction.type === "reward"
                                      ? "Rewards Received"
                                      : "Rewards Claimed"}
                              </h4>
                              <span className="text-sm text-white/70">{formatDate(transaction.timestamp)}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <CircleDollarSign className="h-4 w-4 text-white/50" />
                                <span className="text-sm">
                                  {transaction.amount.toLocaleString()} {tokenSymbol}
                                </span>
                              </div>
                              {transaction.tier && (
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4 text-white/50" />
                                  <span className="text-sm">{transaction.tier} Tier</span>
                                </div>
                              )}
                            </div>
                            {transaction.type === "stake" && transaction.lockPeriod && transaction.releaseDate && (
                              <div className="text-sm text-white/70 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {transaction.status === "active" ? (
                                  <span>Locked until {formatDate(transaction.releaseDate)}</span>
                                ) : (
                                  <span>Locked for {transaction.lockPeriod} days</span>
                                )}
                              </div>
                            )}
                          </div>
                          {transaction.type === "stake" && transaction.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10"
                              onClick={() => handleUnstake(transaction.id)}
                            >
                              <UnlockIcon className="h-4 w-4 mr-2" />
                              Unstake
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/5 rounded-lg">
                  <HistoryIcon className="h-12 w-12 mx-auto text-white/30 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Transaction History</h3>
                  <p className="text-white/70 max-w-md mx-auto mb-6">
                    You don't have any staking transactions yet. Start staking your tokens to earn rewards.
                  </p>
                  <Button
                    onClick={() => setActiveTab("stake")}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                  >
                    <CoinsIcon className="h-4 w-4 mr-2" />
                    Stake Tokens
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
