import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Storefront,
  ShoppingCart,
  CreditCard,
  Users,
  TrendUp,
  Package,
  CheckCircle,
  Warning,
  XCircle,
  Globe,
  Gear,
  Plus,
  Star,
  Heart,
  Eye,
  Lightning
} from "@phosphor-icons/react"

interface ShopOrder {
  id: string
  customer: string
  email: string
  items: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: Date
  paymentMethod: string
}

interface ShopProduct {
  id: string
  name: string
  price: number
  stock: number
  category: string
  views: number
  sales: number
  rating: number
}

interface ShopCustomer {
  id: string
  name: string
  email: string
  orders: number
  totalSpent: number
  lastOrder: Date
  status: 'active' | 'inactive'
}

export function ShopDashboard() {
  const [shopEnabled, setShopEnabled] = useKV<boolean>("shop-enabled", true)
  const [shopDomain, setShopDomain] = useKV("shop-domain", "shop.goodlink-germany.com")
  const [currencyCode, setCurrencyCode] = useKV("shop-currency", "EUR")
  const [maintenanceMode, setMaintenanceMode] = useKV<boolean>("shop-maintenance", false)
  
  const [orders] = useKV<ShopOrder[]>("shop-orders", [
    {
      id: "ORD-2024-001",
      customer: "Anna Mueller",
      email: "anna@example.com",
      items: 2,
      total: 159.99,
      status: 'processing',
      date: new Date(),
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-2024-002",
      customer: "Max Schmidt",
      email: "max@example.com", 
      items: 1,
      total: 89.99,
      status: 'shipped',
      date: new Date(Date.now() - 86400000),
      paymentMethod: "PayPal"
    },
    {
      id: "ORD-2024-003",
      customer: "Lisa Weber",
      email: "lisa@example.com",
      items: 3,
      total: 299.97,
      status: 'delivered',
      date: new Date(Date.now() - 172800000),
      paymentMethod: "Klarna"
    }
  ])

  const [products] = useKV<ShopProduct[]>("shop-products", [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 159.99,
      stock: 45,
      category: "Electronics",
      views: 1247,
      sales: 89,
      rating: 4.6
    },
    {
      id: "2",
      name: "Smart Fitness Tracker", 
      price: 89.99,
      stock: 23,
      category: "Wearables",
      views: 892,
      sales: 67,
      rating: 4.4
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 99.99,
      stock: 67,
      category: "Audio",
      views: 1456,
      sales: 134,
      rating: 4.7
    }
  ])

  const [customers] = useKV<ShopCustomer[]>("shop-customers", [
    {
      id: "1",
      name: "Anna Mueller",
      email: "anna@example.com",
      orders: 3,
      totalSpent: 449.97,
      lastOrder: new Date(),
      status: 'active'
    },
    {
      id: "2",
      name: "Max Schmidt", 
      email: "max@example.com",
      orders: 1,
      totalSpent: 89.99,
      lastOrder: new Date(Date.now() - 86400000),
      status: 'active'
    }
  ])

  const getShopMetrics = () => {
    const totalOrders = orders?.length || 0
    const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0
    const totalCustomers = customers?.length || 0
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0
    const processingOrders = orders?.filter(o => o.status === 'processing').length || 0
    const shippedOrders = orders?.filter(o => o.status === 'shipped').length || 0

    return {
      totalOrders,
      totalRevenue,
      totalCustomers,
      avgOrderValue,
      pendingOrders,
      processingOrders,
      shippedOrders
    }
  }

  const metrics = getShopMetrics()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Warning className="h-3 w-3" />
      case 'processing': return <Package className="h-3 w-3" />
      case 'shipped': return <Lightning className="h-3 w-3" />
      case 'delivered': return <CheckCircle className="h-3 w-3" />
      default: return <XCircle className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Storefront className="h-6 w-6" />
            Headless E-Commerce Shop
          </h2>
          <p className="text-muted-foreground">Direct-to-consumer online store powered by AI</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={shopEnabled ? "default" : "secondary"}>
            {shopEnabled ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Live
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Offline
              </>
            )}
          </Badge>
          <Button variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Visit Shop
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{metrics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +23% new customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{metrics.avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <p className="text-xs text-muted-foreground">
              +0.8% improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-yellow-50">
                {metrics.pendingOrders} Pending
              </Badge>
              <Badge variant="outline" className="bg-blue-50">
                {metrics.processingOrders} Processing
              </Badge>
              <Badge variant="outline" className="bg-purple-50">
                {metrics.shippedOrders} Shipped
              </Badge>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {orders?.map((order, index) => (
                  <div key={order.id} className={`p-4 ${index !== orders.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.customer} • {order.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.date.toLocaleDateString()} • {order.paymentMethod}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">€{order.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.items} items</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Product Catalog</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">€{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold">{product.stock}</div>
                      <div className="text-xs text-muted-foreground">Stock</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{product.views}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{product.sales}</div>
                      <div className="text-xs text-muted-foreground">Sales</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span>{((product.sales / product.views) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(product.sales / product.views) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Management</h3>
            <Button variant="outline">
              Export Customers
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {customers?.map((customer, index) => (
                  <div key={customer.id} className={`p-4 ${index !== customers.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{customer.name}</span>
                          <Badge variant={customer.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {customer.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Last order: {customer.lastOrder.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-bold">€{customer.totalSpent.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                        <div className="text-xs text-muted-foreground">
                          Avg: €{(customer.totalSpent / customer.orders).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gear className="h-5 w-5" />
                  Shop Configuration
                </CardTitle>
                <CardDescription>Basic shop settings and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shop Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable the online shop
                    </p>
                  </div>
                  <Switch
                    checked={shopEnabled}
                    onCheckedChange={setShopEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Show maintenance page to visitors
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shop-domain">Shop Domain</Label>
                  <Input
                    id="shop-domain"
                    value={shopDomain}
                    onChange={(e) => setShopDomain(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment & Shipping</CardTitle>
                <CardDescription>Configure payment methods and shipping options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Enabled Payment Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm">Credit Card (Stripe)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</span>
                      <span className="text-sm">PayPal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="w-4 h-4 bg-pink-500 rounded text-white text-xs flex items-center justify-center font-bold">K</span>
                      <span className="text-sm">Klarna</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span className="w-4 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">S</span>
                      <span className="text-sm">SEPA Direct Debit</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Shipping Providers</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">DHL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">UPS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span className="text-sm">Sendcloud</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Features</CardTitle>
              <CardDescription>Configure intelligent shop features and automation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-sm">Smart Product Recommendations</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI-powered product suggestions based on customer behavior
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-sm">Dynamic Pricing</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically adjust prices based on demand and competition
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-sm">Inventory Forecasting</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Predict stock needs and automate reordering
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-sm">Chatbot Support</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    24/7 AI customer support with multilingual capabilities
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-sm">Personalized Content</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Customize product descriptions and content per customer
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch />
                    <Label className="text-sm">Fraud Detection</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI-powered fraud prevention and risk assessment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}