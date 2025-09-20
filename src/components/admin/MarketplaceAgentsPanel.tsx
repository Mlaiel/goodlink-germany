import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Robot,
  Storefront,
  Package,
  CurrencyDollar,
  TrendUp,
  Eye,
  ChartLine,
  Database,
  Lightning,
  Gear,
  CheckCircle,
  Warning,
  Clock,
  ShoppingCart,
  Star,
  Globe,
  Translate,
  PaintBrush,
  Image,
  FileText,
  Bell,
  DiscordLogo,
  TelegramLogo,
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  ListPlus,
  MagnifyingGlass,
  CloudCheck,
  ArrowsClockwise,
  Shield
} from '@phosphor-icons/react'
import { useLanguage } from '@/components/LanguageContext'

interface MarketplaceAgentConfig {
  id: string
  name: string
  type: 'listing' | 'pricing' | 'inventory' | 'review' | 'advertising' | 'content' | 'social'
  enabled: boolean
  target_marketplaces: string[]
  automation_level: 'manual' | 'semi-automatic' | 'fully-automatic'
  update_frequency: number // minutes
  confidence_threshold: number
  performance_metrics: {
    tasks_completed: number
    success_rate: number
    avg_response_time: number
    last_run: string
  }
  settings: Record<string, any>
}

interface MarketplaceConfig {
  id: string
  name: string
  enabled: boolean
  api_connected: boolean
  sync_frequency: number
  last_sync: string
  supported_features: string[]
}

