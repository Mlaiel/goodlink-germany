import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowClockwise,
  Lightning
} from '@phosphor-icons/react'

interface SyncStatusProps {
  isConnected: boolean
  lastSyncTime: string
  totalSynced: number
  errors: number
  onForceSync: () => void
  isLoading?: boolean
}

export function SyncStatusCard({ 
  isConnected, 
  lastSyncTime, 
  totalSynced, 
  errors, 
  onForceSync,
  isLoading = false 
}: SyncStatusProps) {
  const [timeSinceSync, setTimeSinceSync] = useState('')

  useEffect(() => {
    const updateTimeSince = () => {
      if (!lastSyncTime) {
        setTimeSinceSync('Never')
        return
      }

      const now = new Date()
      const lastSync = new Date(lastSyncTime)
      const diffMs = now.getTime() - lastSync.getTime()
      const diffMinutes = Math.floor(diffMs / 60000)
      
      if (diffMinutes < 1) {
        setTimeSinceSync('Just now')
      } else if (diffMinutes < 60) {
        setTimeSinceSync(`${diffMinutes}m ago`)
      } else if (diffMinutes < 1440) {
        setTimeSinceSync(`${Math.floor(diffMinutes / 60)}h ago`)
      } else {
        setTimeSinceSync(`${Math.floor(diffMinutes / 1440)}d ago`)
      }
    }

    updateTimeSince()
    const interval = setInterval(updateTimeSince, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [lastSyncTime])

  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        icon: <XCircle className="h-4 w-4 text-red-500" />,
        text: 'Disconnected',
        variant: 'destructive' as const,
        bgColor: 'bg-red-50'
      }
    }

    if (errors > 0) {
      return {
        icon: <Lightning className="h-4 w-4 text-yellow-600" />,
        text: 'Connected (With Errors)',
        variant: 'outline' as const,
        bgColor: 'bg-yellow-50'
      }
    }

    return {
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      text: 'Connected',
      variant: 'default' as const,
      bgColor: 'bg-green-50'
    }
  }

  const statusInfo = getConnectionStatus()

  return (
    <Card className={`${statusInfo.bgColor} border-l-4 ${
      statusInfo.variant === 'destructive' ? 'border-l-red-500' :
      statusInfo.variant === 'outline' ? 'border-l-yellow-500' :
      'border-l-green-500'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
            {statusInfo.icon}
            {statusInfo.text}
          </Badge>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onForceSync}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <ArrowClockwise className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            Sync Now
          </Button>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last sync:
            </span>
            <span className="font-medium">{timeSinceSync}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Today's syncs:</span>
            <span className="font-medium text-green-600">{totalSynced}</span>
          </div>
          
          {errors > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sync errors:</span>
              <span className="font-medium text-red-600">{errors}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}