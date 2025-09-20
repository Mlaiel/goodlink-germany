import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  Database,
  Lightning,
  CheckCircle,
  Warning,
  XCircle,
  Clock,
  Storefront,
  Package,
  TrendUp,
  ArrowsClockwise,
  Robot,
  Play,
  Pause
} from "@phosphor-icons/react"

interface InventoryItem {
  id: string
  sku: string
  name: string
  currentStock: number
  marketplaceStock: { [key: string]: number }
  lastSync: Date
  syncStatus: 'synced' | 'pending' | 'error'
}

interface SyncRule {
  id: string
  name: string
  trigger: string
  action: string
  enabled: boolean
  frequency: string
}

export function InventorySyncDashboard() {
  const [autoSync, setAutoSync] = useKV<boolean>("inventory-auto-sync", true)
  const [syncInterval, setSyncInterval] = useKV("inventory-sync-interval", "15")
  const [lowStockAlert, setLowStockAlert] = useKV("inventory-low-stock-alert", "10")
  
  const [inventoryItems] = useKV<InventoryItem[]>("inventory-items", [
    {
      id: "1",
      sku: "GL-001",
      name: "Premium Wireless Headphones",
      currentStock: 45,
      marketplaceStock: { amazon: 43, ebay: 45, otto: 44 },
      lastSync: new Date(),
      syncStatus: 'synced'
    },
    {
      id: "2", 
      sku: "GL-002",
      name: "Smart Fitness Tracker",
      currentStock: 23,
      marketplaceStock: { amazon: 20, ebay: 23, otto: 22 },
      lastSync: new Date(Date.now() - 300000),
      syncStatus: 'pending'
    },
    {
      id: "3",
      sku: "GL-003", 
      name: "Bluetooth Speaker",
      currentStock: 67,
      marketplaceStock: { amazon: 65, ebay: 0, otto: 67 },
      lastSync: new Date(Date.now() - 1800000),
      syncStatus: 'error'
    }
  ])

  const [syncRules] = useKV<SyncRule[]>("inventory-sync-rules", [
    {
      id: "1",
      name: "Low Stock Auto-Reorder",
      trigger: "stock < 10",
      action: "Create reorder notification",
      enabled: true,
      frequency: "immediate"
    },
    {
      id: "2",
      name: "Evening Inventory Sync", 
      trigger: "daily 18:00",
      action: "Full marketplace sync",
      enabled: true,
      frequency: "daily"
    },
    {
      id: "3",
      name: "Stock Discrepancy Alert",
      trigger: "marketplace != local",
      action: "Send alert email",
      enabled: true,
      frequency: "immediate"
    }
  ])

  const handleManualSync = async () => {
    toast.info("Starting manual inventory sync...")
    // Simulate sync process
    setTimeout(() => {
      toast.success("Inventory sync completed successfully!")
    }, 3000)
  }

  const handleBulkUpdate = async () => {
    toast.info("Updating all marketplace inventories...")
    setTimeout(() => {
      toast.success("Bulk inventory update completed!")
    }, 5000)
  }

  const getSyncMetrics = () => {
    const totalItems = inventoryItems?.length || 0
    const syncedItems = inventoryItems?.filter(item => item.syncStatus === 'synced').length || 0
    const pendingItems = inventoryItems?.filter(item => item.syncStatus === 'pending').length || 0
    const errorItems = inventoryItems?.filter(item => item.syncStatus === 'error').length || 0
    const syncRate = totalItems > 0 ? Math.round((syncedItems / totalItems) * 100) : 100

    return { totalItems, syncedItems, pendingItems, errorItems, syncRate }
  }

  const metrics = getSyncMetrics()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Warning className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" />
            Real-Time Inventory Sync
          </h2>
          <p className="text-muted-foreground">Unified inventory management across all marketplaces</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleManualSync}>
            <ArrowsClockwise className="h-4 w-4 mr-2" />
            Manual Sync
          </Button>
          <Button variant="outline" onClick={handleBulkUpdate}>
            <Lightning className="h-4 w-4 mr-2" />
            Bulk Update
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Rate</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.syncRate}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.syncedItems}/{metrics.totalItems} items synced
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Syncs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingItems}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting synchronization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Errors</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.errorItems}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Sync</CardTitle>
            <Robot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autoSync ? 'ON' : 'OFF'}</div>
            <p className="text-xs text-muted-foreground">
              Every {syncInterval} minutes
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
          <TabsTrigger value="rules">Sync Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory Status</CardTitle>
              <CardDescription>Real-time stock levels across all connected marketplaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems?.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="outline" className="font-mono text-xs">{item.sku}</Badge>
                          <Badge className={`text-xs ${getStatusColor(item.syncStatus)}`}>
                            {getStatusIcon(item.syncStatus)}
                            {item.syncStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last sync: {new Date(item.lastSync).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{item.currentStock}</div>
                        <p className="text-sm text-muted-foreground">Current Stock</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">Amazon</div>
                        <div className="text-lg font-bold">{item.marketplaceStock.amazon || 0}</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">eBay</div>
                        <div className="text-lg font-bold">{item.marketplaceStock.ebay || 0}</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">OTTO</div>
                        <div className="text-lg font-bold">{item.marketplaceStock.otto || 0}</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">Kaufland</div>
                        <div className="text-lg font-bold">-</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">bol.com</div>
                        <div className="text-lg font-bold">-</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">Cdiscount</div>
                        <div className="text-lg font-bold">-</div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <ArrowsClockwise className="h-4 w-4 mr-1" />
                        Sync Now
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Stock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Automated Sync Rules</h3>
            <Button>
              <Robot className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {syncRules?.map((rule) => (
              <Card key={rule.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{rule.name}</CardTitle>
                    <Badge variant={rule.enabled ? "default" : "secondary"}>
                      {rule.enabled ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                      {rule.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Trigger:</span>
                      <div className="font-mono text-xs bg-muted p-1 rounded mt-1">{rule.trigger}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Action:</span>
                      <div className="text-xs mt-1">{rule.action}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="ml-1 text-xs capitalize">{rule.frequency}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sync Configuration</CardTitle>
                <CardDescription>Configure automatic inventory synchronization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Sync Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync inventory across marketplaces
                    </p>
                  </div>
                  <Button
                    variant={autoSync ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoSync(!autoSync)}
                  >
                    {autoSync ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                  <Input
                    id="sync-interval"
                    type="number"
                    value={syncInterval}
                    onChange={(e) => setSyncInterval(e.target.value)}
                    min="5"
                    max="1440"
                  />
                  <p className="text-sm text-muted-foreground">
                    How often to check for inventory changes (5-1440 minutes)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="low-stock-alert">Low Stock Alert Threshold</Label>
                  <Input
                    id="low-stock-alert"
                    type="number"
                    value={lowStockAlert}
                    onChange={(e) => setLowStockAlert(e.target.value)}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Send alerts when stock falls below this level
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketplace Priorities</CardTitle>
                <CardDescription>Configure sync priorities and buffer stocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Amazon</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Buffer:</span>
                      <Input className="w-16 h-8" defaultValue="2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">eBay</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Buffer:</span>
                      <Input className="w-16 h-8" defaultValue="1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">OTTO</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Buffer:</span>
                      <Input className="w-16 h-8" defaultValue="1" />
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Buffer stock ensures you maintain minimum inventory levels on each marketplace
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}