import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Robot,
  Activity,
  Clock,
  CheckCircle,
  Warning,
  XCircle,
  TrendUp,
  TrendDown,
  ChartLine,
  Database,
  Cpu,
  Lightning,
  Eye,
  ArrowsClockwise,
  Bell,
  ChartBar,
  Timer,
  Brain,
  Gauge
} from '@phosphor-icons/react'
import { useLanguage } from '@/components/LanguageContext'

interface AgentPerformance {
  id: string
  name: string
  type: 'marketplace' | 'communication' | 'content' | 'analysis'
  status: 'active' | 'idle' | 'error' | 'maintenance'
  uptime: number
  tasksCompleted: number
  successRate: number
  avgResponseTime: number
  cpuUsage: number
  memoryUsage: number
  errorRate: number
  lastActivity: string
  throughput: number
  queued_tasks: number
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical'
  apiCalls: number
  tokensUsed: number
  costToday: number
  errorRate: number
  avgLatency: number
}

export function AIAgentMonitoringDashboard() {
  const { t } = useLanguage()
  
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h')
  
  const agentPerformance: AgentPerformance[] = [
    {
      id: 'listing-agent',
      name: 'Listing Generation Agent',
      type: 'marketplace',
      status: 'active',
      uptime: 99.8,
      tasksCompleted: 1247,
      successRate: 98.5,
      avgResponseTime: 2.3,
      cpuUsage: 45,
      memoryUsage: 68,
      errorRate: 1.5,
      lastActivity: '2 minutes ago',
      throughput: 85,
      queued_tasks: 12
    },
    {
      id: 'pricing-agent',
      name: 'Dynamic Pricing Agent',
      type: 'marketplace',
      status: 'active',
      uptime: 99.9,
      tasksCompleted: 3428,
      successRate: 99.2,
      avgResponseTime: 1.8,
      cpuUsage: 32,
      memoryUsage: 54,
      errorRate: 0.8,
      lastActivity: '1 minute ago',
      throughput: 142,
      queued_tasks: 5
    },
    {
      id: 'chatbot-agent',
      name: 'Customer Chatbot',
      type: 'communication',
      status: 'active',
      uptime: 99.7,
      tasksCompleted: 892,
      successRate: 96.8,
      avgResponseTime: 1.2,
      cpuUsage: 38,
      memoryUsage: 61,
      errorRate: 3.2,
      lastActivity: '30 seconds ago',
      throughput: 67,
      queued_tasks: 23
    },
    {
      id: 'whatsapp-agent',
      name: 'WhatsApp Business Agent',
      type: 'communication',
      status: 'idle',
      uptime: 98.4,
      tasksCompleted: 156,
      successRate: 94.2,
      avgResponseTime: 3.1,
      cpuUsage: 15,
      memoryUsage: 32,
      errorRate: 5.8,
      lastActivity: '15 minutes ago',
      throughput: 12,
      queued_tasks: 0
    },
    {
      id: 'blog-agent',
      name: 'Content Generation Agent',
      type: 'content',
      status: 'active',
      uptime: 99.6,
      tasksCompleted: 234,
      successRate: 97.4,
      avgResponseTime: 8.5,
      cpuUsage: 52,
      memoryUsage: 76,
      errorRate: 2.6,
      lastActivity: '5 minutes ago',
      throughput: 28,
      queued_tasks: 3
    },
    {
      id: 'review-agent',
      name: 'Review Analysis Agent',
      type: 'analysis',
      status: 'error',
      uptime: 87.2,
      tasksCompleted: 445,
      successRate: 89.3,
      avgResponseTime: 4.7,
      cpuUsage: 0,
      memoryUsage: 0,
      errorRate: 10.7,
      lastActivity: '2 hours ago',
      throughput: 0,
      queued_tasks: 67
    }
  ]

  const systemHealth: SystemHealth = {
    overall: 'healthy',
    apiCalls: 15847,
    tokensUsed: 2847293,
    costToday: 127.45,
    errorRate: 2.8,
    avgLatency: 2.1
  }

  const getStatusColor = (status: AgentPerformance['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'idle': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      case 'maintenance': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: AgentPerformance['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'idle': return <Clock className="h-4 w-4" />
      case 'error': return <XCircle className="h-4 w-4" />
      case 'maintenance': return <ArrowsClockwise className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: AgentPerformance['type']) => {
    switch (type) {
      case 'marketplace': return <ChartBar className="h-4 w-4" />
      case 'communication': return <Bell className="h-4 w-4" />
      case 'content': return <Brain className="h-4 w-4" />
      case 'analysis': return <ChartLine className="h-4 w-4" />
      default: return <Robot className="h-4 w-4" />
    }
  }

  const getHealthColor = (health: SystemHealth['overall']) => {
    switch (health) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Agent Monitoring
          </h2>
          <p className="text-muted-foreground">
            Real-time performance monitoring and system health dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowsClockwise className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid gap-6 md:grid-cols-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">System Health</p>
                <p className={`text-xl font-bold ${getHealthColor(systemHealth.overall)}`}>
                  {systemHealth.overall.charAt(0).toUpperCase() + systemHealth.overall.slice(1)}
                </p>
              </div>
              <Gauge className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">API Calls</p>
                <p className="text-xl font-bold text-blue-700">{systemHealth.apiCalls.toLocaleString()}</p>
              </div>
              <Lightning className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Tokens Used</p>
                <p className="text-xl font-bold text-purple-700">{(systemHealth.tokensUsed / 1000000).toFixed(1)}M</p>
              </div>
              <Brain className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Cost Today</p>
                <p className="text-xl font-bold text-orange-700">${systemHealth.costToday}</p>
              </div>
              <TrendUp className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Error Rate</p>
                <p className="text-xl font-bold text-red-700">{systemHealth.errorRate}%</p>
              </div>
              <Warning className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-teal-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600">Avg Latency</p>
                <p className="text-xl font-bold text-teal-700">{systemHealth.avgLatency}s</p>
              </div>
              <Timer className="h-6 w-6 text-teal-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Robot className="h-5 w-5" />
                Agent Performance Dashboard
              </CardTitle>
              <CardDescription>Real-time monitoring of all AI agents</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Timeframe:</Label>
              <Tabs value={selectedTimeframe} onValueChange={(value) => setSelectedTimeframe(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="1h">1H</TabsTrigger>
                  <TabsTrigger value="24h">24H</TabsTrigger>
                  <TabsTrigger value="7d">7D</TabsTrigger>
                  <TabsTrigger value="30d">30D</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Agent</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Uptime</th>
                  <th className="text-left p-4 font-semibold">Tasks</th>
                  <th className="text-left p-4 font-semibold">Success Rate</th>
                  <th className="text-left p-4 font-semibold">Response Time</th>
                  <th className="text-left p-4 font-semibold">Resource Usage</th>
                  <th className="text-left p-4 font-semibold">Queue</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                          {getTypeIcon(agent.type)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{agent.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{agent.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className={`${getStatusColor(agent.status)} border-0`}>
                        {getStatusIcon(agent.status)}
                        <span className="ml-1 capitalize">{agent.status}</span>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="font-medium">{agent.uptime}%</p>
                        <p className="text-xs text-muted-foreground">{agent.lastActivity}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="font-medium">{agent.tasksCompleted.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{agent.throughput}/hr</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          agent.successRate >= 95 ? 'text-green-600' : 
                          agent.successRate >= 90 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {agent.successRate}%
                        </span>
                        {agent.successRate >= 95 ? 
                          <TrendUp className="h-3 w-3 text-green-500" /> : 
                          <TrendDown className="h-3 w-3 text-red-500" />
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{agent.avgResponseTime}s</span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Cpu className="h-3 w-3" />
                          <span>{agent.cpuUsage}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Database className="h-3 w-3" />
                          <span>{agent.memoryUsage}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={agent.queued_tasks > 50 ? "destructive" : agent.queued_tasks > 10 ? "secondary" : "default"}>
                        {agent.queued_tasks}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <ArrowsClockwise className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightning className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Bulk operations and system controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button className="w-full justify-start">
                <ArrowsClockwise className="h-4 w-4 mr-2" />
                Restart All Agents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View All Logs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendUp className="h-4 w-4 mr-2" />
                Performance Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warning className="h-5 w-5" />
              Active Alerts
            </CardTitle>
            <CardDescription>System notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg bg-red-50 border-red-200">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-700">Review Agent Down</p>
                <p className="text-xs text-red-600">Agent has been offline for 2 hours</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50 border-yellow-200">
              <Warning className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-700">High Queue Volume</p>
                <p className="text-xs text-yellow-600">67 tasks pending in review queue</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-50 border-blue-200">
              <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-700">Maintenance Scheduled</p>
                <p className="text-xs text-blue-600">System maintenance in 2 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}