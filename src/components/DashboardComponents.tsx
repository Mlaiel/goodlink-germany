import React from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { useLanguage } from "@/components/LanguageContext"
import { InventorySyncDashboard } from "@/components/InventorySyncDashboard"
import { AgentControlPanel } from "@/components/AgentControlPanel"
import { GlobalAgentSettings } from "@/components/GlobalAgentSettings"
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
  Gear,
  ShieldCheck,
  UserCircle
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
  { name: "Amazon", status: "connected", orders: 247, revenue: "€89,234", sync: "2 min ago", icon: "🏥", category: "Medical Devices" },
  { name: "eBay", status: "connected", orders: 134, revenue: "€45,542", sync: "5 min ago", icon: "🚗", category: "Automotive Parts" },
  { name: "OTTO", status: "connected", orders: 89, revenue: "€32,487", sync: "3 min ago", icon: "🔌", category: "Connectors" },
  { name: "Kaufland", status: "error", orders: 0, revenue: "€0", sync: "2 hours ago", icon: "⚙️", category: "Components" },
  { name: "Cdiscount", status: "syncing", orders: 56, revenue: "€18,743", sync: "syncing...", icon: "⚕️", category: "Medical" },
  { name: "bol.com", status: "connected", orders: 78, revenue: "€28,521", sync: "1 min ago", icon: "🛞", category: "Mechanical" }
]

const aiAgents = [
  { name: "Medical Listing Compliance", status: "active", processed: 145, success: 98, type: "content", description: "CE/MDR compliance checker" },
  { name: "B2B Price Optimizer", status: "active", processed: 890, success: 91, type: "pricing", description: "Volume pricing for business customers" },
  { name: "Technical Review Analyzer", status: "active", processed: 367, success: 95, type: "analytics", description: "Medical device feedback analysis" },
  { name: "Inventory Forecaster", status: "training", processed: 289, success: 87, type: "forecasting", description: "Medical/automotive demand prediction" },
  { name: "Technical Support Chat", status: "active", processed: 534, success: 92, type: "support", description: "German/English/Chinese support" },
  { name: "Content Translator", status: "active", processed: 678, success: 96, type: "content", description: "EN/DE/ZH technical translations" },
  { name: "LinkedIn B2B Agent", status: "active", processed: 267, success: 89, type: "social", description: "Medical industry networking" },
  { name: "Technical Blog Writer", status: "active", processed: 89, success: 94, type: "content", description: "Medical/automotive content" },
  { name: "WhatsApp Business Agent", status: "active", processed: 892, success: 94, type: "messaging", description: "Customer service automation" },
  { name: "Discord Community Manager", status: "active", processed: 456, success: 89, type: "messaging", description: "Technical communities" },
  { name: "Telegram B2B Bot", status: "active", processed: 634, success: 91, type: "messaging", description: "Supplier communication" },
  { name: "Compliance Monitor", status: "active", processed: 1247, success: 96, type: "compliance", description: "Regulatory compliance tracking" }
]

export function Dashboard() {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useKV("dashboard-period", "30d")
  const revenueData = [
    { name: 'Jan', medical: 185000, automotive: 142000, connectors: 98000 },
    { name: 'Feb', medical: 198000, automotive: 155000, connectors: 105000 },
    { name: 'Mar', medical: 176000, automotive: 148000, connectors: 112000 },
    { name: 'Apr', medical: 221000, automotive: 168000, connectors: 118000 },
    { name: 'May', medical: 205000, automotive: 162000, connectors: 109000 },
    { name: 'Jun', medical: 234000, automotive: 178000, connectors: 125000 }
  ].map(item => ({
    ...item,
    medical: Number(item.medical) || 0,
    automotive: Number(item.automotive) || 0,
    connectors: Number(item.connectors) || 0
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
              <CardTitle className="text-sm font-medium">{t('dashboard.revenue')}</CardTitle>
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
              <CardTitle className="text-sm font-medium">{t('dashboard.orders')}</CardTitle>
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
              <CardTitle className="text-sm font-medium">{t('dashboard.buybox')}</CardTitle>
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
              <CardTitle className="text-sm font-medium">{t('dashboard.automations')}</CardTitle>
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
              <CardTitle>{t('dashboard.marketplaceRevenue')}</CardTitle>
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
                      <Bar dataKey="medical" stackId="a" fill="#0ea5e9" name="Medical Devices" />
                      <Bar dataKey="automotive" stackId="a" fill="#ef4444" name="Automotive Parts" />
                      <Bar dataKey="connectors" stackId="a" fill="#8b5cf6" name="Connectors & Cables" />
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
              <CardTitle>{t('dashboard.performance')}</CardTitle>
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

export function MarketplacesView() {
  const { t } = useLanguage()
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

export function AIAgentsView() {
  const { t } = useLanguage()
  const [filterType, setFilterType] = useKV("agent-filter", "all")
  const [selectedAgent, setSelectedAgent] = useKV<any>("selected-agent", null)
  const [agentConfigs, setAgentConfigs] = useKV<Record<string, any>>("agent-configs", {})
  const [showGlobalSettings, setShowGlobalSettings] = useKV<boolean>("show-global-settings", false)
  
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
        <h2 className="text-2xl font-bold">{t('agents.title')}</h2>
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

export function ProductsView() {
  const { t } = useLanguage()
  const [products] = useKV<Product[]>("products", [
    { id: 1, sku: "GL-001", name: "Premium Wireless Headphones", category: "Electronics", marketplaces: ["Amazon", "eBay"], stock: 45 },
    { id: 2, sku: "GL-002", name: "Smart Fitness Tracker", category: "Wearables", marketplaces: ["Amazon", "OTTO"], stock: 23 },
    { id: 3, sku: "GL-003", name: "Bluetooth Speaker", category: "Audio", marketplaces: ["Amazon", "eBay", "bol.com"], stock: 67 }
  ])

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