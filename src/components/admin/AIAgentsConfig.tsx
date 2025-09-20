import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { useLanguage } from "@/components/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "sonner"
import {
  Robot,
  Gear,
  Play,
  Pause,
  ArrowCounterClockwise,
  FloppyDisk,
  Clock,
  Lightning,
  Target,
  Brain,
  ChatCircle,
  TrendUp,
  Eye,
  Users,
  CurrencyDollar,
  Globe,
  Palette,
  Camera,
  FileText,
  ShoppingCart,
  ChartBar,
  Calendar,
  Warning,
  CheckCircle,
  Activity,
  CaretDown,
  CaretRight,
  Plus,
  Trash,
  Copy
} from "@phosphor-icons/react"

interface AgentConfig {
  id: string
  name: string
  type: "marketplace" | "social" | "messaging" | "content" | "pricing" | "analytics" | "forecasting" | "support" | "inventory" | "customer"
  category: "automation" | "analysis" | "communication" | "optimization"
  status: "active" | "paused" | "training" | "error" | "disabled"
  priority: "low" | "medium" | "high" | "critical"
  automationLevel: number // 0-100
  settings: Record<string, any>
  schedule: {
    enabled: boolean
    startTime: string
    endTime: string
    timezone: string
    weekdays: boolean[]
  }
  thresholds: {
    priceChange?: number
    inventoryLow?: number
    responseTime?: number
    errorRate?: number
    confidence?: number
  }
  notifications: {
    email: boolean
    slack: boolean
    webhook: boolean
    recipients: string[]
  }
  resources: {
    cpu: number
    memory: number
    priority: number
  }
  performance: {
    successRate: number
    avgResponseTime: number
    totalOperations: number
    lastActive: string
  }
}

