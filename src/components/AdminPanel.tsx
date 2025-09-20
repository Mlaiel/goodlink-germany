import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Shield, 
  Users, 
  Gear as Settings, 
  ChartBar as BarChart3, 
  FileText, 
  Database,
  Activity,
  Warning as AlertTriangle,
  CheckCircle,
  Clock,
  TrendUp,
  UserCheck,
  Globe,
  Robot,
  ShoppingCart,
  Package,
  Storefront,
  Article,
  ArrowsClockwise as Sync,
  Eye,
  ShieldCheck as Security,
  EnvelopeSimple as Mail,
  Bell,
  WhatsappLogo,
  DiscordLogo,
  TelegramLogo,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  CloudCheck,
  CurrencyDollar,
  PaintBrush,
  Code,
  Key,
  ListPlus,
  ChartLine as Graph
} from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'
import { SpecializedAgentsPanel } from './admin/SpecializedAgentsPanel'
import { AIAgentMonitoringDashboard } from './admin/AIAgentMonitoringDashboard'
import { MarketplaceAgentsPanel } from './admin/MarketplaceAgentsPanel'
import { AIAgentsConfig } from './admin/AIAgentsConfig'
import { AgentAutomationConfig } from './admin/AgentAutomationConfig'
import { AgentPerformanceDashboard } from './admin/AgentPerformanceDashboard'
import { AgentDemoPanel } from './AgentDemoPanel'
import { AgentUsageGuide } from './AgentUsageGuide'
import { DemoInterface } from './DemoInterface'

interface SystemMetrics {
  uptime: string
  totalUsers: number
  activeUsers: number
  totalOrders: number
  systemHealth: 'healthy' | 'warning' | 'critical'
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
}

interface UserStats {
  totalRegistered: number
  activeToday: number
  newThisWeek: number
  premiumUsers: number
}

interface SystemSettings {
  maintenanceMode: boolean
  allowRegistrations: boolean
  enableNotifications: boolean
  enableAnalytics: boolean
  maxConcurrentUsers: number
  sessionTimeout: number
  siteName: string
  siteUrl: string
  adminEmail: string
  timezone: string
  defaultLanguage: string
  enableMultiLanguage: boolean
  enableSEO: boolean
  enableCache: boolean
  cacheTimeout: number
  backupEnabled: boolean
  backupFrequency: string
  enableDebugMode: boolean
  logLevel: string
  maxFileSize: number
  allowedFileTypes: string
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  enableSSL: boolean
}

interface AIAgentSettings {
  chatbotEnabled: boolean
  chatbotLanguages: string[]
  chatbotResponseTime: number
  listingAgentEnabled: boolean
  priceAgentEnabled: boolean
  inventoryAgentEnabled: boolean
  reviewAgentEnabled: boolean
  blogAgentEnabled: boolean
  prospectingAgentEnabled: boolean
  socialMediaAgentEnabled: boolean
  whatsappAgentEnabled: boolean
  telegramAgentEnabled: boolean
  discordAgentEnabled: boolean
  aiModelProvider: string
  maxTokensPerRequest: number
  temperatureSetting: number
  enableContextMemory: boolean
  maxConversationLength: number
}

interface MarketplaceSettings {
  amazonEnabled: boolean
  amazonApiKey: string
  amazonSecretKey: string
  amazonMarketplaceId: string
  ebayEnabled: boolean
  ebayApiKey: string
  ebaySecretKey: string
  kauflandEnabled: boolean
  kauflandApiKey: string
  ottoEnabled: boolean
  ottoApiKey: string
  cdiscountEnabled: boolean
  cdiscountApiKey: string
  bolEnabled: boolean
  bolApiKey: string
  allegroEnabled: boolean
  allegroApiKey: string
  walmartEnabled: boolean
  walmartApiKey: string
  autoSyncInventory: boolean
  syncFrequency: number
  enablePriceMonitoring: boolean
  priceUpdateFrequency: number
  enableOrderSync: boolean
  orderSyncFrequency: number
}

interface ShopSettings {
  shopEnabled: boolean
  shopName: string
  shopDescription: string
  shopLogo: string
  shopCurrency: string
  taxRate: number
  shippingEnabled: boolean
  freeShippingThreshold: number
  enablePaypal: boolean
  paypalClientId: string
  enableStripe: boolean
  stripePublishableKey: string
  stripeSecretKey: string
  enableKlarna: boolean
  klarnaUsername: string
  klarnaPassword: string
  enableInventoryTracking: boolean
  lowStockThreshold: number
  enableReviews: boolean
  enableWishlist: boolean
  enableCompareProducts: boolean
  enableCoupons: boolean
  enableGiftCards: boolean
  enableMultiCurrency: boolean
  enableGeoLocation: boolean
  enableSocialLogin: boolean
  enableGuestCheckout: boolean
}

