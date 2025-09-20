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
  Robot,
  ShoppingCart,
  CurrencyDollar,
  Package,
  ChartBar,
  FileText,
  Users,
  Globe,
  Share,
  ChatCircle,
  Warning,
  CheckCircle,
  Gear as Settings,
  Clock,
  Activity,
  TrendUp,
  Target,
  Lightbulb,
  Shield,
  Gauge,
  Lightning,
  Brain,
  Eye,
  Wrench,
  Sliders,
  Play,
  Pause,
  SkipForward,
  ArrowsClockwise,
  ListPlus,
  Trash,
  Copy,
  FloppyDisk,
  DownloadSimple,
  UploadSimple
} from '@phosphor-icons/react'
import { useLanguage } from '../LanguageContext'

// Agent Configuration Interfaces
interface BaseAgentConfig {
  id: string
  name: string
  description: string
  enabled: boolean
  automationLevel: 'manual' | 'assisted' | 'automatic'
  priority: 1 | 2 | 3 | 4 | 5
  lastActivity: string
  status: 'active' | 'idle' | 'error' | 'disabled'
  actionsToday: number
  successRate: number
}

interface ListingAgentConfig extends BaseAgentConfig {
  maxListingsPerDay: number
  autoPublish: boolean
  reviewBeforePublish: boolean
  supportedPlatforms: string[]
  titleOptimization: boolean
  keywordDensityTarget: number
  imageRequirements: {
    minCount: number
    maxCount: number
    requireMainImage: boolean
    backgroundRemoval: boolean
  }
  complianceChecks: string[]
  translationLanguages: string[]
}

interface PriceAgentConfig extends BaseAgentConfig {
  monitoringFrequency: number // minutes
  priceChangeThreshold: number // percentage
  maxPriceIncrease: number // percentage
  maxPriceDecrease: number // percentage
  competitorCount: number
  buyBoxOptimization: boolean
  dynamicPricing: boolean
  profitMarginMin: number // percentage
  repriceDelay: number // minutes
  marketplaceWeights: { [key: string]: number }
}

interface InventoryAgentConfig extends BaseAgentConfig {
  syncFrequency: number // minutes
  lowStockThreshold: number
  overStockThreshold: number
  autoReorder: boolean
  reorderQuantity: number
  leadTimeDays: number
  safetyStock: number
  demandForecastDays: number
  seasonalAdjustments: boolean
  supplierNotifications: boolean
}

interface ReviewAgentConfig extends BaseAgentConfig {
  monitoringFrequency: number // hours
  sentimentThresholds: {
    negative: number
    neutral: number
    positive: number
  }
  autoRespond: boolean
  responseDelay: number // hours
  escalationThreshold: number // rating
  keywordFilters: string[]
  languageDetection: boolean
  competitorAnalysis: boolean
}

interface BlogAgentConfig extends BaseAgentConfig {
  postFrequency: 'daily' | 'weekly' | 'monthly'
  contentTypes: string[]
  targetWordCount: number
  seoOptimization: boolean
  internalLinking: boolean
  autoPublish: boolean
  topicSuggestions: boolean
  imageGeneration: boolean
  socialDistribution: boolean
  contentCalendarDays: number
}

interface SocialAgentConfig extends BaseAgentConfig {
  platforms: string[]
  postFrequency: 'hourly' | 'daily' | 'weekly'
  contentMix: {
    products: number
    blog: number
    engagement: number
    promotional: number
  }
  hashtagStrategy: boolean
  optimalTiming: boolean
  engagementResponse: boolean
  crossPosting: boolean
  analytics: boolean
}

interface ChatbotConfig extends BaseAgentConfig {
  responseTime: number // seconds
  maxConversationLength: number
  escalationTriggers: string[]
  languages: string[]
  businessHours: {
    enabled: boolean
    timezone: string
    weekdays: { start: string; end: string }
    weekends: { start: string; end: string }
  }
  aiTemperature: number
  contextMemory: boolean
  handoffToHuman: boolean
  leadCapture: boolean
}

interface ProspectingAgentConfig extends BaseAgentConfig {
  searchFrequency: number // hours
  leadScoreThreshold: number
  sources: string[]
  maxLeadsPerDay: number
  autoOutreach: boolean
  emailTemplates: string[]
  followUpSequence: boolean
  crmIntegration: boolean
  complianceFilters: string[]
  geographicTargets: string[]
}

