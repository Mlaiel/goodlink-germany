import React from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/LanguageContext"
import { 
  ShieldCheck, 
  Gear, 
  Users, 
  CreditCard, 
  Eye, 
  Database,
  Activity,
  Warning,
  TrendUp,
  CheckCircle,
  XCircle
} from "@phosphor-icons/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  systemUptime: number
  apiCalls: number
  dbSize: number
}

// Admin-specific dashboard with system management features
export function AdminDashboard() {
  const { t } = useLanguage()
  const [systemStats, setSystemStats] = useKV<SystemStats>("admin-system-stats", {
    totalUsers: 1247,
    activeUsers: 856,
    totalRevenue: 2847563,
    systemUptime: 99.97,
    apiCalls: 8934567,
    dbSize: 2.4
  })

  // Ensure systemStats is properly typed
  const stats = systemStats || {
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    systemUptime: 0,
    apiCalls: 0,
    dbSize: 0
  }

  const systemHealthData = [
    { name: 'CPU', usage: 45, status: 'healthy' },
    { name: 'Memory', usage: 67, status: 'warning' },
    { name: 'Storage', usage: 23, status: 'healthy' },
    { name: 'Network', usage: 89, status: 'critical' },
    { name: 'Database', usage: 34, status: 'healthy' }
  ]

  const userActivityData = [
    { month: 'Jan', users: 1200, revenue: 45000 },
    { month: 'Feb', users: 1350, revenue: 52000 },
    { month: 'Mar', users: 1180, revenue: 48000 },
    { month: 'Apr', users: 1420, revenue: 58000 },
    { month: 'May', users: 1650, revenue: 67000 },
    { month: 'Jun', users: 1247, revenue: 61000 }
  ]

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Excellent</span> performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Monitoring
          </CardTitle>
          <CardDescription>
            Real-time system resource monitoring and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealthData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium w-20">{item.name}</span>
                  {item.status === 'healthy' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {item.status === 'warning' && <Warning className="h-4 w-4 text-yellow-500" />}
                  {item.status === 'critical' && <XCircle className="h-4 w-4 text-red-500" />}
                </div>
                <div className="flex items-center gap-3 w-32">
                  <Progress value={item.usage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-10">{item.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Activity Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Activity & Revenue Analytics
          </CardTitle>
          <CardDescription>
            Monthly user growth and revenue tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="users" fill="hsl(var(--primary))" name="Active Users" />
              <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--accent))" name="Revenue (€)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Admin Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gear className="h-5 w-5" />
            System Administration
          </CardTitle>
          <CardDescription>
            Administrative tools and system management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-6 w-6" />
              <span className="text-sm">Database</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-sm">Security</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Eye className="h-6 w-6" />
              <span className="text-sm">Audit Logs</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Gear className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}