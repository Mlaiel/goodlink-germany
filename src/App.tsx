import React, { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { InventorySyncDashboard } from "@/components/InventorySyncDashboard"
import { ShopDashboard } from "@/components/ShopDashboard"
import { BlogDashboard } from "@/components/BlogDashboard"
import { WhatsAppDashboard } from "@/components/WhatsAppDashboard"
import { GlobalAgentSettings } from "@/components/GlobalAgentSettings"
import { AgentControlPanel } from "@/components/AgentControlPanel"
import { 
  ChartLine, 
  Package, 
  Storefront, 
  Robot, 
  TrendUp, 
  Plus,
  CheckCircle,
  Warning,
  XCircle,
  Lightning,
  Database,
  Article,
  InstagramLogo,
  TwitterLogo,
  FacebookLogo,
  LinkedinLogo,
  YoutubeLogo,
  WhatsappLogo,
  DiscordLogo,
  TelegramLogo,
  ArrowLeft,
  Activity,
  Gear
} from "@phosphor-icons/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Error boundary component for robust error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error boundary caught:', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary details:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-64 text-center">
          <div className="space-y-2">
            <Warning className="h-8 w-8 text-orange-500 mx-auto" />
            <p className="text-muted-foreground">Something went wrong. Please refresh the page.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const marketplaces = [
  { name: "Amazon", status: "connected", orders: 847, revenue: "€67,234", sync: "2 min ago", icon: "🛒" },
  { name: "eBay", status: "connected", orders: 234, revenue: "€18,542", sync: "5 min ago", icon: "🏪" },
  { name: "OTTO", status: "connected", orders: 156, revenue: "€12,487", sync: "3 min ago", icon: "🏬" },
  { name: "Kaufland", status: "error", orders: 0, revenue: "€0", sync: "2 hours ago", icon: "🛍️" },
  { name: "Cdiscount", status: "syncing", orders: 89, revenue: "€6,743", sync: "syncing...", icon: "🛒" },
  { name: "bol.com", status: "connected", orders: 67, revenue: "€4,521", sync: "1 min ago", icon: "📦" }
]

const aiAgents = [
  { name: "Listing Generator", status: "active", processed: 145, success: 92, type: "content" },
  { name: "Price Optimizer", status: "active", processed: 1247, success: 88, type: "pricing" },
  { name: "Review Analyzer", status: "active", processed: 567, success: 95, type: "analytics" },
  { name: "Inventory Forecaster", status: "training", processed: 89, success: 78, type: "forecasting" },
  { name: "Chat Assistant", status: "active", processed: 234, success: 89, type: "support" },
  { name: "Content Translator", status: "active", processed: 678, success: 96, type: "content" },
  { name: "Instagram Marketer", status: "active", processed: 324, success: 91, type: "social" },
  { name: "TikTok Creator", status: "active", processed: 156, success: 87, type: "social" },
  { name: "YouTube Optimizer", status: "active", processed: 89, success: 94, type: "social" },
  { name: "Facebook Ads Manager", status: "active", processed: 445, success: 89, type: "social" },
  { name: "LinkedIn B2B Agent", status: "active", processed: 267, success: 85, type: "social" },
  { name: "Twitter Engagement Bot", status: "active", processed: 523, success: 92, type: "social" },
  { name: "Pinterest Visual Agent", status: "active", processed: 178, success: 88, type: "social" },
  { name: "WhatsApp Business Agent", status: "active", processed: 892, success: 94, type: "messaging" },
  { name: "Discord Community Manager", status: "active", processed: 456, success: 89, type: "messaging" },
  { name: "Telegram Marketing Bot", status: "active", processed: 634, success: 91, type: "messaging" },
  { name: "Social Analytics Agent", status: "active", processed: 1247, success: 96, type: "social" }
]

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useKV("dashboard-period", "30d")
  const revenueData = [
    { name: 'Jan', amazon: 45000, ebay: 12000, otto: 8000 },
    { name: 'Feb', amazon: 52000, ebay: 15000, otto: 9500 },
    { name: 'Mar', amazon: 48000, ebay: 13500, otto: 10200 },
    { name: 'Apr', amazon: 61000, ebay: 16800, otto: 11000 },
    { name: 'May', amazon: 55000, ebay: 14200, otto: 9800 },
    { name: 'Jun', amazon: 67000, ebay: 18500, otto: 12500 }
  ].map(item => ({
    ...item,
    amazon: Number(item.amazon) || 0,
    ebay: Number(item.ebay) || 0,
    otto: Number(item.otto) || 0
  }))

  const performanceData = [
    { name: 'Week 1', conversion: 3.2, traffic: 12500 },
    { name: 'Week 2', conversion: 3.8, traffic: 13200 },
    { name: 'Week 3', conversion: 4.1, traffic: 14800 },
    { name: 'Week 4', conversion: 3.9, traffic: 15600 }
  ].map(item => ({
    ...item,
    conversion: Number(item.conversion) || 0,
    traffic: Number(item.traffic) || 0
  }))
  
  // Sample data for demonstration - ensure data is always available and safely structured
  
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Warning className="h-12 w-12 text-orange-500 mx-auto" />
          <h1 className="text-2xl font-bold">Dashboard Loading</h1>
          <p className="text-muted-foreground">Initializing commerce platform...</p>
        </div>
      </div>
    }>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€98,263</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,393</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Buy Box %</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs text-muted-foreground">
                +2.4% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Automations</CardTitle>
              <Robot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17/17</div>
              <p className="text-xs text-muted-foreground">
                All agents active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Marketplace</CardTitle>
              <CardDescription>Monthly revenue across all connected platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary fallback={
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart loading error
                </div>
              }>
                {revenueData && revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          try {
                            if (typeof value === 'number' && !isNaN(value)) {
                              return [`€${value.toLocaleString()}`, name || 'Unknown']
                            }
                            return ['€0', name || 'Unknown']
                          } catch (error) {
                            console.error('Tooltip formatter error:', error)
                            return ['€0', 'Error']
                          }
                        }}
                      />
                      <Legend />
                      <Bar dataKey="amazon" stackId="a" fill="#ff6b35" name="Amazon" />
                      <Bar dataKey="ebay" stackId="a" fill="#1e40af" name="eBay" />
                      <Bar dataKey="otto" stackId="a" fill="#7c3aed" name="OTTO" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Conversion rate and traffic over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary fallback={
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart loading error
                </div>
              }>
                {performanceData && performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value, name) => {
                          try {
                            if (name === 'conversion') {
                              return [`${typeof value === 'number' && !isNaN(value) ? value.toFixed(1) : '0'}%`, 'Conversion Rate']
                            }
                            return [`${typeof value === 'number' && !isNaN(value) ? value.toLocaleString() : '0'}`, 'Traffic']
                          } catch (error) {
                            console.error('Tooltip formatter error:', error)
                            return ['0', 'Error']
                          }
                        }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="conversion" stroke="#ff6b35" strokeWidth={2} name="Conversion Rate" />
                      <Line yAxisId="right" type="monotone" dataKey="traffic" stroke="#1e40af" strokeWidth={2} name="Traffic" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}