interface BlogSettings {
  blogEnabled: boolean
  blogTitle: string
  blogDescription: string
  postsPerPage: number
  enableComments: boolean
  moderateComments: boolean
  enableSEO: boolean
  autoGeneratePosts: boolean
  postGenerationFrequency: string
  enableSocialSharing: boolean
  enableNewsletterSignup: boolean
  enableRSS: boolean
  enableSitemap: boolean
  defaultPostStatus: string
  enablePostScheduling: boolean
  enableFeaturedImages: boolean
  enableCategories: boolean
  enableTags: boolean
  enableAuthorProfiles: boolean
  enableRelatedPosts: boolean
}

interface SocialMediaSettings {
  facebookEnabled: boolean
  facebookPageId: string
  facebookAccessToken: string
  instagramEnabled: boolean
  instagramAccountId: string
  instagramAccessToken: string
  twitterEnabled: boolean
  twitterApiKey: string
  twitterApiSecret: string
  twitterAccessToken: string
  twitterAccessTokenSecret: string
  linkedinEnabled: boolean
  linkedinCompanyId: string
  linkedinAccessToken: string
  autoPostProducts: boolean
  autoPostBlogPosts: boolean
  postFrequency: string
  enableHashtags: boolean
  defaultHashtags: string
  enableAnalytics: boolean
}

