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
  Globe
} from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'

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
}

export function AdminPanel() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV('admin-active-tab', 'overview')
  const defaultSettings: SystemSettings = {
    maintenanceMode: false,
    allowRegistrations: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxConcurrentUsers: 1000,
    sessionTimeout: 30
  }

  const [systemSettings, setSystemSettings] = useKV<SystemSettings>('admin-system-settings', defaultSettings)

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
    { id: 1, level: 'info', message: 'User authentication successful', timestamp: '2024-01-15 14:32:21', user: 'admin@goodlink.de' },
    { id: 2, level: 'warning', message: 'High memory usage detected', timestamp: '2024-01-15 14:28:45', user: 'system' },
    { id: 3, level: 'error', message: 'Payment gateway timeout', timestamp: '2024-01-15 14:25:12', user: 'payment-service' },
    { id: 4, level: 'info', message: 'Backup completed successfully', timestamp: '2024-01-15 14:20:00', user: 'backup-service' },
    { id: 5, level: 'info', message: 'AI agent training completed', timestamp: '2024-01-15 14:15:33', user: 'ai-service' }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
          <p className="text-muted-foreground">Complete system administration and control</p>
        </div>
        <Badge variant="outline" className={`${getHealthColor(systemMetrics.systemHealth)} border-current`}>
          {getHealthIcon(systemMetrics.systemHealth)}
          <span className="ml-1">System {systemMetrics.systemHealth}</span>
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('admin.overview')}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('admin.users')}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t('admin.settings')}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendUp className="h-4 w-4" />
            {t('admin.analytics')}
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('admin.logs')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{userStats.newThisWeek} this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{systemMetrics.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((systemMetrics.activeUsers / systemMetrics.totalUsers) * 100)}% of total users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <TrendUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.totalOrders.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
              <CardDescription>Real-time server performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-muted-foreground">{systemMetrics.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemMetrics.memoryUsage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-muted-foreground">{systemMetrics.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemMetrics.cpuUsage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-sm text-muted-foreground">{systemMetrics.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemMetrics.diskUsage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div className="text-2xl font-bold">{userStats.totalRegistered.toLocaleString()}</div>
                </div>
                <p className="text-xs text-muted-foreground">Total Registered</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <div className="text-2xl font-bold">{userStats.activeToday.toLocaleString()}</div>
                </div>
                <p className="text-xs text-muted-foreground">Active Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-purple-600" />
                  <div className="text-2xl font-bold">{userStats.newThisWeek}</div>
                </div>
                <p className="text-xs text-muted-foreground">New This Week</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gold-600" />
                  <div className="text-2xl font-bold">{userStats.premiumUsers}</div>
                </div>
                <p className="text-xs text-muted-foreground">Premium Users</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Search, filter, and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search users..." className="flex-1" />
                  <Button>Search</Button>
                  <Button variant="outline">Export Users</Button>
                </div>
                
                <div className="border rounded-lg">
                  <div className="p-4 border-b bg-muted/50">
                    <div className="grid grid-cols-5 gap-4 font-medium text-sm">
                      <span>User</span>
                      <span>Email</span>
                      <span>Status</span>
                      <span>Registration</span>
                      <span>Actions</span>
                    </div>
                  </div>
                  <div className="divide-y">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="p-4">
                        <div className="grid grid-cols-5 gap-4 items-center text-sm">
                          <span className="font-medium">User {i}</span>
                          <span className="text-muted-foreground">user{i}@example.com</span>
                          <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                            {i % 2 === 0 ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-muted-foreground">2024-01-{String(i).padStart(2, '0')}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Suspend</Button>
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

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.settings')}</CardTitle>
              <CardDescription>Configure global system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
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
                        setSystemSettings((prev = {
                          maintenanceMode: false,
                          allowRegistrations: true,
                          enableNotifications: true,
                          enableAnalytics: true,
                          maxConcurrentUsers: 1000,
                          sessionTimeout: 30
                        }) => ({ ...prev, maintenanceMode: checked }))
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
                        setSystemSettings((prev = defaultSettings) => ({ ...prev, allowRegistrations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send system notifications to users
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.enableNotifications || true}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSettings) => ({ ...prev, enableNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect anonymous usage analytics
                      </p>
                    </div>
                    <Switch 
                      checked={systemSettings?.enableAnalytics || true}
                      onCheckedChange={(checked) => 
                        setSystemSettings((prev = defaultSettings) => ({ ...prev, enableAnalytics: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers">Maximum Concurrent Users</Label>
                    <Input 
                      id="maxUsers"
                      type="number" 
                      value={systemSettings?.maxConcurrentUsers || 1000}
                      onChange={(e) => 
                        setSystemSettings((prev = defaultSettings) => ({ 
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
                        setSystemSettings((prev = defaultSettings) => ({ 
                          ...prev, 
                          sessionTimeout: parseInt(e.target.value) || 30 
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="announcement">System Announcement</Label>
                    <Textarea 
                      id="announcement"
                      placeholder="Enter system announcement message..."
                      rows={3}
                    />
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.analytics')}</CardTitle>
              <CardDescription>Detailed system performance and usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Advanced analytics dashboard coming soon...</p>
                <p className="text-sm">Integration with business intelligence tools in progress</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.logs')}</CardTitle>
              <CardDescription>System events and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Filter logs..." className="flex-1" />
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export Logs</Button>
                  <Button variant="outline">Clear Logs</Button>
                </div>

                <div className="border rounded-lg">
                  <div className="divide-y max-h-96 overflow-y-auto">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          {getLevelIcon(log.level)}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm">{log.message}</span>
                              <Badge variant="outline" className="text-xs">
                                {log.level}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span>{log.user}</span>
                            </div>
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