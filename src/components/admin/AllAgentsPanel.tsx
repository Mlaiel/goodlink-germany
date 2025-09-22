import React, { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"
import {
  Robot,
  ShoppingCart,
  TrendUp,
  ChatCircle,
  Camera,
  FileText,
  Globe,
  Users,
  WhatsappLogo,
  DiscordLogo,
  TelegramLogo,
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
  Lightning,
  Brain,
  Gear,
  Play,
  Pause,
  CheckCircle,
  Warning,
  Activity,
  CurrencyDollar,
  Package,
  Eye,
  ChartBar,
  Calendar,
  Target,
  Palette,
  Storefront,
  ShoppingBag,
  FloppyDisk
} from "@phosphor-icons/react"

interface Agent {
  id: string
  name: string
  description: string
  category: "marketplace" | "social" | "messaging" | "ai" | "analytics" | "content"
  status: "active" | "paused" | "training" | "error"
  iconType: string
  platform?: string
  performance: {
    successRate: number
    tasksCompleted: number
    revenue?: number
  }
  settings: Record<string, any>
}

export function AllAgentsPanel() {
  const { t } = useLanguage()
  const [agents, setAgents] = useKV<Agent[]>("all-agents", getDefaultAgents())
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("marketplace")

  // Function to render icons based on type
  const renderIcon = (iconType: string) => {
    const iconProps = { className: "h-5 w-5" }
    switch (iconType) {
      case "shopping-cart": return <ShoppingCart {...iconProps} />
      case "shopping-bag": return <ShoppingBag {...iconProps} />
      case "storefront": return <Storefront {...iconProps} />
      case "globe": return <Globe {...iconProps} />
      case "facebook": return <FacebookLogo {...iconProps} />
      case "instagram": return <InstagramLogo {...iconProps} />
      case "linkedin": return <LinkedinLogo {...iconProps} />
      case "youtube": return <YoutubeLogo {...iconProps} />
      case "twitter": return <TwitterLogo {...iconProps} />
      case "whatsapp": return <WhatsappLogo {...iconProps} />
      case "telegram": return <TelegramLogo {...iconProps} />
      case "discord": return <DiscordLogo {...iconProps} />
      case "file-text": return <FileText {...iconProps} />
      case "users": return <Users {...iconProps} />
      case "camera": return <Camera {...iconProps} />
      case "currency-dollar": return <CurrencyDollar {...iconProps} />
      case "chart-bar": return <ChartBar {...iconProps} />
      default: return <Robot {...iconProps} />
    }
  }

  function getDefaultAgents(): Agent[] {
    return [
      // Marketplace Agents
      {
        id: "amazon-listing",
        name: "Amazon Listing Agent",
        description: "Manages Amazon listings automatically with SEO optimization",
        category: "marketplace",
        status: "active",
        iconType: "shopping-cart",
        platform: "Amazon",
        performance: { successRate: 94, tasksCompleted: 1247, revenue: 25400 },
        settings: {
          autoOptimization: true,
          keywordDensity: 8,
          priceMonitoring: true,
          competitorTracking: true,
          buyBoxStrategy: "aggressive",
          reviewManagement: true
        }
      },
      {
        id: "ebay-sync",
        name: "eBay Sync Agent",
        description: "Synchronizes eBay inventory and orders in real time",
        category: "marketplace",
        status: "active",
        iconType: "shopping-bag",
        platform: "eBay",
        performance: { successRate: 87, tasksCompleted: 892, revenue: 18900 },
        settings: {
          syncInterval: 15,
          autoReprice: true,
          stockAlerts: true,
          categoryMapping: true
        }
      },
      {
        id: "otto-agent",
        name: "OTTO Marketplace Agent",
        description: "Specialized agent for the German OTTO platform",
        category: "marketplace",
        status: "active",
        iconType: "storefront",
        platform: "OTTO",
        performance: { successRate: 91, tasksCompleted: 567, revenue: 12300 },
        settings: {
          germanCompliance: true,
          vatHandling: "automatic",
          shippingOptimization: true
        }
      },
      {
        id: "kaufland-agent",
        name: "Kaufland Agent",
        description: "Automated management of Kaufland listings",
        category: "marketplace",
        status: "active",
        iconType: "shopping-cart",
        platform: "Kaufland",
        performance: { successRate: 89, tasksCompleted: 423, revenue: 9800 },
        settings: {
          autoTranslation: true,
          priceComparison: true,
          bulkOperations: true
        }
      },
      {
        id: "cdiscount-agent",
        name: "Cdiscount Agent",
        description: "Agent for French Cdiscount marketplace",
        category: "marketplace",
        status: "active",
        iconType: "globe",
        platform: "Cdiscount",
        performance: { successRate: 85, tasksCompleted: 334, revenue: 7600 },
        settings: {
          frenchTranslation: true,
          vatFrance: true,
          promotionManagement: true
        }
      },
      {
        id: "ebay-kleinanzeigen-agent",
        name: "eBay Kleinanzeigen Agent",
        description: "Automated management of eBay Kleinanzeigen",
        category: "marketplace",
        status: "active",
        iconType: "shopping-bag",
        platform: "eBay Kleinanzeigen",
        performance: { successRate: 88, tasksCompleted: 756, revenue: 14200 },
        settings: {
          localDelivery: true,
          paymentMethods: ["paypal", "bank_transfer", "cash"],
          autoResponder: true,
          priceNegotiation: true,
          spamDetection: true,
          locationRadius: 50
        }
      },

      // Social Media Agents
      {
        id: "facebook-agent",
        name: "Facebook Marketing Agent",
        description: "Manages Facebook campaigns and content automatically",
        category: "social",
        status: "active",
        iconType: "facebook",
        platform: "Facebook",
        performance: { successRate: 92, tasksCompleted: 2847, revenue: 15600 },
        settings: {
          postScheduling: true,
          audienceTargeting: "lookalike",
          budgetOptimization: true,
          adCreativeRotation: true,
          engagementTracking: true
        }
      },
      {
        id: "instagram-agent",
        name: "Instagram Content Agent",
        description: "Automatic Instagram content creation and scheduling",
        category: "social",
        status: "active",
        iconType: "instagram",
        platform: "Instagram",
        performance: { successRate: 88, tasksCompleted: 1923, revenue: 12400 },
        settings: {
          hashtagOptimization: true,
          storyAutomation: true,
          influencerOutreach: true,
          visualBranding: true
        }
      },
      {
        id: "linkedin-agent",
        name: "LinkedIn B2B Agent",
        description: "Specialized agent for B2B marketing on LinkedIn",
        category: "social",
        status: "active",
        iconType: "linkedin",
        platform: "LinkedIn",
        performance: { successRate: 94, tasksCompleted: 756, revenue: 28900 },
        settings: {
          leadGeneration: true,
          contentPersonalization: true,
          networkExpansion: true,
          industryTargeting: "medical"
        }
      },
      {
        id: "youtube-agent",
        name: "YouTube SEO Agent",
        description: "SEO optimization and YouTube content management",
        category: "social",
        status: "training",
        iconType: "youtube",
        platform: "YouTube",
        performance: { successRate: 83, tasksCompleted: 289, revenue: 8700 },
        settings: {
          seoOptimization: true,
          thumbnailGeneration: true,
          videoAnalytics: true,
          channelGrowth: true
        }
      },
      {
        id: "twitter-agent",
        name: "Twitter Engagement Agent",
        description: "Twitter automation for engagement and customer support",
        category: "social",
        status: "active",
        iconType: "twitter",
        platform: "Twitter",
        performance: { successRate: 79, tasksCompleted: 1456, revenue: 5600 },
        settings: {
          realTimeMonitoring: true,
          sentimentAnalysis: true,
          crisisManagement: true,
          threadCreation: true
        }
      },

      // Messaging Agents
      {
        id: "whatsapp-agent",
        name: "WhatsApp Business Agent",
        description: "Automated customer support via WhatsApp Business API",
        category: "messaging",
        status: "active",
        iconType: "whatsapp",
        platform: "WhatsApp",
        performance: { successRate: 96, tasksCompleted: 3421, revenue: 34500 },
        settings: {
          multiLanguage: true,
          orderTracking: true,
          paymentIntegration: true,
          appointmentBooking: true,
          quickReplies: true
        }
      },
      {
        id: "telegram-agent",
        name: "Telegram Support Agent",
        description: "Customer support and notifications via Telegram",
        category: "messaging",
        status: "active",
        iconType: "telegram",
        platform: "Telegram",
        performance: { successRate: 91, tasksCompleted: 1876, revenue: 16800 },
        settings: {
          botCommands: true,
          groupManagement: true,
          fileSharing: true,
          encryptedSupport: true
        }
      },
      {
        id: "discord-agent",
        name: "Discord Community Agent",
        description: "Community management and Discord support",
        category: "messaging",
        status: "paused",
        iconType: "discord",
        platform: "Discord",
        performance: { successRate: 87, tasksCompleted: 967, revenue: 7200 },
        settings: {
          moderationTools: true,
          eventManagement: true,
          roleAssignment: true,
          communityEngagement: true
        }
      },
      {
        id: "email-agent",
        name: "Email Marketing Agent",
        description: "Automated customer support and email marketing",
        category: "messaging",
        status: "active",
        iconType: "file-text",
        platform: "Email",
        performance: { successRate: 93, tasksCompleted: 4567, revenue: 28900 },
        settings: {
          autoResponder: true,
          segmentation: true,
          personalization: true,
          drip_campaigns: true,
          a_b_testing: true,
          deliverability_optimization: true,
          bounce_management: true,
          unsubscribe_handling: true
        }
      },

      // AI Content Agents
      {
        id: "content-generator",
        name: "AI Content Generator",
        description: "Automatic multilingual content generation",
        category: "content",
        status: "active",
        iconType: "file-text",
        performance: { successRate: 89, tasksCompleted: 2341, revenue: 19400 },
        settings: {
          languages: ["de", "en", "zh", "fr"],
          contentTypes: ["blog", "product", "social"],
          seoOptimization: true,
          plagiarismCheck: true,
          brandVoice: "professional"
        }
      },
      {
        id: "blog-content-agent",
        name: "Blog Content Agent",
        description: "SEO-optimized blog content creation and editorial management",
        category: "content",
        status: "active",
        iconType: "file-text",
        performance: { successRate: 91, tasksCompleted: 1234, revenue: 15600 },
        settings: {
          seoOptimization: true,
          keywordResearch: true,
          contentCalendar: true,
          internalLinking: true,
          readabilityCheck: true,
          publishingSchedule: "weekly",
          wordCountTarget: 1500,
          imageGeneration: true,
          socialDistribution: true,
          performanceTracking: true
        }
      },
      {
        id: "social-content-agent",
        name: "Social Media Content Agent", 
        description: "Content creation and scheduling for social networks",
        category: "content",
        status: "active",
        iconType: "users",
        performance: { successRate: 87, tasksCompleted: 3456, revenue: 22100 },
        settings: {
          platforms: ["facebook", "instagram", "twitter", "linkedin", "youtube"],
          contentMix: { promotional: 30, educational: 40, engaging: 30 },
          hashtagStrategy: true,
          visualContent: true,
          videoContent: true,
          storiesCreation: true,
          postScheduling: true,
          engagementTracking: true,
          trendAnalysis: true,
          crossPlatformOptimization: true
        }
      },
      {
        id: "image-ai",
        name: "AI Image Assistant",
        description: "Product image optimization and generation",
        category: "ai",
        status: "active",
        iconType: "camera",
        performance: { successRate: 92, tasksCompleted: 1567, revenue: 13200 },
        settings: {
          backgroundRemoval: true,
          colorCorrection: true,
          sizeOptimization: true,
          watermarkAddition: false,
          aiEnhancement: true
        }
      },
      {
        id: "pricing-agent",
        name: "Dynamic Pricing Agent",
        description: "AI-based automatic price optimization",
        category: "ai",
        status: "active",
        iconType: "currency-dollar",
        performance: { successRate: 95, tasksCompleted: 4521, revenue: 67800 },
        settings: {
          competitorMonitoring: true,
          demandForecasting: true,
          profitOptimization: true,
          seasonalAdjustments: true,
          marketTrends: true
        }
      },

      // Analytics Agents
      {
        id: "analytics-agent",
        name: "Performance Analytics Agent",
        description: "Automated cross-platform performance analysis",
        category: "analytics",
        status: "active",
        iconType: "chart-bar",
        performance: { successRate: 97, tasksCompleted: 5623, revenue: 45200 },
        settings: {
          realTimeReporting: true,
          predictiveAnalytics: true,
          customDashboards: true,
          alertSystem: true,
          dataExport: true
        }
      }
    ]
  }

  const toggleAgentStatus = (agentId: string) => {
    setAgents((current = []) => 
      current.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === "active" ? "paused" : "active" as const }
          : agent
      )
    )
    toast.success(t('agents.statusUpdated'))
  }

  const updateAgentSettings = (agentId: string, newSettings: Record<string, any>) => {
    setAgents((current = []) =>
      current.map(agent =>
        agent.id === agentId 
          ? { ...agent, settings: { ...agent.settings, ...newSettings } }
          : agent
      )
    )
    toast.success(t('agents.configSaved'))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "paused": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "training": return "bg-blue-100 text-blue-800 border-blue-200"
      case "error": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />
      case "paused": return <Pause className="h-4 w-4" />
      case "training": return <Brain className="h-4 w-4" />
      case "error": return <Warning className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "marketplace": return <ShoppingCart className="h-5 w-5" />
      case "social": return <Users className="h-5 w-5" />
      case "messaging": return <ChatCircle className="h-5 w-5" />
      case "ai": return <Brain className="h-5 w-5" />
      case "analytics": return <ChartBar className="h-5 w-5" />
      case "content": return <FileText className="h-5 w-5" />
      default: return <Robot className="h-5 w-5" />
    }
  }

  const categories = [
    { id: "marketplace", name: t('nav.marketplaces'), count: (agents || []).filter(a => a.category === "marketplace").length },
    { id: "social", name: t('agents.social'), count: (agents || []).filter(a => a.category === "social").length },
    { id: "messaging", name: t('agents.messaging'), count: (agents || []).filter(a => a.category === "messaging").length },
    { id: "ai", name: t('agents.analytics'), count: (agents || []).filter(a => a.category === "ai").length },
    { id: "content", name: t('agents.content'), count: (agents || []).filter(a => a.category === "content").length },
    { id: "analytics", name: t('agents.analytics'), count: (agents || []).filter(a => a.category === "analytics").length }
  ]

  const filteredAgents = (agents || []).filter(agent => agent.category === activeCategory)
  const selectedAgentData = selectedAgent ? (agents || []).find(a => a.id === selectedAgent) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('agents.allAgents')}</h2>
          <p className="text-muted-foreground">
            {t('agents.allAgentsDesc')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 border-green-200">
            {(agents || []).filter(a => a.status === "active").length} {t('common.active')}
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 border-yellow-200">
            {(agents || []).filter(a => a.status === "paused").length} {t('agents.pause')}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 border-blue-200">
            {(agents || []).filter(a => a.status === "training").length} {t('agents.training')}
          </Badge>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-16 sm:h-10 px-2 text-xs">
              {getCategoryIcon(category.id)}
              <span className="text-xs sm:text-sm">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => {
          const categoryAgents = (agents || []).filter(agent => agent.category === category.id)
          return (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {categoryAgents.map(agent => (
                <Card 
                  key={agent.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAgent === agent.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          {renderIcon(agent.iconType)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-sm sm:text-base truncate">{agent.name}</CardTitle>
                          {agent.platform && (
                            <CardDescription className="text-xs sm:text-sm">
                              {agent.platform}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(agent.status)} flex-shrink-0`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(agent.status)}
                          <span className="capitalize text-xs">{agent.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {t(agent.description)}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span>{t('agents.successRate')}</span>
                        <span className="font-medium">{agent.performance.successRate}%</span>
                      </div>
                      <Progress value={agent.performance.successRate} className="h-1.5 sm:h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div>
                        <div className="text-muted-foreground">{t('agents.tasks')}</div>
                        <div className="font-medium">{agent.performance.tasksCompleted.toLocaleString()}</div>
                      </div>
                      {agent.performance.revenue && (
                        <div>
                          <div className="text-muted-foreground">{t('dashboard.revenue')}</div>
                          <div className="font-medium text-green-600">
                            €{agent.performance.revenue.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant={agent.status === "active" ? "secondary" : "default"}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleAgentStatus(agent.id)
                        }}
                        className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
                      >
                        {agent.status === "active" ? (
                          <><Pause className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> <span className="hidden sm:inline">{t('agents.pause')}</span><span className="sm:hidden">⏸</span></>
                        ) : (
                          <><Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> <span className="hidden sm:inline">{t('agents.activate')}</span><span className="sm:hidden">▶</span></>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAgent(agent.id)
                        }}
                        className="h-8 sm:h-9 px-2 sm:px-3"
                      >
                        <Gear className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Agent Settings Panel */}
      {selectedAgentData && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {renderIcon(selectedAgentData.iconType)}
                </div>
                <div>
                  <CardTitle>Configuration - {selectedAgentData.name}</CardTitle>
                  <CardDescription>{selectedAgentData.description}</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedAgent(null)}
              >
                {t('common.cancel')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(selectedAgentData.settings).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Label>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          updateAgentSettings(selectedAgentData.id, { [key]: checked })
                        }
                      />
                      <span className="text-sm">{value ? t('common.active') : t('common.inactive')}</span>
                    </div>
                  ) : typeof value === 'number' ? (
                    <div className="space-y-2">
                      <Slider
                        value={[value]}
                        onValueChange={([newValue]) => 
                          updateAgentSettings(selectedAgentData.id, { [key]: newValue })
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-sm text-muted-foreground">{value}</div>
                    </div>
                  ) : Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-1">
                      {value.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Input
                      value={value}
                      onChange={(e) => 
                        updateAgentSettings(selectedAgentData.id, { [key]: e.target.value })
                      }
                      className="w-full"
                    />
                  )}
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                {t('common.cancel')}
              </Button>
              <Button onClick={() => toast.success(t('agents.configSaved'))}>
                <FloppyDisk className="h-4 w-4 mr-2" />
                {t('common.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}