export function AdminPanel() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV('admin-active-tab', 'overview')
  
  // Default settings
  const defaultSystemSettings: SystemSettings = {
    maintenanceMode: false,
    allowRegistrations: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxConcurrentUsers: 1000,
    sessionTimeout: 30,
    siteName: 'Goodlink Germany',
    siteUrl: 'https://goodlink-germany.com',
    adminEmail: 'admin@goodlink-germany.com',
    timezone: 'Europe/Berlin',
    defaultLanguage: 'de',
    enableMultiLanguage: true,
    enableSEO: true,
    enableCache: true,
    cacheTimeout: 3600,
    backupEnabled: true,
    backupFrequency: 'daily',
    enableDebugMode: false,
    logLevel: 'info',
    maxFileSize: 10,
    allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    enableSSL: true
  }

  const defaultAISettings: AIAgentSettings = {
    chatbotEnabled: true,
    chatbotLanguages: ['de', 'en', 'zh', 'fr'],
    chatbotResponseTime: 2,
    listingAgentEnabled: true,
    priceAgentEnabled: true,
    inventoryAgentEnabled: true,
    reviewAgentEnabled: true,
    blogAgentEnabled: true,
    prospectingAgentEnabled: true,
    socialMediaAgentEnabled: true,
    whatsappAgentEnabled: true,
    telegramAgentEnabled: true,
    discordAgentEnabled: true,
    aiModelProvider: 'openai',
    maxTokensPerRequest: 4000,
    temperatureSetting: 0.7,
    enableContextMemory: true,
    maxConversationLength: 20
  }

  const defaultMarketplaceSettings: MarketplaceSettings = {
    amazonEnabled: true,
    amazonApiKey: '',
    amazonSecretKey: '',
    amazonMarketplaceId: 'A1PA6795UKMFR9',
    ebayEnabled: true,
    ebayApiKey: '',
    ebaySecretKey: '',
    kauflandEnabled: true,
    kauflandApiKey: '',
    ottoEnabled: true,
    ottoApiKey: '',
    cdiscountEnabled: true,
    cdiscountApiKey: '',
    bolEnabled: true,
    bolApiKey: '',
    allegroEnabled: true,
    allegroApiKey: '',
    walmartEnabled: true,
    walmartApiKey: '',
    autoSyncInventory: true,
    syncFrequency: 15,
    enablePriceMonitoring: true,
    priceUpdateFrequency: 60,
    enableOrderSync: true,
    orderSyncFrequency: 30
  }

  const defaultShopSettings: ShopSettings = {
    shopEnabled: true,
    shopName: 'Goodlink Germany Shop',
    shopDescription: 'Premium medical devices and automotive components',
    shopLogo: '',
    shopCurrency: 'EUR',
    taxRate: 19,
    shippingEnabled: true,
    freeShippingThreshold: 100,
    enablePaypal: true,
    paypalClientId: '',
    enableStripe: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    enableKlarna: true,
    klarnaUsername: '',
    klarnaPassword: '',
    enableInventoryTracking: true,
    lowStockThreshold: 10,
    enableReviews: true,
    enableWishlist: true,
    enableCompareProducts: true,
    enableCoupons: true,
    enableGiftCards: true,
    enableMultiCurrency: true,
    enableGeoLocation: true,
    enableSocialLogin: true,
    enableGuestCheckout: true
  }

  const defaultBlogSettings: BlogSettings = {
    blogEnabled: true,
    blogTitle: 'Goodlink Germany Blog',
    blogDescription: 'Latest insights on medical devices and automotive components',
    postsPerPage: 10,
    enableComments: true,
    moderateComments: true,
    enableSEO: true,
    autoGeneratePosts: true,
    postGenerationFrequency: 'weekly',
    enableSocialSharing: true,
    enableNewsletterSignup: true,
    enableRSS: true,
    enableSitemap: true,
    defaultPostStatus: 'published',
    enablePostScheduling: true,
    enableFeaturedImages: true,
    enableCategories: true,
    enableTags: true,
    enableAuthorProfiles: true,
    enableRelatedPosts: true
  }

  const defaultSocialSettings: SocialMediaSettings = {
    facebookEnabled: true,
    facebookPageId: '',
    facebookAccessToken: '',
    instagramEnabled: true,
    instagramAccountId: '',
    instagramAccessToken: '',
    twitterEnabled: true,
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessTokenSecret: '',
    linkedinEnabled: true,
    linkedinCompanyId: '',
    linkedinAccessToken: '',
    autoPostProducts: true,
    autoPostBlogPosts: true,
    postFrequency: 'daily',
    enableHashtags: true,
    defaultHashtags: '#medical #automotive #goodlink #germany',
    enableAnalytics: true
  }

  // State management
  const [systemSettings, setSystemSettings] = useKV<SystemSettings>('admin-system-settings', defaultSystemSettings)
  const [aiSettings, setAISettings] = useKV<AIAgentSettings>('admin-ai-settings', defaultAISettings)
  const [marketplaceSettings, setMarketplaceSettings] = useKV<MarketplaceSettings>('admin-marketplace-settings', defaultMarketplaceSettings)
  const [shopSettings, setShopSettings] = useKV<ShopSettings>('admin-shop-settings', defaultShopSettings)
  const [blogSettings, setBlogSettings] = useKV<BlogSettings>('admin-blog-settings', defaultBlogSettings)
  const [socialSettings, setSocialSettings] = useKV<SocialMediaSettings>('admin-social-settings', defaultSocialSettings)

  // Mock data - in real app this would come from APIs
  const systemMetrics: SystemMetrics = {
    uptime: '99.9%',
    totalUsers: 15847,
    activeUsers: 2341,
    totalOrders: 45678,
    systemHealth: 'healthy',
    memoryUsage: 68,
    cpuUsage: 42,
    diskUsage: 73
  }

  const userStats: UserStats = {
    totalRegistered: 15847,
    activeToday: 2341,
    newThisWeek: 156,
    premiumUsers: 892
  }

  const recentLogs = [
    { id: 1, level: 'info', message: 'AI agent training completed successfully', timestamp: '2024-01-15 14:32:21', user: 'ai-service' },
    { id: 2, level: 'warning', message: 'High memory usage detected on server', timestamp: '2024-01-15 14:28:45', user: 'system' },
    { id: 3, level: 'error', message: 'Amazon API rate limit exceeded', timestamp: '2024-01-15 14:25:12', user: 'marketplace-sync' },
    { id: 4, level: 'info', message: 'Daily backup completed successfully', timestamp: '2024-01-15 14:20:00', user: 'backup-service' },
    { id: 5, level: 'info', message: 'New product listings generated', timestamp: '2024-01-15 14:15:33', user: 'listing-agent' }
  ]

  const getHealthColor = (health: SystemMetrics['systemHealth']) => {
    switch (health) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-orange-600' 
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getHealthIcon = (health: SystemMetrics['systemHealth']) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Modern Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Administrative Control Center
                </h1>
                <p className="text-slate-300 text-lg">
                  Complete system management and configuration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                {getHealthIcon(systemMetrics.systemHealth)}
                <span className="font-medium text-white">System {systemMetrics.systemHealth}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Activity className="h-4 w-4 text-white" />
                <span className="font-medium text-white">Uptime {systemMetrics.uptime}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl">
              <CloudCheck className="h-5 w-5 mr-2" />
              Save All Changes
            </Button>
            <div className="text-right text-sm text-slate-300">
              <div>Last updated: {new Date().toLocaleTimeString()}</div>
              <div>{systemMetrics.totalUsers.toLocaleString()} registered users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">System Uptime</p>
                <p className="text-3xl font-bold text-green-700">{systemMetrics.uptime}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Users</p>
                <p className="text-3xl font-bold text-blue-700">{systemMetrics.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Orders</p>
                <p className="text-3xl font-bold text-purple-700">{systemMetrics.totalOrders.toLocaleString()}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">AI Agents</p>
                <p className="text-3xl font-bold text-orange-700">12</p>
              </div>
              <Robot className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Navigation Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        {/* Tab Navigation */}
        <TabsList className="hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
          <TabsTrigger value="marketplace-agents">Marketplace Agents</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
          <TabsTrigger value="agent-demos">Agent Demos</TabsTrigger>
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          {/* Dashboard & Analytics */}
          <Card className="admin-nav-card group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Core</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-blue-900">Dashboard & Analytics</h3>
              <p className="text-sm text-blue-600 mb-4">System overview, performance metrics, and real-time monitoring</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "overview" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-100"
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  System Overview
                </button>
                <button 
                  onClick={() => setActiveTab("monitoring")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "monitoring" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-100"
                  }`}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Performance Monitor
                </button>
              </div>
            </CardContent>
          </Card>

          {/* AI & Automation */}
          <Card className="admin-nav-card group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Robot className="h-6 w-6 text-purple-600" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">AI</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-purple-900">AI & Automation</h3>
              <p className="text-sm text-purple-600 mb-4">Configure AI agents, automation settings, and intelligent workflows</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab("ai-agents")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "ai-agents" 
                      ? "bg-purple-600 text-white shadow-md" 
                      : "hover:bg-purple-100"
                  }`}
                >
                  <Robot className="h-4 w-4 mr-2" />
                  AI Agents Config
                </button>
                <button 
                  onClick={() => setActiveTab("marketplace-agents")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "marketplace-agents" 
                      ? "bg-purple-600 text-white shadow-md" 
                      : "hover:bg-purple-100"
                  }`}
                >
                  <Storefront className="h-4 w-4 mr-2" />
                  Marketplace Agents
                </button>
                <button 
                  onClick={() => setActiveTab("specialized")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "specialized" 
                      ? "bg-purple-600 text-white shadow-md" 
                      : "hover:bg-purple-100"
                  }`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Specialized Agents
                </button>
                <button 
                  onClick={() => setActiveTab("agent-demos")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "agent-demos" 
                      ? "bg-purple-600 text-white shadow-md" 
                      : "hover:bg-purple-100"
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Agent Demos & Training
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Commerce & Sales */}
          <Card className="admin-nav-card group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-green-500 bg-gradient-to-br from-green-50/50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Commerce</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-green-900">Commerce & Sales</h3>
              <p className="text-sm text-green-600 mb-4">Shop configuration, marketplace integration, and sales management</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab("shop")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "shop" 
                      ? "bg-green-600 text-white shadow-md" 
                      : "hover:bg-green-100"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Shop Settings
                </button>
                <button 
                  onClick={() => setActiveTab("marketplaces")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "marketplaces" 
                      ? "bg-green-600 text-white shadow-md" 
                      : "hover:bg-green-100"
                  }`}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Marketplace Platforms
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Content & Marketing */}
          <Card className="admin-nav-card group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50/50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                  <Article className="h-6 w-6 text-orange-600" />
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Content</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-orange-900">Content & Marketing</h3>
              <p className="text-sm text-orange-600 mb-4">Blog management, social media automation, and content strategy</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab("blog")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "blog" 
                      ? "bg-orange-600 text-white shadow-md" 
                      : "hover:bg-orange-100"
                  }`}
                >
                  <Article className="h-4 w-4 mr-2" />
                  Blog Configuration
                </button>
                <button 
                  onClick={() => setActiveTab("social")}
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                    activeTab === "social" 
                      ? "bg-orange-600 text-white shadow-md" 
                      : "hover:bg-orange-100"
                  }`}
                >
                  <FacebookLogo className="h-4 w-4 mr-2" />
                  Social Media
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Administration Section */}
        <Card className="bg-gradient-to-r from-slate-50/50 to-slate-100/50 border-2 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-slate-200 rounded-lg">
                <Settings className="h-6 w-6 text-slate-600" />
              </div>
              System Administration
            </CardTitle>
            <CardDescription className="text-slate-600">
              Core system settings, user management, and security configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <button 
                onClick={() => setActiveTab("system")}
                className={`modern-tab-trigger flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  activeTab === "system" 
                    ? "border-slate-500 bg-slate-600 text-white" 
                    : "border-transparent hover:bg-slate-100"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === "system" 
                    ? "bg-slate-500" 
                    : "bg-slate-200"
                }`}>
                  <Settings className={`h-5 w-5 ${
                    activeTab === "system" 
                      ? "text-white" 
                      : "text-slate-600"
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">System Configuration</div>
                  <div className="text-sm opacity-70">Core settings, security, performance</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab("users")}
                className={`modern-tab-trigger flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  activeTab === "users" 
                    ? "border-slate-500 bg-slate-600 text-white" 
                    : "border-transparent hover:bg-slate-100"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === "users" 
                    ? "bg-slate-500" 
                    : "bg-slate-200"
                }`}>
                  <Users className={`h-5 w-5 ${
                    activeTab === "users" 
                      ? "text-white" 
                      : "text-slate-600"
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">User Management</div>
                  <div className="text-sm opacity-70">User accounts, roles, permissions</div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Resource Usage */}
          <Card className="bg-gradient-to-r from-muted/50 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Performance Monitor
              </CardTitle>
              <CardDescription>Real-time server performance and resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Memory Usage
                    </span>
                    <span className="text-sm font-bold text-blue-600">{systemMetrics.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                      style={{ width: `${systemMetrics.memoryUsage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      CPU Usage
                    </span>
                    <span className="text-sm font-bold text-green-600">{systemMetrics.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                      style={{ width: `${systemMetrics.cpuUsage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Disk Usage
                    </span>
                    <span className="text-sm font-bold text-orange-600">{systemMetrics.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                      style={{ width: `${systemMetrics.diskUsage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent System Activity
              </CardTitle>
              <CardDescription>Latest system events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    {getLevelIcon(log.level)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{log.message}</span>
                        <Badge variant={log.level === 'error' ? 'destructive' : log.level === 'warning' ? 'secondary' : 'default'} className="text-xs">
                          {log.level.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <span>{log.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic System Configuration
                </CardTitle>
                <CardDescription>Core system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName"
                      value={systemSettings?.siteName || ''}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, siteName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input 
                      id="siteUrl"
                      value={systemSettings?.siteUrl || ''}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, siteUrl: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Administrator Email</Label>
                    <Input 
                      id="adminEmail"
                      type="email"
                      value={systemSettings?.adminEmail || ''}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, adminEmail: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={systemSettings?.timezone || 'Europe/Berlin'}
                      onValueChange={(value) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, timezone: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select 
                      value={systemSettings?.defaultLanguage || 'de'}
                      onValueChange={(value) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, defaultLanguage: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Security className="h-5 w-5" />
                  Security & Performance
                </CardTitle>
                <CardDescription>System security and performance configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to restrict access
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.maintenanceMode || false}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, maintenanceMode: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to create accounts
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.allowRegistrations || true}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, allowRegistrations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Cache</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable system caching for better performance
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.enableCache || true}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, enableCache: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable debug mode for development
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.enableDebugMode || false}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, enableDebugMode: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxUsers">Max Concurrent Users</Label>
                    <Input 
                      id="maxUsers"
                      type="number" 
                      value={systemSettings?.maxConcurrentUsers || 1000}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ 
                          ...prev, 
                          maxConcurrentUsers: parseInt(e.target.value) || 1000 
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout"
                      type="number" 
                      value={systemSettings?.sessionTimeout || 30}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSystemSettings) => ({ 
                          ...prev, 
                          sessionTimeout: parseInt(e.target.value) || 30 
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Agents Tab */}
        <TabsContent value="ai-agents" className="space-y-6">
          <AgentAutomationConfig />
        </TabsContent>
        
        {/* Agent Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <AgentPerformanceDashboard />
        </TabsContent>
        
        <TabsContent value="marketplace-agents" className="space-y-6">
          <MarketplaceAgentsPanel />
        </TabsContent>

        {/* Specialized Agents Tab */}
        <TabsContent value="specialized" className="space-y-6">
          <SpecializedAgentsPanel />
        </TabsContent>

        {/* Agent Demos Tab */}
        <TabsContent value="agent-demos" className="space-y-6">
          <DemoInterface />
        </TabsContent>

        {/* Marketplace Settings Tab */}
        <TabsContent value="marketplaces" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Amazon Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Amazon Marketplace
                </CardTitle>
                <CardDescription>Configure Amazon SP-API integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Amazon Integration</Label>
                  <Switch 
                    checked={marketplaceSettings?.amazonEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, amazonEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amazonApiKey">Amazon API Key</Label>
                  <Input 
                    id="amazonApiKey"
                    type="password"
                    placeholder="Enter Amazon SP-API Key"
                    value={marketplaceSettings?.amazonApiKey || ''}
                    onChange={(e) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, amazonApiKey: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amazonSecretKey">Amazon Secret Key</Label>
                  <Input 
                    id="amazonSecretKey"
                    type="password"
                    placeholder="Enter Amazon Secret Key"
                    value={marketplaceSettings?.amazonSecretKey || ''}
                    onChange={(e) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, amazonSecretKey: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amazonMarketplaceId">Marketplace ID</Label>
                  <Select 
                    value={marketplaceSettings?.amazonMarketplaceId || 'A1PA6795UKMFR9'}
                    onValueChange={(value) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, amazonMarketplaceId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1PA6795UKMFR9">Amazon.de (Germany)</SelectItem>
                      <SelectItem value="ATVPDKIKX0DER">Amazon.com (US)</SelectItem>
                      <SelectItem value="A1F83G8C2ARO7P">Amazon.co.uk (UK)</SelectItem>
                      <SelectItem value="A13V1IB3VIYZZH">Amazon.fr (France)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Other Marketplaces */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Storefront className="h-5 w-5" />
                  Other Marketplaces
                </CardTitle>
                <CardDescription>Configure additional marketplace integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>eBay</Label>
                    <p className="text-sm text-muted-foreground">European eBay marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.ebayEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, ebayEnabled: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Kaufland.de</Label>
                    <p className="text-sm text-muted-foreground">German marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.kauflandEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, kauflandEnabled: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>OTTO.de</Label>
                    <p className="text-sm text-muted-foreground">German online marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.ottoEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, ottoEnabled: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cdiscount</Label>
                    <p className="text-sm text-muted-foreground">French marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.cdiscountEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, cdiscountEnabled: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>bol.com</Label>
                    <p className="text-sm text-muted-foreground">Netherlands marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.bolEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, bolEnabled: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allegro</Label>
                    <p className="text-sm text-muted-foreground">Polish marketplace</p>
                  </div>
                  <Switch 
                    checked={marketplaceSettings?.allegroEnabled || true}
                    onCheckedChange={(checked) => 
                      setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, allegroEnabled: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sync className="h-5 w-5" />
                Synchronization Settings
              </CardTitle>
              <CardDescription>Configure automatic synchronization across marketplaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto Sync Inventory</Label>
                    <Switch 
                      checked={marketplaceSettings?.autoSyncInventory || true}
                      onCheckedChange={(checked) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, autoSyncInventory: checked }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sync Frequency (minutes)</Label>
                    <Input 
                      type="number" 
                      value={marketplaceSettings?.syncFrequency || 15}
                      onChange={(e) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ 
                          ...prev, 
                          syncFrequency: parseInt(e.target.value) || 15 
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Price Monitoring</Label>
                    <Switch 
                      checked={marketplaceSettings?.enablePriceMonitoring || true}
                      onCheckedChange={(checked) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, enablePriceMonitoring: checked }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price Update Frequency (minutes)</Label>
                    <Input 
                      type="number" 
                      value={marketplaceSettings?.priceUpdateFrequency || 60}
                      onChange={(e) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ 
                          ...prev, 
                          priceUpdateFrequency: parseInt(e.target.value) || 60 
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Order Sync</Label>
                    <Switch 
                      checked={marketplaceSettings?.enableOrderSync || true}
                      onCheckedChange={(checked) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ ...prev, enableOrderSync: checked }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Order Sync Frequency (minutes)</Label>
                    <Input 
                      type="number" 
                      value={marketplaceSettings?.orderSyncFrequency || 30}
                      onChange={(e) => 
                        setMarketplaceSettings((prev = defaultMarketplaceSettings) => ({ 
                          ...prev, 
                          orderSyncFrequency: parseInt(e.target.value) || 30 
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Shop Settings Tab */}
        <TabsContent value="shop" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Basic Shop Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shop Configuration
                </CardTitle>
                <CardDescription>Configure your online shop settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Shop</Label>
                  <Switch 
                    checked={shopSettings?.shopEnabled || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, shopEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input 
                    id="shopName"
                    value={shopSettings?.shopName || ''}
                    onChange={(e) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, shopName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopDescription">Shop Description</Label>
                  <Textarea 
                    id="shopDescription"
                    value={shopSettings?.shopDescription || ''}
                    onChange={(e) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, shopDescription: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopCurrency">Default Currency</Label>
                  <Select 
                    value={shopSettings?.shopCurrency || 'EUR'}
                    onValueChange={(value) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, shopCurrency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input 
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={shopSettings?.taxRate || 19}
                    onChange={(e) => 
                      setShopSettings((prev = defaultShopSettings) => ({ 
                        ...prev, 
                        taxRate: parseFloat(e.target.value) || 19 
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrencyDollar className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure accepted payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>PayPal</Label>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                  <Switch 
                    checked={shopSettings?.enablePaypal || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enablePaypal: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Stripe</Label>
                    <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                  </div>
                  <Switch 
                    checked={shopSettings?.enableStripe || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableStripe: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Klarna</Label>
                    <p className="text-sm text-muted-foreground">Buy now, pay later</p>
                  </div>
                  <Switch 
                    checked={shopSettings?.enableKlarna || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableKlarna: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (€)</Label>
                  <Input 
                    id="freeShippingThreshold"
                    type="number"
                    value={shopSettings?.freeShippingThreshold || 100}
                    onChange={(e) => 
                      setShopSettings((prev = defaultShopSettings) => ({ 
                        ...prev, 
                        freeShippingThreshold: parseFloat(e.target.value) || 100 
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shop Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Shop Features
              </CardTitle>
              <CardDescription>Enable or disable shop features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center justify-between">
                  <Label>Product Reviews</Label>
                  <Switch 
                    checked={shopSettings?.enableReviews || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableReviews: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Wishlist</Label>
                  <Switch 
                    checked={shopSettings?.enableWishlist || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableWishlist: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Compare Products</Label>
                  <Switch 
                    checked={shopSettings?.enableCompareProducts || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableCompareProducts: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Coupons</Label>
                  <Switch 
                    checked={shopSettings?.enableCoupons || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableCoupons: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Gift Cards</Label>
                  <Switch 
                    checked={shopSettings?.enableGiftCards || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableGiftCards: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Guest Checkout</Label>
                  <Switch 
                    checked={shopSettings?.enableGuestCheckout || true}
                    onCheckedChange={(checked) => 
                      setShopSettings((prev = defaultShopSettings) => ({ ...prev, enableGuestCheckout: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Settings Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Article className="h-5 w-5" />
                  Blog Configuration
                </CardTitle>
                <CardDescription>Configure your blog settings and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Blog</Label>
                  <Switch 
                    checked={blogSettings?.blogEnabled || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, blogEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blogTitle">Blog Title</Label>
                  <Input 
                    id="blogTitle"
                    value={blogSettings?.blogTitle || ''}
                    onChange={(e) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, blogTitle: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blogDescription">Blog Description</Label>
                  <Textarea 
                    id="blogDescription"
                    value={blogSettings?.blogDescription || ''}
                    onChange={(e) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, blogDescription: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input 
                    id="postsPerPage"
                    type="number"
                    value={blogSettings?.postsPerPage || 10}
                    onChange={(e) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ 
                        ...prev, 
                        postsPerPage: parseInt(e.target.value) || 10 
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Generate Posts</Label>
                    <p className="text-sm text-muted-foreground">
                      Use AI to generate blog posts automatically
                    </p>
                  </div>
                  <Switch 
                    checked={blogSettings?.autoGeneratePosts || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, autoGeneratePosts: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PaintBrush className="h-5 w-5" />
                  Blog Features
                </CardTitle>
                <CardDescription>Enable or disable blog features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Comments</Label>
                  <Switch 
                    checked={blogSettings?.enableComments || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, enableComments: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Social Sharing</Label>
                  <Switch 
                    checked={blogSettings?.enableSocialSharing || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, enableSocialSharing: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Newsletter Signup</Label>
                  <Switch 
                    checked={blogSettings?.enableNewsletterSignup || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, enableNewsletterSignup: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>RSS Feed</Label>
                  <Switch 
                    checked={blogSettings?.enableRSS || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, enableRSS: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SEO Optimization</Label>
                  <Switch 
                    checked={blogSettings?.enableSEO || true}
                    onCheckedChange={(checked) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, enableSEO: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postGenerationFrequency">Post Generation Frequency</Label>
                  <Select 
                    value={blogSettings?.postGenerationFrequency || 'weekly'}
                    onValueChange={(value) => 
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, postGenerationFrequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Facebook & Instagram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FacebookLogo className="h-5 w-5" />
                  Facebook & Instagram
                </CardTitle>
                <CardDescription>Configure Facebook and Instagram integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Facebook</Label>
                  <Switch 
                    checked={socialSettings?.facebookEnabled || true}
                    onCheckedChange={(checked) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, facebookEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebookPageId">Facebook Page ID</Label>
                  <Input 
                    id="facebookPageId"
                    value={socialSettings?.facebookPageId || ''}
                    onChange={(e) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, facebookPageId: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Instagram</Label>
                  <Switch 
                    checked={socialSettings?.instagramEnabled || true}
                    onCheckedChange={(checked) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, instagramEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramAccountId">Instagram Account ID</Label>
                  <Input 
                    id="instagramAccountId"
                    value={socialSettings?.instagramAccountId || ''}
                    onChange={(e) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, instagramAccountId: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Twitter & LinkedIn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TwitterLogo className="h-5 w-5" />
                  Twitter & LinkedIn
                </CardTitle>
                <CardDescription>Configure Twitter and LinkedIn integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Twitter</Label>
                  <Switch 
                    checked={socialSettings?.twitterEnabled || true}
                    onCheckedChange={(checked) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, twitterEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterApiKey">Twitter API Key</Label>
                  <Input 
                    id="twitterApiKey"
                    type="password"
                    value={socialSettings?.twitterApiKey || ''}
                    onChange={(e) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, twitterApiKey: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable LinkedIn</Label>
                  <Switch 
                    checked={socialSettings?.linkedinEnabled || true}
                    onCheckedChange={(checked) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, linkedinEnabled: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinCompanyId">LinkedIn Company ID</Label>
                  <Input 
                    id="linkedinCompanyId"
                    value={socialSettings?.linkedinCompanyId || ''}
                    onChange={(e) => 
                      setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, linkedinCompanyId: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="h-5 w-5" />
                Social Media Automation
              </CardTitle>
              <CardDescription>Configure automated social media posting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto-Post Products</Label>
                    <Switch 
                      checked={socialSettings?.autoPostProducts || true}
                      onCheckedChange={(checked) => 
                        setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, autoPostProducts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Auto-Post Blog Posts</Label>
                    <Switch 
                      checked={socialSettings?.autoPostBlogPosts || true}
                      onCheckedChange={(checked) => 
                        setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, autoPostBlogPosts: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Post Frequency</Label>
                    <Select 
                      value={socialSettings?.postFrequency || 'daily'}
                      onValueChange={(value) => 
                        setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, postFrequency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Enable Hashtags</Label>
                    <Switch 
                      checked={socialSettings?.enableHashtags || true}
                      onCheckedChange={(checked) => 
                        setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, enableHashtags: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultHashtags">Default Hashtags</Label>
                    <Textarea 
                      id="defaultHashtags"
                      placeholder="#medical #automotive #goodlink #germany"
                      value={socialSettings?.defaultHashtags || ''}
                      onChange={(e) => 
                        setSocialSettings((prev = defaultSocialSettings) => ({ ...prev, defaultHashtags: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Registered</p>
                    <p className="text-2xl font-bold text-blue-700">{userStats.totalRegistered.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Active Today</p>
                    <p className="text-2xl font-bold text-green-700">{userStats.activeToday.toLocaleString()}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">New This Week</p>
                    <p className="text-2xl font-bold text-purple-700">{userStats.newThisWeek}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">Premium Users</p>
                    <p className="text-2xl font-bold text-amber-700">{userStats.premiumUsers}</p>
                  </div>
                  <Shield className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Search, filter, and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Input placeholder="Search users by name or email..." className="flex-1" />
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Users
                  </Button>
                  <Button variant="outline">
                    <ListPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                
                <div className="border rounded-xl overflow-hidden">
                  <div className="p-4 border-b bg-muted/30">
                    <div className="grid grid-cols-6 gap-4 font-semibold text-sm">
                      <span>User</span>
                      <span>Email</span>
                      <span>Role</span>
                      <span>Status</span>
                      <span>Registration</span>
                      <span>Actions</span>
                    </div>
                  </div>
                  <div className="divide-y">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="p-4 hover:bg-muted/20 transition-colors">
                        <div className="grid grid-cols-6 gap-4 items-center text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-medium">U{i}</span>
                            </div>
                            <span className="font-medium">User {i}</span>
                          </div>
                          <span className="text-muted-foreground">user{i}@goodlink-germany.com</span>
                          <Badge variant={i === 1 ? "default" : "secondary"}>
                            {i === 1 ? "Admin" : "Customer"}
                          </Badge>
                          <Badge variant={i % 2 === 0 ? "default" : "secondary"} className={i % 2 === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                            {i % 2 === 0 ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-muted-foreground">2024-01-{String(i).padStart(2, '0')}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}