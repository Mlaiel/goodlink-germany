import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useLanguage } from '@/components/LanguageContext'
import { AllAgentsPanel } from '@/components/admin/AllAgentsPanel'
import { AgentDemoPanel } from '@/components/AgentDemoPanel'
import { 
  Shield, 
  Robot, 
  Chat,
  Gear, 
  Play, 
  Pause, 
  ChartBar,
  Lightning,
  Target,
  TrendUp,
  Users,
  ShoppingCart,
  ChatText,
  FileText,
  Share,
  Monitor
} from '@phosphor-icons/react'

interface AgentConfig {
  id: string
  name: string
  type: string
  enabled: boolean
  status: 'active' | 'paused' | 'error'
  automation_level: number
  threshold: number
  last_activity: string
  performance: {
    success_rate: number
    efficiency: number
    cost: number
  }
}

export function AdminPanel() {
  const { t } = useLanguage()
  
  const [agents, setAgents] = useState<AgentConfig[]>([
    {
      id: 'listing-agent',
      name: 'Listing Generator',
      type: 'content',
      enabled: true,
      status: 'active',
      automation_level: 85,
      threshold: 70,
      last_activity: '2024-01-15 14:30',
      performance: { success_rate: 94, efficiency: 87, cost: 0.12 }
    },
    {
      id: 'price-agent',
      name: 'Dynamic Pricing',
      type: 'pricing',
      enabled: true,
      status: 'active',
      automation_level: 92,
      threshold: 80,
      last_activity: '2024-01-15 14:28',
      performance: { success_rate: 98, efficiency: 95, cost: 0.08 }
    },
    {
      id: 'inventory-agent',
      name: 'Inventory Forecaster',
      type: 'operations',
      enabled: true,
      status: 'active',
      automation_level: 78,
      threshold: 60,
      last_activity: '2024-01-15 14:25',
      performance: { success_rate: 89, efficiency: 82, cost: 0.15 }
    },
    {
      id: 'social-agent',
      name: 'Social Media Manager',
      type: 'marketing',
      enabled: false,
      status: 'paused',
      automation_level: 65,
      threshold: 50,
      last_activity: '2024-01-15 12:00',
      performance: { success_rate: 76, efficiency: 68, cost: 0.20 }
    },
    {
      id: 'chat-agent',
      name: 'Customer Support',
      type: 'support',
      enabled: true,
      status: 'active',
      automation_level: 88,
      threshold: 75,
      last_activity: '2024-01-15 14:32',
      performance: { success_rate: 92, efficiency: 90, cost: 0.10 }
    }
  ])

  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [globalSettings, setGlobalSettings] = useState({
    master_automation: true,
    safety_mode: true,
    auto_learning: true,
    notification_level: 'medium'
  })

  const updateAgentConfig = (agentId: string, updates: Partial<AgentConfig>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ))
  }

  const toggleAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (agent) {
      updateAgentConfig(agentId, { 
        enabled: !agent.enabled,
        status: !agent.enabled ? 'active' : 'paused'
      })
    }
  }

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'content': return <FileText size={20} />
      case 'pricing': return <TrendUp size={20} />
      case 'operations': return <ChartBar size={20} />
      case 'marketing': return <Share size={20} />
      case 'support': return <ChatText size={20} />
      default: return <Robot size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            {t('AI Agent Control Center')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('Configure and monitor your automated business agents')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1">
            <Monitor size={16} className="mr-2" />
            {agents.filter(a => a.enabled).length} {t('Active')}
          </Badge>
          <Switch 
            checked={globalSettings.master_automation}
            onCheckedChange={(checked) => 
              setGlobalSettings(prev => ({ ...prev, master_automation: checked }))
            }
          />
          <Label>{t('Master Automation')}</Label>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="overview" className="modern-tab-trigger">
            <ChartBar size={16} className="mr-2" />
            {t('Overview')}
          </TabsTrigger>
          <TabsTrigger value="agents" className="modern-tab-trigger">
            <Robot size={16} className="mr-2" />
            {t('Agents')}
          </TabsTrigger>
          <TabsTrigger value="all-agents" className="modern-tab-trigger">
            <Users size={16} className="mr-2" />
            All Agents
          </TabsTrigger>
          <TabsTrigger value="configuration" className="modern-tab-trigger">
            <Gear size={16} className="mr-2" />
            {t('Configuration')}
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="modern-tab-trigger">
            <Monitor size={16} className="mr-2" />
            {t('Monitoring')}
          </TabsTrigger>
          <TabsTrigger value="demo" className="modern-tab-trigger">
            <Play size={16} className="mr-2" />
            {t('Demo')}
          </TabsTrigger>
          <TabsTrigger value="advanced-demo" className="modern-tab-trigger">
            <Lightning size={16} className="mr-2" />
            Advanced Demo
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="admin-nav-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getAgentIcon(agent.type)}
                      <CardTitle className="text-sm">{t(agent.name)}</CardTitle>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t('Success Rate')}</span>
                      <span className="font-medium">{agent.performance.success_rate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t('Efficiency')}</span>
                      <span className="font-medium">{agent.performance.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t('Cost')}</span>
                      <span className="font-medium">${agent.performance.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getAgentIcon(agent.type)}
                      <div>
                        <CardTitle>{t(agent.name)}</CardTitle>
                        <CardDescription>{t(agent.type.charAt(0).toUpperCase() + agent.type.slice(1))}</CardDescription>
                      </div>
                    </div>
                    <Switch 
                      checked={agent.enabled}
                      onCheckedChange={() => toggleAgent(agent.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">{t('Automation Level')}: {agent.automation_level}%</Label>
                    <Slider
                      value={[agent.automation_level]}
                      onValueChange={(value) => 
                        updateAgentConfig(agent.id, { automation_level: value[0] })
                      }
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">{t('Threshold')}: {agent.threshold}%</Label>
                    <Slider
                      value={[agent.threshold]}
                      onValueChange={(value) => 
                        updateAgentConfig(agent.id, { threshold: value[0] })
                      }
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      {t('Last Active')}: {agent.last_activity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Global Settings')}</CardTitle>
              <CardDescription>{t('Configure system-wide agent behavior')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('Master Automation')}</Label>
                  <p className="text-sm text-muted-foreground">{t('Enable/disable all automated processes')}</p>
                </div>
                <Switch 
                  checked={globalSettings.master_automation}
                  onCheckedChange={(checked) => 
                    setGlobalSettings(prev => ({ ...prev, master_automation: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('Safety Mode')}</Label>
                  <p className="text-sm text-muted-foreground">{t('Require approval for high-impact actions')}</p>
                </div>
                <Switch 
                  checked={globalSettings.safety_mode}
                  onCheckedChange={(checked) => 
                    setGlobalSettings(prev => ({ ...prev, safety_mode: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('Auto Learning')}</Label>
                  <p className="text-sm text-muted-foreground">{t('Allow agents to learn from performance data')}</p>
                </div>
                <Switch 
                  checked={globalSettings.auto_learning}
                  onCheckedChange={(checked) => 
                    setGlobalSettings(prev => ({ ...prev, auto_learning: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t('Notification Level')}</Label>
                <Select 
                  value={globalSettings.notification_level}
                  onValueChange={(value) => 
                    setGlobalSettings(prev => ({ ...prev, notification_level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('Low')}</SelectItem>
                    <SelectItem value="medium">{t('Medium')}</SelectItem>
                    <SelectItem value="high">{t('High')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{t('System Status')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-muted-foreground">{t('All systems operational')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{t('Active Agents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agents.filter(a => a.enabled).length}/{agents.length}</div>
                <p className="text-xs text-muted-foreground">{t('Agents currently running')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{t('Performance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <p className="text-xs text-muted-foreground">{t('Average efficiency')}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Agent Demo Center')}</CardTitle>
              <CardDescription>{t('Test and preview agent capabilities')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select an agent to demo')} />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {t(agent.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedAgent && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">{t('Demo Output')}</h4>
                    <div className="bg-background border rounded p-3 font-mono text-sm">
                      <div className="text-green-600">{t('Input')}:</div>
                      <div className="ml-4 text-muted-foreground">
                        {selectedAgent === 'listing-agent' && t('Generate product listing for "Medical Device X"')}
                        {selectedAgent === 'price-agent' && t('Optimize pricing for SKU-12345')}
                        {selectedAgent === 'inventory-agent' && t('Forecast demand for next 30 days')}
                        {selectedAgent === 'social-agent' && t('Create social media content for product launch')}
                        {selectedAgent === 'chat-agent' && t('Customer inquiry: "What are your shipping options?"')}
                      </div>
                      <div className="text-blue-600 mt-2">{t('Output')}:</div>
                      <div className="ml-4">
                        {selectedAgent === 'listing-agent' && (
                          <div>
                            <p><strong>{t('Title')}:</strong> Premium Medical Device X - CE Certified</p>
                            <p><strong>{t('Description')}:</strong> High-quality medical device meeting EU standards...</p>
                          </div>
                        )}
                        {selectedAgent === 'price-agent' && (
                          <div>
                            <p><strong>{t('Recommended Price')}:</strong> €149.99</p>
                            <p><strong>{t('Competitor Analysis')}:</strong> 5% below market average</p>
                          </div>
                        )}
                        {selectedAgent === 'inventory-agent' && (
                          <div>
                            <p><strong>{t('Forecast')}:</strong> 450 units needed</p>
                            <p><strong>{t('Reorder Point')}:</strong> 150 units</p>
                          </div>
                        )}
                        {selectedAgent === 'social-agent' && (
                          <div>
                            <p><strong>{t('Content')}:</strong> Exciting news! Our latest innovation...</p>
                            <p><strong>{t('Hashtags')}:</strong> #MedicalDevices #Innovation</p>
                          </div>
                        )}
                        {selectedAgent === 'chat-agent' && (
                          <div>
                            <p>{t('We offer several shipping options: Standard (3-5 days), Express (1-2 days), and Premium Same Day in major cities. Would you like me to check availability for your location?')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button className="mt-3" size="sm">
                      <Play size={16} className="mr-2" />
                      {t('Run Demo')}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Agents Panel - Comprehensive Marketplace, Content & Messaging Agents */}
        <TabsContent value="all-agents" className="space-y-6">
          <AllAgentsPanel />
        </TabsContent>

        {/* Advanced Demo Panel - Comprehensive Agent Demos */}
        <TabsContent value="advanced-demo" className="space-y-6">
          <AgentDemoPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}