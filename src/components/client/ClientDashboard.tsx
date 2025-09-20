import React from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/LanguageContext"
import { 
  Package, 
  ChartLine, 
  ShoppingCart, 
  Star, 
  TrendUp,
  Eye,
  Heart,
  ChatCircle,
  Users,
  CreditCard
} from "@phosphor-icons/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ClientStats {
  orders: number
  revenue: number
  products: number
  rating: number
  views: number
  favorites: number
}

// Client-specific dashboard focused on business metrics
export function ClientDashboard() {
  const { t } = useLanguage()
  const [clientStats, setClientStats] = useKV<ClientStats>("client-stats", {
    orders: 156,
    revenue: 23450,
    products: 89,
    rating: 4.8,
    views: 12450,
    favorites: 234
  })

  const stats = clientStats || {
    orders: 0,
    revenue: 0,
    products: 0,
    rating: 0,
    views: 0,
    favorites: 0
  }

  const salesData = [
    { month: 'Jan', sales: 4000, orders: 45 },
    { month: 'Feb', sales: 3000, orders: 52 },
    { month: 'Mar', sales: 5000, orders: 48 },
    { month: 'Apr', sales: 4500, orders: 61 },
    { month: 'May', sales: 6000, orders: 55 },
    { month: 'Jun', sales: 5500, orders: 67 }
  ]

  const categoryData = [
    { name: 'Electronics', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Fashion', value: 30, color: 'hsl(var(--accent))' },
    { name: 'Home & Garden', value: 15, color: 'hsl(var(--secondary))' },
    { name: 'Others', value: 10, color: 'hsl(var(--muted))' }
  ]

  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+5</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rating}/5</div>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-3 w-3 ${star <= Math.floor(stats.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+25%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5" />
            Sales Performance
          </CardTitle>
          <CardDescription>
            Monthly sales and order trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} name="Sales (€)" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" strokeWidth={2} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Categories
            </CardTitle>
            <CardDescription>
              Distribution of products by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your business efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Package className="h-6 w-6" />
                <span className="text-sm">Add Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ChartLine className="h-6 w-6" />
                <span className="text-sm">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ChatCircle className="h-6 w-6" />
                <span className="text-sm">Customer Support</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendUp className="h-6 w-6" />
                <span className="text-sm">Marketing</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}