const translations = {
  en: {
    title: "AI Agents Configuration",
    description: "Configure and manage all AI agents with detailed settings and automation levels",
    agentOverview: "Agent Overview",
    detailedConfig: "Detailed Configuration",
    globalSettings: "Global Settings",
    agentName: "Agent Name",
    category: "Category",
    status: "Status",
    automationLevel: "Automation Level",
    priority: "Priority",
    actions: "Actions",
    configure: "Configure",
    clone: "Clone",
    delete: "Delete",
    start: "Start",
    pause: "Pause",
    active: "Active",
    paused: "Paused",
    training: "Training",
    error: "Error",
    disabled: "Disabled",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    automation: "Automation",
    analysis: "Analysis",
    communication: "Communication",
    optimization: "Optimization",
    generalSettings: "General Settings",
    scheduling: "Scheduling",
    thresholds: "Thresholds & Limits",
    notifications: "Notifications",
    performance: "Performance",
    resources: "Resource Allocation",
    save: "Save Configuration",
    reset: "Reset",
    unsavedChanges: "Unsaved changes",
    saveSuccess: "Configuration saved successfully",
    resetSuccess: "Configuration reset to defaults",
    createAgent: "Create New Agent",
    agentCreated: "New agent created successfully",
    agentDeleted: "Agent deleted successfully",
    enableScheduling: "Enable scheduling",
    startTime: "Start time",
    endTime: "End time",
    timezone: "Timezone",
    weekdays: "Active days",
    priceChangeThreshold: "Price change threshold (%)",
    inventoryThreshold: "Low inventory threshold",
    responseTimeLimit: "Response time limit (seconds)",
    errorRateThreshold: "Error rate threshold (%)",
    confidenceThreshold: "Confidence threshold (%)",
    emailNotifications: "Email notifications",
    slackNotifications: "Slack notifications",
    webhookNotifications: "Webhook notifications",
    recipients: "Recipients",
    cpuAllocation: "CPU allocation (%)",
    memoryAllocation: "Memory allocation (%)",
    processingPriority: "Processing priority",
    maxConcurrent: "Max concurrent operations",
    timeout: "Timeout (seconds)",
    retryAttempts: "Retry attempts",
    autoRestart: "Auto-restart on failure",
    successRate: "Success rate",
    avgResponseTime: "Avg response time",
    totalOperations: "Total operations",
    lastActive: "Last active"
  },
  de: {
    title: "KI-Agenten Konfiguration",
    description: "Konfigurieren und verwalten Sie alle KI-Agenten mit detaillierten Einstellungen und Automatisierungsebenen",
    agentOverview: "Agenten-Übersicht",
    detailedConfig: "Detaillierte Konfiguration",
    globalSettings: "Globale Einstellungen",
    agentName: "Agent Name",
    category: "Kategorie",
    status: "Status",
    automationLevel: "Automatisierungsgrad",
    priority: "Priorität",
    actions: "Aktionen",
    configure: "Konfigurieren",
    clone: "Klonen",
    delete: "Löschen",
    start: "Starten",
    pause: "Pausieren",
    active: "Aktiv",
    paused: "Pausiert",
    training: "Training",
    error: "Fehler",
    disabled: "Deaktiviert",
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    critical: "Kritisch",
    automation: "Automatisierung",
    analysis: "Analyse",
    communication: "Kommunikation",
    optimization: "Optimierung",
    generalSettings: "Allgemeine Einstellungen",
    scheduling: "Zeitplanung",
    thresholds: "Schwellenwerte & Limits",
    notifications: "Benachrichtigungen",
    performance: "Leistung",
    resources: "Ressourcenzuteilung",
    save: "Konfiguration speichern",
    reset: "Zurücksetzen",
    unsavedChanges: "Nicht gespeicherte Änderungen",
    saveSuccess: "Konfiguration erfolgreich gespeichert",
    resetSuccess: "Konfiguration auf Standard zurückgesetzt",
    createAgent: "Neuen Agent erstellen",
    agentCreated: "Neuer Agent erfolgreich erstellt",
    agentDeleted: "Agent erfolgreich gelöscht",
    enableScheduling: "Zeitplanung aktivieren",
    startTime: "Startzeit",
    endTime: "Endzeit",
    timezone: "Zeitzone",
    weekdays: "Aktive Tage",
    priceChangeThreshold: "Preisänderungsschwelle (%)",
    inventoryThreshold: "Niedriger Bestandsschwelle",
    responseTimeLimit: "Antwortzeit-Limit (Sekunden)",
    errorRateThreshold: "Fehlerratenschwelle (%)",
    confidenceThreshold: "Vertrauensschwelle (%)",
    emailNotifications: "E-Mail-Benachrichtigungen",
    slackNotifications: "Slack-Benachrichtigungen",
    webhookNotifications: "Webhook-Benachrichtigungen",
    recipients: "Empfänger",
    cpuAllocation: "CPU-Zuteilung (%)",
    memoryAllocation: "Speicher-Zuteilung (%)",
    processingPriority: "Verarbeitungspriorität",
    maxConcurrent: "Max. gleichzeitige Operationen",
    timeout: "Timeout (Sekunden)",
    retryAttempts: "Wiederholungsversuche",
    autoRestart: "Auto-Neustart bei Fehler",
    successRate: "Erfolgsrate",
    avgResponseTime: "Durchschn. Antwortzeit",
    totalOperations: "Gesamtoperationen",
    lastActive: "Zuletzt aktiv"
  },
  zh: {
    title: "AI 代理配置",
    description: "配置和管理所有 AI 代理的详细设置和自动化级别",
    agentOverview: "代理概览",
    detailedConfig: "详细配置",
    globalSettings: "全局设置",
    agentName: "代理名称",
    category: "类别",
    status: "状态",
    automationLevel: "自动化级别",
    priority: "优先级",
    actions: "操作",
    configure: "配置",
    clone: "克隆",
    delete: "删除",
    start: "启动",
    pause: "暂停",
    active: "活跃",
    paused: "已暂停",
    training: "训练中",
    error: "错误",
    disabled: "已禁用",
    low: "低",
    medium: "中",
    high: "高",
    critical: "关键",
    automation: "自动化",
    analysis: "分析",
    communication: "通信",
    optimization: "优化",
    generalSettings: "常规设置",
    scheduling: "调度",
    thresholds: "阈值和限制",
    notifications: "通知",
    performance: "性能",
    resources: "资源分配",
    save: "保存配置",
    reset: "重置",
    unsavedChanges: "未保存的更改",
    saveSuccess: "配置保存成功",
    resetSuccess: "配置重置为默认值",
    createAgent: "创建新代理",
    agentCreated: "新代理创建成功",
    agentDeleted: "代理删除成功",
    enableScheduling: "启用调度",
    startTime: "开始时间",
    endTime: "结束时间",
    timezone: "时区",
    weekdays: "活跃天数",
    priceChangeThreshold: "价格变化阈值 (%)",
    inventoryThreshold: "低库存阈值",
    responseTimeLimit: "响应时间限制（秒）",
    errorRateThreshold: "错误率阈值 (%)",
    confidenceThreshold: "置信度阈值 (%)",
    emailNotifications: "邮件通知",
    slackNotifications: "Slack 通知",
    webhookNotifications: "Webhook 通知",
    recipients: "收件人",
    cpuAllocation: "CPU 分配 (%)",
    memoryAllocation: "内存分配 (%)",
    processingPriority: "处理优先级",
    maxConcurrent: "最大并发操作",
    timeout: "超时（秒）",
    retryAttempts: "重试次数",
    autoRestart: "失败时自动重启",
    successRate: "成功率",
    avgResponseTime: "平均响应时间",
    totalOperations: "总操作数",
    lastActive: "最后活跃"
  },
  fr: {
    title: "Configuration des Agents IA",
    description: "Configurez et gérez tous les agents IA avec des paramètres détaillés et des niveaux d'automatisation",
    agentOverview: "Aperçu des Agents",
    detailedConfig: "Configuration Détaillée",
    globalSettings: "Paramètres Globaux",
    agentName: "Nom de l'Agent",
    category: "Catégorie",
    status: "Statut",
    automationLevel: "Niveau d'Automatisation",
    priority: "Priorité",
    actions: "Actions",
    configure: "Configurer",
    clone: "Cloner",
    delete: "Supprimer",
    start: "Démarrer",
    pause: "Pause",
    active: "Actif",
    paused: "En Pause",
    training: "Formation",
    error: "Erreur",
    disabled: "Désactivé",
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    critical: "Critique",
    automation: "Automatisation",
    analysis: "Analyse",
    communication: "Communication",
    optimization: "Optimisation",
    generalSettings: "Paramètres Généraux",
    scheduling: "Planification",
    thresholds: "Seuils et Limites",
    notifications: "Notifications",
    performance: "Performance",
    resources: "Allocation des Ressources",
    save: "Sauvegarder la Configuration",
    reset: "Réinitialiser",
    unsavedChanges: "Modifications non sauvegardées",
    saveSuccess: "Configuration sauvegardée avec succès",
    resetSuccess: "Configuration réinitialisée aux valeurs par défaut",
    createAgent: "Créer un Nouvel Agent",
    agentCreated: "Nouvel agent créé avec succès",
    agentDeleted: "Agent supprimé avec succès",
    enableScheduling: "Activer la planification",
    startTime: "Heure de début",
    endTime: "Heure de fin",
    timezone: "Fuseau horaire",
    weekdays: "Jours actifs",
    priceChangeThreshold: "Seuil de changement de prix (%)",
    inventoryThreshold: "Seuil de stock faible",
    responseTimeLimit: "Limite de temps de réponse (secondes)",
    errorRateThreshold: "Seuil de taux d'erreur (%)",
    confidenceThreshold: "Seuil de confiance (%)",
    emailNotifications: "Notifications par email",
    slackNotifications: "Notifications Slack",
    webhookNotifications: "Notifications Webhook",
    recipients: "Destinataires",
    cpuAllocation: "Allocation CPU (%)",
    memoryAllocation: "Allocation mémoire (%)",
    processingPriority: "Priorité de traitement",
    maxConcurrent: "Opérations simultanées max",
    timeout: "Délai d'expiration (secondes)",
    retryAttempts: "Tentatives de retry",
    autoRestart: "Redémarrage auto en cas d'échec",
    successRate: "Taux de réussite",
    avgResponseTime: "Temps de réponse moyen",
    totalOperations: "Opérations totales",
    lastActive: "Dernière activité"
  }
}

