import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Robot,
  Activity,
  TrendUp,
  TrendDown,
  Warning,
  CheckCircle,
  Clock,
  Lightning,
  Target,
  Gauge,
  ChartBar,
  ArrowRight,
  Play,
  Pause,
  ArrowsClockwise,
  Eye
} from '@phosphor-icons/react'
import { useLanguage } from '../LanguageContext'

interface AgentMetrics {
  id: string
  name: string
  status: 'active' | 'idle' | 'error' | 'disabled'
  actionsToday: number
  actionsLastHour: number
  successRate: number
  avgResponseTime: number
  errorCount: number
  efficiency: number
  automationLevel: 'manual' | 'assisted' | 'automatic'
  lastAction: string
  nextScheduled: string
  resourceUsage: {
    cpu: number
    memory: number
    apiCalls: number
  }
}

export function AgentPerformanceDashboard() {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d' | '30d'>('24h')
  
  // Mock real-time agent metrics - in production this would come from backend APIs
  const [agentMetrics, setAgentMetrics] = useKV<AgentMetrics[]>('agent-performance-metrics', [
    {
      id: 'listing-agent',
      name: 'Listing Generation Agent',
      status: 'active',
      actionsToday: 47,
      actionsLastHour: 3,
      successRate: 94.5,
      avgResponseTime: 2.3,
      errorCount: 2,
      efficiency: 89.2,
      automationLevel: 'assisted',
      lastAction: '2024-01-15 14:32:15',
      nextScheduled: '2024-01-15 15:00:00',
      resourceUsage: {
        cpu: 23,
        memory: 45,
        apiCalls: 156
      }
    },
    {
      id: 'pricing-agent',
      name: 'Dynamic Pricing Agent',
      status: 'active',
      actionsToday: 156,
      actionsLastHour: 8,
      successRate: 87.3,
      avgResponseTime: 0.8,
      errorCount: 5,
      efficiency: 95.7,
      automationLevel: 'automatic',
      lastAction: '2024-01-15 14:35:42',
      nextScheduled: '2024-01-15 14:45:00',
      resourceUsage: {
        cpu: 18,
        memory: 32,
        apiCalls: 423
      }
    },
    {
      id: 'inventory-agent',
      name: 'Inventory Sync Agent',
      status: 'active',
      actionsToday: 234,
      actionsLastHour: 12,
      successRate: 99.2,
      avgResponseTime: 1.2,
      errorCount: 1,
      efficiency: 97.8,
      automationLevel: 'automatic',
      lastAction: '2024-01-15 14:30:00',
      nextScheduled: '2024-01-15 14:45:00',
      resourceUsage: {
        cpu: 15,
        memory: 28,
        apiCalls: 89
      }
    },
    {
      id: 'review-agent',
      name: 'Review Monitoring Agent',
      status: 'active',
      actionsToday: 23,
      actionsLastHour: 1,
      successRate: 91.7,
      avgResponseTime: 4.5,
      errorCount: 0,
      efficiency: 82.4,
      automationLevel: 'assisted',
      lastAction: '2024-01-15 14:28:45',
      nextScheduled: '2024-01-15 16:00:00',
      resourceUsage: {
        cpu: 8,
        memory: 19,
        apiCalls: 34
      }
    },
    {
      id: 'blog-agent',
      name: 'Content Generation Agent',
      status: 'idle',
      actionsToday: 3,
      actionsLastHour: 0,
      successRate: 88.9,
      avgResponseTime: 12.7,
      errorCount: 0,
      efficiency: 75.3,
      automationLevel: 'assisted',
      lastAction: '2024-01-15 12:00:00',
      nextScheduled: '2024-01-16 09:00:00',
      resourceUsage: {
        cpu: 5,
        memory: 12,
        apiCalls: 67
      }
    },
    {
      id: 'social-agent',
      name: 'Social Media Agent',
      status: 'active',
      actionsToday: 8,
      actionsLastHour: 1,
      successRate: 85.4,
      avgResponseTime: 3.2,
      errorCount: 1,
      efficiency: 78.9,
      automationLevel: 'assisted',
      lastAction: '2024-01-15 13:15:30',
      nextScheduled: '2024-01-15 17:00:00',
      resourceUsage: {
        cpu: 12,
        memory: 22,
        apiCalls: 45
      }
    },
    {
      id: 'chatbot-agent',
      name: 'Customer Service Chatbot',
      status: 'active',
      actionsToday: 89,
      actionsLastHour: 7,
      successRate: 92.1,
      avgResponseTime: 2.8,
      errorCount: 3,
      efficiency: 91.5,
      automationLevel: 'automatic',
      lastAction: '2024-01-15 14:35:22',
      nextScheduled: 'Continuous',
      resourceUsage: {
        cpu: 25,
        memory: 38,
        apiCalls: 267
      }
    },
    {
      id: 'prospecting-agent',
      name: 'Lead Prospecting Agent',
      status: 'error',
      actionsToday: 12,
      actionsLastHour: 0,
      successRate: 76.8,
      avgResponseTime: 8.4,
      errorCount: 7,
      efficiency: 68.2,
      automationLevel: 'manual',
      lastAction: '2024-01-15 10:30:00',
      nextScheduled: 'Manual trigger',
      resourceUsage: {
        cpu: 3,
        memory: 8,
        apiCalls: 23
      }
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentMetrics(prev => (prev || []).map(agent => ({
        ...agent,
        actionsLastHour: agent.status === 'active' ? agent.actionsLastHour + Math.floor(Math.random() * 2) : agent.actionsLastHour,
        resourceUsage: {
          ...agent.resourceUsage,
          cpu: Math.max(0, Math.min(100, agent.resourceUsage.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, agent.resourceUsage.memory + (Math.random() - 0.5) * 8))
        }
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [setAgentMetrics])

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

  const getAutomationIcon = (level: string) => {
    switch (level) {
      case 'automatic': return <Lightning className="h-4 w-4 text-green-600" />
      case 'assisted': return <Target className="h-4 w-4 text-blue-600" />
      case 'manual': return <Eye className="h-4 w-4 text-orange-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const totalActions = (agentMetrics || []).reduce((sum, agent) => sum + agent.actionsToday, 0)
  const avgSuccessRate = (agentMetrics || []).reduce((sum, agent) => sum + agent.successRate, 0) / (agentMetrics?.length || 1)
  const activeAgents = (agentMetrics || []).filter(agent => agent.status === 'active').length
  const errorCount = (agentMetrics || []).reduce((sum, agent) => sum + agent.errorCount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Agent Performance Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Real-time monitoring of AI agent performance, efficiency, and resource usage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={selectedPeriod === '1h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('1h')}
          >
            1H
          </Button>
          <Button 
            variant={selectedPeriod === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('24h')}
          >
            24H
          </Button>
          <Button 
            variant={selectedPeriod === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('7d')}
          >
            7D
          </Button>
          <Button 
            variant={selectedPeriod === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('30d')}
          >
            30D
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Agents</p>
                <p className="text-3xl font-bold text-blue-700">{activeAgents}/{agentMetrics?.length || 0}</p>
              </div>
              <Robot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Actions</p>
                <p className="text-3xl font-bold text-green-700">{totalActions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Success Rate</p>
                <p className="text-3xl font-bold text-purple-700">{avgSuccessRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Errors</p>
                <p className="text-3xl font-bold text-red-700">{errorCount}</p>
              </div>
              <Warning className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {(agentMetrics || []).map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                    <Robot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {getAutomationIcon(agent.automationLevel)}
                      <span className="capitalize">{agent.automationLevel} mode</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {getStatusIcon(agent.status)}
                  <span className="ml-1 capitalize">{agent.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-primary">{agent.actionsToday}</div>
                  <div className="text-xs text-muted-foreground">Actions Today</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{agent.successRate}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{agent.efficiency}%</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Response Time
                  </span>
                  <span className="font-medium">{agent.avgResponseTime}s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <TrendUp className="h-4 w-4" />
                    Last Hour
                  </span>
                  <span className="font-medium">{agent.actionsLastHour} actions</span>
                </div>
                {agent.errorCount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-red-600">
                      <Warning className="h-4 w-4" />
                      Errors Today
                    </span>
                    <span className="font-medium text-red-600">{agent.errorCount}</span>
                  </div>
                )}
              </div>

              {/* Resource Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="font-medium">{agent.resourceUsage.cpu}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${agent.resourceUsage.cpu}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Memory</span>
                  <span className="font-medium">{agent.resourceUsage.memory}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all" 
                    style={{ width: `${agent.resourceUsage.memory}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  {agent.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                <Button size="sm" variant="outline">
                  <ArrowsClockwise className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            System Health Summary
          </CardTitle>
          <CardDescription>Overall agent ecosystem performance and health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Performing Well</h4>
              <div className="space-y-2">
                {(agentMetrics || []).filter(a => a.efficiency > 85 && a.status === 'active').map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <Badge className="bg-green-100 text-green-800">{agent.efficiency}%</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-700">Needs Attention</h4>
              <div className="space-y-2">
                {(agentMetrics || []).filter(a => a.efficiency <= 85 && a.efficiency > 70).map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{agent.efficiency}%</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-700">Critical Issues</h4>
              <div className="space-y-2">
                {(agentMetrics || []).filter(a => a.efficiency <= 70 || a.status === 'error').map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <Badge className="bg-red-100 text-red-800">
                      {agent.status === 'error' ? 'Error' : `${agent.efficiency}%`}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}