export function MarketplaceAgentsPanel() {
  const { t } = useLanguage()
  
  const defaultMarketplaces: MarketplaceConfig[] = [
    {
      id: 'amazon',
      name: 'Amazon',
      enabled: true,
      api_connected: true,
      sync_frequency: 15,
      last_sync: '2024-01-15 14:32:00',
      supported_features: ['listings', 'inventory', 'orders', 'reviews', 'advertising']
    },
    {
      id: 'ebay',
      name: 'eBay',
      enabled: true,
      api_connected: true,
      sync_frequency: 30,
      last_sync: '2024-01-15 14:28:00',
      supported_features: ['listings', 'inventory', 'orders', 'reviews']
    },
    {
      id: 'otto',
      name: 'OTTO',
      enabled: true,
      api_connected: false,
      sync_frequency: 60,
      last_sync: '2024-01-15 13:45:00',
      supported_features: ['listings', 'inventory', 'orders']
    },
    {
      id: 'kaufland',
      name: 'Kaufland',
      enabled: true,
      api_connected: true,
      sync_frequency: 45,
      last_sync: '2024-01-15 14:15:00',
      supported_features: ['listings', 'inventory', 'orders', 'reviews']
    },
    {
      id: 'cdiscount',
      name: 'Cdiscount',
      enabled: false,
      api_connected: false,
      sync_frequency: 120,
      last_sync: '2024-01-14 16:20:00',
      supported_features: ['listings', 'inventory', 'orders']
    },
    {
      id: 'bol',
      name: 'bol.com',
      enabled: true,
      api_connected: true,
      sync_frequency: 30,
      last_sync: '2024-01-15 14:30:00',
      supported_features: ['listings', 'inventory', 'orders', 'reviews']
    }
  ]

  const defaultAgents: MarketplaceAgentConfig[] = [
    {
      id: 'listing-generator',
      name: 'Listing Generation Agent',
      type: 'listing',
      enabled: true,
      target_marketplaces: ['amazon', 'ebay', 'otto', 'kaufland'],
      automation_level: 'semi-automatic',
      update_frequency: 1440, // daily
      confidence_threshold: 85,
      performance_metrics: {
        tasks_completed: 1247,
        success_rate: 94.2,
        avg_response_time: 3.4,
        last_run: '2024-01-15 09:00:00'
      },
      settings: {
        generate_titles: true,
        generate_descriptions: true,
        generate_bullet_points: true,
        generate_keywords: true,
        auto_translate: true,
        supported_languages: ['de', 'en', 'fr'],
        compliance_check: true,
        seo_optimization: true,
        marketplace_specific_rules: true
      }
    },
    {
      id: 'dynamic-pricing',
      name: 'Dynamic Pricing Agent',
      type: 'pricing',
      enabled: true,
      target_marketplaces: ['amazon', 'ebay', 'kaufland', 'bol'],
      automation_level: 'fully-automatic',
      update_frequency: 60,
      confidence_threshold: 90,
      performance_metrics: {
        tasks_completed: 3456,
        success_rate: 91.8,
        avg_response_time: 1.2,
        last_run: '2024-01-15 14:30:00'
      },
      settings: {
        monitor_competitors: true,
        buybox_optimization: true,
        margin_protection: true,
        min_margin_percent: 15,
        max_price_increase: 20,
        price_change_frequency: 60,
        dynamic_repricing: true,
        seasonal_adjustments: true,
        demand_based_pricing: true
      }
    },
    {
      id: 'inventory-sync',
      name: 'Inventory Synchronization Agent',
      type: 'inventory',
      enabled: true,
      target_marketplaces: ['amazon', 'ebay', 'otto', 'kaufland', 'bol'],
      automation_level: 'fully-automatic',
      update_frequency: 15,
      confidence_threshold: 95,
      performance_metrics: {
        tasks_completed: 8934,
        success_rate: 98.7,
        avg_response_time: 0.8,
        last_run: '2024-01-15 14:35:00'
      },
      settings: {
        real_time_sync: true,
        low_stock_alerts: true,
        low_stock_threshold: 10,
        auto_reorder: false,
        safety_stock_level: 5,
        oversell_protection: true,
        multi_warehouse_support: true,
        allocation_strategy: 'fifo'
      }
    },
    {
      id: 'review-monitor',
      name: 'Review & Feedback Monitor',
      type: 'review',
      enabled: true,
      target_marketplaces: ['amazon', 'ebay', 'kaufland', 'bol'],
      automation_level: 'semi-automatic',
      update_frequency: 30,
      confidence_threshold: 80,
      performance_metrics: {
        tasks_completed: 567,
        success_rate: 87.3,
        avg_response_time: 2.1,
        last_run: '2024-01-15 14:20:00'
      },
      settings: {
        sentiment_analysis: true,
        auto_respond_positive: false,
        auto_respond_negative: true,
        escalate_critical_reviews: true,
        review_request_automation: true,
        competitor_review_monitoring: true,
        review_analytics: true,
        response_templates: true
      }
    },
    {
      id: 'content-optimizer',
      name: 'Content Optimization Agent',
      type: 'content',
      enabled: true,
      target_marketplaces: ['amazon', 'ebay', 'otto'],
      automation_level: 'semi-automatic',
      update_frequency: 2880, // twice daily
      confidence_threshold: 75,
      performance_metrics: {
        tasks_completed: 234,
        success_rate: 89.5,
        avg_response_time: 5.2,
        last_run: '2024-01-15 06:00:00'
      },
      settings: {
        image_optimization: true,
        a_plus_content_generation: true,
        enhanced_brand_content: true,
        video_content_creation: false,
        lifestyle_images: true,
        comparison_charts: true,
        technical_specifications: true,
        compliance_images: true
      }
    },
    {
      id: 'social-media-agent',
      name: 'Social Media Marketing Agent',
      type: 'social',
      enabled: true,
      target_marketplaces: ['facebook', 'instagram', 'twitter', 'linkedin'],
      automation_level: 'semi-automatic',
      update_frequency: 240, // every 4 hours
      confidence_threshold: 70,
      performance_metrics: {
        tasks_completed: 145,
        success_rate: 83.7,
        avg_response_time: 4.1,
        last_run: '2024-01-15 12:00:00'
      },
      settings: {
        auto_post_new_products: true,
        auto_post_promotions: true,
        auto_post_blog_articles: true,
        hashtag_optimization: true,
        cross_platform_posting: true,
        engagement_monitoring: true,
        social_listening: true,
        influencer_outreach: false
      }
    }
  ]

  const [marketplaces, setMarketplaces] = useKV<MarketplaceConfig[]>('marketplace-configs', defaultMarketplaces)
  const [agents, setAgents] = useKV<MarketplaceAgentConfig[]>('marketplace-agents-config', defaultAgents)
  const [selectedAgent, setSelectedAgent] = useState<string>(defaultAgents[0].id)
  const [activeTab, setActiveTab] = useState('agents')

  const currentAgent = agents?.find(agent => agent.id === selectedAgent) || defaultAgents[0]

  const updateAgent = (agentId: string, updates: Partial<MarketplaceAgentConfig>) => {
    setAgents((prev = defaultAgents) => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, ...updates } : agent
      )
    )
  }

  const updateMarketplace = (marketplaceId: string, updates: Partial<MarketplaceConfig>) => {
    setMarketplaces((prev = defaultMarketplaces) => 
      prev.map(marketplace => 
        marketplace.id === marketplaceId ? { ...marketplace, ...updates } : marketplace
      )
    )
  }

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'listing': return <ListPlus className="h-5 w-5 text-blue-500" />
      case 'pricing': return <CurrencyDollar className="h-5 w-5 text-green-500" />
      case 'inventory': return <Package className="h-5 w-5 text-purple-500" />
      case 'review': return <Star className="h-5 w-5 text-yellow-500" />
      case 'advertising': return <TrendUp className="h-5 w-5 text-red-500" />
      case 'content': return <PaintBrush className="h-5 w-5 text-pink-500" />
      case 'social': return <Globe className="h-5 w-5 text-indigo-500" />
      default: return <Robot className="h-5 w-5 text-gray-500" />
    }
  }

  const getMarketplaceIcon = (id: string) => {
    switch (id) {
      case 'amazon': return <Package className="h-4 w-4 text-orange-500" />
      case 'ebay': return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case 'otto': return <Storefront className="h-4 w-4 text-red-500" />
      case 'kaufland': return <Package className="h-4 w-4 text-blue-600" />
      case 'cdiscount': return <ShoppingCart className="h-4 w-4 text-orange-600" />
      case 'bol': return <Package className="h-4 w-4 text-blue-400" />
      case 'facebook': return <FacebookLogo className="h-4 w-4 text-blue-600" />
      case 'instagram': return <InstagramLogo className="h-4 w-4 text-pink-500" />
      case 'twitter': return <TwitterLogo className="h-4 w-4 text-blue-400" />
      case 'linkedin': return <Globe className="h-4 w-4 text-blue-700" />
      default: return <Globe className="h-4 w-4 text-gray-500" />
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600'
    if (rate >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Marketplace AI Agents
          </h2>
          <p className="text-muted-foreground">
            Configure automated AI agents for marketplace management and optimization
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <MagnifyingGlass className="h-4 w-4 mr-2" />
            Test All Agents
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <CloudCheck className="h-4 w-4 mr-2" />
            Deploy Configuration
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Agents</p>
                <p className="text-2xl font-bold text-blue-700">
                  {agents?.filter(a => a.enabled).length || 0}
                </p>
              </div>
              <Robot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Connected Marketplaces</p>
                <p className="text-2xl font-bold text-green-700">
                  {marketplaces?.filter(m => m.enabled && m.api_connected).length || 0}
                </p>
              </div>
              <Storefront className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Tasks Today</p>
                <p className="text-2xl font-bold text-purple-700">14,234</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Success Rate</p>
                <p className="text-2xl font-bold text-orange-700">93.2%</p>
              </div>
              <TrendUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Agent Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Available Agents</h3>
              {agents?.map((agent) => (
                <Card 
                  key={agent.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedAgent === agent.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {getAgentIcon(agent.type)}
                      <Badge variant={agent.enabled ? "default" : "secondary"}>
                        {agent.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {agent.automation_level.replace('-', ' ')}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Success</span>
                      <span className={`font-semibold ${getSuccessRateColor(agent.performance_metrics.success_rate)}`}>
                        {agent.performance_metrics.success_rate}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Agent Configuration */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getAgentIcon(currentAgent.type)}
                    {currentAgent.name}
                  </CardTitle>
                  <CardDescription>
                    Configure the {currentAgent.type} automation agent settings and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Agent Status</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Agent</span>
                        <Switch 
                          checked={currentAgent.enabled}
                          onCheckedChange={(checked) => 
                            updateAgent(currentAgent.id, { enabled: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Automation Level</Label>
                      <Select 
                        value={currentAgent.automation_level}
                        onValueChange={(value: any) => 
                          updateAgent(currentAgent.id, { automation_level: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                          <SelectItem value="fully-automatic">Fully Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Update Frequency (minutes)</Label>
                      <Input 
                        type="number" 
                        value={currentAgent.update_frequency}
                        onChange={(e) => 
                          updateAgent(currentAgent.id, { 
                            update_frequency: parseInt(e.target.value) || 60 
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Confidence Threshold (%)</Label>
                    <Slider
                      value={[currentAgent.confidence_threshold]}
                      onValueChange={([value]) => 
                        updateAgent(currentAgent.id, { confidence_threshold: value })
                      }
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Current: {currentAgent.confidence_threshold}% - Agent will only act when confidence is above this threshold
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Marketplaces</Label>
                    <div className="grid gap-2 md:grid-cols-3">
                      {marketplaces?.filter(m => m.enabled).map((marketplace) => (
                        <div key={marketplace.id} className="flex items-center justify-between p-2 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getMarketplaceIcon(marketplace.id)}
                            <span className="text-sm">{marketplace.name}</span>
                          </div>
                          <Switch 
                            checked={currentAgent.target_marketplaces.includes(marketplace.id)}
                            onCheckedChange={(checked) => {
                              const newTargets = checked 
                                ? [...currentAgent.target_marketplaces, marketplace.id]
                                : currentAgent.target_marketplaces.filter(id => id !== marketplace.id)
                              updateAgent(currentAgent.id, { target_marketplaces: newTargets })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent-Specific Settings */}
                  <div className="space-y-4">
                    <Label>Agent-Specific Settings</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      {Object.entries(currentAgent.settings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-sm capitalize">
                              {key.replace(/_/g, ' ')}
                            </span>
                            {typeof value === 'number' && (
                              <p className="text-xs text-muted-foreground">
                                Current: {value}{key.includes('percent') ? '%' : ''}
                              </p>
                            )}
                          </div>
                          {typeof value === 'boolean' ? (
                            <Switch 
                              checked={value}
                              onCheckedChange={(checked) => 
                                updateAgent(currentAgent.id, {
                                  settings: {
                                    ...currentAgent.settings,
                                    [key]: checked
                                  }
                                })
                              }
                            />
                          ) : typeof value === 'number' ? (
                            <Input 
                              type="number"
                              value={value}
                              onChange={(e) => 
                                updateAgent(currentAgent.id, {
                                  settings: {
                                    ...currentAgent.settings,
                                    [key]: parseFloat(e.target.value) || 0
                                  }
                                })
                              }
                              className="w-20"
                            />
                          ) : (
                            <Badge variant="outline">
                              {String(value)}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartLine className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {currentAgent.performance_metrics.tasks_completed.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${getSuccessRateColor(currentAgent.performance_metrics.success_rate)}`}>
                        {currentAgent.performance_metrics.success_rate}%
                      </p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {currentAgent.performance_metrics.avg_response_time}s
                      </p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Last Run</p>
                      <p className="text-sm">{currentAgent.performance_metrics.last_run}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="marketplaces" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {marketplaces?.map((marketplace) => (
              <Card key={marketplace.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getMarketplaceIcon(marketplace.id)}
                      {marketplace.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={marketplace.enabled ? "default" : "secondary"}>
                        {marketplace.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Badge variant={marketplace.api_connected ? "default" : "destructive"} className={
                        marketplace.api_connected ? "bg-green-100 text-green-700" : ""
                      }>
                        {marketplace.api_connected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Marketplace</Label>
                    <Switch 
                      checked={marketplace.enabled}
                      onCheckedChange={(checked) => 
                        updateMarketplace(marketplace.id, { enabled: checked })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sync Frequency (minutes)</Label>
                    <Input 
                      type="number" 
                      value={marketplace.sync_frequency}
                      onChange={(e) => 
                        updateMarketplace(marketplace.id, { 
                          sync_frequency: parseInt(e.target.value) || 60 
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Supported Features</Label>
                    <div className="flex gap-1 flex-wrap">
                      {marketplace.supported_features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last sync: {marketplace.last_sync}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ArrowsClockwise className="h-3 w-3 mr-1" />
                      Sync Now
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Gear className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="h-5 w-5" />
                Global Automation Rules
              </CardTitle>
              <CardDescription>
                Configure global rules that apply to all marketplace agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Safety Rules</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Human Approval</Label>
                        <p className="text-xs text-muted-foreground">
                          For critical actions above confidence threshold
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emergency Stop</Label>
                        <p className="text-xs text-muted-foreground">
                          Stop all automation if error rate exceeds 10%
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Rate Limiting</Label>
                        <p className="text-xs text-muted-foreground">
                          Respect API rate limits for all marketplaces
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Rules</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Success Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Notify on successful automated actions
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Error Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Immediate notification on automation errors
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Daily Reports</Label>
                        <p className="text-xs text-muted-foreground">
                          Daily summary of all automation activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Business Hours</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Operating Hours</Label>
                    <Select defaultValue="24/7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24/7">24/7 Operation</SelectItem>
                        <SelectItem value="business">Business Hours Only</SelectItem>
                        <SelectItem value="custom">Custom Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="Europe/Berlin">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Holiday Schedule</Label>
                    <Select defaultValue="eu">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eu">European Holidays</SelectItem>
                        <SelectItem value="us">US Holidays</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
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