// Default agent configurations
const defaultAgents: AgentConfig[] = [
  {
    id: "marketplace-amazon",
    name: "Amazon Marketplace Manager",
    type: "marketplace",
    category: "automation",
    status: "active",
    priority: "high",
    automationLevel: 85,
    settings: {
      marketplaces: ["amazon.de", "amazon.com", "amazon.fr"],
      syncFrequency: "hourly",
      autoPublish: true,
      priceOptimization: true
    },
    schedule: {
      enabled: true,
      startTime: "06:00",
      endTime: "23:00",
      timezone: "Europe/Berlin",
      weekdays: [true, true, true, true, true, true, false]
    },
    thresholds: {
      priceChange: 15,
      inventoryLow: 10,
      responseTime: 30,
      errorRate: 5,
      confidence: 80
    },
    notifications: {
      email: true,
      slack: true,
      webhook: false,
      recipients: ["admin@goodlink-germany.com"]
    },
    resources: {
      cpu: 60,
      memory: 70,
      priority: 8
    },
    performance: {
      successRate: 96.5,
      avgResponseTime: 2.3,
      totalOperations: 15420,
      lastActive: "2024-01-15T10:30:00Z"
    }
  },
  {
    id: "pricing-optimizer",
    name: "Dynamic Pricing Agent",
    type: "pricing",
    category: "optimization",
    status: "active",
    priority: "critical",
    automationLevel: 90,
    settings: {
      strategy: "competitive",
      minMargin: 15,
      maxPriceChange: 10,
      monitoringFrequency: "realtime"
    },
    schedule: {
      enabled: true,
      startTime: "00:00",
      endTime: "23:59",
      timezone: "Europe/Berlin",
      weekdays: [true, true, true, true, true, true, true]
    },
    thresholds: {
      priceChange: 10,
      confidence: 85
    },
    notifications: {
      email: true,
      slack: true,
      webhook: true,
      recipients: ["pricing@goodlink-germany.com", "admin@goodlink-germany.com"]
    },
    resources: {
      cpu: 80,
      memory: 60,
      priority: 9
    },
    performance: {
      successRate: 98.2,
      avgResponseTime: 1.8,
      totalOperations: 8750,
      lastActive: "2024-01-15T10:25:00Z"
    }
  },
  {
    id: "content-generator",
    name: "Content Generation Agent",
    type: "content",
    category: "automation",
    status: "active",
    priority: "medium",
    automationLevel: 75,
    settings: {
      languages: ["en", "de", "zh"],
      contentTypes: ["product-descriptions", "blog-posts", "social-media"],
      seoOptimization: true,
      autoPublish: false
    },
    schedule: {
      enabled: true,
      startTime: "08:00",
      endTime: "18:00",
      timezone: "Europe/Berlin",
      weekdays: [true, true, true, true, true, false, false]
    },
    thresholds: {
      confidence: 75
    },
    notifications: {
      email: true,
      slack: false,
      webhook: false,
      recipients: ["content@goodlink-germany.com"]
    },
    resources: {
      cpu: 50,
      memory: 80,
      priority: 6
    },
    performance: {
      successRate: 94.1,
      avgResponseTime: 4.2,
      totalOperations: 2340,
      lastActive: "2024-01-15T09:45:00Z"
    }
  },
  {
    id: "customer-support",
    name: "Customer Support Chatbot",
    type: "support",
    category: "communication",
    status: "active",
    priority: "high",
    automationLevel: 70,
    settings: {
      languages: ["en", "de", "zh"],
      maxResponseTime: 60,
      escalationThreshold: "medium",
      humanHandoff: true
    },
    schedule: {
      enabled: true,
      startTime: "06:00",
      endTime: "22:00",
      timezone: "Europe/Berlin",
      weekdays: [true, true, true, true, true, true, true]
    },
    thresholds: {
      responseTime: 60,
      confidence: 80
    },
    notifications: {
      email: true,
      slack: true,
      webhook: false,
      recipients: ["support@goodlink-germany.com"]
    },
    resources: {
      cpu: 40,
      memory: 50,
      priority: 7
    },
    performance: {
      successRate: 91.8,
      avgResponseTime: 3.1,
      totalOperations: 5680,
      lastActive: "2024-01-15T10:32:00Z"
    }
  },
  {
    id: "social-media",
    name: "Social Media Manager",
    type: "social",
    category: "communication",
    status: "paused",
    priority: "medium",
    automationLevel: 60,
    settings: {
      platforms: ["linkedin", "twitter", "facebook", "instagram"],
      postsPerDay: 3,
      contentTone: "professional",
      autoRepost: false
    },
    schedule: {
      enabled: true,
      startTime: "08:00",
      endTime: "20:00",
      timezone: "Europe/Berlin",
      weekdays: [true, true, true, true, true, false, false]
    },
    thresholds: {
      confidence: 70
    },
    notifications: {
      email: true,
      slack: false,
      webhook: false,
      recipients: ["marketing@goodlink-germany.com"]
    },
    resources: {
      cpu: 30,
      memory: 40,
      priority: 5
    },
    performance: {
      successRate: 89.4,
      avgResponseTime: 2.8,
      totalOperations: 1240,
      lastActive: "2024-01-14T18:30:00Z"
    }
  },
  {
    id: "inventory-forecaster",
    name: "Inventory Forecasting Agent",
    type: "forecasting",
    category: "analysis",
    status: "active",
    priority: "high",
    automationLevel: 80,
    settings: {
      forecastModel: "prophet",
      forecastHorizon: 30,
      trainingWindow: 365,
      seasonalityDetection: true
    },
    schedule: {
      enabled: true,
      startTime: "02:00",
      endTime: "04:00",
      timezone: "Europe/Berlin",
      weekdays: [true, false, false, false, false, false, false]
    },
    thresholds: {
      confidence: 85
    },
    notifications: {
      email: true,
      slack: true,
      webhook: false,
      recipients: ["inventory@goodlink-germany.com", "operations@goodlink-germany.com"]
    },
    resources: {
      cpu: 70,
      memory: 90,
      priority: 7
    },
    performance: {
      successRate: 97.3,
      avgResponseTime: 15.2,
      totalOperations: 156,
      lastActive: "2024-01-15T02:30:00Z"
    }
  }
]

