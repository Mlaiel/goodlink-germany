import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ArrowClockwise, 
  CheckCircle, 
  XCircle, 
  TrendUp,
  TrendDown,
  Package
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface SyncActivity {
  id: string
  timestamp: string
  type: 'sync' | 'update' | 'error'
  marketplace: string
  sku: string
  action: string
  details?: string
  quantityChange?: number
}

export function LiveSyncActivity() {
  const [activities, setActivities] = useKV<SyncActivity[]>('sync-activities', [])
  const [isLive, setIsLive] = useState(true)

  // Simulate real-time sync activities
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const marketplaces = ['Amazon', 'eBay', 'OTTO', 'Kaufland', 'bol.com']
      const skus = ['GL-001', 'GL-002', 'GL-003', 'GL-004', 'GL-005']
      const actions = [
        'Inventory synchronized',
        'Price updated',
        'Listing refreshed',
        'Stock level adjusted',
        'Order imported'
      ]

      const newActivity: SyncActivity = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: Math.random() > 0.1 ? 'sync' : 'error',
        marketplace: marketplaces[Math.floor(Math.random() * marketplaces.length)],
        sku: skus[Math.floor(Math.random() * skus.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        quantityChange: Math.random() > 0.5 ? Math.floor(Math.random() * 10) - 5 : undefined
      }

      if (newActivity.type === 'error') {
        newActivity.action = 'Sync failed'
        newActivity.details = 'API rate limit exceeded'
      }

      setActivities((current) => {
        const currentActivities = current || []
        const updated = [newActivity, ...currentActivities].slice(0, 50) // Keep last 50 activities
        return updated
      })
    }, 5000 + Math.random() * 10000) // Random interval 5-15 seconds

    return () => clearInterval(interval)
  }, [isLive])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getActivityIcon = (activity: SyncActivity) => {
    switch (activity.type) {
      case 'sync':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'update':
        return <ArrowClockwise className="h-4 w-4 text-blue-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-gray-400" />
    }
  }

  const getQuantityChangeIcon = (change?: number) => {
    if (!change) return null
    if (change > 0) return <TrendUp className="h-3 w-3 text-green-600" />
    if (change < 0) return <TrendDown className="h-3 w-3 text-red-600" />
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Live Sync Activity</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-muted-foreground">{isLive ? 'Live' : 'Paused'}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {activities?.length || 0} events
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          {activity.sku}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {activity.marketplace}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activity.action}</span>
                      {activity.quantityChange && (
                        <div className="flex items-center gap-1">
                          {getQuantityChangeIcon(activity.quantityChange)}
                          <span className={`text-xs font-semibold ${
                            activity.quantityChange > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {activity.quantityChange > 0 ? '+' : ''}{activity.quantityChange}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {activity.details && (
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No sync activities yet</p>
                <p className="text-xs">Activities will appear here as inventory syncs occur</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}