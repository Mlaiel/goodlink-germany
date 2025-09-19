import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  ShoppingCart,
  Globe,
  CreditCard,
  Package,
  Eye,
  PencilSimple as Edit,
  Trash,
  Plus,
  Gear as Settings,
  Users,
  TrendUp,
  Star,
  CheckCircle,
  Clock,
  Truck,
  Heart,
  Share
} from "@phosphor-icons/react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ShopProduct {
  id: number
  sku: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  images: string[]
  status: 'active' | 'draft' | 'out-of-stock'
  featured: boolean
  rating: number
  reviews: number
}

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
  date: string
  paymentMethod: string
}

interface ShopSettings {
  name: string
  description: string
  currency: string
  language: string
  taxRate: number
  shippingFee: number
  freeShippingThreshold: number
  emailNotifications: boolean
  inventoryAlerts: boolean
  autoFulfillment: boolean
}

const shopSalesData = [
  { name: 'Mon', sales: 2400, orders: 12 },
  { name: 'Tue', sales: 1398, orders: 8 },
  { name: 'Wed', sales: 9800, orders: 18 },
  { name: 'Thu', sales: 3908, orders: 14 },
  { name: 'Fri', sales: 4800, orders: 22 },
  { name: 'Sat', sales: 3800, orders: 16 },
  { name: 'Sun', sales: 4300, orders: 19 }
]

const categoryData = [
  { name: 'Electronics', value: 45, color: 'oklch(0.6 0.2 20)' },
  { name: 'Accessories', value: 30, color: 'oklch(0.25 0.08 240)' },
  { name: 'Audio', value: 15, color: 'oklch(0.6 0.02 240)' },
  { name: 'Wearables', value: 10, color: 'oklch(0.7 0.1 120)' }
]