export function AIAgentsConfig() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations] || translations.en
  
  const [agents, setAgents] = useKV<AgentConfig[]>("ai-agents-config", defaultAgents)
  const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const updateAgent = (updatedAgent: AgentConfig) => {
    setAgents((current = []) => 
      current.map(agent => 
        agent.id === updatedAgent.id ? updatedAgent : agent
      )
    )
    setSelectedAgent(updatedAgent)
    setIsEditing(true)
  }

  const saveAgent = () => {
    if (!selectedAgent) return
    
    setAgents((current = []) => 
      current.map(agent => 
        agent.id === selectedAgent.id ? selectedAgent : agent
      )
    )
    setIsEditing(false)
    toast.success(t.saveSuccess)
  }

  const resetAgent = () => {
    if (!selectedAgent) return
    
    const originalAgent = (agents || []).find(a => a.id === selectedAgent.id)
    if (originalAgent) {
      setSelectedAgent({ ...originalAgent })
      setIsEditing(false)
      toast.success(t.resetSuccess)
    }
  }

  const toggleAgentStatus = (agentId: string) => {
    setAgents((current = []) => 
      current.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === "active" ? "paused" : "active" as any }
          : agent
      )
    )
  }

  const cloneAgent = (agent: AgentConfig) => {
    const newAgent: AgentConfig = {
      ...agent,
      id: `${agent.id}-copy-${Date.now()}`,
      name: `${agent.name} (Copy)`,
      status: "disabled"
    }
    
    setAgents((current = []) => [...current, newAgent])
    toast.success(t.agentCreated)
  }

  const deleteAgent = (agentId: string) => {
    setAgents((current = []) => current.filter(agent => agent.id !== agentId))
    if (selectedAgent?.id === agentId) {
      setSelectedAgent(null)
    }
    toast.success(t.agentDeleted)
  }

  const createNewAgent = () => {
    const newAgent: AgentConfig = {
      id: `custom-agent-${Date.now()}`,
      name: "New Custom Agent",
      type: "support",
      category: "automation",
      status: "disabled",
      priority: "medium",
      automationLevel: 50,
      settings: {},
      schedule: {
        enabled: false,
        startTime: "09:00",
        endTime: "17:00",
        timezone: "Europe/Berlin",
        weekdays: [true, true, true, true, true, false, false]
      },
      thresholds: {
        confidence: 80
      },
      notifications: {
        email: true,
        slack: false,
        webhook: false,
        recipients: ["admin@goodlink-germany.com"]
      },
      resources: {
        cpu: 50,
        memory: 50,
        priority: 5
      },
      performance: {
        successRate: 0,
        avgResponseTime: 0,
        totalOperations: 0,
        lastActive: new Date().toISOString()
      }
    }
    
    setAgents((current = []) => [...current, newAgent])
    setSelectedAgent(newAgent)
    setIsEditing(true)
    toast.success(t.agentCreated)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default"
      case "paused": return "secondary"
      case "training": return "outline"
      case "error": return "destructive"
      case "disabled": return "secondary"
      default: return "secondary"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "automation": return <Robot className="h-4 w-4" />
      case "analysis": return <ChartBar className="h-4 w-4" />
      case "communication": return <ChatCircle className="h-4 w-4" />
      case "optimization": return <Target className="h-4 w-4" />
      default: return <Gear className="h-4 w-4" />
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button onClick={createNewAgent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t.createAgent}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t.agentOverview}</TabsTrigger>
          <TabsTrigger value="config">{t.detailedConfig}</TabsTrigger>
          <TabsTrigger value="global">{t.globalSettings}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Robot className="h-5 w-5" />
                {t.agentOverview}
              </CardTitle>
              <CardDescription>
                Manage all AI agents from a centralized dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(agents || []).map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(agent.category)}
                        <div>
                          <h3 className="font-medium">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {agent.category} • {agent.type}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(agent.status)}>
                        {t[agent.status as keyof typeof t] || agent.status}
                      </Badge>
                      
                      <div className="text-sm text-muted-foreground">
                        {t.automationLevel}: {agent.automationLevel}%
                      </div>
                      
                      <Badge variant="outline">
                        {t[agent.priority as keyof typeof t] || agent.priority}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <Gear className="h-3 w-3 mr-1" />
                          {t.configure}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => cloneAgent(agent)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {t.clone}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAgentStatus(agent.id)}
                        >
                          {agent.status === "active" ? (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              {t.pause}
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              {t.start}
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAgent(agent.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="mt-6">
          {selectedAgent ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Agent Selector */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Select Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {(agents || []).map((agent) => (
                        <Button
                          key={agent.id}
                          variant={selectedAgent?.id === agent.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          {getCategoryIcon(agent.category)}
                          <span className="ml-2 truncate">{agent.name}</span>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Agent Configuration */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getCategoryIcon(selectedAgent.category)}
                        {selectedAgent.name}
                      </CardTitle>
                      <CardDescription>
                        Configure this agent's behavior and settings
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <Badge variant="outline" className="text-orange-600">
                          <Warning className="h-3 w-3 mr-1" />
                          {t.unsavedChanges}
                        </Badge>
                      )}
                      <Badge variant={getStatusColor(selectedAgent.status)}>
                        {t[selectedAgent.status as keyof typeof t] || selectedAgent.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-6">
                      {/* General Settings */}
                      <Collapsible 
                        open={expandedSections.general} 
                        onOpenChange={() => toggleSection("general")}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Gear className="h-4 w-4" />
                            <span className="font-medium">{t.generalSettings}</span>
                          </div>
                          {expandedSections.general ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>{t.agentName}</Label>
                              <Input
                                value={selectedAgent.name}
                                onChange={(e) => updateAgent({
                                  ...selectedAgent,
                                  name: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <Label>{t.priority}</Label>
                              <Select
                                value={selectedAgent.priority}
                                onValueChange={(value: any) => updateAgent({
                                  ...selectedAgent,
                                  priority: value
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">{t.low}</SelectItem>
                                  <SelectItem value="medium">{t.medium}</SelectItem>
                                  <SelectItem value="high">{t.high}</SelectItem>
                                  <SelectItem value="critical">{t.critical}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label>{t.automationLevel}: {selectedAgent.automationLevel}%</Label>
                            <Slider
                              value={[selectedAgent.automationLevel]}
                              onValueChange={([value]) => updateAgent({
                                ...selectedAgent,
                                automationLevel: value
                              })}
                              max={100}
                              min={0}
                              step={5}
                              className="mt-2"
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Scheduling */}
                      <Collapsible 
                        open={expandedSections.scheduling} 
                        onOpenChange={() => toggleSection("scheduling")}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{t.scheduling}</span>
                          </div>
                          {expandedSections.scheduling ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={selectedAgent.schedule.enabled}
                              onCheckedChange={(checked) => updateAgent({
                                ...selectedAgent,
                                schedule: { ...selectedAgent.schedule, enabled: checked }
                              })}
                            />
                            <Label>{t.enableScheduling}</Label>
                          </div>
                          
                          {selectedAgent.schedule.enabled && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>{t.startTime}</Label>
                                  <Input
                                    type="time"
                                    value={selectedAgent.schedule.startTime}
                                    onChange={(e) => updateAgent({
                                      ...selectedAgent,
                                      schedule: { ...selectedAgent.schedule, startTime: e.target.value }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label>{t.endTime}</Label>
                                  <Input
                                    type="time"
                                    value={selectedAgent.schedule.endTime}
                                    onChange={(e) => updateAgent({
                                      ...selectedAgent,
                                      schedule: { ...selectedAgent.schedule, endTime: e.target.value }
                                    })}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label>{t.weekdays}</Label>
                                <div className="flex gap-2 mt-2">
                                  {weekdays.map((day, index) => (
                                    <Button
                                      key={day}
                                      variant={selectedAgent.schedule.weekdays[index] ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        const newWeekdays = [...selectedAgent.schedule.weekdays]
                                        newWeekdays[index] = !newWeekdays[index]
                                        updateAgent({
                                          ...selectedAgent,
                                          schedule: { ...selectedAgent.schedule, weekdays: newWeekdays }
                                        })
                                      }}
                                    >
                                      {day}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Thresholds */}
                      <Collapsible 
                        open={expandedSections.thresholds} 
                        onOpenChange={() => toggleSection("thresholds")}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span className="font-medium">{t.thresholds}</span>
                          </div>
                          {expandedSections.thresholds ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {selectedAgent.thresholds.priceChange !== undefined && (
                              <div>
                                <Label>{t.priceChangeThreshold}</Label>
                                <Input
                                  type="number"
                                  value={selectedAgent.thresholds.priceChange}
                                  onChange={(e) => updateAgent({
                                    ...selectedAgent,
                                    thresholds: { 
                                      ...selectedAgent.thresholds, 
                                      priceChange: parseFloat(e.target.value) 
                                    }
                                  })}
                                  min={0}
                                  max={100}
                                  step={0.1}
                                />
                              </div>
                            )}
                            
                            {selectedAgent.thresholds.inventoryLow !== undefined && (
                              <div>
                                <Label>{t.inventoryThreshold}</Label>
                                <Input
                                  type="number"
                                  value={selectedAgent.thresholds.inventoryLow}
                                  onChange={(e) => updateAgent({
                                    ...selectedAgent,
                                    thresholds: { 
                                      ...selectedAgent.thresholds, 
                                      inventoryLow: parseInt(e.target.value) 
                                    }
                                  })}
                                  min={0}
                                />
                              </div>
                            )}
                            
                            {selectedAgent.thresholds.responseTime !== undefined && (
                              <div>
                                <Label>{t.responseTimeLimit}</Label>
                                <Input
                                  type="number"
                                  value={selectedAgent.thresholds.responseTime}
                                  onChange={(e) => updateAgent({
                                    ...selectedAgent,
                                    thresholds: { 
                                      ...selectedAgent.thresholds, 
                                      responseTime: parseInt(e.target.value) 
                                    }
                                  })}
                                  min={1}
                                />
                              </div>
                            )}
                            
                            {selectedAgent.thresholds.confidence !== undefined && (
                              <div>
                                <Label>{t.confidenceThreshold}</Label>
                                <Slider
                                  value={[selectedAgent.thresholds.confidence]}
                                  onValueChange={([value]) => updateAgent({
                                    ...selectedAgent,
                                    thresholds: { 
                                      ...selectedAgent.thresholds, 
                                      confidence: value 
                                    }
                                  })}
                                  max={100}
                                  min={0}
                                  step={5}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {selectedAgent.thresholds.confidence}%
                                </span>
                              </div>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Notifications */}
                      <Collapsible 
                        open={expandedSections.notifications} 
                        onOpenChange={() => toggleSection("notifications")}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <ChatCircle className="h-4 w-4" />
                            <span className="font-medium">{t.notifications}</span>
                          </div>
                          {expandedSections.notifications ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={selectedAgent.notifications.email}
                                onCheckedChange={(checked) => updateAgent({
                                  ...selectedAgent,
                                  notifications: { ...selectedAgent.notifications, email: checked }
                                })}
                              />
                              <Label>{t.emailNotifications}</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={selectedAgent.notifications.slack}
                                onCheckedChange={(checked) => updateAgent({
                                  ...selectedAgent,
                                  notifications: { ...selectedAgent.notifications, slack: checked }
                                })}
                              />
                              <Label>{t.slackNotifications}</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={selectedAgent.notifications.webhook}
                                onCheckedChange={(checked) => updateAgent({
                                  ...selectedAgent,
                                  notifications: { ...selectedAgent.notifications, webhook: checked }
                                })}
                              />
                              <Label>{t.webhookNotifications}</Label>
                            </div>
                          </div>
                          
                          <div>
                            <Label>{t.recipients}</Label>
                            <Textarea
                              value={selectedAgent.notifications.recipients.join(", ")}
                              onChange={(e) => updateAgent({
                                ...selectedAgent,
                                notifications: { 
                                  ...selectedAgent.notifications, 
                                  recipients: e.target.value.split(",").map(email => email.trim())
                                }
                              })}
                              placeholder="email1@example.com, email2@example.com"
                              rows={2}
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Resources */}
                      <Collapsible 
                        open={expandedSections.resources} 
                        onOpenChange={() => toggleSection("resources")}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Lightning className="h-4 w-4" />
                            <span className="font-medium">{t.resources}</span>
                          </div>
                          {expandedSections.resources ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="space-y-4">
                            <div>
                              <Label>{t.cpuAllocation}: {selectedAgent.resources.cpu}%</Label>
                              <Slider
                                value={[selectedAgent.resources.cpu]}
                                onValueChange={([value]) => updateAgent({
                                  ...selectedAgent,
                                  resources: { ...selectedAgent.resources, cpu: value }
                                })}
                                max={100}
                                min={10}
                                step={5}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label>{t.memoryAllocation}: {selectedAgent.resources.memory}%</Label>
                              <Slider
                                value={[selectedAgent.resources.memory]}
                                onValueChange={([value]) => updateAgent({
                                  ...selectedAgent,
                                  resources: { ...selectedAgent.resources, memory: value }
                                })}
                                max={100}
                                min={10}
                                step={5}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label>{t.processingPriority}: {selectedAgent.resources.priority}</Label>
                              <Slider
                                value={[selectedAgent.resources.priority]}
                                onValueChange={([value]) => updateAgent({
                                  ...selectedAgent,
                                  resources: { ...selectedAgent.resources, priority: value }
                                })}
                                max={10}
                                min={1}
                                step={1}
                                className="mt-2"
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Performance Metrics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Activity className="h-4 w-4" />
                            {t.performance}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">{t.successRate}</div>
                              <div className="font-medium">{selectedAgent.performance.successRate}%</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">{t.avgResponseTime}</div>
                              <div className="font-medium">{selectedAgent.performance.avgResponseTime}s</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">{t.totalOperations}</div>
                              <div className="font-medium">{selectedAgent.performance.totalOperations.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">{t.lastActive}</div>
                              <div className="font-medium">
                                {new Date(selectedAgent.performance.lastActive).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex items-center justify-end gap-2">
                    {isEditing && (
                      <Button variant="outline" onClick={resetAgent}>
                        <ArrowCounterClockwise className="h-4 w-4 mr-2" />
                        {t.reset}
                      </Button>
                    )}
                    <Button onClick={saveAgent} disabled={!isEditing}>
                      <FloppyDisk className="h-4 w-4 mr-2" />
                      {t.save}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Robot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Agent Selected</h3>
                  <p className="text-muted-foreground">
                    Select an agent from the overview tab to configure its settings
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="global" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="h-5 w-5" />
                {t.globalSettings}
              </CardTitle>
              <CardDescription>
                Configure global settings that apply to all AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Default Resource Allocation</Label>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label className="text-sm">CPU Limit (%)</Label>
                        <Slider defaultValue={[70]} max={100} min={10} step={5} />
                      </div>
                      <div>
                        <Label className="text-sm">Memory Limit (%)</Label>
                        <Slider defaultValue={[60]} max={100} min={10} step={5} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Default Notification Settings</Label>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Global email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Global Slack notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Global webhook notifications</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label>Global Administrator Recipients</Label>
                  <Textarea
                    placeholder="admin@goodlink-germany.com, ops@goodlink-germany.com"
                    className="mt-2"
                    rows={2}
                  />
                </div>
                
                <div className="flex items-center justify-end">
                  <Button>
                    <FloppyDisk className="h-4 w-4 mr-2" />
                    Save Global Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}