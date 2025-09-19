import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SyncStatusCard } from '@/components/SyncStatusCard'
import { LiveSyncActivity } from '@/components/LiveSyncActivity'
import { 
  ArrowClockwise, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Warning,
  Activity,
  ArrowsDownUp,
  Funnel,
  Lightning,
  Database,
  Pulse
} from '@phosphor-icons/react'
import { useInventorySync, type InventoryItem } from '@/hooks/useInventorySync'

export function InventorySyncDashboard() {
  const { 
    inventory, 
    isConnected, 
    lastSyncTime, 
    syncStats, 
    manualSync, 
    retryFailedSync 
  } = useInventorySync()
  
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'sku' | 'marketplace' | 'quantity' | 'lastSynced'>('lastSynced')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isSyncing, setIsSyncing] = useState(false)

  const marketplaces = Array.from(new Set(inventory.map(item => item.marketplace)))
  
  const filteredInventory = inventory.filter(item => 
    selectedMarketplace === 'all' || item.marketplace === selectedMarketplace
  )

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    let aValue: string | number = a[sortBy]
    let bValue: string | number = b[sortBy]
    
    if (sortBy === 'quantity') {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSync = async (marketplace?: string) => {
    setIsSyncing(true)
    try {
      await manualSync(marketplace)
    } finally {
      setIsSyncing(false)
    }
  }

  const handleRetry = async (sku: string, marketplace: string) => {
    await retryFailedSync(sku, marketplace)
  }

  const getStatusIcon = (status: InventoryItem['status']) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'syncing':
        return <ArrowClockwise className="h-4 w-4 text-blue-600 animate-spin" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Warning className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: InventoryItem['status']) => {
    const variants = {
      synced: 'default',
      error: 'destructive',
      syncing: 'secondary',
      pending: 'outline'
    } as const

    return (
      <Badge variant={variants[status]} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status}
      </Badge>
    )
  }

  const formatLastSynced = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return `${Math.floor(diffMins / 1440)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-time Inventory Sync</h2>
          <p className="text-muted-foreground">Monitor and manage inventory across all marketplaces</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? 'default' : 'destructive'} className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button 
            onClick={() => handleSync()} 
            disabled={isSyncing}
            className="flex items-center gap-2"
          >
            <ArrowClockwise className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync All
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Inventory Table
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Pulse className="h-4 w-4" />
            Live Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SyncStatusCard
              isConnected={isConnected}
              lastSyncTime={lastSyncTime}
              totalSynced={syncStats.totalSynced}
              errors={syncStats.errors}
              onForceSync={() => handleSync()}
              isLoading={isSyncing}
            />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {marketplaces.length} marketplaces
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sync Errors</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{syncStats.errors}</div>
                <p className="text-xs text-muted-foreground">
                  {syncStats.errors === 0 ? 'All systems healthy' : 'Requires attention'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Lightning className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {syncStats.totalSynced + syncStats.errors > 0 
                    ? Math.round((syncStats.totalSynced / (syncStats.totalSynced + syncStats.errors)) * 100)
                    : 100}%
                </div>
                <Progress 
                  value={syncStats.totalSynced + syncStats.errors > 0 
                    ? (syncStats.totalSynced / (syncStats.totalSynced + syncStats.errors)) * 100
                    : 100
                  } 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
          </div>

          {/* Live Activity Feed */}
          <LiveSyncActivity />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Real-time inventory levels across all connected marketplaces</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedMarketplace} onValueChange={setSelectedMarketplace}>
                    <SelectTrigger className="w-40">
                      <Funnel className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Marketplaces</SelectItem>
                      {marketplaces.map(marketplace => (
                        <SelectItem key={marketplace} value={marketplace}>
                          {marketplace}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center gap-1"
                  >
                    <ArrowsDownUp className="h-4 w-4" />
                    {sortOrder.toUpperCase()}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSortBy('sku')}
                    >
                      SKU {sortBy === 'sku' && <ArrowsDownUp className="h-3 w-3 inline ml-1" />}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSortBy('marketplace')}
                    >
                      Marketplace {sortBy === 'marketplace' && <ArrowsDownUp className="h-3 w-3 inline ml-1" />}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSortBy('quantity')}
                    >
                      Quantity {sortBy === 'quantity' && <ArrowsDownUp className="h-3 w-3 inline ml-1" />}
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSortBy('lastSynced')}
                    >
                      Last Synced {sortBy === 'lastSynced' && <ArrowsDownUp className="h-3 w-3 inline ml-1" />}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedInventory.map((item, index) => (
                    <TableRow key={`${item.sku}-${item.marketplace}-${index}`}>
                      <TableCell className="font-mono font-medium">{item.sku}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.marketplace}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          item.quantity < 10 ? 'text-red-600' : 
                          item.quantity < 20 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatLastSynced(item.lastSynced)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.status === 'error' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRetry(item.sku, item.marketplace)}
                              className="flex items-center gap-1"
                            >
                              <ArrowClockwise className="h-3 w-3" />
                              Retry
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleSync(item.marketplace)}
                            disabled={isSyncing}
                            className="flex items-center gap-1"
                          >
                            <ArrowClockwise className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
                            Sync
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {sortedInventory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No inventory items found for the selected marketplace.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <LiveSyncActivity />
        </TabsContent>
      </Tabs>
    </div>
  )
}