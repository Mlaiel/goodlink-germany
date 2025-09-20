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
  FloppyDisk
} from "@phosphor-icons/react"

interface Agent {
  id: string
  name: string
  description: string
  category: "marketplace" | "social" | "messaging" | "ai" | "analytics" | "content"
  status: "active" | "paused" | "training" | "error"
  icon: React.ReactNode
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

  function getDefaultAgents(): Agent[] {
    return [
      // Marketplace Agents
      {
        id: "amazon-listing",
        name: "Amazon Listing Agent",
        description: "Gère automatiquement les listings Amazon avec optimisation SEO",
        category: "marketplace",
        status: "active",
        icon: <ShoppingCart className="h-5 w-5" />,
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
        description: "Synchronise inventaire et commandes eBay en temps réel",
        category: "marketplace",
        status: "active",
        icon: <Package className="h-5 w-5" />,
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
        description: "Agent spécialisé pour la plateforme OTTO allemande",
        category: "marketplace",
        status: "active",
        icon: <Storefront className="h-5 w-5" />,
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
        description: "Gestion automatisée des listings Kaufland",
        category: "marketplace",
        status: "active",
        icon: <ShoppingCart className="h-5 w-5" />,
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
        description: "Agent pour marketplace française Cdiscount",
        category: "marketplace",
        status: "active",
        icon: <Globe className="h-5 w-5" />,
        platform: "Cdiscount",
        performance: { successRate: 85, tasksCompleted: 334, revenue: 7600 },
        settings: {
          frenchTranslation: true,
          vatFrance: true,
          promotionManagement: true
        }
      },

      // Social Media Agents
      {
        id: "facebook-agent",
        name: "Facebook Marketing Agent",
        description: "Gère les campagnes et contenus Facebook automatiquement",
        category: "social",
        status: "active",
        icon: <FacebookLogo className="h-5 w-5" />,
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
        description: "Création et planification automatique de contenu Instagram",
        category: "social",
        status: "active",
        icon: <InstagramLogo className="h-5 w-5" />,
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
        description: "Agent spécialisé dans le marketing B2B sur LinkedIn",
        category: "social",
        status: "active",
        icon: <LinkedinLogo className="h-5 w-5" />,
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
        description: "Optimisation SEO et gestion de contenu YouTube",
        category: "social",
        status: "training",
        icon: <YoutubeLogo className="h-5 w-5" />,
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
        description: "Automatisation Twitter pour engagement et support client",
        category: "social",
        status: "active",
        icon: <TwitterLogo className="h-5 w-5" />,
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
        description: "Service client automatisé via WhatsApp Business API",
        category: "messaging",
        status: "active",
        icon: <WhatsappLogo className="h-5 w-5" />,
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
        description: "Support client et notifications via Telegram",
        category: "messaging",
        status: "active",
        icon: <TelegramLogo className="h-5 w-5" />,
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
        description: "Gestion de communauté et support Discord",
        category: "messaging",
        status: "paused",
        icon: <DiscordLogo className="h-5 w-5" />,
        platform: "Discord",
        performance: { successRate: 87, tasksCompleted: 967, revenue: 7200 },
        settings: {
          moderationTools: true,
          eventManagement: true,
          roleAssignment: true,
          communityEngagement: true
        }
      },

      // AI Content Agents
      {
        id: "content-generator",
        name: "AI Content Generator",
        description: "Génération automatique de contenu multilingue",
        category: "content",
        status: "active",
        icon: <FileText className="h-5 w-5" />,
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
        id: "image-ai",
        name: "AI Image Assistant",
        description: "Optimisation et génération d'images produits",
        category: "ai",
        status: "active",
        icon: <Camera className="h-5 w-5" />,
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
        description: "Optimisation automatique des prix basée sur l'IA",
        category: "ai",
        status: "active",
        icon: <CurrencyDollar className="h-5 w-5" />,
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
        description: "Analyse automatisée des performances cross-platform",
        category: "analytics",
        status: "active",
        icon: <ChartBar className="h-5 w-5" />,
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
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {getCategoryIcon(category.id)}
              <span className="hidden sm:inline">{category.name}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map(agent => (
                <Card 
                  key={agent.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAgent === agent.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {agent.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{agent.name}</CardTitle>
                          {agent.platform && (
                            <CardDescription className="text-sm">
                              {agent.platform}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(agent.status)}
                          <span className="capitalize">{agent.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {agent.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>{t('agents.successRate')}</span>
                        <span className="font-medium">{agent.performance.successRate}%</span>
                      </div>
                      <Progress value={agent.performance.successRate} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
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
                        className="flex-1"
                      >
                        {agent.status === "active" ? (
                          <><Pause className="h-4 w-4 mr-1" /> {t('agents.pause')}</>
                        ) : (
                          <><Play className="h-4 w-4 mr-1" /> {t('agents.activate')}</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAgent(agent.id)
                        }}
                      >
                        <Gear className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Agent Settings Panel */}
      {selectedAgentData && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {selectedAgentData.icon}
                </div>
                <div>
                  <CardTitle>{t('Configuration')} - {selectedAgentData.name}</CardTitle>
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