type AgentConfig = 
  | ListingAgentConfig 
  | PriceAgentConfig 
  | InventoryAgentConfig 
  | ReviewAgentConfig 
  | BlogAgentConfig 
  | SocialAgentConfig 
  | ChatbotConfig 
  | ProspectingAgentConfig

export function AgentAutomationConfig() {
  const { t } = useLanguage()
  
  // Default configurations for each agent type
  const defaultConfigs = {
    listing: {
      id: 'listing-agent',
      name: 'Listing Generation Agent',
      description: 'Automatically creates and optimizes product listings across marketplaces',
      enabled: true,
      automationLevel: 'assisted' as const,
      priority: 4,
      lastActivity: '2024-01-15 14:30:00',
      status: 'active' as const,
      actionsToday: 47,
      successRate: 94.5,
      maxListingsPerDay: 50,
      autoPublish: false,
      reviewBeforePublish: true,
      supportedPlatforms: ['amazon', 'ebay', 'kaufland', 'otto'],
      titleOptimization: true,
      keywordDensityTarget: 3.5,
      imageRequirements: {
        minCount: 3,
        maxCount: 9,
        requireMainImage: true,
        backgroundRemoval: true
      },
      complianceChecks: ['medical-device', 'ce-marking', 'rohs'],
      translationLanguages: ['de', 'en', 'fr', 'zh']
    } as ListingAgentConfig,
    
    pricing: {
      id: 'pricing-agent',
      name: 'Dynamic Pricing Agent',
      description: 'Monitors competitors and optimizes pricing for Buy Box win rate',
      enabled: true,
      automationLevel: 'automatic' as const,
      priority: 5,
      lastActivity: '2024-01-15 14:32:15',
      status: 'active' as const,
      actionsToday: 156,
      successRate: 87.3,
      monitoringFrequency: 30,
      priceChangeThreshold: 5.0,
      maxPriceIncrease: 15.0,
      maxPriceDecrease: 10.0,
      competitorCount: 8,
      buyBoxOptimization: true,
      dynamicPricing: true,
      profitMarginMin: 15.0,
      repriceDelay: 15,
      marketplaceWeights: {
        amazon: 0.6,
        ebay: 0.2,
        kaufland: 0.1,
        otto: 0.1
      }
    } as PriceAgentConfig,
    
    inventory: {
      id: 'inventory-agent',
      name: 'Inventory Sync Agent',
      description: 'Synchronizes inventory across all platforms and manages stock levels',
      enabled: true,
      automationLevel: 'automatic' as const,
      priority: 5,
      lastActivity: '2024-01-15 14:35:00',
      status: 'active' as const,
      actionsToday: 234,
      successRate: 99.2,
      syncFrequency: 15,
      lowStockThreshold: 10,
      overStockThreshold: 1000,
      autoReorder: true,
      reorderQuantity: 100,
      leadTimeDays: 14,
      safetyStock: 25,
      demandForecastDays: 30,
      seasonalAdjustments: true,
      supplierNotifications: true
    } as InventoryAgentConfig,
    
    review: {
      id: 'review-agent',
      name: 'Review Monitoring Agent',
      description: 'Monitors customer reviews and manages reputation across platforms',
      enabled: true,
      automationLevel: 'assisted' as const,
      priority: 3,
      lastActivity: '2024-01-15 14:28:45',
      status: 'active' as const,
      actionsToday: 23,
      successRate: 91.7,
      monitoringFrequency: 2,
      sentimentThresholds: {
        negative: 0.3,
        neutral: 0.7,
        positive: 0.9
      },
      autoRespond: false,
      responseDelay: 4,
      escalationThreshold: 3,
      keywordFilters: ['defect', 'broken', 'fake', 'counterfeit'],
      languageDetection: true,
      competitorAnalysis: true
    } as ReviewAgentConfig,
    
    blog: {
      id: 'blog-agent',
      name: 'Content Generation Agent',
      description: 'Creates SEO-optimized blog content about medical devices and automotive parts',
      enabled: true,
      automationLevel: 'assisted' as const,
      priority: 2,
      lastActivity: '2024-01-15 12:00:00',
      status: 'active' as const,
      actionsToday: 3,
      successRate: 88.9,
      postFrequency: 'weekly',
      contentTypes: ['product-guides', 'industry-news', 'technical-articles', 'case-studies'],
      targetWordCount: 1500,
      seoOptimization: true,
      internalLinking: true,
      autoPublish: false,
      topicSuggestions: true,
      imageGeneration: true,
      socialDistribution: true,
      contentCalendarDays: 30
    } as BlogAgentConfig,
    
    social: {
      id: 'social-agent',
      name: 'Social Media Agent',
      description: 'Manages social media presence and engagement across platforms',
      enabled: true,
      automationLevel: 'assisted' as const,
      priority: 2,
      lastActivity: '2024-01-15 13:15:30',
      status: 'active' as const,
      actionsToday: 8,
      successRate: 85.4,
      platforms: ['facebook', 'instagram', 'twitter', 'linkedin'],
      postFrequency: 'daily',
      contentMix: {
        products: 40,
        blog: 30,
        engagement: 20,
        promotional: 10
      },
      hashtagStrategy: true,
      optimalTiming: true,
      engagementResponse: true,
      crossPosting: true,
      analytics: true
    } as SocialAgentConfig,
    
    chatbot: {
      id: 'chatbot-agent',
      name: 'Customer Service Chatbot',
      description: 'Provides 24/7 customer support in multiple languages',
      enabled: true,
      automationLevel: 'automatic' as const,
      priority: 4,
      lastActivity: '2024-01-15 14:35:22',
      status: 'active' as const,
      actionsToday: 89,
      successRate: 92.1,
      responseTime: 3,
      maxConversationLength: 20,
      escalationTriggers: ['complaint', 'refund', 'technical-issue'],
      languages: ['de', 'en', 'fr', 'zh'],
      businessHours: {
        enabled: true,
        timezone: 'Europe/Berlin',
        weekdays: { start: '09:00', end: '18:00' },
        weekends: { start: '10:00', end: '16:00' }
      },
      aiTemperature: 0.7,
      contextMemory: true,
      handoffToHuman: true,
      leadCapture: true
    } as ChatbotConfig,
    
    prospecting: {
      id: 'prospecting-agent',
      name: 'Lead Prospecting Agent',
      description: 'Identifies and qualifies potential B2B customers in medical and automotive sectors',
      enabled: true,
      automationLevel: 'manual' as const,
      priority: 3,
      lastActivity: '2024-01-15 10:30:00',
      status: 'active' as const,
      actionsToday: 12,
      successRate: 76.8,
      searchFrequency: 24,
      leadScoreThreshold: 70,
      sources: ['linkedin', 'company-databases', 'industry-directories'],
      maxLeadsPerDay: 25,
      autoOutreach: false,
      emailTemplates: ['introduction', 'follow-up', 'technical-inquiry'],
      followUpSequence: true,
      crmIntegration: true,
      complianceFilters: ['gdpr', 'medical-regulation'],
      geographicTargets: ['germany', 'eu', 'switzerland']
    } as ProspectingAgentConfig
  }

  const [agents, setAgents] = useKV<{ [key: string]: AgentConfig }>('agent-automation-configs', defaultConfigs)
  const [selectedAgent, setSelectedAgent] = useState<string>('listing')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateAgentConfig = (agentId: string, updates: Partial<AgentConfig>) => {
    setAgents(prev => ({
      ...(prev || {}),
      [agentId]: {
        ...(prev?.[agentId] || {}),
        ...updates
      } as AgentConfig
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'idle': return 'bg-yellow-100 text-yellow-800 border-yellow-200'  
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'disabled': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'idle': return <Clock className="h-4 w-4" />
      case 'error': return <Warning className="h-4 w-4" />
      case 'disabled': return <Pause className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getAutomationLevelColor = (level: string) => {
    switch (level) {
      case 'automatic': return 'bg-green-100 text-green-800'
      case 'assisted': return 'bg-blue-100 text-blue-800'
      case 'manual': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderAgentCard = (agent: AgentConfig) => (
    <Card 
      key={agent.id}
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selectedAgent === (agent.id || '').split('-')[0] ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      onClick={() => setSelectedAgent((agent.id || '').split('-')[0])}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Robot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <Switch 
            checked={agent.enabled}
            onCheckedChange={(checked) => 
              updateAgentConfig(agent.id, { enabled: checked })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className={getStatusColor(agent.status)}>
                {getStatusIcon(agent.status)}
                <span className="ml-1 capitalize">{agent.status}</span>
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Automation</span>
              <Badge className={getAutomationLevelColor(agent.automationLevel)}>
                <span className="capitalize">{agent.automationLevel}</span>
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Actions Today</span>
              <span className="font-semibold">{agent.actionsToday}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="font-semibold text-green-600">{agent.successRate}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`flex-1 h-2 rounded-full overflow-hidden ${
            agent.priority >= 4 ? 'bg-green-200' : agent.priority >= 3 ? 'bg-yellow-200' : 'bg-red-200'
          }`}>
            <div 
              className={`h-full transition-all ${
                agent.priority >= 4 ? 'bg-green-500' : agent.priority >= 3 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${agent.priority * 20}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">Priority {agent.priority}</span>
        </div>
      </CardContent>
    </Card>
  )

  const renderAgentConfiguration = (): React.ReactNode => {
    const agent = agents?.[selectedAgent] || agents?.listing
    if (!agent) return null

    const commonControls = (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Basic Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Agent Enabled</Label>
                <p className="text-sm text-muted-foreground">Enable or disable this agent</p>
              </div>
              <Switch 
                checked={agent.enabled}
                onCheckedChange={(checked) => 
                  updateAgentConfig(agent.id, { enabled: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Automation Level</Label>
              <Select 
                value={agent.automationLevel}
                onValueChange={(value: 'manual' | 'assisted' | 'automatic') => 
                  updateAgentConfig(agent.id, { automationLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual - Requires approval for all actions</SelectItem>
                  <SelectItem value="assisted">Assisted - AI suggests, human approves</SelectItem>
                  <SelectItem value="automatic">Automatic - AI acts autonomously within limits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority Level: {agent.priority}</Label>
              <Slider
                value={[agent.priority]}
                onValueChange={(values) => 
                  updateAgentConfig(agent.id, { priority: values[0] as 1 | 2 | 3 | 4 | 5 })
                }
                min={1}
                max={5}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{agent.actionsToday}</div>
                <div className="text-sm text-muted-foreground">Actions Today</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{agent.successRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last Activity</span>
                <span className="text-muted-foreground">{agent.lastActivity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Status</span>
                <Badge className={getStatusColor(agent.status)}>
                  {getStatusIcon(agent.status)}
                  <span className="ml-1 capitalize">{agent.status}</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )

    // Agent-specific configuration based on type
    let specificConfig: React.ReactNode = null

    if (selectedAgent === 'listing' && 'maxListingsPerDay' in agent) {
      const listingAgent = agent as ListingAgentConfig
      specificConfig = (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListPlus className="h-5 w-5" />
                Listing Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Max Listings Per Day</Label>
                <Input 
                  type="number"
                  value={listingAgent.maxListingsPerDay}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { maxListingsPerDay: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Publish</Label>
                  <p className="text-sm text-muted-foreground">Automatically publish approved listings</p>
                </div>
                <Switch 
                  checked={listingAgent.autoPublish}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { autoPublish: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Review Before Publish</Label>
                  <p className="text-sm text-muted-foreground">Require human review before publishing</p>
                </div>
                <Switch 
                  checked={listingAgent.reviewBeforePublish}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { reviewBeforePublish: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Keyword Density Target (%)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={listingAgent.keywordDensityTarget}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { keywordDensityTarget: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Image Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Images</Label>
                  <Input 
                    type="number"
                    value={listingAgent.imageRequirements.minCount}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { 
                        imageRequirements: { 
                          ...listingAgent.imageRequirements, 
                          minCount: parseInt(e.target.value) || 0 
                        }
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Images</Label>
                  <Input 
                    type="number"
                    value={listingAgent.imageRequirements.maxCount}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { 
                        imageRequirements: { 
                          ...listingAgent.imageRequirements, 
                          maxCount: parseInt(e.target.value) || 0 
                        }
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Require Main Image</Label>
                <Switch 
                  checked={listingAgent.imageRequirements.requireMainImage}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { 
                      imageRequirements: { 
                        ...listingAgent.imageRequirements, 
                        requireMainImage: checked 
                      }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Background Removal</Label>
                <Switch 
                  checked={listingAgent.imageRequirements.backgroundRemoval}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { 
                      imageRequirements: { 
                        ...listingAgent.imageRequirements, 
                        backgroundRemoval: checked 
                      }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (selectedAgent === 'pricing' && 'monitoringFrequency' in agent) {
      const pricingAgent = agent as PriceAgentConfig
      specificConfig = (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="h-5 w-5" />
                Pricing Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Monitoring Frequency (minutes)</Label>
                <Input 
                  type="number"
                  value={pricingAgent.monitoringFrequency}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { monitoringFrequency: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Price Change Threshold (%)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={pricingAgent.priceChangeThreshold}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { priceChangeThreshold: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Price Increase (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={pricingAgent.maxPriceIncrease}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { maxPriceIncrease: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Price Decrease (%)</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={pricingAgent.maxPriceDecrease}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { maxPriceDecrease: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Minimum Profit Margin (%)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={pricingAgent.profitMarginMin}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { profitMarginMin: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Optimization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Buy Box Optimization</Label>
                  <p className="text-sm text-muted-foreground">Focus on winning Buy Box</p>
                </div>
                <Switch 
                  checked={pricingAgent.buyBoxOptimization}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { buyBoxOptimization: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dynamic Pricing</Label>
                  <p className="text-sm text-muted-foreground">Automatic price adjustments</p>
                </div>
                <Switch 
                  checked={pricingAgent.dynamicPricing}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { dynamicPricing: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Competitors to Monitor</Label>
                <Input 
                  type="number"
                  value={pricingAgent.competitorCount}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { competitorCount: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Reprice Delay (minutes)</Label>
                <Input 
                  type="number"
                  value={pricingAgent.repriceDelay}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { repriceDelay: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (selectedAgent === 'inventory' && 'syncFrequency' in agent) {
      const inventoryAgent = agent as InventoryAgentConfig
      specificConfig = (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Stock Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sync Frequency (minutes)</Label>
                <Input 
                  type="number"
                  value={inventoryAgent.syncFrequency}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { syncFrequency: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Low Stock Threshold</Label>
                  <Input 
                    type="number"
                    value={inventoryAgent.lowStockThreshold}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { lowStockThreshold: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Overstock Threshold</Label>
                  <Input 
                    type="number"
                    value={inventoryAgent.overStockThreshold}
                    onChange={(e) => 
                      updateAgentConfig(agent.id, { overStockThreshold: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Reorder</Label>
                  <p className="text-sm text-muted-foreground">Automatically reorder low stock items</p>
                </div>
                <Switch 
                  checked={inventoryAgent.autoReorder}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { autoReorder: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Reorder Quantity</Label>
                <Input 
                  type="number"
                  value={inventoryAgent.reorderQuantity}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { reorderQuantity: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="h-5 w-5" />
                Demand Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Lead Time (days)</Label>
                <Input 
                  type="number"
                  value={inventoryAgent.leadTimeDays}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { leadTimeDays: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Safety Stock</Label>
                <Input 
                  type="number"
                  value={inventoryAgent.safetyStock}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { safetyStock: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Forecast Period (days)</Label>
                <Input 
                  type="number"
                  value={inventoryAgent.demandForecastDays}
                  onChange={(e) => 
                    updateAgentConfig(agent.id, { demandForecastDays: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Seasonal Adjustments</Label>
                <Switch 
                  checked={inventoryAgent.seasonalAdjustments}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { seasonalAdjustments: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Supplier Notifications</Label>
                <Switch 
                  checked={inventoryAgent.supplierNotifications}
                  onCheckedChange={(checked) => 
                    updateAgentConfig(agent.id, { supplierNotifications: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {commonControls}
        {specificConfig}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Agent Automation Control
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Configure individual agent automation levels, thresholds, and performance parameters
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg">
            <DownloadSimple className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline" size="lg">
            <UploadSimple className="h-4 w-4 mr-2" />
            Import Config
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
            <FloppyDisk className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Agent Overview Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {Object.values(agents || {}).map(agent => renderAgentCard(agent))}
      </div>

      {/* Detailed Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            {agents?.[selectedAgent]?.name || 'Agent'} Configuration
          </CardTitle>
          <CardDescription>
            Configure detailed settings and automation parameters for this agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderAgentConfiguration()}
        </CardContent>
      </Card>

      {/* Global Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightning className="h-5 w-5" />
            Global Agent Controls
          </CardTitle>
          <CardDescription>System-wide agent management and emergency controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Start All Agents
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              <Pause className="h-4 w-4 mr-2" />
              Pause All Agents
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <ArrowsClockwise className="h-4 w-4 mr-2" />
              Restart All Agents
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Warning className="h-4 w-4 mr-2" />
              Emergency Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}