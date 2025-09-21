import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switc
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '
import { Label } from '@/components/ui/label'
import { AlertTriangle, Brain, TrendingUp, Shop
import { Textarea } from '@/components/ui/textarea'
interface Agent {
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, Brain, TrendingUp, ShoppingCart, MessageSquare, Zap, Settings, Eye, Play, Pause, RotateCw } from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'
import { useKV } from '@github/spark/hooks'

interface Agent {
  id: string
  enabled: boo
  type: string
  model: string
  performance: number

  icon: React.ReactNode
}

interface AgentConfig {
  enabled: boolean
      name: t('List
  frequency: string
  model: string
  instructions: string
 

      id: 'inventory-forecaste
  const { t, currentLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [agentConfigs, setAgentConfigs] = useKV<Record<string, AgentConfig>>('agent-configs', {})

  const agents: Agent[] = [
    {
      id: 'listing-optimizer',
      name: t('Listing Optimizer'),
      type: 'Marketplace',
      status: 'active',
      performance: 92,
      description: t('Optimizes product listings across Amazon, eBay, and other marketplaces'),
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      id: 'price-monitor',
      name: t('Price Monitor'),
      type: 'Analytics',
      status: 'active',
      performance: 88,
      description: t('Monitors competitor prices and adjusts pricing strategies'),
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'customer-service',
      name: t('Customer Service Bot'),
      type: 'Customer Support',
      status: 'active',
      performance: 94,
      description: t('Handles customer inquiries in multiple languages'),
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      id: 'inventory-forecaster',
      name: t('Inventory Forecaster'),
        ...prev[agentId],
      status: 'training',
    }))
      description: t('Predicts demand and optimizes inventory levels'),
  const getAgentConfig = (agentId: string
      
    {
      id: 'review-analyzer',
      name: t('Review Analyzer'),
      type: 'Analytics',
      status: 'active',
      performance: 90,
      description: t('Analyzes customer reviews for insights and sentiment'),
      icon: <Eye className="h-5 w-5" />
    },
    {
        <div className="m
      name: t('Ad Campaign Optimizer'),
      type: 'Marketing',
      status: 'active',

      description: t('Optimizes advertising campaigns and budgets'),
            <TabsTrigger value="overvie
    }
   

  const updateAgentConfig = (agentId: string, updates: Partial<AgentConfig>) => {
    setAgentConfigs(prev => ({
      ...prev,
      [agentId]: {
                </Card
        threshold: 80,
                    {agents.
        model: 'gpt-4',
        instructions: '',
        ...prev[agentId],
              </Ca
      }
       
  }

  const getAgentConfig = (agentId: string): AgentConfig => {
                    {Math.round(agent
      enabled: true,
      threshold: 80,
      frequency: 'hourly',
      model: 'gpt-4',
      instructions: ''
    }
  }

  const runAgentDemo = async (agentId: string) => {
                  <p className=
    console.log(`Running demo for agent: ${agentId}`)
   

          
    <div className="min-h-screen bg-background">
                  <AlertTriangle className="h
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('AI Agent Control Center')}</h1>
          <p className="text-muted-foreground">
            {t('Configure and monitor your AI agents for automated marketplace management')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('Overview')}</TabsTrigger>
            <TabsTrigger value="agents">{t('AI Agents')}</TabsTrigger>
            <TabsTrigger value="configuration">{t('Configuration')}</TabsTrigger>
            <TabsTrigger value="monitoring">{t('Monitoring')}</TabsTrigger>
                    <

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('Active Agents')}</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {agents.filter(a => a.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('of')} {agents.length} {t('total agents')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('Average Performance')}</CardTitle>
                      </div>
                </CardHeader>
                      <div cl
                  <div className="text-2xl font-bold">
                    {Math.round(agents.reduce((acc, a) => acc + a.performance, 0) / agents.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('across all agents')}
                      
                </CardContent>
                    <

              </Card
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('Tasks Completed')}</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Card key={agent.id} className="admin-nav-card"
                  <p className="text-xs text-muted-foreground">
                    {t('in the last 24 hours')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('Errors')}</CardTitle>
                        <div className="flex justify-between text-sm">
                </CardHeader>
                        </div
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    {t('requiring attention')}
                  </p>
                </CardContent>
                     
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                <CardHeader>
                  <CardTitle>{t('Agent Performance')}</CardTitle>
                  <CardDescription>
                    {t('Performance metrics for all active agents')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {agent.icon}
                        <div>
                          <p className="text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {t(agent.status)}
                            <Sel
                        <span className="text-sm font-medium">{agent.performance}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                     

                    
                <CardHeader>
                  <CardTitle>{t('Recent Activity')}</CardTitle>
                  <CardDescription>
                    {t('Latest actions performed by AI agents')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{t('Listing Optimizer updated 47 product titles')}</p>
                        <p className="text-xs text-muted-foreground">2 {t('minutes ago')}</p>
                            
                          
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{t('Price Monitor adjusted 12 product prices')}</p>
                        <p className="text-xs text-muted-foreground">15 {t('minutes ago')}</p>
                            
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{t('Customer Service Bot responded to 23 inquiries')}</p>
                        <p className="text-xs text-muted-foreground">1 {t('hour ago')}</p>
                      </div>
                    </div>
                        
                </CardContent>
                    <
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => {
                const config = getAgentConfig(agent.id)
                  {t('Co
                  <Card key={agent.id} className="admin-nav-card">
              <CardContent class
                      <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{t('General
                          {agent.icon}
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                        </div>
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {t(agent.status)}
                          <Selec
                      </div>
                      <CardDescription>{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t('Performance')}</span>
                        </SelectTrigger>
                        </div>
                        <Progress value={agent.performance} className="h-2" />
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${agent.id}-enabled`} className="text-sm">
                            {t('Enabled')}
                          </Label>
                          <Switch
                            id={`${agent.id}-enabled`}
                      </Select>
                            onCheckedChange={(checked) => 
                              updateAgentConfig(agent.id, { enabled: checked })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">{t('Performance Threshold')}</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={config.threshold}
                              onChange={(e) => 
                                updateAgentConfig(agent.id, { threshold: parseInt(e.target.value) })
                              }
                              className="w-20"
                            />
                    <div className="flex items-center justify-between">
                          </div>
                    </div>

                      <Label>{t('GDPR Compliance Mo
                          <Label className="text-sm">{t('Execution Frequency')}</Label>
                          <Select
                            value={config.frequency}
                            onValueChange={(value) => 
                              updateAgentConfig(agent.id, { frequency: value })
                    <div clas
                          >
                    </div>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">{t('Hourly')}</SelectItem>
                              <SelectItem value="daily">{t('Daily')}</SelectItem>
                              <SelectItem value="weekly">{t('Weekly')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">{t('AI Model')}</Label>
                          <Select
                            value={config.model}
                            onValueChange={(value) => 
                              updateAgentConfig(agent.id, { model: value })
                            }
                    <Progre
                            <SelectTrigger>
                  <div className="space-y-3">
                            </SelectTrigger>
                      <span className="text
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="gpt-4-mini">GPT-4 Mini</SelectItem>
                              <SelectItem value="claude-3">Claude 3</SelectItem>
                            </SelectContent>
                          </Select>
                    </div>


                          <Label className="text-sm">{t('Custom Instructions')}</Label>
                      <span classNa
                            placeholder={t('Enter custom instructions for this agent...')}
                            value={config.instructions}
                            onChange={(e) => 
                              updateAgentConfig(agent.id, { instructions: e.target.value })
                            }
                            rows={3}
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button
                      <AlertTriangle className="h-4 w-4 text-orang
                            size="sm"
                        <p className="text-xs
                            className="flex-1"
                    
                            <Play className="h-4 w-4 mr-1" />
                            {t('Run Demo')}
                          </Button>
                          <Button
                            size="sm"
                    <div className="flex item
                          >
                        <p className="text-sm">{t('Inventory
                          </Button>
                    </div>
                      </div>
                    </CardContent>
                  </Card>
            <Card
              })}
                <C
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Global Agent Configuration')}</CardTitle>
                <CardDescription>
                  {t('Configure global settings that apply to all AI agents')}
                </CardDescription>
                    <div cl
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t('General Settings')}</h3>
                    
    </div>
                      <Label>{t('Default AI Model')}</Label>
                      <Select defaultValue="gpt-4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-4-mini">GPT-4 Mini</SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>

                      </Select>


                    <div className="space-y-2">
                      <Label>{t('Error Handling')}</Label>
                      <Select defaultValue="retry">
                        <SelectTrigger>

                        </SelectTrigger>

                          <SelectItem value="retry">{t('Retry on Error')}</SelectItem>
                          <SelectItem value="stop">{t('Stop on Error')}</SelectItem>
                          <SelectItem value="continue">{t('Continue with Warnings')}</SelectItem>
                        </SelectContent>
                      </Select>



                      <Label>{t('Logging Level')}</Label>
                      <Select defaultValue="info">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                          <SelectItem value="debug">{t('Debug')}</SelectItem>
                          <SelectItem value="info">{t('Info')}</SelectItem>
                          <SelectItem value="warning">{t('Warning')}</SelectItem>
                          <SelectItem value="error">{t('Error')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t('Performance Settings')}</h3>

                    <div className="space-y-2">
                      <Label>{t('Max Concurrent Agents')}</Label>
                      <Input type="number" min="1" max="10" defaultValue="5" />



                      <Label>{t('Request Timeout (seconds)')}</Label>
                      <Input type="number" min="30" max="300" defaultValue="120" />


                    <div className="space-y-2">
                      <Label>{t('Rate Limit (requests per minute)')}</Label>
                      <Input type="number" min="10" max="1000" defaultValue="60" />
                    </div>
                  </div>
                </div>




                  <h3 className="text-lg font-semibold">{t('Security & Privacy')}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label>{t('Enable Data Encryption')}</Label>


                    
                    <div className="flex items-center justify-between">
                      <Label>{t('GDPR Compliance Mode')}</Label>

                    </div>

                    <div className="flex items-center justify-between">
                      <Label>{t('Audit Logging')}</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">

                      <Switch defaultChecked />

                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">{t('Reset to Defaults')}</Button>

                </div>

            </Card>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <CardHeader>
                  <CardTitle>{t('System Health')}</CardTitle>
                  <CardDescription>
                    {t('Monitor the overall health of your AI agent system')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('CPU Usage')}</span>
                      <span className="text-sm font-medium">23%</span>

                    <Progress value={23} className="h-2" />
                  </div>


                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('Memory Usage')}</span>
                      <span className="text-sm font-medium">67%</span>

                    <Progress value={67} className="h-2" />



                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('API Rate Limit')}</span>
                      <span className="text-sm font-medium">45%</span>

                    <Progress value={45} className="h-2" />


                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('Storage Usage')}</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                </CardContent>



                <CardHeader>
                  <CardTitle>{t('Error Log')}</CardTitle>
                  <CardDescription>
                    {t('Recent errors and warnings from AI agents')}
                  </CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{t('Price Monitor: Rate limit exceeded')}</p>
                        <p className="text-xs text-muted-foreground">5 {t('minutes ago')}</p>

                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{t('Listing Optimizer: API connection failed')}</p>
                        <p className="text-xs text-muted-foreground">12 {t('minutes ago')}</p>

                    </div>

                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{t('Inventory Forecaster: Low confidence prediction')}</p>
                        <p className="text-xs text-muted-foreground">1 {t('hour ago')}</p>

                    </div>
                  </div>
                </CardContent>

            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Performance Analytics')}</CardTitle>

                  {t('Detailed performance metrics and trends')}

              </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="text-2xl font-bold text-green-600">94.7%</div>
                    <p className="text-sm text-muted-foreground">{t('Success Rate')}</p>
                  </div>

                    <div className="text-2xl font-bold text-blue-600">2.3s</div>
                    <p className="text-sm text-muted-foreground">{t('Avg Response Time')}</p>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15,247</div>
                    <p className="text-sm text-muted-foreground">{t('Tasks Completed')}</p>


              </CardContent>

          </TabsContent>
        </Tabs>
      </div>

  )