function MarketplacesView() {
  // Ensure marketplaces data is safely accessible
  const safeMarketplaces = Array.isArray(marketplaces) ? marketplaces : []
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Marketplace Connections</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Marketplace
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {safeMarketplaces.length > 0 ? safeMarketplaces.map((marketplace, index) => (
          <Card key={marketplace?.name || `marketplace-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">{marketplace?.icon || '🛒'}</span>
                {marketplace?.name || 'Unknown Marketplace'}
              </CardTitle>
              <Badge variant={
                marketplace?.status === 'connected' ? 'default' : 
                marketplace?.status === 'error' ? 'destructive' : 
                'secondary'
              }>
                {marketplace?.status === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                {marketplace?.status === 'error' && <XCircle className="h-3 w-3 mr-1" />}
                {marketplace?.status === 'syncing' && <Lightning className="h-3 w-3 mr-1" />}
                {marketplace?.status || 'unknown'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Orders</span>
                  <span className="font-mono font-medium">{marketplace?.orders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-mono font-medium">{marketplace?.revenue || '€0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-xs text-muted-foreground">{marketplace?.sync || 'Never'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-3 text-center text-muted-foreground">
            No marketplaces configured
          </div>
        )}
      </div>
    </div>
  )
}

function AIAgentsView() {
  const [filterType, setFilterType] = useKV("agent-filter", "all")
  const [selectedAgent, setSelectedAgent] = useKV<any>("selected-agent", null)
  const [agentConfigs, setAgentConfigs] = useKV<Record<string, any>>("agent-configs", {})
  const [showGlobalSettings, setShowGlobalSettings] = useKV<boolean>("show-global-settings", false)
  
  // Ensure aiAgents data is safely accessible
  const safeAiAgents = Array.isArray(aiAgents) ? aiAgents : []
  
  const getAgentIcon = (type: string, name: string) => {
    try {
      if (name?.includes("Instagram")) return <InstagramLogo className="h-4 w-4" />
      if (name?.includes("TikTok")) return <span className="text-sm font-bold">TT</span>
      if (name?.includes("YouTube")) return <YoutubeLogo className="h-4 w-4" />
      if (name?.includes("Facebook")) return <FacebookLogo className="h-4 w-4" />
      if (name?.includes("LinkedIn")) return <LinkedinLogo className="h-4 w-4" />
      if (name?.includes("Twitter")) return <TwitterLogo className="h-4 w-4" />
      if (name?.includes("Pinterest")) return <span className="text-sm font-bold">P</span>
      if (name?.includes("WhatsApp")) return <WhatsappLogo className="h-4 w-4" />
      if (name?.includes("Discord")) return <DiscordLogo className="h-4 w-4" />
      if (name?.includes("Telegram")) return <TelegramLogo className="h-4 w-4" />
      return <Robot className="h-4 w-4" />
    } catch (error) {
      console.error('Error getting agent icon:', error)
      return <Robot className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    try {
      switch (type) {
        case "social": return "bg-purple-100 text-purple-800 border-purple-200"
        case "messaging": return "bg-emerald-100 text-emerald-800 border-emerald-200"
        case "content": return "bg-blue-100 text-blue-800 border-blue-200"
        case "pricing": return "bg-green-100 text-green-800 border-green-200"
        case "analytics": return "bg-orange-100 text-orange-800 border-orange-200"
        case "forecasting": return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "support": return "bg-indigo-100 text-indigo-800 border-indigo-200"
        default: return "bg-gray-100 text-gray-800 border-gray-200"
      }
    } catch (error) {
      console.error('Error getting type color:', error)
      return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleConfigureAgent = (agent: any) => {
    try {
      if (!agent) {
        console.error('Agent is null or undefined')
        toast.error('Invalid agent data')
        return
      }
      
      const agentConfig = {
        id: String(agent?.name || 'unknown').toLowerCase().replace(/\s+/g, '-'),
        name: String(agent?.name || 'Unknown Agent'),
        type: String(agent?.type || 'default'),
        status: String(agent?.status || 'inactive'),
        settings: (agentConfigs && agentConfigs[agent?.name]) || {}
      }
      setSelectedAgent(agentConfig)
    } catch (error) {
      console.error('Error configuring agent:', error)
      toast.error('Failed to configure agent')
    }
  }

  const handleConfigUpdate = (config: any) => {
    try {
      setAgentConfigs((current = {}) => ({
        ...current,
        [config?.name || 'unknown']: config?.settings || {}
      }))
      toast.success(`${config?.name || 'Agent'} configuration updated`)
    } catch (error) {
      console.error('Error updating config:', error)
      toast.error('Failed to update configuration')
    }
  }

  const filteredAgents = filterType === "all" ? safeAiAgents : safeAiAgents.filter(agent => agent && agent.type === filterType)
  const agentTypes = ["all", "social", "messaging", "content", "pricing", "analytics", "forecasting", "support"]

  // Safe calculation functions with null checks
  const getActiveAgentsCount = () => {
    try {
      return safeAiAgents.filter(a => a && a.status === 'active').length
    } catch (error) {
      console.error('Error counting active agents:', error)
      return 0
    }
  }

  const getTrainingAgentsCount = () => {
    try {
      return safeAiAgents.filter(a => a && a.status === 'training').length
    } catch (error) {
      console.error('Error counting training agents:', error)
      return 0
    }
  }

  const getAverageSuccessRate = () => {
    try {
      if (safeAiAgents.length === 0) return 0
      const validAgents = safeAiAgents.filter(a => a && typeof a.success === 'number')
      if (validAgents.length === 0) return 0
      const totalSuccess = validAgents.reduce((acc, a) => acc + (a.success || 0), 0)
      return Math.round(totalSuccess / validAgents.length)
    } catch (error) {
      console.error('Error calculating success rate:', error)
      return 0
    }
  }

  const getTotalProcessed = () => {
    try {
      return safeAiAgents.filter(a => a && typeof a.processed === 'number').reduce((acc, a) => acc + (a.processed || 0), 0)
    } catch (error) {
      console.error('Error calculating total processed:', error)
      return 0
    }
  }

  if (showGlobalSettings) {
    return (
      <GlobalAgentSettings onClose={() => setShowGlobalSettings(false)} />
    )
  }

  if (selectedAgent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedAgent(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
          <h2 className="text-2xl font-bold">Agent Configuration</h2>
        </div>
        <AgentControlPanel 
          agent={selectedAgent} 
          onConfigUpdate={handleConfigUpdate}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Agent Control Center</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowGlobalSettings(true)}>
            <Gear className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
          <Button>
            <Robot className="h-4 w-4 mr-2" />
            Bulk Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{getActiveAgentsCount()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Active Agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Lightning className="h-4 w-4 text-orange-600" />
              <div className="text-2xl font-bold">{getTrainingAgentsCount()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Training</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">{getAverageSuccessRate()}%</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendUp className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{getTotalProcessed().toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {agentTypes.map((type) => (
          <Button
            key={type}
            variant={filterType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType(type)}
            className="capitalize"
          >
            {type === "all" ? "All Agents" : `${type} (${safeAiAgents.filter(a => a && a.type === type).length})`}
          </Button>
        ))}
      </div>

      {/* Social Media Metrics */}
      {filterType === "all" || filterType === "social" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Robot className="h-5 w-5" />
              Social Media Performance
            </CardTitle>
            <CardDescription>Real-time metrics from your social media AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <InstagramLogo className="h-4 w-4 text-pink-600" />
                  <span className="text-sm font-medium">Instagram</span>
                </div>
                <div className="text-2xl font-bold">12.4K</div>
                <p className="text-xs text-muted-foreground">+2.1K followers this week</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-black">TT</span>
                  <span className="text-sm font-medium">TikTok</span>
                </div>
                <div className="text-2xl font-bold">8.7K</div>
                <p className="text-xs text-muted-foreground">+1.8K views today</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <YoutubeLogo className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">YouTube</span>
                </div>
                <div className="text-2xl font-bold">5.2K</div>
                <p className="text-xs text-muted-foreground">+340 subscribers</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <LinkedinLogo className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </div>
                <div className="text-2xl font-bold">3.1K</div>
                <p className="text-xs text-muted-foreground">+156 connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Messaging Platform Metrics */}
      {filterType === "all" || filterType === "messaging" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WhatsappLogo className="h-5 w-5" />
              Messaging Platforms Performance
            </CardTitle>
            <CardDescription>Customer engagement and conversation metrics across messaging platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <WhatsappLogo className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">WhatsApp Business</span>
                </div>
                <div className="text-2xl font-bold">2.8K</div>
                <p className="text-xs text-muted-foreground">+456 conversations this week</p>
                <div className="text-sm text-green-600 font-medium">94% response rate</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DiscordLogo className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-medium">Discord</span>
                </div>
                <div className="text-2xl font-bold">1.2K</div>
                <p className="text-xs text-muted-foreground">+189 active members</p>
                <div className="text-sm text-indigo-600 font-medium">89% engagement rate</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TelegramLogo className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Telegram</span>
                </div>
                <div className="text-2xl font-bold">1.6K</div>
                <p className="text-xs text-muted-foreground">+298 channel subscribers</p>
                <div className="text-sm text-blue-600 font-medium">91% delivery rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.length > 0 ? filteredAgents.map((agent, index) => (
          <Card key={agent?.name || `agent-${index}`} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {getAgentIcon(agent?.type || 'default', agent?.name || '')}
                {agent?.name || 'Unknown Agent'}
              </CardTitle>
              <Badge variant={agent?.status === 'active' ? 'default' : 'secondary'}>
                {agent?.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                {agent?.status === 'training' && <Lightning className="h-3 w-3 mr-1" />}
                {agent?.status || 'inactive'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processed</span>
                  <span className="font-mono font-medium">{agent?.processed || 0}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium">{agent?.success || 0}%</span>
                  </div>
                  <Progress value={agent?.success || 0} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-xs ${getTypeColor(agent?.type || 'default')}`}>
                    {agent?.type || 'unknown'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleConfigureAgent(agent)}
                  >
                    <Gear className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-3 text-center text-muted-foreground">
            No agents available
          </div>
        )}
      </div>
    </div>
  )
}