function ShopOverview() {
  const [shopProducts] = useKV<ShopProduct[]>("shop-products", [
    {
      id: 1,
      sku: "SH-001",
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 199.99,
      stock: 45,
      category: "Electronics",
      images: ["/api/placeholder/300/300"],
      status: "active",
      featured: true,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      sku: "SH-002",
      name: "Smart Fitness Tracker",
      description: "Advanced fitness tracking with heart rate monitoring",
      price: 149.99,
      stock: 23,
      category: "Wearables",
      images: ["/api/placeholder/300/300"],
      status: "active",
      featured: false,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      sku: "SH-003",
      name: "Bluetooth Speaker",
      description: "Portable speaker with exceptional sound quality",
      price: 79.99,
      stock: 0,
      category: "Audio",
      images: ["/api/placeholder/300/300"],
      status: "out-of-stock",
      featured: false,
      rating: 4.4,
      reviews: 67
    }
  ])

  const [orders] = useKV<Order[]>("shop-orders", [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      total: 199.99,
      status: "processing",
      items: 1,
      date: "2024-01-15",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      total: 149.99,
      status: "shipped",
      items: 1,
      date: "2024-01-14",
      paymentMethod: "PayPal"
    }
  ])

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shop Revenue</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€28,406</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">109</div>
            <p className="text-xs text-muted-foreground">
              +12 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-muted-foreground">
              +0.4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€260.60</div>
            <p className="text-xs text-muted-foreground">
              +5.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shop Sales Performance</CardTitle>
            <CardDescription>Daily sales and order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={shopSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.6 0.2 20)" fill="oklch(0.6 0.2 20 / 0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
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
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders from your shop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders?.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'shipped' ? 'secondary' :
                      order.status === 'processing' ? 'outline' :
                      'destructive'
                    }>
                      {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                      {order.status === 'shipped' && <Truck className="h-3 w-3 mr-1" />}
                      {order.status === 'delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{order.customer}</span>
                    <span>•</span>
                    <span>{order.items} items</span>
                    <span>•</span>
                    <span>{order.paymentMethod}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-medium">€{order.total}</div>
                  <Button variant="outline" size="sm" className="mt-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductCatalog() {
  const [products, setProducts] = useKV<ShopProduct[]>("shop-products", [])
  const [isCreating, setIsCreating] = useState(false)

  const handleToggleFeatured = (productId: number) => {
    setProducts((current: ShopProduct[] | undefined) => 
      (current || []).map(product => 
        product.id === productId 
          ? { ...product, featured: !product.featured }
          : product
      )
    )
    toast.success("Product updated successfully")
  }

  const handleDelete = (productId: number) => {
    setProducts((current: ShopProduct[] | undefined) => 
      (current || []).filter(product => product.id !== productId)
    )
    toast.success("Product deleted successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Product Catalog</h3>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(products || []).map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <div className="absolute top-2 right-2 space-x-1">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              {product.featured && (
                <Badge className="absolute top-2 left-2">Featured</Badge>
              )}
              <Badge 
                variant={product.status === 'active' ? 'default' : product.status === 'draft' ? 'secondary' : 'destructive'}
                className="absolute bottom-2 left-2"
              >
                {product.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium leading-tight">{product.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleToggleFeatured(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${product.featured ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">€{product.price}</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    Stock: {product.stock}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {product.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ShopSettings() {
  const [shopSettings, setShopSettings] = useKV<ShopSettings>("shop-settings", {
    name: "Goodlink Shop",
    description: "Premium electronics and accessories",
    currency: "EUR",
    language: "en",
    taxRate: 19,
    shippingFee: 4.99,
    freeShippingThreshold: 50,
    emailNotifications: true,
    inventoryAlerts: true,
    autoFulfillment: false
  })

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  if (!shopSettings) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Shop Configuration</h3>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Configure your shop's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop-name">Shop Name</Label>
              <Input 
                id="shop-name"
                value={shopSettings.name}
                onChange={(e) => setShopSettings(prev => ({ 
                  ...prev!, 
                  name: e.target.value 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shop-description">Description</Label>
              <Textarea 
                id="shop-description"
                value={shopSettings.description}
                onChange={(e) => setShopSettings(prev => ({ 
                  ...prev!, 
                  description: e.target.value 
                }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input 
                  id="currency"
                  value={shopSettings.currency}
                  onChange={(e) => setShopSettings(prev => ({ 
                    ...prev!, 
                    currency: e.target.value 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input 
                  id="language"
                  value={shopSettings.language}
                  onChange={(e) => setShopSettings(prev => ({ 
                    ...prev!, 
                    language: e.target.value 
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing & Shipping</CardTitle>
            <CardDescription>Configure pricing and shipping options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input 
                id="tax-rate"
                type="number"
                value={shopSettings.taxRate}
                onChange={(e) => setShopSettings(prev => ({ 
                  ...prev!, 
                  taxRate: parseFloat(e.target.value) 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping-fee">Shipping Fee (€)</Label>
              <Input 
                id="shipping-fee"
                type="number"
                step="0.01"
                value={shopSettings.shippingFee}
                onChange={(e) => setShopSettings(prev => ({ 
                  ...prev!, 
                  shippingFee: parseFloat(e.target.value) 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="free-shipping">Free Shipping Threshold (€)</Label>
              <Input 
                id="free-shipping"
                type="number"
                step="0.01"
                value={shopSettings.freeShippingThreshold}
                onChange={(e) => setShopSettings(prev => ({ 
                  ...prev!, 
                  freeShippingThreshold: parseFloat(e.target.value) 
                }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive order and customer notifications</p>
              </div>
              <Switch 
                id="email-notifications"
                checked={shopSettings.emailNotifications}
                onCheckedChange={(checked) => setShopSettings(prev => ({ 
                  ...prev!, 
                  emailNotifications: checked 
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
              </div>
              <Switch 
                id="inventory-alerts"
                checked={shopSettings.inventoryAlerts}
                onCheckedChange={(checked) => setShopSettings(prev => ({ 
                  ...prev!, 
                  inventoryAlerts: checked 
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-fulfillment">Auto Fulfillment</Label>
                <p className="text-sm text-muted-foreground">Automatically fulfill orders when possible</p>
              </div>
              <Switch 
                id="auto-fulfillment"
                checked={shopSettings.autoFulfillment}
                onCheckedChange={(checked) => setShopSettings(prev => ({ 
                  ...prev!, 
                  autoFulfillment: checked 
                }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>Payment and shipping integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">Stripe</span>
                </div>
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">PayPal</span>
                </div>
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm">DHL</span>
                </div>
                <Badge variant="secondary">Setup Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

export function ShopDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6" />
            E-Commerce Shop
          </h2>
          <p className="text-muted-foreground">Manage your direct-to-consumer online store</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Shop
          </Button>
          <Button>
            <Share className="h-4 w-4 mr-2" />
            Share Shop
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ShopOverview />
        </TabsContent>

        <TabsContent value="products">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Manage customer orders and fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Order management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <ShopSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}