interface Product {
  id: number
  sku: string
  name: string
  category: string
  marketplaces: string[]
  stock: number
}

function ProductsView() {
  const [products] = useKV<Product[]>("products", [
    { id: 1, sku: "GL-001", name: "Premium Wireless Headphones", category: "Electronics", marketplaces: ["Amazon", "eBay"], stock: 45 },
    { id: 2, sku: "GL-002", name: "Smart Fitness Tracker", category: "Wearables", marketplaces: ["Amazon", "OTTO"], stock: 23 },
    { id: 3, sku: "GL-003", name: "Bluetooth Speaker", category: "Audio", marketplaces: ["Amazon", "eBay", "bol.com"], stock: 67 }
  ])

  // Ensure products data is safely accessible
  const safeProducts = Array.isArray(products) ? products : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Product Catalog</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your product catalog and marketplace listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeProducts.length > 0 ? safeProducts.map((product, index) => (
              <div key={product?.id || `product-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{product?.name || 'Unknown Product'}</span>
                    <Badge variant="outline" className="font-mono text-xs">{product?.sku || 'N/A'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{product?.category || 'Uncategorized'}</span>
                    <span>•</span>
                    <span>Stock: {product?.stock || 0}</span>
                    <span>•</span>
                    <span>{product?.marketplaces?.join(", ") || "No marketplaces"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">
                    <Robot className="h-4 w-4 mr-1" />
                    AI Optimize
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center text-muted-foreground py-8">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useKV("active-tab", "dashboard")

  // Progressive error checking
  try {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">G</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Goodlink Germany</h1>
                    <p className="text-sm text-muted-foreground">AI Commerce Platform</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <ErrorBoundary>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <ChartLine className="h-4 w-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="marketplaces" className="flex items-center gap-2">
                    <Storefront className="h-4 w-4" />
                    Marketplaces
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="inventory" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Inventory Sync
                  </TabsTrigger>
                  <TabsTrigger value="shop" className="flex items-center gap-2">
                    <Storefront className="h-4 w-4" />
                    Shop
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center gap-2">
                    <Article className="h-4 w-4" />
                    Blog
                  </TabsTrigger>
                  <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                    <WhatsappLogo className="h-4 w-4" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="ai-agents" className="flex items-center gap-2">
                    <Robot className="h-4 w-4" />
                    AI Agents
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="marketplaces" className="mt-6">
                  <ErrorBoundary>
                    <MarketplacesView />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <ErrorBoundary>
                    <ProductsView />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="inventory" className="mt-6">
                  <ErrorBoundary>
                    <InventorySyncDashboard />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="shop" className="mt-6">
                  <ErrorBoundary>
                    <ShopDashboard />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="blog" className="mt-6">
                  <ErrorBoundary>
                    <BlogDashboard />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="whatsapp" className="mt-6">
                  <ErrorBoundary>
                    <WhatsAppDashboard />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="ai-agents" className="mt-6">
                  <ErrorBoundary>
                    <AIAgentsView />
                  </ErrorBoundary>
                </TabsContent>
              </Tabs>
            </ErrorBoundary>
          </main>

          {/* Toast notifications */}
          <Toaster />
        </div>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('App component error:', error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Warning className="h-8 w-8 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Application Error</h1>
          <p className="text-muted-foreground">Please check the console for details and refresh the page.</p>
        </div>
      </div>
    )
  }
}

export default App